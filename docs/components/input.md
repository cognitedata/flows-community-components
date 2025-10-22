---
component: Input
description: "A styled input field component with built-in validation states and accessibility features."
llm_usage: "When creating form inputs, use `<Input type='text' placeholder='Enter text' />` instead of `<input>`. Pair with `<Label>` for accessibility."
---

# Input

A styled input component that extends the native HTML input element with consistent styling and validation states.

## Import

```tsx
import { Input } from "@/components/ui/input"
```

## Usage

### Basic Input

<!-- example:basic -->

A simple text input field

### Input with Label

<!-- example:withLabel -->

Input field with an associated label

### Disabled Input

<!-- example:disabled -->

Input in a disabled state

## API Reference

### Props

The Input component accepts all standard HTML input props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | The input type (text, email, password, etc.) |
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `className` | `string` | - | Additional CSS classes |

### HTML Input Props

All standard HTML input attributes are supported:
- `value` / `defaultValue`
- `onChange`
- `onFocus` / `onBlur`
- `required`
- `pattern`
- `min` / `max` (for number inputs)
- `step` (for number inputs)
- `autoComplete`
- `autoFocus`

## Accessibility

- Supports all ARIA attributes
- Works with screen readers
- Keyboard navigation support
- Focus-visible indicators
- Proper contrast ratios
- Works with form validation

## Examples

### Controlled Input

```tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ControlledInput() {
  const [value, setValue] = useState("")

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="controlled">Controlled Input</Label>
      <Input
        type="text"
        id="controlled"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <p className="text-sm text-muted-foreground">Value: {value}</p>
    </div>
  )
}
```

### Form Integration

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function FormExample() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" required />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" required />
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}
```
