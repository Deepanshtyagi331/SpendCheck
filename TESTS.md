# TESTS.md

## Automated Tests

### Audit Engine Tests
- **File**: `src/__tests__/audit-engine.test.ts`
- **Coverage**:
  1. **Cursor Downgrade**: Ensures individual users on Business plans are recommended to downgrade to Pro.
  2. **Cursor Annual Billing**: Recommends annual billing to save $4/month on Pro plans.
  3. **Copilot Downgrade**: Suggests downgrading from Enterprise to Business for non-coding primary use cases.
  4. **API Prompt Caching**: Recommends prompt caching for high API spend (>$200) to save 40%.
  5. **Enterprise Negotiation**: Recommends consolidation and negotiation for teams with very high total spend.

### How to run tests
```bash
npm test
```

## Manual Verification
- **Form Persistence**: Verified that `localStorage` correctly saves and restores form state across reloads.
- **Responsive Design**: Verified layout on mobile (375px), tablet (768px), and desktop (1440px).
- **Email Delivery**: Verified Resend transactional emails are received correctly.
- **AI Summary**: Verified fallback mechanism for Anthropic API failures.
