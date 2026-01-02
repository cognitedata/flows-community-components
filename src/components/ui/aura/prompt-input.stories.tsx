'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState, useRef } from 'react';
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputSpeechButton,
  PromptInputButton,
  type PromptInputMessage,
} from './prompt-input';
import { Button } from './button';
import { HelperText } from './helper-text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {
  IconAdjustments,
  IconAlertTriangle,
  IconChevronDown,
} from '@tabler/icons-react';

const meta: Meta<typeof PromptInput> = {
  title: 'AI/Prompt Input',
  component: PromptInput,
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'File types to accept (e.g., "image/*")',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
    },
    globalDrop: {
      control: 'boolean',
      description: 'Accept drops anywhere on document',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    helperText: {
      control: false,
      description:
        'Helper text below input (false to hide, ReactNode for custom)',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

function AttachmentTools({
  model,
  setModel,
}: {
  model: string;
  setModel: (model: string) => void;
}) {
  return (
    <>
      <PromptInputButton size="icon-sm" aria-label="Settings">
        <IconAdjustments />
      </PromptInputButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            {model}
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setModel('GPT-4')}>
            GPT-4
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModel('GPT-3.5')}>
            GPT-3.5
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModel('Claude')}>
            Claude
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

/**
 * Basic prompt input with attachments and default helper text
 * Matches the basic example from prompt-input.examples.tsx
 */
export const Basic: Story = {
  render: function PromptInputBasicStory() {
    const [status, setStatus] = useState<
      'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');

    const handleSubmit = (message: PromptInputMessage) => {
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
      <PromptInputProvider>
        <PromptInput
          onSubmit={handleSubmit}
          accept="image/*"
          multiple
          className="w-[500px]"
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit className="size-7" status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    );
  },
};

/**
 * Prompt input without helper text
 * Matches the noHelperText example from prompt-input.examples.tsx
 */
export const NoHelperText: Story = {
  render: function PromptInputNoHelperTextStory() {
    const [status, setStatus] = useState<
      'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');

    const handleSubmit = (message: PromptInputMessage) => {
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
      <PromptInputProvider>
        <PromptInput
          onSubmit={handleSubmit}
          accept="image/*"
          multiple
          helperText={false}
          className="w-[500px]"
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit className="size-7" status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    );
  },
};

/**
 * Prompt input with custom helper text
 * Matches the customHelperText example from prompt-input.examples.tsx
 */
export const CustomHelperText: Story = {
  render: function PromptInputCustomHelperTextStory() {
    const [status, setStatus] = useState<
      'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');

    const handleSubmit = (message: PromptInputMessage) => {
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
      <PromptInputProvider>
        <PromptInput
          onSubmit={handleSubmit}
          accept="image/*"
          multiple
          helperText={
            <HelperText size="xs" icon={<IconAlertTriangle />}>
              This is experimental. Use with caution.
            </HelperText>
          }
          className="w-[500px]"
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit className="size-7" status={status} />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    );
  },
};

/**
 * Loading/submitted state
 */
export const SubmittedState: Story = {
  render: () => (
    <PromptInputProvider>
      <PromptInput onSubmit={() => {}} className="w-[500px]" helperText={false}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type a message..." disabled />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit status="submitted" disabled />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  ),
};

/**
 * Streaming state
 */
export const StreamingState: Story = {
  render: () => (
    <PromptInputProvider>
      <PromptInput onSubmit={() => {}} className="w-[500px]" helperText={false}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type a message..." disabled />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit status="streaming" />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  ),
};

/**
 * Minimal prompt input
 */
export const Minimal: Story = {
  render: () => (
    <PromptInputProvider>
      <PromptInput
        onSubmit={(message) => console.log('Submitted:', message)}
        className="w-[400px]"
        helperText={false}
      >
        <PromptInputBody>
          <PromptInputTextarea placeholder="Message..." />
        </PromptInputBody>
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  ),
};

/**
 * Prompt input with advanced tools: settings button, agent dropdown, and speech-to-text
 * Demonstrates all available features
 */
export const WithAdvancedTools: Story = {
  render: function PromptInputWithAdvancedToolsStory() {
    const [model, setModel] = useState('Agent model');
    const [status, setStatus] = useState<
      'submitted' | 'streaming' | 'ready' | 'error'
    >('ready');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (message: PromptInputMessage) => {
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
      <PromptInputProvider>
        <PromptInput
          onSubmit={handleSubmit}
          accept="image/*"
          multiple
          className="w-[500px]"
          helperText={false}
        >
          <PromptInputBody>
            <PromptInputAttachments>
              {(attachment) => <PromptInputAttachment data={attachment} />}
            </PromptInputAttachments>
            <PromptInputTextarea
              ref={textareaRef}
              placeholder="Type your message..."
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <AttachmentTools model={model} setModel={setModel} />
            </PromptInputTools>
            <div className="flex flex-row gap-2">
              <PromptInputSpeechButton textareaRef={textareaRef} />
              <PromptInputSubmit className="size-7" status={status} />
            </div>
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>
    );
  },
};
