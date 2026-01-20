import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Message, MessageAvatar, MessageContent } from "./message";

const meta: Meta<typeof Message> = {
  title: "AI/Message",
  component: Message,
  tags: ["autodocs"],
  argTypes: {
    isResponse: {
      control: "boolean",
      description: "Whether the message is from the AI assistant",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        className="w-[600px]"
        style={{ "--message-content-max-width": "500px" } as React.CSSProperties}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Message>;

/**
 * User message.
 */
export const UserMessage: Story = {
  render: () => (
    <Message isResponse={false}>
      <MessageAvatar name="User" />
      <MessageContent>
        <p>Hello! How can I get started with this project?</p>
      </MessageContent>
    </Message>
  ),
  parameters: {
    docs: {
      description: {
        story: "Message from the user.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector(".is-user");
    await expect(message).toBeInTheDocument();
  },
};

/**
 * Assistant response.
 */
export const AssistantMessage: Story = {
  render: () => (
    <Message isResponse={true}>
      <MessageAvatar name="AI Assistant" />
      <MessageContent>
        <p>
          Welcome! To get started, you can install the package using npm or yarn. First, run the
          installation command in your project directory.
        </p>
      </MessageContent>
    </Message>
  ),
  parameters: {
    docs: {
      description: {
        story: "Message from the AI assistant.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector(".is-assistant");
    await expect(message).toBeInTheDocument();
  },
};

/**
 * Conversation with multiple messages.
 */
export const Conversation: Story = {
  render: () => (
    <div className="space-y-2">
      <Message isResponse={false}>
        <MessageAvatar name="User" />
        <MessageContent>
          <p>Can you help me write a function to sort an array?</p>
        </MessageContent>
      </Message>
      <Message isResponse={true}>
        <MessageAvatar name="AI" />
        <MessageContent>
          <p>
            Of course! Here&apos;s a simple sorting function using JavaScript&apos;s built-in sort
            method:
          </p>
          <pre className="bg-muted p-2 rounded-md text-sm mt-2">
            {`function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}`}
          </pre>
        </MessageContent>
      </Message>
      <Message isResponse={false}>
        <MessageAvatar name="User" />
        <MessageContent>
          <p>Thanks! Can you explain how it works?</p>
        </MessageContent>
      </Message>
      <Message isResponse={true}>
        <MessageAvatar name="AI" />
        <MessageContent>
          <p>
            The sort method takes a comparison function that determines the order. The function (a,
            b) =&gt; a - b returns a negative number if a should come before b, a positive number if
            b should come before a, and zero if they&apos;re equal.
          </p>
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A conversation thread with multiple messages.",
      },
    },
  },
};

/**
 * Message with avatar image.
 */
export const WithAvatarImage: Story = {
  render: () => (
    <div className="space-y-2">
      <Message isResponse={false}>
        <MessageAvatar name="John Doe" avatarUrl="https://avatar.vercel.sh/john" />
        <MessageContent>
          <p>This message has a custom avatar image.</p>
        </MessageContent>
      </Message>
      <Message isResponse={true}>
        <MessageAvatar name="AI Assistant" />
        <MessageContent>
          <p>And this is a response with a fallback avatar.</p>
        </MessageContent>
      </Message>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Messages with custom avatar images.",
      },
    },
  },
};

/**
 * Long message content.
 */
export const LongMessage: Story = {
  render: () => (
    <Message isResponse={true}>
      <MessageAvatar name="AI" />
      <MessageContent>
        <p>
          This is a longer message that demonstrates how the component handles multiple paragraphs
          and extended content. The message component is designed to gracefully handle various
          content lengths while maintaining readability.
        </p>
        <p className="mt-2">
          Here&apos;s another paragraph to show the spacing between multiple blocks of text. This
          helps users read longer responses more easily.
        </p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>First point about something important</li>
          <li>Second point with more details</li>
          <li>Third point to complete the list</li>
        </ul>
      </MessageContent>
    </Message>
  ),
  parameters: {
    docs: {
      description: {
        story: "A longer message with multiple paragraphs and a list.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      {/* User message */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">User</h3>
        <Message isResponse={false}>
          <MessageAvatar name="User" />
          <MessageContent>
            <p>User message content</p>
          </MessageContent>
        </Message>
      </div>

      {/* Assistant message */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Assistant</h3>
        <Message isResponse={true}>
          <MessageAvatar name="AI" />
          <MessageContent>
            <p>Assistant response content</p>
          </MessageContent>
        </Message>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Messages for visual regression testing.",
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
  args: {
    isResponse: false,
  },
  render: (args) => (
    <Message {...args}>
      <MessageAvatar name={args.isResponse ? "AI" : "User"} />
      <MessageContent>
        <p>
          This is a sample message. Toggle isResponse to switch between user and assistant styling.
        </p>
      </MessageContent>
    </Message>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with message props.",
      },
    },
  },
};
