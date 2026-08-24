---
name: MUI to ShadCN Direct Replacement v2
overview: Updated migration plan for directly replacing MUI components with ShadCN components, aligned with the standalone ShadCN repo (local ShadCN components directory), including refreshed component mappings and PR strategy.
todos: []
isProject: false
---

# Direct Replacement: MUI to ShadCN Migration Plan

## Section 1: ShadCN Components (Ordered by Usage)

This section mirrors the v1 structure but updates the ShadCN targets to use the **standalone ShadCN repo** under `local ShadCN components directory` and reflects which MUI components now have first‑class ShadCN equivalents. Usage counts are approximate and based on MUI imports in `apps/` and `libs/`.

---

### 1. Button (MUI: Button)

- **Files:** ~1340 | **Apps:** ~37 | **Libs:** ~26
- **MUI equivalent:** `Button` from `@mui/material`
- **ShadCN target:** `button/button.tsx`

```tsx
// BEFORE (MUI)
import { Button, AddIcon } from "@mui/material";

<Button
  type="primary"           // primary | secondary | tertiary | ghost
  size="small"             // small | medium | large
  icon={<AddIcon />}
  iconPlacement="left"     // left | right
  loading={isLoading}
  toggled={isActive}
  disabled={!enabled}
  onClick={handleClick}
>
  Create
</Button>;

// AFTER (ShadCN)
import { Button, Loader } from "@/components/ui"; // from ui@/components/ui
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
  disabled={isLoading || !enabled}
  onClick={handleClick}
  className={isActive ? "bg-accent" : undefined}
>
  {isLoading ? (
    <Loader size={16} />
  ) : (
    <>
      {iconPlacement === "left" && <IconPlus />}
      Create
      {iconPlacement === "right" && <IconPlus />}
    </>
  )}
</Button>;
```

**Prop mapping:** `type` → `variant`, `size` → `size`, `icon`/`iconPlacement` → children, `loading` → Loader in children, `toggled` → class/state.

---

### 2. Tooltip (MUI: Tooltip)

- **Files:** ~544 | **Apps:** ~37 | **Libs:** ~18
- **MUI equivalent:** `Tooltip` from `@mui/material`
- **ShadCN target:** `tooltip/tooltip.tsx`

```tsx
// BEFORE (MUI) - wrapper pattern
import { Tooltip } from "@mui/material";

<Tooltip
  content={t("help-text")}
  placement="right"          // top | bottom | left | right
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
    <TooltipContent side="right">
      {t("help-text")}
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

**Structural change:** MUI uses a `content` prop and wraps the child. ShadCN uses a compound API: `Tooltip` + `TooltipTrigger` + `TooltipContent`, with `TooltipProvider` controlling delay.

---

### 3. Modal → Dialog / AlertDialog (MUI: Modal)

- **Files:** ~281 | **Apps:** ~35 | **Libs:** ~14
- **MUI equivalent:** `Modal` from `@mui/material`
- **ShadCN targets:** `dialog/dialog.tsx`, `alert-dialog/alert-dialog.tsx`

```tsx
// BEFORE (MUI)
import { Modal } from "@mui/material";

<Modal
  visible={isOpen}
  onCancel={onClose}
  onOk={handleSubmit}
  title="Edit workflow"
  cancelText={t("cancel")}
  okText={t("save")}
  okDisabled={!isValid}
  className="workflow-modal"
>
  <FormFields />
</Modal>;

// AFTER (ShadCN Dialog)
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
      <DialogTitle>Edit workflow</DialogTitle>
    </DialogHeader>
    <FormFields />
    <DialogFooter>
      <Button variant="secondary" onClick={onClose}>
        {t("cancel")}
      </Button>
      <Button onClick={handleSubmit} disabled={!isValid}>
        {t("save")}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

