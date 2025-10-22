---
component: Button
description: "A versatile button component with multiple variants and sizes, built with Radix UI Slot and class-variance-authority."
llm_usage: "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'."
---

# Button

A versatile button component that supports multiple variants, sizes, and can render as any element using the asChild prop.

## Import

```tsx
import { Button } from "@/components/ui/button"
```

## Usage

### Button Variants

<!-- example:variants -->

Different visual styles for various use cases

### Button Sizes

<!-- example:sizes -->

Available size options including an icon-only variant

### Button States

<!-- example:states -->

Disabled and loading states

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | The visual style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | The size of the button |
| `asChild` | `boolean` | `false` | Render as a child element instead of button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | - | Additional CSS classes |

### Variants

- **default**: Primary button with filled background
- **destructive**: Red button for dangerous actions
- **outline**: Button with border and transparent background
- **secondary**: Muted button for secondary actions
- **ghost**: Transparent button that shows background on hover
- **link**: Text button that looks like a link

### Sizes

- **sm**: Small button (32px height)
- **default**: Standard button (36px height)
- **lg**: Large button (40px height)
- **icon**: Square button for icons only (36px × 36px)

## Accessibility

- Uses semantic `button` element by default
- Supports keyboard navigation
- Includes focus-visible styles
- Properly handles disabled states
- ARIA attributes are preserved when using `asChild`

## Examples

### Loading Button

```tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}
```

### Button Group

```tsx
import { Button } from "@/components/ui/button"

export function ButtonGroup() {
  return (
    <div className="flex rounded-md shadow-sm">
      <Button variant="outline" className="rounded-r-none">
        Left
      </Button>
      <Button variant="outline" className="rounded-none border-l-0">
        Middle
      </Button>
      <Button variant="outline" className="rounded-l-none border-l-0">
        Right
      </Button>
    </div>
  )
}
```
