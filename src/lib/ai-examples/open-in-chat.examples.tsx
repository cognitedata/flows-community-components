import {
  OpenIn,
  OpenInTrigger,
  OpenInContent,
  OpenInChatGPT,
  OpenInClaude,
} from '@/components/ui/cognite/open-in-chat';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicOpenInDemo() {
  return (
    <OpenIn query="Explain quantum computing">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
      </OpenInContent>
    </OpenIn>
  );
}

function WithMultipleProvidersDemo() {
  return (
    <OpenIn query="How to implement OAuth">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
      </OpenInContent>
    </OpenIn>
  );
}

export const openInChatExamples: ComponentExamples = {
  basic: {
    title: 'Open in Chat',
    description: 'Dropdown to open prompts in various AI chat providers',
    component: BasicOpenInDemo,
    difficulty: 'beginner',
    code: `import {
  OpenIn,
  OpenInTrigger,
  OpenInContent,
  OpenInChatGPT,
  OpenInClaude,
} from "@/components/ai-elements/cognite/open-in-chat"

export function BasicOpenInDemo() {
  return (
    <OpenIn query="Explain quantum computing">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
      </OpenInContent>
    </OpenIn>
  )
}`,
  },

  multipleProviders: {
    title: 'Multiple Providers',
    description: 'Open in chat with various AI service providers',
    component: WithMultipleProvidersDemo,
    difficulty: 'beginner',
    code: `import {
  OpenIn,
  OpenInTrigger,
  OpenInContent,
  OpenInChatGPT,
  OpenInClaude,
} from "@/components/ai-elements/cognite/open-in-chat"

export function MultipleProvidersDemo() {
  return (
    <OpenIn query="Your query here">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
      </OpenInContent>
    </OpenIn>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const openInChatMeta = {
  name: 'Open In Chat',
  description:
    'A dropdown menu for opening queries in various AI chat platforms including ChatGPT, Claude, T3, Scira, and v0.',
  importPath: '@/components/ai-elements/cognite/open-in-chat',
};
