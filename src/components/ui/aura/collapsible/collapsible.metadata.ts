import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Collapsible Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const CollapsibleMetadata: ComponentMeta = {
  name: 'Collapsible',
  description:
    'An interactive component that expands/collapses content, built on Radix Collapsible primitives.',
  llmUsage:
    'Use `<Collapsible>` with `<CollapsibleTrigger>` and `<CollapsibleContent>` for expandable sections.',
  importPath: '@/components/ui/aura/collapsible',
  docsStories: [
    {
      storyKey: 'Default',
      title: 'Default Collapsible',
      description: 'Basic collapsible with trigger and content.',
    },
    {
      storyKey: 'Controlled',
      title: 'Controlled Collapsible',
      description: 'Collapsible with external state control.',
    },
  ],
};
