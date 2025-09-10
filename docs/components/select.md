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

### Basic Select

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The controlled value |
| `defaultValue` | `string` | - | The default value |
| `onValueChange` | `function` | - | Event handler when value changes |
| `disabled` | `boolean` | `false` | When true, prevents user interaction |
