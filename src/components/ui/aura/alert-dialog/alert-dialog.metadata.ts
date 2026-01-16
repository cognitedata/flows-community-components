import type { ComponentMeta } from '@/lib/component-examples';

export const AlertDialogMetadata: ComponentMeta = {
  name: 'AlertDialog',
  description: 'A modal dialog for critical confirmations powered by Radix Alert Dialog.',
  llmUsage: 'Use `<AlertDialog>` with trigger, content, and action components for confirmations.',
  importPath: '@/components/ui/aura/alert-dialog',
  docsStories: [
    { storyKey: 'Default', title: 'Default Alert Dialog', description: 'Confirmation dialog.' },
  ],
};
