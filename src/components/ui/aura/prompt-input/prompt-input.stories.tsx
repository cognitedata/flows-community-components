import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconAdjustments, IconAlertTriangle, IconChevronDown } from "@tabler/icons-react";
import { type ComponentProps, useRef, useState } from "react";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { HelperText } from "../helper-text";
import { Label } from "../label";
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
    helperText: {
      control: false,
      description: "Helper text below input. Set to false to hide, ReactNode for custom content",
      table: {
        category: "Content",
        type: { summary: "ReactNode | false" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Variants/Styling",
      },
    },
    onSubmit: {
      action: "submitted",
      description: "Callback when form is submitted",
      table: {
        category: "Events",
        type: {
          summary: "(message, event) => void",
        },
      },
    },
    accept: {
      control: false,
      description: 'File types to accept (e.g., "image/*", "video/*")',
      table: {
        category: "Behavior",
      },
    },
    multiple: {
      control: false,
      description: "Allow multiple file uploads",
      table: {
        category: "Behavior",
      },
    },
    globalDrop: {
      control: false,
      description: "Accept drops anywhere on document",
      table: {
        category: "Behavior",
      },
    },
    maxFiles: {
      control: false,
      description: "Maximum number of files",
      table: {
        category: "Behavior",
      },
    },
    maxFileSize: {
      control: false,
      description: "Maximum file size in bytes",
      table: {
        category: "Behavior",
      },
    },
    onError: {
      control: false,
      description: "Callback when file upload error occurs",
      table: {
        category: "Events",
      },
    },
    syncHiddenInput: {
      control: false,
      table: {
        category: "Advanced",
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
type PromptInputSubmitHandler = ComponentProps<typeof PromptInput>["onSubmit"];

/**
 * Basic prompt input with attachments and default helper text
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

    const textarea = canvas.getByRole("textbox");
    await expect(textarea).toBeInTheDocument();

    await userEvent.type(textarea, "Hello, world!", { delay: 50 });
    await expect(textarea).toHaveValue("Hello, world!");

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);

    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute("data-status", "submitted");
      },
      { timeout: 300 }
    );

    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute("data-status", "streaming");
      },
      { timeout: 500 }
    );
  },
  render: function PromptInputBasicStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit: PromptInputSubmitHandler = (message, event) => {
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

    const textarea = canvas.getByRole("textbox");
    await expect(textarea).toBeInTheDocument();

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toBeInTheDocument();

    const helperText = canvas.queryByText(/AI doesn't always get it right/i);
    await expect(helperText).not.toBeInTheDocument();
  },
  render: function PromptInputNoHelperTextStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit: PromptInputSubmitHandler = (message, event) => {
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

    const customHelperText = canvas.getByText(/This is experimental. Use with caution./i);
    await expect(customHelperText).toBeInTheDocument();

    const textarea = canvas.getByRole("textbox");
    await expect(textarea).toBeInTheDocument();

    const defaultHelperText = canvas.queryByText(/AI doesn't always get it right/i);
    await expect(defaultHelperText).not.toBeInTheDocument();
  },
  render: function PromptInputCustomHelperTextStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit: PromptInputSubmitHandler = (message, event) => {
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

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toHaveAttribute("data-status", "submitted");
    await expect(submitButton).toBeDisabled();

    const textarea = canvas.getByRole("textbox");
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

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toHaveAttribute("data-status", "streaming");
    await expect(submitButton).toBeInTheDocument();

    const textarea = canvas.getByRole("textbox");
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
    const submitButton = canvas.getByRole("button", { name: /submit/i });

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
 * Submission error handling
 */
export const SubmissionError: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Demonstrates error handling when submission fails. The error message is displayed in HelperText below the input, and the user's message is preserved for retry.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole("textbox");
    await expect(textarea).toBeInTheDocument();

    await userEvent.type(textarea, "Test error handling", { delay: 50 });
    await expect(textarea).toHaveValue("Test error handling");

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(
      () => {
        const errorText = canvas.getByText("Failed to submit. Please try again.");
        expect(errorText).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    await expect(textarea).toHaveValue("Test error handling");
  },
  render: () => (
    <PromptInput
      onSubmit={() => {
        throw new Error("Failed to submit. Please try again.");
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

/**
 * Async submission error handling
 */
export const AsyncSubmissionError: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Demonstrates error handling when async submission fails. Shows how Promise rejection is caught and displayed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole("textbox");
    await userEvent.type(textarea, "Test async error", { delay: 50 });

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(
      () => {
        const errorText = canvas.getByText("Network request failed");
        expect(errorText).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  },
  render: () => (
    <PromptInput
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        throw new Error("Network request failed");
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

/**
 * Minimal prompt input
 */
export const Minimal: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Minimal prompt input with only textarea and submit button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByPlaceholderText(/Message.../i);
    await expect(textarea).toBeInTheDocument();

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toBeInTheDocument();

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
    order: 10,
    docs: {
      description: {
        story: "Tests keyboard shortcuts: Enter to submit, Shift+Enter for new line.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByRole("textbox");

    await userEvent.type(textarea, "Line 1", { delay: 50 });
    await userEvent.keyboard("{Shift>}{Enter}{/Shift}");
    await userEvent.type(textarea, "Line 2", { delay: 50 });
    await expect(textarea).toHaveValue("Line 1\nLine 2");

    await userEvent.clear(textarea);

    await userEvent.type(textarea, "Test message", { delay: 50 });
    await userEvent.keyboard("{Enter}");

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await waitFor(
      () => {
        expect(submitButton).toHaveAttribute("data-status", "submitted");
      },
      { timeout: 300 }
    );
  },
  render: function KeyboardInteractionsStory() {
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");

    const handleSubmit: PromptInputSubmitHandler = (message, event) => {
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
    order: 11,
    docs: {
      description: {
        story:
          "Prompt input with advanced tools including settings button, model selector dropdown, and speech-to-text button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole("textbox");
    await expect(textarea).toBeInTheDocument();

    const settingsButton = canvas.getByLabelText(/Settings/i);
    await expect(settingsButton).toBeInTheDocument();

    const modelButton = canvas.getByRole("button", { name: /Agent model/i });
    await expect(modelButton).toBeInTheDocument();
    await expect(modelButton).toHaveAttribute("aria-haspopup", "menu");

    const submitButton = canvas.getByRole("button", { name: /submit/i });
    await expect(submitButton).toBeInTheDocument();
  },
  render: function PromptInputWithAdvancedToolsStory() {
    const [model, setModel] = useState("Agent model");
    const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit: PromptInputSubmitHandler = (message, event) => {
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
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="sm">
                    {model}
                    <IconChevronDown />
                  </Button>
                }
              />
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
 * Edge cases with long text, special characters, and unicode.
 */
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
    docs: {
      description: {
        story:
          "Edge cases including very long values, special characters, emoji, and unicode text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textareas = canvas.getAllByRole("textbox");
    await expect(textareas.length).toBe(4);

    const longTextLabel = canvas.getByText("Very long text input");
    await expect(longTextLabel).toBeInTheDocument();

    const specialCharsLabel = canvas.getByText("Special characters");
    await expect(specialCharsLabel).toBeInTheDocument();
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

    const handleSubmit: PromptInputSubmitHandler = (message, event) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      setStatus("submitted");
      setTimeout(() => setStatus("streaming"), 200);
      setTimeout(() => setStatus("ready"), 2000);
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
