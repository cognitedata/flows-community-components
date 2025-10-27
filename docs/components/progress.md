---
component: Progress
description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
llm_usage: "When asked for a progress bar, use `<Progress>` to show task completion or loading states."
---

# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## Import

```tsx
import { Progress } from "@/components/ui/cognite/progress"
```

## Usage

### Progress Examples

<!-- example:basic -->

Progress bars showing different completion states

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | The progress value |
| `max` | `number` | `100` | The maximum progress value |
| `className` | `string` | - | Additional CSS classes |
