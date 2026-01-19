import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Layout System Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const LayoutMetadata: ComponentMeta = {
  name: "Layout",
  status: "draft",
  description:
    "Layout and grid definitions for the Aura design system including breakpoints, grid configurations, and container query patterns.",
  llmUsage:
    "Use `getBreakpoint()` for breakpoint info, `gridPatterns` for common grid layouts, and `getResponsiveSpan()` for column spans.",
  importPath: "@/components/ui/aura/layout",
};
