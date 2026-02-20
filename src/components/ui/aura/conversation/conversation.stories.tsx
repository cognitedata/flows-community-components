import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { IconCopy, IconDownload, IconRefresh, IconTool, IconWheel } from '@tabler/icons-react';
import { useState } from 'react';

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from './conversation';

import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
} from '@/components/ui/aura/message';
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputController,
} from '@/components/ui/aura/prompt-input';
import { Suggestion } from '@/components/ui/aura/suggestion';
const meta: Meta<typeof Conversation> = {
  title: 'AI/Conversation',
  component: Conversation,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Display',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    initial: {
      control: false,
      table: {
        category: 'Behavior',
        type: {
          summary: 'ScrollBehavior',
        },
        defaultValue: {
          summary: 'smooth',
        },
      },
    },
    resize: {
      control: false,
      table: {
        category: 'Behavior',
        type: {
          summary: 'ScrollBehavior',
        },
        defaultValue: {
          summary: 'smooth',
        },
      },
    },
    role: {
      control: false,
      table: {
        category: 'Accessibility',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'log',
        },
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-150 w-full flex flex-col border rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Conversation>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conversationContainer = canvasElement.querySelector('[role="log"]');
    await expect(conversationContainer).toBeInTheDocument();
    const messages = canvasElement.querySelectorAll('[data-message]');
    await expect(messages.length).toBeGreaterThanOrEqual(8);
    const copyButtons = canvas.getAllByRole('button', {
      name: /copy/i,
    });
    await expect(copyButtons.length).toBeGreaterThan(0);
    const firstUserMessage = canvas.getByText(/What's the status of pump 21PT1019/i);
    await expect(firstUserMessage).toBeInTheDocument();
    const avatars = canvasElement.querySelectorAll('[data-slot="message-avatar"]');
    await expect(avatars.length).toBeGreaterThan(0);
    const scrollableContent = canvasElement.querySelector('[role="log"]');
    if (scrollableContent && scrollableContent.scrollHeight > scrollableContent.clientHeight) {
      scrollableContent.scrollTop = 0;
      await new Promise((resolve) => setTimeout(resolve, 100));
      const scrollButton = canvasElement.querySelector('button.rounded-full');
      if (scrollButton) {
        await expect(scrollButton).toBeInTheDocument();
        await expect(scrollButton).toBeVisible();
        await userEvent.click(scrollButton);
        await waitFor(
          async () => {
            const buttonAfterClick = canvasElement.querySelector('button.rounded-full');
            await expect(buttonAfterClick).not.toBeInTheDocument();
          },
          {
            timeout: 2000,
          }
        );
      }
    }
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false} data-message>
          <MessageContent>What's the status of pump 21PT1019?</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              Pump 21PT1019 is currently operational. Recent vibration readings show levels within
              normal parameters at 3.2 mm/s. Temperature is stable at 68°C.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>

        <Message isResponse={false} data-message>
          <MessageContent>Can you check the maintenance history?</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              The last scheduled maintenance was performed on 15 November 2024. The next maintenance
              is scheduled for 15 February 2025. All previous inspections have shown normal wear
              patterns.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Download" tooltip="Download">
                <IconDownload className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>

        <Message isResponse={false} data-message>
          <MessageContent>Show me the vibration trend over the last week</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              Vibration levels have remained stable over the past week, averaging 3.1 mm/s with a
              peak of 3.4 mm/s on 16 January at 14:30. All readings are well below the warning
              threshold of 4.0 mm/s.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Download" tooltip="Download">
                <IconDownload className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>

        <Message isResponse={false} data-message>
          <MessageContent>Are there any similar pumps showing issues?</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              Two similar pumps in the same section (21PT1020 and 21PT1021) are showing elevated
              vibration levels. 21PT1020 is at 5.2 mm/s (warning threshold exceeded) and 21PT1021 is
              at 4.8 mm/s. I recommend scheduling inspections for both units.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Tools" tooltip="Tools">
                <IconTool className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>

        <Message isResponse={false} data-message>
          <MessageContent>Create a maintenance work order for those two pumps</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              I've created maintenance work orders WO-2025-0142 and WO-2025-0143 for pumps 21PT1020
              and 21PT1021 respectively. Both are marked as priority due to the elevated vibration
              levels. The maintenance team has been notified.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Download" tooltip="Download">
                <IconDownload className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};
