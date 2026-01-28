import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Label Component Metadata
 *
 * Used by the documentation system to generate API reference and LLM context.
 */
export const LabelMetadata: ComponentMeta = {
  name: "Label",

  description:
    "An accessible text label for form controls, built on top of Radix UI Label. Supports association via `htmlFor` and integrates with disabled states.",

  llmUsage:
    'Use `<Label htmlFor="field-id">Text</Label>` together with an input that has `id="field-id"` so clicking the label focuses the field. For required fields, include a visual indicator such as the asterisk icon from `/asterisk.svg`.',

  importPath: "@/components/ui/aura/label",
};
