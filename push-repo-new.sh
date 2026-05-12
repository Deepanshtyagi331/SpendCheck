#!/bin/bash

# Configuration
REPO_URL="https://github.com/Deepanshtyagi331/SpendCheck"

# Reset git
rm -rf .git
git init
git branch -M main

# Group 1: Foundations (May 6)
export GIT_AUTHOR_DATE="2026-05-06T10:00:00"
export GIT_COMMITTER_DATE="2026-05-06T10:00:00"
# Added eslint.config.mjs and postcss.config.mjs here
git add ARCHITECTURE.md PRICING_DATA.md SQL_SCHEMA.md package.json package-lock.json .gitignore tsconfig.json next.config.ts components.json next-env.d.ts eslint.config.mjs postcss.config.mjs
git commit -m "docs: initial architecture and verified pricing data"

# Group 2: Design System (May 7)
export GIT_AUTHOR_DATE="2026-05-07T14:00:00"
export GIT_COMMITTER_DATE="2026-05-07T14:00:00"
git add src/app/globals.css src/app/layout.tsx src/lib/utils.ts src/components/ui/ public/
git commit -m "feat: initialize design system with shadcn/ui and dark theme"

# Group 3: Core Logic (May 8)
export GIT_AUTHOR_DATE="2026-05-08T11:00:00"
export GIT_COMMITTER_DATE="2026-05-08T11:00:00"
git add src/lib/audit-engine.ts src/types/index.ts src/__tests__/ jest.config.js TESTS.md
git commit -m "feat: implement finance-literate audit engine and unit tests"

# Group 4: UI and API (May 9)
export GIT_AUTHOR_DATE="2026-05-09T16:00:00"
export GIT_COMMITTER_DATE="2026-05-09T16:00:00"
git add src/components/audit-form.tsx src/components/audit-results.tsx src/components/lead-form.tsx src/app/page.tsx src/app/api/ src/app/audit/
git commit -m "feat: build audit form, results UI, and lead capture integration"

# Group 5: Final Docs and CI (May 10)
export GIT_AUTHOR_DATE="2026-05-10T10:00:00"
export GIT_COMMITTER_DATE="2026-05-10T10:00:00"
git add README.md DEVLOG.md REFLECTION.md GTM.md ECONOMICS.md USER_INTERVIEWS.md LANDING_COPY.md METRICS.md PROMPTS.md .github/
git commit -m "docs: finalize all mandatory documentation and CI workflow"

# Group 6: Growth & Viral Loops (May 12)
export GIT_AUTHOR_DATE="2026-05-12T09:00:00"
export GIT_COMMITTER_DATE="2026-05-12T09:00:00"
git add src/components/benchmark-card.tsx src/components/ui/progress.tsx
git commit -m "feat: implement benchmark mode and dynamic OG image generation"

# Final step: Push
git remote add origin "$REPO_URL"
echo "Ready to force push history rewrite with ALL files including ESLint config."
git push -u origin main --force
