import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Dropdown Menu Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const DropdownMenuMetadata: ComponentMeta = {
  name: 'DropdownMenu',
  description:
    'A dropdown menu with submenus, separators, and selection states, built on Radix Dropdown Menu primitives.',
  llmUsage:
    'Use `<DropdownMenu>` with `<DropdownMenuTrigger>`, `<DropdownMenuContent>`, and `<DropdownMenuItem>` for context actions.',
  importPath: '@/components/ui/aura/dropdown-menu',
  docsStories: [
    {
      storyKey: 'Default',
      title: 'Default Dropdown',
      description: 'Basic dropdown menu with items.',
    },
    {
      storyKey: 'WithSubmenus',
      title: 'With Submenus',
      description: 'Dropdown with nested submenus.',
    },
    {
      storyKey: 'WithCheckboxes',
      title: 'With Checkboxes',
      description: 'Dropdown with checkbox items.',
    },
  ],
};
