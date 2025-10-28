import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message";
import type { ComponentExamples } from "@/lib/component-examples/types";

function ContainedVariantDemo() {
  return (
    <div className="space-y-4 max-w-3xl">
      <Message from="user">
        <MessageAvatar src="/user-avatar.png" name="User" />
        <MessageContent variant="contained">
          Hello! Can you help me with AI components?
        </MessageContent>
      </Message>

      <Message from="assistant">
        <MessageAvatar src="/aura-logo.png" name="AI" />
        <MessageContent variant="contained">
          Of course! I&apos;d be happy to help you understand AI components. What would you like to know?
        </MessageContent>
      </Message>
    </div>
  );
}

function FlatVariantDemo() {
  return (
    <div className="space-y-4 max-w-3xl">
      <Message from="user">
        <MessageAvatar src="/user-avatar.png" name="User" />
        <MessageContent variant="flat">
          Can you explain how the flat variant works?
        </MessageContent>
      </Message>

      <Message from="assistant">
        <MessageAvatar src="/aura-logo.png" name="AI" />
        <MessageContent variant="flat">
          The flat variant provides a more minimalist style with less visual separation between messages.
        </MessageContent>
      </Message>
    </div>
  );
}

export const messageExamples: ComponentExamples = {
  contained: {
    title: "Contained Message Variant",
    description: "Messages with background containers for clear visual separation",
    component: ContainedVariantDemo,
    difficulty: "beginner",
    code: `import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message"

export function ContainedVariantDemo() {
  return (
    <div className="space-y-4">
      <Message from="user">
        <MessageAvatar src="/user-avatar.png" name="User" />
        <MessageContent variant="contained">
          Hello! Can you help me with AI components?
        </MessageContent>
      </Message>

      <Message from="assistant">
        <MessageAvatar src="/aura-logo.png" name="AI" />
        <MessageContent variant="contained">
          Of course! I&apos;d be happy to help you.
        </MessageContent>
      </Message>
    </div>
  )
}`,
  },

  flat: {
    title: "Flat Message Variant",
    description: "Minimal style messages without heavy background styling",
    component: FlatVariantDemo,
    difficulty: "beginner",
    code: `import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message"

export function FlatVariantDemo() {
  return (
    <div className="space-y-4">
      <Message from="user">
        <MessageAvatar src="/user-avatar.png" name="User" />
        <MessageContent variant="flat">
          Can you explain how the flat variant works?
        </MessageContent>
      </Message>

      <Message from="assistant">
        <MessageAvatar src="/aura-logo.png" name="AI" />
        <MessageContent variant="flat">
          The flat variant provides a more minimalist style.
        </MessageContent>
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
