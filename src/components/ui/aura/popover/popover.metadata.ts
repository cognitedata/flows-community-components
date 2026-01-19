import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Popover Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const PopoverMetadata: ComponentMeta = {
  name: "Popover",
  status: "draft",
  description:
    "A floating panel that displays content relative to a trigger, built on Radix Popover primitives.",
  llmUsage:
    "Use `<Popover>` with `<PopoverTrigger>` and `<PopoverContent>` for contextual floating content.",
  importPath: "@/components/ui/aura/popover",
};
