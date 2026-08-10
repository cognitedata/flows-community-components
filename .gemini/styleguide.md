---
alwaysApply: true
---

# PR Review Styleguide (Gemini)

Use this checklist when reviewing pull requests. Flag deviations as requested changes.

## Review Comment Format
- Reference files with repository-relative paths (for example `src/components/ui/community/drawer/drawer.tsx:42`).
- Do not use absolute filesystem paths.

## Community Components
- New components live under `src/components/ui/community/<name>/` with `index.ts`, `<name>.metadata.ts`, and Storybook title `Community/<Name>`.
- Metadata must include `name`, `status: 'experimental'` (or another valid status), and `description`.
- Import Core from `@cognite/aura/components` and `@cognite/aura/utils`.
- After component changes, require `pnpm run registry:check` (or `registry:build` with committed `registry.json` + `public/r/`).

## Storybook Stories
- Stories live next to the community component and use title `Community/<Name>`.
- Require `parameters: { order: N }` on every story.
- Prefer semantic queries in `play` functions (`getByRole`, `findByRole`, etc.).
- Keep stories self-explanatory; omit docs prose metadata and inline explanatory comments.

## React Import Conventions
- Disallow `React.useState`, `React.useEffect`, etc.
- Require direct hook imports: `import { useState, useEffect } from 'react'`.

## Checks
- `pnpm lint` and `pnpm tsc -b` must pass.
