---
component: Avatar
description: "An image element with a fallback for representing the user."
llm_usage: "When displaying user avatars, use `<Avatar>` with `<AvatarImage>` and `<AvatarFallback>` for graceful degradation."
---

# Avatar

An image element with a fallback for representing the user.

## Import

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/cognite/avatar"
```

## Usage

### Basic Avatar

<!-- example:basic -->

Display user avatars with image and fallback

### Avatar Sizes

<!-- example:sizes -->

Different avatar sizes using custom classes

## API Reference

### Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### AvatarImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | The image source URL |
| `alt` | `string` | - | Alternative text for the image |

### AvatarFallback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Fallback content (typically initials) |

