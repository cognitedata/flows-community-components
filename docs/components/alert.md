---
component: Alert
description: "Displays a callout for user attention with different severity levels."
llm_usage: "When showing alerts or notifications, use `<Alert>` with `<AlertTitle>` and `<AlertDescription>` components."
---

# Alert

Displays a callout for user attention with different severity levels.

## Import

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/cognite/alert"
```

## Usage

### Basic Alert

<!-- example:basic -->

A simple alert with title and description

### Alert Variants

<!-- example:variants -->

Different alert styles for various contexts

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive"` | `"default"` | The visual style variant |
| `className` | `string` | - | Additional CSS classes |

### Variants

- **default**: Standard alert for general information
- **destructive**: Red alert for errors or critical warnings

