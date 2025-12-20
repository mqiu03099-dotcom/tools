# Repository Guidelines

## Project Structure & Module Organization
- `pages/` holds route-driven views (Nuxt file-based routing). `components/` stores shared UI blocks (PascalCase Vue SFCs). `composables/` contains reusable logic named `useThing.ts`.
- `utils/` for helpers, `types/` for shared typings, `server/` for API/middleware endpoints, `menus/` for navigation data, and `articles/` for content sources. `assets/` is pipeline-managed; `public/` serves static files directly. `.nuxt/`, `.output/`, and `dist/` are generated—do not edit by hand.
- `nuxt.config.ts` centralizes app config; environment files live in `.env.development` and `.env.production`.

## Build, Test, and Development Commands
- Tooling: Node ≥20.19, pnpm 8 (run `corepack enable` first). Install deps with `pnpm install`.
- `pnpm dev` runs the Nuxt dev server with development env vars; `pnpm pro` starts the dev server using production env vars for smoke checks.
- `pnpm buildDev` / `pnpm buildPro` create builds for the respective envs; use `pnpm preview` to serve a built app locally. `pnpm publishDev` / `pnpm publishPro` build then serve `dist/` via `http-server` (requires that binary to be available globally).
- `pnpm postinstall` runs automatically to prepare Nuxt artifacts.

## Coding Style & Naming Conventions
- Stack: Nuxt 3 + Vue 3 + TypeScript with `<script setup>` preferred over Options API. Favor composables over mixins.
- Styling: Tailwind CSS v4 with DaisyUI; lean on utility classes and shared components instead of inline styles.
- Formatting: Prettier configured in `.prettierrc.json` (2-space indent, no semicolons). Run `pnpm dlx prettier --check .` before submitting.
- Naming: Components in PascalCase, composables `useX`, utility modules camelCase, env vars `SCREAMING_SNAKE`. Keep import paths shallow; prefer Nuxt aliases when available.

## Testing Guidelines
- No automated tests are present yet; perform manual smoke tests on core pages, menus, and dynamic routes in both dev and production env modes.
- Always run `pnpm buildDev` (or `pnpm buildPro` if relevant) before a PR to catch type/SSR/runtime issues; confirm the browser console is clean.
- If you add tests, follow a Vitest-style layout (`tests/unit/**`, `*.spec.ts`) and mirror filenames of the modules under test.

## Commit & Pull Request Guidelines
- History follows Conventional Commits (`feat: …`). Continue with concise, imperative messages (e.g., `fix: resolve menu overflow`); group related changes per commit.
- PRs should include: summary, list of changes, env keys touched, and screenshots/GIFs for UI updates. Link issues when applicable and call out breaking changes or config migrations explicitly.

## Environment & Security
- Keep secrets out of VCS; rely on `.env.development` / `.env.production` and document any new keys in PR descriptions.
- Do not commit generated output (`.nuxt/`, `.output/`, `dist/`); update `.gitignore` if new build artifacts appear.
