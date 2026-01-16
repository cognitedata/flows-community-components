import type { ComponentMeta } from '@/lib/component-examples';

export const SwitchMetadata: ComponentMeta = {
  name: 'Switch',
  description: 'A toggle switch component built on Radix Switch.',
  llmUsage: 'Use `<Switch checked={checked} onCheckedChange={setChecked}>` for boolean toggles.',
  importPath: '@/components/ui/aura/switch',
  docsStories: [
    { storyKey: 'Default', title: 'Default Switch', description: 'Basic toggle switch.' },
  ],
};
