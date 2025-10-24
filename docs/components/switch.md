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

### Switch Examples

<!-- example:basic -->

Toggle switches for on/off settings

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | The controlled checked state |
| `defaultChecked` | `boolean` | - | The default checked state |
| `onCheckedChange` | `function` | - | Event handler when checked state changes |
| `disabled` | `boolean` | `false` | When true, prevents user interaction |
