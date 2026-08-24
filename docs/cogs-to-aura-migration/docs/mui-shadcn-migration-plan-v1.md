---
name: MUI to ShadCN Direct Replacement
overview: A comprehensive migration plan for directly replacing MUI components with ShadCN components across React apps, including usage counts, migration snippets, and a PR strategy ordered by effort.
todos: []
isProject: false
---

# Direct Replacement: MUI to ShadCN Migration Plan

## Section 1: ShadCN Components (Ordered by Usage)

Components are ordered by total file count in `apps/` directory. Migration snippets cover all common MUI props and structural changes.

---

### 1. Button (MUI: Button)

- **Files:** ~170 | **Apps:** ~25
- **MUI equivalent:** `Button` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Button, AddIcon } from "@mui/material";

<Button
  type="primary" // primary | secondary | tertiary | ghost
  size="small" // small | medium | large
  icon={<AddIcon />}
  iconPlacement="left" // left | right
  loading={isLoading}
  toggled={isActive}
  disabled={!enabled}
  onClick={handleClick}
>
  Create
</Button>;

// AFTER (ShadCN)
import { Button, Loader } from "@/components/ui";
import { IconPlus } from "lucide-react";

<Button
  variant={
    type === "primary"
      ? "default"
      : type === "secondary"
        ? "secondary"
        : "ghost"
  }
  size={size === "small" ? "sm" : size === "large" ? "lg" : "default"}
  disabled={loading || !enabled}
  onClick={handleClick}
  className={toggled ? "bg-accent" : undefined}
>
  {loading ? <Loader size={16} /> : iconPlacement === "left" && <IconPlus />}
  Create
  {!loading && iconPlacement === "right" && <IconPlus />}
</Button>;
```

**Prop mapping:** `type` -> `variant`, `size` -> `size`, `icon`/`iconPlacement` -> children, `loading` -> Loader in children, `toggled` -> `className` or data attribute.

---

### 2. Tooltip (MUI: Tooltip)

- **Files:** ~170 | **Apps:** ~25
- **MUI equivalent:** `Tooltip` from `@mui/material`

```tsx
// BEFORE (MUI) - wrapper pattern
import { Tooltip } from "@mui/material";

<Tooltip
  content={t("help-text")}
  placement="right" // top | bottom | left | right
  disabled={!showTooltip}
  enterDelay={300}
  wrapped
>
  <Button>Hover me</Button>
</Tooltip>;

// AFTER (ShadCN) - compound pattern
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui";

<TooltipProvider delayDuration={300}>
  <Tooltip open={!showTooltip ? false : undefined}>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="right">{t("help-text")}</TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

**Structural change:** MUI uses `content` prop; ShadCN uses `TooltipTrigger` + `TooltipContent`. Wrap app root with `TooltipProvider` if not already present.

---

### 3. Modal -> Dialog (MUI: Modal)

- **Files:** ~155 | **Apps:** ~25
- **MUI equivalent:** `Modal` from `@mui/material`

```tsx
// BEFORE (MUI) - imperative API
import { Modal } from "@mui/material";

<Modal
  visible={isOpen}
  onCancel={onClose}
  onOk={handleSubmit}
  title="Edit Workflow"
  cancelText="Cancel"
  okText="Save"
  okDisabled={!isValid}
  className="workflow-modal"
>
  <FormFields />
</Modal>;

// AFTER (ShadCN) - compound + controlled
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui";

<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
  <DialogContent className="workflow-modal">
    <DialogHeader>
      <DialogTitle>Edit Workflow</DialogTitle>
    </DialogHeader>
    <FormFields />
    <DialogFooter>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleSubmit} disabled={!isValid}>
        Save
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

**Structural change:** Modal content/layout becomes `DialogHeader`, `DialogTitle`, `DialogFooter` with explicit buttons. `visible` -> `open`, `onCancel`/`onOk` -> button handlers.

---

### 4. Input (MUI: Input)

- **Files:** ~95 | **Apps:** ~22
- **MUI equivalent:** `Input` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Input } from "@mui/material";

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter name"
  disabled={false}
  errorMessage={errors.name}
  label="Name"
/>;

// AFTER (ShadCN)
import { Input, Label } from "@/components/ui";

<div>
  {label && <Label htmlFor="name">{label}</Label>}
  <Input
    id="name"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter name"
    disabled={false}
    errorMessage={errors.name}
  />
</div>;
```

**Note:** ShadCN Input has `errorMessage`; MUI may use separate `label` - use ShadCN `Label` if needed.

---

### 5. Loader (MUI: Loader)

- **Files:** ~80 | **Apps:** ~35
- **MUI equivalent:** `Loader` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Loader } from "@mui/material";

