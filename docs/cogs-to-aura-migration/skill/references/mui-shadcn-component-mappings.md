# MUI → ShadCN Component Mappings

Canonical before/after examples for every MUI component. Use the relevant section as the mapping example when prompting the LLM to rewrite a usage.

---

## Button

**MUI:**

```tsx
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
```

**ShadCN:**

```tsx
import { Button, Loader } from "@/components/ui";
import { IconPlus } from "lucide-react";

<Button
  variant={
    type === "secondary"
      ? "secondary"
      : type === "ghost"
        ? "ghost"
        : undefined
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

**Notes:**

- `type` → `variant` map: primary → default (omit `variant` prop for the default style), secondary → secondary, others → ghost.
- `size` → `size`: small → sm, large → lg, medium → default.
- `icon` and `iconPlacement` become children composition.
- `loading` drives children and `disabled`.
- `toggled` impacts `className` / visual state.
- MUI icons (e.g. AddIcon) → `lucide-react` equivalents (e.g. IconPlus).

---

## Tooltip

**MUI:**

```tsx
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
```

**ShadCN:**

```tsx
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

**Notes:**

- MUI wrapper with `content` prop becomes ShadCN compound components.
- `placement` → `side`.
- `enterDelay` → `TooltipProvider delayDuration`.
- `disabled` can be handled by forcing `open={false}` or skipping tooltip.

---

## Modal → Dialog

**MUI:**

```tsx
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
```

**ShadCN:**

```tsx
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

**Notes:**

- `visible` → `open`.
- `onCancel` → `onOpenChange` close handler and cancel button.
- `onOk` / `okDisabled` → primary button handler and `disabled`.
- Title and footer become explicit header/footer sections. Use `AlertDialog` for confirmation dialogs.

---

## Radio / RadioGroup

**MUI:**

```tsx
import { Body, Radio, RadioGroup } from "@mui/material";

<RadioGroup
  name="release-version"
  value={selectedVersion}
  onChange={(event) => setSelectedVersion(event.target.value)}
>
  {ALLOWED_VERSIONS.map((version) => (
    <Radio
      key={version.value}
      value={version.value}
      disabled={version.disabled}
      description={version.description}
    >
      <Body>{version.label}</Body>
    </Radio>
  ))}
</RadioGroup>;
```

**ShadCN:**

```tsx
import { Label, RadioGroup, RadioGroupItem } from "@/components/ui";

<RadioGroup
  defaultValue={selectedVersion}
  onValueChange={(value) => setSelectedVersion(value)}
  orientation="vertical"
  aria-label="Release version"
>
  {ALLOWED_VERSIONS.map((version) => {
    const id = `release-${version.value}`;

    return (
      <div key={version.value} className="flex items-start space-x-2">
        <RadioGroupItem
          value={version.value}
          id={id}
          disabled={version.disabled}
          aria-describedby={
            version.description ? `${id}-description` : undefined
          }
        />
        <div>
          <Label htmlFor={id}>{version.label}</Label>
          {version.description && (
            <p
              id={`${id}-description`}
              className="text-muted-foreground text-xs"
            >
              {version.description}
            </p>
          )}
        </div>
      </div>
    );
  })}
</RadioGroup>;
```

**Notes:**

- MUI `RadioGroup` with `onChange={(e) => setValue(e.target.value)}` maps to ShadCN `RadioGroup` with `onValueChange={(value) => setValue(value)}`.
- MUI `Radio` becomes ShadCN `RadioGroupItem`; label/description content moves next to it as `Label` + supporting text.
- Use `orientation="horizontal"` on ShadCN `RadioGroup` when MUI groups were rendered inline.
- Use `aria-label` or visually hidden headings in ShadCN when MUI relied on surrounding text instead of an explicit label.

---

## Avatar

**MUI:**

```tsx
import { Avatar } from "@mui/material";

<Avatar
  text={displayName}
  image={profilePicture}
  size="medium"          // small | medium | large
  tooltip={false}
  className="user-avatar"
/>;
```

**ShadCN:**

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIcon,
} from "@/components/ui";

<Avatar
  sizes="default"        // default | xsm | xxsm
  className="user-avatar"
>
  {profilePicture ? (
    <AvatarImage src={profilePicture} alt={displayName} />
  ) : (
    <AvatarFallback aria-label={displayName}>
      <AvatarIcon>{displayName?.[0]}</AvatarIcon>
    </AvatarFallback>
  )}
</Avatar>;
```

