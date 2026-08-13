# Aura

Vite + React SPA for the Aura design system site, plus the Flows Community component registry (`src/components/ui/community`).

Community components ship via the `@aura` shadcn registry and are previewed natively on the site (portable Storybook stories) — not via iframe.

Global theming can be driven by `#theme=` (Fusion-compatible URL-safe base64 of `{ base, light, dark }`) and `aura-set-theme` postMessage.
