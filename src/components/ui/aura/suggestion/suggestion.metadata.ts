import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Suggestion Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const SuggestionMetadata: ComponentMeta = {
  name: "Suggestion",
  status: "in-progress-code-review",
  description:
    "A dual-mode suggestion component for AI chat interfaces. Use simple button mode for quick queries, or dropdown mode for organised query options.",
  llmUsage:
    'Use `<Suggestion suggestion="text" onClick={fn}>` for button mode, or `<Suggestion onValueChange={fn}>` with `<SuggestionTrigger>` and `<SuggestionContent>` for dropdown mode.',
};
