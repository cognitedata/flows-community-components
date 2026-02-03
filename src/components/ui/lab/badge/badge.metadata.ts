import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Badge Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const BadgeMetadata: ComponentMeta = {
  name: "Badge",
  status: "draft",
  description:
    "A small status indicator component with multiple variants for displaying labels, counts, and statuses.",
  llmUsage:
    "When showing status or labels, use `<Badge variant='default'>Status</Badge>` instead of custom spans. Use variants like 'secondary', 'destructive', or 'outline' for different meanings.",
  importPath: "@cognite/aura-lab/badge",
};
