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
} from "@/components/ui/tooltip"
```

## Usage

### Basic Tooltip

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

### Tooltip with Custom Content

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function TooltipCustom() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for info</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-semibold">Custom Tooltip</p>
          <p className="text-sm">This tooltip contains more detailed information about the action.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | The controlled open state |
| `defaultOpen` | `boolean` | - | The default open state |
| `onOpenChange` | `function` | - | Event handler when open state changes |
| `delayDuration` | `number` | `700` | The duration from when the mouse enters the trigger until the tooltip gets opened |
