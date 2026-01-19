import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useState } from "react";
import { Toggle } from "./toggle";
import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
} from "@tabler/icons-react";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Visual style variant",
      table: {
        category: "Appearance",
        type: { summary: '"default" | "outline"' },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the toggle",
      table: {
        category: "Appearance",
        type: { summary: '"default" | "sm" | "lg"' },
        defaultValue: { summary: "default" },
      },
    },
    pressed: {
      control: "boolean",
      description: "Controlled pressed state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultPressed: {
      control: "boolean",
      description: "Default pressed state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onPressedChange: {
      action: "pressedChange",
      description: "Callback when pressed state changes",
      table: {
        category: "Events",
        type: { summary: "(pressed: boolean) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

/**
 * Default toggle button.
 */
export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default toggle button with icon.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");

    await expect(toggle).toBeInTheDocument();
    await expect(toggle).toHaveAttribute("data-state", "off");

    // Click to toggle on
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("data-state", "on");

    // Click to toggle off
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("data-state", "off");
  },
};

/**
 * Toggle with text.
 */
export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <IconItalic className="size-4" />
      Italic
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle with both icon and text.",
      },
    },
  },
};

/**
 * Outline variant.
 */
export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle with outline variant styling.",
      },
    },
  },
};

/**
 * Different sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle size="sm" aria-label="Small">
        <IconBold className="size-4" />
      </Toggle>
      <Toggle size="default" aria-label="Default">
        <IconBold className="size-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large">
        <IconBold className="size-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle in different sizes.",
      },
    },
  },
};

/**
 * Default pressed state.
 */
export const DefaultPressed: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle that starts in pressed state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");
    await expect(toggle).toHaveAttribute("data-state", "on");
  },
};

/**
 * Disabled toggle.
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle disabled aria-label="Disabled off">
        <IconBold className="size-4" />
      </Toggle>
      <Toggle disabled defaultPressed aria-label="Disabled on">
        <IconBold className="size-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled toggles in both states.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggles = canvas.getAllByRole("button");
    for (const toggle of toggles) {
      await expect(toggle).toBeDisabled();
    }
  },
};

/**
 * Controlled toggle.
 */
export const Controlled: Story = {
  render: function ControlledToggle() {
    const [pressed, setPressed] = useState(false);

    return (
      <div className="space-y-4">
        <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Toggle bold">
          <IconBold className="size-4" />
          Bold
        </Toggle>
        <div className="flex gap-2">
          <button
            onClick={() => setPressed(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Press
          </button>
          <button
            onClick={() => setPressed(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Unpress
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Pressed: {pressed ? "true" : "false"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled toggle with external state management.",
      },
    },
  },
};

/**
 * Toggle group (text formatting toolbar).
 */
export const ToolbarExample: Story = {
  render: function ToolbarToggle() {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="flex items-center gap-1 rounded-md border p-1">
        <Toggle pressed={bold} onPressedChange={setBold} aria-label="Toggle bold" size="sm">
          <IconBold className="size-4" />
        </Toggle>
        <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Toggle italic" size="sm">
          <IconItalic className="size-4" />
        </Toggle>
        <Toggle
          pressed={underline}
          onPressedChange={setUnderline}
          aria-label="Toggle underline"
          size="sm"
        >
          <IconUnderline className="size-4" />
        </Toggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple toggles in a toolbar for text formatting.",
      },
    },
  },
};

/**
 * Single-select toggle group (alignment).
 */
export const SingleSelectGroup: Story = {
  render: function SingleSelectToggle() {
    const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");

    return (
      <div className="flex items-center gap-1 rounded-md border p-1">
        <Toggle
          pressed={alignment === "left"}
          onPressedChange={() => setAlignment("left")}
          aria-label="Align left"
          size="sm"
        >
          <IconAlignLeft className="size-4" />
        </Toggle>
        <Toggle
          pressed={alignment === "center"}
          onPressedChange={() => setAlignment("center")}
          aria-label="Align center"
          size="sm"
        >
          <IconAlignCenter className="size-4" />
        </Toggle>
        <Toggle
          pressed={alignment === "right"}
          onPressedChange={() => setAlignment("right")}
          aria-label="Align right"
          size="sm"
        >
          <IconAlignRight className="size-4" />
        </Toggle>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Toggle group with single selection for alignment options.",
      },
    },
  },
};

/**
 * All toggle states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Toggle aria-label="Off state">
          <IconBold className="size-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Off</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle defaultPressed aria-label="On state">
          <IconBold className="size-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">On</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle disabled aria-label="Disabled off">
          <IconBold className="size-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Disabled (off)</span>
      </div>
      <div className="flex items-center gap-4">
        <Toggle disabled defaultPressed aria-label="Disabled on">
          <IconBold className="size-4" />
        </Toggle>
        <span className="text-sm text-muted-foreground">Disabled (on)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All toggle states for comparison.",
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
      {/* Variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Variants</h3>
        <div className="flex gap-4">
          <Toggle aria-label="Default">
            <IconBold className="size-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Outline">
            <IconBold className="size-4" />
          </Toggle>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Sizes</h3>
        <div className="flex items-center gap-4">
          <Toggle size="sm" aria-label="Small">
            <IconBold className="size-4" />
          </Toggle>
          <Toggle size="default" aria-label="Default">
            <IconBold className="size-4" />
          </Toggle>
          <Toggle size="lg" aria-label="Large">
            <IconBold className="size-4" />
          </Toggle>
        </div>
      </div>

      {/* States */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">States</h3>
        <div className="flex gap-4">
          <Toggle aria-label="Off">
            <IconBold className="size-4" />
          </Toggle>
          <Toggle defaultPressed aria-label="On">
            <IconBold className="size-4" />
          </Toggle>
          <Toggle disabled aria-label="Disabled">
            <IconBold className="size-4" />
          </Toggle>
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
    variant: "default",
    size: "default",
    disabled: false,
    defaultPressed: false,
  },
  render: (args) => (
    <Toggle {...args} aria-label="Playground toggle">
      <IconBold className="size-4" />
    </Toggle>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with toggle props.",
      },
    },
  },
};
