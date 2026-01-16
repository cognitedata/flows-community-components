import type { ComponentMeta } from '@/lib/component-examples';

export const TabsMetadata: ComponentMeta = {
  name: 'Tabs',
  description: 'A tabs component built on Radix Tabs for organizing content.',
  llmUsage: 'Use `<Tabs>` with `<TabsList>`, `<TabsTrigger>`, and `<TabsContent>` for tabbed content.',
  importPath: '@/components/ui/aura/tabs',
  docsStories: [
    { storyKey: 'Default', title: 'Default Tabs', description: 'Basic tabs component.' },
  ],
};
