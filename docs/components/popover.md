---
component: Popover
description: "Displays rich content in a portal, triggered by a button."
llm_usage: "When asked for a popover, use `<Popover>` for contextual information and secondary actions."
---

# Popover

Displays rich content in a portal, triggered by a button.

## Import

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
```

## Usage

### Popover Demo

<!-- example:basic -->

Floating content container (requires interactive implementation)

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | The controlled open state |
| `defaultOpen` | `boolean` | - | The default open state |
| `onOpenChange` | `function` | - | Event handler called when open state changes |
