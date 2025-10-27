---
component: Tabs
description: "A tabbed interface component for organizing content into multiple panels with accessible keyboard navigation."
llm_usage: "When creating tabbed interfaces, use `<Tabs defaultValue='tab1'>` with `<TabsList>`, `<TabsTrigger>`, and `<TabsContent>` components for proper accessibility and functionality."
---

# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time. Built with Radix UI for full accessibility support.

## Import

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/cognite/tabs"
```

## Usage

### Interactive Tabs

<!-- example:basic -->

Tabbed interface for organizing related content

## API Reference

### Tabs

The root container for the tabs component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | The default active tab |
| `value` | `string` | - | The controlled active tab |
| `onValueChange` | `(value: string) => void` | - | Callback when tab changes |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab orientation |
| `className` | `string` | - | Additional CSS classes |

### TabsList

Container for the tab triggers.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |

### TabsTrigger

Individual tab button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value that activates this tab |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `className` | `string` | - | Additional CSS classes |

### TabsContent

Content panel for each tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The value that shows this content |
| `className` | `string` | - | Additional CSS classes |

## Accessibility

- Full keyboard navigation support
- Screen reader compatible
- ARIA attributes included
- Focus management
- Supports both horizontal and vertical orientation
- Automatic activation or manual activation modes
