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

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | - | Determines whether one or multiple items can be open |
| `collapsible` | `boolean` | `false` | When type is "single", allows closing content when clicking trigger of open item |
| `defaultValue` | `string \| string[]` | - | The value of the item(s) to expand by default |
| `value` | `string \| string[]` | - | The controlled value of the item(s) to expand |
