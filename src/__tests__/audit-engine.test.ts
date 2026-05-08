import { runAudit } from "../lib/audit-engine";
import { AuditInput } from "../types";

jest.mock("uuid", () => ({ v4: () => "mock-uuid" }));

describe("Audit Engine", () => {
  test("should recommend downgrade from Cursor Business to Pro for individual user", () => {
    const input: AuditInput = {
      tools: [
        { tool: "Cursor", plan: "Business", monthlySpend: 40, seats: 1 }
      ],
      teamSize: 1,
      primaryUseCase: "coding"
    };

    const result = runAudit(input);
    const cursorRec = result.recommendations.find(r => r.tool === "Cursor");
    
    expect(cursorRec?.recommendedAction).toBe("Downgrade to Pro");
    expect(cursorRec?.monthlySavings).toBe(20);
  });

  test("should recommend annual billing for Cursor Pro", () => {
    const input: AuditInput = {
      tools: [
        { tool: "Cursor", plan: "Pro", monthlySpend: 20, seats: 1 }
      ],
      teamSize: 1,
      primaryUseCase: "coding"
    };

    const result = runAudit(input);
    const cursorRec = result.recommendations.find(r => r.tool === "Cursor");
    
    expect(cursorRec?.recommendedAction).toBe("Switch to Annual Billing");
    expect(cursorRec?.monthlySavings).toBe(4);
  });

  test("should recommend downgrade from Copilot Enterprise for non-coding use case", () => {
    const input: AuditInput = {
      tools: [
        { tool: "GitHub Copilot", plan: "Enterprise", monthlySpend: 39, seats: 1 }
      ],
      teamSize: 1,
      primaryUseCase: "writing"
    };

    const result = runAudit(input);
    const copilotRec = result.recommendations.find(r => r.tool === "GitHub Copilot");
    
    expect(copilotRec?.recommendedAction).toBe("Downgrade to Business");
    expect(copilotRec?.monthlySavings).toBe(20);
  });

  test("should recommend prompt caching for high API spend", () => {
    const input: AuditInput = {
      tools: [
        { tool: "OpenAI API", plan: "Usage based", monthlySpend: 500, seats: 1 }
      ],
      teamSize: 1,
      primaryUseCase: "coding"
    };

    const result = runAudit(input);
    const apiRec = result.recommendations.find(r => r.tool === "OpenAI API");
    
    expect(apiRec?.recommendedAction).toBe("Use Prompt Caching");
    expect(apiRec?.monthlySavings).toBe(200); // 40% of 500
  });

  test("should recommend negotiation for very high spend", () => {
    const input: AuditInput = {
      tools: [
        { tool: "ChatGPT", plan: "Plus", monthlySpend: 2000, seats: 50 }
      ],
      teamSize: 50,
      primaryUseCase: "mixed"
    };

    const result = runAudit(input);
    const chatGPTRec = result.recommendations.find(r => r.tool === "ChatGPT");
    
    expect(chatGPTRec?.recommendedAction).toBe("Consolidate and Negotiate Enterprise");
    expect(chatGPTRec?.monthlySavings).toBe(400); // 20% of 2000
  });
});
