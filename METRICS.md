# METRICS.md

## North Star Metric
**Total Identified Annual Savings (TIAS)**
- **Why**: This represents the aggregate value provided to the community. If this number is growing, the tool is doing its job of finding waste. It also directly correlates with the "value" we can pitch during a consultation.

## Input Metrics
1. **Audit Completion Rate**: `(Completed Audits / Landing Page Views)`. Target: > 25%. This measures the friction and clarity of our Spend Input Form.
2. **Lead Capture Rate**: `(Emails Captured / Completed Audits)`. Target: > 30%. This measures how much the user trusts the results and wants to save them.
3. **Virality Coefficient (K-factor)**: `(New Visitors from Shared Links / Unique Shared Links)`. Target: > 0.3. This measures the "screenshot-ability" and shareability of the results page.

## What to instrument first
- **PostHog / Umami**: For anonymous event tracking (Button clicks, form step progress).
- **Supabase Logs**: To track audit generation volume and lead capture success.
- **Vercel Analytics**: For performance (Lighthouse scores) and real user monitoring.

## Pivot Decision Number
If the **Audit-to-Consultation** conversion rate stays **below 2%** after 500 completed audits, we must pivot.
- **Interpretation**: This suggests that either (a) we aren't finding enough savings to make a call worth it, or (b) the target user is too small to care about $100-200 savings.
- **Pivot Action**: Refocus the tool on "Enterprise Consolidation" for companies with >100 devs, where the "negotiation leverage" becomes the primary value proposition.
