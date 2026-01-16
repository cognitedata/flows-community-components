import type { ComponentMeta } from '@/lib/component-examples';

export const CheckboxMetadata: ComponentMeta = {
  name: 'Checkbox',
  description: 'A checkbox component styled with Radix Checkbox and Tabler icons.',
  llmUsage: 'Use `<Checkbox>` for boolean input with checked and onCheckedChange props.',
  importPath: '@/components/ui/aura/checkbox',
  docsStories: [
    { storyKey: 'Default', title: 'Default Checkbox', description: 'Basic checkbox.' },
  ],
};
