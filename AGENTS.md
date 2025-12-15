# Repository Guidelines

## Project Structure & Module Organization
- `pages/`: Nuxt page routes; drives static prerender output under `dist/`.
- `components/`: Reusable Vue components; keep UI-only logic here.
- `composables/`: Reusable logic hooks (`useX.ts`); prefer composables over deep prop drilling.
- `assets/`: Global styles (`assets/css` uses Tailwind v4 + DaisyUI) and images referenced by components.
- `public/`: Static files served as-is; prerender hooks drop `sitemap.xml` here.
- `server/`: Server routes or API helpers for SSR/SSG.
- `utils/`: Shared helpers (e.g., sitemap helpers in `utils/fun.ts`, URL helpers in `utils/url.ts`).
- `types/` and `template/`: Shared typings and template snippets; avoid coupling to page state.

## Build, Test, and Development Commands
- Prereqs: Node 20.19+, `corepack enable`, pnpm 8.x (`pnpm -v` to confirm).
- Install deps: `pnpm install`.
- Local dev (dev env vars): `pnpm dev`.
- Local dev with production env vars: `pnpm pro`.
- Build (development config): `pnpm buildDev` → outputs to `dist/`.
- Build (production config): `pnpm buildPro` → `dist/` static bundle + generated `public/sitemap.xml`.
- Preview built site: `pnpm preview` (expects prior build).
- Quick serve built assets: `pnpm publishDev` or `pnpm publishPro` (build then `http-server` from `dist/`).

## Coding Style & Naming Conventions
- Language: TypeScript + Nuxt 3 (ESM). Components in `PascalCase.vue`; composables prefixed `use` (e.g., `useTheme.ts`); utilities in `camelCase.ts`.
- Styling: Tailwind v4 with DaisyUI; prefer utility classes over bespoke CSS. CSS modules emit `[hash]_[local]` names by default.
- Formatting: Prettier enforced (2 spaces, semicolons, double quotes in scripts, single quotes in JSX, trailing commas, width 100, CRLF). Run your editor’s Prettier on save.
- Imports: Use `@/` alias for source root; keep relative imports shallow.

## Testing Guidelines
- No automated test suite is configured yet. If adding tests, prefer Vitest + Nuxt test utils; name files `*.spec.ts` colocated with the unit under test or under `tests/`.
- Manual checks: run `pnpm dev` for interactive QA; for release validation run `pnpm buildPro && pnpm preview` to ensure SSG output renders.
- Cover critical flows: page routing, sitemap generation (`nitro` hook), and any server utilities.

## Commit & Pull Request Guidelines
- Use Conventional Commit prefixes (history shows `feat:`). Common scopes: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Keep commits focused and descriptive (what/why). Include env or config changes in the body.
- PRs should include: summary of changes, linked issue/task, UI screenshots for visible changes, notes on env var updates (`.env.development` / `.env.production`), and how to verify (commands run).
- Before opening a PR, ensure builds pass (`pnpm buildPro`) and lint/format have been applied.

## Security & Configuration Tips
- `.env.development` / `.env.production` supply `NUXT_PUBLIC_*` values; anything prefixed `NUXT_PUBLIC_` ships to the client—never place secrets there.
- Do not commit `.env*` contents. Add new public keys with clear names and document defaults in PRs.
- Static output lives in `dist/`; avoid manual edits. Generated `.nuxt/` is transient and should not be committed.
