export type AITool = 
  | 'Cursor'
  | 'GitHub Copilot'
  | 'Claude'
  | 'ChatGPT'
  | 'Anthropic API'
  | 'OpenAI API'
  | 'Gemini'
  | 'Windsurf';

export type PlanType = string;

export interface ToolUsage {
  tool: AITool;
  plan: PlanType;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolUsage[];
  teamSize: number;
  primaryUseCase: 'coding' | 'writing' | 'data' | 'research' | 'mixed';
}

export interface AuditRecommendation {
  tool: AITool;
  currentSpend: number;
  recommendedAction: string;
  recommendedPlan: string;
  monthlySavings: number;
  reason: string;
}

export interface AuditResult {
  id: string;
  recommendations: AuditRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  personalizedSummary?: string;
  createdAt: string;
}

export interface BenchmarkStats {
  avgMonthlySavings: number;
  totalAudits: number;
  marketAveragePerSeat: number;
}
