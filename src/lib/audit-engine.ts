import { AuditInput, AuditRecommendation, AuditResult, ToolUsage } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const PRICING = {
  Cursor: {
    Hobby: 0,
    Pro: 20,
    Business: 40,
    Enterprise: 100, // Estimated/Starting
  },
  "GitHub Copilot": {
    Free: 0,
    Pro: 10,
    Business: 19,
    Enterprise: 39,
  },
  Claude: {
    Free: 0,
    Pro: 20,
    Team: 25,
    Enterprise: 60, // Estimated
  },
  ChatGPT: {
    Free: 0,
    Plus: 20,
    Team: 25,
    Enterprise: 60, // Estimated
  },
  Gemini: {
    Free: 0,
    Advanced: 20,
    API: 0, // Usage based
  },
  Windsurf: {
    Free: 0,
    Pro: 20,
    Teams: 40,
    Enterprise: 60,
  },
};

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: AuditRecommendation[] = [];

  input.tools.forEach((usage) => {
    const rec = evaluateTool(usage, input.teamSize, input.primaryUseCase);
    if (rec) recommendations.push(rec);
  });

  const totalMonthlySavings = recommendations.reduce(
    (acc, curr) => acc + curr.monthlySavings,
    0
  );

  return {
    id: uuidv4(),
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  };
}

function evaluateTool(
  usage: ToolUsage,
  teamSize: number,
  useCase: AuditInput["primaryUseCase"]
): AuditRecommendation | null {
  const { tool, plan, monthlySpend, seats } = usage;
  let recommendedAction = "Keep as is";
  let recommendedPlan = plan;
  let monthlySavings = 0;
  let reason = "You are on the optimal plan for your usage.";

  switch (tool) {
    case "Cursor":
      if (plan === "Business" && seats <= 1) {
        recommendedAction = "Downgrade to Pro";
        recommendedPlan = "Pro";
        monthlySavings = monthlySpend - 20;
        reason = "Individual users don't need Business features; Pro offers the same AI capabilities for half the price.";
      } else if (plan === "Pro" && monthlySpend >= seats * 20) {
        recommendedAction = "Switch to Annual Billing";
        monthlySavings = monthlySpend - seats * 16;
        reason = "Annual billing reduces Cursor Pro cost to $16/user/month.";
      }
      break;

    case "GitHub Copilot":
      if (plan === "Enterprise" && useCase !== "coding") {
        recommendedAction = "Downgrade to Business";
        recommendedPlan = "Business";
        monthlySavings = monthlySpend - seats * 19;
        reason = "Enterprise features are overkill for non-deep-coding use cases.";
      }
      break;

    case "Claude":
    case "ChatGPT":
      if (plan === "Pro" || plan === "Plus") {
        // If they have many seats on individual Pro, maybe Team is better?
        // Actually Team is more expensive ($25 vs $20), but offers shared workspace.
        // Savings usually come from consolidation.
        if (teamSize > 5 && seats > teamSize * 0.8) {
          // Suggesting API for high-volume automated tasks if spend is high
          if (monthlySpend > 500) {
            recommendedAction = "Move high-volume tasks to API";
            monthlySavings = monthlySpend * 0.3; // Estimated 30% savings
            reason = "Automating repetitive tasks via API is significantly cheaper than human-seat subscriptions.";
          }
        }
      }
      break;

    case "Anthropic API":
    case "OpenAI API":
      if (monthlySpend > 200 && useCase === "coding") {
        recommendedAction = "Use Prompt Caching";
        monthlySavings = monthlySpend * 0.4;
        reason = "Implementing prompt caching can reduce your input token costs by up to 90%.";
      }
      break;
      
    case "Windsurf":
      if (plan === "Teams" && seats < 2) {
        recommendedAction = "Downgrade to Pro";
        recommendedPlan = "Pro";
        monthlySavings = monthlySpend - 20;
        reason = "Pro provides the same AI power for individuals at a lower cost.";
      }
      break;
  }

  // Generic consolidation rule
  if (monthlySpend > 1000 && seats > 10) {
    recommendedAction = "Consolidate and Negotiate Enterprise";
    monthlySavings = monthlySpend * 0.2; // 20% negotiation leverage
    reason = "At your scale, you have significant leverage to negotiate a custom enterprise deal.";
  }

  if (monthlySavings <= 0) return null;

  return {
    tool,
    currentSpend: monthlySpend,
    recommendedAction,
    recommendedPlan,
    monthlySavings,
    reason,
  };
}
