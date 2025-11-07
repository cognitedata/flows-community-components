import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
} from "@/components/ai-elements/message";
import type { ComponentExamples } from "@/lib/component-examples/types";
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/inline-citation";
import {
  IconAt,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconThumbUp,
  IconThumbDown,
  IconCopy,
  IconShare,
  IconDotsVertical,
  IconWheel,
} from "@tabler/icons-react";
import { Actions, Action } from "@/components/ai-elements/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu";

function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message from="user">
        <MessageContent>
          <span>There are abnormal vibration levels on </span>
          <InlineCitation>
            <InlineCitationLink
              url="https://example.com/user/21PT1019"
              target="_blank"
              icon={IconAt}
            >
              21PT1019
            </InlineCitationLink>
          </InlineCitation>
        </MessageContent>
        <MessageAvatar src="/user-avatar2.png" name="John Doe" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          According to the time series, vibration amplitude has been rising
          steadily since 03:00. The motor temperature also increased by 8°C over
          the same period. Would you like me to add this to the canvas?
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/documentation.pdf"
                target="_blank"
                icon={IconFile}
              >
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <Actions>
            <Action size="icon-sm" label="Like" tooltip="Like">
              <IconThumbUp className="w-3 h-3" />
            </Action>
            <Action size="icon-sm" label="Dislike" tooltip="Dislike">
              <IconThumbDown className="w-3 h-3" />
            </Action>
            <Action size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </Action>
            <Action size="icon-sm" label="Share" tooltip="Share">
              <IconShare className="w-3 h-3" />
            </Action>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Action size="icon-sm" label="More options">
                  <IconDotsVertical className="w-3 h-3" />
                </Action>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Actions>
        </MessageContent>
        <MessageAvatar variant="fjord">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
      </Message>
    </div>
  );
}

export const messageExamples: ComponentExamples = {
  contained: {
    title: "Message",
    description:
      "Messages with background containers for clear visual separation",
    component: Demo,
    difficulty: "beginner",
    code: `import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import { IconAt, IconFile, IconPhoto, IconTimeline, IconThumbUp, IconThumbDown, IconCopy, IconShare, IconDotsVertical, IconWheel } from "@tabler/icons-react"
import { Actions, Action } from "@/components/ai-elements/cognite/actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

export function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message from="user">
        <MessageContent>
          <span>There are abnormal vibration levels on </span><InlineCitation><InlineCitationLink url="https://example.com/user/21PT1019" target="_blank" icon={IconAt}>21PT1019</InlineCitationLink></InlineCitation>
        </MessageContent>
        <MessageAvatar src="/user-avatar2.png" name="John Doe" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period. Would you like me to add this to the canvas?
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/documentation.pdf"
                target="_blank"
                icon={IconFile}
              >
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <Actions>
            <Action size="icon-sm" label="Like" tooltip="Like">
              <IconThumbUp className="w-3 h-3" />
            </Action>
            <Action size="icon-sm" label="Dislike" tooltip="Dislike">
              <IconThumbDown className="w-3 h-3" />
            </Action>
            <Action size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </Action>
            <Action size="icon-sm" label="Share" tooltip="Share">
              <IconShare className="w-3 h-3" />
            </Action>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Action size="icon-sm" label="More options">
                  <IconDotsVertical className="w-3 h-3" />
                </Action>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Option 1</DropdownMenuItem>
                <DropdownMenuItem>Option 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Actions>
        </MessageContent>
        <MessageAvatar variant="fjord">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
      </Message>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const messageMeta = {
  name: "Message",
  description: "Displays a chat interface message from either a user or an AI.",
  importPath: "@/components/ai-elements/cognite/message",
};