**Notes:**

- MUI `Avatar` props:
  - `image` → ShadCN `AvatarImage src`.
  - `text` → fallback content (e.g. first letter) inside `AvatarFallback` / `AvatarIcon`.
  - `size` → ShadCN `sizes`: small → xsm, medium → default, large → default or custom class.
- MUI `tooltip={false}` usually has no direct ShadCN equivalent; omit unless you add your own tooltip behavior.
- Keep any layout-specific styling (e.g. `pointer-events: none`, flex rules) on the outer `Avatar` via `className` or styled wrapper.

---

## Shortcut → Kbd

**MUI:**

```tsx
import { Shortcut } from "@mui/material";

<Shortcut
  themeProps={{ theme: "base", inverted: true }}
  keys={["Ctrl + Shift + K"]} // or [NAVRAIL_COLLAPSE_TOGGLE_SHORTCUT]
/>;
```

**ShadCN:**

```tsx
import { Kbd, KbdGroup } from "@/components/ui";

<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <span>+</span>
  <Kbd>Shift</Kbd>
  <span>+</span>
  <Kbd>K</Kbd>
</KbdGroup>;
```

**Notes:**

- MUI `Shortcut` with a `keys` array becomes one or more `Kbd` elements composed inside a `KbdGroup`, with simple separators (e.g. `"+"`) between them.
- Theme-related props like `themeProps` are generally not needed in ShadCN; rely on the default Kbd styling or apply custom `className` on `Kbd` / `KbdGroup` if required.
- For shortcuts stored in a single string (e.g. `"Ctrl + Shift + K"`), split into tokens and render each part as a `Kbd` plus separators, to keep the visual representation close to MUI.

---

## Dropdown → DropdownMenu

**MUI:**

```tsx
import { Dropdown } from "@mui/lab";

<Dropdown trigger={<Button>Actions</Button>}>
  <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
  <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
</Dropdown>;
```

**ShadCN:**

```tsx
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
    <DropdownMenuItem onClick={onDelete} variant="destructive">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>;
```

**Notes:**

- `trigger` prop becomes `DropdownMenuTrigger asChild`.
- `Dropdown.Item` becomes `DropdownMenuItem`.

---

## Input

**MUI:**

```tsx
import { Input } from "@mui/material";

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder={t("name_placeholder")}
  disabled={disabled}
  errorMessage={errors.name}
  label={t("name_label")}
/>;
```

**ShadCN:**

```tsx
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

**Notes:**

- `label` prop becomes a separate `Label` component with `htmlFor`; give `Input` a matching `id`.
- Error handling maps directly to `errorMessage`.

---

## Loader

**MUI:**

```tsx
import { Loader } from "@mui/material";

<Loader size={24} />;
```

**ShadCN:**

```tsx
import { Loader } from "@/components/ui";

<Loader size={24} />;
```

**Notes:**

- Same API; only change the import.

---

## Select / SelectPanel

**MUI:**

```tsx
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
```

**ShadCN:**

```tsx
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

**Notes:**

- MUI `Select` + `SelectPanel` + `SelectPanel.Item` become ShadCN compound: `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`.
- Placeholder moves to `SelectValue placeholder`.

---

## Infobox → Alert

**MUI:**

```tsx
import { Infobox } from "@mui/material";

<Infobox
  type="info"       // info | warning | error | success
  title={t("note_title")}
  onClose={onDismiss}
>
  {t("note_body")}
</Infobox>;
```

**ShadCN:**

```tsx
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

**Notes:**

- `type` → `variant`: info → default, warning/error/success map directly.
- Title and body become `AlertTitle` and `AlertDescription`; optional `AlertClose` for dismiss.

---

## Divider → Separator

**MUI:**

```tsx
import { Divider } from "@mui/material";

<Divider />;
```

**ShadCN:**

```tsx
import { Separator } from "@/components/ui";

<Separator />;
```

**Notes:**

- Direct rename; only change the import.

---

## Skeleton

**MUI:**

```tsx
import { Skeleton } from "@mui/material";

<Skeleton width={100} height={20} />;
```

**ShadCN:**

```tsx
import { Skeleton } from "@/components/ui";

