# Base UI Migration (Radix → Base UI)

Aura’s primitives under `src/components/ui/aura/*` have been migrated from Radix UI primitives to Base UI primitives (`@base-ui/react/*`).

## Status check (what “success” means)

- No Radix imports in source: `rg "@radix-ui/" src` returns nothing.
- Registry metadata uses Base UI: `registry.json` contains no `@radix-ui/*` deps.
- Formatting/lint passes: `pnpm run lint`
- Build passes after installing deps: `pnpm install && pnpm build`

## Mapping (Aura component → Base UI primitive)

- `accordion` → `@base-ui/react/accordion`
- `alert-dialog` → `@base-ui/react/alert-dialog`
- `avatar` → `@base-ui/react/avatar`
- `button` → `@base-ui/react/button`
- `checkbox` → `@base-ui/react/checkbox`
- `collapsible` → `@base-ui/react/collapsible`
- `context-menu` → `@base-ui/react/context-menu`
- `dialog` → `@base-ui/react/dialog`
- `dropdown-menu` → `@base-ui/react/menu`
- `hover-card` → `@base-ui/react/preview-card`
- `menubar` → `@base-ui/react/menubar` (+ `@base-ui/react/menu`)
- `popover` → `@base-ui/react/popover`
- `progress` → `@base-ui/react/progress`
- `radio-group` → `@base-ui/react/radio-group` (+ `@base-ui/react/radio`)
- `scroll-area` → `@base-ui/react/scroll-area`
- `select` → `@base-ui/react/select`
- `separator` → `@base-ui/react/separator`
- `sheet` → `@base-ui/react/dialog` (styled as a sheet)
- `slider` → `@base-ui/react/slider`
- `switch` → `@base-ui/react/switch`
- `tabs` → `@base-ui/react/tabs`
- `toggle` → `@base-ui/react/toggle`
- `tooltip` → `@base-ui/react/tooltip`

## Compatibility notes

- `asChild` is preserved where Aura exposed it, implemented via Base UI’s `render` prop (`src/lib/render-as-child.ts:3`).
- Radix `useControllableState` is replaced with a local hook (`src/lib/use-controllable-state.ts:11`).
- Radix `Slot` is replaced with a small local Slot utility (`src/lib/slot.tsx:43`) for the few places still needing it.
- Portals continue to mount into Aura’s scoped container via `getPortalContainer()` when Base UI’s Portal supports `container`.
