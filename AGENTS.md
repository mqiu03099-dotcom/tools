# Repository Guidelines

## Codebase Layout & Module Architecture
- Routes live in `pages/`; shared UI blocks in `components/` (PascalCase Vue SFCs); reusable logic in `composables/` named `useThing.ts`.
- Helpers sit in `utils/`, shared typings in `types/`, API or middleware in `server/`, navigation data in `menus/`, and content sources in `articles/`.
- Static files go in `public/`; pipeline-managed assets in `assets/`. Avoid editing generated output: `.nuxt/`, `.output/`, `dist/`.
- Configuration: `nuxt.config.ts` plus env files `.env.development` and `.env.production`.

## Build, Verification, and Local Development Commands
- Node ≥20.19 with pnpm 8 (`corepack enable`). Install deps: `pnpm install` (runs `pnpm postinstall` to prep Nuxt artifacts).
- Dev server with dev env: `pnpm dev`; smoke with prod env locally: `pnpm pro`.
- Builds: `pnpm buildDev` or `pnpm buildPro`; serve built app: `pnpm preview`.
- Full publish-style run: `pnpm publishDev` / `pnpm publishPro` (serves `dist/` via global `http-server`).

## Style Guide & Naming Standards
- Nuxt 3 + Vue 3 with `<script setup>` and TypeScript favored over Options API; prefer composables over mixins.
- Tailwind CSS v4 with DaisyUI for styling; lean on utility classes and shared components instead of inline styles.
- Formatting via Prettier (`.prettierrc.json`): 2-space indent, no semicolons; check with `pnpm dlx prettier --check .`.
- Naming: components PascalCase, composables `useX`, utilities camelCase, env vars SCREAMING_SNAKE; keep imports shallow using Nuxt aliases where possible.

## Quality Assurance & Testing Protocols
- No automated tests yet; perform manual smoke tests on core pages, menus, and dynamic routes in both `pnpm dev` and `pnpm pro`/build outputs. Keep browser console clean.
- Always run `pnpm buildDev` (or `pnpm buildPro` when relevant) before sharing changes to catch type/SSR/runtime issues.
- If adding tests, mirror modules in `tests/unit/**` with `*.spec.ts` using a Vitest-style layout.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat: …`, `fix: …`, `chore: …`); keep messages concise and imperative.
- PRs should summarize changes, list env keys touched, and include screenshots/GIFs for UI updates; link issues and flag breaking changes or config migrations.
- Keep secrets out of VCS; rely on `.env.development` / `.env.production`. Do not commit generated artifacts (`.nuxt/`, `.output/`, `dist/`); update `.gitignore` if new build outputs appear.
