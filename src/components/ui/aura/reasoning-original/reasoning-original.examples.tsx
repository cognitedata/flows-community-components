
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ui/aura/reasoning-original';
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconWheel,
  IconHash,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { startTransition, useCallback, useEffect, useState } from 'react';

const reasoningSteps = [
  'Let me think about this problem step by step.',
  '\n\nFirst, I need to understand what the user is asking for.',
  '\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.',
  '\n\nThis seems like a collapsible component with state management would be the right approach.',
].join('');

function BasicReasoningDemo() {
  return (
    <Reasoning isStreaming={false} duration={3}>
      <ReasoningTrigger />
      <ReasoningContent>
        Let me think about this problem step by step. First, I need to
        understand what the user is asking for.
      </ReasoningContent>
    </Reasoning>
  );
}

function StreamingReasoningDemo() {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

  // Function to chunk text into fake tokens of 3-4 characters
  const chunkIntoTokens = useCallback((text: string): string[] => {
    const tokens: string[] = [];
    let i = 0;
    while (i < text.length) {
      const chunkSize = Math.floor(Math.random() * 2) + 3; // Random size between 3-4
      tokens.push(text.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return tokens;
  }, []);

  useEffect(() => {
    const tokenizedSteps = chunkIntoTokens(reasoningSteps);
    startTransition(() => {
      setTokens(tokenizedSteps);
      setContent('');
      setCurrentTokenIndex(0);
      setIsStreaming(true);
    });
  }, [chunkIntoTokens]);

  useEffect(() => {
    if (!isStreaming || currentTokenIndex >= tokens.length) {
      if (isStreaming) {
        startTransition(() => {
          setIsStreaming(false);
        });
      }
      return;
    }

    const timer = setTimeout(() => {
      setContent((prev) => prev + tokens[currentTokenIndex]);
      setCurrentTokenIndex((prev) => prev + 1);
    }, 25); // Faster interval since we're streaming smaller chunks

    return () => clearTimeout(timer);
  }, [isStreaming, currentTokenIndex, tokens]);

  return (
    <Reasoning isStreaming={isStreaming}>
      <ReasoningTrigger />
      <ReasoningContent>{content}</ReasoningContent>
    </Reasoning>
  );
}

function MessageConversationWithReasoningDemo() {
  const [content, setContent] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [responseContent, setResponseContent] = useState('');
  const [isStreamingResponse, setIsStreamingResponse] = useState(false);
  const [currentResponseTokenIndex, setCurrentResponseTokenIndex] = useState(0);
  const [responseTokens, setResponseTokens] = useState<string[]>([]);

  const reasoningContent = [
    'Let me think about this problem step by step.',
    '\n\nFirst, I need to understand what the user is asking for.',
    '\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.',
    '\n\nThis seems like a collapsible component with state management would be the right approach.',
  ].join('');

  // This is a simulated response from the LLM. In a real-world application, this would be the response from the LLM.
  const simulatedLLMResponse =
    'Based on the time series analysis, the vibration amplitude has increased by 45% over the past 6 hours, correlating with a temperature rise of 12°C. This suggests bearing wear or misalignment. I recommend scheduling maintenance within the next 24 hours to prevent potential failure.';

  // Function to chunk text into fake tokens of 3-4 characters
  const chunkIntoTokens = useCallback((text: string): string[] => {
    const tokens: string[] = [];
    let i = 0;
    while (i < text.length) {
      const chunkSize = Math.floor(Math.random() * 2) + 3; // Random size between 3-4
      tokens.push(text.slice(i, i + chunkSize));
      i += chunkSize;
    }
    return tokens;
  }, []);

  useEffect(() => {
    const tokenizedSteps = chunkIntoTokens(reasoningContent);
    startTransition(() => {
      setTokens(tokenizedSteps);
      setContent('');
      setCurrentTokenIndex(0);
      setIsStreaming(true);
      setShowMessage(false);
    });
  }, [chunkIntoTokens, reasoningContent]);

  useEffect(() => {
    if (!isStreaming || currentTokenIndex >= tokens.length) {
      if (isStreaming) {
        startTransition(() => {
          setIsStreaming(false);
        });
      }
      return;
    }

    const timer = setTimeout(() => {
      setContent((prev) => prev + tokens[currentTokenIndex]);
      setCurrentTokenIndex((prev) => prev + 1);
    }, 25); // Faster interval since we're streaming smaller chunks

    return () => clearTimeout(timer);
  }, [isStreaming, currentTokenIndex, tokens]);

  const handleReasoningOpenChange = (open: boolean) => {
    // Start streaming the response when reasoning collapses after streaming is done
    if (!open && !isStreaming) {
      setShowMessage(true);
      const tokenizedResponse = chunkIntoTokens(simulatedLLMResponse);
      startTransition(() => {
        setResponseTokens(tokenizedResponse);
        setResponseContent('');
        setCurrentResponseTokenIndex(0);
        setIsStreamingResponse(true);
      });
    }
  };

  // Stream the response tokens
  useEffect(() => {
    if (
      !isStreamingResponse ||
      currentResponseTokenIndex >= responseTokens.length
    ) {
      if (isStreamingResponse) {
        startTransition(() => {
          setIsStreamingResponse(false);
        });
      }
      return;
    }

    const timer = setTimeout(() => {
      setResponseContent(
        (prev) => prev + responseTokens[currentResponseTokenIndex]
      );
      setCurrentResponseTokenIndex((prev) => prev + 1);
    }, 25);

    return () => clearTimeout(timer);
  }, [isStreamingResponse, currentResponseTokenIndex, responseTokens]);

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageContent>
          <span>
            What&apos;s causing the abnormal vibration levels on pump{' '}
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/pump/21PT1019"
                target="_blank"
                icon={IconHash}
                variant="nordic"
              >
                21PT1019
              </InlineCitationLink>
            </InlineCitation>?
          </span>
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <Reasoning
            className="w-full"
            isStreaming={isStreaming}
            onOpenChange={handleReasoningOpenChange}
          >
            <ReasoningTrigger />
            <ReasoningContent>{content}</ReasoningContent>
          </Reasoning>
          {showMessage && <p>{responseContent}</p>}
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction
              size="icon-sm"
              label="Explain Tool Call(s)"
              tooltip="Explain Tool Call(s)"
            >
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

export const reasoningExamples: ComponentExamples = {
  basic: {
    title: 'Basic Reasoning',
    description: 'Collapsible reasoning section with time display',
    component: BasicReasoningDemo,
    difficulty: 'beginner',
    code: `"use client"
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/cognite/reasoning"

export function BasicReasoningDemo() {
  return (
    <Reasoning isStreaming={false} duration={3}>
      <ReasoningTrigger />
      <ReasoningContent>
        Let me think about this problem step by step. First, I need to understand what the user is asking for.
      </ReasoningContent>
    </Reasoning>
  )
}`,
  },

  streaming: {
    title: 'Streaming Reasoning',
    description: 'Auto-expanding reasoning with token streaming simulation',
    component: StreamingReasoningDemo,
    difficulty: 'intermediate',
    code: `"use client"
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/cognite/reasoning"
import { useCallback, useEffect, useState } from "react"

const reasoningSteps = [
  "Let me think about this problem step by step.",
  "\\n\\nFirst, I need to understand what the user is asking for.",
].join("")

export function StreamingReasoningDemo() {
  const [content, setContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0)
  const [tokens, setTokens] = useState<string[]>([])

  const chunkIntoTokens = useCallback((text: string): string[] => {
    const tokens: string[] = []
    let i = 0
    while (i < text.length) {
      const chunkSize = Math.floor(Math.random() * 2) + 3
      tokens.push(text.slice(i, i + chunkSize))
      i += chunkSize
    }
    return tokens
  }, [])

  useEffect(() => {
    const tokenizedSteps = chunkIntoTokens(reasoningSteps)
    setTokens(tokenizedSteps)
    setContent("")
    setCurrentTokenIndex(0)
    setIsStreaming(true)
  }, [chunkIntoTokens])

  useEffect(() => {
    if (!isStreaming || currentTokenIndex >= tokens.length) {
      if (isStreaming) {
        setIsStreaming(false)
      }
      return
    }

    const timer = setTimeout(() => {
      setContent((prev) => prev + tokens[currentTokenIndex])
      setCurrentTokenIndex((prev) => prev + 1)
    }, 25)

    return () => clearTimeout(timer)
  }, [isStreaming, currentTokenIndex, tokens])

  return (
    <div className="w-full p-4" style={{ height: "300px" }}>
      <Reasoning className="w-full" isStreaming={isStreaming}>
        <ReasoningTrigger />
        <ReasoningContent>{content}</ReasoningContent>
      </Reasoning>
    </div>
  )
}`,
  },

  conversation: {
    title: 'Message Conversation with Reasoning',
    description:
      'Complete conversation showing user and assistant messages with reasoning',
    component: MessageConversationWithReasoningDemo,
    difficulty: 'intermediate',
    code: `"use client"
import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/cognite/reasoning"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ai-elements/cognite/message"
import { InlineCitation, InlineCitationLink } from "@/components/ai-elements/cognite/inline-citation"
import { IconCopy, IconDownload, IconTool, IconRefresh, IconWheel, IconHash } from "@tabler/icons-react"
import { useCallback, useEffect, useState } from "react"

const reasoningContent = [
  "Let me think about this problem step by step.",
  "\\n\\nFirst, I need to understand what the user is asking for.",
  "\\n\\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.",
  "\\n\\nThis seems like a collapsible component with state management would be the right approach.",
].join("")

const simulatedLLMResponse = "Based on the time series analysis, the vibration amplitude has increased by 45% over the past 6 hours, correlating with a temperature rise of 12°C. This suggests bearing wear or misalignment. I recommend scheduling maintenance within the next 24 hours to prevent potential failure."

export function MessageConversationWithReasoningDemo() {
  const [content, setContent] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0)
  const [tokens, setTokens] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [responseContent, setResponseContent] = useState("")
  const [isStreamingResponse, setIsStreamingResponse] = useState(false)
  const [currentResponseTokenIndex, setCurrentResponseTokenIndex] = useState(0)
  const [responseTokens, setResponseTokens] = useState<string[]>([])

  const chunkIntoTokens = useCallback((text: string): string[] => {
    const tokens: string[] = []
    let i = 0
    while (i < text.length) {
      const chunkSize = Math.floor(Math.random() * 2) + 3
      tokens.push(text.slice(i, i + chunkSize))
      i += chunkSize
    }
    return tokens
  }, [])

  useEffect(() => {
    const tokenizedSteps = chunkIntoTokens(reasoningContent)
    setTokens(tokenizedSteps)
    setContent("")
    setCurrentTokenIndex(0)
    setIsStreaming(true)
    setShowMessage(false)
  }, [chunkIntoTokens])

  useEffect(() => {
    if (!isStreaming || currentTokenIndex >= tokens.length) {
      if (isStreaming) {
        setIsStreaming(false)
      }
      return
    }

    const timer = setTimeout(() => {
      setContent((prev) => prev + tokens[currentTokenIndex])
      setCurrentTokenIndex((prev) => prev + 1)
    }, 25)

    return () => clearTimeout(timer)
  }, [isStreaming, currentTokenIndex, tokens])

  const handleReasoningOpenChange = (open: boolean) => {
    if (!open && !isStreaming) {
      setShowMessage(true)
      const tokenizedResponse = chunkIntoTokens(simulatedLLMResponse)
      setResponseTokens(tokenizedResponse)
      setResponseContent("")
      setCurrentResponseTokenIndex(0)
      setIsStreamingResponse(true)
    }
  }

  useEffect(() => {
    if (!isStreamingResponse || currentResponseTokenIndex >= responseTokens.length) {
      if (isStreamingResponse) {
        setIsStreamingResponse(false)
      }
      return
    }

    const timer = setTimeout(() => {
      setResponseContent((prev) => prev + responseTokens[currentResponseTokenIndex])
      setCurrentResponseTokenIndex((prev) => prev + 1)
    }, 25)

    return () => clearTimeout(timer)
  }, [isStreamingResponse, currentResponseTokenIndex, responseTokens])

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageContent>
          <span>
            What's causing the abnormal vibration levels on pump{' '}
            <InlineCitation>
              <InlineCitationLink href="https://example.com/pump/21PT1019" target="_blank" icon={IconHash} variant="nordic">
                21PT1019
              </InlineCitationLink>
            </InlineCitation>?
          </span>
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <Reasoning className="w-full" isStreaming={isStreaming} onOpenChange={handleReasoningOpenChange}>
            <ReasoningTrigger />
            <ReasoningContent>{content}</ReasoningContent>
          </Reasoning>
          {showMessage && <p>{responseContent}</p>}
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Explain Tool Call(s)" tooltip="Explain Tool Call(s)">
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const reasoningMeta = {
  name: 'Reasoning',
  description:
    'A collapsible component that displays AI reasoning content, automatically opening during streaming and closing when finished.',
  importPath: '@/components/ai-elements/cognite/reasoning',
};
