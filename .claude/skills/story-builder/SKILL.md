---
name: story-builder
description: Write comprehensive Storybook stories for Aura components. Use when creating or updating .stories.tsx files.
---

# Story Builder

Write comprehensive, tested Storybook stories for Aura components.

## When to Use

- Creating new `.stories.tsx` files
- Updating existing story files
- User mentions "story", "storybook", "stories", or "examples"

## File References

This skill references actual files in the codebase as examples. To locate a file, use grep or file search (e.g., "find me badge.stories.tsx"). If multiple files match, prompt the user with full paths to confirm which file to use. If a file isn't findable, prompt the user to provide the code example. Update references if better examples emerge.

## Core Principle

Stories are the ONLY place for code examples. They're tested, interactive, and automatically documented. Never duplicate examples in `index.tsx` or `*.metadata.ts`.

## Story Ordering

All stories MUST have `parameters: { order: N }`. Start from 1, increment sequentially. Playground always uses `order: 99`.

### Standard Story Sequence

Include stories that apply, skip others. Keep incrementing order numbers.

1. **Basic** - Default use case
2. **Variants** - One story per variant
3. **All Variants** - Side-by-side comparison
4. **Composition** - `WithHeader`, `WithIcon`, etc. (only if optional features exist)
5. **Sizing/Styling** - Size/style variants
6. **Minimal** - Simplest usage (only if different from Basic)
7. **Interactive** - Stateful examples with `useState`
8. **Accessibility** - ARIA, keyboard nav
9. **Visual Regression** - Baseline for testing
10. **Edge Cases** - Empty, long text, special chars, icon-only, mixed content
11. **Playground** (optional) - `render: (args) => <Component {...args} />`, `order: 99`. Skip for simple/compositional components.

See `badge.stories.tsx` or `button.stories.tsx` for comprehensive story ordering examples.

## Render Functions

All stories MUST use explicit render functions with hardcoded props. Never use `{...args}` in example stories.

**Exception:** Only Playground uses `render: (args) => <Component {...args} />`.

**Never use helper components** - inline all JSX directly. See `pagination.stories.tsx` for examples of stateful render functions with `useState`.

## Exports

When exporting story helpers or named exports from a file, prefer a single export block rather than multiple single-export statements.

Duplicate code in each story if needed. Code examples > DRY principle.

## Polymorphic Title Components

For components with `as` prop for heading levels, see `card.stories.tsx` for semantic heading examples.

## Play Functions

Use `@storybook/test` utilities: `within`, `expect`, `userEvent`, `waitFor`.

**NO inline code comments in play functions.** Code should be self-explanatory.

Use deterministic interactions. Do not add retry-style `try/catch` fallback flows to re-run hover/click/tab actions. Fix timing/animation/state synchronization at the source.

See `avatar.stories.tsx` for play function examples with DOM queries and assertions.

## Render Functions

**NO JSX comments in render functions** (e.g., `{/* States */}`). If you need section labels, use semantic HTML headings (`<h3>`) instead. JSX comments clutter the code and don't provide value when proper semantic markup is available.

### Query Priority

Prioritize semantic queries over test IDs in play functions:

1. **Prefer:** `getByRole`, `getByLabelText`, `getByText`, `getByPlaceholderText`
2. **Avoid:** `getByTestId` in normal story tests

Semantic queries improve accessibility and make tests more resilient to implementation changes.

Exception: in unit tests (not production code or normal story interactions), `getByTestId` is acceptable when the test itself mocks a component and adds the test id locally.

## Fusion Test Type Safety Rules

- Never use `any` or `as` casts in stories/tests.
- Use `unknown` and type guards for narrowing.
- Exception: `Partial<T> as T` is acceptable for test mocks.
- Prefer typed mocks: `vi.fn(() => ...)`, `vi.fn<T>()`, `vi.mocked(...)`, `vi.mock(import(...))`.
- Prefer `toHaveBeenCalledWith` / `toHaveBeenNthCalledWith` over reading `mock.calls` directly.
- For debounce/throttle behavior, use fake timers instead of mocking debounce/timer utilities.

### Testing Buttons in Play Functions

- Use `await canvas.findAllByRole("button")` instead of `getAllByRole("button")` to wait for buttons to render
- Avoid querying by `data-slot="button"` - `TooltipTrigger` with `asChild` can override these attributes
- Role-based queries are more robust and semantic for testing interactive elements

### Testing Heading Levels

See `card.stories.tsx` for examples of testing heading levels with `canvas.getByRole("heading", { level: N })`.

### Testing Portal Content

Storybook's canvas handles portal content correctly. Prefer semantic queries in `canvas` or `within(document.body)` before considering test IDs.

## Styling in Stories

Use Tailwind design tokens, not arbitrary values. Utilities like `leading-4.5` are allowed when defined in our Tailwind config; avoid bracketed arbitrary values. Common conversions: `w-[360px]` → `w-90`, `gap-[8px]` → `gap-2`, `p-[16px]` → `p-4`.

## Emoji Accessibility

When using emoji in story render output, wrap each emoji with semantic labeling, for example: `<span role="img" aria-label="rocket">🚀</span>`.

## Fusion Import Strategy

For stories under `src/components/ui/aura/**`, prefer relative imports for Aura components and shared lib helpers (for example `../button` or `../../../../lib/utils`) instead of `@/*` aliases, to match portable registry/Fusion packaging expectations.

## argTypes

Organize into categories: Content, Variants/Styling, Behavior, Events, Advanced. Include descriptions and control types.

## Parameters & Descriptions

**Story descriptions should be minimal and future-proof.** Avoid mentioning specific counts or implementation details that could become outdated. See story files for examples of clear, timeless descriptions.

**Story-level code comments** (in `/** ... */` above stories or in descriptions) should be minimal and explain WHAT the story demonstrates, not HOW it works internally.
**Keep story commentary short and directly relevant to the example.** Avoid long prose or redundant explanations.

## Deprecated Components

Avoid deprecated third-party components. Check library docs for deprecation warnings. Use modern alternatives like `shape` or `content` props. See `artifact-chart.stories.tsx` for Recharts examples avoiding deprecated `<Cell>` components.

## Post-Build Steps

After creating or modifying stories, run: `bash scripts/check-quality.sh`

If story work changes primitive/foundation implementation readiness, update `src/lib/primitives-catalog.ts` in the same change or ask the user whether progress metadata should be updated.

## Checklist

Before committing changes:
1. Run `pnpm lint` to check code quality
2. Run `pnpm tsc -b` to verify TypeScript types
3. Ensure all stories have `order` parameter
4. Verify play functions pass with no errors
5. Test interactive stories manually
6. No inline code comments in play functions
7. Story descriptions are minimal and future-proof
8. No deprecated third-party components used
9. Keep story comments short and relevant to the example
10. Update or confirm `src/lib/primitives-catalog.ts` progress metadata when readiness changes
11. No retry fallback logic in play functions
12. No `any` or `as` casts in story/test code (except `Partial<T> as T` for test mocks)
13. Prefer semantic DOM queries over test IDs
