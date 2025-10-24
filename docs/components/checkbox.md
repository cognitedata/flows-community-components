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

### Checkbox Examples

<!-- example:basic -->

Checkboxes in different states with labels

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean \| "indeterminate"` | - | The controlled checked state |
| `defaultChecked` | `boolean` | - | The default checked state |
| `onCheckedChange` | `function` | - | Event handler called when checked state changes |
| `disabled` | `boolean` | `false` | When true, prevents the user from interacting |
