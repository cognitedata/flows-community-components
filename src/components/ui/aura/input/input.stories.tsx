import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import { Input, PasswordInput } from "./input";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    // Form
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "The type of input",
      table: {
        category: "Form",
        type: { summary: "string" },
        defaultValue: { summary: "text" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: {
        category: "Form",
        type: { summary: "string" },
      },
    },
    defaultValue: {
      control: "text",
      description: "Default value (uncontrolled)",
      table: {
        category: "Form",
        type: { summary: "string" },
      },
    },

    // State
    disabled: {
      control: "boolean",
      description: "Disable the input",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    readOnly: {
      control: "boolean",
      description: "Make the input read-only",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
      table: {
        category: "Validation",
        type: { summary: "string" },
      },
    },

    // Styling
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
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Default text input.
 */
export const Default: Story = {
  render: () => <Input placeholder="Input text" />,
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default text input with placeholder.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Input text");

    await expect(input).toBeInTheDocument();

    // Type in input
    await userEvent.type(input, "Input text");
    await expect(input).toHaveValue("Input text");
  },
};

/**
 * Input with label.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="email">Email address</Label>
      <Input type="email" id="email" placeholder="Input text" />
    </div>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Input field with an associated label for accessibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email address");
    await expect(input).toBeInTheDocument();
  },
};

/**
 * Disabled input.
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="disabled-empty">Disabled (empty)</Label>
        <Input id="disabled-empty" placeholder="Input text" disabled />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="disabled-value">Disabled (with value)</Label>
        <Input id="disabled-value" defaultValue="Input text" disabled />
      </div>
    </div>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Disabled inputs prevent user interaction.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox");
    for (const input of inputs) {
      await expect(input).toBeDisabled();
    }
  },
};

/**
 * Read-only input with copy button.
 */
export const ReadOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="readonly-value">API Key</Label>
        <Input id="readonly-value" defaultValue="sk-1234567890abcdef" readOnly />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="readonly-no-copy">Read-only without copy</Label>
        <Input id="readonly-no-copy" defaultValue="Cannot copy this" readOnly copy={false} />
      </div>
    </div>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Read-only inputs display data without allowing user modification. A copy button is shown by default, which can be disabled with copy={false}.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstInput = canvas.getByDisplayValue("sk-1234567890abcdef");
    await expect(firstInput).toHaveAttribute("readonly");

    const copyButton = canvas.getByLabelText("Copy to clipboard");
    await expect(copyButton).toBeInTheDocument();

    await userEvent.click(copyButton);
    await waitFor(
      () => {
        expect(canvas.getByLabelText("Copied")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
};

/**
 * Input with error message.
 */
export const WithError: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="error">Email address</Label>
      <Input id="error" type="email" placeholder="Input text" errorMessage="Help text" />
    </div>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Input with validation error message displayed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorText = canvas.getByText("Help text");
    await expect(errorText).toBeInTheDocument();
  },
};

/**
 * Input with default value.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="prefilled">Username</Label>
      <Input id="prefilled" defaultValue="Input text" />
    </div>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Input with a pre-filled default value.",
      },
    },
  },
};

/**
 * Controlled input.
 */
export const Controlled: Story = {
  render: function ControlledInput() {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <div className="grid w-full items-center gap-1">
          <Label htmlFor="controlled">Controlled input</Label>
          <Input
            id="controlled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Input text"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => setValue("Hello!")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set "Hello!"
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Value: {value || "(empty)"}</p>
      </div>
    );
  },
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "Controlled input with external state management.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Controlled input");

    // Type in input
    await userEvent.type(input, "Test");
    await expect(input).toHaveValue("Test");

    // Clear using button
    const clearButton = canvas.getByText("Clear");
    await userEvent.click(clearButton);
    await expect(input).toHaveValue("");
  },
};

/**
 * Different input types.
 */
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="text-type">Text</Label>
        <Input id="text-type" type="text" placeholder="Input text" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="email-type">Email</Label>
        <Input id="email-type" type="email" placeholder="Input text" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="number-type">Number</Label>
        <Input id="number-type" type="number" placeholder="Input text" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="tel-type">Telephone</Label>
        <Input id="tel-type" type="tel" placeholder="Input text" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="url-type">URL</Label>
        <Input id="url-type" type="url" placeholder="Input text" />
      </div>
    </div>
  ),
  parameters: {
    order: 12,
    docs: {
      description: {
        story: "Various input types for different data formats.",
      },
    },
  },
};

