# Repository Guidelines

## Project Structure & Module Organization
- Nuxt 3 + TypeScript workspace with pages in `pages/`, UI primitives in `components/`, shared logic in `composables/` and `utils/`.
- Styling tokens and static imagery live in `assets/`; public exports in `public/`.
- Server routes and Nitro hooks reside in `server/`. Build outputs (`.nuxt/`, `.output/`, `dist/`) stay untracked and regenerated via build scripts.

## Build, Test, and Development Commands
- `corepack enable && pnpm i` — lock Node 20.19.4+/pnpm 8.15 and install dependencies.
- `pnpm dev` / `pnpm pro` — run the Nuxt dev server per environment file.
- `pnpm buildDev` / `pnpm buildPro` — emit staging or production Nitro bundles.
- `pnpm preview` — serve the last production build locally.
- `pnpm publishDev|Pro` (and `*R`) — rebuild then restart the pm2 target in `ecosystem.config.cjs`.

## Coding Style & Naming Conventions
- Follow `.prettierrc.json`: 2-space indent, semicolons, double quotes, JSX single quotes, trailing commas, CRLF endings.
- Components use PascalCase; composables follow `useFoo`; pages use kebab-case routes; helpers use camelCase.
- Keep Tailwind utility chains lean; factor repeats into `assets/css` tokens or DaisyUI themes. Add comments only to clarify non-obvious flows.

## Testing Guidelines
- Prefer Vitest or Nuxt test-utils specs (`*.spec.ts`) alongside code or under `tests/`.
- Run `pnpm dev` for local verification; use `pnpm preview` to smoke-test prerendered output.
- When altering SEO or routing, rebuild with `pnpm buildPro` and inspect `public/sitemap.xml`.

## Commit & Pull Request Guidelines
- Use Conventional Commit prefixes (`feat:`, `fix:`, `chore:`); keep subjects imperative and scoped.
- Pull requests should link issues, summarize behavior changes, list executed commands, and include before/after screenshots for UI tweaks.
- Call out edits to `.env*`, `nuxt.config.ts`, or `wrangler.jsonc` to surface deployment impact. Never commit plaintext secrets; use `wrangler secret put` for hosted environments.
