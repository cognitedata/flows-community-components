import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
} from '@/components/ui/cognite/message';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/cognite/inline-citation';
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
  IconDotsVertical,
} from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/cognite/dropdown-menu';
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '@/components/ui/cognite/code-block';

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

      <Message isResponse={true}>
        <MessageAvatar variant="fjord">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          According to the time series, vibration amplitude has been rising
          steadily since 03:00. The motor temperature also increased by 8°C over
          the same period. Would you like me to add this to the canvas?
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
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Settings" tooltip="Settings">
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MessageAction size="icon-sm" label="More options">
                  <IconDotsVertical className="w-3 h-3" />
                </MessageAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </MessageActions>
        </MessageContent>
      </Message>
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
        <MessageAvatar variant="fjord">
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
            <MessageAction size="icon-sm" label="Settings" tooltip="Settings">
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MessageAction size="icon-sm" label="More options">
                  <IconDotsVertical className="w-3 h-3" />
                </MessageAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
    code: `import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ui/cognite/message"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ui/cognite/inline-citation"
import { IconAt, IconFile, IconPhoto, IconTimeline, IconCopy, IconDownload, IconTool, IconRefresh, IconWheel, IconDotsVertical } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

export function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageAvatar avatarUrl="/user-avatar2.png" name="John Doe" />
        <MessageContent>
          <span>There are abnormal vibration levels on </span><InlineCitation><InlineCitationLink href="https://example.com/user/21PT1019" target="_blank" icon={IconAt} variant="nordic">21PT1019</InlineCitationLink></InlineCitation>
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="fjord">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          According to the time series, vibration amplitude has been rising
          steadily since 03:00. The motor temperature also increased by 8°C over
          the same period. Would you like me to add this to the canvas?
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
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Settings" tooltip="Settings">
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MessageAction size="icon-sm" label="More options">
                  <IconDotsVertical className="w-3 h-3" />
                </MessageAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </MessageActions>
        </MessageContent>
      </Message>
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
    code: `import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ui/cognite/message"
import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "@/components/ui/cognite/code-block"
import { IconWheel, IconCopy, IconDownload, IconTool, IconRefresh, IconDotsVertical } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

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
        <MessageAvatar variant="fjord">
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
            <MessageAction size="icon-sm" label="Like" tooltip="Like">
              <IconThumbUp className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Dislike" tooltip="Dislike">
              <IconThumbDown className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Share" tooltip="Share">
              <IconShare className="w-3 h-3" />
            </MessageAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <MessageAction size="icon-sm" label="More options">
                  <IconDotsVertical className="w-3 h-3" />
                </MessageAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
  importPath: '@/components/ui/cognite/message',
};
