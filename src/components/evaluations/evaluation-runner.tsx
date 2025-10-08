"use client";

import { useChat } from "@ai-sdk/react";
import { Message } from "../ai-elements/message";
import { MessageContent } from "../ai-elements/message";
import { Button } from "../ui/cognite/button";
import { shiftApp } from "@/lib/evaluations/shift-app";
import { CopyIcon, Loader, Loader2, RefreshCcwIcon } from "lucide-react";
import { DefaultChatTransport } from "ai";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "../ai-elements/conversation";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "../ai-elements/reasoning";
import { Action, Actions } from "../ai-elements/actions";
import { Fragment } from "react";
import { Response } from "../ai-elements/response";
import { EvaluationUIMessage } from "@/app/api/evaluate/route";

export default function EvaluationRunner() {
  const { messages, sendMessage, status, regenerate } =
    useChat<EvaluationUIMessage>({
      transport: new DefaultChatTransport({
        api: "/api/evaluate",
      }),
    });

  const handleRunEvaluation = () => {
    sendMessage({
      text: "Create this layout",
    });
  };

  return (
    <div className="flex flex-col gap-4 size-full">
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleRunEvaluation}
          disabled={status === "streaming" || status === "submitted"}
        >
          {status === "streaming" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Run Evaluation"
          )}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 size-full">
        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-4 size-full">
          <h2 className="text-lg font-medium">Reference</h2>
          <pre className="px-3 overflow-auto whitespace-pre-wrap text-sm">
            <code>{shiftApp}</code>
          </pre>
        </div>

        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg p-4 size-full">
          {messages.length === 0 && (
            <p className="text-sm text-gray-500">No output yet</p>
          )}
          <Conversation className="h-full">
            <ConversationContent>
              {messages.map((message) => (
                <div key={message.id}>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageContent>
                                <Response>{part.text}</Response>
                              </MessageContent>
                            </Message>
                            {message.role === "assistant" &&
                              i === messages.length - 1 && (
                                <Actions className="mt-2">
                                  <Action
                                    onClick={() => regenerate()}
                                    label="Retry"
                                  >
                                    <RefreshCcwIcon className="size-3" />
                                  </Action>
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                          </Fragment>
                        );
                      case "reasoning":
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={
                              status === "streaming" &&
                              i === message.parts.length - 1 &&
                              message.id === messages.at(-1)?.id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      case "data-status":
                        return (
                          <div key={`${message.id}-${i}`}>
                            <p>{part.data.message}</p>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
              {status === "submitted" && <Loader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </div>
      </div>
    </div>
  );
}
