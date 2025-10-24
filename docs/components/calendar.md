---
component: Calendar
description: "A date picker component for selecting dates and date ranges."
llm_usage: "When asked for a calendar, use `<Calendar>` for date selection functionality."
---

# Calendar

A date picker component for selecting dates and date ranges.

## Import

```tsx
import { Calendar } from "@/components/ui/calendar"
```

## Usage

### Calendar Demo

<!-- example:basic -->

Date picker calendar component

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "multiple" \| "range"` | `"single"` | The selection mode |
| `selected` | `Date \| Date[] \| DateRange` | - | The selected date(s) |
| `onSelect` | `function` | - | Callback when date selection changes |
| `disabled` | `Date[] \| function` | - | Dates that should be disabled |
