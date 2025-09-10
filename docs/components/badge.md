---
component: Badge
description: "A small status indicator component with multiple variants for displaying labels, counts, and statuses."
llm_usage: "When showing status or labels, use `<Badge variant='default'>Status</Badge>` instead of custom spans. Use variants like 'secondary', 'destructive', or 'outline' for different meanings."
---

# Badge

A versatile badge component for displaying status indicators, labels, counts, and other small pieces of information.

## Import

```tsx
import { Badge } from "@/components/ui/badge"
```

## Usage

### Default Badge

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return <Badge>Default</Badge>
}
```

### Badge Variants

```tsx
import { Badge } from "@/components/ui/badge"

export function BadgeVariants() {
  return (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
```

### Status Indicators

```tsx
import { Badge } from "@/components/ui/badge"

export function StatusBadges() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Server Status:</span>
        <Badge variant="default" className="bg-green-500">Online</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Build Status:</span>
        <Badge variant="destructive">Failed</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Deploy Status:</span>
        <Badge variant="secondary">Pending</Badge>
      </div>
    </div>
  )
}
```

### Count Badges

```tsx
import { Badge } from "@/components/ui/badge"

export function CountBadges() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="destructive">3</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge variant="default">12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Updates</span>
        <Badge variant="secondary">2</Badge>
      </div>
    </div>
  )
}
```

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
import { Badge } from "@/components/ui/badge"

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
import { Badge } from "@/components/ui/badge"
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
