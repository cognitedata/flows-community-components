\"use client\";

import { useChat } from \"@ai-sdk/react\";
import {
  DefaultChatTransport,
  getToolOrDynamicToolName,
  isToolOrDynamicToolUIPart,
  type ToolUIPart,
} from \"ai\";
import { Fragment, useCallback, useMemo } from \"react\";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from \"@/components/ai-elements/conversation\";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
  type PromptInputMessage,
} from \"@/components/ai-elements/prompt-input\";
import { Message, MessageContent } from \"@/components/ai-elements/message\";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from \"@/components/ai-elements/reasoning\";
import { Response } from \"@/components/ai-elements/response\";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from \"@/components/ai-elements/tool\";
import { Loader } from \"@/components/ai-elements/loader\";

const suggestions = [
  \"What props does the Banner component offer?\",
  \"How should I choose between Modal and Drawer?\",
  \"Show me the StatusBadge variants.\",
] as const;

export default function HelpPage() {
  const { messages, sendMessage, status, stop, error, clearError } = useChat({
    transport: new DefaultChatTransport({
      api: \"/api/help\",
    }),
  });

  const isBusy = status === \"submitted\" || status === \"streaming\";
  const latestMessageId = messages.at(-1)?.id;
  const showLoader = status === \"submitted\";

  const handlePromptSubmit = useCallback(
    async ({ text = \"\", files }: PromptInputMessage) => {
      if (isBusy) {
        return;
      }

      const trimmed = text.trim();
      const hasFiles = !!files && files.length > 0;

      if (!trimmed && !hasFiles) {
        return;
      }

      if (error) {
        clearError();
      }

      await sendMessage({
        text: trimmed,
        files: hasFiles ? files : undefined,
      });
    },
    [clearError, error, isBusy, sendMessage]
  );

  const handlePromptSuggestion = useCallback(
    async (prompt: string) => {
      if (isBusy) {
        return;
      }

      if (error) {
        clearError();
      }

      await sendMessage({ text: prompt });
    },
    [clearError, error, isBusy, sendMessage]
  );

  const errorMessage = useMemo(() => error?.message, [error]);

  return (
    <div className=\"mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10\">
      <header className=\"space-y-3\">
        <div className=\"space-y-1\">
          <h1 className=\"text-3xl font-semibold tracking-tight\">
            Cognite help assistant
          </h1>
          <p className=\"text-muted-foreground\">
            Ask about components, props, patterns, and implementation guidance
            across the Cognite design system.
          </p>
        </div>

        <div className=\"flex flex-wrap gap-2 pt-1\">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type=\"button\"
              onClick={() => handlePromptSuggestion(suggestion)}
              disabled={isBusy}
              className=\"rounded-full border border-border/60 bg-transparent px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50\"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </header>

      <div className=\"flex min-h-[60vh] flex-col overflow-hidden rounded-xl border border-border/60 bg-background/80\">
        <Conversation className=\"flex h-full flex-col\">
          <ConversationContent className=\"flex flex-col gap-4\">
            {messages.length === 0 && (
              <ConversationEmptyState className=\"rounded-xl border border-dashed border-border/60 bg-muted/30 py-12\">
                <div className=\"space-y-4\">
                  <h3 className=\"text-lg font-medium\">
                    Need a hand with Cognite components?
                  </h3>
                  <p className=\"text-muted-foreground\">
                    Ask about component capabilities, best practices, or how to
                    integrate them in your product.
                  </p>
                </div>
              </ConversationEmptyState>
            )}

            {messages.map((message) => (
              <Fragment key={message.id}>
                {message.parts.map((part, index) => {
                  if (part.type === \"text\") {
                    return (
                      <Message from={message.role} key={`${message.id}-${index}`}>
                        <MessageContent>
                          <Response>{part.text}</Response>
                        </MessageContent>
                      </Message>
                    );
                  }

                  if (part.type === \"reasoning\") {
                    const isStreamingReasoning =
                      status === \"streaming\" &&
                      message.id === latestMessageId &&
                      index === message.parts.length - 1;

                    return (
                      <Reasoning
                        key={`${message.id}-${index}`}
                        isStreaming={isStreamingReasoning}
                        className=\"ml-auto max-w-2xl\"
                      >
                        <ReasoningTrigger />
                        <ReasoningContent>{part.text}</ReasoningContent>
                      </Reasoning>
                    );
                  }

                  if (isToolOrDynamicToolUIPart(part)) {
                    const toolName = getToolOrDynamicToolName(part);
                    const headerType =
                      part.type === \"dynamic-tool\"
                        ? (`tool-${toolName}` as ToolUIPart[\"type\"])
                        : part.type;

                    return (
                      <div
                        key={`${message.id}-${index}`}
                        className=\"ml-auto w-full max-w-2xl\"
                      >
                        <Tool defaultOpen={false}>
                          <ToolHeader
                            title={toolName}
                            type={headerType}
                            state={part.state}
                          />
                          <ToolContent>
                            {part.input ? (
                              <ToolInput input={part.input} />
                            ) : null}
                            <ToolOutput
                              output={
                                \"output\" in part
                                  ? (part.output as unknown)
                                  : undefined
                              }
                              errorText={
                                \"errorText\" in part
                                  ? part.errorText
                                  : undefined
                              }
                            />
                          </ToolContent>
                        </Tool>
                      </div>
                    );
                  }

                  return null;
                })}
              </Fragment>
            ))}

            {showLoader && (
              <Message from=\"assistant\">
                <MessageContent>
                  <Loader />
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      {errorMessage && (
        <div className=\"flex items-center justify-between gap-4 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm text-destructive\">
          <span>{errorMessage}</span>
          <button
            type=\"button\"
            onClick={() => clearError()}
            className=\"rounded-md border border-destructive/40 px-2 py-1 text-xs font-medium uppercase tracking-wide transition hover:border-destructive hover:bg-destructive/10\"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className=\"rounded-xl border border-border/60 bg-background/80 p-3 shadow-sm\">
        <PromptInput onSubmit={handlePromptSubmit} className=\"w-full\">
          <PromptInputBody>
            <PromptInputTextarea
              placeholder=\"Ask about components, usage, or design guidelines…\"
            />
          </PromptInputBody>
          <PromptInputToolbar className=\"justify-end\">
            <PromptInputTools>
              <PromptInputSubmit
                status={status}
                onClick={(event) => {
                  if (status === \"streaming\") {
                    event.preventDefault();
                    stop();
                  }
                }}
              />
            </PromptInputTools>
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
}
