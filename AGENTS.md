# Aura

Vite + React SPA for the Aura design system site, plus the Flows Community component registry (`src/components/ui/community`).

Community components ship via the `@aura` shadcn registry and are previewed natively on the site (portable Storybook stories) — not via iframe.

After making changes, run `pnpm lint` and fix all errors. `@shadcn/lint` rules enforce Aura tokens and component variants; prefer a variant or theme token over an `eslint-disable` exception.

Global theming can be driven by `#theme=` (Fusion-compatible URL-safe base64 of `{ base, light, dark }`) and `aura-set-theme` postMessage.
