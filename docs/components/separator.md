---
component: Separator
description: "Visually or semantically separates content."
llm_usage: "When asked for a separator, use `<Separator>` to divide content sections or create visual breaks."
---

# Separator

Visually or semantically separates content.

## Import

```tsx
import { Separator } from "@/components/ui/separator"
```

## Usage

### Basic Separator

```tsx
import { Separator } from "@/components/ui/separator"

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The orientation of the separator |
| `decorative` | `boolean` | `true` | Whether the separator is decorative |
| `className` | `string` | - | Additional CSS classes |
