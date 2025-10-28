import { Actions, Action } from "@/components/ai-elements/cognite/actions";
import { Conversation, ConversationContent } from "@/components/ai-elements/cognite/conversation";
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message";
import { Copy, ThumbsUp, ThumbsDown, RotateCw, Share2 } from "lucide-react";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicActionsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar.png" name="User" />
            <MessageContent variant="contained">
              Hello, how are you?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar src="/aura-logo.png" name="AI" />
            <MessageContent variant="contained">
              I am fine, thank you!
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <RotateCw className="h-4 w-4" />
              </Action>
              <Action label="Like" tooltip="Like">
                <ThumbsUp className="h-4 w-4" />
              </Action>
              <Action label="Dislike" tooltip="Dislike">
                <ThumbsDown className="h-4 w-4" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <Copy className="h-4 w-4" />
              </Action>
              <Action label="Share" tooltip="Share">
                <Share2 className="h-4 w-4" />
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
            <MessageAvatar src="/user-avatar.png" name="User" />
            <MessageContent variant="contained">
              What is React?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar src="/aura-logo.png" name="AI" />
            <MessageContent variant="contained">
              React is a JavaScript library for building user interfaces. It&apos;s declarative, efficient, and flexible.
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <RotateCw className="h-4 w-4" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <Copy className="h-4 w-4" />
              </Action>
              <Action label="Share" tooltip="Share">
                <Share2 className="h-4 w-4" />
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
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message"
import { Copy, ThumbsUp, ThumbsDown, RotateCw, Share2 } from "lucide-react"

export function BasicActionsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar.png" name="User" />
            <MessageContent variant="contained">
              Hello, how are you?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar src="/aura-logo.png" name="AI" />
            <MessageContent variant="contained">
              I am fine, thank you!
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <RotateCw className="h-4 w-4" />
              </Action>
              <Action label="Like" tooltip="Like">
                <ThumbsUp className="h-4 w-4" />
              </Action>
              <Action label="Dislike" tooltip="Dislike">
                <ThumbsDown className="h-4 w-4" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <Copy className="h-4 w-4" />
              </Action>
              <Action label="Share" tooltip="Share">
                <Share2 className="h-4 w-4" />
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
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message"
import { Copy, RotateCw, Share2 } from "lucide-react"

export function ActionsWithLabelsDemo() {
    return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar.png" name="User" />
            <MessageContent variant="contained">
              What is React?
            </MessageContent>
          </Message>

          <Message from="assistant" className="flex flex-col gap-2 items-start">
            <MessageAvatar src="/aura-logo.png" name="AI" />
            <MessageContent variant="contained">
              React is a JavaScript library for building user interfaces.
            </MessageContent>
            <Actions className="mt-2">
              <Action label="Retry" tooltip="Retry">
                <RotateCw className="h-4 w-4" />
              </Action>
              <Action label="Copy" tooltip="Copy">
                <Copy className="h-4 w-4" />
              </Action>
              <Action label="Share" tooltip="Share">
                <Share2 className="h-4 w-4" />
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
