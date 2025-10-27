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
} from "@/components/ui/cognite/card"
```

## Usage

### Basic Card

<!-- example:basic -->

A simple card with header and content

### Card with Footer

<!-- example:withFooter -->

Card with action buttons in the footer

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

- Cards have a rounded border
- Consistent padding and spacing between sections
- Responsive design that works on all screen sizes
- Supports both light and dark themes
