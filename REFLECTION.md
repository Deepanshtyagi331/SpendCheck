# REFLECTION.md

## 1. Hardest bug I hit and how I debugged it
The hardest bug was an ES module resolution error in Jest when importing the `uuid` library. Next.js 14 uses modern ESM, but Jest's default configuration with `ts-jest` often struggles with `node_modules` that export ESM. 
**Hypothesis**: Jest was trying to parse `export { ... }` in `uuid` as CommonJS.
**Trial**: I first tried `transformIgnorePatterns`, but it became a "rabbit hole" of regex.
**Solution**: I decided to mock the `uuid` library entirely in my test files. Since the `AuditEngine` logic doesn't depend on the specific value of the UUID, mocking it to return a static string solved the parsing error and kept the tests fast and focused on the financial logic.

## 2. A decision I reversed mid-week and why
I initially planned to use an LLM (Claude) to perform the entire audit analysis. I thought it would be "cooler" and more flexible. However, I reversed this decision in favor of a hardcoded logic engine. 
**Why**: Financial audits require 100% accuracy and defensibility. LLMs can hallucinate pricing or make inconsistent recommendations. A finance lead needs to know exactly *why* a $400 saving was identified. Hardcoding the logic based on `PRICING_DATA.md` ensures reliability, while using the LLM only for the "Personalized Summary" provides the best of both worlds: accurate numbers and human-readable insights.

## 3. What I would build in week 2
In week 2, I would implement "Benchmark Mode." I'd aggregate anonymous audit data to show users where they stand compared to other companies of similar size. For example: "Your AI spend per dev is $65/mo. The average for 50-person startups is $42/mo." This creates a powerful emotional hook (fear of being inefficient) that drives higher conversion to our consultation CTA.

## 4. How I used AI tools
I used Claude 3.5 Sonnet as a "pair programmer" for boilerplate components and for generating the initial `PRICING_DATA.md` citations. I didn't trust it with the core financial formulas; I wrote and unit-tested those myself to ensure zero hallucinations. One time AI was wrong: it suggested that GitHub Copilot Business was $10/user/month (mixing it up with the Individual plan). I caught this during the pricing verification phase and corrected the `AuditEngine` logic.

## 5. Self-rating
- **Discipline (9/10)**: Followed a strict plan, committed daily, and completed all MVP features.
- **Code Quality (8/10)**: Strictly typed TypeScript and clean component separation, though Jest config could be more robust.
- **Design Sense (9/10)**: Created a premium, dark-mode, "Product Hunt ready" aesthetic using shadcn/ui.
- **Problem-solving (9/10)**: Quickly pivoted when hit with technical blockers (Jest/ESM) and logic trade-offs.
- **Entrepreneurial thinking (10/10)**: Focused on the viral loop, lead capture, and the business value for Credex.
