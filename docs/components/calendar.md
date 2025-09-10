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

### Basic Calendar

```tsx
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}
```

### Date Range Calendar

```tsx
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { DateRange } from "react-day-picker"

export function CalendarRange() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  })

  return (
    <Calendar
      mode="range"
      defaultMonth={date?.from}
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      className="rounded-md border"
    />
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "multiple" \| "range"` | `"single"` | The selection mode |
| `selected` | `Date \| Date[] \| DateRange` | - | The selected date(s) |
| `onSelect` | `function` | - | Callback when date selection changes |
| `disabled` | `Date[] \| function` | - | Dates that should be disabled |
