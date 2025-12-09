'use client';

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ui/aura/conversation';
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
} from '@/components/ui/aura/prompt-input';
import { Shimmer } from '@/components/ui/aura/shimmer';
import { Response } from '@/components/ui/aura/response';
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from '@/components/ui/aura/tool';
import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconMessageCircle,
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconHash,
  IconAdjustments,
  IconChevronDown,
} from '@tabler/icons-react';
import { Suggestion } from '@/components/ui/aura/suggestion';
import { usePromptInputController } from '@/components/ui/aura/prompt-input';
import { Button } from '@/components/ui/aura/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { useEffect, useState } from 'react';

const thinkingPhrases = [
  'Searching database…',
  'Fetching sensor data…',
  'Formulating response…',
];

const searchDatabaseInput = {
  asset_id: '21PT1019',
  data_types: ['vibration', 'temperature', 'rpm'],
  time_range: {
    start: '2024-12-03T00:00:00Z',
    end: '2024-12-04T00:00:00Z',
  },
  aggregation: '1h',
  include_metadata: true,
};

const searchDatabaseOutput = {
  status: 'success',
  asset: {
    id: '21PT1019',
    name: 'Centrifugal Pump B-Section',
    location: 'Plant Floor 2, Bay 7',
    manufacturer: 'Grundfos',
    model: 'CR 95-2-2',
  },
  data_points_retrieved: 1247,
  time_range_actual: {
    start: '2024-12-03T00:00:00Z',
    end: '2024-12-04T00:00:00Z',
  },
};

const fetchSensorDataInput = {
  asset_id: '21PT1019',
  sensors: [
    {
      type: 'vibration',
      unit: 'mm/s',
      threshold_warning: 4.0,
      threshold_critical: 6.0,
    },
    {
      type: 'temperature',
      unit: 'celsius',
      threshold_warning: 80,
      threshold_critical: 90,
    },
    { type: 'rpm', unit: 'revolutions_per_minute' },
  ],
  analysis: {
    detect_anomalies: true,
    correlation_analysis: true,
    trend_detection: true,
  },
};

const fetchSensorDataOutput = {
  status: 'success',
  anomalies_detected: 3,
  peak_values: {
    vibration: {
      value: 6.8,
      timestamp: '2024-12-03T03:15:00Z',
      status: 'critical',
    },
    temperature: {
      value: 82.1,
      timestamp: '2024-12-03T03:15:00Z',
      status: 'warning',
    },
    rpm: { value: 2912, timestamp: '2024-12-03T03:15:00Z' },
  },
  correlations: [
    { factors: ['vibration', 'rpm'], coefficient: 0.87, significance: 'high' },
    {
      factors: ['vibration', 'temperature'],
      coefficient: 0.72,
      significance: 'moderate',
    },
  ],
  recommended_action: 'maintenance_inspection',
  urgency: 'within_48_hours',
};

