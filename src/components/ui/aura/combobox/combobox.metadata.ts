import type { ComponentMeta } from '../../../../lib/types';

/**
 * Combobox Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ComboboxMetadata: ComponentMeta = {
  name: 'Combobox',
  status: 'in-progress-code-review',
  description:
    'A searchable dropdown component combining input with a command menu, built with Base UI Popover and cmdk.',
  llmUsage:
    'Use `<Combobox>` for simple framework selection or `<ComboboxCustom>` with custom options for more control.',
};
