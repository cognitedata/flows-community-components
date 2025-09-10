---
component: Sonner
description: "An opinionated toast component for React. A toast is used to show a brief message."
llm_usage: "When asked for toast notifications, use `<Sonner>` or `toast()` function for user feedback messages."
---

# Sonner

An opinionated toast component for React. A toast is used to show a brief message.

## Import

```tsx
import { toast } from "sonner"
```

## Usage

### Basic Toast

```tsx
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

### Different Toast Types

```tsx
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerTypes() {
  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={() => toast("Event has been created")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Event has been created")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Event has not been created")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Event has a warning")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("Event has info")}>
        Info
      </Button>
    </div>
  )
}
```

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| `toast(message)` | Show a default toast |
| `toast.success(message)` | Show a success toast |
| `toast.error(message)` | Show an error toast |
| `toast.warning(message)` | Show a warning toast |
| `toast.info(message)` | Show an info toast |
