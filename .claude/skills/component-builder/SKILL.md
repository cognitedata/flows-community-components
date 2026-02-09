---
name: component-builder
description: Build accessible, consistent React components following Aura design system patterns. Use when creating or updating component files.
---

# Component Builder

Build accessible, consistent React components following Aura design system patterns.

## When to Use

- Creating new React components in `src/components/ui/aura/`
- Updating existing component files
- User mentions "component", "create component", "build component", or "update component"

## File References

This skill references actual files in the codebase as examples. To locate a file, use grep or file search (e.g., "find me badge.tsx"). If multiple files match, prompt the user with full paths to confirm which file to use. If a file isn't findable, prompt the user to provide the code example. Update references if better examples emerge.

## Base UI & Accessibility

Use Base UI for complex interactions (dropdowns, dialogs), keyboard navigation, ARIA states. Use native HTML for simple elements (lists, headings, divs). See `dialog.tsx` and `alert.tsx` for accessibility patterns.

## Component Structure

**Exports at bottom.** Use a single `export { ... }` block with one symbol per line. See `badge.tsx` for export pattern.

**Inline prop typing, no export unless needed externally.** See component files like `button.tsx` for prop typing patterns.

## Composition Over Configuration

Use composition patterns for flexibility. See `card.tsx` for component structure and `card.stories.tsx` for usage examples.

## Styling Conventions

**Always use cn() for className merging.** See any component file like `badge.tsx`.

**All components get data-slot.** See `button.tsx` for data-slot usage.

**Use design tokens, not arbitrary values** like `leading-4.5`, `text-sm`, `gap-2` instead of `leading-[18px]`, `text-[14px]`, `gap-[8px]`.

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

## Semantic HTML & Polymorphic Components

Title components support polymorphic heading elements for proper document hierarchy, SEO, and screen reader accessibility. See `card.tsx` for the `CardTitle` polymorphic pattern with `as` prop. Usage examples in `card.stories.tsx`.

## Component Naming

Clear, descriptive names: `InlineCitation`, `MessageAvatar`. Sub-components match parent: `Card` → `CardHeader`, `CardTitle`, `CardContent`.

## File Organization

**Import order:** React → Third-party → Local utilities. See any component file like `button.tsx`.

**Definition order:** Components in dependency order, exports at bottom.

**Helper Functions:** Extract local helper functions to `utils.ts` (in `src/lib/`) for reusability, testing, and centralized maintenance. Add proper error handling with try-catch. See `getStorybookImagePath` in `utils.ts` for example.

## Fusion Import Strategy

Aura uses a dual-scope import system for migrating components to Fusion:

- **`@cognite/aura/*`** - Beta components in `src/components/ui/core/` ready for Fusion
- **`@cognite/aura-lab/*`** - Alpha/experimental components in `src/components/ui/lab/`
- **`@cognite/aura/lib/*`** - Shared utilities from `src/lib/`

When building components, use `@/*` for internal imports. The `@cognite/*` aliases are configured for component consumption in Fusion.

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
11. Update `src/lib/primitives-catalog.ts` when primitive/foundation coverage changes
12. Ask the user if progress status is ambiguous before setting it
13. Ensure component appears in Docs and Storybook sidebar
14. Ensure `*.metadata.ts` files contain metadata only (no runtime/component code)
