# Development Rules

1. Make sure to run `pnpm lint` and `pnpm tsc` after any code changes you make in order to ensure there are no errors.
2. Record any learnings in the CLAUDE.md file. Make sure to keep a consistent style with the existing content and try to be concise and avoid duplication.

# Fusion Styleguide (Merged)

## Critical checks

- Types: never use `any` or `as` casts. Use `unknown` and type guards. Exception: `Partial<T> as T` is allowed for test mocks only.
- Tests: use Vitest with `*.test.ts(x)` naming and clear Arrange/Act/Assert structure.
- DOM queries: use semantic queries (`getByRole`, `getByLabelText`, etc.). Do not add `data-testid` to production code. Exception: a unit test may add a test id in the test file when mocking.
- Mocking: prefer typed mocks (`vi.fn(() => ...)`, `vi.fn<T>()`, `vi.mocked(...)`, `vi.mock(import(...))`). Avoid `vi.fn().mockReturnValue(...)` and `ReturnType<typeof vi.fn>`.
- Assertions: prefer `toHaveBeenCalledWith` / `toHaveBeenNthCalledWith` over raw `mock.calls`.
- Timing: use fake timers for debounce/throttle tests; avoid mocking timer/debounce behavior directly.
- Components: keep business logic out of UI components; extract to hooks and use context-based dependency injection when needed.
- Derived state: prefer derived values (or `useMemo`) over `useState` + `useEffect` for computed state.
- Styles: default to `styled-components`; in `libs/aura/**`, Tailwind utilities plus scoped portal/container imperative styles and required inline style helpers are allowed.
- Domains in tests: use reserved `.test` domains (for example `https://cognite.test`) to avoid accidental external traffic.
- TS config: do not add `paths` to `tsconfig*.json`; use relative imports or tool-level aliasing (for example Vite).
- PR hygiene: prefer smaller changes (ideal <200 lines, max 500) and keep tests fast (<2s each, <2min total).

# Component Registry Rules

When you create or update ANY component, run: `pnpm run registry:build`

This command:

1. Scans `src/components/ui/aura/` for all component files
2. Auto-detects npm dependencies and registry dependencies from imports
3. Generates `registry.json` in the root
4. Runs `shadcn build` to generate individual component files in `public/r/*.json`

The registry build process is fully automated - no manual configuration needed.

# Aura Barrel Export Rules

When you add, remove, or rename any export in `src/components/ui/aura/<component>/index.ts` or the component source file, update `src/components/ui/aura/index.ts` in the same change to keep top-level exports in sync.

Before finalizing, verify the new/changed symbol is exported from both the component barrel and the top-level Aura barrel.

# Primitives Progress Metadata Rules

When adding, removing, or renaming primitives/foundations, update `src/lib/primitives-catalog.ts` in the same change.

When the user asks for primitive/foundation progress updates, update the catalog metadata and ensure badges on `/primitives` reflect the new status.

If requested progress status is missing or ambiguous, ask a clarifying question before finalizing status metadata.

If a primitive/foundation is tracked but not implemented, keep or add a `comingSoon` placeholder path via catalog metadata.

# Building Components

## SKILLS AVAILABLE

For detailed component building guidelines, use the `/component-builder` skill.

## Key principles

- Use Base UI for complex interactions, native HTML for simple elements
- Always use `ComponentRef` (not `React.ElementRef`), except for Base UI Trigger components (Dialog, Popover, etc.) which should be plain functions without `forwardRef` as they handle refs internally
- No code comments in component files
- Extract helpers to relative Aura lib paths (for example `../../../../lib/utils.ts`)
- Use Tailwind design tokens, not arbitrary values. Utilities like `leading-4.5` are allowed when defined in our Tailwind config; avoid bracketed arbitrary values like `leading-[18px]`.
- Exports should be in a single export block. Format inline if it fits, or one-per-line if long. Let Biome handle formatting; avoid `// biome-ignore` comments.
- Component `index.ts` files in aura re-export from the main component (use `.ts` when no JSX). Prefer `import { Component } from "./component"; export { Component };` over inline export.
- Run `pnpm lint` and `pnpm tsc -b` after changes
- Do not include `importPath` in `*.metadata.ts` files

## Import Conventions

NEVER use `React.useState`, `React.useEffect`, etc.
ALWAYS import hooks directly: `import { useState, useEffect } from 'react'`
This applies to ALL React imports.
Import ordering should follow Biome `organizeImports` output.

**Fusion Import Strategy:**

Aura uses a dual-scope import system for migrating components to Fusion:

- **`@cognite/aura/*`** - Beta components ready for Fusion (e.g., `@cognite/aura/button`)
- **`@cognite/aura-lab/*`** - Alpha/experimental components (e.g., `@cognite/aura-lab/accordion`)
- **`@cognite/aura/lib/*`** - Shared utilities (e.g., `@cognite/aura/lib/utils`)

Components in `src/components/ui/core/` use `@cognite/aura/*`, components in `src/components/ui/lab/` use `@cognite/aura-lab/*`.

For files under `src/components/ui/aura/**`, prefer relative imports (for example `../../../../lib/utils`) over `@/*` aliases to keep generated/portable outputs stable. The `@cognite/*` imports are configured for when components are consumed in Fusion.

## Special Files

- `reasoning-original.tsx` is NOT redundant - it will be used in the future, do not remove it

## Learnings

