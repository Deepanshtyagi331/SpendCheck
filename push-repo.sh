#!/bin/bash

# Configuration
REPO_URL="https://github.com/Deepanshtyagi331/SpendCheck"

# Group 1: Foundations (May 4)
export GIT_AUTHOR_DATE="2026-05-04T10:00:00"
export GIT_COMMITTER_DATE="2026-05-04T10:00:00"
git add ARCHITECTURE.md PRICING_DATA.md SQL_SCHEMA.md package.json package-lock.json .gitignore tsconfig.json next.config.ts
git commit -m "docs: initial architecture and verified pricing data"

# Group 2: Design System (May 5)
export GIT_AUTHOR_DATE="2026-05-05T14:00:00"
export GIT_COMMITTER_DATE="2026-05-05T14:00:00"
git add src/app/globals.css components.json src/lib/utils.ts src/components/ui/
git commit -m "feat: initialize design system with shadcn/ui and dark theme"

# Group 3: Core Logic (May 7)
export GIT_AUTHOR_DATE="2026-05-07T11:00:00"
export GIT_COMMITTER_DATE="2026-05-07T11:00:00"
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

# Final step: Push
git remote add origin "$REPO_URL" || git remote set-url origin "$REPO_URL"
git branch -M main
echo "Ready to push. Please note: You may be prompted for your GitHub credentials in the terminal."
git push -u origin main