/**
 * Form example with multiple inputs.
 */
export const FormExample: Story = {
  render: () => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submitted!");
      }}
    >
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="form-email">Email</Label>
        <Input id="form-email" type="email" placeholder="Enter your email" required />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="form-password">Password</Label>
        <PasswordInput id="form-password" placeholder="Enter your password" required />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Sign In
      </button>
    </form>
  ),
  parameters: {
    order: 13,
    docs: {
      description: {
        story: "Complete form example with email and password inputs.",
      },
    },
  },
};

/**
 * All input states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="state-default">Default</Label>
        <Input id="state-default" placeholder="Input text" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="state-filled">Filled</Label>
        <Input id="state-filled" defaultValue="Input text" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="state-disabled">Disabled</Label>
        <Input id="state-disabled" placeholder="Input text" disabled />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="state-readonly">Read-only</Label>
        <Input id="state-readonly" defaultValue="Input text" readOnly />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="state-error">Error</Label>
        <Input id="state-error" placeholder="Input text" errorMessage="Help text" />
      </div>
    </div>
  ),
  parameters: {
    order: 14,
    docs: {
      description: {
        story: "All input states for comparison.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4 w-[350px]">
      {/* States */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Input States</h3>
        <div className="space-y-3">
          <Input placeholder="Input text" />
          <Input defaultValue="Input text" />
          <Input placeholder="Input text" disabled />
          <Input defaultValue="Input text" readOnly />
          <Input placeholder="Input text" errorMessage="Error message" />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Password Input</h3>
        <div className="space-y-3">
          <PasswordInput placeholder="Enter password" />
          <PasswordInput defaultValue="password123" />
          <PasswordInput defaultValue="password123" disabled />
        </div>
      </div>

      {/* Types */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Input Types</h3>
        <div className="space-y-3">
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="number" placeholder="Number input" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 15,
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
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

/**
 * Password input with show/hide toggle.
 */
export const PasswordBasic: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="password-input">Password</Label>
      <PasswordInput id="password-input" placeholder="Enter your password" />
    </div>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Password input with built-in show/hide toggle button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Enter your password");
    await expect(input).toHaveAttribute("type", "password");

    const toggleButton = canvas.getByLabelText("Show password");
    await expect(toggleButton).toBeInTheDocument();

    await userEvent.click(toggleButton);
    await waitFor(() => {
      expect(input).toHaveAttribute("type", "text");
    });

    await userEvent.click(canvas.getByLabelText("Hide password"));
    await waitFor(() => {
      expect(input).toHaveAttribute("type", "password");
    });
  },
};

/**
 * Password input with value.
 */
export const PasswordWithValue: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="password-filled">Password</Label>
      <PasswordInput id="password-filled" defaultValue="Xa.$}KJb319" />
    </div>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Password input with a pre-filled value.",
      },
    },
  },
};

/**
 * Password input with error.
 */
export const PasswordWithError: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="password-error">Password</Label>
      <PasswordInput
        id="password-error"
        defaultValue="weak"
        errorMessage="Password must be at least 8 characters"
      />
    </div>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Password input with validation error message.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorText = canvas.getByText("Password must be at least 8 characters");
    await expect(errorText).toBeInTheDocument();
  },
};

/**
 * Password input states.
 */
export const PasswordStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="password-default">Default</Label>
        <PasswordInput id="password-default" placeholder="Enter password" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="password-filled-state">Filled</Label>
        <PasswordInput id="password-filled-state" defaultValue="password123" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="password-disabled">Disabled</Label>
        <PasswordInput id="password-disabled" defaultValue="password123" disabled />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="password-error-state">Error</Label>
        <PasswordInput id="password-error-state" defaultValue="weak" errorMessage="Too weak" />
      </div>
    </div>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "All password input states for comparison.",
      },
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    type: "text",
    placeholder: "Input text",
    disabled: false,
    errorMessage: "",
  },
  render: (args) => <Input {...args} />,
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with input props.",
      },
    },
  },
};
