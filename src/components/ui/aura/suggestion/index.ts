/**
 * Suggestion Component
 *
 * A dual-mode suggestion component for AI chat interfaces.
 * Use simple button mode for quick queries, or dropdown mode
 * for organised query options.
 *
 * @example
 * import { Suggestion, Suggestions } from '@/components/ui/aura/suggestion';
 *
 * <Suggestions>
 *   <Suggestion suggestion="Query 1" onClick={handleClick} />
 *   <Suggestion suggestion="Query 2" onClick={handleClick} />
 * </Suggestions>
 */
export {
  Suggestions,
  Suggestion,
  SuggestionTrigger,
  SuggestionValue,
  SuggestionContent,
  SuggestionItem,
  SuggestionGroup,
  SuggestionLabel,
  SuggestionSeparator,
} from './suggestion';
export type {
  SuggestionsProps,
  SuggestionProps,
  SuggestionTriggerProps,
  SuggestionValueProps,
  SuggestionContentProps,
  SuggestionItemProps,
  SuggestionGroupProps,
  SuggestionLabelProps,
  SuggestionSeparatorProps,
} from './suggestion';
export { SuggestionMetadata } from './suggestion.metadata';
