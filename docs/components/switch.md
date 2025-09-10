---
component: Switch
description: "A control that allows the user to toggle between checked and not checked."
llm_usage: "When asked for a switch or toggle, use `<Switch>` for on/off settings and preferences."
---

# Switch

A control that allows the user to toggle between checked and not checked.

## Import

```tsx
import { Switch } from "@/components/ui/switch"
```

## Usage

### Basic Switch

```tsx
import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return <Switch />
}
```

### Switch with Label

```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SwitchWithLabel() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}
```

### Disabled Switch

```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SwitchDisabled() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode-disabled" disabled />
      <Label htmlFor="airplane-mode-disabled">Airplane Mode</Label>
    </div>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | The controlled checked state |
| `defaultChecked` | `boolean` | - | The default checked state |
| `onCheckedChange` | `function` | - | Event handler when checked state changes |
| `disabled` | `boolean` | `false` | When true, prevents user interaction |