**Structural change:** One MUI `Modal` component becomes a compound Dialog tree with explicit header/footer and button wiring. Critical props (`visible`, `onCancel`, `onOk`, `okDisabled`) map to `open`, `onOpenChange`, and button handlers.

---

### 4. Dropdown → DropdownMenu (MUI: Dropdown, MUI-lab Dropdown)

- **Files:** ~196 | **Apps:** ~37 | **Libs:** ~16
- **MUI equivalent:** `Dropdown` from `@mui/material` or `@mui/lab`
- **ShadCN target:** `dropdown-menu/dropdown-menu.tsx`

```tsx
// BEFORE (MUI)
import { Dropdown } from "@mui/lab";

<Dropdown trigger={<Button>Actions</Button>}>
  <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
  <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
</Dropdown>;

// AFTER (ShadCN DropdownMenu)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={onDelete} variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

**Migration:** MUI `Dropdown` maps directly to ShadCN `DropdownMenu`; use `DropdownMenuTrigger` + `DropdownMenuContent` + `DropdownMenuItem` for the compound pattern.

---

### 5. Input (MUI: Input)

- **Files:** ~345 | **Apps:** ~34 | **Libs:** ~19
- **MUI equivalent:** `Input` from `@mui/material`
- **ShadCN target:** `input/input.tsx`, plus `helper-text/helper-text.tsx` and `label/label.tsx` where needed.

```tsx
// BEFORE (MUI)
import { Input } from "@mui/material";

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder={t("name_placeholder")}
  disabled={disabled}
  errorMessage={errors.name}
  label={t("name_label")}
/>;

// AFTER (ShadCN)
import { Input, Label } from "@/components/ui";

<div>
  <Label htmlFor="name">{t("name_label")}</Label>
  <Input
    id="name"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder={t("name_placeholder")}
    disabled={disabled}
    errorMessage={errors.name}
  />
</div>;
```

---

### 6. Loader (MUI: Loader)

- **Files:** ~153 | **Apps:** ~37 | **Libs:** ~6
- **MUI equivalent:** `Loader` from `@mui/material`
- **ShadCN target:** `loader/loader.tsx`

```tsx
// BEFORE (MUI)
import { Loader } from "@mui/material";

<Loader size={24} />;

// AFTER (ShadCN)
import { Loader } from "@/components/ui";

<Loader size={24} />;
```

---

### 7. Select / SelectPanel (MUI: Select, MUI-lab Select)

- **Files:** ~143 (Select) + ~50 (SelectPanel) | **Apps:** ~34 | **Libs:** ~17
- **MUI equivalents:** `Select` from `@mui/material`, `Select` + `SelectPanel` from `@mui/lab`
- **ShadCN targets:** `select/select.tsx`, `combobox/combobox.tsx`

```tsx
// BEFORE (MUI-lab Select)
import { Select, SelectPanel } from "@mui/lab";

<Select value={value} onValueChange={setValue} placeholder={t("choose_version")}>
  <SelectPanel>
    {options.map((o) => (
      <SelectPanel.Item key={o.id} value={o.id}>
        {o.label}
      </SelectPanel.Item>
    ))}
  </SelectPanel>
</Select>;

// AFTER (ShadCN Select, single)
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder={t("choose_version")} />
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

---

### 8. Infobox → Alert / Banner (MUI: Infobox)

- **Files:** ~136 | **Apps:** ~34 | **Libs:** ~14
- **MUI equivalent:** `Infobox` from `@mui/material`
- **ShadCN targets:** `alert/alert.tsx`, `banner/banner.tsx`

```tsx
// BEFORE (MUI)
import { Infobox } from "@mui/material";

<Infobox
  type="info"       // info | warning | error | success
  title={t("note_title")}
  onClose={onDismiss}
>
  {t("note_body")}
</Infobox>;

// AFTER (ShadCN Alert)
import { Alert, AlertTitle, AlertDescription, AlertClose } from "@/components/ui";

<Alert
  variant={
    type === "warning"
      ? "warning"
      : type === "error"
        ? "error"
        : type === "success"
          ? "success"
          : "default"
  }
>
  <AlertTitle>{t("note_title")}</AlertTitle>
  <AlertDescription>{t("note_body")}</AlertDescription>
  {onDismiss && <AlertClose onClick={onDismiss} />}
</Alert>;
```

