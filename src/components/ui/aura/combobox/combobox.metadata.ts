import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Combobox Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ComboboxMetadata: ComponentMeta = {
  name: 'Combobox',
  description:
    'A searchable dropdown component combining input with a command menu, built with Radix Popover and cmdk.',
  llmUsage:
    'Use `<Combobox>` for simple framework selection or `<ComboboxCustom>` with custom options for more control.',
  importPath: '@/components/ui/aura/combobox',
  docsStories: [
    {
      storyKey: 'Default',
      title: 'Default Combobox',
      description: 'Basic combobox with searchable options.',
    },
    {
      storyKey: 'Custom',
      title: 'Custom Combobox',
      description: 'Combobox with custom options and styling.',
    },
  ],
};
