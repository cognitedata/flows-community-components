/**
 * PromptInput Component
 *
 * A comprehensive AI chat input component with support for attachments,
 * model selection, speech input, command palettes, and rich formatting.
 *
 * @example
 * import { PromptInput, PromptInputProvider, PromptInputTextarea, PromptInputSubmit } from '@/components/ui/aura/prompt-input';
 *
 * <PromptInputProvider>
 *   <PromptInput>
 *     <PromptInputTextarea placeholder="Type a message..." />
 *     <PromptInputSubmit />
 *   </PromptInput>
 * </PromptInputProvider>
 */

// Core components
export {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputHeader,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  PromptInputSpeechButton,
} from "./prompt-input";

// Attachment components
export {
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputActionAddAttachments,
  usePromptInputAttachments,
  useProviderAttachments,
} from "./prompt-input";

// Action menu components
export {
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
} from "./prompt-input";

// Model select components
export {
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue,
} from "./prompt-input";

// Hover card components
export {
  PromptInputHoverCard,
  PromptInputHoverCardTrigger,
  PromptInputHoverCardContent,
} from "./prompt-input";

// Tab components
export {
  PromptInputTabsList,
  PromptInputTab,
  PromptInputTabLabel,
  PromptInputTabBody,
  PromptInputTabItem,
} from "./prompt-input";

// Command components
export {
  PromptInputCommand,
  PromptInputCommandInput,
  PromptInputCommandList,
  PromptInputCommandEmpty,
  PromptInputCommandGroup,
  PromptInputCommandItem,
  PromptInputCommandSeparator,
} from "./prompt-input";

// Hooks
export { usePromptInputController } from "./prompt-input";

// Types
export type {
  AttachmentsContext,
  TextInputContext,
  PromptInputControllerProps,
  PromptInputMessage,
} from "./prompt-input";

export { PromptInputMetadata } from "./prompt-input.metadata";