---

### 9. Divider → Separator (MUI: Divider)

- **Files:** ~144 | **Apps:** ~34 | **Libs:** ~11
- **MUI equivalent:** `Divider` from `@mui/material`
- **ShadCN target:** `separator/separator.tsx`

```tsx
// BEFORE (MUI)
import { Divider } from "@mui/material";

<Divider />;

// AFTER (ShadCN)
import { Separator } from "@/components/ui";

<Separator />;
```

---

### 10. Skeleton (MUI: Skeleton)

- **Files:** ~113 | **Apps:** ~20 | **Libs:** ~4
- **MUI equivalent:** `Skeleton` from `@mui/material`
- **ShadCN target:** `skeleton/skeleton.tsx`

```tsx
// BEFORE (MUI)
import { Skeleton } from "@mui/material";

<Skeleton width={100} height={20} />;

// AFTER (ShadCN)
import { Skeleton } from "@/components/ui";

<Skeleton className="w-[100px] h-5" />;
```

---

### 11. TagChip → Badge (MUI: TagChip)

- **Files:** ~104 | **Apps:** ~34 | **Libs:** ~10
- **MUI equivalent:** `TagChip` from `@mui/material`
- **ShadCN target:** `badge/badge.tsx`

```tsx
// BEFORE (MUI)
import { TagChip, GaugeIcon } from "@mui/material";

<TagChip
  colorScheme="blue"
  label=""
  icon={<GaugeIcon />}
  size="x-small"
/>;

// AFTER (ShadCN)
import { Badge } from "@/components/ui";
import { IconGauge } from "lucide-react";

<Badge variant="fjord" size="icon">
  <IconGauge />
</Badge>;
```

---

### 12. Textarea (MUI: Textarea)

- **Files:** ~42 | **Apps:** ~21 | **Libs:** ~5
- **MUI equivalent:** `Textarea` from `@mui/material`
- **ShadCN target:** `textarea/textarea.tsx`

```tsx
// BEFORE (MUI)
import { Textarea } from "@mui/material";

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  errorMessage={error}
/>;

// AFTER (ShadCN)
import { Textarea } from "@/components/ui";

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  errorMessage={error}
  maxChars={maxChars}
/>;
```

---

### 13. TextLabel → Label (MUI: TextLabel)

- **Files:** ~46 | **Apps:** ~15 | **Libs:** ~3
- **MUI equivalent:** `TextLabel` from `@mui/material`
- **ShadCN target:** `label/label.tsx`

```tsx
// BEFORE (MUI)
import { TextLabel } from "@mui/material";

<TextLabel label={t("field_label")} />;

// AFTER (ShadCN)
import { Label } from "@/components/ui";

<Label htmlFor="field-id">{t("field_label")}</Label>;
```

---

### 14. Avatar (MUI: Avatar)

- **Files:** ~51 | **Apps:** ~34 | **Libs:** ~9
- **MUI equivalent:** `Avatar` from `@mui/material`
- **ShadCN target:** `avatar/avatar.tsx`

```tsx
// BEFORE (MUI)
import { Avatar } from "@mui/material";

<Avatar name={name} src={imageUrl} />;

// AFTER (ShadCN)
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui";

<Avatar>
  <AvatarImage src={imageUrl} alt={name} />
  <AvatarFallback>
    {name ? name.slice(0, 2).toUpperCase() : "?"}
  </AvatarFallback>
</Avatar>;
```

---

### 15. Menu → DropdownMenu / ContextMenu / Menubar (MUI-lab: Menu)

