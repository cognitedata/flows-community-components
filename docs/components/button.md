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

### Default Button

```tsx
import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return <Button>Click me</Button>
}
```

### Button Variants

```tsx
import { Button } from "@/components/ui/button"

export function ButtonVariants() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Button Sizes

```tsx
import { Button } from "@/components/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
```

### Button with Icon

```tsx
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function ButtonWithIcon() {
  return (
    <div className="flex gap-2">
      <Button>
        <ChevronRight />
        Next
      </Button>
      <Button size="icon">
        <ChevronRight />
      </Button>
    </div>
  )
}
```

### As Child (Polymorphic)

```tsx
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/about">Go to About</Link>
    </Button>
  )
}
```

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
