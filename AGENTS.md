# Repository Guidelines

## Project Structure & Module Organization
- `pages/` holds Nuxt routes (home, search, menu, theme, about, contact, privacy, `category/[category]`, `tag/[tag]`, `detail/[toolId]`, `tool/[toolId]`, `article/...`).
- `components/M<Name>/` groups UI pieces with `index.vue`, `type.ts`, `utils.ts`, `data.ts`; scaffold new pieces from `template/folder/`.
- Shared hooks in `composables/` (e.g., `usePageSeo`, `useWebName`); cross-cutting helpers in `utils/` (URL normalization, sitemap helpers, theme/menu data).
- Nitro endpoints live in `server/api/` and stay small/POST-focused; global styles in `assets/css/`; static assets, verification files, `ads.txt`, and generated `public/sitemap.xml` in `public/`.
- Articles richText in `articles/` must use angled quotes for rich text instead of standard double quotes.

## Build, Test, and Development Commands
- `corepack enable && pnpm install` (pnpm 8.15.0 on Node 20.19+).
- `pnpm dev` serves `.env.development` on `0.0.0.0:6179`; `pnpm pro` mirrors production via `.env.production`.
- `pnpm buildDev` / `pnpm buildPro` produce static builds (Nitro `static` preset) and prerender `public/sitemap.xml`; `pnpm preview` serves the build.
- `pnpm publishDev` / `pnpm publishPro` build then serve `dist/` via global `http-server`.

## Coding Style & Naming Conventions
- TypeScript with `<script setup>`; 2-space indent, semicolons, double quotes, trailing commas (`.prettierrc.json`).
- Components use the `M` prefix with PascalCase folders/files; routes stay kebab-case except dynamic params.
- Prefer TailwindCSS v4 + DaisyUI utilities; extract repeated logic into component `utils.ts` or shared `utils/`.

## Testing Guidelines
- No formal suite yet—smoke-test via `pnpm dev` across home, search, category/tag, tool/detail pages.
- For logic-heavy additions, add lightweight Vitest + `@vue/test-utils` cases near the component with minimal fixtures; name tests after the feature or prop under test.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat:`, `fix:`, `chore:`); keep subjects concise/imperative (English or Chinese).
- PRs should outline scope, env key changes (`.env.*`), manual checks performed, linked issues, and UI screenshots when applicable; call out new routes, APIs, or runtime config needing deployment notes.

## Security & Configuration Tips
- Keep `.env.development` and `.env.production` aligned; required keys: `NUXT_PUBLIC_ENV`, `NUXT_PUBLIC_SITENAME`, `NUXT_PUBLIC_TITLE`, `NUXT_PUBLIC_ADS`, `NUXT_PUBLIC_CLARITY`.
- Favor static-friendly dependencies and avoid server-only libs in client bundles; keep secrets out of `public/`.
- Ensure new pages are crawlable for prerender; if not linked, add them to sitemap generation in `utils/fun.ts`.
