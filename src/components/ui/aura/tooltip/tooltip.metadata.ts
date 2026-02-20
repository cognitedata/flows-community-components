import type { ComponentMeta } from '../../../../lib/component-examples';

/**
 * Tooltip Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const TooltipMetadata: ComponentMeta = {
  name: 'Tooltip',
  status: 'in-progress-code-review',
  description:
    'A popup that displays information related to an element when the element receives keyboard focus or mouse hover, built on Base UI Tooltip primitives.',
  llmUsage:
    'Use `<TooltipProvider>` to configure shared behavior (for example delay), then compose `<Tooltip>`, `<TooltipTrigger>`, and `<TooltipContent>` for contextual help text.',
};
