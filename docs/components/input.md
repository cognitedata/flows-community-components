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

```tsx
import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="text" placeholder="Enter your text" />
}
```

### Input with Label

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  )
}
```

### Input Types

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputTypes() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input type="text" id="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Password input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input type="number" id="number" placeholder="Number input" />
      </div>
    </div>
  )
}
```

### Disabled Input

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DisabledInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled">Disabled Input</Label>
      <Input type="text" id="disabled" placeholder="Disabled input" disabled />
    </div>
  )
}
```

### Input with Button

```tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Enter your email" />
      <Button type="submit">Subscribe</Button>
    </div>
  )
}
```

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
