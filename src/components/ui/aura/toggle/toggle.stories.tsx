import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import {
  IconBold,
  IconFilter,
  IconHandGrab,
  IconItalic,
  IconPointer,
  IconUnderline,
  IconSortAscending,
} from "@tabler/icons-react";
import { useState } from "react";
import { Toggle } from "./toggle";
import { Badge } from "../badge";

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    // Display
    variant: {
      control: "select",
      options: ["default", "exclusive", "ghost"],
      description:
        "Visual style variant. Use 'default' for normal toggles (uses bg-toggled when pressed), 'exclusive' for exclusive groups (uses bg-primary when pressed), or 'ghost' for minimal styling.",
      table: {
        category: "Display",
        type: {
          summary: '"default" | "exclusive" | "ghost"',
        },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Size of the toggle button",
      table: {
        category: "Display",
        type: { summary: '"default" | "sm"' },
        defaultValue: { summary: "default" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },

    // State
    pressed: {
      control: "boolean",
      description:
        "Controlled pressed state. When true, the toggle is in the 'on' state.",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultPressed: {
      control: "boolean",
      description: "Default pressed state for uncontrolled usage",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the toggle button",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // Events
    onPressedChange: {
      action: "pressedChange",
      description: "Callback fired when the pressed state changes",
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
 * Default toggle button with icon.
 * Basic example showing a single toggle in its default state.
 */
export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" variant="default" size="default">
      <IconPointer className="size-4" />
    </Toggle>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Default toggle button with icon. Uses the `default` variant which applies `bg-toggled` when pressed. This is the basic building block for toggle buttons.",
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
 * Playground story for interactive exploration of toggle props.
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
      <IconPointer className={args.size === "sm" ? "size-3.5" : "size-4"} />
    </Toggle>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          "Interactive playground for the toggle component. Use controls to experiment with different variants, sizes, and disabled/pressed states.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toggle = canvas.getByRole("button", { name: /playground toggle/i });
    await expect(toggle).toBeInTheDocument();

    // With default args, the toggle should start off
    await expect(toggle).toHaveAttribute("data-state", "off");

    // Click to toggle on
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("data-state", "on");
  },
};

/**
 * Toggle size variants.
 * Displays all available size options side by side for comparison.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Default</span>
        <Toggle aria-label="Default size" size="default">
          <IconPointer className="size-4" />
        </Toggle>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Small</span>
        <Toggle aria-label="Small size" size="sm">
          <IconPointer className="size-3.5" />
        </Toggle>
      </div>
    </div>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Showcases the available toggle sizes (default and small) for quick comparison. Both use the `default` variant.",
      },
    },
  },
};

/**
 * Disabled toggle states.
 * Shows how disabled toggles appear using `bg-background` and `text-disabled-foreground`.
 */
export const DisabledStates: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Toggle
        aria-label="Disabled default toggle"
        variant="default"
        disabled
        className="bg-background text-disabled-foreground"
      >
        <IconPointer className="size-4" />
      </Toggle>
      <Toggle
        aria-label="Disabled exclusive toggle"
        variant="exclusive"
        disabled
        className="bg-background text-disabled-foreground"
      >
        <IconPointer className="size-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Demonstrates disabled toggle styling. Both toggles use `bg-background` and `text-disabled-foreground` while still inheriting the base disabled behavior (no pointer events, reduced opacity).",
      },
    },
  },
};

/**
 * Independent (non-exclusive) formatting toggles.
 * Each toggle manages its own pressed state and uses the normal `default` styling.
 */
