---
component: Card
description: "A flexible card component with header, content, and footer sections for organizing and displaying content."
llm_usage: "When creating content containers, use `<Card>` with `<CardHeader>`, `<CardContent>`, and `<CardFooter>` subcomponents. Use `<CardTitle>` and `<CardDescription>` for header content."
---

# Card

A flexible card component that provides a consistent container for organizing related content. Built with a composable API using multiple subcomponents.

## Import

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
```

## Usage

### Basic Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
    </Card>
  )
}
```

### Card with Footer

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CardWithFooter() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have 3 unread messages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Here&apos;s a list of your recent notifications.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </Card>
  )
}
```

### Card with Action

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export function CardWithAction() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Team Settings</CardTitle>
        <CardDescription>
          Manage your team preferences and settings.
        </CardDescription>
        <CardAction>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Team configuration options will be displayed here.</p>
      </CardContent>
    </Card>
  )
}
```

### Form Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FormCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          Make changes to your account here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Enter your email" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  )
}
```

### Card Grid

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item}>
          <CardHeader>
            <CardTitle>Card {item}</CardTitle>
            <CardDescription>
              This is a description for card {item}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card {item} goes here.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## API Reference

### Card

The root container component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardHeader

Container for the card title and description.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardTitle

The main title of the card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardDescription

Descriptive text below the title.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardAction

Action element positioned in the top-right corner of the header.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardContent

Main content area of the card.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### CardFooter

Footer area typically used for actions or additional information.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

## Layout Structure

Cards follow a consistent layout structure:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
    <CardAction>Action Button</CardAction>
  </CardHeader>
  <CardContent>
    Main content
  </CardContent>
  <CardFooter>
    Footer actions
  </CardFooter>
</Card>
```

## Styling

- Cards have a rounded border with subtle shadow
- Consistent padding and spacing between sections
- Responsive design that works on all screen sizes
- Supports both light and dark themes
