# Development Rules

1. Make sure to run `pnpm lint` and `pnpm tsc` after any code changes you make in order to ensure there are no errors.
2. Record any learnings in the CLAUDE.md file. Make sure to keep a consistent style with the existing content and try to be concise and avoid duplication.

# Component Registry Rules

When you create or update ANY component, run: `pnpm run registry:build`

This command:

1. Scans `src/components/ui/aura/` for all component files
2. Auto-detects npm dependencies and registry dependencies from imports
3. Generates `registry.json` in the root
4. Runs `shadcn build` to generate individual component files in `public/r/*.json`

The registry build process is fully automated - no manual configuration needed.

# Building Components

## SKILLS AVAILABLE

For detailed component building guidelines, use the `/component-builder` skill.

## Key principles

- Use Radix UI for complex interactions, native HTML for simple elements
- Always use `ComponentRef` (not `React.ElementRef`)
- No code comments in component files
- Extract helpers to `@/lib/utils.ts`
- Use Tailwind design tokens, not arbitrary values
- Run `pnpm lint` and `pnpm tsc -b` after changes

## Import Conventions

NEVER use `React.useState`, `React.useEffect`, etc.
ALWAYS import hooks directly: `import { useState, useEffect } from 'react'`
This applies to ALL React imports.

**Fusion Import Strategy:**

Aura uses a dual-scope import system for migrating components to Fusion:

- **`@cognite/aura/*`** - Beta components ready for Fusion (e.g., `@cognite/aura/button`)
- **`@cognite/aura-lab/*`** - Alpha/experimental components (e.g., `@cognite/aura-lab/accordion`)
- **`@cognite/aura/lib/*`** - Shared utilities (e.g., `@cognite/aura/lib/utils`)

Components in `src/components/ui/core/` use `@cognite/aura/*`, components in `src/components/ui/lab/` use `@cognite/aura-lab/*`.

For internal development, continue using `@/*` imports. The `@cognite/*` imports are configured for when components are consumed in Fusion.

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
- Radix UI's `TooltipPrimitive.Provider` and `TooltipPrimitive.Root` don't support refs - use plain functions, not `forwardRef`.
- Component status checks should use valid `ComponentStatusType` values like "stable" and "ready-for-ga", not "production" or "done".
- Form components should import and use utility classes from `@/lib/utils`: `formElementBase`, `focusState`, `invalidState`, `disabledState`, `hoverState`, `filledState`.
- `formElementBase` includes `bg-background` by default. Override with `bg-transparent` or other backgrounds inline when needed.
- When form components are used inside compound components (like `InputGroup`), override hover/focus states to prevent conflicts with the parent container's styling.
- `InputGroup` uses `shadow-focus-ring` for focus state and `shadow-focus-ring-destructive` for error state. The error state selector must target `[data-slot=input-group-control][aria-invalid=true]` to take precedence over normal focus.
- InputGroup stories should showcase all alignment variants (inline-start, inline-end, block-start, block-end) and how it's used in compound components like PromptInput.
- When overriding focus states in InputGroup controls, must override BOTH `focus-visible:shadow-none` AND `aria-invalid:focus-visible:shadow-none` to prevent double focus rings in error states.
- Don't export prop types from components. Use inline typing (`type MessageProps = ...`) instead of `export type`. Consumers can use `ComponentProps<typeof Component>` if they need access to types. Follow the pattern used by Badge, Card, Button, Dialog, and AlertDialog components.

# Storybook Stories

## SKILLS AVAILABLE:

For detailed story writing guidelines, use the `/story-builder` skill.

## Key principles

- Stories are the ONLY place for code examples
- All stories must have `parameters: { order: N }`
- Use explicit render functions with hardcoded props
- No inline code comments in play functions
- Prioritize semantic queries (`getByRole`, `getByText`, etc.) over `getByTestId` in play functions
- Use `canvas.findByTestId()` only for portal content when semantic queries aren't available
- Run `pnpm lint` and `pnpm tsc -b` after changes