export const FormattingToggles: Story = {
  render: function FormattingTogglesStory() {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="flex items-center gap-1">
        <Toggle
          aria-label="Bold"
          variant="default"
          pressed={bold}
          onPressedChange={setBold}
        >
          <IconBold />
        </Toggle>
        <Toggle
          aria-label="Italic"
          variant="default"
          pressed={italic}
          onPressedChange={setItalic}
        >
          <IconItalic />
        </Toggle>
        <Toggle
          aria-label="Underline"
          variant="default"
          pressed={underline}
          onPressedChange={setUnderline}
        >
          <IconUnderline />
        </Toggle>
      </div>
    );
  },
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Demonstrates normal, non-exclusive toggles. Each button controls its own state independently and uses the `default` variant, which applies `bg-toggled` when pressed. Multiple toggles can be active simultaneously.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const boldToggle = canvas.getByRole("button", { name: /bold/i });
    const italicToggle = canvas.getByRole("button", { name: /italic/i });
    const underlineToggle = canvas.getByRole("button", { name: /underline/i });

    // Verify all toggles are initially off
    await expect(boldToggle).toHaveAttribute("data-state", "off");
    await expect(italicToggle).toHaveAttribute("data-state", "off");
    await expect(underlineToggle).toHaveAttribute("data-state", "off");

    // Toggle bold on
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveAttribute("data-state", "on");

    // Toggle italic on (both should be on)
    await userEvent.click(italicToggle);
    await expect(italicToggle).toHaveAttribute("data-state", "on");
    await expect(boldToggle).toHaveAttribute("data-state", "on");

    // Toggle bold off (italic should remain on)
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveAttribute("data-state", "off");
    await expect(italicToggle).toHaveAttribute("data-state", "on");
  },
};

/**
 * Small independent (non-exclusive) formatting toggles.
 * Each toggle manages its own pressed state and uses the normal `default` styling.
 */
export const FormattingTogglesSmall: Story = {
  render: function FormattingTogglesSmallStory() {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="flex items-center gap-1">
        <Toggle
          aria-label="Bold"
          variant="default"
          size="sm"
          pressed={bold}
          onPressedChange={setBold}
        >
          <IconBold className="size-3.5" />
        </Toggle>
        <Toggle
          aria-label="Italic"
          variant="default"
          size="sm"
          pressed={italic}
          onPressedChange={setItalic}
        >
          <IconItalic className="size-3.5" />
        </Toggle>
        <Toggle
          aria-label="Underline"
          variant="default"
          size="sm"
          pressed={underline}
          onPressedChange={setUnderline}
        >
          <IconUnderline className="size-3.5" />
        </Toggle>
      </div>
    );
  },
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Small size version of normal, non-exclusive toggles. Each button controls its own state independently and uses the `default` variant, which applies `bg-toggled` when pressed. Multiple toggles can be active simultaneously.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const boldToggle = canvas.getByRole("button", { name: /bold/i });
    const italicToggle = canvas.getByRole("button", { name: /italic/i });
    const underlineToggle = canvas.getByRole("button", { name: /underline/i });

    // Verify all toggles are initially off
    await expect(boldToggle).toHaveAttribute("data-state", "off");
    await expect(italicToggle).toHaveAttribute("data-state", "off");
    await expect(underlineToggle).toHaveAttribute("data-state", "off");

    // Toggle bold on
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveAttribute("data-state", "on");

    // Toggle italic on (both should be on)
    await userEvent.click(italicToggle);
    await expect(italicToggle).toHaveAttribute("data-state", "on");
    await expect(boldToggle).toHaveAttribute("data-state", "on");
  },
};

/**
 * Filter/Sort toggles with count badge.
 * Demonstrates a primary "Filter" toggle with an active state and count next to an inactive "Sort" toggle.
 */