<Skeleton className="w-[100px] h-5" />;
```

**Notes:**

- ShadCN uses `className` (Tailwind) for dimensions instead of `width`/`height` props.

---

## TagChip → Badge

**MUI:**

```tsx
import { TagChip, GaugeIcon } from "@mui/material";

<TagChip
  colorScheme="blue"
  label=""
  icon={<GaugeIcon />}
  size="x-small"
/>;
```

**ShadCN:**

```tsx
import { Badge } from "@/components/ui";
import { IconGauge } from "lucide-react";

<Badge variant="fjord" size="icon">
  <IconGauge />
</Badge>;
```

**Notes:**

- `colorScheme` → `variant` (map to ShadCN badge variants e.g. fjord, secondary).
- `label` can be omitted or become Badge children.
- Icon as child; MUI icons → `lucide-react`.

---

## Textarea

**MUI:**

```tsx
import { Textarea } from "@mui/material";

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  errorMessage={error}
/>;
```

**ShadCN:**

```tsx
import { Textarea } from "@/components/ui";

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  errorMessage={error}
  maxChars={maxChars}
/>;
```

**Notes:**

- API is very similar; add `maxChars` if needed. Only change the import.

---

## TextLabel → Label

**MUI:**

```tsx
import { TextLabel } from "@mui/material";

<TextLabel label={t("field_label")} />;
```

**ShadCN:**

```tsx
import { Label } from "@/components/ui";

<Label htmlFor="field-id">{t("field_label")}</Label>;
```

**Notes:**

- `label` prop becomes children; add `htmlFor` when associated with an input.

---

## Avatar

**MUI:**

```tsx
import { Avatar } from "@mui/material";

<Avatar name={name} src={imageUrl} />;
```

**ShadCN:**

```tsx
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

**Notes:**

- MUI single component becomes compound: `Avatar` + `AvatarImage` + `AvatarFallback`.
- `name` used for `alt` and fallback initials.

---

## Menu → DropdownMenu

**MUI:**

```tsx
import { Menu } from "@mui/lab";

<Menu>
  <Menu.Item icon={<EditIcon />} iconPlacement="left" onClick={onEdit}>
    {t("edit")}
  </Menu.Item>
  <Menu.Item icon={<DeleteIcon />} onClick={onDelete}>
    {t("delete")}
  </Menu.Item>
</Menu>;
```

**ShadCN:**

```tsx
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

**Notes:**

- Menu without a trigger in MUI often needs an explicit trigger in ShadCN (e.g. icon button).
- `Menu.Item` → `DropdownMenuItem`; put icons inside the item as children.
- Use `ContextMenu` or `Menubar` from ShadCN when the interaction pattern matches.

---

## Accordion → Collapsible

**MUI:**

```tsx
import { Accordion } from "@mui/material";

<Accordion>
  <Accordion.Item title={t("section_title")}>
    {t("section_body")}
  </Accordion.Item>
</Accordion>;
```

**ShadCN:**

```tsx
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

**Notes:**

- `Accordion.Item` with `title` prop becomes `CollapsibleTrigger` (title as children) + `CollapsibleContent`.
- For multiple items, use ShadCN `Accordion` if available, or multiple `Collapsible` components.

---

## Checkbox

**MUI:**

```tsx
import { Checkbox } from "@mui/material";

<Checkbox
  checked={checked}
  disabled={disabled}
  onChange={setChecked}
  label={t("accept_terms")}
/>;
```

**ShadCN:**

```tsx
import { Checkbox, Label } from "@/components/ui";

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

- MUI `label` prop → separate `Label` with `htmlFor`; give Checkbox an `id`.
- MUI `onChange` (often event-based) → ShadCN `onCheckedChange` (boolean or tristate).

---

## Switch

**MUI:**

```tsx
import { Switch } from "@mui/material";

<Switch
  checked={enabled}
  disabled={isSaving}
  onChange={setEnabled}
/>;
```

**ShadCN:**

```tsx
import { Switch } from "@/components/ui";

<Switch
  checked={enabled}
  disabled={isSaving}
  onCheckedChange={(value: boolean) => setEnabled(value)}
/>;
```

**Notes:**

- `onChange` → `onCheckedChange` with boolean value. Use ShadCN `Toggle` for button-like toggles.

---

## CounterChip → Badge

**MUI:**

```tsx
import { CounterChip } from "@mui/material";

<CounterChip count={5} />;
```

**ShadCN:**

```tsx
import { Badge } from "@/components/ui";

