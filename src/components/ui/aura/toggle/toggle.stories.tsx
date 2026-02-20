import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconUnderline,
} from "@tabler/icons-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Toggle } from "./toggle";
const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      table: {
        category: "Appearance",
        type: {
          summary: '"default" | "outline"',
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      table: {
        category: "Appearance",
        type: {
          summary: '"default" | "sm" | "lg"',
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    pressed: {
      control: "boolean",
      table: {
        category: "State",
        type: {
          summary: "boolean",
        },
      },
    },
    defaultPressed: {
      control: "boolean",
      table: {
        category: "State",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        category: "State",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    onPressedChange: {
      action: "pressedChange",
      table: {
        category: "Events",
        type: {
          summary: "(pressed: boolean) => void",
        },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;
export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");
    await expect(toggle).toBeInTheDocument();
    await expect(toggle).not.toHaveAttribute("data-pressed");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("data-pressed");
    await userEvent.click(toggle);
    await expect(toggle).not.toHaveAttribute("data-pressed");
  },
};
export const WithText: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <IconItalic className="size-4" />
      Italic
    </Toggle>
  ),
};
export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  ),
};
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
};
export const DefaultPressed: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");
    await expect(toggle).toHaveAttribute("data-pressed");
  },
};
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggles = canvas.getAllByRole("button");
    for (const toggle of toggles) {
      await expect(toggle).toBeDisabled();
    }
  },
};
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
            type="button"
            onClick={() => setPressed(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Press
          </button>
          <button
            type="button"
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
};
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
};
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
};
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
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4">
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
    chromatic: {
      disableSnapshot: false,
    },
  },
};
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
};
