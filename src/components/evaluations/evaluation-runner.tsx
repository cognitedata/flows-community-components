"use client";

import { useChat } from "@ai-sdk/react";
import { Message } from "../ai-elements/message";
import { MessageContent } from "../ai-elements/message";
import { Button } from "../ui/cognite/button";
import { shiftApp } from "@/lib/evaluations/shift-app";
import {
  CopyIcon,
  Loader,
  Loader2,
  Maximize2,
  RefreshCcwIcon,
  X,
} from "lucide-react";
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
import { Fragment, useEffect, useState } from "react";
import { Response } from "../ai-elements/response";
import { EvaluationUIMessage } from "@/app/api/evaluate/route";
import Image from "next/image";

export default function EvaluationRunner() {
  const [isReferenceLightboxOpen, setIsReferenceLightboxOpen] = useState(false);
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

  useEffect(() => {
    if (!isReferenceLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsReferenceLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isReferenceLightboxOpen]);

  return (
    <>
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
          <div className="relative flex flex-col gap-2 border border-gray-200 rounded-lg p-4 size-full">
            <h2 className="text-lg font-medium">Reference</h2>
            <div className="absolute top-10 right-10">
              <button
                type="button"
                className="relative cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded-lg"
                aria-label="Expand reference image"
                onClick={() => setIsReferenceLightboxOpen(true)}
              >
                <Image
                  src="/evaluations/benchmark-1.png"
                  alt="Reference"
                  width={200}
                  height={200}
                  className="rounded-lg border border-gray-200 shadow-sm"
                />
                <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-black/70 text-white p-1 shadow-lg">
                  <Maximize2 className="size-4" />
                </span>
              </button>
            </div>
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
                        case "data-generated-code":
                          return (
                            <div key={`${message.id}-${i}`}>
                              <p>{part.data.code}</p>
                              <pre className="px-3 overflow-auto whitespace-pre-wrap text-sm">
                                <code>{part.data.code}</code>
                              </pre>
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

      {isReferenceLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded reference image"
          onClick={() => setIsReferenceLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl h-[min(90vh,800px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute -top-3 -right-3 flex size-10 items-center justify-center rounded-full bg-black/80 text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              aria-label="Close expanded reference image"
              onClick={() => setIsReferenceLightboxOpen(false)}
            >
              <X className="size-5" />
            </button>
            <Image
              src="/evaluations/benchmark-1.png"
              alt="Expanded reference"
              fill
              sizes="(max-width: 1024px) 90vw, 1024px"
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