export const FilterAndSort: Story = {
  render: function FilterAndSortStory() {
    const [filtersActive, setFiltersActive] = useState(true);
    const [sortActive, setSortActive] = useState(false);

    return (
      <div className="flex items-center gap-4">
        <Toggle
          aria-label="Filter"
          variant="default"
          pressed={filtersActive}
          onPressedChange={setFiltersActive}
        >
          <div className="flex items-center gap-2">
            <IconFilter className="size-4" />
            <span className="text-sm font-medium">Filter</span>
            <Badge dot variant="mountain">
              3
            </Badge>
          </div>
        </Toggle>
        <Toggle
          aria-label="Sort"
          variant="default"
          pressed={sortActive}
          onPressedChange={setSortActive}
        >
          <div className="flex items-center gap-2">
            <IconSortAscending />
            <span className="text-sm font-medium">Sort</span>
          </div>
        </Toggle>
      </div>
    );
  },
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Shows a typical filter/sort affordance: an active filter toggle with a count badge next to an inactive sort toggle, both using the normal `default` variant. Each toggle manages its own state independently.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const filterToggle = canvas.getByRole("button", { name: /filter/i });
    const sortToggle = canvas.getByRole("button", { name: /sort/i });

    // Verify initial states
    await expect(filterToggle).toHaveAttribute("data-state", "on");
    await expect(sortToggle).toHaveAttribute("data-state", "off");

    // Toggle sort on
    await userEvent.click(sortToggle);
    await expect(sortToggle).toHaveAttribute("data-state", "on");
    await expect(filterToggle).toHaveAttribute("data-state", "on"); // Filter should still be on

    // Toggle filter off
    await userEvent.click(filterToggle);
    await expect(filterToggle).toHaveAttribute("data-state", "off");
    await expect(sortToggle).toHaveAttribute("data-state", "on"); // Sort should still be on
  },
};

/**
 * Small Filter/Sort toggles with count badge.
 * Demonstrates a primary "Filter" toggle with an active state and count next to an inactive "Sort" toggle.
 */
export const FilterAndSortSmall: Story = {
  render: function FilterAndSortSmallStory() {
    const [filtersActive, setFiltersActive] = useState(true);
    const [sortActive, setSortActive] = useState(false);

    return (
      <div className="flex items-center gap-4">
        <Toggle
          aria-label="Filter"
          variant="default"
          size="sm"
          pressed={filtersActive}
          onPressedChange={setFiltersActive}
        >
          <div className="flex items-center gap-2">
            <IconFilter className="size-3.5" />
            <span className="text-sm font-medium">Filter</span>
            <Badge dot variant="mountain">
              3
            </Badge>
          </div>
        </Toggle>
        <Toggle
          aria-label="Sort"
          variant="default"
          size="sm"
          pressed={sortActive}
          onPressedChange={setSortActive}
        >
          <div className="flex items-center gap-2">
            <IconSortAscending className="size-3.5" />
            <span className="text-sm font-medium">Sort</span>
          </div>
        </Toggle>
      </div>
    );
  },
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Small size version of filter/sort toggles. Shows a typical filter/sort affordance: an active filter toggle with a count badge next to an inactive sort toggle, both using the normal `default` variant. Each toggle manages its own state independently.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const filterToggle = canvas.getByRole("button", { name: /filter/i });
    const sortToggle = canvas.getByRole("button", { name: /sort/i });

    // Verify initial states
    await expect(filterToggle).toHaveAttribute("data-state", "on");
    await expect(sortToggle).toHaveAttribute("data-state", "off");

    // Toggle sort on
    await userEvent.click(sortToggle);
    await expect(sortToggle).toHaveAttribute("data-state", "on");
    await expect(filterToggle).toHaveAttribute("data-state", "on"); // Filter should still be on

    // Toggle filter off
    await userEvent.click(filterToggle);
    await expect(filterToggle).toHaveAttribute("data-state", "off");
    await expect(sortToggle).toHaveAttribute("data-state", "on"); // Sort should still be on
  },
};

/**
 * Exclusive toggle group where only one item can be active at a time.
 */
