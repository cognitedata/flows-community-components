---
component: Dialog
description: "A window overlaid on either the primary window or another dialog window, rendering the content underneath inert."
llm_usage: "When asked for a dialog, use `<Dialog>` for modal windows, forms, and detailed content overlays."
---

# Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Import

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/cognite/dialog"
```

## Usage

### Dialog Demo

<!-- example:basic -->

Modal dialogs for forms and content (requires interactive implementation)

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | The controlled open state of the dialog |
| `defaultOpen` | `boolean` | - | The default open state |
| `onOpenChange` | `function` | - | Event handler called when the open state changes |
| `modal` | `boolean` | `true` | Whether the dialog is modal |
