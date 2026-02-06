import type { ComponentMeta } from "@/lib/component-examples";

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
    "A dropdown menu with submenus, separators, and selection states, built on Base UI Dropdown Menu primitives.",
  llmUsage:
    "Use `<DropdownMenu>` with `<DropdownMenuTrigger>`, `<DropdownMenuContent>`, and `<DropdownMenuItem>` for context actions.",
};