export const EmptyState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conversationContainer = canvasElement.querySelector('[role="log"]');
    await expect(conversationContainer).toBeInTheDocument();
    const title = canvas.getByText('Start a conversation');
    await expect(title).toBeInTheDocument();
    await expect(title.tagName).toBe('H3');
    const description = canvas.getByText(/Ask me anything about your industrial equipment/i);
    await expect(description).toBeInTheDocument();
    const messages = canvasElement.querySelectorAll('[data-message]');
    await expect(messages.length).toBe(0);
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <ConversationEmptyState
          title="Start a conversation"
          description="Ask me anything about your industrial equipment and I'll do my best to help."
        />
      </ConversationContent>
    </Conversation>
  ),
};
export const SuggestionsAutoSubmit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const suggestions = canvas.getAllByRole('button');
    await expect(suggestions.length).toBeGreaterThanOrEqual(3);
    await userEvent.click(suggestions[0]);
    await waitFor(
      async () => {
        const messages = canvasElement.querySelectorAll('[data-message]');
        await expect(messages.length).toBeGreaterThanOrEqual(1);
      },
      {
        timeout: 1000,
      }
    );
  },
  render: () => {
    const SuggestionsAutoSubmitDemo = () => {
      const [submitted, setSubmitted] = useState(false);
      const [userMessage, setUserMessage] = useState('');
      const handleSuggestion = (value: string) => {
        setUserMessage(value);
        setSubmitted(true);
      };
      return (
        <Conversation className="flex-1 min-h-0">
          <ConversationContent>
            {!submitted ? (
              <ConversationEmptyState title="Start a conversation">
                <div className="flex flex-col gap-2 max-w-md items-center">
                  <Suggestion
                    suggestion="What equipment requires maintenance this week?"
                    onClick={handleSuggestion}
                  />
                  <Suggestion
                    suggestion="Show me pumps with abnormal vibration levels"
                    onClick={handleSuggestion}
                  />
                  <Suggestion
                    suggestion="What are the current temperature readings for section B?"
                    onClick={handleSuggestion}
                  />
                </div>
              </ConversationEmptyState>
            ) : (
              <Message isResponse={false} data-message>
                <MessageContent>
                  <span>{userMessage}</span>
                </MessageContent>
              </Message>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      );
    };
    return <SuggestionsAutoSubmitDemo />;
  },
};
export const SuggestionsFillInput: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const suggestions = canvas.getAllByRole('button');
    await expect(suggestions.length).toBeGreaterThanOrEqual(3);
    await userEvent.click(suggestions[0]);
    await waitFor(
      async () => {
        const textarea = canvas.getByRole('textbox');
        await expect(textarea).toHaveValue('What equipment requires maintenance this week?');
      },
      {
        timeout: 1000,
      }
    );
  },
  render: () => {
    const SuggestionsFillInputDemo = () => {
      const controller = usePromptInputController();
      const handleSuggestion = (value: string) => {
        controller.textInput.setInput(value);
      };
      return (
        <>
          <Conversation className="flex-1 min-h-0">
            <ConversationContent>
              <ConversationEmptyState title="Start a conversation">
                <div className="flex flex-col gap-2 max-w-md items-center">
                  <Suggestion
                    suggestion="What equipment requires maintenance this week?"
                    onClick={handleSuggestion}
                  />
                  <Suggestion
                    suggestion="Show me pumps with abnormal vibration levels"
                    onClick={handleSuggestion}
                  />
                  <Suggestion
                    suggestion="What are the current temperature readings for section B?"
                    onClick={handleSuggestion}
                  />
                </div>
              </ConversationEmptyState>
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t p-4">
            <PromptInput onSubmit={() => {}}>
              <PromptInputBody>
                <PromptInputTextarea placeholder="Ask about your assets..." />
              </PromptInputBody>
              <PromptInputFooter>
                <PromptInputSubmit />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </>
      );
    };
    return (
      <PromptInputProvider>
        <SuggestionsFillInputDemo />
      </PromptInputProvider>
    );
  },
};
export const MixedMessageTypes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conversationContainer = canvasElement.querySelector('[role="log"]');
    await expect(conversationContainer).toBeInTheDocument();
    const messages = canvasElement.querySelectorAll('[data-message]');
    await expect(messages.length).toBeGreaterThanOrEqual(4);
    const avatars = canvasElement.querySelectorAll('[data-slot="message-avatar"]');
    await expect(avatars.length).toBeGreaterThan(0);
    await expect(avatars.length).toBeLessThan(messages.length);
    const copyButtons = canvas.getAllByRole('button', {
      name: /copy/i,
    });
    await expect(copyButtons.length).toBeGreaterThan(0);
    const firstCopyButton = copyButtons[0];
    firstCopyButton.focus();
    await expect(firstCopyButton).toHaveFocus();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false} data-message>
          <MessageContent>What's the current status of all pumps in section B?</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              All pumps in section B are currently operational. I've checked the latest sensor data
              across all 12 units.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>

        <Message isResponse={false} data-message>
          <MessageContent>Any with warning indicators?</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              Yes, pump 21PT1020 has elevated vibration levels at 5.2 mm/s, exceeding the warning
              threshold. I recommend immediate inspection.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Download" tooltip="Download report">
                <IconDownload className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Tools" tooltip="View tools">
                <IconTool className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons.length).toBeGreaterThan(0);
    const firstButton = allButtons[0];
    firstButton.focus();
    await expect(firstButton).toHaveFocus();
    const copyButton = canvas.getAllByRole('button', {
      name: /copy/i,
    })[0];
    await expect(copyButton).toBeInTheDocument();
    copyButton.focus();
    await expect(copyButton).toHaveFocus();
    const retryButton = canvas.getByRole('button', {
      name: /retry/i,
    });
    await expect(retryButton).toBeInTheDocument();
    const downloadButton = canvas.getByRole('button', {
      name: /download/i,
    });
    await expect(downloadButton).toBeInTheDocument();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false} data-message>
          <MessageContent>Test keyboard navigation</MessageContent>
        </Message>

        <Message isResponse={true} data-message>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              All interactive elements in this conversation should be keyboard accessible. Use Tab
              to navigate between action buttons.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy response">
                <IconCopy className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Download" tooltip="Download as file">
                <IconDownload className="w-3 h-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry request">
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};
export const VeryLongConversation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conversationContainer = canvasElement.querySelector('[role="log"]');
    await expect(conversationContainer).toBeInTheDocument();
    const messages = canvasElement.querySelectorAll('[data-message]');
    await expect(messages.length).toBeGreaterThanOrEqual(30);
    const copyButtons = canvas.getAllByRole('button', {
      name: /copy/i,
    });
    await expect(copyButtons.length).toBeGreaterThan(10);
    const scrollableContent = canvasElement.querySelector('[role="log"]');
    if (scrollableContent && scrollableContent.scrollHeight > scrollableContent.clientHeight) {
      scrollableContent.scrollTop = 0;
      await new Promise((resolve) => setTimeout(resolve, 100));
      const scrollButton = canvasElement.querySelector('button.rounded-full');
      if (scrollButton) {
        await expect(scrollButton).toBeInTheDocument();
        await expect(scrollButton).toBeVisible();
        await expect(scrollButton).toHaveAttribute('type', 'button');
      }
    }
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        {Array.from(
          {
            length: 40,
          },
          (_, i) => {
            const isResponse = i % 2 === 1;
            const messageNum = Math.floor(i / 2) + 1;
            const messageId = isResponse ? `assistant-${messageNum}` : `user-${messageNum}`;
            return (
              <Message key={messageId} isResponse={isResponse} data-message>
                {isResponse && (
                  <MessageAvatar variant="nordic">
                    <MessageAvatarIcon>
                      <IconWheel />
                    </MessageAvatarIcon>
                  </MessageAvatar>
                )}
                <MessageContent className={isResponse ? 'flex flex-col gap-2' : undefined}>
                  <span>
                    {isResponse
                      ? `Analysis ${messageNum}: Sensor readings from pump 21PT101${messageNum} indicate normal operating conditions. Vibration levels at 3.${messageNum} mm/s, temperature at 7${messageNum}°C. All parameters within acceptable ranges.`
                      : `Query ${messageNum}: What's the current status of pump 21PT101${messageNum}?`}
                  </span>
                  {isResponse && (
                    <MessageActions>
                      <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                        <IconCopy className="w-3 h-3" />
                      </MessageAction>
                      <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                        <IconRefresh className="w-3 h-3" />
                      </MessageAction>
                    </MessageActions>
                  )}
                </MessageContent>
              </Message>
            );
          }
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};
export const SingleMessage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const messages = canvasElement.querySelectorAll('[data-message]');
    await expect(messages.length).toBe(1);
    const messageText = canvas.getByText(/What sensors are available for monitoring/i);
    await expect(messageText).toBeInTheDocument();
    const conversationContainer = canvasElement.querySelector('[role="log"]');
    await expect(conversationContainer).toBeInTheDocument();
    const scrollButton = canvasElement.querySelector('button.rounded-full');
    await expect(scrollButton).not.toBeInTheDocument();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false} data-message>
          <MessageContent>What sensors are available for monitoring?</MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};
