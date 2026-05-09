import { Anthropic } from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { teamSize, useCase, recommendations, savings } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        summary: `Your audit reveals a potential monthly saving of $${savings}. Your primary strategy should be consolidating your ${recommendations.length} tool recommendations, specifically focusing on your highest spend areas in ${useCase}. For a team of ${teamSize}, we recommend auditing seat utilization every 30 days to prevent license bloat.`
      });
    }

    const prompt = `You are a senior financial analyst specializing in AI infrastructure costs at Credex.
Your goal is to provide a concise, high-level strategic summary of an AI spend audit for a startup founder.

AUDIT DATA:
- Team Size: ${teamSize}
- Primary Use Case: ${useCase}
- Recommendations: ${JSON.stringify(recommendations)}
- Total Monthly Savings: $${savings}

INSTRUCTIONS:
1. Write a ~100-word paragraph summarizing the core strategy.
2. Be direct, professional, and slightly contrarian if they are overspending on redundant tools.
3. Highlight the biggest saving opportunity.
4. If savings are > $500, mention that a Credex consultation is highly recommended to unlock custom enterprise rates.
5. Do NOT use bullet points. Use prose.
6. Start with a clear assessment of their current efficiency.`;

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 250,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    const text = content.type === 'text' ? content.text : "";

    return NextResponse.json({ summary: text });
  } catch (error) {
    console.error("AI Summary Error:", error);
    return NextResponse.json(
      { 
        summary: "We've identified significant saving opportunities in your AI stack. Most startups overpay by 20-30% due to redundant seat licenses and sub-optimal API usage. Focus on consolidating your developer tools first to see immediate impact on your bottom line."
      },
      { status: 200 } // Graceful fallback
    );
  }
}
