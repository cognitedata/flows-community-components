import { Actions, Action } from "@/components/ai-elements/cognite/actions";
import { Conversation, ConversationContent } from "@/components/ai-elements/cognite/conversation";
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message";
import { IconThumbUp, IconThumbDown, IconCopy, IconRotateClockwise, IconShare, IconWheel } from "@tabler/icons-react";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicActionsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar2.png" name="User" />
            <MessageContent>
              Hello, how are you?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar variant="fjord">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent>
              I am fine, thank you!
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <IconRotateClockwise className="w-3 h-3" />
              </Action>
              <Action label="Like" tooltip="Like">
                <IconThumbUp className="w-3 h-3" />
              </Action>
              <Action label="Dislike" tooltip="Dislike">
                <IconThumbDown className="w-3 h-3" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </Action>
              <Action label="Share" tooltip="Share">
                <IconShare className="w-3 h-3" />
              </Action>
            </Actions>
          </Message>
        </ConversationContent>
      </Conversation>
    </div>
  );
}

function ActionsWithLabelsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar2.png" name="User" />
            <MessageContent>
              What is React?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar variant="fjord">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent>
              React is a JavaScript library for building user interfaces. It&apos;s declarative, efficient, and flexible.
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <IconRotateClockwise className="w-3 h-3" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </Action>
              <Action label="Share" tooltip="Share">
                <IconShare className="w-3 h-3" />
              </Action>
            </Actions>
          </Message>
        </ConversationContent>
      </Conversation>
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
import { Conversation, ConversationContent } from "@/components/ai-elements/cognite/conversation"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message"
import { IconThumbUp, IconThumbDown, IconCopy, IconRotateClockwise, IconShare, IconWheel } from "@tabler/icons-react"

export function BasicActionsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar2.png" name="User" />
            <MessageContent>
              Hello, how are you?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar variant="fjord">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent>
              I am fine, thank you!
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <IconRotateClockwise className="w-3 h-3" />
              </Action>
              <Action label="Like" tooltip="Like">
                <IconThumbUp className="w-3 h-3" />
              </Action>
              <Action label="Dislike" tooltip="Dislike">
                <IconThumbDown className="w-3 h-3" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </Action>
              <Action label="Share" tooltip="Share">
                <IconShare className="w-3 h-3" />
              </Action>
            </Actions>
          </Message>
        </ConversationContent>
      </Conversation>
    </div>
  )
}`,
  },

  withLabels: {
    title: "Actions with Different Icons",
    description: "Actions with retry, copy, and share buttons",
    component: ActionsWithLabelsDemo,
    difficulty: "beginner",
    code: `import { Actions, Action } from "@/components/ai-elements/cognite/actions"
import { Conversation, ConversationContent } from "@/components/ai-elements/cognite/conversation"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message"
import { IconCopy, IconRotateClockwise, IconShare, IconWheel } from "@tabler/icons-react"

export function ActionsWithLabelsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar2.png" name="User" />
            <MessageContent>
              What is React?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar variant="fjord">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent>
              React is a JavaScript library for building user interfaces.
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <IconRotateClockwise className="w-3 h-3" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </Action>
              <Action label="Share" tooltip="Share">
                <IconShare className="w-3 h-3" />
              </Action>
            </Actions>
          </Message>
        </ConversationContent>
      </Conversation>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const actionsMeta = {
  name: "Actions",
  description: "A row of composable action buttons for AI responses, including retry, like, dislike, copy, share, and custom actions.",
  importPath: "@/components/ai-elements/draft/actions",
};
