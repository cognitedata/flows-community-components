import type { Meta, StoryObj } from '@storybook/nextjs';
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
import type { ComponentProps } from 'react';
import { useState, useRef } from 'react';
import {
  IconAdjustments,
  IconChevronDown,
  IconPaperclip,
  IconAlertTriangle,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Button } from './button';
import { HelperText } from './helper-text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

// Extended type for story args
type PromptInputStoryArgs = ComponentProps<typeof PromptInput> & {
  showSpeech?: boolean;
  showTools?: boolean;
  submitStatus?: 'ready' | 'submitted' | 'streaming' | 'error';
};

const meta: Meta<PromptInputStoryArgs> = {
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
      description: 'Helper text below input (false to hide, ReactNode for custom)',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<PromptInputStoryArgs>;

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

/**
 * Default prompt input with all features
 */
export const Default: Story = {
  render: () => {
    const [status, setStatus] = useState<
      'ready' | 'submitted' | 'streaming' | 'error'
    >('ready');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (message: PromptInputMessage) => {
      const hasContent =
        Boolean(message.text) || Boolean(message.files?.length);
      if (!hasContent) return;

      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };

    return (
      <div className="w-[600px]">
        <PromptInputProvider>
          <PromptInput onSubmit={handleSubmit} accept="image/*" multiple>
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
                <PromptInputButton size="icon-sm">
                  <IconAdjustments />
                </PromptInputButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      Agent model
                      <IconChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>GPT-4</DropdownMenuItem>
                    <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                    <DropdownMenuItem>Claude</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PromptInputTools>
              <div className="flex flex-row gap-2">
                <PromptInputSpeechButton textareaRef={textareaRef} />
                <PromptInputSubmit className="size-7" status={status} />
              </div>
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
};

/**
 * Minimal prompt input with just textarea and submit button
 */
export const Minimal: Story = {
  render: () => {
    const [status, setStatus] = useState<
      'ready' | 'submitted' | 'streaming' | 'error'
    >('ready');

    const handleSubmit = (message: PromptInputMessage) => {
      const hasContent =
        Boolean(message.text) || Boolean(message.files?.length);
      if (!hasContent) return;

      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };

    return (
      <div className="w-[600px]">
        <PromptInput onSubmit={handleSubmit} helperText={false}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <div />
            <PromptInputSubmit className="size-7" status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    );
  },
};

/**
 * Prompt input with file attachment support
 */
export const WithAttachments: Story = {
  render: () => {
    const [status, setStatus] = useState<
      'ready' | 'submitted' | 'streaming' | 'error'
    >('ready');

    const handleSubmit = (message: PromptInputMessage) => {
      const hasContent =
        Boolean(message.text) || Boolean(message.files?.length);
      if (!hasContent) return;

      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => setStatus('ready'), 2000);
    };

    return (
      <div className="w-[600px]">
        <PromptInputProvider>
          <PromptInput onSubmit={handleSubmit} accept="image/*" multiple>
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea placeholder="Type your message or drag files here..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton size="icon-sm">
                  <IconPaperclip />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit className="size-7" status={status} />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
};

// ============================================================================
// SUBMIT STATES
// ============================================================================

/**
 * Shows all submit button states
 */
export const SubmitStates: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 w-[600px]">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Ready state</p>
          <PromptInput onSubmit={() => {}} helperText={false}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Ready to send..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" status="ready" />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Submitted state</p>
          <PromptInput onSubmit={() => {}} helperText={false}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Processing..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" status="submitted" />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Streaming state</p>
          <PromptInput onSubmit={() => {}} helperText={false}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Streaming response..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" status="streaming" />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Error state</p>
          <PromptInput onSubmit={() => {}} helperText={false}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Error occurred..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" status="error" />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

// ============================================================================
// HELPER TEXT VARIANTS
// ============================================================================

/**
 * Default helper text (AI warning)
 */
export const DefaultHelperText: Story = {
  render: () => {
    return (
      <div className="w-[600px]">
        <PromptInput onSubmit={() => {}}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <div />
            <PromptInputSubmit className="size-7" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    );
  },
};

/**
 * No helper text
 */
export const NoHelperText: Story = {
  render: () => {
    return (
      <div className="w-[600px]">
        <PromptInput onSubmit={() => {}} helperText={false}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <div />
            <PromptInputSubmit className="size-7" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    );
  },
};

/**
 * Custom helper text
 */
export const CustomHelperText: Story = {
  render: () => {
    return (
      <div className="w-[600px]">
        <PromptInput
          onSubmit={() => {}}
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
            <div />
            <PromptInputSubmit className="size-7" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    );
  },
};

/**
 * Multiple helper text variants
 */
export const HelperTextVariants: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 w-[600px]">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Default (info)</p>
          <PromptInput onSubmit={() => {}}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Type your message..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Warning</p>
          <PromptInput
            onSubmit={() => {}}
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
              <div />
              <PromptInputSubmit className="size-7" />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Custom info</p>
          <PromptInput
            onSubmit={() => {}}
            helperText={
              <HelperText size="xs" icon={<IconInfoCircle />}>
                Pro tip: Press Shift+Enter for a new line
              </HelperText>
            }
          >
            <PromptInputBody>
              <PromptInputTextarea placeholder="Type your message..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" />
            </PromptInputFooter>
          </PromptInput>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">No helper text</p>
          <PromptInput onSubmit={() => {}} helperText={false}>
            <PromptInputBody>
              <PromptInputTextarea placeholder="Type your message..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

// ============================================================================
// INTERACTIVE FEATURES
// ============================================================================

/**
 * With speech-to-text button
 */
export const WithSpeech: Story = {
  render: () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
      <div className="w-[600px]">
        <PromptInputProvider>
          <PromptInput onSubmit={() => {}} helperText={false}>
            <PromptInputBody>
              <PromptInputTextarea
                ref={textareaRef}
                placeholder="Type or speak your message..."
              />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <p className="text-xs text-muted-foreground">
                  Click microphone to start speaking
                </p>
              </PromptInputTools>
              <div className="flex flex-row gap-2">
                <PromptInputSpeechButton textareaRef={textareaRef} />
                <PromptInputSubmit className="size-7" />
              </div>
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
};

/**
 * With model selection dropdown
 */
export const WithModelSelection: Story = {
  render: () => {
    const [model, setModel] = useState('GPT-4');

    return (
      <div className="w-[600px]">
        <PromptInput onSubmit={() => {}} helperText={false}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Type your message..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
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
                  <DropdownMenuItem onClick={() => setModel('Claude 3')}>
                    Claude 3
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setModel('Gemini Pro')}>
                    Gemini Pro
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </PromptInputTools>
            <PromptInputSubmit className="size-7" />
          </PromptInputFooter>
        </PromptInput>
      </div>
    );
  },
};

/**
 * With multiple tools
 */
export const WithMultipleTools: Story = {
  render: () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    return (
      <div className="w-[600px]">
        <PromptInputProvider>
          <PromptInput onSubmit={() => {}} accept="image/*" multiple>
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
                <PromptInputButton size="icon-sm">
                  <IconPaperclip />
                </PromptInputButton>
                <PromptInputButton size="icon-sm">
                  <IconAdjustments />
                </PromptInputButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      GPT-4
                      <IconChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>GPT-4</DropdownMenuItem>
                    <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                    <DropdownMenuItem>Claude 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PromptInputTools>
              <div className="flex flex-row gap-2">
                <PromptInputSpeechButton textareaRef={textareaRef} />
                <PromptInputSubmit className="size-7" />
              </div>
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
};

// ============================================================================
// USAGE PATTERNS
// ============================================================================

/**
 * Keyboard shortcuts demonstration
 */
export const KeyboardShortcuts: Story = {
  render: () => {
    return (
      <div className="w-[600px] space-y-4">
        <div className="rounded-lg border p-4 bg-muted/50">
          <h4 className="font-semibold text-sm mb-2">Keyboard Shortcuts</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">Enter</kbd> - Submit message</li>
            <li>• <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">Shift</kbd> + <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">Enter</kbd> - New line</li>
            <li>• <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">Backspace</kbd> (when empty) - Remove last attachment</li>
            <li>• <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">Cmd/Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-xs rounded bg-background border">V</kbd> - Paste images</li>
          </ul>
        </div>

        <PromptInputProvider>
          <PromptInput onSubmit={() => {}} accept="image/*" multiple>
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea placeholder="Try the keyboard shortcuts above..." />
            </PromptInputBody>
            <PromptInputFooter>
              <div />
              <PromptInputSubmit className="size-7" />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * Drag and drop demonstration
 */
export const DragAndDrop: Story = {
  render: () => {
    return (
      <div className="w-[600px] space-y-4">
        <div className="rounded-lg border p-4 bg-muted/50">
          <h4 className="font-semibold text-sm mb-2">Drag & Drop</h4>
          <p className="text-sm text-muted-foreground">
            Drag image files onto the form below to attach them. You can also
            paste images directly into the textarea.
          </p>
        </div>

        <PromptInputProvider>
          <PromptInput onSubmit={() => {}} accept="image/*" multiple>
            <PromptInputBody>
              <PromptInputAttachments>
                {(attachment) => <PromptInputAttachment data={attachment} />}
              </PromptInputAttachments>
              <PromptInputTextarea placeholder="Drag files here or paste images..." />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <p className="text-xs text-muted-foreground">
                  Images only • Max 10 files
                </p>
              </PromptInputTools>
              <PromptInputSubmit className="size-7" />
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * Complete chat interface example
 */
export const CompleteChatInterface: Story = {
  render: () => {
    const [status, setStatus] = useState<
      'ready' | 'submitted' | 'streaming' | 'error'
    >('ready');
    const [messages, setMessages] = useState<string[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (message: PromptInputMessage) => {
      const hasContent =
        Boolean(message.text) || Boolean(message.files?.length);
      if (!hasContent) return;

      if (message.text) {
        setMessages((prev) => [...prev, message.text!]);
      }

      setStatus('submitted');
      setTimeout(() => setStatus('streaming'), 200);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          'This is a simulated response from the AI.',
        ]);
        setStatus('ready');
      }, 2000);
    };

    return (
      <div className="w-[600px] space-y-4">
        <div className="rounded-lg border min-h-[300px] max-h-[300px] overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Send a message to start the conversation
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={
                  i % 2 === 0
                    ? 'text-sm bg-primary text-primary-foreground rounded-lg p-3 ml-12'
                    : 'text-sm bg-muted rounded-lg p-3 mr-12'
                }
              >
                {msg}
              </div>
            ))
          )}
        </div>

        <PromptInputProvider>
          <PromptInput onSubmit={handleSubmit} accept="image/*" multiple>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      GPT-4
                      <IconChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>GPT-4</DropdownMenuItem>
                    <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                    <DropdownMenuItem>Claude 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PromptInputTools>
              <div className="flex flex-row gap-2">
                <PromptInputSpeechButton textareaRef={textareaRef} />
                <PromptInputSubmit className="size-7" status={status} />
              </div>
            </PromptInputFooter>
          </PromptInput>
        </PromptInputProvider>
      </div>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