export const ExclusiveGroup: Story = {
  render: function ExclusiveToggleGroupStory() {
    const [activeTool, setActiveTool] = useState<"pointer" | "hand" | null>(
      "pointer"
    );

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Toggle
            aria-label="Pointer tool"
            variant="exclusive"
            pressed={activeTool === "pointer"}
            onPressedChange={(pressed) =>
              setActiveTool((current) =>
                pressed ? "pointer" : current === "pointer" ? null : current
              )
            }
          >
            <IconPointer className="size-4" />
          </Toggle>
          <Toggle
            aria-label="Hand tool"
            variant="exclusive"
            pressed={activeTool === "hand"}
            onPressedChange={(pressed) =>
              setActiveTool((current) =>
                pressed ? "hand" : current === "hand" ? null : current
              )
            }
          >
            <IconHandGrab className="size-4" />
          </Toggle>
        </div>
        <p className="text-xs text-muted-foreground">
          Only one tool can be active at a time. Click an active tool again to
          clear the selection.
        </p>
      </div>
    );
  },
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Demonstrates an exclusive group of toggles where at most one option is selected using a controlled `pressed` state. Uses the `exclusive` variant which applies `bg-primary` when pressed. Clicking an active toggle clears the selection.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const pointerToggle = canvas.getByRole("button", { name: /pointer/i });
    const handToggle = canvas.getByRole("button", { name: /hand/i });

    // Verify initial state (pointer should be on)
    await expect(pointerToggle).toHaveAttribute("data-state", "on");
    await expect(handToggle).toHaveAttribute("data-state", "off");

    // Click hand toggle - should turn on and pointer should turn off
    await userEvent.click(handToggle);
    await expect(handToggle).toHaveAttribute("data-state", "on");
    await expect(pointerToggle).toHaveAttribute("data-state", "off");

    // Click pointer toggle - should turn on and hand should turn off
    await userEvent.click(pointerToggle);
    await expect(pointerToggle).toHaveAttribute("data-state", "on");
    await expect(handToggle).toHaveAttribute("data-state", "off");

    // Click pointer again - should turn off (clearing selection)
    await userEvent.click(pointerToggle);
    await expect(pointerToggle).toHaveAttribute("data-state", "off");
    await expect(handToggle).toHaveAttribute("data-state", "off");
  },
};

/**
 * Small exclusive toggle group where only one item can be active at a time.
 */
export const ExclusiveGroupSmall: Story = {
  render: function ExclusiveToggleGroupSmallStory() {
    const [activeTool, setActiveTool] = useState<"pointer" | "hand" | null>(
      "pointer"
    );

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            aria-label="Pointer tool"
            variant="exclusive"
            pressed={activeTool === "pointer"}
            onPressedChange={(pressed) =>
              setActiveTool((current) =>
                pressed ? "pointer" : current === "pointer" ? null : current
              )
            }
          >
            <IconPointer className="size-3.5" />
          </Toggle>
          <Toggle
            size="sm"
            aria-label="Hand tool"
            variant="exclusive"
            pressed={activeTool === "hand"}
            onPressedChange={(pressed) =>
              setActiveTool((current) =>
                pressed ? "hand" : current === "hand" ? null : current
              )
            }
          >
            <IconHandGrab className="size-3.5" />
          </Toggle>
        </div>
        <p className="text-xs text-muted-foreground">
          Only one tool can be active at a time. Click an active tool again to
          clear the selection.
        </p>
      </div>
    );
  },
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Small size version of an exclusive toggle group where at most one option is selected using a controlled `pressed` state. Uses the `exclusive` variant which applies `bg-primary` when pressed. Clicking an active toggle clears the selection.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const pointerToggle = canvas.getByRole("button", { name: /pointer/i });
    const handToggle = canvas.getByRole("button", { name: /hand/i });

    // Verify initial state (pointer should be on)
    await expect(pointerToggle).toHaveAttribute("data-state", "on");
    await expect(handToggle).toHaveAttribute("data-state", "off");

    // Click hand toggle - should turn on and pointer should turn off
    await userEvent.click(handToggle);
    await expect(handToggle).toHaveAttribute("data-state", "on");
    await expect(pointerToggle).toHaveAttribute("data-state", "off");

    // Click pointer toggle - should turn on and hand should turn off
    await userEvent.click(pointerToggle);
    await expect(pointerToggle).toHaveAttribute("data-state", "on");
    await expect(handToggle).toHaveAttribute("data-state", "off");

    // Click pointer again - should turn off (clearing selection)
    await userEvent.click(pointerToggle);
    await expect(pointerToggle).toHaveAttribute("data-state", "off");
    await expect(handToggle).toHaveAttribute("data-state", "off");
  },
};