- **Files:** ~358 | **Apps:** ~37 | **Libs:** ~18
- **MUI equivalent:** `Menu` from `@mui/lab`
- **ShadCN targets:** `dropdown-menu/dropdown-menu.tsx`, `context-menu/context-menu.tsx`, `menubar/menubar.tsx`

```tsx
// BEFORE (MUI-lab)
import { Menu } from "@mui/lab";

<Menu>
  <Menu.Item icon={<EditIcon />} iconPlacement="left" onClick={onEdit}>
    {t("edit")}
  </Menu.Item>
  <Menu.Item icon={<DeleteIcon />} onClick={onDelete}>
    {t("delete")}
  </Menu.Item>
</Menu>;

// AFTER (ShadCN DropdownMenu)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <IconMore />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={onEdit}>
      <IconEdit /> {t("edit")}
    </DropdownMenuItem>
    <DropdownMenuItem onClick={onDelete} variant="destructive">
      <IconTrash /> {t("delete")}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

---

### 16. Accordion → Accordion / Collapsible (MUI: Accordion)

- **Files:** ~51 | **Apps:** ~22 | **Libs:** ~11
- **MUI equivalent:** `Accordion` from `@mui/material`
- **ShadCN targets:** `accordion/accordion.tsx`, `collapsible/collapsible.tsx`

```tsx
// BEFORE (MUI)
import { Accordion } from "@mui/material";

<Accordion>
  <Accordion.Item title={t("section_title")}>
    {t("section_body")}
  </Accordion.Item>
</Accordion>;

// AFTER (ShadCN Collapsible)
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui";

<Collapsible>
  <CollapsibleTrigger>
    {t("section_title")}
  </CollapsibleTrigger>
  <CollapsibleContent>
    {t("section_body")}
  </CollapsibleContent>
</Collapsible>;
```

---

### 17. Checkbox (MUI: Checkbox)

- **Files:** ~100 | **Apps:** ~37 | **Libs:** ~14
- **MUI equivalent:** `Checkbox` from `@mui/material`
- **ShadCN target:** `checkbox/checkbox.tsx`

```tsx
// BEFORE (MUI)
import { Checkbox } from "@mui/material";

<Checkbox
  checked={checked}
  disabled={disabled}
  onChange={setChecked}
  label={t("accept_terms")}
/>;

// AFTER (ShadCN)
import { Checkbox } from "@/components/ui";
import { Label } from "@/components/ui";

<div className="flex items-center gap-2">
  <Checkbox
    id="accept-terms"
    checked={checked}
    disabled={disabled}
    onCheckedChange={(value: boolean) => setChecked(value)}
  />
  <Label htmlFor="accept-terms">
    {t("accept_terms")}
  </Label>
</div>;
```

**Notes:**

- MUI passes the label via a prop; ShadCN composes `Checkbox` with a `Label` or adjacent text.
- MUI `onChange` typically receives an event; ShadCN `onCheckedChange` receives a boolean (or tristate type), so handlers must be updated.

---

### 18. Switch / Toggle (MUI: Switch)

- **Files:** ~57 | **Apps:** ~34 | **Libs:** ~7
- **MUI equivalent:** `Switch` from `@mui/material`
- **ShadCN targets:** `switch/switch.tsx`, `toggle/toggle.tsx`

```tsx
// BEFORE (MUI)
import { Switch } from "@mui/material";

<Switch
  checked={enabled}
  disabled={isSaving}
  onChange={setEnabled}
/>;

// AFTER (ShadCN Switch)
import { Switch } from "@/components/ui";

<Switch
  checked={enabled}
  disabled={isSaving}
  onCheckedChange={(value: boolean) => setEnabled(value)}
