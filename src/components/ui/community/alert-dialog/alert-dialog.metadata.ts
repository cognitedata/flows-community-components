import type { ComponentMeta } from '../../../../lib/types';

export const AlertDialogMetadata: ComponentMeta = {
  name: 'AlertDialog',
  status: 'experimental',
  description:
    'Accessible alert dialog for confirming destructive or important actions.',
  llmUsage:
    'Use `<AlertDialog>` with trigger, content, title, description, and action/cancel buttons for confirmation dialogs.',
};
