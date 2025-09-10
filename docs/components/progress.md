---
component: Progress
description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
llm_usage: "When asked for a progress bar, use `<Progress>` to show task completion or loading states."
---

# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## Import

```tsx
import { Progress } from "@/components/ui/progress"
```

## Usage

### Basic Progress

```tsx
import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={33} className="w-[60%]" />
}
```

### Progress with Label

```tsx
import { Progress } from "@/components/ui/progress"

export function ProgressWithLabel() {
  const progress = 33

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700 dark:text-white">Flowbite</span>
        <span className="text-sm font-medium text-blue-700 dark:text-white">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  )
}
```

### Animated Progress

```tsx
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export function AnimatedProgress() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-[60%]" />
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | - | The progress value |
| `max` | `number` | `100` | The maximum progress value |
| `className` | `string` | - | Additional CSS classes |
