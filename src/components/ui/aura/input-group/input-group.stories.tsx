import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconCheck, IconSearch, IconSend, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "../button";
import { Kbd } from "../kbd";
import { Label } from "../label";
import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "../prompt-input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./input-group";
const meta: Meta<typeof InputGroup> = {
  title: "Primitives/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      table: {
        category: "Variants/Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-90">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InputGroup>;
export const Basic: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <IconSearch className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search...");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "test query");
    await expect(input).toHaveValue("test query");
  },
};
export const InlineEnd: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter command..." />
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    order: 2,
  },
};
export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@example.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
  parameters: {
    order: 3,
  },
};
export const WithButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>
            <IconSearch className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupButton variant="ghost">
            <IconSearch className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="ghost">
            <IconX className="size-4" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
  parameters: {
    order: 4,
  },
};
export const BlockStart: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Email</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Enter your email..." />
    </InputGroup>
  ),
  parameters: {
    order: 5,
  },
};
export const BlockEnd: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Enter your message..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>Character count: 0/100</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    order: 6,
  },
};
export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Description</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Enter a detailed description..." rows={4} />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="sm" variant="default">
          <IconSend className="size-4" />
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    order: 7,
  },
};
export const Complex: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Message</InputGroupText>
        <InputGroupButton size="xs" variant="ghost">
          <IconCheck className="size-3.5" />
          Options
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Type your message..." rows={3} />
      <InputGroupAddon align="block-end">
        <InputGroupText>Press ⌘+Enter to send</InputGroupText>
        <InputGroupButton size="sm" variant="default">
          <IconSend className="size-4" />
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    order: 8,
  },
};
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup data-disabled="true">
        <InputGroupAddon align="inline-start">
          <IconSearch className="size-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Disabled input" disabled />
      </InputGroup>
      <InputGroup data-disabled="true">
        <InputGroupAddon align="block-start">
          <InputGroupText>Disabled</InputGroupText>
        </InputGroupAddon>
        <InputGroupTextarea placeholder="Disabled textarea" rows={3} disabled />
      </InputGroup>
    </div>
  ),
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox");
    for (const input of inputs) {
      await expect(input).toBeDisabled();
    }
  },
};
export const WithError: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="error-input">Email</Label>
        <InputGroup>
          <InputGroupInput
            id="error-input"
            type="email"
            placeholder="Enter email"
            aria-invalid={true}
          />
        </InputGroup>
        <p className="text-destructive-foreground text-sm">Please enter a valid email address</p>
      </div>
      <div className="space-y-1">
        <Label htmlFor="error-textarea">Comment</Label>
        <InputGroup>
          <InputGroupTextarea
            id="error-textarea"
            placeholder="Enter comment"
            rows={3}
            aria-invalid={true}
          />
        </InputGroup>
        <p className="text-destructive-foreground text-sm">Comment is required</p>
      </div>
    </div>
  ),
  parameters: {
    order: 10,
  },
};
export const Interactive: Story = {
  render: function InteractiveInputGroup() {
    const [value, setValue] = useState("");
    const maxLength = 100;
    return (
      <div className="space-y-4">
        <InputGroup>
          <InputGroupAddon align="block-start">
            <InputGroupText>Tweet</InputGroupText>
          </InputGroupAddon>
          <InputGroupTextarea
            placeholder="What's happening?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            maxLength={maxLength}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText>
              {value.length}/{maxLength}
            </InputGroupText>
            <InputGroupButton
              size="sm"
              variant="default"
              disabled={value.length === 0}
              onClick={() => {
                alert(`Posted: ${value}`);
                setValue("");
              }}
            >
              Post
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("What's happening?");
    const button = canvas.getByText("Post");
    await expect(button).toBeDisabled();
    await userEvent.type(textarea, "Hello world!");
    await expect(textarea).toHaveValue("Hello world!");
    await waitFor(() => {
      expect(canvas.getByText("12/100")).toBeInTheDocument();
    });
    await expect(button).toBeEnabled();
  },
};
export const PromptInputExample: Story = {
  render: () => (
    <PromptInput
      onSubmit={(message) => {
        console.log("Submitted:", message);
      }}
      helperText={false}
    >
      <PromptInputBody>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea placeholder="Ask me anything..." />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools />
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  ),
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText("Ask me anything...");
    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, "Test message");
    await expect(textarea).toHaveValue("Test message");
  },
};
export const AllAlignments: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Inline Start</h4>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <IconSearch className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Inline End</h4>
        <InputGroup>
          <InputGroupInput placeholder="Command..." />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Block Start</h4>
        <InputGroup>
          <InputGroupAddon align="block-start">
            <InputGroupText>Label</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="Enter text..." />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Block End</h4>
        <InputGroup>
          <InputGroupInput placeholder="Enter text..." />
          <InputGroupAddon align="block-end">
            <InputGroupText>Helper text</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
  parameters: {
    order: 13,
  },
};
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Empty Input</h4>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <IconSearch className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="" />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Very Long Text</h4>
        <InputGroup>
          <InputGroupInput
            defaultValue="This is a very long text value that should overflow properly and handle text wrapping correctly within the input group container boundaries"
            placeholder="Long text..."
          />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Multiple Buttons</h4>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupButton variant="ghost" size="icon-xs">
              <IconSearch className="size-3.5" />
            </InputGroupButton>
            <InputGroupButton variant="ghost" size="icon-xs">
              <IconX className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="default" size="xs">
              Submit
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-semibold">Icon Only Button</h4>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs">
              <IconSearch className="size-3.5" />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
  parameters: {
    order: 14,
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4 w-100">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <IconSearch className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Text</h3>
        <InputGroup>
          <InputGroupAddon align="inline-start">
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Buttons</h3>
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="sm">Search</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Textarea</h3>
        <InputGroup>
          <InputGroupTextarea placeholder="Message..." rows={3} />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <InputGroup data-disabled="true">
          <InputGroupInput placeholder="Disabled" disabled />
        </InputGroup>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Error</h3>
        <InputGroup>
          <InputGroupInput placeholder="Error state" aria-invalid={true} />
        </InputGroup>
      </div>
    </div>
  ),
  parameters: {
    order: 15,
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};
export const Playground: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <IconSearch className="size-4" />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="sm">Search</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  parameters: {
    order: 99,
  },
};
