import { Actions, Action } from "@/components/ai-elements/actions";
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
} from "@/components/ai-elements/message";
import {
  IconThumbUp,
  IconThumbDown,
  IconCopy,
  IconShare,
  IconWheel,
  IconDotsVertical,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicActionsDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message from="user">
        <MessageContent>Hello, how are you?</MessageContent>
        <MessageAvatar src="/user-avatar2.png" name="User" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          I am fine, thank you!
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

function ActionsWithLabelsDemo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message from="user">
        <MessageContent>What is React?</MessageContent>
        <MessageAvatar src="/user-avatar2.png" name="User" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          React is a JavaScript library for building user interfaces. It&apos;s
          declarative, efficient, and flexible.
          <Actions>
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

export const actionsExamples: ComponentExamples = {
  basic: {
    title: "Basic Actions",
    description: "Action buttons for interacting with AI messages",
    component: BasicActionsDemo,
    difficulty: "beginner",
    code: `import { Actions, Action } from "@/components/ai-elements/cognite/actions"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message"
import { IconThumbUp, IconThumbDown, IconCopy, IconShare, IconWheel, IconDotsVertical } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

export function BasicActionsDemo() {
    return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message from="user">
        <MessageContent>
          Hello, how are you?
        </MessageContent>
        <MessageAvatar src="/user-avatar2.png" name="User" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          I am fine, thank you!
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

  withLabels: {
    title: "Actions with Different Icons",
    description: "Actions with copy, share, and more options buttons",
    component: ActionsWithLabelsDemo,
    difficulty: "beginner",
    code: `import { Actions, Action } from "@/components/ai-elements/cognite/actions"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message"
import { IconCopy, IconShare, IconWheel, IconDotsVertical } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

export function ActionsWithLabelsDemo() {
    return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message from="user">
        <MessageContent>
          What is React?
        </MessageContent>
        <MessageAvatar src="/user-avatar2.png" name="User" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          React is a JavaScript library for building user interfaces.
          <Actions>
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
export const actionsMeta = {
  name: "Actions",
  description:
    "A row of composable action buttons for AI responses, including retry, like, dislike, copy, share, and custom actions.",
  importPath: "@/components/ai-elements/cognite/actions",
};
