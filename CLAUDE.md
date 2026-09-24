# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A pnpm-workspace monorepo hosting three Astro sites for developer.overheid.nl:

- `apps/api-register` — API-register (apis.developer.overheid.nl)
- `apps/oss-register` — Open Source Register (oss.developer.overheid.nl)
- `apps/schema-register` — Schema-register

They share three publishable packages:

- `packages/components` — generic React components (`@developer-overheid-nl/don-register-components`), built on [Rijkshuisstijl Community Componenten](https://github.com/nl-design-system/rijkshuisstijl-community)
- `packages/layouts` — Astro layouts and SSR helper functions (`@developer-overheid-nl/don-register-layouts`), under `src/don/` (room for other orgs' layouts later)
- `packages/locales` — i18next translation strings, currently only `nl/translation.json`

`proprietary-don` / `proprietary-example` hold copyrighted/example assets (logos, fonts, icons). Apps depend on the generic `@developer-overheid-nl/proprietary` name, which is aliased in each app's `package.json` to one of these two workspace packages — the codebase always imports `@developer-overheid-nl/proprietary`, never the concrete package directly. All three apps + packages also get consumed as a starting point by the external [register-site-template](https://github.com/developer-overheid-nl/register-site-template) repo, so avoid baking app-specific assumptions into `packages/*`.

## Commands

Run from the repo root.

```
pnpm install                # install deps
pnpm dev                    # run all three app dev servers in parallel
pnpm dev:api / :oss / :schema   # run a single app's dev server (localhost:4321)
pnpm build                  # build all apps to ./dist
pnpm build:api / :oss / :schema
pnpm preview:api / :oss / :schema  # preview a production build locally

pnpm test                   # vitest (unit tests, workspace-wide via projects: packages/*, apps/*)
pnpm test -- run <file>     # run a single vitest file/pattern, non-watch
pnpm test:storybook         # vitest project that runs Storybook interaction/play-function tests (browser mode via Playwright)
pnpm test:e2e               # cypress e2e for both api and oss (needs the apps already running/built)
pnpm test:e2e:api / :oss    # cypress against one app only (baseUrl 4321 / 4322)
pnpm test:e2e:open          # cypress interactive runner

pnpm ts:test                 # tsc --noEmit, repo-wide type check
pnpm biome:check              # biome check --write (format + lint + import sort)
pnpm storybook                # storybook dev server on :6006
pnpm build-storybook

pnpm ts:oas                   # regenerate OpenAPI-derived TS types from redocly.yaml (openapi-typescript)
```

A pre-commit hook (lefthook) runs `biome check` on staged files automatically.

## Architecture

### Data flow: Astro SSR + generated OpenAPI types

Each app is `output: "server"` (Node adapter, standalone). Pages fetch data server-side in the Astro frontmatter using [openapi-fetch](https://openapi-ts.dev/openapi-fetch/), typed against generated schemas:

- `redocly.yaml` at the repo root defines every backend API (prod + test variant) and where `pnpm ts:oas` writes the generated types (`src/types/api-schema.prod.ts`, `.test.ts`, plus `tools-schema.*.ts` for api-register).
- Each app's `src/types/api-schema.ts` is a thin switcher: it re-exports either `./api-schema.prod` (default, must be what's committed) or `./api-schema.test`. `noTestSchemas.grit` is a Biome/GritQL rule that warns if a `*-schema.test.*` export is checked in — always leave `api-schema.ts` pointing at `.prod` before merging to `main`; only point it at `.test` while actively developing against the test backend or when deploying to the test environment (see README "Deploy naar test").
- `createClient<paths>({ baseUrl })` from `openapi-fetch` gives fully-typed `GET`/`POST` calls; route paths are referenced via generated `*Paths` enums (e.g. `ApiPaths.listApis`) rather than string literals.
- Server-only secrets/config (API URLs, keys, Piwik Pro IDs, Altcha HMAC key) are declared in each app's `astro.config.mjs` under `env.schema` (Astro's typed env) and consumed via `astro:env/server`.
- Mutations / form submissions go through Astro Actions (`astro:actions`, `defineAction`) in `src/actions/index.ts`, not API routes.

### Page structure per app

Each register app follows the same routing pattern (illustrated by api-register, mirrored in oss-register/schema-register with `apis`→`repositories`/`schemas`):

- `/apis` (bare) redirects/rewrites to `/apis/pagina/1` — pagination always lives under `pagina/[...page]`.
- `/apis/pagina/[...page].astro` — the overview/listing page: builds routing/query info via `getRouting`/`getSearchParams` (from `@developer-overheid-nl/don-register-layouts`), fetches the paginated list + facet filters from the API, and renders it through the `DonOverview` layout plus shared components (`CardsList`, `FacetFiltersForm`, `Search`, `SortForm`, `Pagination`, etc.).
- `/apis/[id].astro` — detail page for a single item, using the `Detail`-style layout.
- `/apis/zoeken`, `/apis/toevoegen.md`, `/apis/download` — search, static "how to add" content (Markdown via a local `Markdown.astro` layout + `layouts.Markdown`), and data download endpoints.
- `app.config.ts` at the app root centralizes per-site config: title, meta description, top navigation items, i18n overrides layered on top of `packages/locales`, and item-type labels — read this first when a page's copy/labels/nav seem app-specific.

### Shared layout/component boundary

- `packages/layouts` provides Astro-level page shells (`Base`, `Basic`, `BasicWithAside`, `Detail`, `Overview` under `src/don/`) and pure helper functions (`getPagination`, `getRouting`, `getSearchParams`, `parseHeaders`) — these have unit tests colocated as `*.test.ts`.
- `packages/components` provides the React component library, each component in its own folder (e.g. `src/button/Button.tsx` + `Button.stories.tsx`). Components are consumed by apps via the package's subpath exports (`@developer-overheid-nl/don-register-components`, `.../i18n`, `.../analytics`, `.../client`).
- CSS: global breakpoints/reset/helpers live in `packages/layouts/src/styles`; apps wire them in via PostCSS (`postcssGlobalData`, `postcssCustomMedia`) in `astro.config.mjs`; app-local component styles use CSS Modules (`*.module.css`).

### Storybook conventions (packages/components)

- Story `tags` render as sidebar badges (configured in `.storybook/manager.ts`): `re-export` (thin pass-through of an RHC component), `remixed`/`mixed` (RHC component with local additions), `custom` (fully local), `deprecated` (pair with an `@deprecated` JSDoc comment, surfaced by autodocs), `code-only` (layout/helper building block, not a standalone design element).
- Language convention: JSDoc comments on component source (`.tsx` props/interfaces, component descriptions) are written in **English**; the descriptive comment above a story's `meta` object is written in **Dutch**, matching the Dutch labels/example data used throughout stories.
- A component's `Props` interface must be `export`ed or `satisfies Meta<typeof Component>` fails with TS4023.
- Prefer realistic example data pulled from actual app usage (e.g. `app.config.ts` footer columns, real org names like Kadaster/Geonovum/Logius) over generic placeholders.
- After adding/editing a story, verify with `tsc --noEmit -p packages/components/tsconfig.json`, `biome check --write`, and `npx vitest run --project=storybook` (must be run from the repo root — it doesn't resolve from inside `packages/components`).

## Formatting, linting, versioning

- [Biome] handles formatting, linting, and import organization (`biome.json`); `.astro` files have some rules relaxed (const/import-type/unused checks off) since Biome's Astro support is partial. CI runs `biome ci` on push and `--error-on-warnings` on pull requests.
- [Changesets] manages versioning/changelogs for the publishable packages (`pnpm changesets:status`, `:version`, `:publish`) — add a changeset when changing `packages/*` or `proprietary-*`.

## Deployment

Deploys go through GitHub Actions plus a separate infra repo (`INFRA_REPO`), updating Kustomize overlays there rather than deploying directly from this repo:

- **Test**: `.github/workflows/deploy-test.yml` runs on pushes to any non-`main` branch, but only actually deploys commits whose message contains `[deploy-test]`. Before deploying to test, double-check each app's `src/types/api-schema.ts` points at the `.test` schema if you need the test backend.
- **Prod**: `.github/workflows/deploy-prod.yml` runs on push to `main`; it opens a PR in the infra repo bumping the image tag, and merging that PR triggers the actual rollout. Only production (`.prod`) API schemas may be merged to `main` (enforced by CI + `noTestSchemas.grit`).
- Three Docker images are built/pushed: `don-register-site` (api), `don-register-oss-site`, `don-register-schema-site`.
