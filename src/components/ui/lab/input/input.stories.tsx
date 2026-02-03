import { Label } from "@cognite/aura-lab/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { Input } from "./input";

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
      <div className="w-75">
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
 * Password input.
 */
export const Password: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor="password">Password</Label>
      <Input type="password" id="password" placeholder="Input text" />
    </div>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Password input with obscured text.",
      },
    },
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
    order: 4,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
        <Input id="form-email" type="email" placeholder="Input text" required />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="form-password">Password</Label>
        <Input id="form-password" type="password" placeholder="Input text" required />
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
    order: 9,
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
        <Label htmlFor="state-error">Error</Label>
        <Input id="state-error" placeholder="Input text" errorMessage="Help text" />
      </div>
    </div>
  ),
  parameters: {
    order: 10,
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
        <h3 className="text-sm font-semibold text-muted-foreground">States</h3>
        <div className="space-y-3">
          <Input placeholder="Input text" />
          <Input defaultValue="Input text" />
          <Input placeholder="Input text" disabled />
          <Input placeholder="Input text" errorMessage="Error message" />
        </div>
      </div>

      {/* With labels */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Labels</h3>
        <div className="grid items-center gap-1 ">
          <Label htmlFor="vr-labeled">Labeled input</Label>
          <Input id="vr-labeled" placeholder="Input text" />
        </div>
      </div>

      {/* Types */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Types</h3>
        <div className="space-y-3">
          <Input type="text" placeholder="Input text" />
          <Input type="email" placeholder="Input text" />
          <Input type="password" placeholder="Input text" />
          <Input type="number" placeholder="Input text" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 11,
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