/>;
```

Use `Switch` for boolean form fields and `Toggle` (from `toggle/toggle.tsx`) when you want a button‑like control instead of a form input.

---

### 19. CounterChip → Badge (MUI: CounterChip)

- **Files:** ~57 | **Apps:** ~37 | **Libs:** ~10
- **MUI equivalent:** `CounterChip` from `@mui/material`
- **ShadCN target:** `badge/badge.tsx`

```tsx
// BEFORE (MUI)
import { CounterChip } from "@mui/material";

<CounterChip count={5} />;

// AFTER (ShadCN)
import { Badge } from "@/components/ui";

<Badge variant="secondary">{count}</Badge>;
```

**Migration:** CounterChip displays a numeric count; map to ShadCN `Badge` with appropriate variant.

---

### 20. SegmentedControl (MUI: SegmentedControl)

- **Files:** ~89 | **Apps:** ~27 | **Libs:** ~12
- **MUI equivalent:** `SegmentedControl` from `@mui/material`
- **ShadCN target:** `segmented-control/segmented-control.tsx`

```tsx
// BEFORE (MUI)
import { SegmentedControl } from "@mui/material";

<SegmentedControl
  options={[
    { id: "day", label: t("day") },
    { id: "week", label: t("week") },
    { id: "month", label: t("month") },
  ]}
  value={granularity}
  onChange={setGranularity}
/>;

// AFTER (ShadCN)
import { SegmentedControl } from "@/components/ui";

<SegmentedControl value={granularity} onValueChange={setGranularity}>
  <SegmentedControl.Item value="day">
    {t("day")}
  </SegmentedControl.Item>
  <SegmentedControl.Item value="week">
    {t("week")}
  </SegmentedControl.Item>
  <SegmentedControl.Item value="month">
    {t("month")}
  </SegmentedControl.Item>
</SegmentedControl>;
```

**Notes:** MUI takes an `options` array; ShadCN uses children as segments, each with a `value`. The migration typically involves inlining that options array as `SegmentedControl.Item` children.

---

### 21. TagChipGroup (MUI: TagChipGroup)

- **Files:** ~23 | **Apps:** ~16 | **Libs:** ~5
- **MUI equivalent:** `TagChipGroup` from `@mui/material`
- **ShadCN target:** Composition of `Badge` / `TagChip` in a flex container

```tsx
// BEFORE (MUI)
import { TagChipGroup } from "@mui/material";

<TagChipGroup>
  {tags.map((t) => (
    <TagChip key={t.id} label={t.label} />
  ))}
</TagChipGroup>;

// AFTER (ShadCN)
<div className="flex flex-wrap gap-2">
  {tags.map((t) => (
    <Badge key={t.id} variant="secondary">{t.label}</Badge>
  ))}
</div>
```

**Migration:** Replace with a flex container of `Badge` or `TagChip` components.

---

### 22. PromoChip → Badge (MUI: PromoChip)

- **Files:** ~20 | **Apps:** ~34 | **Libs:** ~4
- **MUI equivalent:** `PromoChip` from `@mui/material`
- **ShadCN target:** `badge/badge.tsx`

```tsx
// BEFORE (MUI)
import { PromoChip } from "@mui/material";

<PromoChip label="New" />;

// AFTER (ShadCN)
import { Badge } from "@/components/ui";

<Badge variant="default">New</Badge>;
```

**Migration:** PromoChip maps to ShadCN `Badge` with an appropriate variant.

---

### 23. Banner (MUI: Banner)

- **Files:** ~17 | **Apps:** ~18 | **Libs:** ~3
- **MUI equivalent:** `Banner` from `@mui/material`
- **ShadCN target:** `banner/banner.tsx` or `alert/alert.tsx`

---

### 24. DatePicker / DateTimePicker (MUI: DatePicker, DateTimePicker)

- **Files:** ~8 (DatePicker) + ~14 (DateTimePicker) | **Apps:** ~14–19 | **Libs:** ~3–4
- **MUI equivalents:** `DatePicker`, `DateTimePicker` from `@mui/material` or `@mui/system`
- **ShadCN targets:** `date-picker/date-picker.tsx`, `calendar/calendar.tsx`, `time-input/time-input.tsx`

```tsx
// BEFORE (MUI)
import { DateTimePicker } from "@mui/material";

