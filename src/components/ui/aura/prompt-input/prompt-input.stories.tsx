import { Button } from "@/components/ui/aura/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import { HelperText } from "@/components/ui/aura/helper-text";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconAdjustments, IconAlertTriangle, IconChevronDown } from "@tabler/icons-react";
import { useRef, useState } from "react";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  type PromptInputMessage,
  PromptInputProvider,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "./prompt-input";

const meta: Meta<typeof PromptInput> = {
  title: "AI/Prompt Input",
  component: PromptInput,
  tags: ["autodocs", "ai-elements"],
  decorators: [
    (Story) => (
      <PromptInputProvider>
        <Story />
      </PromptInputProvider>
    ),
  ],
  argTypes: {
    // Display & behavior
    helperText: {
      control: false,
      description: "Helper text below input. Set to false to hide, ReactNode for custom content",
      table: {
        category: "Display",
        type: { summary: "ReactNode | false" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },

    // Events
    onSubmit: {
      action: "submitted",
      description: "Callback when form is submitted",
      table: {
        category: "Events",
        type: {
          summary: "(message: PromptInputMessage, event: FormEvent) => void",
        },
      },
    },

    // File upload controls (hidden until implemented)
    accept: {
      control: false,
      description: 'File types to accept (e.g., "image/*", "video/*")',
      table: {
        category: "File Upload (Coming Soon)",
      },
    },
    multiple: {
      control: false,
      description: "Allow multiple file uploads",
      table: {
        category: "File Upload (Coming Soon)",
      },
    },
    globalDrop: {
      control: false,
      description: "Accept drops anywhere on document",
      table: {
        category: "File Upload (Coming Soon)",
      },
    },
    maxFiles: {
      control: false,
      description: "Maximum number of files",
      table: {
        category: "File Upload (Coming Soon)",
      },
    },
    maxFileSize: {
      control: false,
      description: "Maximum file size in bytes",
      table: {
        category: "File Upload (Coming Soon)",
      },
    },
    onError: {
      control: false,
      description: "Callback when file upload error occurs",
      table: {
        category: "File Upload (Coming Soon)",
      },
    },

    // Internal
    syncHiddenInput: {
      control: false,
      table: {
        category: "Internal",
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["submit", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

/**
 * Basic prompt input with attachments and default helper text
 * Matches the basic example from prompt-input.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Basic prompt input with default helper text. Tests typing, submission, and status changes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the textarea
    const textarea = canvas.getByTestId("prompt-input-textarea");
    await expect(textarea).toBeInTheDocument();

    // Type a message
    await userEvent.type(textarea, "Hello, world!", { delay: 50 });
    await expect(textarea).toHaveValue("Hello, world!");

    // Find and click submit button
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    // Wait for status change to submitted
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute("data-status", "submitted");
      },
      { timeout: 300 }
    );

    // Wait for status change to streaming
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute("data-status", "streaming");
      },
      { timeout: 500 }
    );
  },
  render: function PromptInputBasicStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit = (message: PromptInputMessage, event: React.FormEvent<HTMLFormElement>) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
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

/**
 * Prompt input without helper text
 * Matches the noHelperText example from prompt-input.examples.tsx
 */
export const NoHelperText: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Prompt input without helper text displayed below the input.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify textarea is present
    const textarea = canvas.getByTestId("prompt-input-textarea");
    await expect(textarea).toBeInTheDocument();

    // Verify submit button is present
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await expect(submitButton).toBeInTheDocument();

    // Verify helper text is NOT present (helperText={false})
    const helperText = canvas.queryByText(/AI doesn't always get it right/i);
    await expect(helperText).not.toBeInTheDocument();
  },
  render: function PromptInputNoHelperTextStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit = (message: PromptInputMessage, event: React.FormEvent<HTMLFormElement>) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
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

/**
 * Prompt input with custom helper text
 * Matches the customHelperText example from prompt-input.examples.tsx
 */
export const CustomHelperText: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Prompt input with custom helper text component.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify custom helper text is present
    const customHelperText = canvas.getByText(/This is experimental. Use with caution./i);
    await expect(customHelperText).toBeInTheDocument();

    // Verify textarea is present
    const textarea = canvas.getByTestId("prompt-input-textarea");
    await expect(textarea).toBeInTheDocument();

    // Verify default helper text is NOT present
    const defaultHelperText = canvas.queryByText(/AI doesn't always get it right/i);
    await expect(defaultHelperText).not.toBeInTheDocument();
  },
  render: function PromptInputCustomHelperTextStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit = (message: PromptInputMessage, event: React.FormEvent<HTMLFormElement>) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
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

/**
 * Loading/submitted state
 */
export const SubmittedState: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Prompt input in submitted state with disabled textarea and submit button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify submit button shows submitted state
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await expect(submitButton).toHaveAttribute("data-status", "submitted");
    await expect(submitButton).toBeDisabled();

    // Verify textarea is disabled
    const textarea = canvas.getByTestId("prompt-input-textarea");
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

/**
 * Streaming state
 */
export const StreamingState: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Prompt input in streaming state with disabled textarea and streaming submit button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify submit button shows streaming state
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await expect(submitButton).toHaveAttribute("data-status", "streaming");
    await expect(submitButton).toBeInTheDocument();

    // Verify textarea is disabled
    const textarea = canvas.getByTestId("prompt-input-textarea");
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

/**
 * Error state - shown when submission fails
 */
export const ErrorState: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Shows the error state when a submission fails. Submit button displays an X icon.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByTestId("prompt-input-submit");

    // Verify error state is rendered correctly
    await expect(submitButton).toHaveAttribute("data-status", "error");
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

/**
 * Minimal prompt input
 */
export const Minimal: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Minimal prompt input with only textarea and submit button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify textarea is present
    const textarea = canvas.getByPlaceholderText(/Message.../i);
    await expect(textarea).toBeInTheDocument();

    // Verify submit button is present
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await expect(submitButton).toBeInTheDocument();

    // Test typing
    await userEvent.type(textarea, "Minimal test", { delay: 50 });
    await expect(textarea).toHaveValue("Minimal test");
  },
  render: () => (
    <PromptInput onSubmit={(message) => console.log("Submitted:", message)} className="w-100">
      <PromptInputBody>
        <PromptInputTextarea placeholder="Message..." />
      </PromptInputBody>
      <PromptInputFooter className="justify-end">
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  ),
};

/**
 * Tests keyboard interactions: Enter to submit, Shift+Enter for newline
 */
export const KeyboardInteractions: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Tests keyboard shortcuts: Enter to submit, Shift+Enter for new line.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId("prompt-input-textarea");

    // Test Shift+Enter adds newline
    await userEvent.type(textarea, "Line 1", { delay: 50 });
    await userEvent.keyboard("{Shift>}{Enter}{/Shift}");
    await userEvent.type(textarea, "Line 2", { delay: 50 });
    await expect(textarea).toHaveValue("Line 1\nLine 2");

    // Clear for next test
    await userEvent.clear(textarea);

    // Test Enter submits (when not empty)
    await userEvent.type(textarea, "Test message", { delay: 50 });
    await userEvent.keyboard("{Enter}");

    // Check that submit was triggered
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute("data-status", "submitted");
      },
      { timeout: 300 }
    );
  },
  render: function KeyboardInteractionsStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit = (message: PromptInputMessage, event: React.FormEvent<HTMLFormElement>) => {
      const hasText = Boolean(message.text);
      if (!hasText) return;

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
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

/**
 * Prompt input with advanced tools: settings button, agent dropdown, and speech-to-text
 * Demonstrates all available features
 */
export const WithAdvancedTools: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Prompt input with advanced tools including settings button, model selector dropdown, and speech-to-text button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify textarea is present
    const textarea = canvas.getByTestId("prompt-input-textarea");
    await expect(textarea).toBeInTheDocument();

    // Verify settings button is present
    const settingsButton = canvas.getByLabelText(/Settings/i);
    await expect(settingsButton).toBeInTheDocument();

    // Verify model selector dropdown button is present
    const modelButton = canvas.getByRole("button", { name: /Agent model/i });
    await expect(modelButton).toBeInTheDocument();
    await expect(modelButton).toHaveAttribute("aria-haspopup", "menu");

    // Verify submit button is present
    const submitButton = canvas.getByTestId("prompt-input-submit");
    await expect(submitButton).toBeInTheDocument();
  },
  render: function PromptInputWithAdvancedToolsStory() {
    const [model, setModel] = useState("Agent model");
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (message: PromptInputMessage, event: React.FormEvent<HTMLFormElement>) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
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
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {model}
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setModel("GPT-4")}>GPT-4</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel("GPT-3.5")}>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel("Claude")}>Claude</DropdownMenuItem>
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

/**
 * Interactive playground for testing prompt input props.
 */
export const Playground: Story = {
  args: {
    helperText: undefined,
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          "Interactive playground to test different prompt input configurations. Use the controls panel to experiment with props.",
      },
    },
  },
  render: function PromptInputPlaygroundStory(args) {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit = (message: PromptInputMessage, event: React.FormEvent<HTMLFormElement>) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
