import { Button } from "@/components/ui/aura/button";
import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconFile,
  IconFolder,
  IconHome,
  IconMail,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
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
      <SelectTrigger className="w-50">
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
    order: 1,
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
        <SelectTrigger id="select-label" className="w-50">
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
    order: 2,
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
          <SelectTrigger className="w-50">
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
    order: 3,
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
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 4,
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
          className="w-50"
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
    order: 5,
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
      <SelectTrigger className="w-50">
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
    order: 6,
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
      <SelectTrigger className="w-50">
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
    order: 7,
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
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="red">Red</SelectItem>
            <SelectItem value="green">Green</SelectItem>
            <SelectItem value="blue">Blue</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setValue("red")}>
            Set Red
          </Button>
          <Button size="sm" variant="outline" onClick={() => setValue("green")}>
            Set Green
          </Button>
          <Button size="sm" variant="outline" onClick={() => setValue("")}>
            Clear
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Selected: {value || "(none)"}</p>
      </div>
    );
  },
  parameters: {
    order: 8,
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
      <SelectTrigger className="w-50">
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
    order: 9,
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
        <SelectTrigger size="sm" className="w-37.5">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger size="default" className="w-37.5">
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
    order: 10,
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
          <SelectTrigger className="w-50">
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
          <SelectTrigger className="w-50">
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
          <SelectTrigger className="w-50">
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
          <SelectTrigger className="w-50" errorMessage="Required">
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
    order: 11,
    docs: {
      description: {
        story: "All select states for comparison.",
      },
    },
  },
};

/**
 * Long option labels and constrained width to demonstrate wrapping and overflow behaviour.
 */
export const LongTextAndOverflow: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="w-40">
        <Label>Long option labels</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option with long text" />
          </SelectTrigger>
          <SelectContent className="max-h-40">
            <SelectItem value="option1">
              This is a very long option label that should wrap or truncate when space is limited
            </SelectItem>
            <SelectItem value="option2">
              Another extremely verbose option label demonstrating overflow behaviour in the list
            </SelectItem>
            <SelectItem value="option3">Short label</SelectItem>
            <SelectItem value="option4">
              Yet another long option label to force vertical scrolling inside the menu content area
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        The trigger is constrained by a narrow container while the dropdown content has a limited
        max height with scrolling enabled, helping you see how long labels behave in tight layouts.
      </p>
    </div>
  ),
  parameters: {
    order: 12,
    docs: {
      description: {
        story:
          "Select constrained by a narrow container with very long option labels and a scrollable menu to demonstrate text wrapping and overflow behaviour.",
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
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Option</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="selected">
            <SelectTrigger className="w-37.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="selected">Selected</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-37.5">
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
          <SelectTrigger className="w-50">
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
          <SelectTrigger className="w-50" errorMessage="This is required">
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
    order: 13,
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
 * Empty select with no items to demonstrate edge case behavior.
 */
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>Empty select</Label>
      <Select>
        <SelectTrigger className="w-50">
          <SelectValue placeholder="No options available" />
        </SelectTrigger>
        <SelectContent>
          {/* No items */}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Select with no options demonstrates empty state handling.
      </p>
    </div>
  ),
  parameters: {
    order: 14,
    docs: {
      description: {
        story: "Select with no options to demonstrate empty state behavior.",
      },
    },
  },
};

/**
 * Select with special characters, emojis, and HTML entities.
 */
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>Special characters</Label>
      <Select>
        <SelectTrigger className="w-50">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="emoji1">🎉 Party time!</SelectItem>
          <SelectItem value="emoji2">🚀 Launch</SelectItem>
          <SelectItem value="special1">{"Option with <HTML> & 'quotes'"}</SelectItem>
          <SelectItem value="special2">{"C++ & C# & Java"}</SelectItem>
          <SelectItem value="unicode">Ü니코드文字</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Tests rendering of emojis, special characters, and HTML entities.
      </p>
    </div>
  ),
  parameters: {
    order: 15,
    docs: {
      description: {
        story: "Select with emojis, special characters, and HTML entities to test proper escaping and rendering.",
      },
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
      <SelectTrigger className="w-50">
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
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with select props.",
      },
    },
  },
};
