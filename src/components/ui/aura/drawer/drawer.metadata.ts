import type { ComponentMeta } from '@/lib/component-examples';

export const DrawerMetadata: ComponentMeta = {
  name: 'Drawer',
  description: 'A sliding drawer component built with Vaul for mobile-friendly modals.',
  llmUsage: 'Use `<Drawer>` with trigger and content components for slide-out panels.',
  importPath: '@/components/ui/aura/drawer',
  docsStories: [
    { storyKey: 'Default', title: 'Default Drawer', description: 'Basic drawer component.' },
  ],
};
