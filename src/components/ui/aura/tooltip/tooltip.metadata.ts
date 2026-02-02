import type { ComponentMeta } from "#aura/lib/component-examples";

/**
 * Tooltip Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const TooltipMetadata: ComponentMeta = {
  name: "Tooltip",
  status: "draft",
  description:
    "A popup that displays information related to an element when the element receives keyboard focus or mouse hover, built on Radix Tooltip primitives.",
  llmUsage:
    "Use `<Tooltip>` with `<TooltipTrigger>` and `<TooltipContent>` for contextual help text.",
  importPath: "@/components/ui/aura/tooltip",
};