<Badge variant="secondary">{count}</Badge>;
```

**Notes:**

- CounterChip displays a number; map to Badge with the count as children and an appropriate `variant`.

---

## SegmentedControl

**MUI:**

```tsx
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
```

**ShadCN:**

```tsx
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

**Notes:**

- MUI `options` array → ShadCN children: one `SegmentedControl.Item` per option with `value` and label as children.
- `onChange` → `onValueChange`.

---

## TagChipGroup

**MUI:**

```tsx
import { TagChipGroup } from "@mui/material";

<TagChipGroup>
  {tags.map((t) => (
    <TagChip key={t.id} label={t.label} />
  ))}
</TagChipGroup>;
```

**ShadCN:**

```tsx
<div className="flex flex-wrap gap-2">
  {tags.map((t) => (
    <Badge key={t.id} variant="secondary">{t.label}</Badge>
  ))}
</div>
```

**Notes:**

- No ShadCN TagChipGroup; use a flex container of `Badge` (or ShadCN TagChip if available). Migrate each TagChip per TagChip → Badge mapping.

---

## PromoChip → Badge

**MUI:**

```tsx
import { PromoChip } from "@mui/material";

<PromoChip label="New" />;
```

**ShadCN:**

```tsx
import { Badge } from "@/components/ui";

<Badge variant="default">New</Badge>;
```

**Notes:**

- PromoChip maps to Badge with label as children and an appropriate variant.

---

## Banner

**MUI:**

```tsx
import { Banner } from "@mui/material";

<Banner
  type="warning"                   // info | warning | error | success
  title="Deprecated runtime"
  description="This runtime version will be removed soon. Please upgrade."
  onClose={onClose}
  actions={[
    {
      label: "Learn more",
      onClick: onLearnMore,
    },
  ]}
/>
```

**ShadCN:**

```tsx
import {
  Banner,
  BannerIcon,
  BannerTitle,
  BannerStatus,
  BannerActions,
  BannerAction,
  BannerClose,
} from "@/components/ui";
import { IconAlertTriangle } from "lucide-react";

<Banner
  variant="warning"                // default | neutral | destructive | warning
  inset
  onClose={onClose}
>
  <BannerIcon icon={IconAlertTriangle} />
  <div className="flex flex-col gap-0.5">
    <BannerTitle>Deprecated runtime</BannerTitle>
    <span className="text-xs">
      This runtime version will be removed soon. Please upgrade.
    </span>
  </div>
  <BannerStatus>Warning</BannerStatus>
  <BannerActions>
    <BannerAction onClick={onLearnMore}>Learn more</BannerAction>
  </BannerActions>
  <BannerClose />
</Banner>;
```

**Notes:**

- MUI `type` maps to ShadCN `variant`:
  - `info` → `neutral`
  - `warning` → `warning`
  - `error` / `negative` → `destructive`
  - `success` / `positive` → `default`
- MUI `title` → `BannerTitle` text; `description` → secondary text next to it.
- MUI inline `actions` → one or more `BannerAction` buttons inside `BannerActions`.
- MUI `onClose` / close icon → `onClose` prop on `Banner` plus a `BannerClose` child.
- If MUI uses an icon prop, choose a matching lucide-react icon and pass it to `BannerIcon`.

---

## DatePicker / DateTimePicker

**MUI:**

```tsx
import { DateTimePicker } from "@mui/material";

<DateTimePicker
  value={startTime}
  onChange={setStartTime}
  label={t("start_time")}
  disabled={disabled}
/>;
```

**ShadCN:**

```tsx
import {
  DatePicker,
  DatePickerTrigger,
  DatePickerContent,
} from "@/components/ui";
import { Calendar } from "@/components/ui";
import { TimeInput } from "@/components/ui";

<div className="flex flex-col gap-2">
  <Label>{t("start_time")}</Label>
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

**Notes:**

- DateTimePicker splits into DatePicker + Calendar + TimeInput. For date-only, use DatePicker + Calendar. Wire `value`/`onChange` to date and time state as needed.

---

## Flex → Tailwind

**MUI:**

```tsx
import { Flex } from "@mui/material";

<Flex gap={8} alignItems="center" justifyContent="space-between">
  <span>A</span>
  <span>B</span>
