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

When you create or update ANY community component, run: `pnpm run registry:build`

This command:

1. Scans `src/components/ui/community/` for all component files
2. Auto-detects npm dependencies (including `@cognite/aura`) and registry dependencies from imports
3. Generates `registry.json` in the root
4. Runs `shadcn build` to generate individual component files in `public/r/*.json`

The registry build process is fully automated - no manual configuration needed.

The docs site and Storybook resolve `@cognite/aura/*` from the published NPM package (`^0.3.5`). Local `src/components/ui/aura/` has been removed; Core primitives are not maintained in this repo. Registry publication still scans only `src/components/ui/community/`.

# Building Components

## SKILLS AVAILABLE

For detailed component building guidelines, use the `/component-builder` skill.

## Key principles

- Use Base UI for complex interactions, native HTML for simple elements
- Always use `ComponentRef` (not `React.ElementRef`), except for Base UI Trigger components (Dialog, Popover, etc.) which should be plain functions without `forwardRef` as they handle refs internally
- No code comments in component files
- Extract helpers to `@cognite/aura/utils` or local `src/lib` helpers as appropriate
- Use Tailwind design tokens, not arbitrary values. Utilities like `leading-4.5` are allowed when defined in our Tailwind config; avoid bracketed arbitrary values like `leading-[18px]`.
- Exports should be in a single export block. Format inline if it fits, or one-per-line if long. Let ESLint handle lint autofixes; avoid tool-specific ignore comments unless needed.
- Community component `index.ts` files re-export from the main component (use `.ts` when no JSX). Prefer `import { Component } from "./component"; export { Component };` over inline export.
- Run `pnpm lint` and `pnpm tsc -b` after changes
- Do not include `importPath` in `*.metadata.ts` files

## Import Conventions

NEVER use `React.useState`, `React.useEffect`, etc.
ALWAYS import hooks directly: `import { useState, useEffect } from 'react'`
This applies to ALL React imports.
Import ordering should follow the repo lint autofix output.

**Fusion Import Strategy:**

Aura uses a dual-scope import system for migrating components to Fusion:

- **`@cognite/aura/*`** - Beta components ready for Fusion (e.g., `@cognite/aura/button`)
- **`@cognite/aura-lab/*`** - Alpha/experimental components (e.g., `@cognite/aura-lab/accordion`)
- **`@cognite/aura/lib/*`** - Shared utilities (e.g., `@cognite/aura/lib/utils`)

Components in `src/components/ui/community/` import `@cognite/aura/components` and `@cognite/aura/utils` from the published NPM package.

## Special Files

- `reasoning-original.tsx` is NOT redundant - it will be used in the future, do not remove it

## Learnings

