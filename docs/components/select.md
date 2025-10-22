---
component: Select
description: "Displays a list of options for the user to pick from—triggered by a button."
llm_usage: "When asked for a select dropdown, use `<Select>` for choosing from multiple options."
---

# Select

Displays a list of options for the user to pick from—triggered by a button.

## Import

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

## Usage

### Select Dropdown

<!-- example:basic -->

A dropdown select component for choosing from options

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The controlled value |
| `defaultValue` | `string` | - | The default value |
| `onValueChange` | `function` | - | Event handler when value changes |
| `disabled` | `boolean` | `false` | When true, prevents user interaction |
