/**
 * Alert Dialog Component
 *
 * A modal dialog for critical confirmations powered by Base UI Alert Dialog.
 *
 * @example
 * import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction } from '@/components/ui/aura/alert-dialog';
 *
 * <AlertDialog>
 *   <AlertDialogTrigger>Delete</AlertDialogTrigger>
 *   <AlertDialogContent>
 *     <AlertDialogTitle>Are you sure?</AlertDialogTitle>
 *     <AlertDialogAction>Confirm</AlertDialogAction>
 *   </AlertDialogContent>
 * </AlertDialog>
 */
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";
export { AlertDialogMetadata } from "./alert-dialog.metadata";
