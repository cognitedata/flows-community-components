---
component: Label
description: "Renders an accessible label associated with controls."
llm_usage: "When asked for a label, use `<Label>` to properly associate text with form controls."
---

# Label

Renders an accessible label associated with controls.

## Import

```tsx
import { Label } from "@/components/ui/label"
```

## Usage

### Basic Label

```tsx
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return <Label htmlFor="email">Your email address</Label>
}
```

### Label with Input

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelWithInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
}
```

### Label with Helper Text

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function LabelWithHelperText() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">Email</Label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    </div>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | - | The id of the form control the label is associated with |
| `className` | `string` | - | Additional CSS classes to apply |
