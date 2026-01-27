# Development Rules

1. Make sure to run `pnpm lint` and `pnpm tsc` after any code changes you make in order to ensure there are no errors.
2. Record any learnings in the CLAUDE.md file. Make sure to keep a consistent style with the existing content and try to be concise and avoid duplication.

# Component Registry Rules

When you create or update ANY component:

1. Update `registry.template.json` with the component entry and ALL dependencies it requires
2. After making changes, run: `pnpm run registry:build`

# Storybook Stories

When writing new `.stories.tsx` files, use `src/components/ui/aura/prompt-input.stories.tsx` as the gold standard. Every story MUST include:

- Comprehensive argTypes organized into categories (Display, Events, etc.) with descriptions
- Play functions using `@storybook/testing-library` for automated interaction testing
- Full coverage of all component states with realistic stateful examples using `useState`

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
