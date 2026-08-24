# MUI → ShadCN Design Token Mappings

This document covers **design-token-style** usages from MUI (colors, elevations, typography helpers, etc.) and how to migrate them to ShadCN + Tailwind.

Use it alongside:

- `mui-shadcn-mappings.md` / `mui-shadcn-component-mappings.md` – component/JSX patterns
- `mui-shadcn-type-mappings.md` – prop and value-type mappings

---

## Colors (`Colors.*`)

**MUI:**

```tsx
import { Colors } from '@mui/material';

<div style={{ color: Colors.text.primary }}>{value}</div>;
<div style={{ backgroundColor: Colors.surface.strong }}>{content}</div>;
```

**ShadCN / Tailwind:**

```tsx
<div className="text-foreground">{value}</div>
<div className="bg-card">{content}</div>
```

**Common mappings (adjust to your design tokens):**

- Text:
  - `Colors.text.primary` → `className="text-foreground"`
  - `Colors.text.muted` → `className="text-muted-foreground"`
- Surfaces:
  - `Colors.surface.background` → `className="bg-background"`
  - `Colors.surface.strong` → `className="bg-card"`
  - `Colors.surface.subtle` → `className="bg-muted"`
- Borders:
  - `Colors.border.subtle` → `className="border border-border"`

**Intent / status colors:**

- `Colors.intent.success` → `bg-success text-success-foreground`
- `Colors.intent.warning` → `bg-warning text-warning-foreground`
- `Colors.intent.negative` → `bg-destructive text-destructive-foreground`

**Guidelines:**

- Prefer ShadCN CSS variables + Tailwind utilities over inline `style`.
- If you see many repeated intent mappings, centralize them:

```ts
export type Intent = 'success' | 'warning' | 'error' | 'info';

export const getIntentClasses = (intent: Intent): string => {
  switch (intent) {
    case 'success':
      return 'bg-success text-success-foreground';
    case 'warning':
      return 'bg-warning text-warning-foreground';
    case 'error':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-foreground';
  }
};
```

---

## Typography helpers (`Body`, `Heading`, `Overline`, `TextLabel`)

**MUI:**

```tsx
import { Body, Heading, Overline, TextLabel, Colors } from '@mui/material';

<Heading size="medium">{t('title')}</Heading>
<Body size="medium" strong>{t('body')}</Body>
<Overline>{t('section_label')}</Overline>
<TextLabel label={t('field_label')} />

<div style={{ color: Colors.text.primary }}>{value}</div>;
```

**ShadCN / Tailwind:**

```tsx
// Headings
<h2 className="text-lg font-semibold leading-tight">{t('title')}</h2>

// Body text
<p className="text-sm">{t('body')}</p>
// strong
<p className="text-sm font-medium">{t('body')}</p>

// Overline
<p className="text-[11px] uppercase tracking-wide text-muted-foreground">
  {t('section_label')}
</p>

// Field label
import { Label } from '@/components/ui';

<Label htmlFor="field-id" className="text-xs font-medium">
  {t('field_label')}
</Label>
```

**Guidelines:**

- Use semantic HTML (`h1`–`h4`, `p`, `span`, `label`) with Tailwind classes.
- Keep a small, consistent scale:
  - Large title: `text-2xl font-semibold`
  - Page heading: `text-lg font-semibold`
  - Body: `text-sm`
  - Caption/overline: `text-xs` or `text-[11px]` + `uppercase` + `tracking-wide`
- If you see the same typography pattern repeated, consider a tiny wrapper:

```tsx
export const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-lg font-semibold leading-tight">{children}</h1>
);
```

---

## Elevations (`Elevations.*`) and surfaces

**MUI:**

```tsx
import { Elevations, Colors } from '@mui/material';

<div style={{ boxShadow: Elevations.level1, backgroundColor: Colors.surface.strong }}>
  {content}
</div>;
```

**ShadCN / Tailwind:**

```tsx
<div className="bg-card shadow-sm">
  {content}
</div>
```

**Suggested elevation mapping:**

- `Elevations.level0` → no explicit shadow (default) or `shadow-none`
- `Elevations.level1` → `shadow-sm`
- `Elevations.level2` → `shadow-md`
- `Elevations.level3` → `shadow-lg`

Combine with surface tokens:

- Base surface: `bg-background`
- Card/panel: `bg-card`
- Subtle surface: `bg-muted`

**Guidelines:**

- Don’t attempt a 1:1 clone of MUI elevation tokens; pick a small set of shadows that match your design system.
- Wrap common patterns in `Card`/`Panel` components in shared libs instead of inlining `bg-card shadow-sm` everywhere.

---

## Layout helpers & spacing (`Flex`, gap, radius)

**MUI:**

```tsx
import { Flex } from '@mui/material';

<Flex gap={8} alignItems="center" justifyContent="space-between">
  <span>A</span>
  <span>B</span>
</Flex>;
```

**ShadCN / Tailwind:**

```tsx
<div className="flex items-center justify-between gap-2">
  <span>A</span>
  <span>B</span>
</div>
```

**Gap/radius mapping ideas:**

- `gap={4}` → `gap-1`
- `gap={8}` → `gap-2`
- `gap={12}` → `gap-3`
- `borderRadius="small"` → `rounded-sm`
- `borderRadius="medium"` → `rounded-md`
- `borderRadius="large"` → `rounded-lg`

**Guidelines:**

- Use Tailwind’s layout utilities (`flex`, `grid`, `gap-*`, `items-*`, `justify-*`) instead of MUI layout helpers.
- For repeated patterns (e.g. toolbars, stacks), create small layout primitives:

```tsx
export const Toolbar = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-end gap-2">{children}</div>
);
```

---

## Intent/status tokens (success / warning / error / info)

**MUI:**

```tsx
<Infobox type="warning" ... />
// or
const color = Colors.intent.negative;
```

**ShadCN:**

- Prefer `variant` props where available (`Alert`, `Banner`, `Badge`):
  - `type="warning"` → `variant="warning"`
  - `type="error"` / `negative` → `variant="destructive"`
  - `type="success"` / `positive` → `variant="default"` or a dedicated success variant

- For plain containers:

```tsx
// warning
<div className="bg-warning text-warning-foreground">{children}</div>

// error
<div className="bg-destructive text-destructive-foreground">{children}</div>

// success
<div className="bg-success text-success-foreground">{children}</div>
```

**Guidelines:**

- Prefer component-level `variant` props over manual color tokens when using ShadCN components.
- Use a single helper for free-form layouts (see `getIntentClasses` example above) to avoid scattering intent logic.

---

## General guidance

- Treat MUI tokens (`Colors`, `Elevations`, typography helpers) as **implementation details** of the old design system.
- When migrating:
  1. Ask “is this a text color, background, border, elevation, or typography concern?”
  2. Choose the closest ShadCN/Tailwind token or utility.
  3. If the mapping isn’t obvious, prefer a small wrapper or helper, not a new global token system.
- Do **not** recreate a 1:1 “ShadCN tokens” API that mirrors MUI; use ShadCN primitives directly and keep custom abstractions focused and minimal.

