# Aura + Flows Community

This repo hosts the **Aura design system site** and the **Flows Community shadcn registry** for shared industrial UI in Cognite Flows. Core primitives stay on NPM as `@cognite/aura`; community items ship as ejectable source under `@aura`.

Community component docs preview examples **natively** (portable Storybook stories) — not via iframe.

| Layer | Distribution | Support |
| --- | --- | --- |
| **Aura Core** | NPM package `@cognite/aura` | Centrally maintained |
| **Flows Community** | Source registry `@aura` | Community-vetted, use at your discretion |

Official Aura docs: [docs.cognite.com/aura-design-system](https://docs.cognite.com/aura-design-system)

Community site + registry: [cognitedata.github.io/flows-community-components](https://cognitedata.github.io/flows-community-components)

## Install a community component

Full guide, including troubleshooting: [Installation](https://cognitedata.github.io/flows-community-components/community/installation).

1. Install Aura: `npm install @cognite/aura`.

2. Register the `@aura` namespace. Without it, `shadcn add @aura/...` fails with `Unknown registry "@aura"`. If you already have a `components.json`, let the CLI add it:

```bash
npx shadcn@latest registry add "@aura=https://cognitedata.github.io/flows-community-components/r/{name}.json"
```

Otherwise create `components.json` (Tailwind v4: empty `config`, `css` = your stylesheet). We recommend this over `shadcn init`, which writes shadcn's default theme variables that Aura already provides:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@aura": "https://cognitedata.github.io/flows-community-components/r/{name}.json"
  }
}
```

3. In that stylesheet, import Aura source styles and `@source` installed community components:

```css
@import "@cognite/aura/styles.source.css";

@source './components/ui/community/**/*.{ts,tsx}';
```

4. Install an item:

```bash
npx shadcn@latest add @aura/drawer
```

Or skip the namespace and install by URL:

```bash
npx shadcn@latest add https://cognitedata.github.io/flows-community-components/r/drawer.json
```

Community items depend on `@cognite/aura` and copy source into your repository.

## Search order

1. Aura Core (`@cognite/aura`)
2. Flows Community (`@aura/...`)
3. Compatible shadcn registries (prefer Base UI)
4. New implementation using Aura primitives and tokens

## Develop in this repo

```bash
pnpm install
pnpm dev                 # docs site
pnpm storybook           # Storybook (community components)
pnpm run registry:build  # regenerate registry.json + public/r
pnpm run registry:check  # fail if registry artifacts are stale
pnpm lint
pnpm tsc -b
pnpm run test:storybook:ci
```

Community components live in `src/components/ui/community/`. Contribution model: [docs/decisions/2026-08-04-aura-community-contribution-model.md](docs/decisions/2026-08-04-aura-community-contribution-model.md).