// Tokenize the markdown for streaming effect
const responseTokens = [
  'Based',
  ' on',
  ' my',
  ' analysis',
  ' of',
  ' the',
  ' sensor',
  ' data',
  ' for',
  ' pump',
  ' **21PT1019**,',
  " I've",
  ' identified',
  ' several',
  ' anomalies',
  ' that',
  ' correlate',
  ' with',
  ' the',
  ' reported',
  ' vibration',
  ' issues.',
  '\n\n',
  'The',
  ' vibration',
  ' amplitude',
  ' exceeded',
  ' normal',
  ' operating',
  ' thresholds',
  ' at',
  ' multiple',
  ' intervals',
  ' during',
  ' the',
  ' past',
  ' 24',
  ' hours.',
  " Here's",
  ' a',
  ' summary',
  ' of',
  ' the',
  ' key',
  ' findings:',
  '\n\n',
  '| Timestamp',
  ' | Vibration (mm/s)',
  ' | Temperature (°C)',
  ' | RPM',
  ' | Status',
  ' |',
  '\n',
  '|-----------|------------------|------------------|-----|--------|',
  '\n',
  '| 02:15:00',
  ' | 4.2',
  ' | 78.3',
  ' | 2,847',
  ' | Warning',
  ' |',
  '\n',
  '| 03:15:00',
  ' | 6.8',
  ' | 82.1',
  ' | 2,912',
  ' | Critical',
  ' |',
  '\n',
  '| 04:45:00',
  ' | 5.1',
  ' | 80.6',
  ' | 2,889',
  ' | Warning',
  ' |',
  '\n',
  '| 06:30:00',
  ' | 3.9',
  ' | 76.2',
  ' | 2,831',
  ' | Normal',
  ' |',
  '\n\n',
  'The',
  ' spike',
  ' at',
  ' 03:15',
  ' correlates',
  ' strongly',
  ' with',
  ' a',
  ' 12%',
  ' increase',
  ' in',
  ' RPM',
  ' and',
  ' elevated',
  ' bearing',
  ' temperature.',
  ' This',
  ' pattern',
  ' is',
  ' consistent',
  ' with',
  ' early-stage',
  ' bearing',
  ' wear',
  ' or',
  ' shaft',
  ' misalignment.',
  '\n\n',
  'I',
  ' recommend',
  ' scheduling',
  ' a',
  ' maintenance',
  ' inspection',
  ' within',
  ' the',
  ' next',
  ' 48',
  ' hours',
  ' to',
  ' prevent',
  ' potential',
  ' bearing',
  ' failure.',
  ' Priority',
  ' should',
  ' be',
  ' given',
  ' to',
  ' checking',
  ' the',
  ' drive-end',
  ' bearing',
  ' assembly',
  ' and',
  ' verifying',
  ' shaft',
  ' alignment',
  ' tolerances.',
];

type ConversationPhase =
  | 'empty'
  | 'userMessage'
  | 'waiting'
  | 'thinking'
  | 'streaming'
  | 'complete';

