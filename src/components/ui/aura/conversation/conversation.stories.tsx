import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "./conversation";
import { Message, MessageContent, MessageAvatar } from "@/components/ui/aura/message";
import { Suggestion } from "@/components/ui/aura/suggestion";
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  usePromptInputController,
} from "@/components/ui/aura/prompt-input";
import { IconAdjustments } from "@tabler/icons-react";

const meta: Meta<typeof Conversation> = {
  title: "AI/Conversation",
  component: Conversation,
  tags: ["autodocs"],
  argTypes: {
    // Display & behavior
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
      table: {
        category: "Display",
      },
    },
    initial: {
      control: "select",
      options: ["smooth", "instant", "auto"],
      description: "Initial scroll behavior when component mounts",
      table: {
        category: "Display",
        type: { summary: '"smooth" | "instant" | "auto"' },
        defaultValue: { summary: '"smooth"' },
      },
    },
    resize: {
      control: "select",
      options: ["smooth", "instant", "auto"],
      description: "Scroll behavior when content resizes",
      table: {
        category: "Display",
        type: { summary: '"smooth" | "instant" | "auto"' },
        defaultValue: { summary: '"smooth"' },
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    actions: {
      handles: [],
    },
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
            <button type="button" className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground">
              Get Started
            </button>
            <button type="button" className="px-3 py-1.5 text-sm rounded-md border">View FAQ</button>
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
 * Conversation with scroll button visible when scrolled up.
 * Demonstrates Conversation, ConversationEmptyState, and ConversationScrollButton.
 */
export const WithScrollButton: Story = {
  render: () => (
    <div className="h-[600px] w-full border rounded-lg">
      <Conversation className="h-full">
        <ConversationContent>
          <ConversationEmptyState title="Start a conversation with Atlas">
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Content area 1</p>
              </div>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Content area 2</p>
              </div>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Content area 3</p>
              </div>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Content area 4</p>
              </div>
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Content area 5</p>
              </div>
            </div>
          </ConversationEmptyState>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Conversation with enough content to enable scrolling. The scroll button appears when not at the bottom and scrolls to bottom when clicked.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conversation = canvas.getByRole("log");
    await expect(conversation).toBeInTheDocument();

    // Scroll up to trigger scroll button
    conversation.scrollTop = 100;
    
    // Trigger scroll event to update the scroll button state
    conversation.dispatchEvent(new Event("scroll", { bubbles: true }));
    
    await waitFor(
      () => {
        const buttons = canvas.queryAllByRole("button");
        expect(buttons.length).toBeGreaterThan(0);
      },
      { timeout: 1000 }
    );

    // Click scroll button to scroll to bottom
    const scrollButton = canvas.getByRole("button");
    await expect(scrollButton).toBeInTheDocument();
    await userEvent.click(scrollButton);

    // Wait for scroll to complete
    await waitFor(
      () => {
        const isAtBottom = conversation.scrollTop >= conversation.scrollHeight - conversation.clientHeight - 10;
        expect(isAtBottom).toBe(true);
      },
      { timeout: 1000 }
    );
  },
};

/**
 * Empty state with suggestions that auto-submit as user messages when clicked.
 */
export const EmptyStateWithAutoSubmit: Story = {
  render: function EmptyStateWithAutoSubmitStory() {
    const [submitted, setSubmitted] = useState(false);
    const [userMessage, setUserMessage] = useState("");

    const handleSuggestion = (value: string) => {
      setUserMessage(value);
      setSubmitted(true);
    };

    return (
      <div className="h-[900px] w-full border rounded-lg flex flex-col">
        <Conversation className="flex-1 min-h-0">
          <ConversationContent>
            {!submitted ? (
              <ConversationEmptyState title="Start a conversation with Atlas">
                <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
                  <Suggestion
                    suggestion="Are there any anomalies, risks, or non-conformances identified?"
                    onClick={handleSuggestion}
                    className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                  />
                  <Suggestion
                    suggestion="What asset or equipment is being evaluated and what is its operational context?"
                    onClick={handleSuggestion}
                    className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                  />
                  <Suggestion
                    suggestion="What are the current field conditions and observations recorded?"
                    onClick={handleSuggestion}
                    className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                  />
                </div>
              </ConversationEmptyState>
            ) : (
              <Message>
                <MessageContent>
                  <span>{userMessage}</span>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t p-4">
          <PromptInputProvider>
            <PromptInput onSubmit={() => {}}>
              <PromptInputBody>
                <PromptInputTextarea placeholder="Ask about your assets..." />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputTools>
                  <PromptInputButton size="icon-sm">
                    <IconAdjustments />
                  </PromptInputButton>
                </PromptInputTools>
                <PromptInputSubmit />
              </PromptInputFooter>
            </PromptInput>
          </PromptInputProvider>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Empty state with suggestions that immediately submit and display as user messages when clicked. The empty state disappears and is replaced with the user message.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify empty state is visible
    const emptyStateTitle = canvas.getByText("Start a conversation with Atlas");
    await expect(emptyStateTitle).toBeInTheDocument();

    // Find and click a suggestion
    const suggestion = canvas.getByText(
      "Are there any anomalies, risks, or non-conformances identified?"
    );
    await expect(suggestion).toBeInTheDocument();
    await expect(suggestion).toBeVisible();

    // Click the suggestion
    await userEvent.click(suggestion);

    // Wait for empty state to disappear and message to appear
    await waitFor(
      () => {
        expect(emptyStateTitle).not.toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Verify user message appears
    const userMessage = canvas.getByText(
      "Are there any anomalies, risks, or non-conformances identified?"
    );
    await expect(userMessage).toBeInTheDocument();

    // Verify message is in a Message component
    const messageContent = userMessage.closest('[class*="message"]');
    await expect(messageContent).toBeInTheDocument();
  },
};

/**
 * Empty state with suggestions that fill the prompt input when clicked.
 */
function EmptyStateFillInputDemo() {
  const controller = usePromptInputController();

  const handleSuggestion = (value: string) => {
    controller.textInput.setInput(value);
  };

  return (
    <div className="h-[900px] w-full border rounded-lg flex flex-col">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          <ConversationEmptyState title="Start a conversation with Atlas">
            <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
              <Suggestion
                suggestion="Are there any anomalies, risks, or non-conformances identified?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
              <Suggestion
                suggestion="What asset or equipment is being evaluated and what is its operational context?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
              <Suggestion
                suggestion="What are the current field conditions and observations recorded?"
                onClick={handleSuggestion}
                className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
              />
            </div>
          </ConversationEmptyState>
        </ConversationContent>
      </Conversation>

      <div className="border-t p-4">
        <PromptInput onSubmit={() => {}}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask about your assets..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton size="icon-sm">
                <IconAdjustments />
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

export const EmptyStateWithFillInput: Story = {
  render: () => (
    <PromptInputProvider>
      <EmptyStateFillInputDemo />
    </PromptInputProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Empty state with suggestions that fill the prompt input when clicked. The empty state remains visible, and the suggestion text is populated into the input field below.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify empty state is visible
    const emptyStateTitle = canvas.getByText("Start a conversation with Atlas");
    await expect(emptyStateTitle).toBeInTheDocument();

    // Find the textarea
    const textarea = canvas.getByTestId("prompt-input-textarea");
    await expect(textarea).toBeInTheDocument();
    await expect(textarea).toHaveValue("");

    // Find and click a suggestion
    const suggestion = canvas.getByText(
      "What asset or equipment is being evaluated and what is its operational context?"
    );
    await expect(suggestion).toBeInTheDocument();
    await expect(suggestion).toBeVisible();

    // Click the suggestion
    await userEvent.click(suggestion);

    // Wait for textarea to be filled
    await waitFor(
      () => {
        expect(textarea).toHaveValue(
          "What asset or equipment is being evaluated and what is its operational context?"
        );
      },
      { timeout: 300 }
    );

    // Verify empty state is still visible
    await expect(emptyStateTitle).toBeInTheDocument();

    // Test keyboard interaction - focus should be on textarea after click
    await expect(textarea).toHaveFocus();
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
