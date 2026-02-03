import { Label } from "@cognite/aura-lab/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    // State
    checked: {
      control: "boolean",
      description: "Controlled checked state",
      table: {
        category: "State",
        type: { summary: 'boolean | "indeterminate"' },
      },
    },
    defaultChecked: {
      control: "boolean",
      description: "Default checked state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the checkbox",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Mark as required for form validation",
      table: {
        category: "Validation",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    name: {
      control: "text",
      description: "Name attribute for form submission",
      table: {
        category: "Form",
        type: { summary: "string" },
      },
    },
    value: {
      control: "text",
      description: "Value attribute for form submission",
      table: {
        category: "Form",
        type: { summary: "string" },
        defaultValue: { summary: "on" },
      },
    },

    // Events
    onCheckedChange: {
      action: "checkedChange",
      description: "Callback when checked state changes",
      table: {
        category: "Events",
        type: { summary: '(checked: boolean | "indeterminate") => void' },
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
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * Default unchecked checkbox.
 */
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="default" />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default checkbox in unchecked state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find checkbox
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();

    // Click to check
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    // Click to uncheck
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

/**
 * Checkbox that is checked by default.
 */
export const DefaultChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Receive marketing emails</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkbox that starts in checked state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeChecked();
  },
};

/**
 * Disabled checkbox states.
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="opacity-50">
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-50">
          Disabled checked
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled checkboxes in both checked and unchecked states.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole("checkbox");

    for (const checkbox of checkboxes) {
      await expect(checkbox).toBeDisabled();
    }
  },
};

/**
 * Controlled checkbox with external state.
 */
export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Check
          </button>
          <button
            type="button"
            onClick={() => setChecked(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Uncheck
          </button>
          <button
            type="button"
            onClick={() => setChecked(!checked)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Toggle
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Checked: {checked ? "true" : "false"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Checkbox with externally controlled state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Check button
    const checkButton = canvas.getByText("Check");
    await userEvent.click(checkButton);

    // Verify checked
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toBeChecked();

    // Click Uncheck button
    const uncheckButton = canvas.getByText("Uncheck");
    await userEvent.click(uncheckButton);

    // Verify unchecked
    await expect(checkbox).not.toBeChecked();
  },
};

/**
 * Indeterminate checkbox state.
 */
export const Indeterminate: Story = {
  render: function IndeterminateCheckbox() {
    const [checked, setChecked] = useState<boolean | "indeterminate">("indeterminate");

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="indeterminate" checked={checked} onCheckedChange={setChecked} />
          <Label htmlFor="indeterminate">Select all items</Label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setChecked(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            None
          </button>
          <button
            type="button"
            onClick={() => setChecked("indeterminate")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Indeterminate
          </button>
        </div>
        <p className="text-sm text-muted-foreground">State: {String(checked)}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox with indeterminate state for "select all" patterns.',
      },
    },
  },
};

/**
 * Checkbox group example.
 */
export const CheckboxGroup: Story = {
  render: function CheckboxGroupExample() {
    const [selected, setSelected] = useState<string[]>(["email"]);

    const toggleItem = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    return (
      <div className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Notification preferences</legend>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={selected.includes("email")}
              onCheckedChange={() => toggleItem("email")}
            />
            <Label htmlFor="email">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sms"
              checked={selected.includes("sms")}
              onCheckedChange={() => toggleItem("sms")}
            />
            <Label htmlFor="sms">SMS notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="push"
              checked={selected.includes("push")}
              onCheckedChange={() => toggleItem("push")}
            />
            <Label htmlFor="push">Push notifications</Label>
          </div>
        </fieldset>
        <p className="text-sm text-muted-foreground">Selected: {selected.join(", ") || "None"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Group of checkboxes for multiple selection.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Email should be checked by default
    const emailCheckbox = canvas.getByLabelText("Email notifications");
    await expect(emailCheckbox).toBeChecked();

    // Click SMS to check it
    const smsCheckbox = canvas.getByLabelText("SMS notifications");
    await userEvent.click(smsCheckbox);
    await expect(smsCheckbox).toBeChecked();
  },
};

/**
 * Checkbox with form validation.
 */
export const WithValidation: Story = {
  render: () => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert("Form submitted!");
      }}
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms">
          I agree to the terms and conditions <span className="text-red-500">*</span>
        </Label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "Required checkbox for form validation.",
      },
    },
  },
};

/**
 * Checkbox without label (icon-only).
 */
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox aria-label="Option 1" />
      <Checkbox aria-label="Option 2" defaultChecked />
      <Checkbox aria-label="Option 3" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkboxes without visible labels (with aria-label for accessibility).",
      },
    },
  },
};

/**
 * All checkbox states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked-state" defaultChecked />
        <Label htmlFor="checked-state">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked-state" disabled />
        <Label htmlFor="disabled-unchecked-state" className="opacity-50">
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked-state" disabled defaultChecked />
        <Label htmlFor="disabled-checked-state" className="opacity-50">
          Disabled checked
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All checkbox states for comparison.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {/* States */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">All States</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-unchecked" />
            <Label htmlFor="vr-unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-checked" defaultChecked />
            <Label htmlFor="vr-checked">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-disabled" disabled />
            <Label htmlFor="vr-disabled" className="opacity-50">
              Disabled
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-disabled-checked" disabled defaultChecked />
            <Label htmlFor="vr-disabled-checked" className="opacity-50">
              Disabled Checked
            </Label>
          </div>
        </div>
      </div>

      {/* Without labels */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Without Labels</h3>
        <div className="flex gap-4">
          <Checkbox aria-label="Option 1" />
          <Checkbox aria-label="Option 2" defaultChecked />
          <Checkbox aria-label="Option 3" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    disabled: false,
    defaultChecked: false,
    required: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox id="playground" {...args} />
      <Label htmlFor="playground">Playground checkbox</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with checkbox props.",
      },
    },
  },
};
