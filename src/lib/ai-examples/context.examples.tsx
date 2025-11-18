import {
  Context,
  ContextTrigger,
  ContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextContentFooter,
  ContextInputUsage,
  ContextOutputUsage,
} from '@/components/ui/cognite/context';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicContextDemo() {
  return (
    <Context usedTokens={5000} maxTokens={16000}>
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  );
}

function WithCustomUsageDemo() {
  const usage = {
    inputTokens: 8000,
    outputTokens: 2000,
    totalTokens: 10000,
  };

  return (
    <Context usedTokens={10000} maxTokens={16000} usage={usage} modelId="gpt-4">
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  );
}

export const contextExamples: ComponentExamples = {
  basic: {
    title: 'Basic Context Usage',
    description: 'Display token usage and context information',
    component: BasicContextDemo,
    difficulty: 'beginner',
    code: `import {
  Context,
  ContextTrigger,
  ContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextContentFooter,
} from "@/components/ai-elements/cognite/context"

export function BasicContextDemo() {
  return (
    <Context usedTokens={5000} maxTokens={16000}>
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody />
        <ContextContentFooter />
      </ContextContent>
    </Context>
  )
}`,
  },

  withUsage: {
    title: 'Detailed Usage Stats',
    description: 'Context with input/output token breakdown',
    component: WithCustomUsageDemo,
    difficulty: 'intermediate',
    code: `import {
  Context,
  ContextTrigger,
  ContextContent,
  ContextContentHeader,
  ContextContentBody,
  ContextInputUsage,
  ContextOutputUsage,
  ContextContentFooter,
} from "@/components/ai-elements/cognite/context"

export function ContextWithUsageDemo() {
  const usage = {
    inputTokens: 8000,
    outputTokens: 2000,
  }

  return (
    <Context usedTokens={10000} maxTokens={16000} usage={usage} modelId="gpt-4">
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody>
          <ContextInputUsage />
          <ContextOutputUsage />
        </ContextContentBody>
        <ContextContentFooter />
      </ContextContent>
    </Context>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const contextMeta = {
  name: 'Context',
  description:
    'A compound component system for displaying AI model context window usage, token consumption, and cost estimation.',
  importPath: '@/components/ai-elements/cognite/context',
};
