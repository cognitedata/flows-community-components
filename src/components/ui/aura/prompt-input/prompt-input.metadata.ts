import type { ComponentMeta } from '@/lib/component-examples';

/**
 * PromptInput Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const PromptInputMetadata: ComponentMeta = {
  name: 'PromptInput',
  description:
    'A comprehensive AI chat input component with support for attachments, model selection, speech input, command palettes, and rich formatting.',
  llmUsage:
    'Use `<PromptInputProvider>` to wrap the input, then compose with `<PromptInput>`, `<PromptInputTextarea>`, `<PromptInputSubmit>`, and other sub-components.',
  importPath: '@/components/ui/aura/prompt-input',
  docsStories: [
    {
      storyKey: 'Default',
      title: 'Default PromptInput',
      description: 'Basic prompt input with textarea and submit.',
    },
    {
      storyKey: 'WithAttachments',
      title: 'With Attachments',
      description: 'Prompt input with file attachment support.',
    },
    {
      storyKey: 'WithModelSelect',
      title: 'With Model Select',
      description: 'Prompt input with AI model selection.',
    },
    {
      storyKey: 'FullFeatured',
      title: 'Full Featured',
      description: 'Complete prompt input with all features.',
    },
  ],
};
