import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import {
  IconArrowLeft,
  IconBold,
  IconChevronDown,
  IconDots,
  IconItalic,
  IconTrash,
  IconUnderline,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/aura/button";
import { ButtonGroup, ButtonGroupSeparator } from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Primitives/Button group",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout orientation for the grouped controls",
      table: {
        category: "Variants/Styling",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the group wrapper",
      table: {
        category: "Advanced",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/**
 * Toolbar with icon and text buttons separated into logical groups.
 */
export const Basic: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <IconArrowLeft className="size-4" />
      </Button>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Report</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Snooze</Button>
      <Button variant="outline" size="icon">
        <IconDots className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Toolbar with icon and text buttons separated into logical groups.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    const buttons = await canvas.findAllByRole("button");

    await expect(group).toBeInTheDocument();
    await expect(buttons).toHaveLength(5);
  },
};

/**
 * Primary variant for prominent call-to-action groups.
 */
export const Primary: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Save</Button>
      <Button size="icon">
        <IconChevronDown className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Primary variant for prominent call-to-action groups.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    const buttons = await canvas.findAllByRole("button");

    await expect(group).toBeInTheDocument();
    await expect(buttons).toHaveLength(2);
  },
};

/**
 * Secondary variant for less prominent actions.
 */
export const Secondary: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="secondary">Export</Button>
      <Button variant="secondary">Import</Button>
      <Button variant="secondary">Settings</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Secondary variant for less prominent actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole("button");
    await expect(buttons).toHaveLength(3);
  },
};

/**
 * Ghost variant for toolbars with minimal visual weight.
 */
export const Ghost: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="ghost" size="icon">
        <IconBold className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <IconItalic className="size-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <IconUnderline className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Ghost variant for toolbars with minimal visual weight.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole("button");
    await expect(buttons).toHaveLength(3);
  },
};

/**
 * Destructive variant for dangerous actions.
 */
export const Destructive: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
      <Button variant="destructive" size="icon">
        <IconChevronDown className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Destructive variant for dangerous actions requiring confirmation.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole("button");
    await expect(buttons).toHaveLength(2);
    await expect(canvas.getByText("Delete")).toBeInTheDocument();
  },
};

/**
 * Split button pattern with dropdown trigger in different variants.
 */
export const SplitButton: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button>Save changes</Button>
        <Button size="icon">
          <IconChevronDown className="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Save changes</Button>
        <Button variant="outline" size="icon">
          <IconChevronDown className="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Save changes</Button>
        <Button variant="secondary" size="icon">
          <IconChevronDown className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Split button pattern with dropdown trigger in different variants.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole("group");
    await expect(groups).toHaveLength(3);
  },
};

/**
 * Vertical layout for stacked actions.
 */
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Vertical layout for stacked actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    await expect(group).toHaveAttribute("data-orientation", "vertical");
  },
};

/**
 * Multiple button groups with mixed variants in a toolbar.
 */
export const ToolbarLayout: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <ButtonGroup>
        <Button variant="ghost" size="icon">
          <IconBold className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <IconItalic className="size-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <IconUnderline className="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Undo</Button>
        <Button variant="outline">Redo</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Export</Button>
        <Button variant="secondary" size="icon">
          <IconChevronDown className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Multiple button groups with mixed variants in a toolbar.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole("group");
    await expect(groups).toHaveLength(3);
    await expect(canvas.getByText("Undo")).toBeInTheDocument();
    await expect(canvas.getByText("Redo")).toBeInTheDocument();
    await expect(canvas.getByText("Export")).toBeInTheDocument();
  },
};

/**
 * Button groups work with all button sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="sm">
          Buttons
        </Button>
        <Button variant="outline" size="icon-sm">
          <IconDots className="size-3" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Default</Button>
        <Button variant="outline">Buttons</Button>
        <Button variant="outline" size="icon">
          <IconDots className="size-4" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="lg">
          Buttons
        </Button>
        <Button variant="outline" size="icon-lg">
          <IconDots className="size-5" />
        </Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Button groups work with all button sizes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole("group");
    await expect(groups).toHaveLength(3);
  },
};

/**
 * Keyboard navigation: Tab moves between buttons within the group.
 */
export const Accessibility: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Demonstrates role='group' semantics and keyboard navigation between buttons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");
    const buttons = await canvas.findAllByRole("button");

    await expect(group).toBeInTheDocument();
    await expect(group).toHaveAttribute("data-slot", "button-group");
    await expect(buttons).toHaveLength(3);
  },
};

/**
 * Visual regression baseline for all variants.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-6 p-4">
      <ButtonGroup>
        <Button>Primary</Button>
        <Button size="icon">
          <IconChevronDown className="size-4" />
        </Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="outline">Outline</Button>
        <ButtonGroupSeparator />
        <Button variant="outline">Buttons</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary">Group</Button>
      </ButtonGroup>

      <ButtonGroup>
        <Button variant="destructive">
          <IconTrash className="size-4" />
          Delete
        </Button>
        <Button variant="destructive" size="icon">
          <IconChevronDown className="size-4" />
        </Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "Visual regression baseline showing all variants and orientations.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};