- Use `PaginationStatus` for inline pagination counters instead of ad hoc spans.
- Pagination subcomponents inherit size from `PaginationContent`.
- Use `PaginationSelectTrigger` to inherit pagination size for selects.
- When `ArtifactListHeader` is present, remove top padding from `ArtifactListContent` and use title margin for spacing.
- Biome formatting prefers inline JSX for short elements and props.
- Getting started instructions should link to the Dune creation docs site instead of inline steps.
- Consolidate docs content onto the root page instead of routing under `/docs`.
- Use `forwardRef` and `displayName` for wrapper components to preserve refs.
- Base UI's `TooltipProvider` and `TooltipRoot` don't support refs - use plain functions, not `forwardRef`.
- When using Base UI's `useRender`, set the slot via `state.slot` instead of adding `data-slot` in `mergeProps` (avoids type casts).
- Component status checks should use valid `ComponentStatusType` values like "stable" and "ready-for-ga", not "production" or "done".
- Form components should import and use utility classes from relative Aura lib paths (for example `../../../../lib/utils`): `formElementBase`, `focusState`, `invalidState`, `disabledState`, `hoverState`, `filledState`.
- `formElementBase` includes `bg-background` by default. Override with `bg-transparent` or other backgrounds inline when needed.
- When form components are used inside compound components (like `InputGroup`), override hover/focus states to prevent conflicts with the parent container's styling.
- `InputGroup` uses `shadow-focus-ring` for focus state and `shadow-focus-ring-destructive` for error state. The error state selector must target `[data-slot=input-group-control][aria-invalid=true]` to take precedence over normal focus.
- InputGroup stories should showcase all alignment variants (inline-start, inline-end, block-start, block-end) and how it's used in compound components like PromptInput.
- When overriding focus states in InputGroup controls, must override BOTH `focus-visible:shadow-none` AND `aria-invalid:focus-visible:shadow-none` to prevent double focus rings in error states.
- Don't export prop types from components. Use inline typing (`type MessageProps = ...`) instead of `export type`. Consumers can use `ComponentProps<typeof Component>` if they need access to types. Follow the pattern used by Badge, Card, Button, Dialog, and AlertDialog components.
- Tooltip delay stories are more stable with deterministic waits and without interaction retries.
- Storybook stories should omit description metadata and explanatory comments; keep examples self-explanatory through naming and structure.
- Collapsible play tests are more stable when asserting `data-panel-open` and scoping queries to the panel.
- Tooltip play tests should avoid retry-based interaction fallbacks; fix root causes and prefer deterministic semantic checks.
- Hover card play tests are more reliable when asserting open-state attributes with deterministic waits (no retry fallbacks).
- Dropdown menu play tests are more reliable when querying portal content with `within(document.body).findByRole("menu")` and semantic menu item roles.
- Dialog play tests are more reliable when opening via trigger and querying portal content with `within(document.body).findByRole("dialog")`.
- Component files should order imports as React, third-party, then local aliases, and use `ComponentRef<...>` in `forwardRef` signatures.
- In story play functions, prefer semantic alert/button queries (`getByRole`/`findByRole`) over `querySelector('[data-slot=...]')` for more stable interaction tests.
- For emoji shown in JSX text/content, wrap each emoji in `<span role="img" aria-label="...">...</span>` for explicit accessible naming.
- Keep `*.metadata.ts` files metadata-only; remove any runtime/component code from them.
- Do not include `importPath` in `*.metadata.ts` files.
- Component `*.metadata.ts` files should include `name`, `status`, and `description` fields for the registry build script.
- Catalog grouping/filtering should rely on metadata `status`; do not use legacy `progressStatus`.
- Export blocks should list one export per line within a single `export { ... }` block (no separate `export { X };` lines).
- `getPortalContainer` supports optional `id`, `className`, and `style` overrides only at first container creation; once cached, custom options are ignored to avoid side effects on subsequent calls.
- For Base UI tooltip delay tests, avoid mouse-move “keepalive” events during the delay; they can prevent the delayed open from triggering. Prefer `hover` + deterministic wait, with a single hover retry if needed.
- Prefer a closure-scoped cancellation flag in async `useEffect` flows to avoid stale updates after unmount.
- For static brand images in app code, import from `src/assets` so Vite rewrites URLs correctly for base-path deployments.
- For portal stories, prefer semantic queries first; use test ids only in test code when mocking and no semantic query is available.
- Accordion story play tests are more robust when asserting trigger `aria-expanded` state changes instead of querying open panels by implementation-specific selectors.
- Aura components use relative paths (`../../../../lib/*`) for lib imports instead of `@/lib/*` to support portable/registry installs.
- Registry dependency extraction must account for relative component imports (for example `../helper-text`) so `registryDependencies` stays correct.
- In stories, prefer typed data arrays (for example `ComponentProps<typeof X>`) over `as const` casts for literal variants.
- When updating component metadata statuses from a list, update only existing `*.metadata.ts` files and skip missing components without creating placeholders.
- Set per-component Figma links in `src/lib/primitives-catalog.ts`; catalog and component pages use those URLs to enable clickable Figma icons.

# Storybook Stories

## SKILLS AVAILABLE:

For detailed story writing guidelines, use the `/story-builder` skill.

## Key principles

- Stories are the ONLY place for code examples
- All stories must have `parameters: { order: N }`
- Use explicit render functions with hardcoded props
- No inline code comments in play functions
- No JSX comments in render functions (e.g., `{/* comment */}`) - if you need section labels, use semantic HTML headings instead
- Omit Storybook description metadata and story-level explanatory comments; keep stories concise and self-explanatory
- Prioritize semantic queries (`getByRole`, `getByText`, etc.) over `getByTestId` in play functions
- Avoid `getByTestId` in story interactions; reserve test ids for mocked unit-test scenarios only
- Run `pnpm lint` and `pnpm tsc -b` after changes
