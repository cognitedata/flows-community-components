import type { ComponentMeta } from "@cognite/aura/lib/component-examples";

/**
 * Dropdown Menu Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const DropdownMenuMetadata: ComponentMeta = {
  name: "DropdownMenu",
  status: "draft",
  description:
    "A dropdown menu with submenus, separators, and selection states, built on Radix Dropdown Menu primitives.",
  llmUsage:
    "Use `<DropdownMenu>` with `<DropdownMenuTrigger>`, `<DropdownMenuContent>`, and `<DropdownMenuItem>` for context actions.",
  importPath: "@cognite/aura-lab/dropdown-menu",
};
