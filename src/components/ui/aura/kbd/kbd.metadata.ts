import type { ComponentMeta } from '@/lib/component-examples';

export const KbdMetadata: ComponentMeta = {
  name: 'Kbd',
  description: 'A keyboard key component for displaying keyboard shortcuts.',
  llmUsage: 'Use `<Kbd>` to display keyboard keys and `<KbdGroup>` for combinations.',
  importPath: '@/components/ui/aura/kbd',
  docsStories: [
    { storyKey: 'Default', title: 'Default Kbd', description: 'Keyboard key display.' },
  ],
};