</Flex>;
```

**ShadCN (Tailwind):**

```tsx
<div className="flex items-center justify-between gap-2">
  <span>A</span>
  <span>B</span>
</div>;
```

**Notes:**

- No Flex in ShadCN; use Tailwind. `gap` (pixels) → `gap-*` (e.g. 8 → gap-2). `alignItems` → `items-*`. `justifyContent` → `justify-*`. `direction="column"` → `flex-col`. `flex={1}` → `flex-1`.

---

## makeToast (MUI-lab)

**MUI:**

```tsx
import { ToastProvider, makeToast } from "@mui/lab";

// App shell
<ToastProvider>
  <App />
</ToastProvider>;

makeToast({
  type: "positive", // positive | warning | negative
  title: t("toast_title"),
  description: t("toast_description"),
  duration: 5000,
});
```

**ShadCN / migration:**

```tsx
import { Toaster, toast } from "@/components/ui";

// App shell (once per app)
<>
  <Toaster />
  <App />
</>;

// When showing a toast
toast(t("toast_title"), {
  description: t("toast_description"),
  duration: 5000,
  // Optionally: map MUI type → variant or use toast.success / toast.error
  // e.g. type === "positive" ? toast.success(...) : toast.error(...)
});
```

**Notes:**

- `ToastProvider` / `ToastContainer` → a single global `<Toaster />` rendered high in the tree (shell or root app).
- `makeToast` → `toast(...)` from ShadCN’s Sonner integration:
  - `title` → first argument.
  - `description` → `description` option.
  - `duration` → `duration` option.
  - `type` → choose `toast.success` / `toast.error` / etc. or map to styling in a small wrapper.
- Prefer introducing a tiny project-level helper (e.g. `showToast`) that wraps `toast(...)` so you can centralize any differences between the old `makeToast` API and the new usage.

---

## Body, Heading, Colors (typography & theme)

**MUI:**

```tsx
import { Body, Heading, Colors } from "@mui/material";

<Heading size="medium">{t("title")}</Heading>
<Body strong size="medium">{t("body")}</Body>
<div style={{ color: Colors.text.primary }}>{t("value")}</div>;
```

**ShadCN (Tailwind + CSS variables):**

```tsx
<h2 className="text-lg font-semibold">{t("title")}</h2>
<p className="text-sm font-medium">{t("body")}</p>
<div className="text-foreground">{t("value")}</div>;
```

**Notes:**

- Replace with semantic HTML + Tailwind typography and ShadCN CSS variables (`text-foreground`, `bg-background`, etc.). Create small Text/Heading wrappers if needed.

---

## PageHeader (MUI-lab)

**MUI:**

```tsx
import { PageHeader } from "@mui/lab";

<PageHeader ... />
```

**ShadCN / migration:**

No single ShadCN primitive. Compose from `topbar`, `breadcrumb`, `toolbar`, `button`, and typography. Often deferred; design a ShadCN-based header pattern before bulk migration.

**Notes:**

- Leave on MUI-lab in the first wave unless a composed pattern is defined.

---

## DataGrid (MUI-lab)

**MUI:**

```tsx
import { DataGrid } from "@mui/lab";

<DataGrid ... />
```

**ShadCN / migration:**

ShadCN `table/table.tsx` covers simple tables only. Keep MUI-lab DataGrid for full functionality (virtualization, advanced editing, complex cells). For new code, prefer ShadCN table + TanStack Table; plan a separate grid migration later.

**Notes:**

- Do not replace DataGrid with ShadCN table in one step; treat as deferred or custom migration.

---

## EmptyState

**MUI:**

```tsx
import { EmptyState } from "@mui/material";

<EmptyState ... />
```

**ShadCN / migration:**

No single EmptyState in ShadCN. Rebuild case-by-case with `card`, `alert`, `banner`, and typography, or small shared ShadCN-based patterns.

**Notes:**

- Migrate per usage; no generic mapping.

---

## ToolBar (MUI)

**MUI:**

```tsx
import { ToolBar } from "@mui/material";

<ToolBar ... />
```

**ShadCN / migration:**

No direct ShadCN ToolBar. Replace with Tailwind flex layout or a small shared toolbar component (e.g. `div` with `className="flex items-center gap-2"` and appropriate spacing).

**Notes:**

- Layout-only; use flex + gap + alignment utilities.

---

## Link / A (MUI)

**MUI:**

```tsx
import { Link, A } from "@mui/material";

