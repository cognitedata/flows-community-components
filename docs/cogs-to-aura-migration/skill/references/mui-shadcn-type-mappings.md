# MUI → ShadCN Type & Props Mappings

Canonical guidance for **types, props, and value models** used with MUI components, and how they should look after migrating to ShadCN. Use this file alongside:

- `mui-shadcn-component-mappings.md` (or `mui-shadcn-mappings.md`) for JSX/component patterns
- `mui-shadcn-design-tokens-mappings.md` for design-token and theme mappings

---

## Select option types (`Option`, `OptionType`)

**MUI:**

```ts
import type { Option } from '@mui/lab';
// or
import type { OptionType } from '@mui/system';

type VersionOption = Option<string>;
// Typically: { label: string; value: string; disabled?: boolean; ... }
```

**ShadCN-era type:**

```ts
export type SelectOption<Value extends string | number = string> = {
  label: string;
  value: Value;
  disabled?: boolean;
};
```

**Notes:**

- Treat MUI `Option` / `OptionType` as **pure value types** and replace them with app- or lib-local types (e.g. `SelectOption`).
- When migrating a `Select`/`Autocomplete`/`Combobox`, wire `value` / `onValueChange` to the `value` field, and render `label` inside `SelectItem`/`Combobox` items.
- Prefer exporting shared option types from a small `types/ui.ts` (or equivalent) rather than importing from MUI packages.

---

## Grid & table types (`GridRowId`, `GridCellParams`, `GridColDef`, `GridSortDirection`, `IndexTableRowModel`)

**MUI:**

```ts
import type {
  GridRowId,
  GridCellParams,
  GridColDef,
  GridSortDirection,
} from '@mui/lab';
import type { IndexTableRowModel } from '@mui/lab';
```

These encode generic row/column/cell abstractions for MUI `DataGrid` / `IndexTable`.

**ShadCN-era approach:**

- For **simple tables** migrated to ShadCN `table` + TanStack Table:
  - Define table-specific types:

    ```ts
    export type AssetRowId = string;

    export type AssetRow = {
      id: AssetRowId;
      name: string;
      // ...
    };
    ```

  - Use TanStack’s own generics (`ColumnDef<AssetRow>`, etc.) instead of MUI grid types.

- For **screens that remain on MUI `DataGrid` / `IndexTable` for now**:
  - Keep using the MUI types until the component itself is migrated.
  - Avoid introducing these types into new modules; prefer domain-level types that are decoupled from the grid implementation.

**Notes:**

- Do **not** try to recreate MUI grid type APIs in ShadCN; instead:
  - Use domain row types (`AssetRow`, `WorkOrderRow`, …).
  - Use the table abstraction’s own types (TanStack Table, etc.) as the boundary.
- When lifting logic out of MUI grids, keep only the **data shape** (domain types) and drop grid-specific param types where possible.

---

## Tag types (`TagChipProps`, `TagChipGroup`)

**MUI:**

```ts
import type { TagChipProps } from '@mui/system';
// TagChipGroup is used as a layout component for multiple TagChip items.
```

**ShadCN-era approach (value types):**

For domain-level tags (e.g. a “status” tag model), define explicit value types:

```ts
export type StatusTag = {
  label: string;
  intent: 'success' | 'warning' | 'error' | 'info';
};
```

**Notes:**

- Treat `TagChipProps` as a component prop type that should follow the **generic ComponentProps rule** below, not as a value model to be cloned.
- `TagChipGroup` has no ShadCN equivalent; treat it as layout-only (flex + gap) and keep layout concerns in JSX or small layout components rather than as dedicated prop types.

---

## Icon & sub-app icon props (`SubAppIconProps`, icon components)

**MUI:**

```ts
import type { SubAppIconProps } from '@mui/icons-material';
import {
  ExtractorsSubAppThemedIcon,
  AgentsSubAppThemedIcon,
  // ...
} from '@mui/icons-material';
```

**ShadCN-era approach:**

```ts
export type SubAppIconComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type SubAppConfig = {
  // ...
  icon: SubAppIconComponent;
};
```

**Notes:**

- Treat sub-app icons as generic React components (often SVG-based), not as MUI-specific things.
- When replacing MUI icons, prefer:
  - ShadCN-native icons (if provided), or
  - `lucide-react` (or a central icon wrapper) with `React.FC<SVGProps<SVGSVGElement>>`.
- Keep MUI icon types (`SubAppIconProps`) out of new code; use generic React icon props instead.

---

## Autocomplete & Combobox option types (`AutocompleteProps`, etc.)

**MUI:**

```ts
import type { AutocompleteProps } from '@mui/lab';
```

**ShadCN-era approach (value types):**

Use the same pattern as the Select section:

```ts
export type ComboboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};
```

**Notes:**

- `AutocompleteProps` is a component prop type and should follow the **generic ComponentProps rule** below.
- Keep option/value types (`ComboboxOption`, etc.) small and UI-agnostic so they can be reused across components and tests.

---

## Generic rule for MUI component prop types (`*Props`)

Many MUI types are **component prop types**, not domain/value models:

```ts
import type {
  ButtonProps,
  TagChipProps,
  ActionListItemProps,
  AutocompleteProps,
  // ...
} from '@mui/*';
```

**Migration rule:**

1. **Delete the MUI prop type import.**
2. **Identify the ShadCN replacement component** (`Button`, `Badge`, `DropdownMenuItem`, `Combobox`, etc.).
3. **Derive props from the ShadCN component** instead of recreating the old type:

   ```ts
   import type { ComponentProps } from 'react';
   import { Button } from '@/components/ui';

   export type ShadCNButtonProps = ComponentProps<typeof Button>;
   ```

4. **Update all consuming code to satisfy the ShadCN props**, i.e.:
   - Use ShadCN’s prop names and allowed values (`variant`, `size`, `onValueChange`, etc.).
   - Remove or adapt props that no longer exist in ShadCN.

**Notes:**

- Never clone or alias MUI `*Props` types into ShadCN-era code (no `type ButtonProps = OldButtonProps`).
- For **value models** (options, rows, domain tags, etc.), keep using small, explicit types as shown in the other sections of this file; only UI component props use the `ComponentProps<typeof X>` pattern.

---

## General guidelines for migrating types

- **Do not clone MUI type APIs** into ShadCN-era code.
- Prefer:
  - **Domain-level types** (assets, workflows, tasks, etc.).
  - **Small, explicit UI types** per pattern (select options, tag badges, icons).
- If a type is only used to satisfy a MUI component, and that component is being removed, **delete the type instead of porting it**.

