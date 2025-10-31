import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/cognite/conversation";
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message";
import { MessageSquare } from "lucide-react";
import { IconWheel } from "@tabler/icons-react";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicConversationDemo() {
  return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <Message from="user">
            <MessageAvatar src="/user-avatar2.png" name="User" />
            <MessageContent>
              What&apos;s the weather like today?
            </MessageContent>
          </Message>

          <Message from="assistant">
            <MessageAvatar variant="fjord">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
          <MessageContent>
            I don&apos;t have real-time weather information, but I can help you with other questions!
          </MessageContent>
          </Message>
        </ConversationContent>
      </Conversation>
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <ConversationEmptyState
            title="Start a conversation"
            description="Ask me anything to get started"
            icon={<MessageSquare className="h-12 w-12" />}
          />
        </ConversationContent>
      </Conversation>
    </div>
  );
}

export const conversationExamples: ComponentExamples = {
  basic: {
    title: "Basic Conversation",
    description: "A conversation container with messages",
    component: BasicConversationDemo,
    difficulty: "beginner",
    code: `import { Conversation, ConversationContent } from "@/components/ai-elements/cognite/conversation"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/cognite/message"

export function BasicConversationDemo() {
  return (
    <Conversation>
      <ConversationContent>
        <Message from="user">
          <MessageAvatar src="/user-avatar2.png" name="User" />
          <MessageContent>
            What&apos;s the weather like today?
          </MessageContent>
        </Message>

        <Message from="assistant">
          <MessageAvatar variant="fjord">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent>
            I can help you with other questions!
          </MessageContent>
        </Message>
      </ConversationContent>
    </Conversation>
  )
}`,
  },

  emptyState: {
    title: "Empty State",
    description: "Show a placeholder when there are no messages",
    component: EmptyStateDemo,
    difficulty: "beginner",
    code: `import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/cognite/conversation"
import { MessageSquare } from "lucide-react"

export function EmptyStateDemo() {
  return (
    <Conversation>
      <ConversationContent>
        <ConversationEmptyState
          title="Start a conversation"
          description="Ask me anything to get started"
          icon={<MessageSquare className="h-12 w-12" />}
        />
      </ConversationContent>
    </Conversation>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const conversationMeta = {
  name: "Conversation",
  description: "Wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
  importPath: "@/components/ai-elements/draft/conversation",
};
