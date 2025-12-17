# Repository Guidelines

## Project Structure & Module Organization
- `pages/` holds Nuxt routes (home, search, menu, theme, about, contact, privacy, dynamic `category/[category]`, `tag/[tag]`, `detail/[toolId]`, `tool/[toolId]`).
- `components/M<Name>/` groups each UI piece with `index.vue`, `type.ts`, `utils.ts`, and `data.ts`; use `template/folder/` as a scaffold when adding a new component.
- `composables/` contains shared hooks such as `usePageSeo` and `useWebName`; `utils/` stores cross-cutting helpers (URL normalization, sitemap folder scan, theme lists).
- `server/api/` defines Nitro endpoints for tags/tools; keep handlers small and POST-focused.
- `assets/css/` provides global Tailwind/DaisyUI styles; `public/` holds static assets, verification files, ads.txt, and the generated `sitemap.xml`. `.nuxt/` and `dist/` are build artifacts.

## Build, Test, and Development Commands
- `corepack enable && pnpm install` (pnpm 8.15.0) on Node 20.19+.
- `pnpm dev` — dev server on `0.0.0.0:6179` using `.env.development`.
- `pnpm pro` — dev server wired to `.env.production` for prod-like checks.
- `pnpm buildDev` / `pnpm buildPro` — static build (Nitro `static` preset); prerender hook writes `public/sitemap.xml`.
- `pnpm preview` — preview the built output.
- `pnpm publishDev` / `pnpm publishPro` — build then serve `dist/` via `http-server` (requires global `http-server`).

## Coding Style & Naming Conventions
- TypeScript with `<script setup>`; 2-space indent, semicolons, double quotes, trailing commas per `.prettierrc.json`.
- Use TailwindCSS v4 + DaisyUI utilities for layout; prefer extracting repeated logic into the component’s `utils.ts` or shared `utils/`.
- Components follow `M<Name>` prefix and PascalCase filenames inside the folder; routes/files stay kebab-case except dynamic params.

## Testing Guidelines
- No automated suite yet; smoke-test via `pnpm dev` and exercise key flows (home, search, category/tag, tool/detail pages).
- For logic-heavy additions, add Vitest + `@vue/test-utils` cases near the component directory and keep fixtures small.

## Commit & Pull Request Guidelines
- Use Conventional Commits seen in history (`feat: …`, `fix: …`, `chore: …`); keep subject imperative and concise (English or Chinese acceptable).
- PRs should describe scope, affected env keys (`.env.*`), manual checks performed, and include screenshots for UI-visible changes.
- Link related issues and call out new routes, server APIs, or runtime config fields that need deployment notes.

## Security & Configuration Tips
- Keep `.env.development` and `.env.production` aligned; required keys include `NUXT_PUBLIC_ENV`, `NUXT_PUBLIC_SITENAME`, `NUXT_PUBLIC_TITLE`, `NUXT_PUBLIC_ADS`, `NUXT_PUBLIC_CLARITY`.
- New pages should be reachable for prerender; if links are non-crawlable, ensure they’re added to sitemap generation in `utils/fun.ts`.
- Favor static-friendly code paths; avoid server-only dependencies in client bundles and clean any secrets from `public/`.
