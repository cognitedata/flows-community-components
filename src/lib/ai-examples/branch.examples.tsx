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
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconHash,
  IconFile,
  IconPhoto,
  IconTimeline,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

const assistantResponses = [
  {
    id: '1',
    content: (
      <>
        According to the time series, vibration amplitude has been rising
        steadily since 03:00. The motor temperature also increased by 8°C over
        the same period.
      </>
    ),
  },
  {
    id: '2',
    content: (
      <span>
        I analyzed the sensor data and found that vibration levels on{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/pump/21PT1019"
            target="_blank"
            icon={IconHash}
            variant="nordic"
          >
            21PT1019
          </InlineCitationLink>
        </InlineCitation>{' '}
        exceeded normal thresholds at 03:15. This correlates with a 12% increase
        in RPM.
      </span>
    ),
  },
  {
    id: '3',
    content: (
      <>
        The abnormal vibration pattern suggests potential bearing wear.
        Historical data shows similar patterns preceded maintenance events on
        comparable equipment.
      </>
    ),
  },
];

function BranchDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
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
            </InlineCitation>
            ?
          </span>
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
                <div className="flex flex-row gap-2">
                  <InlineCitation>
                    <InlineCitationLink
                      href="https://example.com/chart/timeline"
                      target="_blank"
                      icon={IconTimeline}
                    >
                      Time series
                    </InlineCitationLink>
                  </InlineCitation>
                  <InlineCitation>
                    <InlineCitationLink
                      href="https://example.com/image/pumpB.jpg"
                      target="_blank"
                      icon={IconPhoto}
                    >
                      pumpB.jpg
                    </InlineCitationLink>
                  </InlineCitation>
                  <InlineCitation>
                    <InlineCitationLink
                      href="https://example.com/documentation.pdf"
                      target="_blank"
                      icon={IconFile}
                    >
                      pumpB.pdf
                    </InlineCitationLink>
                  </InlineCitation>
                </div>
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
                    label="Retry"
                    tooltip="Retry"
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
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import { IconWheel, IconCopy, IconDownload, IconTool, IconRefresh, IconHash, IconFile, IconPhoto, IconTimeline } from "@tabler/icons-react"

const assistantResponses = [
  { id: "1", content: "According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period." },
  {
    id: "2",
    content: (
      <span>
        I analyzed the sensor data and found that vibration levels on{' '}
        <InlineCitation>
          <InlineCitationLink href="https://example.com/pump/21PT1019" target="_blank" icon={IconHash} variant="nordic">
            21PT1019
          </InlineCitationLink>
        </InlineCitation>
        {' '}exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM.
      </span>
    ),
  },
  { id: "3", content: "The abnormal vibration pattern suggests potential bearing wear. Historical data shows similar patterns preceded maintenance events on comparable equipment." },
]

export function BranchDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          <span>
            What's causing the abnormal vibration levels on pump{' '}
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
                <div className="flex flex-row gap-2">
                  <InlineCitation>
                    <InlineCitationLink href="https://example.com/chart/timeline" target="_blank" icon={IconTimeline}>
                      Time series
                    </InlineCitationLink>
                  </InlineCitation>
                  <InlineCitation>
                    <InlineCitationLink href="https://example.com/image/pumpB.jpg" target="_blank" icon={IconPhoto}>
                      pumpB.jpg
                    </InlineCitationLink>
                  </InlineCitation>
                  <InlineCitation>
                    <InlineCitationLink href="https://example.com/documentation.pdf" target="_blank" icon={IconFile}>
                      pumpB.pdf
                    </InlineCitationLink>
                  </InlineCitation>
                </div>
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
