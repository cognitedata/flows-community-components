import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { IconAdjustments, IconAlertTriangle, IconChevronDown } from '@tabler/icons-react';
import { type ComponentProps, useRef, useState } from 'react';

import { Button } from '@/components/ui/aura/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';
import { HelperText } from '@/components/ui/aura/helper-text';
import { Label } from '@/components/ui/aura/label';
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ui/aura/prompt-input';
const meta: Meta<typeof PromptInput> = {
  title: 'AI/Prompt Input',
  component: PromptInput,
  tags: ['autodocs', 'ai-elements'],
  decorators: [
    (Story) => (
      <PromptInputProvider>
        <Story />
      </PromptInputProvider>
    ),
  ],
  argTypes: {
    helperText: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode | false',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
    onSubmit: {
      action: 'submitted',
      table: {
        category: 'Events',
        type: {
          summary: '(message, event) => void',
        },
      },
    },
    accept: {
      control: false,
      table: {
        category: 'Behavior',
      },
    },
    multiple: {
      control: false,
      table: {
        category: 'Behavior',
      },
    },
    globalDrop: {
      control: false,
      table: {
        category: 'Behavior',
      },
    },
    maxFiles: {
      control: false,
      table: {
        category: 'Behavior',
      },
    },
    maxFileSize: {
      control: false,
      table: {
        category: 'Behavior',
      },
    },
    onError: {
      control: false,
      table: {
        category: 'Events',
      },
    },
    syncHiddenInput: {
      control: false,
      table: {
        category: 'Advanced',
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['submit', 'error'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof PromptInput>;
type PromptInputSubmitHandler = ComponentProps<typeof PromptInput>['onSubmit'];
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, 'Hello, world!', {
      delay: 50,
    });
    await expect(textarea).toHaveValue('Hello, world!');
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute('data-status', 'submitted');
      },
      {
        timeout: 300,
      }
    );
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute('data-status', 'streaming');
      },
      {
        timeout: 500,
      }
    );
  },
  render: function PromptInputBasicStory() {
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const handleSubmit: PromptInputSubmitHandler = (message, _event) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);
      if (!(hasText || hasAttachments)) {
        return;
      }
      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };
    return (
      <PromptInput className="w-125" onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    );
  },
};
export const NoHelperText: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeInTheDocument();
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toBeInTheDocument();
    const helperText = canvas.queryByText(/AI doesn't always get it right/i);
    await expect(helperText).not.toBeInTheDocument();
  },
  render: function PromptInputNoHelperTextStory() {
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const handleSubmit: PromptInputSubmitHandler = (message, _event) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);
      if (!(hasText || hasAttachments)) {
        return;
      }
      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };
    return (
      <PromptInput helperText={false} className="w-125" onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    );
  },
};
export const CustomHelperText: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const customHelperText = canvas.getByText(/This is experimental. Use with caution./i);
    await expect(customHelperText).toBeInTheDocument();
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeInTheDocument();
    const defaultHelperText = canvas.queryByText(/AI doesn't always get it right/i);
    await expect(defaultHelperText).not.toBeInTheDocument();
  },
  render: function PromptInputCustomHelperTextStory() {
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const handleSubmit: PromptInputSubmitHandler = (message, _event) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);
      if (!(hasText || hasAttachments)) {
        return;
      }
      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };
    return (
      <PromptInput
        className="w-125"
        onSubmit={handleSubmit}
        helperText={
          <HelperText size="xs" icon={<IconAlertTriangle />}>
            This is experimental. Use with caution.
          </HelperText>
        }
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    );
  },
};
export const SubmittedState: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toHaveAttribute('data-status', 'submitted');
    await expect(submitButton).toBeDisabled();
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeDisabled();
  },
  render: () => (
    <PromptInput onSubmit={() => {}} className="w-125">
      <PromptInputBody>
        <PromptInputTextarea placeholder="Type a message..." disabled />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit status="submitted" disabled />
      </PromptInputFooter>
    </PromptInput>
  ),
};
export const StreamingState: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toHaveAttribute('data-status', 'streaming');
    await expect(submitButton).toBeInTheDocument();
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeDisabled();
  },
  render: () => (
    <PromptInput onSubmit={() => {}} className="w-125">
      <PromptInputBody>
        <PromptInputTextarea placeholder="Type a message..." disabled />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit status="streaming" />
      </PromptInputFooter>
    </PromptInput>
  ),
};
export const ErrorState: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toHaveAttribute('data-status', 'error');
    await expect(submitButton).toBeInTheDocument();
  },
  render: () => (
    <PromptInput onSubmit={() => {}} className="w-125">
      <PromptInputBody>
        <PromptInputTextarea placeholder="Type a message..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit status="error" />
      </PromptInputFooter>
    </PromptInput>
  ),
};
export const SubmissionError: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, 'Test error handling', {
      delay: 50,
    });
    await expect(textarea).toHaveValue('Test error handling');
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        const errorText = canvas.getByText('Failed to submit. Please try again.');
        expect(errorText).toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
    await expect(textarea).toHaveValue('Test error handling');
  },
  render: () => (
    <PromptInput
      onSubmit={() => {
        throw new Error('Failed to submit. Please try again.');
      }}
      className="w-125"
    >
      <PromptInputBody>
        <PromptInputTextarea placeholder="Type a message to see error handling..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  ),
};
export const AsyncSubmissionError: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await userEvent.type(textarea, 'Test async error', {
      delay: 50,
    });
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await userEvent.click(submitButton);
    await waitFor(
      () => {
        const errorText = canvas.getByText('Network request failed');
        expect(errorText).toBeInTheDocument();
      },
      {
        timeout: 2000,
      }
    );
  },
  render: () => (
    <PromptInput
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        throw new Error('Network request failed');
      }}
      className="w-125"
    >
      <PromptInputBody>
        <PromptInputTextarea placeholder="Type a message to see async error handling..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  ),
};
export const Minimal: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(/Message.../i);
    await expect(textarea).toBeInTheDocument();
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toBeInTheDocument();
    await userEvent.type(textarea, 'Minimal test', {
      delay: 50,
    });
    await expect(textarea).toHaveValue('Minimal test');
  },
  render: () => (
    <PromptInput onSubmit={(message) => console.log('Submitted:', message)} className="w-100">
      <PromptInputBody>
        <PromptInputTextarea placeholder="Message..." />
      </PromptInputBody>
      <PromptInputFooter className="justify-end">
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  ),
};
export const KeyboardInteractions: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await userEvent.type(textarea, 'Line 1', {
      delay: 50,
    });
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    await userEvent.type(textarea, 'Line 2', {
      delay: 50,
    });
    await expect(textarea).toHaveValue('Line 1\nLine 2');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Test message', {
      delay: 50,
    });
    await userEvent.keyboard('{Enter}');
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute('data-status', 'submitted');
      },
      {
        timeout: 300,
      }
    );
  },
  render: function KeyboardInteractionsStory() {
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const handleSubmit: PromptInputSubmitHandler = (message, _event) => {
      const hasText = Boolean(message.text);
      if (!hasText) return;
      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };
    return (
      <PromptInput helperText={false} className="w-125" onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    );
  },
};
export const WithAdvancedTools: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole('textbox');
    await expect(textarea).toBeInTheDocument();
    const settingsButton = canvas.getByLabelText(/Settings/i);
    await expect(settingsButton).toBeInTheDocument();
    const modelButton = canvas.getByRole('button', {
      name: /Agent model/i,
    });
    await expect(modelButton).toBeInTheDocument();
    await expect(modelButton).toHaveAttribute('aria-haspopup', 'menu');
    const submitButton = canvas.getByRole('button', {
      name: /submit/i,
    });
    await expect(submitButton).toBeInTheDocument();
  },
  render: function PromptInputWithAdvancedToolsStory() {
    const [model, setModel] = useState('Agent model');
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const handleSubmit: PromptInputSubmitHandler = (message, _event) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);
      if (!(hasText || hasAttachments)) {
        return;
      }
      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };
    return (
      <PromptInput className="w-125" onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea ref={textareaRef} placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton size="icon-sm" aria-label="Settings">
              <IconAdjustments />
            </PromptInputButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="sm">
                    {model}
                    <IconChevronDown />
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setModel('GPT-4')}>GPT-4</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel('GPT-3.5')}>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel('Claude')}>Claude</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <PromptInputSpeechButton textareaRef={textareaRef} />
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    );
  },
};
export const EdgeCases: Story = {
  render: function EdgeCasesStory() {
    const handleSubmit = () => {};
    return (
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="edge-long-text">Very long text input</Label>
          <PromptInput id="edge-long-text" onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="This is a very long placeholder text that demonstrates how placeholders are handled when they exceed the textarea width and need to be truncated or wrapped"
                defaultValue="This is a very long prompt input value that should demonstrate how the prompt input handles overflow and text wrapping behavior in various scenarios and edge cases. The text continues on multiple lines to test the behavior with extensive content that spans several rows and demonstrates proper text handling in the component."
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="edge-special-chars">Special characters</Label>
          <PromptInput id="edge-special-chars" onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea defaultValue="Price: $99.99 €85 ¥1000 & <special> characters" />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="edge-emoji">Emoji</Label>
          <PromptInput id="edge-emoji" onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea defaultValue="🚀 Hello World! 🌍 ✨ Multiline text with emoji 🎉" />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="edge-unicode">Unicode characters</Label>
          <PromptInput id="edge-unicode" onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea defaultValue="中文字符 مرحبا Привет नमस्ते" />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    );
  },
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textareas = canvas.getAllByRole('textbox');
    await expect(textareas.length).toBe(4);
    const longTextLabel = canvas.getByText('Very long text input');
    await expect(longTextLabel).toBeInTheDocument();
    const specialCharsLabel = canvas.getByText('Special characters');
    await expect(specialCharsLabel).toBeInTheDocument();
  },
};
export const Playground: Story = {
  args: {
    helperText: undefined,
  },
  parameters: {
    order: 99,
  },
  render: function PromptInputPlaygroundStory(args) {
    const [status, setStatus] = useState<'submitted' | 'streaming' | 'ready' | 'error'>('ready');
    const handleSubmit: PromptInputSubmitHandler = (message, _event) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);
      if (!(hasText || hasAttachments)) {
        return;
      }
      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };
    const { onSubmit, ...restArgs } = args;
    return (
      <div className="flex items-center justify-center p-24">
        <PromptInput className="w-125" onSubmit={handleSubmit} {...restArgs}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit className="size-7" status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    );
  },
};
