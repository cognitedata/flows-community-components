export type ChatStatus = "submitted" | "streaming" | "ready" | "error";

export type FileUIPart = {
  type: "file";
  /**
   * IANA media type of the file.
   */
  mediaType: string;
  /**
   * Optional filename of the file.
   */
  filename?: string;
  /**
   * The URL of the file.
   * It can either be a URL to a hosted file or a Data URL.
   */
  url: string;
};

/**
 * Simplified ToolUIPart type for basic tool rendering.
 * Full type in AI SDK is more complex with generics and state management.
 */
export type ToolUIPart = {
  type: string;
  toolCallId?: string;
  toolName?: string;
  input?: unknown;
  output?: unknown;
  errorText?: string;
  state?: "input-streaming" | "input-available" | "output-available" | "output-error";
};

export interface UIMessage<METADATA = unknown> {
  /**
   * A unique identifier for the message.
   */
  id: string;
  /**
   * The role of the message.
   */
  role: "system" | "user" | "assistant";
  /**
   * The metadata of the message.
   */
  metadata?: METADATA;
  /**
   * The parts of the message. Use this for rendering the message in the UI.
   */
  parts: Array<unknown>;
}
