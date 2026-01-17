import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Confirmation Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ConfirmationMetadata: ComponentMeta = {
  name: 'Confirmation',
  description:
    'A confirmation dialog component for AI approval workflows, with support for request, accepted, and rejected states.',
  llmUsage:
    'Use `<Confirmation>` with `<ConfirmationRequest>`, `<ConfirmationAccepted>`, `<ConfirmationRejected>`, and `<ConfirmationActions>` for AI approval flows.',
  importPath: '@/components/ui/aura/confirmation',
};
