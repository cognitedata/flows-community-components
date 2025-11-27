'use client';

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from '@/components/ui/aura/branch';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconAt,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconWheel,
} from '@tabler/icons-react';
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';

const assistantResponses = [
  {
    id: '1',
    content:
      'According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period. Would you like me to add this to the canvas?',
  },
  {
    id: '2',
    content:
      'I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.',
  },
  {
    id: '3',
    content:
      'The abnormal vibration pattern suggests potential bearing wear. Historical data shows similar patterns preceded maintenance events on comparable equipment.',
  },
];

function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          <span>There are abnormal vibration levels on </span>
          <InlineCitation>
            <InlineCitationLink
              href="https://example.com/user/21PT1019"
              target="_blank"
              icon={IconAt}
              variant="nordic"
            >
              21PT1019
            </InlineCitationLink>
          </InlineCitation>
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
                      href="https://example.com/image/image1.jpg"
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

function WithCodeBlockDemo() {
  const code = `async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);

  return anomalies.filter(a => a.severity > 0.8);
}`;

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          Can you show me how to analyze vibration data using TypeScript?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <CodeBlock
            code={code}
            language="typescript"
            showLineNumbers
            className="-mt-1"
          >
            <CodeBlockCopyButton />
            <CodeBlockCollapseButton />
          </CodeBlock>
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
            <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

export const messageExamples: ComponentExamples = {
  contained: {
    title: 'Message',
    description:
      'Messages with background containers for clear visual separation',
    component: Demo,
    difficulty: 'beginner',
    code: `"use client"

import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ui/aura/message"
import {
  Branch,
  BranchMessages,
  BranchSelector,
  BranchPrevious,
  BranchNext,
  BranchPage,
} from "@/components/ui/aura/branch"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ui/aura/inline-citation"
import { IconAt, IconFile, IconPhoto, IconTimeline, IconCopy, IconDownload, IconTool, IconRefresh, IconWheel } from "@tabler/icons-react"

const assistantResponses = [
  { id: "1", content: "According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period. Would you like me to add this to the canvas?" },
  { id: "2", content: "I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window." },
  { id: "3", content: "The abnormal vibration pattern suggests potential bearing wear. Historical data shows similar patterns preceded maintenance events on comparable equipment." },
]

export function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          <span>There are abnormal vibration levels on </span><InlineCitation><InlineCitationLink href="https://example.com/user/21PT1019" target="_blank" icon={IconAt} variant="nordic">21PT1019</InlineCitationLink></InlineCitation>
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
                    <InlineCitationLink href="https://example.com/image/image1.jpg" target="_blank" icon={IconPhoto}>
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

  withCodeBlock: {
    title: 'Message with Code Block',
    description:
      'Assistant message containing a code block with syntax highlighting',
    component: WithCodeBlockDemo,
    difficulty: 'beginner',
    code: `import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ui/aura/message"
import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "@/components/ui/aura/code-block"
import { IconWheel, IconCopy, IconDownload, IconTool, IconRefresh } from "@tabler/icons-react"

export function WithCodeBlockDemo() {
  const code = \`async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);

  return anomalies.filter(a => a.severity > 0.8);
}\`

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          Can you show me how to analyze vibration data using TypeScript?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <CodeBlock
            code={code}
            language="typescript"
            showLineNumbers
            className="-mt-1"
          >
            <CodeBlockCopyButton />
            <CodeBlockCollapseButton />
          </CodeBlock>
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
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const messageMeta = {
  name: 'Message',
  description: 'Displays a chat interface message from either a user or an AI.',
  importPath: '@/components/ui/aura/message',
};