function BasicConversationDemo() {
  const [phase, setPhase] = useState<ConversationPhase>('empty');
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [streamedContent, setStreamedContent] = useState('');
  const [showTools, setShowTools] = useState(false);

  // Derive shimmer phrase from thinking seconds (changes every 3 seconds)
  const phraseIndex = Math.min(Math.floor(thinkingSeconds / 3), 2);

  // Phase progression: empty (1s) → userMessage → waiting (1s) → thinking (9s) → streaming → complete
  useEffect(() => {
    if (phase === 'empty') {
      const timer = setTimeout(() => setPhase('userMessage'), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === 'userMessage') {
      const timer = setTimeout(() => setPhase('waiting'), 100);
      return () => clearTimeout(timer);
    }
    if (phase === 'waiting') {
      const timer = setTimeout(() => setPhase('thinking'), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Thinking phase timer
  useEffect(() => {
    if (phase !== 'thinking') return;

    const interval = setInterval(() => {
      setThinkingSeconds((prev) => {
        const next = prev + 1;
        if (next >= 9) {
          setPhase('streaming');
          return 9;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Streaming phase - stream response tokens
  useEffect(() => {
    if (phase !== 'streaming') return;

    let currentContent = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < responseTokens.length) {
        currentContent += responseTokens[index];
        setStreamedContent(currentContent);
        index++;
      } else {
        clearInterval(interval);
        setPhase('complete');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  const showUserMessage = phase !== 'empty';
  const showAssistantMessage =
    phase === 'thinking' || phase === 'streaming' || phase === 'complete';
  const isThinking = phase === 'thinking';
  const isComplete = phase === 'complete';

  return (
    <div className="h-[900px] w-full border rounded-lg relative flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          {phase === 'empty' ? (
            <ConversationEmptyState
              title="Start a conversation with Atlas"
              icon={<IconMessageCircle className="h-12 w-12" />}
            >
              <div className="flex flex-wrap gap-2 justify-center pb-4">
                <Suggestion suggestion="Are there any anomalies, risks, or non-conformances identified?" />
                <Suggestion suggestion="What asset or equipment is being evaluated and what is its operational context?" />
                <Suggestion suggestion="What are the current field conditions and observations recorded?" />
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {showUserMessage && (
                <Message>
                  <MessageContent>
                    <span>
                      There are abnormal vibration levels on{' '}
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
                      <Shimmer variant="nordic">
                        {thinkingPhrases[phraseIndex]}
                      </Shimmer>
                    ) : (
                      <>
                        <span className="text-muted-foreground text-sm">
                          Thought for {thinkingSeconds} seconds
                        </span>
                        <Response controls={false}>{streamedContent}</Response>
                        {isComplete && showTools && (
                          <div className="flex flex-col gap-2">
                            <hr className="my-3" />
                            <h4 className="text-sm font-medium text-muted-foreground">
                              Tool calls
                            </h4>
                            <Tool defaultOpen={false}>
                              <ToolHeader
                                title="Search database"
                                type="tool-call"
                              />
                              <ToolContent>
                                <ToolInput input={searchDatabaseInput} />
                                <ToolOutput
                                  output={searchDatabaseOutput}
                                  errorText={undefined}
                                />
                              </ToolContent>
                            </Tool>
                            <Tool defaultOpen={false}>
                              <ToolHeader
                                title="Fetch sensor data"
                                type="tool-call"
                              />
                              <ToolContent>
                                <ToolInput input={fetchSensorDataInput} />
                                <ToolOutput
                                  output={fetchSensorDataOutput}
                                  errorText={undefined}
                                />
                              </ToolContent>
                            </Tool>
                          </div>
                        )}
                        {isComplete && (
                          <MessageActions>
                            <MessageAction
                              size="icon-sm"
                              label="Copy"
                              tooltip="Copy"
                            >
                              <IconCopy className="w-3 h-3" />
                            </MessageAction>
                            <MessageAction
                              size="icon-sm"
                              label="Download"
                              tooltip="Download"
                            >
                              <IconDownload className="w-3 h-3" />
                            </MessageAction>
                            <MessageAction
                              size="icon-sm"
                              label={
                                showTools
                                  ? 'Hide tool calls'
                                  : 'Show tool calls'
                              }
                              tooltip={
                                showTools
                                  ? 'Hide tool calls'
                                  : 'Show tool calls'
                              }
                              onClick={() => setShowTools(!showTools)}
                              data-active={showTools}
                              className="data-[active=true]:bg-accent"
                            >
                              <IconTool className="w-3 h-3" />
                            </MessageAction>
                            <MessageAction
                              size="icon-sm"
                              label="Retry"
                              tooltip="Retry"
                            >
                              <IconRefresh className="w-3 h-3" />
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
  );
}

function EmptyStateFillInputDemo() {
  const controller = usePromptInputController();

  const handleSuggestion = (value: string) => {
    controller.textInput.setInput(value);
  };

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          <ConversationEmptyState
            title="Start a conversation with Atlas"
            icon={<IconMessageCircle className="h-12 w-12" />}
          >
            <div className="flex flex-wrap gap-2 justify-center pb-4">
              <Suggestion
                suggestion="Are there any anomalies, risks, or non-conformances identified?"
                onClick={handleSuggestion}
              />
              <Suggestion
                suggestion="What asset or equipment is being evaluated and what is its operational context?"
                onClick={handleSuggestion}
              />
              <Suggestion
                suggestion="What are the current field conditions and observations recorded?"
                onClick={handleSuggestion}
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
            <ConversationEmptyState
              title="Start a conversation with Atlas"
              icon={<IconMessageCircle className="h-12 w-12" />}
            >
              <div className="flex flex-wrap gap-2 justify-center pb-4">
                <Suggestion
                  suggestion="Are there any anomalies, risks, or non-conformances identified?"
                  onClick={handleSuggestion}
                />
                <Suggestion
                  suggestion="What asset or equipment is being evaluated and what is its operational context?"
                  onClick={handleSuggestion}
                />
                <Suggestion
                  suggestion="What are the current field conditions and observations recorded?"
                  onClick={handleSuggestion}
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
    component: BasicConversationDemo,
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
import { Response } from "@/components/ai-elements/cognite/response"
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/cognite/tool"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import { Suggestion } from "@/components/ai-elements/cognite/suggestion"
import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  IconMessageCircle,
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconHash,
  IconAdjustments,
  IconChevronDown,
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
              icon={<IconMessageCircle className="h-12 w-12" />}
            >
              <div className="flex flex-wrap gap-2 justify-center pb-4">
                <Suggestion suggestion="Are there any anomalies, risks, or non-conformances identified?" />
                <Suggestion suggestion="What asset or equipment is being evaluated and what is its operational context?" />
                <Suggestion suggestion="What are the current field conditions and observations recorded?" />
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
                        <Response controls={false}>{streamedContent}</Response>
                        {isComplete && showTools && (
                          <div className="flex flex-col gap-2">
                            <hr className="my-3" />
                            <h4 className="text-sm font-medium text-muted-foreground">
                              Tool calls
                            </h4>
                            <Tool defaultOpen={false}>
                              <ToolHeader title="Search database" type="tool-call" />
                              <ToolContent>
                                <ToolInput input={searchDatabaseInput} />
                                <ToolOutput output={searchDatabaseOutput} errorText={undefined} />
                              </ToolContent>
                            </Tool>
                            <Tool defaultOpen={false}>
                              <ToolHeader title="Fetch sensor data" type="tool-call" />
                              <ToolContent>
                                <ToolInput input={fetchSensorDataInput} />
                                <ToolOutput output={fetchSensorDataOutput} errorText={undefined} />
                              </ToolContent>
                            </Tool>
                          </div>
                        )}
                        {isComplete && (
                          <MessageActions>
                            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                              <IconCopy className="w-3 h-3" />
                            </MessageAction>
                            <MessageAction size="icon-sm" label="Download" tooltip="Download">
                              <IconDownload className="w-3 h-3" />
                            </MessageAction>
                            <MessageAction
                              size="icon-sm"
                              label={showTools ? "Hide tool calls" : "Show tool calls"}
                              tooltip={showTools ? "Hide tool calls" : "Show tool calls"}
                              onClick={() => setShowTools(!showTools)}
                              data-active={showTools}
                              className="data-[active=true]:bg-accent"
                            >
                              <IconTool className="w-3 h-3" />
                            </MessageAction>
                            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                              <IconRefresh className="w-3 h-3" />
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
import { IconMessageCircle, IconAdjustments } from "@tabler/icons-react"
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
              icon={<IconMessageCircle className="h-12 w-12" />}
            >
              <div className="flex flex-wrap gap-2 justify-center pb-4">
                <Suggestion
                  suggestion="Are there any anomalies, risks, or non-conformances identified?"
                  onClick={handleSuggestion}
                />
                <Suggestion
                  suggestion="What asset or equipment is being evaluated and what is its operational context?"
                  onClick={handleSuggestion}
                />
                <Suggestion
                  suggestion="What are the current field conditions and observations recorded?"
                  onClick={handleSuggestion}
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
import { IconMessageCircle, IconAdjustments } from "@tabler/icons-react"

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
            icon={<IconMessageCircle className="h-12 w-12" />}
          >
            <div className="flex flex-wrap gap-2 justify-center pb-4">
              <Suggestion
                suggestion="Are there any anomalies, risks, or non-conformances identified?"
                onClick={handleSuggestion}
              />
              <Suggestion
                suggestion="What asset or equipment is being evaluated and what is its operational context?"
                onClick={handleSuggestion}
              />
              <Suggestion
                suggestion="What are the current field conditions and observations recorded?"
                onClick={handleSuggestion}
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
