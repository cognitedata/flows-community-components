import type { ComponentMeta } from '../../../../lib/types';

export const PromptInputMetadata: ComponentMeta = {
  name: 'PromptInput',
  status: 'in-progress-code-review',
  description:
    'A comprehensive AI chat input component with support for attachments, model selection, speech input, command palettes, and rich formatting.',
  llmUsage:
    'Use `<PromptInputProvider>` to wrap the input, then compose with `<PromptInput>`, `<PromptInputTextarea>`, `<PromptInputSubmit>`, and other sub-components.',
};
