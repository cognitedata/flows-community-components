'use client';

import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from '#aura/branch';
import {
  Message,
  MessageAvatar,
  MessageContent,
} from '#aura/message';
import type { ComponentExamples } from '#lib/component-examples/types';
import { nanoid } from 'nanoid';

const userMessages = [
  {
    id: nanoid(),
    content: 'What are the key strategies for optimising React performance?',
  },
  {
    id: nanoid(),
    content: 'How can I improve the performance of my React application?',
  },
  {
    id: nanoid(),
    content: 'What performance optimisation techniques should I use in React?',
  },
];

const assistantMessages = [
  {
    id: nanoid(),
    content:
      "Here's the first response to your question. This approach focuses on performance optimisation.",
  },
  {
    id: nanoid(),
    content:
      "Here's an alternative response. This approach emphasises code readability and maintainability over pure performance.",
  },
  {
    id: nanoid(),
    content:
      "And here's a third option. This balanced approach considers both performance and maintainability, making it suitable for most use cases.",
  },
];

function ConversationDemo() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 w-full">
      <Branch defaultBranch={0}>
        <BranchMessages>
          {userMessages.map((message) => (
            <Message from="user" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar src="/user-avatar2.png" name="Hayden Bleasel" />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="user">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>

      <Branch defaultBranch={0}>
        <BranchMessages>
          {assistantMessages.map((message) => (
            <Message from="assistant" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar
                variant="fjord"
                src="https://github.com/openai.png"
                name="AI"
              />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="assistant">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  );
}

function UserBranchDemo() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 w-full">
      <Branch defaultBranch={0}>
        <BranchMessages>
          {userMessages.map((message) => (
            <Message from="user" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar src="/user-avatar2.png" name="Hayden Bleasel" />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="user">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  );
}

function AssistantBranchDemo() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 w-full">
      <Branch defaultBranch={0}>
        <BranchMessages>
          {assistantMessages.map((message) => (
            <Message from="assistant" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar
                variant="fjord"
                src="https://github.com/openai.png"
                name="AI"
              />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="assistant">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  );
}

export const branchExamples: ComponentExamples = {
  conversation: {
    title: 'Conversation',
    description:
      'Full conversation with branched user prompts and assistant responses',
    component: ConversationDemo,
    difficulty: 'intermediate',
    code: `"use client"

import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "#components/ai-elements/cognite/branch"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "#components/ai-elements/cognite/message"
import { nanoid } from "nanoid"

const userMessages = [
  { id: nanoid(), content: "What are the key strategies for optimising React performance?" },
  { id: nanoid(), content: "How can I improve the performance of my React application?" },
  { id: nanoid(), content: "What performance optimisation techniques should I use in React?" },
]

const assistantMessages = [
  { id: nanoid(), content: "Here's the first response to your question. This approach focuses on performance optimisation." },
  { id: nanoid(), content: "Here's an alternative response. This approach emphasises code readability and maintainability over pure performance." },
  { id: nanoid(), content: "And here's a third option. This balanced approach considers both performance and maintainability, making it suitable for most use cases." },
]

export function ConversationDemo() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 w-full">
      <Branch defaultBranch={0}>
        <BranchMessages>
          {userMessages.map((message) => (
            <Message from="user" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar name="Hayden Bleasel" src="/user-avatar.png" />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="user">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>

      <Branch defaultBranch={0}>
        <BranchMessages>
          {assistantMessages.map((message) => (
            <Message from="assistant" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar variant="fjord" src="https://github.com/openai.png" name="AI" />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="assistant">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}`,
  },

  user: {
    title: 'User Branch',
    description: 'Branching user prompts in a conversation',
    component: UserBranchDemo,
    difficulty: 'beginner',
    code: `"use client"

import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "#components/ai-elements/cognite/branch"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "#components/ai-elements/cognite/message"
import { nanoid } from "nanoid"

const userMessages = [
  { id: nanoid(), content: "What are the key strategies for optimising React performance?" },
  { id: nanoid(), content: "How can I improve the performance of my React application?" },
  { id: nanoid(), content: "What performance optimisation techniques should I use in React?" },
]

export function UserBranchDemo() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 w-full">
      <Branch defaultBranch={0}>
        <BranchMessages>
          {userMessages.map((message) => (
            <Message from="user" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar name="Hayden Bleasel" src="/user-avatar.png" />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="user">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}`,
  },

  assistant: {
    title: 'Assistant Branch',
    description: 'Branching assistant responses in a conversation',
    component: AssistantBranchDemo,
    difficulty: 'beginner',
    code: `"use client"

import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "#components/ai-elements/cognite/branch"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "#components/ai-elements/cognite/message"
import { nanoid } from "nanoid"

const assistantMessages = [
  { id: nanoid(), content: "Here's the first response to your question. This approach focuses on performance optimisation." },
  { id: nanoid(), content: "Here's an alternative response. This approach emphasises code readability and maintainability over pure performance." },
  { id: nanoid(), content: "And here's a third option. This balanced approach considers both performance and maintainability, making it suitable for most use cases." },
]

export function AssistantBranchDemo() {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 w-full">
      <Branch defaultBranch={0}>
        <BranchMessages>
          {assistantMessages.map((message) => (
            <Message from="assistant" key={message.id}>
              <MessageContent>{message.content}</MessageContent>
              <MessageAvatar variant="fjord" src="https://github.com/openai.png" name="AI" />
            </Message>
          ))}
        </BranchMessages>
        <BranchSelector from="assistant">
          <BranchPrevious />
          <BranchPage />
          <BranchNext />
        </BranchSelector>
      </Branch>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const branchMeta = {
  name: 'Branch',
  description:
    'Manages multiple versions of AI messages, allowing users to navigate between different response branches.',
  importPath: '#components/ai-elements/draft/branch',
};
