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

For detailed component building guidelines, use the `/component-builder` skill.

Key principles:
- Use Radix UI for complex interactions, native HTML for simple elements
- Always use `ComponentRef` (not `React.ElementRef`)
- No code comments in component files
- Extract helpers to `@/lib/utils.ts`
- Use Tailwind design tokens, not arbitrary values
- Run `pnpm lint` and `pnpm tsc -b` after changes

# Import Conventions

NEVER use `React.useState`, `React.useEffect`, etc.
ALWAYS import hooks directly: `import { useState, useEffect } from 'react'`
This applies to ALL React imports.

# Message Component Documentation

When you add a new Aura component to `MessageResponse` inside `message.tsx`:

- You MUST document it in the `message.examples.tsx` file under the 'MessageResponse (Streamdown)' example

# Special Files

- `reasoning-original.tsx` is NOT redundant - it will be used in the future, do not remove it

# Learnings

- Use `PaginationStatus` for inline pagination counters instead of ad hoc spans.
- Pagination subcomponents inherit size from `PaginationContent`.
- Use `PaginationSelectTrigger` to inherit pagination size for selects.
- When `ArtifactListHeader` is present, remove top padding from `ArtifactListContent` and use title margin for spacing.
- Biome formatting prefers inline JSX for short elements and props.
- Getting started instructions should link to the Dune creation docs site instead of inline steps.
- Consolidate docs content onto the root page instead of routing under `/docs`.

# Storybook Stories

For detailed story writing guidelines, use the `/story-builder` skill.

Key principles:
- Stories are the ONLY place for code examples
- All stories must have `parameters: { order: N }`
- Use explicit render functions with hardcoded props
- No inline code comments in play functions
- Use `canvas.findByTestId()` for portal content testing
- Run `pnpm lint` and `pnpm tsc -b` after changes