<Loader size={24} />;

// AFTER (ShadCN)
import { Loader } from "@/components/ui";

<Loader size={24} />;
```

**Note:** API is similar. ShadCN Loader uses `size` (number). MUI may use `LoaderIcon` for inline - map to `Loader` with appropriate size.

---

### 6. Select (MUI: Select / MUI-lab Select)

- **Files:** ~60 | **Apps:** ~22
- **MUI equivalent:** `Select` from `@mui/material` or `Select`/`SelectPanel` from `@mui/lab`

```tsx
// BEFORE (MUI / MUI-lab)
import { Select, SelectPanel } from "@mui/lab";

<Select value={value} onValueChange={setValue} placeholder="Choose...">
  <SelectPanel>
    {options.map((o) => (
      <SelectPanel.Item key={o.id} value={o.id}>
        {o.label}
      </SelectPanel.Item>
    ))}
  </SelectPanel>
</Select>;

// AFTER (ShadCN) - compound
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    {options.map((o) => (
      <SelectItem key={o.id} value={o.id}>
        {o.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>;
```

**Structural change:** MUI uses `SelectPanel`; ShadCN uses `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`.

---

### 7. Infobox -> Alert (MUI: Infobox)

- **Files:** ~55 | **Apps:** ~18
- **MUI equivalent:** `Infobox` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Infobox } from "@mui/material";

<Infobox
  type="info" // info | warning | error
  title="Note"
  onClose={onDismiss}
>
  Message content here.
</Infobox>;

// AFTER (ShadCN)
import { Alert, AlertTitle, AlertDescription, AlertClose } from "@/components/ui";

<Alert
  variant={
    type === "warning" ? "warning" : type === "error" ? "error" : "default"
  }
>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>Message content here.</AlertDescription>
  {onClose && <AlertClose onClick={onDismiss} />}
</Alert>;
```

---

### 8. Divider -> Separator (MUI: Divider)

- **Files:** ~45 | **Apps:** ~14
- **MUI equivalent:** `Divider` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Divider } from "@mui/material";

<Divider />;

// AFTER (ShadCN)
import { Separator } from "@/components/ui";

<Separator />;
```

---

### 9. Skeleton (MUI: Skeleton)

- **Files:** ~40 | **Apps:** ~14
- **MUI equivalent:** `Skeleton` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Skeleton } from "@mui/material";

<Skeleton width={100} height={20} />;

// AFTER (ShadCN)
import { Skeleton } from "@/components/ui";

<Skeleton className="w-[100px] h-5" />;
```

**Note:** ShadCN Skeleton has no `width`/`height` props; use `className` with Tailwind.

---

### 10. TagChip -> Badge (MUI: TagChip)

- **Files:** ~35 | **Apps:** ~15
- **MUI equivalent:** `TagChip` from `@mui/material`

```tsx
// BEFORE (MUI)
import { TagChip, GaugeIcon } from "@mui/material";

<TagChip colorScheme="blue" label="" icon={<GaugeIcon />} size="x-small" />;

// AFTER (ShadCN)
import { Badge } from "@/components/ui";
import { IconGauge } from "lucide-react";

<Badge variant="fjord" size="icon">
  <IconGauge />
</Badge>;
```

**Prop mapping:** `colorScheme` -> `variant` (fjord, nordic, etc.), `label` -> children, `icon` -> children, `size="x-small"` -> `size="icon"`.

---

### 11. Textarea (MUI: Textarea)

- **Files:** ~20 | **Apps:** ~8
- **MUI equivalent:** `Textarea` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Textarea } from "@mui/material";

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  errorMessage={err}
/>;

// AFTER (ShadCN)
import { Textarea } from "@/components/ui";

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  errorMessage={err}
/>;
```

**Note:** API is similar. ShadCN has `maxChars`, `overLimitMessage`, `charactersLeftMessage` for character limits.

---

### 12. TextLabel -> Label (MUI: TextLabel)

- **Files:** ~17 | **Apps:** ~5
- **MUI equivalent:** `TextLabel` from `@mui/material`

```tsx
// BEFORE (MUI)
import { TextLabel } from "@mui/material";

<TextLabel label="Field name" />;

// AFTER (ShadCN)
import { Label } from "@/components/ui";

<Label htmlFor="field-id">Field name</Label>;
```

---

### 13. Avatar (MUI: Avatar)

- **Files:** ~13 | **Apps:** ~7
- **MUI equivalent:** `Avatar` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Avatar } from "@mui/material";

<Avatar name="John" src={imageUrl} />;

// AFTER (ShadCN) - compound
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui";

<Avatar>
  <AvatarImage src={imageUrl} alt="John" />
  <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
</Avatar>;
```

**Structural change:** ShadCN uses `AvatarImage` and `AvatarFallback` for compound content.

---

### 14. Menu -> DropdownMenu (MUI MUI-lab: Menu)

- **Files:** ~52 | **Apps:** ~14
- **MUI equivalent:** `Menu` from `@mui/lab`

```tsx
// BEFORE (MUI-lab)
import { Menu } from "@mui/lab";

<Menu>
  <Menu.Item icon={<EditIcon />} iconPlacement="left" onClick={onEdit}>
    Edit
  </Menu.Item>
  <Menu.Item icon={<DeleteIcon />} onClick={onDelete}>
    Delete
  </Menu.Item>
</Menu>;

// AFTER (ShadCN)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>
      <IconEdit /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={onDelete} variant="destructive">
      <IconTrash /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

**Structural change:** MUI Menu wraps content; ShadCN uses `DropdownMenuTrigger` + `DropdownMenuContent` + `DropdownMenuItem`. Icon goes inside item as child.

---

### 15. Accordion -> Collapsible (MUI: Accordion)

- **Files:** ~16 | **Apps:** ~6
- **MUI equivalent:** `Accordion` from `@mui/material`

```tsx
// BEFORE (MUI)
import { Accordion } from "@mui/material";

<Accordion>
  <Accordion.Item title="Section 1">Content</Accordion.Item>
</Accordion>;

// AFTER (ShadCN)
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui";

<Collapsible>
  <CollapsibleTrigger>Section 1</CollapsibleTrigger>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>;
```

---

## Section 2: Missing MUI Components (Ordered by Usage)

Components with no direct ShadCN equivalent. Migration options: Tailwind, custom components, or defer.

---

### 1. Flex (Layout)

- **Files:** ~160 | **Apps:** ~18

```tsx
// BEFORE (MUI)
import { Flex } from '@mui/material';

<Flex gap={8} alignItems="center" justifyContent="space-between">
  <span>A</span>
  <span>B</span>
</Flex>

// AFTER (Tailwind)
<div className="flex gap-2 items-center justify-between">
  <span>A</span>
  <span>B</span>
</div>
```

**Migration:** Replace with `className="flex gap-2 items-center"` etc. Consider shared `Flex` component in `libs/shared/layout-components` with Tailwind variants.

---

### 2. makeToast (MUI-lab)

- **Files:** ~184 | **Apps:** ~15

```tsx
// BEFORE (MUI-lab)
import { makeToast } from "@mui/lab";

makeToast({ title: "Success", description: "Saved.", type: "positive" });

// AFTER (Defer)
// No ShadCN equivalent. Options: (a) Build ShadCN Toast component, (b) Keep MUI-lab makeToast for now, (c) Use sonner/react-hot-toast.
```

**Migration:** Defer until ShadCN Toast exists. Keep `makeToast` from MUI-lab.

---

### 3. Body (Typography)

- **Files:** ~120 | **Apps:** ~18

```tsx
// BEFORE (MUI)
import { Body } from '@mui/material';

<Body strong size="medium">Text</Body>

// AFTER (Tailwind)
<span className="text-sm font-medium">Text</span>
```

**Migration:** Replace with Tailwind typography classes or shared `Text` component.

---

### 4. Heading (Typography)

- **Files:** ~90 | **Apps:** ~18

```tsx
// BEFORE (MUI)
import { Heading } from '@mui/material';

<Heading size="medium">Title</Heading>

// AFTER (Tailwind)
<h2 className="text-lg font-semibold">Title</h2>
```

---

### 5. Colors (Theme tokens)

- **Files:** ~80 | **Apps:** ~12

```tsx
// BEFORE (MUI)
import { Colors } from '@mui/material';

<div style={{ color: Colors.text.primary }} />

// AFTER (Tailwind / CSS variables)
<div className="text-foreground" />
```

**Migration:** Use ShadCN/Tailwind CSS variables (`text-foreground`, `bg-background`, etc.).

---

### 6. PageHeader (MUI-lab)

- **Files:** ~28 | **Apps:** ~18

```tsx
// BEFORE (MUI-lab)
import { PageHeader } from '@mui/lab';

<PageHeader title="Page Title" breadcrumbs={[...]} />

// AFTER (Defer)
// No ShadCN equivalent. Build ShadCN PageHeader or keep MUI-lab.
```

---

### 7. SegmentedControl

- **Files:** ~22 | **Apps:** ~12

```tsx
// BEFORE (MUI)
import { SegmentedControl } from '@mui/material';

<SegmentedControl options={[...]} value={val} onChange={setVal} />

// AFTER (Custom / ShadCN ButtonGroup)
import { ButtonGroup, ButtonGroupText } from '@/components/ui';

// Use ButtonGroup with variant="outline" and toggle state
```

---

### 8. Switch

- **Files:** ~28 | **Apps:** ~14

```tsx
// BEFORE (MUI)
import { Switch } from "@mui/material";

<Switch checked={checked} onChange={setChecked} />;

// AFTER (Defer)
// No ShadCN Switch. Build one or keep MUI.
```

---

### 9. EmptyState

- **Files:** ~28 | **Apps:** ~16

```tsx
// BEFORE (MUI)
import { EmptyState, ImageIcon } from "@mui/material";

<EmptyState illustration={<ImageIcon />} title="No data" description="..." />;

// AFTER (Defer)
// No ShadCN equivalent. Build EmptyState or keep MUI.
```

---

### 10. ToastContainer (MUI-lab)

- **Files:** ~37 | **Apps:** ~28

```tsx
// BEFORE (MUI-lab)
import { ToastContainer } from "@mui/lab";

<ToastContainer />;

// AFTER (Defer)
// Keep MUI-lab ToastContainer until ShadCN Toast exists.
```

---

### 11. SelectPanel (MUI-lab)

- **Files:** ~26 | **Apps:** ~9

Used with MUI-lab Select. Migrate with Select when moving to ShadCN Select.

---

### 12. DataGrid (MUI-lab)

- **Files:** ~15 | **Apps:** ~11

```tsx
// BEFORE (MUI-lab)
import { DataGrid } from "@mui/lab";

<DataGrid columns={cols} rows={rows} />;

// AFTER (Defer)
// No ShadCN DataGrid. Build or use TanStack Table. Keep MUI-lab for now.
```

---

### 13. ActionList (MUI-lab)

- **Files:** ~14 | **Apps:** ~7

```tsx
// BEFORE (MUI-lab)
import { ActionList } from '@mui/lab';

<ActionList items={[...]} />

// AFTER (ShadCN DropdownMenu)
// Map to DropdownMenuItem list. Structural change.
```

---

### 14. Banner (MUI-lab)

- **Files:** ~13 | **Apps:** ~10

```tsx
// BEFORE (MUI-lab)
import { Banner } from "@mui/lab";

<Banner type="warning" title="Deprecation" />;

// AFTER (ShadCN Alert)
import { Alert, AlertTitle } from "@/components/ui";

<Alert variant="warning">
  <AlertTitle>Deprecation</AlertTitle>
</Alert>;
```

---

### 15. Checkbox (standalone)

- **Files:** ~35 | **Apps:** ~16

```tsx
// BEFORE (MUI)
import { Checkbox } from "@mui/material";

<Checkbox checked={checked} onChange={setChecked} disabled={false} />;

// AFTER (Defer)
// ShadCN has DropdownMenuCheckboxItem but no standalone Checkbox. Build or keep MUI.
```

---

### 16. DateTimePicker / DatePicker

- **Files:** ~11 | **Apps:** ~5

```tsx
// Defer. No ShadCN equivalent. Keep MUI-lab or @mui/system.
```

---

### 17. Elevations

- **Files:** ~9 | **Apps:** ~6

```tsx
// BEFORE (MUI)
import { Elevations } from "@mui/material";

// AFTER (Tailwind)
<div className="shadow-md" />;
```

---

## Section 3: PR Strategy (Ordered by Effort Rating)

Effort rating: Low (1-2) | Medium (3-4) | High (5+). Based on supported component count and instance count.

| Project | Supported MUI Components | Instance Count | Components Used | Effort |
| --- | ---: | ---: | --- | --- |
| **small-app** | 2 | ~5 | Button, Input | Low (1) |
| **medium-app** | 8 | ~45 | Button, Dialog, Input, Tooltip, Select | Medium (4) |
| **large-app** | 14 | ~120 | Button, Dialog, Input, Tooltip, Select, DataGrid, Menu | High (6) |

---

## Recommended PR Order

1. **Pilot apps (Low effort):** small apps with foundational primitives only.
2. **Small apps (Low-Medium):** apps with limited forms, dialogs, and menus.
3. **Medium apps:** apps with moderate component variety and some deferred components.
4. **Large apps (High effort):** apps with grids, complex tables, custom theming, or heavy shared-lib dependencies.

---

## Key Files

- [libs@/components/ui/src/components/index.ts](libs@/components/ui/src/components/index.ts) - ShadCN exports
- [docs/mui-shadcn-adapter-plan.md](docs/mui-shadcn-adapter-plan.md) - Alternative adapter approach
- [apps/eos/src/components/ui@/components/ui/message.tsx](apps/eos/src/components/ui@/components/ui/message.tsx) - Example of direct ShadCN usage
