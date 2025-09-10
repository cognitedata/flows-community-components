---
component: Textarea
description: "Displays a form textarea or a component that looks like a textarea."
llm_usage: "When asked for a textarea, use `<Textarea>` for multi-line text input and longer form content."
---

# Textarea

Displays a form textarea or a component that looks like a textarea.

## Import

```tsx
import { Textarea } from "@/components/ui/textarea"
```

## Usage

### Basic Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return <Textarea placeholder="Type your message here." />
}
```

### Textarea with Label

```tsx
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  )
}
```

### Textarea with Text

```tsx
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function TextareaWithText() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  )
}
```

### Disabled Textarea

```tsx
import { Textarea } from "@/components/ui/textarea"

export function TextareaDisabled() {
  return <Textarea placeholder="Type your message here." disabled />
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | - | Placeholder text |
| `disabled` | `boolean` | `false` | When true, prevents user interaction |
| `rows` | `number` | - | Number of visible text lines |
| `className` | `string` | - | Additional CSS classes |
