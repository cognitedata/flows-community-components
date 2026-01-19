import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "@/components/ui/aura/label";
import {
  IconHome,
  IconMail,
  IconSettings,
  IconUser,
  IconFile,
  IconFolder,
} from "@tabler/icons-react";

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    // State
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Default open state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    value: {
      control: "text",
      description: "Controlled selected value",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },
    defaultValue: {
      control: "text",
      description: "Default selected value (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the select",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // Events
    onValueChange: {
      action: "valueChange",
      description: "Callback when value changes",
      table: {
        category: "Events",
        type: { summary: "(value: string) => void" },
      },
    },
    onOpenChange: {
      action: "openChange",
      description: "Callback when open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * Default select dropdown.
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default select dropdown for choosing from options.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click trigger
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    // Wait for content to appear
    await waitFor(() => {
      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
    });
  },
};

/**
 * Select with label.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="select-label">Choose an option</Label>
      <Select>
        <SelectTrigger id="select-label" className="w-[200px]">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asset">Asset</SelectItem>
          <SelectItem value="event">Event</SelectItem>
          <SelectItem value="timeseries">Time series</SelectItem>
          <SelectItem value="workorder">Work order</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with an associated label for accessibility.",
      },
    },
  },
};

/**
 * Select with icons.
 */
export const WithIcons: Story = {
  render: function SelectWithIcons() {
    const [value, setValue] = useState("settings");

    const iconMap: Record<string, React.ReactNode> = {
      user: <IconUser className="size-4" />,
      mail: <IconMail className="size-4" />,
      settings: <IconSettings className="size-4" />,
      home: <IconHome className="size-4" />,
    };

    return (
      <div className="space-y-4">
        <Label>Category</Label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select..." icon={value ? iconMap[value] : undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<IconUser className="size-4" />}>
              User
            </SelectItem>
            <SelectItem value="mail" icon={<IconMail className="size-4" />}>
              Mail
            </SelectItem>
            <SelectItem value="settings" icon={<IconSettings className="size-4" />}>
              Settings
            </SelectItem>
            <SelectItem value="home" icon={<IconHome className="size-4" />}>
              Home
            </SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Select with icons in both trigger and items.",
      },
    },
  },
};

/**
 * Disabled select.
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled select that cannot be interacted with.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeDisabled();
  },
};

/**
 * Select with error message.
 */
export const WithError: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="select-error">Required field</Label>
      <Select>
        <SelectTrigger
          id="select-error"
          className="w-[200px]"
          errorMessage="Please select an option"
        >
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with validation error message.",
      },
    },
  },
};

/**
 * Select with groups and labels.
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a file type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Documents</SelectLabel>
          <SelectItem value="pdf" icon={<IconFile className="size-4" />}>
            PDF
          </SelectItem>
          <SelectItem value="doc" icon={<IconFile className="size-4" />}>
            Word Document
          </SelectItem>
          <SelectItem value="xls" icon={<IconFile className="size-4" />}>
            Excel Spreadsheet
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Media</SelectLabel>
          <SelectItem value="image" icon={<IconFolder className="size-4" />}>
            Image
          </SelectItem>
          <SelectItem value="video" icon={<IconFolder className="size-4" />}>
            Video
          </SelectItem>
          <SelectItem value="audio" icon={<IconFolder className="size-4" />}>
            Audio
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with grouped items and separators.",
      },
    },
  },
};

/**
 * Select with default value.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="option2">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">First Option</SelectItem>
        <SelectItem value="option2">Second Option</SelectItem>
        <SelectItem value="option3">Third Option</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with a pre-selected default value.",
      },
    },
  },
};

/**
 * Controlled select.
 */
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <button
            onClick={() => setValue("red")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set Red
          </button>
          <button
            onClick={() => setValue("green")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set Green
          </button>
          <button
            onClick={() => setValue("")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Clear
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Selected: {value || "(none)"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled select with external state management.",
      },
    },
  },
};

/**
 * Select with disabled items.
 */
export const DisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="available1">Available Option</SelectItem>
        <SelectItem value="disabled1" disabled>
          Unavailable Option
        </SelectItem>
        <SelectItem value="available2">Another Available</SelectItem>
        <SelectItem value="disabled2" disabled>
          Also Unavailable
        </SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with some items disabled.",
      },
    },
  },
};

/**
 * Small size select.
 */
export const SmallSize: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Select>
        <SelectTrigger size="sm" className="w-[150px]">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger size="default" className="w-[150px]">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select in different sizes.",
      },
    },
  },
};

/**
 * All select states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label>Default</Label>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>With Value</Label>
        <Select defaultValue="option1">
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Selected Option</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Disabled</Label>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>With Error</Label>
        <Select>
          <SelectTrigger className="w-[200px]" errorMessage="Required">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All select states for comparison.",
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
        <h3 className="text-sm font-semibold text-muted-foreground">States</h3>
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="selected">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">Selected</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* With icons */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <Select defaultValue="settings">
          <SelectTrigger className="w-[200px]">
            <SelectValue icon={<IconSettings className="size-4" />} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="settings" icon={<IconSettings className="size-4" />}>
              Settings
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Error state */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Error</h3>
        <Select>
          <SelectTrigger className="w-[200px]" errorMessage="This is required">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Option</SelectItem>
          </SelectContent>
        </Select>
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
    defaultOpen: false,
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with select props.",
      },
    },
  },
};