<Link href="...">...</Link>
<A href="...">...</A>
```

**ShadCN / migration:**

Replace with Tailwind (`text-primary underline`), or a small shared `Link` wrapper (e.g. `a` with ShadCN styling or React Router’s `Link` with classes).

**Notes:**

- Typography/link; no ShadCN Link component in mapping—use native `a` or app Link + Tailwind.

---

## ConfigProvider (MUI)

**MUI:**

```tsx
import { ConfigProvider } from "@mui/material";

<ConfigProvider ...>
  ...
</ConfigProvider>
```

**ShadCN / migration:**

Theme/config provider. Defer until ShadCN theme provider patterns are stable. Leave on MUI or replace with ShadCN’s theme provider if documented.

**Notes:**

- Do not migrate blindly; confirm ShadCN theming API first.

---

## IndexTable (MUI-lab)

**MUI:**

```tsx
import { IndexTable } from "@mui/lab";

<IndexTable ... />
```

**ShadCN / migration:**

Similar to DataGrid; keep on MUI-lab. For new tables use ShadCN `table` + TanStack Table.

**Notes:**

- Defer or custom migration.

---

## Overline (MUI)

**MUI:**

```tsx
import { Overline } from "@mui/material";

<Overline>...</Overline>
```

**ShadCN / migration:**

Typography. Replace with Tailwind (e.g. `text-xs uppercase tracking-wide text-muted-foreground` or equivalent).

**Notes:**

- No ShadCN Overline; use utility classes.

---

## Autocomplete (MUI-lab)

**MUI:**

```tsx
import { Autocomplete } from "@mui/lab";

<Autocomplete
  value={value}
  options={options} // Array<{ value: string; label: string }>
  placeholder="Select option..."
  onChange={setValue}
/>
```

**ShadCN / migration:**

```tsx
import { Combobox } from "@/components/ui";

<Combobox
  options={options}
  value={value}
  onValueChange={setValue}
  placeholder="Select option..."
  searchPlaceholder="Search..."
  emptyText="No option found."
/>;
```

**Notes:**

- Map MUI `Autocomplete` props:
  - `options` → `Combobox options` (`{ value, label }` items).
  - `value` / `onChange` → `value` / `onValueChange`.
  - `placeholder` → `placeholder`.
- More advanced Autocomplete props (custom renderers, grouped options, async
  loading) may need custom `Command` composition, but simple “search and
  select from a list” maps directly to `Combobox`.

---

## Pagination (MUI)

**MUI:**

```tsx
import { Pagination } from "@mui/material";

<Pagination
  page={page}
  pageSize={pageSize}
  total={totalItems}
  onChange={setPage}
  onPageSizeChange={setPageSize}
/>
```

**ShadCN / migration:**

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationFirst,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationLast,
  PaginationStatus,
  PaginationSelectTrigger,
} from "@/components/ui";

const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
const currentPage = Math.min(page, totalPages);

<Pagination>
  <PaginationContent size="small">
    <PaginationItem>
      <PaginationFirst
        href="#"
        isDisabled={currentPage === 1}
        onClick={(event) => {
          event.preventDefault();
          setPage(1);
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationPrevious
        href="#"
        isDisabled={currentPage === 1}
        onClick={(event) => {
          event.preventDefault();
          setPage(currentPage - 1);
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        isActive
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        {currentPage}
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext
        href="#"
        isDisabled={currentPage === totalPages}
        onClick={(event) => {
          event.preventDefault();
          setPage(currentPage + 1);
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLast
        href="#"
        isDisabled={currentPage === totalPages}
        onClick={(event) => {
          event.preventDefault();
          setPage(totalPages);
        }}
      />
    </PaginationItem>
    <PaginationStatus>
      Page {currentPage} of {totalPages}
    </PaginationStatus>
    <PaginationItem>
      <PaginationSelectTrigger
        value={String(pageSize)}
        onChange={(event) => {
          const nextSize = Number(event.target.value) || pageSize;
          setPage(1);
          setPageSize(nextSize);
        }}
      >
        {/* options rendered via surrounding Select in real code */}
      </PaginationSelectTrigger>
    </PaginationItem>
  </PaginationContent>
</Pagination>;
```

**Notes:**

