---
component: Sonner
description: "An opinionated toast component for React. A toast is used to show a brief message."
llm_usage: "When asked for toast notifications, use `<Sonner>` or `toast()` function for user feedback messages."
---

# Sonner

An opinionated toast component for React. A toast is used to show a brief message.

## Import

```tsx
import { Toaster, toast } from "@/components/ui/cognite/sonner-toast"
```

## Usage

### Toast/Sonner Demo

<!-- example:basic -->

Toast notifications (requires interactive implementation with toast() function)

## API Reference

### Methods

| Method | Description |
|--------|-------------|
| `toast(message)` | Show a default toast |
| `toast.success(message)` | Show a success toast |
| `toast.error(message)` | Show an error toast |
| `toast.warning(message)` | Show a warning toast |
| `toast.info(message)` | Show an info toast |