export const ShortContainer: Story = {
  play: async ({ canvasElement }) => {
    const messages = canvasElement.querySelectorAll('[data-message]');
    await expect(messages.length).toBeGreaterThan(2);
    const conversationContainer = canvasElement.querySelector('[role="log"]');
    await expect(conversationContainer).toBeInTheDocument();
    const avatars = canvasElement.querySelectorAll('[data-slot="message-avatar"]');
    await expect(avatars.length).toBeGreaterThan(0);
    const scrollableContent = canvasElement.querySelector('[role="log"]');
    if (scrollableContent && scrollableContent.scrollHeight > scrollableContent.clientHeight) {
      scrollableContent.scrollTop = 0;
      await new Promise((resolve) => setTimeout(resolve, 100));
      const scrollButton = canvasElement.querySelector('button.rounded-full');
      if (scrollButton) {
        await expect(scrollButton).toBeInTheDocument();
        await expect(scrollButton).toBeVisible();
        await expect(scrollButton).toHaveAttribute('type', 'button');
      }
    }
  },
  render: () => (
    <div className="h-[300px] flex flex-col border rounded-lg">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          <Message isResponse={false} data-message>
            <MessageContent>Status check for section B pumps</MessageContent>
          </Message>

          <Message isResponse={true} data-message>
            <MessageAvatar variant="nordic">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent className="flex flex-col gap-2">
              <span>
                All pumps in section B are operational. Average vibration levels: 3.4 mm/s.
                Temperature range: 65-72°C. No anomalies detected in the last 24 hours.
              </span>
              <MessageActions>
                <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                  <IconCopy className="w-3 h-3" />
                </MessageAction>
                <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                  <IconRefresh className="w-3 h-3" />
                </MessageAction>
              </MessageActions>
            </MessageContent>
          </Message>

          <Message isResponse={false} data-message>
            <MessageContent>Show detailed metrics</MessageContent>
          </Message>

          <Message isResponse={true} data-message>
            <MessageAvatar variant="nordic">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent className="flex flex-col gap-2">
              <span>
                Detailed metrics retrieved. 21PT1019: 3.2 mm/s, 68°C. 21PT1020: 5.2 mm/s, 82°C
                (warning). 21PT1021: 4.8 mm/s, 78°C. Recommended action: inspect 21PT1020 within 48
                hours.
              </span>
              <MessageActions>
                <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                  <IconCopy className="w-3 h-3" />
                </MessageAction>
                <MessageAction size="icon-sm" label="Download" tooltip="Download">
                  <IconDownload className="w-3 h-3" />
                </MessageAction>
                <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                  <IconRefresh className="w-3 h-3" />
                </MessageAction>
              </MessageActions>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  ),
};
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
};
export const CustomEmptyStateFromMain: Story = {
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
};
export const SimpleLongConversation: Story = {
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
};
export const VisualRegressionFromMain: Story = {
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
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const PlaygroundFromMain: Story = {
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
};