- Map MUI `page`, `pageSize`, `total` and `onChange` handlers to ShadCN state:
  - `page` / `onChange` → `PaginationFirst`/`Previous`/`Next`/`Last` click
    handlers that call the same `setPage` logic.
  - `pageSize` / `onPageSizeChange` → `PaginationSelectTrigger` wrapped in
    a `Select`, updating both `pageSize` and (typically) resetting `page` to 1.
- Use `PaginationStatus` to show the current page and total pages instead of
  MUI’ built-in status text.
- When MUI uses numbered page links, render them via multiple `PaginationItem`
  + `PaginationLink` elements, setting `isActive` on the current one.
- ShadCN’s Pagination is layout- and interaction-only; fetching data for the
  new page still happens in your own state/effects just like with MUI.

---

## Topbar (MUI)

**MUI:**

```tsx
import { Topbar } from "@mui/material";

<Topbar
  title="Assets"
  subtitle="Overview"
  actions={[
    { icon: <FilterIcon />, onClick: onFilter },
    { icon: <MoreIcon />, onClick: onMore },
  ]}
/>
```

**ShadCN / migration:**

```tsx
import { Toolbar } from "@/components/ui";
import { Button } from "@/components/ui";
import { IconFilter, IconDots } from "lucide-react";

<header className="flex items-center justify-between gap-3">
  <div className="min-w-0">
    <h1 className="text-lg font-semibold leading-tight truncate">Assets</h1>
    <p className="text-muted-foreground text-xs">Overview</p>
  </div>
  <Toolbar className="gap-1">
    <Button
      variant="ghost"
      size="icon"
      onClick={onFilter}
      aria-label="Filter"
    >
      <IconFilter size={16} />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      onClick={onMore}
      aria-label="More actions"
    >
      <IconDots size={16} />
    </Button>
  </Toolbar>
</header>;
```

**Notes:**

- MUI `Topbar` is an opinionated header with title/subtitle and action icons.
- ShadCN does not expose a 1:1 `Topbar` component; instead use `Toolbar` from
  `@/components/ui` together with standard typography and layout (`header`,
  text classes, buttons, icons).
- Map `Topbar` props as:
  - `title` → heading text (`<h1>` or `PageHeader`-style component).
  - `subtitle` → secondary text below the title.
  - `actions` → children of `Toolbar`, typically `Button` elements with
    `variant="ghost"` / `size="icon"` and equivalent lucide-react icons.
- Keep any custom layout (breadcrumbs, background color, borders) in the
  surrounding header/container rather than trying to encode it into `Toolbar`.

---

## Tabs (MUI)

**MUI:**

```tsx
import { Tabs } from "@mui/material";

<Tabs ... />
```

**ShadCN / migration:**

Use ShadCN `Tabs` if available; otherwise compose from `SegmentedControl` or a custom tab pattern.

**Notes:**

- Verify ShadCN Tabs API before migrating.

---

## ToastContainer (MUI)

**MUI:**

```tsx
import { ToastContainer } from "@mui/material";

<ToastContainer />
```

**ShadCN / migration:**

```tsx
import { Toaster } from "@/components/ui";

// App shell or root layout
<>
  <Toaster />
  <App />
</>;
```

**Notes:**

- `ToastContainer` / `ToastProvider` are the MUI-side hosts for toasts; in ShadCN,
  use a single global `<Toaster />` from the Sonner-based toast integration.
- Ensure only one `<Toaster />` is rendered per app/shell, typically near the
  root, just like `ToastContainer` used to be.
- After all `makeToast` calls have been migrated to ShadCN’s `toast(...)`, remove
  `ToastContainer` imports and JSX entirely in favor of `<Toaster />`.

---

## Elevations (MUI)

**MUI:**

```tsx
import { Elevations } from "@mui/material";

<div style={{ boxShadow: Elevations... }} />
```

**ShadCN / migration:**

Theme tokens for shadows. Replace with Tailwind shadow utilities (`shadow-sm`, `shadow-md`, etc.) or ShadCN CSS variables.

**Notes:**

- No Elevations in ShadCN; use Tailwind or design tokens.

---

## ActionList (MUI-lab)

**MUI:**

```tsx
import { ActionList } from "@mui/lab";

<ActionList ... />
```

**ShadCN / migration:**

List of actions. Migrate case-by-case with `DropdownMenu` or custom list patterns.

**Notes:**

- Often maps to a list of buttons or DropdownMenu items.
