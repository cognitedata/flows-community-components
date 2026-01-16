import type { ComponentMeta } from '@/lib/component-examples';

export const ProgressMetadata: ComponentMeta = {
  name: 'Progress',
  description: 'A progress bar component for showing completion status.',
  llmUsage: 'Use `<Progress value={66}>` to show progress percentage.',
  importPath: '@/components/ui/aura/progress',
  docsStories: [
    { storyKey: 'Default', title: 'Default Progress', description: 'Basic progress bar.' },
  ],
};
