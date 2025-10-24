---
component: Accordion
description: "A collapsible content component that allows users to show and hide sections of related content."
llm_usage: "When asked for an accordion, use `<Accordion>` with `<AccordionItem>` components for collapsible sections."
---

# Accordion

A collapsible content component that allows users to show and hide sections of related content.

## Import

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
```

## Usage

### Basic Accordion

<!-- example:basic -->

A simple accordion with collapsible sections. Only one item can be open at a time.

### Multiple Items Open

<!-- example:multiple -->

Allow multiple accordion items to be open simultaneously by setting type to 

### Default Open Item

<!-- example:defaultValue -->

Set a default open item using the defaultValue prop.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | - | Determines whether one or multiple items can be open |
| `collapsible` | `boolean` | `false` | When type is "single", allows closing content when clicking trigger of open item |
| `defaultValue` | `string \| string[]` | - | The value of the item(s) to expand by default |
| `value` | `string \| string[]` | - | The controlled value of the item(s) to expand |
