import type { ReactNode } from 'react';

import type { ConfirmationState } from './confirmation';

export function getHelperTextToRender(
  state: ConfirmationState,
  helperText?: ReactNode
): ReactNode | null {
  return state === 'approval-requested' ? (helperText ?? null) : null;
}
