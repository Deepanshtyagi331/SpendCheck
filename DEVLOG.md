# DEVLOG.md

## Day 1 — 2026-05-04
**Hours worked:** 2
**What I did:** 
- Project discovery and planning.
- Researched AI tool pricing and verified URLs.
- Created initial system architecture and Mermaid diagrams.
**What I learned:** The AI pricing landscape is more fragmented than expected (e.g., Cursor vs Windsurf competing on seat pricing).
**Blockers:** None.
**Plan for tomorrow:** Initialize Next.js project and setup design system.

## Day 2 — 2026-05-05
**Hours worked:** 3
**What I did:** 
- Initialized Next.js 14 project with App Router and Tailwind.
- Set up shadcn/ui and the dark-mode design system.
- Created `globals.css` with glassmorphism utilities.
**What I learned:** Shadcn's newer CLI is much faster but requires careful configuration for Next.js 14.
**Blockers:** Minor styling inconsistencies with Tailwind v4.
**Plan for tomorrow:** Build the multi-step audit form.

## Day 3 — 2026-05-06
**Hours worked:** 4
**What I did:** 
- Built the `AuditForm` component with `react-hook-form` and `zod`.
- Implemented `localStorage` persistence for form state.
- Added dynamic tool/seat input fields.
**What I learned:** `useFieldArray` is essential for managing dynamic tool lists cleanly.
**Blockers:** Form validation for nested arrays was tricky.
**Plan for tomorrow:** Implement the Audit Engine logic and unit tests.

## Day 4 — 2026-05-07
**Hours worked:** 5
**What I did:** 
- Developed the `AuditEngine` utility with hardcoded financial logic.
- Set up Jest and wrote 5 comprehensive test cases.
- Fixed logic errors in Cursor annual billing recommendations.
**What I learned:** Jest and ES modules in Next.js 14 require manual config (mocking `uuid`).
**Blockers:** Spent 2 hours debugging Jest ESM parsing errors.
**Plan for tomorrow:** Create the Audit Results page and AI summary integration.

## Day 5 — 2026-05-08
**Hours worked:** 4
**What I did:** 
- Built `AuditResults` component with hero savings and breakdown table.
- Implemented Anthropic API route for personalized summaries.
- Added graceful fallback for AI failure cases.
**What I learned:** Claude 3.5 Sonnet is incredibly fast for small summarization tasks.
**Blockers:** API rate limiting during testing.
**Plan for tomorrow:** Setup Supabase and Lead Capture.

## Day 6 — 2026-05-09
**Hours worked:** 5
**What I did:** 
- Integrated Supabase for audit storage and lead capture.
- Implemented Resend for transactional email confirmation.
- Added honeypot field and basic abuse protection.
- Created the shareable public audit URL with dynamic OG tags.
**What I learned:** Dynamic OG tags in Next.js App Router are powerful for viral growth.
**Blockers:** Supabase RLS policies needed fine-tuning for anonymous inserts.
**Plan for tomorrow:** Final polish, documentation, and deployment.

## Day 7 — 2026-05-10
**Hours worked:** 3
**What I did:** 
- Finalized all documentation (`README`, `ARCHITECTURE`, `REFLECTION`, etc.).
- Verified CI pipeline with GitHub Actions.
- Conducted manual verification of responsive design and form persistence.
- Polished the landing page copy and social proof.
**What I learned:** Documenting the "Why" (Entrepreneurial Thinking) is as important as the code.
**Blockers:** None.
**Plan for tomorrow:** Submit and launch on Product Hunt!
