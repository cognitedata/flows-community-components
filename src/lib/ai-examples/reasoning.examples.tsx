import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/cognite/reasoning";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicReasoningDemo() {
  return (
    <Reasoning isStreaming={false} duration={3}>
      <ReasoningTrigger />
      <ReasoningContent>
        Let me think through this problem step by step. First, I need to understand
        what the user is asking for.
      </ReasoningContent>
    </Reasoning>
  );
}

function StreamingReasoningDemo() {
  return (
    <Reasoning isStreaming={true} defaultOpen={true}>
      <ReasoningTrigger />
      <ReasoningContent>
        Currently analysing the problem and considering various approaches...
      </ReasoningContent>
    </Reasoning>
  );
}

export const reasoningExamples: ComponentExamples = {
  basic: {
    title: "Basic Reasoning",
    description: "Collapsible reasoning section with time display",
    component: BasicReasoningDemo,
    difficulty: "beginner",
    code: `import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/cognite/reasoning"

export function BasicReasoningDemo() {
  return (
    <Reasoning isStreaming={false} duration={3}>
      <ReasoningTrigger />
      <ReasoningContent>
        Thinking process content here...
      </ReasoningContent>
    </Reasoning>
  )
}`,
  },

  streaming: {
    title: "Streaming Reasoning",
    description: "Auto-expanding reasoning during AI thinking",
    component: StreamingReasoningDemo,
    difficulty: "intermediate",
    code: `import {
  Reasoning,
  ReasoningTrigger,
  ReasoningContent,
} from "@/components/ai-elements/cognite/reasoning"

export function StreamingReasoningDemo() {
  return (
    <Reasoning isStreaming={true} defaultOpen={true}>
      <ReasoningTrigger />
      <ReasoningContent>
        Reasoning content being streamed...
      </ReasoningContent>
    </Reasoning>
  )
}`,
  },
};

