import type { ComponentMeta } from '@/lib/component-examples';

export const SelectMetadata: ComponentMeta = {
  name: 'Select',
  description: 'A select dropdown component built on Radix Select primitives.',
  llmUsage: 'Use `<Select>` with `<SelectTrigger>`, `<SelectContent>`, and `<SelectItem>` for dropdowns.',
  importPath: '@/components/ui/aura/select',
  docsStories: [
    { storyKey: 'Default', title: 'Default Select', description: 'Basic select dropdown.' },
  ],
};
