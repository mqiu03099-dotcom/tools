# Repository Guidelines

## Project Structure & Module Organization
- `pages/` holds Nuxt page routes; `components/` stores reusable Vue pieces; `composables/` keeps shared `useX` hooks; `utils/` contains helpers used by build hooks and pages (e.g., sitemap generation in `nuxt.config.ts`).
- `assets/` is for static styles/media processed by Nuxt; `public/` serves direct assets and receives generated files like `sitemap.xml` after prerender.
- `articles/`, `menus/`, and `template/` keep content/config data; `types/` centralizes shared TypeScript types; `server/` contains any server routes or middleware.
- Build artifacts live in `.nuxt/`, `.output/`, and the generated `dist/` symlink; avoid editing these by hand.

## Build, Test, and Development Commands
- Prereqs: Node 20.x (see README), `corepack enable`, then `pnpm install` to sync deps.
- `pnpm dev` — Run Nuxt locally with `.env.development`.
- `pnpm pro` — Run Nuxt locally against `.env.production` to spot config drifts.
- `pnpm buildDev` / `pnpm buildPro` — Static builds for the respective env files.
- `pnpm preview` — Serve the last build for a quick sanity check.
- `pnpm publishDev` or `pnpm publishPro` — Build, then serve `dist/` via `http-server` (requires it to be available).

## Coding Style & Naming Conventions
- Prettier is authoritative (`.prettierrc.json`): 2-space indent, 100-char width, semicolons, double quotes, trailing commas, CRLF line endings. Run `pnpm exec prettier --write <paths>`.
- Use TypeScript modules; prefer PascalCase for Vue components, kebab-case for route filenames under `pages/`, and camelCase for utilities.
- Tailwind v4 is available; keep utility classes close to templates and avoid inline styles when possible.

## Testing Guidelines
- No dedicated test suite is present; validate changes via `pnpm dev` for interactive checks and `pnpm buildDev && pnpm preview` to ensure SSG output and sitemap generation succeed.
- When adding tests, co-locate `*.spec.ts`/`*.test.ts` near the code or in a `tests/` folder, and cover new branches for helpers and composables.

## Commit & Pull Request Guidelines
- Follow the existing conventional style (`feat: 更新数据`, `fix: ...`, `chore: ...`). Use imperative, short summaries.
- PRs should include: what changed, why, how to verify (`pnpm dev`/`pnpm build...` steps), linked issues, and UI screenshots when updating pages/components.
- Ensure `.env.production` secrets stay local; never commit credentialed env values.
