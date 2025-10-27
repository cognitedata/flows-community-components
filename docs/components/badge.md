---
component: Badge
description: "A small status indicator component with multiple variants for displaying labels, counts, and statuses."
llm_usage: "When showing status or labels, use `<Badge variant='default'>Status</Badge>` instead of custom spans. Use variants like 'secondary', 'destructive', or 'outline' for different meanings."
---

# Badge

A versatile badge component for displaying status indicators, labels, counts, and other small pieces of information.

## Import

```tsx
import { Badge } from "@/components/ui/cognite/badge"
```

## Usage

### Badge Variants

<!-- example:variants -->

Different badge styles for various semantic meanings

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline"` | `"default"` | The visual style variant |
| `className` | `string` | - | Additional CSS classes |

### Variants

- **default**: Primary badge with filled background
- **secondary**: Muted badge for secondary information
- **destructive**: Red badge for errors or important warnings
- **outline**: Badge with border and transparent background

## Examples

### Custom Colors

```tsx
import { Badge } from "@/components/ui/cognite/badge"

export function CustomColorBadges() {
  return (
    <div className="flex gap-2">
      <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
      <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">Warning</Badge>
      <Badge className="bg-purple-500 hover:bg-purple-600">Custom</Badge>
    </div>
  )
}
```

### Interactive Badges

```tsx
import { Badge } from "@/components/ui/cognite/badge"
import { X } from "lucide-react"

export function InteractiveBadges() {
  return (
    <div className="flex gap-2">
      <Badge className="cursor-pointer hover:bg-primary/80">
        Clickable
      </Badge>
      <Badge className="cursor-pointer hover:bg-destructive/80 gap-1">
        Removable
        <X className="h-3 w-3" />
      </Badge>
    </div>
  )
}
```
