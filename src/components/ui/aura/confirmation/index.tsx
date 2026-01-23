/**
 * Confirmation Component
 *
 * A confirmation dialog component for AI approval workflows,
 * with support for request, accepted, and rejected states.
 *
 * @example
 * import { Confirmation, ConfirmationRequest, ConfirmationActions } from '@/components/ui/aura/confirmation';
 *
 * <Confirmation state="awaiting-approval" approval={{ approved: undefined }}>
 *   <ConfirmationRequest>Approve this action?</ConfirmationRequest>
 *   <ConfirmationActions>...</ConfirmationActions>
 * </Confirmation>
 */
export {
  Confirmation,
  ConfirmationContent,
  ConfirmationContentTrigger,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "./confirmation";
export type {
  ConfirmationProps,
  ConfirmationContentTriggerProps,
  ConfirmationContentProps,
  ConfirmationRequestProps,
  ConfirmationAcceptedProps,
  ConfirmationRejectedProps,
  ConfirmationActionsProps,
  ConfirmationActionProps,
} from "./confirmation";
export { ConfirmationMetadata } from "./confirmation.metadata";
