"use client";

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/cognite/reasoning";
import type { ComponentExamples } from "@/lib/component-examples/types";
import { startTransition, useCallback, useEffect, useState } from "react";

const reasoningSteps = [
  "Let me think about this problem step by step.",
  "\n\nFirst, I need to understand what the user is asking for.",
  "\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.",
  "\n\nThis seems like a collapsible component with state management would be the right approach.",
].join("");

function BasicReasoningDemo() {
  return (
    <div className="w-full p-4 flex justify-start items-center">
      <Reasoning isStreaming={false} duration={3}>
        <ReasoningTrigger />
        <ReasoningContent>
          Let me think about this problem step by step. First, I need to understand what the user is asking for.
        </ReasoningContent>
      </Reasoning>
    </div>
  );
}

function StreamingReasoningDemo() {
  const [content, setContent] = useState("");
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
      setContent("");
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
    <div className="w-full p-4" style={{ height: "300px" }}>
      <Reasoning className="w-full" isStreaming={isStreaming}>
        <ReasoningTrigger />
        <ReasoningContent>{content}</ReasoningContent>
      </Reasoning>
    </div>
  );
}

export const reasoningExamples: ComponentExamples = {
  basic: {
    title: "Basic Reasoning",
    description: "Collapsible reasoning section with time display",
    component: BasicReasoningDemo,
    difficulty: "beginner",
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
    title: "Streaming Reasoning",
    description: "Auto-expanding reasoning with token streaming simulation",
    component: StreamingReasoningDemo,
    difficulty: "intermediate",
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
};

// Component metadata - single source of truth for API documentation
export const reasoningMeta = {
  name: "Reasoning",
  description: "A collapsible component that displays AI reasoning content, automatically opening during streaming and closing when finished.",
  importPath: "@/components/ai-elements/cognite/reasoning",
};
