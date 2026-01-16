import type { ComponentMeta } from '@/lib/component-examples';

export const ContextMenuMetadata: ComponentMeta = {
  name: 'ContextMenu',
  description: 'A right-click context menu built on Radix Context Menu primitives.',
  llmUsage: 'Use `<ContextMenu>` with trigger, content, and item components for right-click menus.',
  importPath: '@/components/ui/aura/context-menu',
  docsStories: [
    { storyKey: 'Default', title: 'Default Context Menu', description: 'Basic context menu.' },
  ],
};
