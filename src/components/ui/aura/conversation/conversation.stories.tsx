import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCopy,
  IconDownload,
  IconRefresh,
  IconTool,
  IconWheel,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
} from '../message';
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputController,
} from '../prompt-input';
import { Suggestion } from '../suggestion';

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from './conversation';

const meta: Meta<typeof Conversation> = {
  title: 'AI/Conversation',
  component: Conversation,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    initial: {
      control: false,
      table: {
        category: 'Behavior',
        type: { summary: 'ScrollBehavior' },
        defaultValue: { summary: 'smooth' },
      },
    },
    resize: {
      control: false,
      table: {
        category: 'Behavior',
        type: { summary: 'ScrollBehavior' },
        defaultValue: { summary: 'smooth' },
      },
    },
    role: {
      control: false,
      table: {
        category: 'Advanced',
        type: { summary: 'string' },
        defaultValue: { summary: 'log' },
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
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log')).toBeInTheDocument();
    await expect(
      canvas.getByText("What's the status of pump 21PT1019?")
    ).toBeInTheDocument();
    const copyButtons = await canvas.findAllByRole('button', { name: /copy/i });
    await expect(copyButtons.length).toBeGreaterThan(0);
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false}>
          <MessageContent>
            What&apos;s the status of pump 21PT1019?
          </MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              Pump 21PT1019 is currently operational. Recent vibration readings
              are within normal parameters at 3.2 mm/s.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="size-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="size-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>
        <Message isResponse={false}>
          <MessageContent>
            Can you check the maintenance history?
          </MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              The last scheduled maintenance was completed on 15 November 2024,
              and the next one is planned for 15 February 2025.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="size-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Download" tooltip="Download">
                <IconDownload className="size-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="size-3" />
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
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log')).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', { level: 3, name: 'Start a conversation' })
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        "Ask me anything about your industrial equipment and I'll do my best to help."
      )
    ).toBeInTheDocument();
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
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await userEvent.click(buttons[0]);
    await expect(
      canvas.getByText('What equipment requires maintenance this week?')
    ).toBeInTheDocument();
  },
  render: function SuggestionsAutoSubmitStory() {
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
            <Message isResponse={false}>
              <MessageContent>{userMessage}</MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    );
  },
};

export const SuggestionsFillInput: Story = {
  parameters: {
    order: 4,
  },
  decorators: [
    (Story) => (
      <PromptInputProvider>
        <Story />
      </PromptInputProvider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await userEvent.click(buttons[0]);
    await expect(canvas.getByRole('textbox')).toHaveValue(
      'What equipment requires maintenance this week?'
    );
  },
  render: function SuggestionsFillInputStory() {
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
  },
};

export const MixedMessageTypes: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log')).toBeInTheDocument();
    await expect(
      canvas.getByText('Any with warning indicators?')
    ).toBeInTheDocument();
    const copyButtons = await canvas.findAllByRole('button', { name: /copy/i });
    await expect(copyButtons.length).toBeGreaterThan(0);
    await expect(
      canvas.getByRole('button', { name: /download report/i })
    ).toBeInTheDocument();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false}>
          <MessageContent>
            What&apos;s the current status of all pumps in section B?
          </MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              All pumps in section B are operational based on the latest data.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="size-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="size-3" />
              </MessageAction>
            </MessageActions>
          </MessageContent>
        </Message>
        <Message isResponse={false}>
          <MessageContent>Any with warning indicators?</MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>
              Pump 21PT1020 is over the warning threshold and should be
              inspected.
            </span>
            <MessageActions>
              <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                <IconCopy className="size-3" />
              </MessageAction>
              <MessageAction
                size="icon-sm"
                label="Download report"
                tooltip="Download report"
              >
                <IconDownload className="size-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Tools" tooltip="View tools">
                <IconTool className="size-3" />
              </MessageAction>
              <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                <IconRefresh className="size-3" />
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
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole('button', { name: /copy response/i });
    const downloadButton = canvas.getByRole('button', {
      name: /download as file/i,
    });
    copyButton.focus();
    await expect(copyButton).toHaveFocus();
    await userEvent.tab();
    await expect(downloadButton).toHaveFocus();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false}>
          <MessageContent>Test keyboard navigation</MessageContent>
        </Message>
        <Message isResponse={true}>
          <MessageAvatar variant="nordic">
            <MessageAvatarIcon>
              <IconWheel />
            </MessageAvatarIcon>
          </MessageAvatar>
          <MessageContent className="flex flex-col gap-2">
            <span>Use Tab to move between action buttons.</span>
            <MessageActions>
              <MessageAction
                size="icon-sm"
                label="Copy response"
                tooltip="Copy response"
              >
                <IconCopy className="size-3" />
              </MessageAction>
              <MessageAction
                size="icon-sm"
                label="Download as file"
                tooltip="Download as file"
              >
                <IconDownload className="size-3" />
              </MessageAction>
              <MessageAction
                size="icon-sm"
                label="Retry request"
                tooltip="Retry request"
              >
                <IconRefresh className="size-3" />
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
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log')).toBeInTheDocument();
    await expect(
      canvas.getByText("Query 1: What's the current status of pump 21PT1011?")
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("Query 20: What's the current status of pump 21PT10120?")
    ).toBeInTheDocument();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        {Array.from({ length: 40 }, (_, i) => {
          const isResponse = i % 2 === 1;
          const messageNum = Math.floor(i / 2) + 1;
          const messageId = isResponse
            ? `assistant-${messageNum}`
            : `user-${messageNum}`;

          return (
            <Message key={messageId} isResponse={isResponse}>
              {isResponse && (
                <MessageAvatar variant="nordic">
                  <MessageAvatarIcon>
                    <IconWheel />
                  </MessageAvatarIcon>
                </MessageAvatar>
              )}
              <MessageContent
                className={isResponse ? 'flex flex-col gap-2' : undefined}
              >
                <span>
                  {isResponse
                    ? `Analysis ${messageNum}: Sensor readings for pump 21PT101${messageNum} are in normal range.`
                    : `Query ${messageNum}: What's the current status of pump 21PT101${messageNum}?`}
                </span>
                {isResponse && (
                  <MessageActions>
                    <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                      <IconCopy className="size-3" />
                    </MessageAction>
                    <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                      <IconRefresh className="size-3" />
                    </MessageAction>
                  </MessageActions>
                )}
              </MessageContent>
            </Message>
          );
        })}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};

