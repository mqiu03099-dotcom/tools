# Repository Guidelines

## Project Structure & Module Organization
- `pages/`: Nuxt 3 file-based routes; prefer shallow, descriptive directories for new views.
- `components/`: Reusable UI (use PascalCase filenames, e.g., `HeroBanner.vue`); colocate style in `<style scoped>`.
- `composables/`: Reusable composition utilities; export helpers from `useXxx` functions.
- `utils/` and `types/`: Cross-cutting helpers and shared typings; keep pure and framework-agnostic.
- `public/`: Static assets (iconfont, CSS, generated `sitemap.xml`); reference with absolute paths.
- `articles/` and `menus/`: Content/data sources surfaced in pages; update alongside related routes.
- Env configuration lives in `.env.development` / `.env.production`; `nuxt.config.ts` holds site metadata and prerender hooks.

## Build, Test, and Development Commands
- `corepack enable && pnpm install` — install using the pinned `pnpm@8.15.0`; Node 20.19.x recommended.
- `pnpm dev` — start the dev server with `.env.development` on port 6179.
- `pnpm pro` — run the dev server against `.env.production` for parity checks.
- `pnpm buildDev` / `pnpm buildPro` — static build with the matching env; outputs to `dist/` with Nitro static preset.
- `pnpm preview` — preview the last build locally.
- `pnpm publishDev` / `pnpm publishPro` — build then serve `dist/` via `http-server` (install it globally if missing).

## Coding Style & Naming Conventions
- Prettier enforced: 2-space indent, semicolons, double quotes, trailing commas, CRLF line endings. Run `pnpm exec prettier --check .` before pushing.
- Stick to TypeScript + `<script setup>` in Vue SFCs; prefer explicit types for props/emit.
- Route files in `pages/` use kebab-case (e.g., `tool-detail.vue`); components use PascalCase.
- Keep utilities pure; avoid direct DOM access in composables unless guarded for SSR.

## Testing Guidelines
- No automated test suite is present yet; add `*.spec.ts` near the code under test or in a future `tests/` folder.
- When adding tests, favor lightweight unit coverage for utilities/composables and screenshot notes for UI changes.
- For manual verification, exercise key routes (`/`, `/detail`, `/tool/*`) under both dev and production env files.

## Commit & Pull Request Guidelines
- Follow the existing `type: summary` convention (`feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`); keep messages short and imperative.
- PRs should include: purpose, scope of changes, affected routes/components, env used, and screenshots/gifs for UI-impacting work.
- Link related issues/tasks when available and call out any config/env changes required for reviewers.
- Keep diffs minimal; prefer separate PRs for large refactors vs. feature work.

## Environment & Security
- Do not commit secrets; use the sample env files as references and set sensitive values locally.
- Production URLs and analytics IDs are set in `nuxt.config.ts`; coordinate before changing them and test both envs.
