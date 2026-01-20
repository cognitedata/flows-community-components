/**
 * Message Component
 *
 * Components for displaying AI chat messages with avatars and actions.
 *
 * @example
 * import { Message, MessageContent, MessageAvatar, MessageActions } from '@/components/ui/aura/message';
 */
export {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
  MessageResponse,
  MessageAttachment,
  MessageAttachments,
  MessageToolbar,
} from "./message";
export type {
  MessageProps,
  MessageContentProps,
  MessageAvatarProps,
  MessageAvatarIconProps,
  MessageActionsProps,
  MessageActionProps,
  MessageBranchProps,
  MessageBranchContentProps,
  MessageBranchSelectorProps,
  MessageBranchPreviousProps,
  MessageBranchNextProps,
  MessageBranchPageProps,
  MessageResponseProps,
  MessageAttachmentProps,
  MessageAttachmentsProps,
  MessageToolbarProps,
} from "./message";
export { MessageMetadata } from "./message.metadata";
