# Repository Guidelines

## Project Structure & Module Organization
This Nuxt 3 + TypeScript workspace keeps page-level views in `pages/`, UI primitives in `components/`, and shared logic in `composables/` and `utils/`. Static imagery and Tailwind tokens belong in `assets/`, while static exports live in `public/`. Server routes and Nitro hooks reside in `server/`. Build outputs (`.nuxt/`, `.output/`, `dist/`) stay untracked; recreate them via the scripts below.

## Build, Test, and Development Commands
- `corepack enable && pnpm i` - lock Node 20.19.4+/pnpm 8.15 and install dependencies.
- `pnpm dev` / `pnpm pro` - run the Nuxt dev server against each environment file.
- `pnpm buildDev` / `pnpm buildPro` - emit static Nitro bundles for staging or production.
- `pnpm preview` - serve the last production build locally for smoke tests.
- `pnpm publishDev|Pro` (and `*R`) - rebuild then restart the pm2 target defined in `ecosystem.config.cjs`.

## Coding Style & Naming Conventions
Follow `.prettierrc.json`: 2-space indentation, semicolons, double quotes, JSX single quotes, trailing commas, CRLF endings. Components stay in PascalCase, composables use the `useFoo` pattern, page files adopt kebab-case routes, and helpers use camelCase. Keep Tailwind utility chains focused; factor repeated patterns into `assets/css` tokens or DaisyUI themes. Add comments only when clarifying non-obvious flows such as Nitro hooks or sitemap generation.

## Testing Guidelines
Automated coverage is light, so add Vitest or Nuxt test-utils specs (`*.spec.ts`) next to the code or under `tests/` whenever you touch business logic. Run `pnpm dev` for verification and `pnpm preview` for prerendered output before opening a PR. When changing SEO or routing behavior, inspect the regenerated `public/sitemap.xml` after `pnpm buildPro` to confirm URLs and priorities.

## Commit & Pull Request Guidelines
Commits use Conventional Commit prefixes (`feat:`, `fix:`, `chore:`) as seen in `git log`. Keep subjects imperative, describe scope, and squash noisy WIP commits locally. Pull requests should link issues, summarize behavioral changes, list the commands executed, and include before/after screenshots for UI tweaks. Call out edits to `.env*`, `nuxt.config.ts`, or `wrangler.jsonc` so reviewers can gauge deployment impact.

## Environment & Deployment Notes
Populate the `NUXT_PUBLIC_*` keys (title, ads, clarity, site name) in the correct `.env.*` file before building. `pnpm publishPro` relies on those values for head tags, analytics, and pm2 startup; never commit plaintext secrets - use `wrangler secret put` for hosted environments. Cloudflare Workers and pm2 both consume `dist/`, so rerun the appropriate build command instead of editing generated files by hand.
