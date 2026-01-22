import { Message, MessageAvatar, MessageContent } from "@/components/ui/aura/message";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Conversation, ConversationContent, ConversationEmptyState } from "./conversation";

const meta: Meta<typeof Conversation> = {
  title: "AI/Conversation",
  component: Conversation,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        className="h-[400px] w-full"
        style={{ "--message-content-max-width": "500px" } as React.CSSProperties}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Conversation>;

/**
 * Empty conversation state.
 */
export const EmptyState: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <ConversationEmptyState
          title="Start a conversation"
          description="Ask me anything and I'll do my best to help."
        />
      </ConversationContent>
    </Conversation>
  ),
  parameters: {
    docs: {
      description: {
        story: "Conversation with empty state when no messages exist.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Start a conversation");
    await expect(title).toBeInTheDocument();
  },
};

/**
 * Conversation with messages.
 */
export const WithMessages: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <Message isResponse={false}>
          <MessageAvatar name="User" />
          <MessageContent>
            <p>How do I create a React component?</p>
          </MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar name="AI" />
          <MessageContent>
            <p>
              To create a React component, you can use either a function component or a class
              component. Function components are recommended for most use cases.
            </p>
          </MessageContent>
        </Message>
        <Message isResponse={false}>
          <MessageAvatar name="User" />
          <MessageContent>
            <p>Can you show me an example?</p>
          </MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar name="AI" />
          <MessageContent>
            <p>Here&apos;s a simple function component example:</p>
            <pre className="bg-muted p-2 rounded-md text-xs mt-2">
              {`function MyComponent({ name }) {
  return <div>Hello, {name}!</div>;
}`}
            </pre>
          </MessageContent>
        </Message>
      </ConversationContent>
    </Conversation>
  ),
  parameters: {
    docs: {
      description: {
        story: "Conversation with multiple messages.",
      },
    },
  },
};

/**
 * Custom empty state title.
 */
export const CustomEmptyState: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <ConversationEmptyState
          title="Welcome to Support Chat"
          description="How can we help you today?"
        >
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground"
            >
              Get Started
            </button>
            <button type="button" className="px-3 py-1.5 text-sm rounded-md border">
              View FAQ
            </button>
          </div>
        </ConversationEmptyState>
      </ConversationContent>
    </Conversation>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom empty state with action buttons.",
      },
    },
  },
};

/**
 * Long conversation.
 */
export const LongConversation: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-4">
            <Message isResponse={false}>
              <MessageAvatar name="User" />
              <MessageContent>
                <p>Message {i} from user</p>
              </MessageContent>
            </Message>
            <Message isResponse={true}>
              <MessageAvatar name="AI" />
              <MessageContent>
                <p>
                  Response {i} from assistant. This is a longer response to demonstrate how the
                  conversation handles multiple messages and scrolling.
                </p>
              </MessageContent>
            </Message>
          </div>
        ))}
      </ConversationContent>
    </Conversation>
  ),
  parameters: {
    docs: {
      description: {
        story: "Long conversation with many messages (auto-scrolls to bottom).",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="h-[300px]">
      <Conversation>
        <ConversationContent>
          <Message isResponse={false}>
            <MessageAvatar name="User" />
            <MessageContent>
              <p>Test message</p>
            </MessageContent>
          </Message>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Test response</p>
            </MessageContent>
          </Message>
        </ConversationContent>
      </Conversation>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Conversation for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  render: () => (
    <Conversation>
      <ConversationContent>
        <ConversationEmptyState
          title="Playground Conversation"
          description="This is an interactive playground for the Conversation component."
        />
      </ConversationContent>
    </Conversation>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive conversation example.",
      },
    },
  },
};
