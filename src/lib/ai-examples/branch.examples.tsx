'use client';

import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from '@/components/ui/aura/branch';
import {
  Message,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

const assistantResponses = [
  {
    id: '1',
    content:
      'According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period.',
  },
  {
    id: '2',
    content:
      'I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM.',
  },
  {
    id: '3',
    content:
      'The abnormal vibration pattern suggests potential bearing wear. Historical data shows similar patterns preceded maintenance events on comparable equipment.',
  },
];

function BranchDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          What&apos;s causing the abnormal vibration levels on pump 21PT1019?
        </MessageContent>
      </Message>

      <Branch defaultBranch={0}>
        <BranchMessages>
          {assistantResponses.map((response) => (
            <Message isResponse={true} key={response.id}>
              <MessageAvatar variant="nordic">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                {response.content}
                <MessageActions>
                  <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
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
                    label="Explain Tool Call(s)"
                    tooltip="Explain Tool Call(s)"
                  >
                    <IconTool className="w-3 h-3" />
                  </MessageAction>
                  <MessageAction
                    size="icon-sm"
                    label="Refresh"
                    tooltip="Refresh"
                  >
                    <IconRefresh className="w-3 h-3" />
                  </MessageAction>
                  <BranchSelector from="assistant" className="px-0">
                    <BranchPrevious />
                    <BranchPage />
                    <BranchNext />
                  </BranchSelector>
                </MessageActions>
              </MessageContent>
            </Message>
          ))}
        </BranchMessages>
      </Branch>
    </div>
  );
}

export const branchExamples: ComponentExamples = {
  basic: {
    title: 'Branch',
    description:
      'Navigate between multiple AI response variations using branch controls',
    component: BranchDemo,
    difficulty: 'beginner',
    code: `"use client"

import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "@/components/ai-elements/cognite/branch"
import {
  Message,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/cognite/message"
import { IconWheel, IconCopy, IconDownload, IconTool, IconRefresh } from "@tabler/icons-react"

const assistantResponses = [
  { id: "1", content: "According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period." },
  { id: "2", content: "I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM." },
  { id: "3", content: "The abnormal vibration pattern suggests potential bearing wear. Historical data shows similar patterns preceded maintenance events on comparable equipment." },
]

export function BranchDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          What's causing the abnormal vibration levels on pump 21PT1019?
        </MessageContent>
      </Message>

      <Branch defaultBranch={0}>
        <BranchMessages>
          {assistantResponses.map((response) => (
            <Message isResponse={true} key={response.id}>
              <MessageAvatar variant="nordic">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                {response.content}
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
                  <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
                    <IconRefresh className="w-3 h-3" />
                  </MessageAction>
                  <BranchSelector from="assistant" className="px-0">
                    <BranchPrevious />
                    <BranchPage />
                    <BranchNext />
                  </BranchSelector>
                </MessageActions>
              </MessageContent>
            </Message>
          ))}
        </BranchMessages>
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
  importPath: '@/components/ai-elements/cognite/branch',
};