export const SingleMessage: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log')).toBeInTheDocument();
    await expect(
      canvas.getByText('What sensors are available for monitoring?')
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: /copy/i })
    ).not.toBeInTheDocument();
  },
  render: () => (
    <Conversation className="flex-1 min-h-0">
      <ConversationContent>
        <Message isResponse={false}>
          <MessageContent>
            What sensors are available for monitoring?
          </MessageContent>
        </Message>
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  ),
};

export const ShortContainer: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('log')).toBeInTheDocument();
    await expect(
      canvas.getByText('Status check for section B pumps')
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="h-80 flex flex-col border rounded-lg">
      <Conversation className="flex-1 min-h-0">
        <ConversationContent>
          <Message isResponse={false}>
            <MessageContent>Status check for section B pumps</MessageContent>
          </Message>
          <Message isResponse={true}>
            <MessageAvatar variant="nordic">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent className="flex flex-col gap-2">
              <span>All pumps in section B are operational.</span>
              <MessageActions>
                <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                  <IconCopy className="size-3" />
                </MessageAction>
                <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                  <IconRefresh className="size-3" />
                </MessageAction>
              </MessageActions>
            </MessageContent>
          </Message>
          <Message isResponse={false}>
            <MessageContent>Show detailed metrics</MessageContent>
          </Message>
          <Message isResponse={true}>
            <MessageAvatar variant="nordic">
              <MessageAvatarIcon>
                <IconWheel />
              </MessageAvatarIcon>
            </MessageAvatar>
            <MessageContent className="flex flex-col gap-2">
              <span>
                Detailed metrics are available for all monitored units.
              </span>
              <MessageActions>
                <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
                  <IconCopy className="size-3" />
                </MessageAction>
                <MessageAction
                  size="icon-sm"
                  label="Download"
                  tooltip="Download"
                >
                  <IconDownload className="size-3" />
                </MessageAction>
                <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
                  <IconRefresh className="size-3" />
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

export const VisualRegression: Story = {
  parameters: {
    order: 10,
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => (
    <div className="h-80">
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
};

export const Playground: Story = {
  args: {
    className: 'flex-1 min-h-0',
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <Conversation {...args}>
      <ConversationContent>
        <ConversationEmptyState
          title="Playground Conversation"
          description="Use controls to adjust the container."
        />
      </ConversationContent>
    </Conversation>
  ),
};
