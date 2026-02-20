---
alwaysApply: true
---

# PR Review Styleguide (Gemini)

Use this checklist when reviewing pull requests. Flag deviations as requested changes.

## Review Comment Format
- Reference files with repository-relative paths (for example `src/components/ui/aura/button/button.tsx:42`).
- Do not use absolute filesystem paths (for example `/Users/.../src/components/ui/aura/button/button.tsx`).

## Component Registry
- If a component is created or updated, confirm `registry.template.json` includes the component and ALL required dependencies.
- Verify the registry was rebuilt after changes with `pnpm run registry:build`.

## Storybook Stories
- For new `.stories.tsx` files, ensure they follow `src/components/ui/aura/prompt-input.stories.tsx` as the gold standard.
- Require comprehensive `argTypes` grouped into categories (Display, Events, etc.) with clear descriptions.
- Require `play` functions using `@storybook/testing-library` for interaction coverage.
- Require full state coverage with realistic stateful examples using `useState`.

## React Import Conventions
- Disallow `React.useState`, `React.useEffect`, etc.
- Require direct hook imports: `import { useState, useEffect } from 'react'`.

## Message Component Documentation
- If a new Aura component is added to `MessageResponse` in `message.tsx`, confirm it is documented in `message.examples.tsx` under the "MessageResponse (Streamdown)" example.

## Special Files
- Do not remove `reasoning-original.tsx`; it is required for future use.
