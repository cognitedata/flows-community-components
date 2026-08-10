import type { ComponentMeta } from '../../../../lib/types';

export const ConfirmationMetadata: ComponentMeta = {
  name: 'Confirmation',
  status: 'experimental',
  description:
    'Collapsible confirmation UI for streaming and approval workflows.',
  llmUsage:
    'Use `<Confirmation>` with request, content, and accepted/rejected slots for approval workflows.',
};
