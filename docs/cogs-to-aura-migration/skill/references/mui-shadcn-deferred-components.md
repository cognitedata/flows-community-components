# MUI → ShadCN Deferred Components

Some MUI components are **intentionally not migrated yet** because they either
lack a clear 1:1 ShadCN equivalent or require design decisions before they can be
safely replaced. This file lists those components so that migration agents can
**ignore them for now**, even if they appear in the codebase.

Agents MUST NOT treat these components as "mappable" until a dedicated section
is added for each one in `mui-shadcn-component-mappings.md`.

---

## EmptyState

- MUI: `EmptyState` from `@mui/material`.
- Status: **Deferred.**
- Reason: No single ShadCN “EmptyState” primitive. Each case should be rebuilt
  using ShadCN `card`, `alert`, `banner`, illustrations, and typography, with UX
  input.

---

## DataGrid (MUI-lab)

- MUI: `DataGrid` from `@mui/lab`.
- Status: **Deferred.**
- Reason: ShadCN’s table covers simple tables only. Full-featured grid behavior
  (virtualization, complex editing, etc.) needs a dedicated migration plan
  (likely ShadCN table + TanStack Table).

---

## IndexTable (MUI-lab)

- MUI: `IndexTable` from `@mui/lab`.
- Status: **Deferred.**
- Reason: Similar issues as `DataGrid` – complex behavior that doesn’t map
  directly to ShadCN primitives.

---

## Tabs

- MUI: `Tabs` from `@mui/material`.
- Status: **Deferred.**
- Reason: ShadCN’s Tabs API and design patterns must be confirmed and aligned
  before an automatic mapping can be considered. Until then, use manual,
  case-by-case migration.

---

## ToolBar

- MUI: `ToolBar` from `@mui/material`.
- Status: **Deferred.**
- Reason: Layout-only; there is no direct ShadCN equivalent. Should be replaced
  with Tailwind flex layouts or small shared toolbar components, but patterns
  should be agreed first.

---

## PageHeader (MUI-lab)

- MUI: `PageHeader` from `@mui/lab`.
- Status: **Deferred.**
- Reason: Opinionated page-level header; should be replaced with a composed
  pattern (topbar + breadcrumb + toolbar + typography) once that pattern is
  defined for ShadCN.

---

## ActionList (MUI-lab)

- MUI: `ActionList` from `@mui/lab`.
- Status: **Deferred.**
- Reason: Represents lists of actions that can map to different ShadCN patterns
  (`DropdownMenu`, `Toolbar` buttons, simple vertical lists). Needs design
  decisions per usage.

---

## ConfigProvider

- MUI: `ConfigProvider` from `@mui/material`.
- Status: **Deferred.**
- Reason: Tied to MUI theming/config. Move only after ShadCN’s theme provider
  and configuration patterns are finalized.

---

## Illustrations & Icons

- Examples:
  - `RocketIllustration` and other illustration components from
    `@mui/material`.
  - Various MUI icons such as:
    - `HamburgerMenuIcon`, `UserIcon`, `BellIcon`, `WorldIcon`,
      `HomeThemedIcon`, `HelpIcon`, `FolderIcon`, `AppLogoIcon`,
      `PushLeftIcon`, `PushRightIcon`, `PlaceholderIcon`, `NotificationDot`,
      `IconWrapper`, sub-app themed icons from `@mui/icons-material`, etc.
- Status: **Deferred as a group.**
- Reason: Visual assets need design approval to:
  - Replace with ShadCN-native icons/illustrations,
  - Or migrate to a central icon/illustration library (e.g. lucide-react icons +
    custom SVGs).

Agents SHOULD:

- Leave these components in place unless explicitly instructed otherwise.
- When migrating surrounding UI, treat these as simple visual children (usually
  JSX elements) and focus on migrating the structural components first.
