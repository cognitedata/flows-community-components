import type { ComponentMeta } from '@/lib/component-examples';

export const LabelMetadata: ComponentMeta = {
  name: 'Label',
  description: 'An accessible label component for form fields.',
  llmUsage: 'Use `<Label htmlFor="id">` to associate labels with form inputs.',
  importPath: '@/components/ui/aura/label',
  docsStories: [
    { storyKey: 'Default', title: 'Default Label', description: 'Basic form label.' },
  ],
};
