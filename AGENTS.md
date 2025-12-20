# Repository Guidelines

## Codebase Layout & Module Architecture
- Routes sit in `pages/`; shared UI blocks live in `components/` (PascalCase Vue SFCs); reusable logic belongs in `composables/` as `useThing.ts`.
- Helpers go in `utils/`, shared typings in `types/`, API or middleware in `server/`, navigation data in `menus/`, and content sources in `articles/`.
- Static assets stay in `public/`; pipeline-managed items in `assets/`. Avoid touching generated output: `.nuxt/`, `.output/`, `dist/`.
- Key configuration resides in `nuxt.config.ts` plus env files `.env.development` and `.env.production`.

## Build, Test, and Local Development Workflow
- Requirements: Node ≥20.19 with pnpm 8 (`corepack enable`).
- Install dependencies: `pnpm install` (triggers `pnpm postinstall` to prep Nuxt artifacts).
- Run locally: `pnpm dev` for development env; `pnpm pro` to smoke-test with production env vars.
- Build outputs: `pnpm buildDev` or `pnpm buildPro`; serve built app with `pnpm preview`.
- Publish-style check: `pnpm publishDev` / `pnpm publishPro` (serves `dist/` via global `http-server`).

## Coding Style & Naming Conventions
- Nuxt 3 + Vue 3 with `<script setup>` and TypeScript preferred over Options API; favor composables over mixins.
- Styling via Tailwind CSS v4 with DaisyUI; prefer utility classes and shared components over inline styles.
- Formatting enforced by Prettier (`.prettierrc.json`): 2-space indent, no semicolons; verify with `pnpm dlx prettier --check .`.
- Naming: components PascalCase, composables `useX`, utilities camelCase, env vars SCREAMING_SNAKE; keep imports shallow using Nuxt aliases.

## Testing Guidelines & Quality Checks
- No automated suite yet—perform manual smoke tests on core pages, menus, and dynamic routes in both `pnpm dev` and prod-mode builds; keep the browser console clean.
- Always run `pnpm buildDev` (or `pnpm buildPro` when prod settings are relevant) before sharing to catch type/SSR/runtime issues.
- If adding tests, mirror source modules in `tests/unit/**` with `*.spec.ts` following a Vitest-style layout.

## Commit & Pull Request Guidelines
- Use Conventional Commits (`feat: …`, `fix: …`, `chore: …`); keep messages concise and imperative.
- PRs should summarize changes, list env keys touched, and include screenshots/GIFs for UI updates; link issues and flag breaking changes or config migrations.
- Security & artifacts: keep secrets in env files; do not commit `.nuxt/`, `.output/`, `dist/`. Update `.gitignore` if new build outputs appear.
