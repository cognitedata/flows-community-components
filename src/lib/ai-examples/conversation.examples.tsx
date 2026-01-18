'use client';

import { useState } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ui/aura/conversation';
import { Message, MessageContent } from '@/components/ui/aura/message';
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  usePromptInputController,
} from '@/components/ui/aura/prompt-input';
import { Suggestion } from '@/components/ui/aura/suggestion';
import { IconAdjustments } from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { AIChatDemo } from '@/lib/ai-examples/ai-chat-demo';

function EmptyStateFillInputDemo() {
  const controller = usePromptInputController();

  const handleSuggestion = (value: string) => {
    controller.textInput.setInput(value);
  };

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          <ConversationEmptyState title="Start a conversation with Atlas">
            <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
              <Suggestion
                suggestion="Are there any anomalies, risks, or non-conformances identified?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
              <Suggestion
                suggestion="What asset or equipment is being evaluated and what is its operational context?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
              <Suggestion
                suggestion="What are the current field conditions and observations recorded?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
            </div>
          </ConversationEmptyState>
        </ConversationContent>
      </Conversation>

      <div className="border-t p-4">
        <PromptInput onSubmit={() => {}}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask about your assets..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton size="icon-sm">
                <IconAdjustments />
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

function EmptyStateSubmitDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const handleSuggestion = (value: string) => {
    setUserMessage(value);
    setSubmitted(true);
  };

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {!submitted ? (
            <ConversationEmptyState title="Start a conversation with Atlas">
              <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
                <Suggestion
                  suggestion="Are there any anomalies, risks, or non-conformances identified?"
                  onClick={handleSuggestion}
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What asset or equipment is being evaluated and what is its operational context?"
                  onClick={handleSuggestion}
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What are the current field conditions and observations recorded?"
                  onClick={handleSuggestion}
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
              </div>
            </ConversationEmptyState>
          ) : (
            <Message>
              <MessageContent>
                <span>{userMessage}</span>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t p-4">
        <PromptInputProvider>
          <PromptInput onSubmit={() => {}}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Ask about your assets..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton size="icon-sm">
                  <IconAdjustments />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  );
}

export const conversationExamples: ComponentExamples = {
  basic: {
    title: 'Basic Conversation',
    description:
      'A conversation demonstrating the full AI response flow: thinking with shimmer, streaming response, and expandable tool calls',
    component: AIChatDemo,
    difficulty: 'advanced',
    code: `"use client"

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/cognite/conversation"
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageResponse,
} from "@/components/ai-elements/cognite/message"
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
} from "@/components/ai-elements/cognite/prompt-input"
import { Shimmer } from "@/components/ai-elements/cognite/shimmer"
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/cognite/tool"
import {
  Reasoning,
  ReasoningHeader,
  ReasoningContent,
  ReasoningItem,
} from "@/components/ai-elements/cognite/reasoning"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import { Sources, Source } from "@/components/ai-elements/cognite/sources"
import { Suggestion } from "@/components/ai-elements/cognite/suggestion"
import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  IconWheel,
  IconCopy,
  IconDownload,
  IconBrain,
  IconRefresh,
  IconHash,
  IconAdjustments,
  IconChevronDown,
  IconChartLine,
  IconPhoto,
  IconFile,
  IconBriefcase,
} from "@tabler/icons-react"
import { useEffect, useState } from "react"

const thinkingPhrases = ["Searching database…", "Fetching sensor data…", "Formulating response…"]

// Tokenize the markdown for streaming
const responseTokens = [
  "Based", " on", " my", " analysis", " of", " the", " sensor", " data",
  " for", " pump", " **21PT1019**,", " I've", " identified", " anomalies.",
  "\\n\\n", "| Timestamp", " | Status", " |", "\\n",
  "|-----------|--------|", "\\n", "| 03:15:00", " | Critical", " |",
]

const searchDatabaseInput = { asset_id: "21PT1019", data_types: ["vibration", "temperature", "rpm"] }
const searchDatabaseOutput = { status: "success", data_points_retrieved: 1247 }
const fetchSensorDataInput = { asset_id: "21PT1019", analysis: { detect_anomalies: true } }
const fetchSensorDataOutput = { status: "success", anomalies_detected: 3, urgency: "within_48_hours" }

type Phase = "empty" | "userMessage" | "waiting" | "thinking" | "streaming" | "complete"

export function BasicConversationDemo() {
  const [phase, setPhase] = useState<Phase>("empty")
  const [thinkingSeconds, setThinkingSeconds] = useState(0)
  const [streamedContent, setStreamedContent] = useState("")
  const [showTools, setShowTools] = useState(false)

  const phraseIndex = Math.min(Math.floor(thinkingSeconds / 3), 2)

  // Phase progression
  useEffect(() => {
    if (phase === "empty") {
      const timer = setTimeout(() => setPhase("userMessage"), 1000)
      return () => clearTimeout(timer)
    }
    if (phase === "userMessage") {
      const timer = setTimeout(() => setPhase("waiting"), 100)
      return () => clearTimeout(timer)
    }
    if (phase === "waiting") {
      const timer = setTimeout(() => setPhase("thinking"), 1000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Thinking timer (9 seconds total, 3 per phrase)
  useEffect(() => {
    if (phase !== "thinking") return
    const interval = setInterval(() => {
      setThinkingSeconds((prev) => {
        if (prev + 1 >= 9) {
          setPhase("streaming")
          return 9
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase])

  // Stream response tokens
  useEffect(() => {
    if (phase !== "streaming") return
    let content = "", index = 0
    const interval = setInterval(() => {
      if (index < responseTokens.length) {
        content += responseTokens[index]
        setStreamedContent(content)
        index++
      } else {
        clearInterval(interval)
        setPhase("complete")
      }
    }, 50)
    return () => clearInterval(interval)
  }, [phase])

  const showUserMessage = phase !== "empty"
  const showAssistantMessage = phase === "thinking" || phase === "streaming" || phase === "complete"
  const isThinking = phase === "thinking"
  const isComplete = phase === "complete"

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {phase === "empty" ? (
            <ConversationEmptyState
              title="Start a conversation with Atlas"
            >
              <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
                <Suggestion
                  suggestion="Are there any anomalies, risks, or non-conformances identified?"
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What asset or equipment is being evaluated and what is its operational context?"
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What are the current field conditions and observations recorded?"
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {showUserMessage && (
                <Message>
                  <MessageContent>
                    <span>
                      There are abnormal vibration levels on{" "}
                      <InlineCitation>
                        <InlineCitationLink
                          href="https://example.com/pump/21PT1019"
                          target="_blank"
                          icon={IconHash}
                          variant="nordic"
                        >
                          21PT1019
                        </InlineCitationLink>
                      </InlineCitation>
                    </span>
                  </MessageContent>
                </Message>
              )}

              {showAssistantMessage && (
                <Message isResponse={true}>
                  <MessageAvatar variant="nordic">
                    <MessageAvatarIcon>
                      <IconWheel />
                    </MessageAvatarIcon>
                  </MessageAvatar>
                  <MessageContent className="flex flex-col gap-2">
                    {isThinking ? (
                      <Shimmer variant="nordic">{thinkingPhrases[phraseIndex]}</Shimmer>
                    ) : (
                      <>
                        <span className="text-muted-foreground text-sm">
                          Thought for {thinkingSeconds} seconds
                        </span>
                        <MessageResponse controls={false}>{streamedContent}</MessageResponse>
                        {isComplete && (
                          <Sources className="flex flex-col gap-2 py-3">
                            <Source
                              href="https://example.com/21PT2019"
                              title="21PT1019"
                              icon={IconChartLine}
                              target="_blank"
                            />
                            <Source
                              href="https://example.com/pumpB.img"
                              title="pumpB.img"
                              icon={IconPhoto}
                              target="_blank"
                            />
                            <Source
                              href="https://example.com/PumpB.pdf"
                              title="PumpB.pdf"
                              icon={IconFile}
                              target="_blank"
                            />
                            <Source
                              href="https://example.com/120_oaoXR"
                              title="120_oaoXR"
                              icon={IconBriefcase}
                              target="_blank"
                            />
                          </Sources>
                        )}
                        {isComplete && showTools && (
                          <div className="flex flex-col gap-2 py-3">
                            <Reasoning>
                              <ReasoningHeader />
                              <ReasoningContent>
                                <ReasoningItem>
                                  <Tool defaultOpen={false}>
                                    <ToolHeader title="Search database" type="tool-call" />
                                    <ToolContent>
                                      <ToolInput input={searchDatabaseInput} />
                                      <ToolOutput output={searchDatabaseOutput} errorText={undefined} />
                                    </ToolContent>
                                  </Tool>
                                </ReasoningItem>
                                <ReasoningItem>
                                  <Tool defaultOpen={false}>
                                    <ToolHeader title="Fetch sensor data" type="tool-call" />
                                    <ToolContent>
                                      <ToolInput input={fetchSensorDataInput} />
                                      <ToolOutput output={fetchSensorDataOutput} errorText={undefined} />
                                    </ToolContent>
                                  </Tool>
                                </ReasoningItem>
                              </ReasoningContent>
                            </Reasoning>
                          </div>
                        )}
                        {isComplete && (
                          <MessageActions className="justify-between">
                            <div className="flex items-center gap-2">
                              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                                <IconCopy className="w-3 h-3" />
                              </MessageAction>
                              <MessageAction size="icon-sm" label="Download" tooltip="Download">
                                <IconDownload className="w-3 h-3" />
                              </MessageAction>
                              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                                <IconRefresh className="w-3 h-3" />
                              </MessageAction>
                            </div>
                            <MessageAction
                              size="sm"
                              onClick={() => setShowTools(!showTools)}
                              data-active={showTools}
                              className="data-[active=true]:bg-accent"
                            >
                              <IconBrain className="w-3.5 h-3.5" />
                              {showTools ? "Hide reasoning" : "Show reasoning"}
                            </MessageAction>
                          </MessageActions>
                        )}
                      </>
                    )}
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t p-4">
        <PromptInputProvider>
          <PromptInput onSubmit={() => {}}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Ask about your assets..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton size="icon-sm">
                  <IconAdjustments />
                </PromptInputButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Agent model
                      <IconChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>GPT-4</DropdownMenuItem>
                    <DropdownMenuItem>Claude</DropdownMenuItem>
                    <DropdownMenuItem>Gemini</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  )
}`,
  },

  emptyStateSubmit: {
    title: 'Empty State - Auto Submit',
    description:
      'Suggestions that immediately submit and display as user messages when clicked',
    component: EmptyStateSubmitDemo,
    difficulty: 'intermediate',
    code: `"use client"

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/cognite/conversation"
import {
  Message,
  MessageContent,
} from "@/components/ai-elements/cognite/message"
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
} from "@/components/ai-elements/cognite/prompt-input"
import { Suggestion } from "@/components/ai-elements/cognite/suggestion"
import { IconAdjustments } from "@tabler/icons-react"
import { useState } from "react"

export function EmptyStateSubmitDemo() {
  const [submitted, setSubmitted] = useState(false)
  const [userMessage, setUserMessage] = useState("")

  const handleSuggestion = (value: string) => {
    setUserMessage(value)
    setSubmitted(true)
  }

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {!submitted ? (
            <ConversationEmptyState
              title="Start a conversation with Atlas"
            >
              <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
                <Suggestion
                  suggestion="Are there any anomalies, risks, or non-conformances identified?"
                  onClick={handleSuggestion}
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What asset or equipment is being evaluated and what is its operational context?"
                  onClick={handleSuggestion}
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What are the current field conditions and observations recorded?"
                  onClick={handleSuggestion}
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
              </div>
            </ConversationEmptyState>
          ) : (
            <Message>
              <MessageContent>
                <span>{userMessage}</span>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t p-4">
        <PromptInputProvider>
          <PromptInput onSubmit={() => {}}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Ask about your assets..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton size="icon-sm">
                  <IconAdjustments />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    </div>
  )
}`,
  },

  emptyStateFillInput: {
    title: 'Empty State - Fill Input',
    description:
      'Suggestions that fill the prompt input when clicked, ready for the user to submit',
    component: () => (
      <PromptInputProvider>
        <EmptyStateFillInputDemo />
      </PromptInputProvider>
    ),
    difficulty: 'intermediate',
    code: `"use client"

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/cognite/conversation"
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  usePromptInputController,
} from "@/components/ai-elements/cognite/prompt-input"
import { Suggestion } from "@/components/ai-elements/cognite/suggestion"
import { IconAdjustments } from "@tabler/icons-react"

function EmptyStateFillInputDemo() {
  const controller = usePromptInputController()

  const handleSuggestion = (value: string) => {
    controller.textInput.setInput(value)
  }

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          <ConversationEmptyState
            title="Start a conversation with Atlas"
          >
            <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
              <Suggestion
                suggestion="Are there any anomalies, risks, or non-conformances identified?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
              <Suggestion
                suggestion="What asset or equipment is being evaluated and what is its operational context?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
              <Suggestion
                suggestion="What are the current field conditions and observations recorded?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
            </div>
          </ConversationEmptyState>
        </ConversationContent>
      </Conversation>

      <div className="border-t p-4">
        <PromptInput onSubmit={() => {}}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask about your assets..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton size="icon-sm">
                <IconAdjustments />
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  )
}

export default function Demo() {
  return (
    <PromptInputProvider>
      <EmptyStateFillInputDemo />
    </PromptInputProvider>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const conversationMeta = {
  name: 'Conversation',
  description:
    'Wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.',
  importPath: '@/components/ai-elements/cognite/conversation',
};