- Primitive components should not use child introspection (`Children`, `cloneElement`, `isValidElement`) to drive behavior or styling.
- For slot-based primitives, keep optional regions explicit via props/subcomponents and place them with `data-slot` selectors instead of relying on child render order.
- Avoid prop overload patterns in component APIs; prefer explicit, single-purpose props and composition slots.
- Preserve existing ref contracts when refactoring primitives. If a component previously exposed refs, keep `forwardRef` support and use cast-free typing.
- For date/time-derived UI, avoid unstable `new Date()` defaults that can diverge between server and client renders; prefer deterministic reference-time props and stable fallbacks.
- In shared primitives, prefer broadly supported spacing utilities (for example `mt-px` or `mt-0.5`) over niche micro-step classes unless they are intentionally standardized.
- Storybook `argTypes` for key state/behavior props should include concise categories and descriptions to improve generated docs clarity.
- Add stateful stories only when state transitions are core component behavior; do not force `useState` examples for static/compositional primitives.
- Use `PaginationStatus` for inline pagination counters instead of ad hoc spans.
- Pagination subcomponents inherit size from `PaginationContent`.
- Use `PaginationSelectTrigger` to inherit pagination size for selects.
- When `ArtifactListHeader` is present, remove top padding from `ArtifactListContent` and use title margin for spacing.
- Keep JSX inline for short elements and props where readability is not reduced.
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
- Storybook stories should omit docs prose metadata (for example `parameters.docs.description`) and explanatory comments; keep examples self-explanatory through naming and structure.
- Playground stories should define grouped `argTypes` (for example Display, Content, Accessibility, Events) with clear control metadata and descriptions for interactive docs.
- Collapsible play tests are more stable when asserting `data-panel-open` and scoping queries to the panel.
- Topbar wrapper sections should use `ComponentRef<"div">` with `ComponentProps<"div">` for consistent forwardRef typing.
- Tooltip play tests should avoid retry-based interaction fallbacks; fix root causes and prefer deterministic semantic checks.
- Hover card play tests are more reliable when asserting open-state attributes with deterministic waits (no retry fallbacks).
- Dropdown menu play tests are more reliable when querying portal content with `within(document.body).findByRole("menu")` and semantic menu item roles.
- Dialog play tests are more reliable when opening via trigger and querying portal content with `within(document.body).findByRole("dialog")`.
- Pagination play tests are most reliable when validating teleport and navigation via semantic textbox/link roles plus deterministic `waitFor` assertions after Enter/click interactions.
- Component files should order imports as React, third-party, then local aliases, and use `ComponentRef<...>` in `forwardRef` signatures.
- In story play functions, prefer semantic alert/button queries (`getByRole`/`findByRole`) over `querySelector('[data-slot=...]')` for more stable interaction tests.
- In community story files, import Core primitives from `@cognite/aura/components`.
- Avoid bracketed arbitrary Tailwind values in overlays/modals; follow the existing `dialog.tsx` positioning pattern (`top-1/2`, `-translate-y-1/2`, and `sm:-translate-x-1/2`) instead.
- Avoid Tailwind bracket arbitrary grid templates (e.g. `grid-cols-[...]`); prefer a semantic layout (often flex) by extracting known slot children and rendering them in a predictable structure.
- For emoji shown in JSX text/content, wrap each emoji in `<span role="img" aria-label="...">...</span>` for explicit accessible naming.
- Keep `*.metadata.ts` files metadata-only; remove any runtime/component code from them.
- Do not include `importPath` in `*.metadata.ts` files.
- Keep `llmUsage` in `*.metadata.ts` files because it helps LLMs understand component and story usage patterns.
- Component `*.metadata.ts` files should include `name`, `status`, and `description` fields for the registry build script.
- Catalog grouping/filtering should rely on metadata `status`; do not use legacy `progressStatus`.
- Keep exports in a single `export { ... }` block. Allow a single-line export block unless it exceeds print width; when it wraps, use one export per line (avoid multiple separate export statements).
- `getPortalContainer` supports optional `id`, `className`, and `style` overrides only at first container creation; once cached, custom options are ignored to avoid side effects on subsequent calls.
- For Base UI tooltip delay tests, avoid mouse-move “keepalive” events during the delay; they can prevent the delayed open from triggering. Prefer `hover` + deterministic wait, with a single hover retry if needed.
- Prefer a closure-scoped cancellation flag in async `useEffect` flows to avoid stale updates after unmount.
- For static brand images in app code, import from `src/assets` so Vite rewrites URLs correctly for base-path deployments.
- For portal stories, prefer `canvas.findByTestId()` and add a stable `data-testid` on the dialog content wrapper when semantic queries are not practical.
- Breadcrumb examples that mirror product UI can combine a static `BreadcrumbEllipsis` in the path with a `BreadcrumbPageButton` dropdown for current-page actions.
- Breadcrumb stories should include `parameters.order` for every story and avoid inline `//` comments inside play functions.
- When `noImplicitAny` is enabled, type Storybook `play` contexts explicitly (e.g. `({ canvasElement }: { canvasElement: HTMLElement })`) and type Playground `args` with `ComponentProps<typeof Component>`.
- For portal stories, prefer semantic queries first; use test ids only in test code when mocking and no semantic query is available.
- Accordion story play tests are more robust when asserting trigger `aria-expanded` state changes instead of querying open panels by implementation-specific selectors.
- Aura components use relative paths (`../../../../lib/*`) for lib imports instead of `@/lib/*` to support portable/registry installs.
- Registry dependency extraction must account for relative component imports (for example `../helper-text`) so `registryDependencies` stays correct.
- In stories, prefer typed data arrays (for example `ComponentProps<typeof X>`) over `as const` casts for literal variants.
- For chart config typing in stories/pages, prefer `ComponentProps<typeof ChartContainer>["config"]` (or `ComponentProps<typeof Chart>["config"]`) instead of importing/exporting `ChartConfig` types.
- When updating component metadata statuses from a list, update only existing `*.metadata.ts` files and skip missing components without creating placeholders.
- Community catalog grouping uses metadata `status` from community `*.metadata.ts` files.
- Suggestion stories should query open select content semantically via `within(document.body).queryByRole("listbox")` and keep `parameters.order` set on every story export.
- Suggestion stories should use design-token widths (for example `w-52`, `max-w-xl`) instead of arbitrary bracket widths for prompt cards and wrappers.
- Suggestion stories should use the valid typography utility `leading-tighter`; avoid typos like `leading-tigher`.
- `SuggestionItem` values should come from an explicit `value` prop instead of deriving from `children`.
- Drawer play tests are more reliable when querying portal dialogs via `within(document.body).findByRole("dialog", { name: /.../i })` and then scoping button queries with `within(dialog).getByRole(...)`.
- For Base UI `Slider`, type `onValueChange` from `SliderPrimitive.Root.Props<readonly number[]>["onValueChange"]` to avoid `as` casts, and default to a single-thumb value when no `value`/`defaultValue` is provided.
- Conversation stories should keep play assertions semantic (`getByRole`/`findAllByRole`) and avoid helper components inside story render functions.
- For components that accept a `render` element and forward accessibility props, set the accessible label once on the component to avoid duplicate `aria-label` attributes on both wrapper and inner element.
- In Aura stories, avoid DOM traversal selectors in play functions; prefer semantic role/text queries for the interacted element.
- Keep the generic `Artifact` component primitive-agnostic and showcase primitive-specific artifact layouts in stories.
- Use `CardHeaderLeft`, `CardTitle`, `CardDescription`, and `CardHeaderRight` for card header layouts; use `ArtifactTitle` for artifact-style title styling (`text-base tracking-tighter`); avoid `CardIcon` in new stories.
- Keep `Artifact` lightweight as a wrapper over `Card`; prefer composing artifact layouts with `Card` subcomponents and introduce artifact-specific subcomponents only when there is shared artifact-only behavior.
- Use `CardHeader` as a flex container with `CardHeaderContent` as the central stacked title/description area; avoid row/column grid positioning classes in header subcomponents.
- Use shared `CardFooterLeft`, `CardFooterCenter`, and `CardFooterRight` subcomponents from `Card` instead of redefining footer alignment helpers in stories.
- Do not keep `CardIcon` as an alias; use `CardHeaderLeft` directly as the single left-slot API.
- When composing Artifact headers, pair `ArtifactTitle` with `ArtifactDescription` wrappers for consistent Artifact-level semantics over `CardTitle`/`CardDescription`.
- For table stories, prefer tokenized width utilities (`w-12`, `w-24`) and semantic role assertions over arbitrary bracket values and `querySelector` checks.
- For fixed-width table behavior with long text, use `table-fixed` on the table and `truncate` on header/data cells to keep columns stable and clip overflow content.
- Breadcrumb story assertions for `BreadcrumbPageButton` should query by role/name (`getByRole("button", { name: ... })`) instead of chaining `.closest("button")`.
- In story play tests, avoid `canvasElement.querySelectorAll('[data-slot=\"skeleton\"]')`; prefer semantic queries (for example role/text-based) and only fall back to slot selectors when no semantic target exists.
- Progress stories should assert state via semantic `progressbar` ARIA attributes (`aria-valuenow`, min/max/name) instead of querying internal indicator slots.
- Toolbar accessibility stories are more reliable when each toolbar has a distinct `aria-label` and keyboard navigation assertions are scoped with `within(toolbar)` for the intended orientation.
- For composite link props that include display-only fields (for example `label`), strip non-anchor fields before spreading props onto `<a>` elements.
- For full-page loading states, prefer a dedicated `PageLoader` primitive over reusing inline spinners, and expose `disableFixedCenter` for embedding in constrained containers.
- For segmented controls, pass matching `size` and `tabContent` variants to both `SegmentedControlList` and `SegmentedControlButton` so dimensions align with Figma across label-only, icon-only, and icon+label states.
- Community components under `src/components/ui/community/<name>/` need `index.ts` (re-export component symbols), `<name>.metadata.ts` with `status: 'experimental'`, and Storybook titles under `Community/<Name>`; the community barrel re-exports components only.
- Registry publication scans only `src/components/ui/community/`; community sources import `@cognite/aura/components` and `@cognite/aura/utils` from the published NPM package.
- Docs site is branded Flows Community (powered by Aura). Chrome imports `@cognite/aura/components`; styling comes from `@cognite/aura/styles.source.css` via `src/globals.css` (with `@source` for community/docs files). Do not keep a local token/theme CSS fork. Keep the local `ThemeProvider`. Registry namespace remains `@aura`.
- Core docs links use `https://docs.cognite.com/aura-design-system` (not cog.link/aura).
- GitHub Pages serves the Community docs site plus `public/r/*.json`; do not restore the cog.link redirect in `package.json` build or `deploy.yml`.
- Community docs Examples use portable stories via `StoriesRenderer` (`import.meta.glob` on `src/components/ui/community/*/*.stories.tsx` + `composeStories`); `ExamplePreview` pulls CodeBlock UI from `@cognite/aura/components`. Keep `storySourcePlugin` in `vite.config.ts` for source injection.

# Storybook Stories

## SKILLS AVAILABLE:

For detailed story writing guidelines, use the `/story-builder` skill.

## Key principles

- Stories are the ONLY place for code examples
- All stories must have `parameters: { order: N }`
- Use explicit render functions with hardcoded props
- No inline code comments in play functions
- No JSX comments in render functions (e.g., `{/* comment */}`) - if you need section labels, use semantic HTML headings instead
- Omit Storybook docs prose metadata (for example `parameters.docs.description`) and story-level explanatory comments; keep stories concise and self-explanatory
- Prioritize semantic queries (`getByRole`, `getByText`, etc.) over `getByTestId` in play functions
- Avoid `getByTestId` in story interactions; reserve test ids for mocked unit-test scenarios only
- Run `pnpm lint` and `pnpm tsc -b` after changes
