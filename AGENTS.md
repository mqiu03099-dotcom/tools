# Repository Guidelines

## Project Structure & Module Organization
Keep route-driven views in `pages/` (nest minimally) and colocate page-only composables as `pages/<route>/use*.ts`. Shared UI atoms and molecules live in `components/`. Cross-cutting helpers belong in `utils/`, while shared TypeScript contracts (prefixed with `I`) stay in `types/`. Static assets load from `public/`, and generated bundles (`.nuxt/`, `.output/`) remain untracked. Server-specific logic sits under `server/`, and templates for scaffolding live in `template/`.

## Build, Test, and Development Commands
Run `pnpm install` after every dependency change to stay aligned with `pnpm-lock.yaml`. Use `pnpm dev` for the local Nuxt server with `.env.development`, and `pnpm pro` for staging smoke tests with production env vars. Generate bundles via `pnpm buildDev` or `pnpm buildPro`, then inspect the latest build with `pnpm preview`. Deploy only when you can monitor the remote host via `pnpm publishDev` or `pnpm publishPro`.

## Coding Style & Naming Conventions
Follow the repo Prettier rules (2-space indent, double quotes, trailing commas, CRLF). Format before committing with `pnpm exec prettier --write "src/**/*.{ts,vue}"`. Vue SFCs must use `<script setup lang="ts">`, components are PascalCase (e.g., `SearchPanel.vue`), and composables start with `use*`. Directories stay lowercase-kebab (`pages/blog-post`), and interfaces go in `types/*.d.ts` with names like `IArticleMeta`.

## Testing Guidelines
Automated tests are not wired yet, so manually exercise each feature in `pnpm dev` under both `.env.development` and `.env.production` to catch content or analytics drift. When adding specs, colocate them as `<name>.spec.ts` and drive them with Vitest (`pnpm vitest run`). Document uncovered edge cases in the PR description until CI coverage exists.

## Commit & Pull Request Guidelines
Write Conventional Commits aligned with the history (e.g., `feat: 增加谷歌搜索排行`). Keep commits focused; separate refactors from features. PRs must outline the problem statement, summarize changes, state the environment used (`dev` or `pro`), include manual test notes, and attach screenshots for UI updates. Link related issues or backlog IDs whenever possible.

## Security & Configuration Tips
Never commit populated `.env.*` files—share secrets through the PM2 deployment vault. If you introduce a new runtime variable, update `ecosystem.config.cjs` and flag the change in the PR so operations can sync environments. Keep generated artifacts out of version control and validate that `public/` holds only safe static assets.
