# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 + TypeScript app using the App Router.
- `src/app/`: route entrypoints, global layout, and global CSS.
- `src/components/`: reusable UI blocks (hero, scoreboard, cards, forms).
- `src/lib/`: shared utilities and integrations (for example Supabase client setup).
- `src/types/`: shared TypeScript domain types (such as election models).
- `public/`: static assets (images, SVGs) served directly.
- `supabase/schema.sql`: database schema source for Supabase.

## Build, Test, and Development Commands
Use npm (lockfile is committed as `package-lock.json`).
- `npm run dev`: starts local development server at `http://localhost:3000`.
- `npm run build`: creates a production build.
- `npm run start`: serves the built app.
- `npm run lint`: runs ESLint with Next.js core-web-vitals + TypeScript rules.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`), React function components.
- Indentation: 2 spaces; keep imports grouped and sorted logically.
- Components/types: `PascalCase` (`ElectionHero.tsx`, `CandidateCard.tsx`).
- Utilities/hooks/constants: `camelCase` exports, concise names.
- Route files follow Next.js conventions: `layout.tsx`, `page.tsx`.
- Run `npm run lint` before opening a PR; fix warnings that indicate correctness or maintainability issues.

## Testing Guidelines
There is currently no dedicated test runner configured in `package.json`.
Until one is added:
- Treat `npm run lint` and `npm run build` as required pre-PR checks.
- For UI changes, verify affected flows in local dev and note what was tested.
- If you add tests, place them near source files or under `src/__tests__/` and use `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
Current history uses short, imperative commit messages (for example: `Set Demo`, `Delete src/app/admin directory`). Keep that pattern.
- Commit format: `<Verb> <scope>` (example: `Add election stats animation`).
- Keep commits focused; avoid mixing refactor + feature + asset churn.
- PRs should include: purpose, key changes, validation steps, and screenshots/GIFs for UI updates.
- Link related issue(s) and call out schema changes when editing `supabase/schema.sql`.

## Security & Configuration Tips
- Keep secrets in `.env` only; never commit credentials.
- Validate Supabase changes against `supabase/schema.sql` and document any required migration/manual SQL steps in the PR.
