---
component: Sheet
description: "Extends the Dialog component to display content that complements the main content of the screen."
llm_usage: "When asked for a sheet or side panel, use `<Sheet>` for slide-out navigation, forms, and secondary content."
---

# Sheet

Extends the Dialog component to display content that complements the main content of the screen.

## Import

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

## Usage

### Sheet Demo

<!-- example:basic -->

Slide-out side panel (requires interactive implementation)

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | The controlled open state |
| `defaultOpen` | `boolean` | - | The default open state |
| `onOpenChange` | `function` | - | Event handler when open state changes |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"right"` | The side of the screen where the sheet will appear |