<DateTimePicker
  value={startTime}
  onChange={setStartTime}
  label={t("start_time")}
  disabled={disabled}
/>;

// AFTER (ShadCN, date + time example)
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
} from "@/components/ui";
import { Calendar } from "@/components/ui";
import { TimeInput } from "@/components/ui";

<div className="flex flex-col gap-2">
  <DatePicker value={date} onValueChange={setDate}>
    <DatePickerTrigger />
    <DatePickerContent>
      <Calendar
        selected={date}
        onSelect={setDate}
      />
    </DatePickerContent>
  </DatePicker>
  <TimeInput
    value={time}
    onChange={setTime}
    disabled={disabled}
  />
</div>;
```

The exact composition depends on whether the original MUI usage is date‑only or includes time; ShadCN separates calendar and time input concerns, so MUI `DateTimePicker` often becomes a small composed pattern of `DatePicker` + `Calendar` + `TimeInput`.

---

## Section 2: Missing MUI Components (Ordered by Usage)

With the latest ShadCN primitives under `ui@/components/ui`, many components that previously required custom work (Checkbox, Switch, SegmentedControl, DatePicker, simple tables, Banner, Drawer) now have direct ShadCN equivalents and are covered in Section 1.

Components below either have **no direct ShadCN equivalent** or require **more design work** than a straightforward drop‑in replacement. Migration options remain Tailwind, custom components, or deferring to a later phase.

---

### 1. Flex (Layout)

- **Files:** ~1506 | **Apps:** ~37 | **Libs:** ~28

```tsx
// BEFORE (MUI)
import { Flex } from "@mui/material";

<Flex gap={8} alignItems="center" justifyContent="space-between">
  <span>A</span>
  <span>B</span>
</Flex>;

// AFTER (Tailwind)
<div className="flex items-center justify-between gap-2">
  <span>A</span>
  <span>B</span>
</div>;
```

**Migration:** Replace with Tailwind (`flex`, `gap-*`, `items-*`, `justify-*`) or a small shared layout component in `libs/shared` that wraps these utilities.

---

### 2. makeToast (MUI-lab)

- **Files:** ~403 | **Apps:** ~30 | **Libs:** ~10

```tsx
// BEFORE (MUI-lab)
import { makeToast } from "@mui/lab";

makeToast({
  title: t("toast_title"),
  description: t("toast_description"),
  type: "positive", // positive | warning | negative
});

// AFTER (Defer to app-level wrapper)
// Use ShadCN's sonner-toast as the underlying primitive (ui@/components/ui/sonner-toast),
// but expose a project-level helper before bulk-migrating all makeToast calls.
```

**Migration:** v2 recommends using `sonner-toast` for new work, but keeping `makeToast` for existing flows until a dedicated wrapper and patterns are stable.

---

### 3. Body, Heading, Colors (Typography & Theme Tokens)

- **Files:** Body ~957, Heading ~446, Colors ~673 | **Apps:** ~37 | **Libs:** ~20–26

```tsx
// BEFORE (MUI)
import { Body, Heading, Colors } from "@mui/material";

<Heading size="medium">{t("title")}</Heading>
<Body strong size="medium">{t("body")}</Body>
<div style={{ color: Colors.text.primary }}>{t("value")}</div>;

