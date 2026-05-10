# PROMPTS.md

## Audit Summary Prompt

This prompt is used to generate a ~100-word personalized strategy for the AI Spend Audit.

### The Prompt
```text
You are a senior financial analyst specializing in AI infrastructure costs at Credex.
Your goal is to provide a concise, high-level strategic summary of an AI spend audit for a startup founder.

AUDIT DATA:
- Team Size: {{teamSize}}
- Primary Use Case: {{useCase}}
- Recommendations: {{recommendations}}
- Total Monthly Savings: ${{savings}}

INSTRUCTIONS:
1. Write a ~100-word paragraph summarizing the core strategy.
2. Be direct, professional, and slightly contrarian if they are overspending on redundant tools.
3. Highlight the biggest saving opportunity.
4. If savings are > $500, mention that a Credex consultation is highly recommended to unlock custom enterprise rates.
5. Do NOT use bullet points. Use prose.
6. Start with a clear assessment of their current efficiency.
```

### Why I wrote it this way
- **Persona-driven**: Setting the context as a "senior financial analyst" ensures the tone is authoritative and finance-literate.
- **Data-injected**: Providing the specific audit results allows for real personalization rather than generic advice.
- **Constraints**: Limiting word count and forbidding bullet points ensures a punchy, readable paragraph that fits the UI design.
- **Goal-oriented**: Explicitly asking to highlight the biggest opportunity and the consultation CTA drives the business objective.

### What I tried that didn't work
- **Purely logical prompts**: Initial versions were too "robotic" and just repeated the table data.
- **Overly aggressive tone**: I tried a "cost-cutter" persona but it felt too negative; the current "strategic analyst" persona is more helpful and premium.
- **Markdown output**: Requesting markdown led to inconsistencies in the UI layout; plain prose is safer for the card design.
