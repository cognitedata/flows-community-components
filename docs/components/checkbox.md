---
component: Checkbox
description: "A control that allows the user to toggle between checked and not checked."
llm_usage: "When asked for a checkbox, use `<Checkbox>` for binary selections and form controls."
---

# Checkbox

A control that allows the user to toggle between checked and not checked.

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

## Usage

### Basic Checkbox

```tsx
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}
```

### Checkbox with Text

```tsx
import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxWithText() {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
```

### Disabled Checkbox

```tsx
export function CheckboxDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms2" disabled />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| "indeterminate"` | - | The controlled checked state |
| `defaultChecked` | `boolean` | - | The default checked state |
| `onCheckedChange` | `function` | - | Event handler called when checked state changes |
| `disabled` | `boolean` | `false` | When true, prevents the user from interacting |