// AFTER (Tailwind + CSS variables)
<h2 className="text-lg font-semibold">{t("title")}</h2>
<p className="text-sm font-medium">{t("body")}</p>
<div className="text-foreground">{t("value")}</div>;
```

**Migration:** Use Tailwind typography and ShadCN CSS variables (`text-foreground`, `bg-background`, etc.). If needed, create a small `Text`/`Heading` wrapper library rather than relying on MUI typography.

---

### 4. PageHeader (MUI-lab)

- **Files:** ~39 | **Apps:** ~34 | **Libs:** ~4

Page headers have no single ShadCN primitive; instead, use a combination of `topbar/topbar`, `breadcrumb/breadcrumb`, `toolbar/toolbar`, `button`, and typography utilities to reconstruct the layout.

**Migration strategy:** leave PageHeader on MUI-lab in the first wave; design a ShadCN-based header pattern before bulk migration.

---

### 5. High‑feature DataGrid (MUI-lab DataGrid)

- **Files:** ~27 | **Apps:** ~18 | **Libs:** ~6

ShadCN `table/table.tsx` covers simple tables, but not full DataGrid functionality (virtualization, advanced editing, complex cell renderers).

**Migration:** keep using MUI-lab `DataGrid` in v2. For new tables, prefer ShadCN `table` + TanStack Table and plan a separate grid‑to‑table migration later.

---

### 6. EmptyState and other visual shells

- **Files:** ~133 (EmptyState) | **Apps:** ~34 | **Libs:** ~10

While some patterns can be reconstructed with `card`, `alert`, `banner`, and `typography`, there is no single EmptyState primitive. These should be migrated case‑by‑case, designing small shared ShadCN‑based patterns where beneficial.

---

### 7. ToolBar (MUI: ToolBar)

- **Files:** ~57 | **Apps:** ~18 | **Libs:** ~6

Layout component for toolbars; no direct ShadCN equivalent. Replace with Tailwind flex layout or a small shared toolbar component.

---

### 8. Link (MUI: Link, A)

- **Files:** ~39 | **Apps:** ~34 | **Libs:** ~6

Typography/link components. Replace with Tailwind (`text-primary underline`) or a small shared `Link` wrapper.

---

### 9. ConfigProvider (MUI: ConfigProvider)

- **Files:** ~34 | **Apps:** ~35 | **Libs:** ~2

Theme/config provider. Defer until ShadCN theme provider patterns are stable.

---

### 10. IndexTable (MUI-lab)

- **Files:** ~32 | **Apps:** ~34 | **Libs:** ~3

Similar to DataGrid; keep on MUI-lab. For new tables, prefer ShadCN `table` + TanStack Table.

---

### 11. Overline (MUI: Overline)

- **Files:** ~32 | **Apps:** ~24 | **Libs:** ~5

Typography component. Replace with Tailwind typography classes.

---

### 12. Autocomplete (MUI-lab)

- **Files:** ~23 | **Apps:** ~34 | **Libs:** ~5

Combobox with search; no direct ShadCN equivalent. ShadCN `Command` or `Select` with search may cover some use cases; otherwise defer.

---

### 13. Pagination (MUI: Pagination)

- **Files:** ~15 | **Apps:** ~16 | **Libs:** ~4

No ShadCN pagination primitive. Migrate case‑by‑case with custom components or defer.

---

### 14. Topbar (MUI: Topbar)

- **Files:** ~9 | **Apps:** ~7 | **Libs:** ~2

Layout component for top bars. Replace with ShadCN `topbar` or compose from toolbar/breadcrumb/typography.

---

### 15. Tabs (MUI: Tabs)

- **Files:** ~44 | **Apps:** ~34 | **Libs:** ~4

No direct ShadCN equivalent. Use ShadCN `Tabs` if available, or compose from `SegmentedControl` / custom tab pattern.

---

### 16. ToastContainer (MUI: ToastContainer)

- **Files:** ~40 | **Apps:** ~32 | **Libs:** ~2

Defer to app-level wrapper over `sonner-toast`; keep ToastContainer on MUI until patterns are stable.

---

### 17. Elevations (MUI: Elevations)

- **Files:** ~31 | **Apps:** ~20 | **Libs:** ~4

Theme tokens for shadows. Replace with Tailwind shadow utilities or ShadCN CSS variables.

---

### 18. ActionList (MUI-lab)

- **Files:** ~19 | **Apps:** ~34 | **Libs:** ~3

List component for actions. Migrate case‑by‑case with `DropdownMenu` or custom list patterns.

---

## Section 3: PR Strategy (Ordered by Effort Rating)

Effort ratings from v1 remain a useful baseline, but v2 reduces effort for many apps because **Checkbox**, **Switch**, **SegmentedControl**, **DatePicker**, **simple tables**, **Banner**, and **Drawer** now have clear ShadCN primitives.

### Effort tiers (unchanged in meaning)

- **Low (1–2):** small number of supported MUI components, limited surface area.
- **Medium (3–4):** moderate number of supported components, few complex patterns.
- **High (5+):** many supported components plus complex patterns (DataGrid, heavy Menu usage, extensive makeToast).

### App-level scan template

Use this section for project-specific output generated by the `analyze` and `plan` modes. Keep the checked-in doc generic; do not store app or organization-specific inventory here.

Suggested columns:

| Project | Supported components | Estimated usages | Deferred components | Effort |
| --- | ---: | ---: | --- | --- |
| Example app | 8 | ~40 | DataGrid, Tabs | Medium |

### Global priorities in v2

1. **Foundational primitives (low risk / high reusability)**  
   Button, Input, Textarea, HelperText, Label, Loader, Skeleton, Badge, Checkbox, Switch, SegmentedControl.

2. **Compound interaction primitives**  
   Tooltip, Dialog/AlertDialog, DropdownMenu/ContextMenu/Menubar (replaces Dropdown), Popover/HoverCard, Drawer/Sheet.

3. **Data entry and date/time**  
   Select/Combobox, DatePicker/Calendar, InputGroup.

4. **Complex structures**  
   Simple Table, prompt-input, message/conversation, banner/alert.

5. **Still-on-MUI (defer)**  
   Full DataGrid, IndexTable, makeToast/ToastContainer, PageHeader, Topbar, ToolBar, ConfigProvider, Autocomplete, Pagination, Link, Overline, layout typography helpers.

### App‑level guidance

When estimating effort per app:

- For apps where **most MUI UI** is now supported directly by ShadCN primitives (especially heavy on Checkbox/Switch/SegmentedControl/simple tables), you can **drop the effort rating by one step**, e.g.:
  - High(6) → High(5)
  - Medium(4) → Low/Medium(3)
- Apps that rely heavily on **DataGrid**, **makeToast**, and **PageHeader** should keep a higher effort rating until we design bespoke replacements for those patterns.

Examples (fill from the current workspace scan, including transitive libs):

- **Good first migration targets (Low effort):**
  - Apps with ~5-10 files of MUI usage and mostly foundational primitives.
- **Large, complex apps (High 5–6):**
  - Apps with hundreds of direct or transitive files using MUI, especially those that depend on shared UI libraries.
  - Most apps pull in shared libs that add significant MUI surface.
- **Lib migration priority:** shared UI libraries used by many apps should move first because they reduce effort across downstream apps.

### Recommended migration order (v2)

1. **Pilot low‑risk apps** using foundational primitives only.
2. **Migrate high-impact libs first** so downstream apps inherit less MUI surface.
3. **Tackle apps with moderate lib usage** after shared-lib migrations.
4. **Plan dedicated streams** for:
   - DataGrid → ShadCN table/TanStack patterns.
   - makeToast/ToastContainer → app‑level wrapper over `sonner-toast`.
   - PageHeader and layout helpers → ShadCN `topbar`, `breadcrumb`, `toolbar`, typography.

---

## Key Files

- ShadCN UI source of truth:  
  `local ShadCN components directory`
- v2 migration plan (this document):  
  `docs/mui-shadcn-migration-plan-v2.md`
- MUI usage scan script (regenerate Section 1, 2, 3 tables + libs; includes `apps/` and `libs/`):  
  `node scripts/scan-MUI-usage.js`
