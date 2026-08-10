---
name: component-builder
description: Build accessible, consistent React components following Aura design system patterns. Use when creating or updating component files.
---

# Component Builder

Build accessible, consistent React components following Aura design system patterns.

## When to Use

- Creating new React components in `src/components/ui/community/`
- Updating existing community component files
- User mentions "component", "create component", "build component", or "update component"

## File References

This skill references actual files in the codebase as examples. To locate a file, use grep or file search (e.g., "find me badge.tsx"). If multiple files match, prompt the user with full paths to confirm which file to use. If a file isn't findable, prompt the user to provide the code example. Update references if better examples emerge.

## Base UI & Accessibility

Use Base UI for complex interactions (dropdowns, dialogs), keyboard navigation, ARIA states. Use native HTML for simple elements (lists, headings, divs). See `dialog.tsx` and `alert.tsx` for accessibility patterns.

Do not add `data-testid` attributes in production component code. Keep tests semantic (`getByRole`, `getByLabelText`, etc.). If a unit test needs a test id for a mocked component, add it in the test file only.

## Component Structure

**Exports at bottom in a single export block (one identifier per line).** Avoid multiple single-export statements like `export { Foo };`. See `badge.tsx` for export pattern.

**Inline prop typing, no export unless needed externally.** See component files like `button.tsx` for prop typing patterns.

## Community Import Paths

Community components import Core from `@cognite/aura/components` and `@cognite/aura/utils`. Prefer those package imports over local `@/*` aliases for anything that ships through the registry.

## Fusion Type Safety Rules

- Never use `any` or `as` casts in component code.
- Use `unknown` and type guards for narrowing.
- Exception: `Partial<T> as T` is acceptable for test mocks only.

## Composition Over Configuration

Use composition patterns for flexibility. See `card.tsx` for component structure and `card.stories.tsx` for usage examples.

Keep business logic out of UI components. Move SDK queries/mutations/side effects to hooks and inject dependencies via context when needed.

Prefer derived values over `useState` + `useEffect` for computed state.

For primitive components, do not use child introspection (`Children`, `cloneElement`, `isValidElement`) to infer slots or behavior. Keep optional regions explicit via props/subcomponents and place them with `data-slot` selectors instead of child-order assumptions.

Avoid prop-overload APIs. Prefer explicit, single-purpose props and compositional slots.

## Styling Conventions

**Always use cn() for className merging.** See any component file like `badge.tsx`.

**All components get data-slot.** See `button.tsx` for data-slot usage.

**Use design tokens, not arbitrary values**. Utilities like `leading-4.5`, `text-sm`, and `gap-2` are fine when defined in our Tailwind config; avoid bracketed arbitrary values like `leading-[18px]`, `text-[14px]`, `gap-[8px]`.

Prefer broadly supported spacing utilities in shared primitives (for example `mt-px`, `mt-0.5`) unless a custom micro-step utility is intentionally standardized.

**Inline prop typing, no type exports.** Define prop types inline (e.g., `type BadgeProps = ...`) but do not export them. Consumers can use `ComponentProps<typeof Component>` if needed. See `badge.tsx`, `card.tsx`, `button.tsx` - none export prop types.

## Variants with CVA

Use `class-variance-authority` for variant styling. See `badge.tsx` or `button.tsx` for CVA patterns with variants, defaultVariants, and exports.

## forwardRef Pattern

**CRITICAL: Use ComponentRef, never React.ElementRef**

`React.ElementRef` is deprecated. Always import and use `ComponentRef` directly from "react".

See these files for forwardRef patterns:

- Native HTML elements: `badge.tsx`, `button.tsx`
- Base UI Primitives: `dialog.tsx`, `alert-dialog.tsx`
- Always set `displayName` for debugging and dev tools
- Preserve ref contracts during refactors. If a component previously forwarded refs, keep `forwardRef` support unless there is a user-approved breaking change.
- Do not use `as` casts for ref plumbing; use cast-free ref assignment patterns with typed callback/object refs.

## Semantic HTML & Polymorphic Components

Title components support polymorphic heading elements for proper document hierarchy, SEO, and screen reader accessibility. See `card.tsx` for the `CardTitle` polymorphic pattern with `as` prop. Usage examples in `card.stories.tsx`.

## Date/Time Determinism

For components that compute date/time-based UI, avoid unstable runtime defaults that can differ between server and client renders. Prefer explicit reference-time props (for example `now`) for deterministic output and use stable fallback references when needed.

## Component Naming

Clear, descriptive names: `InlineCitation`, `MessageAvatar`. Sub-components match parent: `Card` → `CardHeader`, `CardTitle`, `CardContent`.

## Code Comments & Documentation

**CRITICAL: NO code comments in component files.** Component files (`.tsx`) should contain ZERO comments. See `badge.tsx` for clean, self-documenting code.

**index.tsx - brief description only.** See `index.tsx` in any component folder like badge for minimal JSDoc pattern.

**Metadata file - LLM guidance only.** See `badge.metadata.ts` for ComponentMeta pattern. Keep `*.metadata.ts` files metadata-only—remove any runtime/component code from them.

**CRITICAL:** ALL code examples live in Storybook stories only.

## Side Navigation

Add new components to `side-navigation.tsx`. Story meta `title` determines category:

- `Primitives/Colors|Effects|Layouts|Typography` → Foundations subsection
- `Primitives/[Name]` → Primitives subsection (alphabetically)
- `AI/[Name]` → AI Chat subsection
- `Patterns/[Name]` → Patterns subsection

## Primitives Progress Metadata

When a component change affects primitive/foundation coverage, update `src/lib/primitives-catalog.ts` in the same PR.

Set and verify `implemented` / `comingSoon` behavior through the catalog entry and aliases.

If delivery progress is unclear, ask the user before assigning a progress status in catalog metadata.

## Post-Build Steps

After creating or modifying components:

1. Run linting and type checking: `bash scripts/check-quality.sh`
2. Update registry: `pnpm run registry:build`
3. Update side navigation if new component

## Checklist

Before committing changes:

1. Run `pnpm lint` to check code quality
2. Run `pnpm tsc -b` to verify TypeScript types
3. Ensure no linter errors, type safety, prop spreading
4. Verify accessibility (ARIA, keyboard nav, focus)
5. Update side navigation if adding new component
6. No code comments in component files
7. No eslint-disable comments
8. No !important in Tailwind classes
9. Proper error handling in all try-catch blocks
10. Ensure all class names work with Tailwind v4
11. Ensure component appears in Docs and Storybook sidebar
12. Ensure `*.metadata.ts` files contain metadata only (no runtime/component code)
13. Update `src/lib/primitives-catalog.ts` when primitive/foundation coverage changes
14. Ask the user if progress status is ambiguous before setting it
15. No `any` or `as` casts in component code
16. No `data-testid` in production component code
17. Keep business logic in hooks/services, not UI components
