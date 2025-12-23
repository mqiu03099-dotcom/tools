# Repository Guidelines

## Project Structure & Module Organization
- Framework: Nuxt 3 + TypeScript + Vite, styled with Tailwind CSS v4 and DaisyUI.
- Routing lives in `pages/` (e.g., `index.vue`, `about.vue`, `tool/`, `article/`, `category/`), with SEO/privacy pages alongside.
- Reusable UI sits in `components/`; shared composables in `composables/`; typed helpers in `utils/` (e.g., sitemap helpers in `fun.ts`, URL utilities in `url.ts`).
- Content/config data is stored as JSON in `articles/`, `menus/`, and `public/` holds static assets (`css/`, `iconfont/`, `sitemap.xml`, verification files).
- Server handlers live in `server/api/`; global types in `types/`; `template/` contains scaffolding; build output goes to `dist/` (symlinked from `.output`).

## Build, Test, and Development Commands
- Prereqs: Node ≥ 20.19.4, `corepack enable`, then `pnpm install` (repo pins `pnpm@8.15.0`).
- Local dev: `pnpm dev` (uses `.env.development`); production-like dev: `pnpm pro` (uses `.env.production`).
- Static builds: `pnpm buildDev` or `pnpm buildPro`; preview a build with `pnpm preview`.
- Quick publish preview: `pnpm publishDev` or `pnpm publishPro` (build then serve `dist/` via `http-server`).

## Coding Style & Naming Conventions
- Formatting via Prettier: 2-space indent, width 100, semicolons, double quotes (`jsxSingleQuote: true`), trailing commas, one attribute per line, CRLF endings.
- Vue SFCs and components use PascalCase filenames; route/page files use kebab-case. Keep TypeScript definitions in `types/` and reuse shared interfaces from `utils/type.ts`.
- Prefer composables for shared state, and keep UI logic in components with Tailwind utility classes; load icons from `public/iconfont/`.

## Testing Guidelines
- No automated test suite yet; validate changes by running `pnpm dev` and smoke-testing key routes (`/`, `/tool/*`, `/article/*`, `/json`, `/search`).
- After build commands, confirm `public/sitemap.xml` is regenerated and major pages render without console errors. Add lightweight checks or logging around new utilities when practical.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat`, `fix`, `chore`, `docs`, etc.), mirroring existing history (`feat: ...`). Keep messages in imperative, under ~72 characters after the type/scope.
- Before opening a PR: summarize the change, list test/dev commands run, note affected routes, and link any related issue/task. Include before/after screenshots or recordings for UI updates.
- Keep environment notes explicit (which `.env` used) and avoid committing secrets or tokens.

## Security & Configuration Tips
- Environment values live in `.env.development` and `.env.production`; never hardcode secrets. `runtimeConfig.public.env` reads `NUXT_PUBLIC_ENV`—set it per deploy target.
- Ads/analytics scripts load in production; verify IDs in `nuxt.config.ts` when changing domains. Update `public/robots.txt` and `public/sitemap.xml` together for SEO tweaks.
