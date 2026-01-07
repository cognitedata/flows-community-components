'use client';

import { Actions, Action } from '@/components/ui/aura/actions';
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from '@/components/ui/aura/message';
import {
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconWheel,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

const assistantResponses = [
  {
    id: '1',
    content:
      "I'm doing great, thank you for asking! How can I assist you today?",
  },
  {
    id: '2',
    content:
      "I'm functioning optimally! Is there something specific you'd like help with?",
  },
  {
    id: '3',
    content:
      'All systems are running smoothly. What would you like to work on together?',
  },
];

function BasicActionsDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>Hello, how are you?</MessageContent>
      </Message>

      <MessageBranch defaultBranch={0}>
        <MessageBranchContent>
          {assistantResponses.map((response) => (
            <Message isResponse={true} key={response.id}>
              <MessageAvatar variant="fjord">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                {response.content}
                <Actions>
                  <Action size="icon-sm" label="Copy" tooltip="Copy">
                    <IconCopy className="w-3 h-3" />
                  </Action>
                  <Action size="icon-sm" label="Download" tooltip="Download">
                    <IconDownload className="w-3 h-3" />
                  </Action>
                  <Action
                    size="icon-sm"
                    label="Explain Tool Call(s)"
                    tooltip="Explain Tool Call(s)"
                  >
                    <IconTool className="w-3 h-3" />
                  </Action>
                  <Action size="icon-sm" label="Retry" tooltip="Retry">
                    <IconRefresh className="w-3 h-3" />
                  </Action>
                  <MessageBranchSelector from="assistant" className="px-0">
                    <MessageBranchPrevious />
                    <MessageBranchPage />
                    <MessageBranchNext />
                  </MessageBranchSelector>
                </Actions>
              </MessageContent>
            </Message>
          ))}
        </MessageBranchContent>
      </MessageBranch>
    </div>
  );
}

export const actionsExamples: ComponentExamples = {
  basic: {
    title: 'Basic Actions',
    description: 'Action buttons for interacting with AI messages',
    component: BasicActionsDemo,
    difficulty: 'beginner',
    code: `"use client"

import { Actions, Action } from "@/components/ai-elements/cognite/actions"
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from "@/components/ai-elements/cognite/message"
import { IconCopy, IconDownload, IconTool, IconRefresh, IconWheel } from "@tabler/icons-react"

const assistantResponses = [
  { id: "1", content: "I'm doing great, thank you for asking! How can I assist you today?" },
  { id: "2", content: "I'm functioning optimally! Is there something specific you'd like help with?" },
  { id: "3", content: "All systems are running smoothly. What would you like to work on together?" },
]

export function BasicActionsDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          Hello, how are you?
        </MessageContent>
      </Message>

      <MessageBranch defaultBranch={0}>
        <MessageBranchContent>
          {assistantResponses.map((response) => (
            <Message isResponse={true} key={response.id}>
              <MessageAvatar variant="fjord">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                {response.content}
                <Actions>
                  <Action size="icon-sm" label="Copy" tooltip="Copy">
                    <IconCopy className="w-3 h-3" />
                  </Action>
                  <Action size="icon-sm" label="Download" tooltip="Download">
                    <IconDownload className="w-3 h-3" />
                  </Action>
                  <Action size="icon-sm" label="Explain Tool Call(s)" tooltip="Explain Tool Call(s)">
                    <IconTool className="w-3 h-3" />
                  </Action>
                  <Action size="icon-sm" label="Retry" tooltip="Retry">
                    <IconRefresh className="w-3 h-3" />
                  </Action>
                  <MessageBranchSelector from="assistant" className="px-0">
                    <MessageBranchPrevious />
                    <MessageBranchPage />
                    <MessageBranchNext />
                  </MessageBranchSelector>
                </Actions>
              </MessageContent>
            </Message>
          ))}
        </MessageBranchContent>
      </MessageBranch>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const actionsMeta = {
  name: 'Actions',
  description:
    'A row of composable action buttons for AI responses, including retry, like, dislike, copy, share, and custom actions.',
  importPath: '@/components/ai-elements/cognite/actions',
};
