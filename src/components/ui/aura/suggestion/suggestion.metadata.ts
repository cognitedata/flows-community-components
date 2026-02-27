import type { ComponentMeta } from '../../../../lib/types';

export const SuggestionMetadata: ComponentMeta = {
  name: 'Suggestion',
  status: 'in-progress-code-review',
  description:
    'A dual-mode suggestion component for AI chat interfaces. Use simple button mode for quick queries, or dropdown mode for organized query options.',
  llmUsage:
    'Use `<Suggestion suggestion="text" onClick={fn}>` for button mode, or `<Suggestion onValueChange={fn}>` with `<SuggestionTrigger>` and `<SuggestionContent>` for dropdown mode.',
};
