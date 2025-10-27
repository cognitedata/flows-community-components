---
component: Tooltip
description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
llm_usage: "When asked for a tooltip, use `<Tooltip>` to provide helpful information on hover or focus."
---

# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Import

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/cognite/tooltip"
```

## Usage

### Tooltip Demo

<!-- example:basic -->

Contextual help on hover (requires interactive implementation)

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | The controlled open state |
| `defaultOpen` | `boolean` | - | The default open state |
| `onOpenChange` | `function` | - | Event handler when open state changes |
| `delayDuration` | `number` | `700` | The duration from when the mouse enters the trigger until the tooltip gets opened |
