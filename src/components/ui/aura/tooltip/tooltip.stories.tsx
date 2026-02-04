import { Button } from "@/components/ui/aura/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconAlertTriangle, IconHelp, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const getOpenTooltip = (tooltipBody: ReturnType<typeof within>, matcher?: RegExp) => {
  const tooltips = tooltipBody.queryAllByTestId("tooltip-content");
  return tooltips.find((tooltip) => {
    if (!tooltip.hasAttribute("data-open")) {
      return false;
    }
    if (!matcher) {
      return true;
    }
    return matcher.test(tooltip.textContent ?? "");
  });
};

const waitForTooltipClosed = async () => {
  await waitFor(() => {
    const tooltip = document.querySelector('[data-slot="tooltip-content"][data-open]');
    expect(tooltip).not.toBeInTheDocument();
  });
};

const meta: Meta<typeof Tooltip> = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Display & behavior
    delayDuration: {
      control: "number",
      description: "Delay before showing tooltip in milliseconds",
      table: {
        category: "Display",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the tooltip is open by default",
      table: {
        category: "Display",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "Display",
        type: { summary: "boolean" },
      },
    },
    disableHoverableContent: {
      control: "boolean",
      description: "Whether the tooltip content can be hovered",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // Events
    onOpenChange: {
      action: "openChanged",
      description: "Callback when tooltip open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["openChanged"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Basic tooltip with default positioning (top)
 * Matches the basic example from tooltip.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Basic tooltip that appears on hover. Tests hover interaction, tooltip visibility, and proper cleanup.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole("button", { name: /hover me/i });
    await expect(button).toBeInTheDocument();

    // Initially tooltip should not be visible
    const tooltipBody = within(document.body);
    expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    // Hover over the button
    await userEvent.hover(button);

    // Wait for tooltip to appear (tooltip is rendered in a portal, so search in document)
    await waitFor(
      () => {
        const tooltipElement = getOpenTooltip(
          tooltipBody,
          /Publishing will make it available to all users/i
        );
        expect(tooltipElement).toBeInTheDocument();
        expect(tooltipElement).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Small delay to ensure tooltip is fully rendered
    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(button);
    await waitForTooltipClosed();
  },
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>Hover me</Button>} />
      <TooltipContent>Publishing will make it available to all users</TooltipContent>
    </Tooltip>
  ),
};

/**
 * Multiple tooltips with different button variants
 */
export const WithButtonVariants: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Tooltips used with different button variants to show contextual information. Tests that multiple tooltips work independently.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);

    // Test first tooltip
    const firstButton = canvas.getByRole("button", { name: /hover me/i });
    await userEvent.hover(firstButton);

    await waitFor(
      () => {
        const tooltip = getOpenTooltip(
          tooltipBody,
          /Publishing will make it available to all users/i
        );
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Small delay to ensure tooltip is fully rendered
    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(firstButton);
    await waitForTooltipClosed();

    // Test second tooltip
    const secondButton = canvas.getByRole("button", { name: /more info/i });
    await userEvent.hover(secondButton);

    await waitFor(
      () => {
        const tooltip = getOpenTooltip(tooltipBody, /This button does something important/i);
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Small delay to ensure tooltip is fully rendered
    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(secondButton);
    await waitForTooltipClosed();

    // Test third tooltip (destructive)
    const thirdButton = canvas.getByRole("button", { name: /delete/i });
    await userEvent.hover(thirdButton);

    await waitFor(
      () => {
        const tooltip = getOpenTooltip(tooltipBody, /This action cannot be undone/i);
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );
    await userEvent.unhover(thirdButton);
    await waitForTooltipClosed();
  },
  render: () => (
    <TooltipProvider>
      <div className="flex justify-center gap-2">
        <Tooltip>
          <TooltipTrigger render={<Button>Hover me</Button>} />
          <TooltipContent>Publishing will make it available to all users</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">More info</Button>} />
          <TooltipContent>This button does something important</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="destructive">Delete</Button>} />
          <TooltipContent>This action cannot be undone</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on top
 */
export const PositionTop: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Tooltip positioned above the trigger element.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);

    // Wait for tooltip to appear (tooltip is rendered in a portal)
    const tooltipBody = within(document.body);
    await waitFor(
      () => {
        const tooltip = getOpenTooltip(tooltipBody, /This is a helpful message/i);
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
        // Verify side attribute
        expect(["top", "bottom"]).toContain(tooltip?.getAttribute("data-side"));
      },
      { timeout: 3000 }
    );
    await userEvent.unhover(button);
    await waitForTooltipClosed();
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me - Top</Button>} />
        <TooltipContent side="top">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on the right
 */
export const PositionRight: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Tooltip positioned to the right of the trigger element.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);

    const tooltipBody = within(document.body);
    await waitFor(() => {
      const tooltip = getOpenTooltip(tooltipBody, /This is a helpful message/i);
      expect(tooltip).toBeVisible();
      expect(tooltip).toHaveAttribute("data-side", "right");
    });
    await userEvent.unhover(button);
    await waitForTooltipClosed();
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me - Right</Button>} />
        <TooltipContent side="right">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on the bottom
 */
export const PositionBottom: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Tooltip positioned below the trigger element.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);

    const tooltipBody = within(document.body);
    await waitFor(() => {
      const tooltip = getOpenTooltip(tooltipBody, /This is a helpful message/i);
      expect(tooltip).toBeVisible();
      expect(tooltip).toHaveAttribute("data-side", "bottom");
    });
    await userEvent.unhover(button);
    await waitForTooltipClosed();
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me - Bottom</Button>} />
        <TooltipContent side="bottom">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on the left
 */
export const PositionLeft: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Tooltip positioned to the left of the trigger element.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);

    const tooltipBody = within(document.body);
    await waitFor(() => {
      const tooltip = getOpenTooltip(tooltipBody, /This is a helpful message/i);
      expect(tooltip).toBeVisible();
      expect(["left", "right"]).toContain(tooltip?.getAttribute("data-side"));
    });
    await userEvent.unhover(button);
    await waitForTooltipClosed();
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me - Left</Button>} />
        <TooltipContent side="left">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * All positions displayed together
 * Matches the positions example from tooltip.examples.tsx
 */
export const AllPositions: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Tooltips with arrows appearing from all sides.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);

    // Test each position
    const positions = ["Top", "Right", "Bottom", "Left"];
    const sideFallbacks: Record<string, string[]> = {
      Top: ["top", "bottom"],
      Right: ["right", "left"],
      Bottom: ["bottom", "top"],
      Left: ["left", "right"],
    };

    for (const position of positions) {
      const button = canvas.getByRole("button", {
        name: new RegExp(`hover me - ${position}`, "i"),
      });
      await userEvent.hover(button);

      await waitFor(
        () => {
          const tooltip = getOpenTooltip(tooltipBody, /This is a helpful message/i);
          expect(tooltip).toBeVisible();
          expect(sideFallbacks[position]).toContain(tooltip?.getAttribute("data-side"));
        },
        { timeout: 3000 }
      );

      // Small delay between positions
      await new Promise((resolve) => setTimeout(resolve, 200));
      await userEvent.unhover(button);
      await waitForTooltipClosed();
    }
  },
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center gap-16 min-h-75">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Hover me - Top</Button>} />
          <TooltipContent side="top">This is a helpful message</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Hover me - Right</Button>} />
          <TooltipContent side="right">This is a helpful message</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Hover me - Bottom</Button>} />
          <TooltipContent side="bottom">This is a helpful message</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger render={<Button variant="outline">Hover me - Left</Button>} />
          <TooltipContent side="left">This is a helpful message</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Tooltip with icon buttons
 * Tests accessibility with sr-only labels
 */
export const WithIcons: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Tooltips used with icon buttons to provide additional context. Tests accessibility with screen reader labels.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);

    // Find all icon buttons
    const infoButton = canvas.getByRole("button", { name: /information/i });
    const helpButton = canvas.getByRole("button", { name: /help/i });
    const warningButton = canvas.getByRole("button", { name: /warning/i });

    // Verify all buttons exist and have proper accessible names
    await expect(infoButton).toBeInTheDocument();
    await expect(helpButton).toBeInTheDocument();
    await expect(warningButton).toBeInTheDocument();

    // Test info tooltip
    await userEvent.hover(infoButton);
    await waitFor(
      () => {
        const tooltip = getOpenTooltip(tooltipBody, /View more information/i);
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Small delay to ensure tooltip is fully rendered
    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(infoButton);
    await waitForTooltipClosed();

    // Test help tooltip
    await userEvent.hover(helpButton);
    await waitFor(
      () => {
        const tooltip = getOpenTooltip(tooltipBody, /Get help with this feature/i);
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );
    await userEvent.unhover(helpButton);
    await waitForTooltipClosed();
  },
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon">
                <IconInfoCircle className="size-4" />
                <span className="sr-only">Information</span>
              </Button>
            }
          />
          <TooltipContent>View more information</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon">
                <IconHelp className="size-4" />
                <span className="sr-only">Help</span>
              </Button>
            }
          />
          <TooltipContent>Get help with this feature</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="ghost" size="icon">
                <IconAlertTriangle className="size-4" />
                <span className="sr-only">Warning</span>
              </Button>
            }
          />
          <TooltipContent>This action requires attention</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Long tooltip content
 */
export const LongContent: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Tooltip with longer content to demonstrate text wrapping and balance.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);

    const tooltipBody = within(document.body);
    await waitFor(() => {
      const tooltip = tooltipBody.queryByTestId("tooltip-content");
      expect(tooltip).toBeVisible();
      // Verify long content is displayed
      expect(tooltip).toHaveTextContent(/multiple lines of text/i);
    });
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover for details</Button>} />
        <TooltipContent className="max-w-xs">
          This is a longer tooltip message that demonstrates how the component handles multiple
          lines of text. The text will wrap naturally and maintain good readability.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip with custom offset
 */
export const WithOffset: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Tooltip with custom side offset to adjust spacing from the trigger element.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.hover(button);

    const tooltipBody = within(document.body);
    await waitFor(() => {
      const tooltip = tooltipBody.queryByTestId("tooltip-content");
      expect(tooltip).toBeVisible();
      expect(tooltip).toHaveTextContent(/increased spacing/i);
    });
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me (offset)</Button>} />
        <TooltipContent side="top" sideOffset={12}>
          This tooltip has increased spacing from the button
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tests keyboard interactions: focus to show, escape to dismiss
 */
export const KeyboardInteractions: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story:
          "Tests keyboard accessibility: tooltip appears on focus and can be dismissed with Escape key.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);

    // Find the button
    const button = canvas.getByRole("button", { name: /keyboard focus/i });

    // Tab to focus the button
    await userEvent.tab();
    await expect(button).toHaveFocus();

    // Wait for tooltip to appear on focus
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByTestId("tooltip-content");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent(/keyboard accessible/i);
      },
      { timeout: 3000 }
    );

    // Press Escape to dismiss tooltip
    await userEvent.keyboard("{Escape}");

    // Wait for tooltip to disappear
    await waitFor(
      () => {
        expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button>Keyboard focus</Button>} />
        <TooltipContent>
          This tooltip is keyboard accessible - press Escape to dismiss
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tests default open state
 */
export const DefaultOpen: Story = {
  parameters: {
    order: 12,
    docs: {
      description: {
        story: "Tooltip that is open by default when the component mounts. Tests defaultOpen prop.",
      },
    },
  },
  play: async () => {
    const tooltipBody = within(document.body);

    // Tooltip should be visible immediately without interaction
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByTestId("tooltip-content");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent(/open by default/i);
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button variant="outline">Pre-opened tooltip</Button>} />
        <TooltipContent>This tooltip is open by default</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tests controlled tooltip state
 */
export const ControlledState: Story = {
  parameters: {
    order: 13,
    docs: {
      description: {
        story: "Demonstrates a controlled tooltip where the open state is managed externally.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);

    // Find the control buttons
    const openButton = canvas.getByRole("button", { name: /open tooltip/i });
    const closeButton = canvas.getByRole("button", { name: /close tooltip/i });

    // Initially tooltip should not be visible
    expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    // Click open button
    await userEvent.click(openButton);

    // Wait for tooltip to appear
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByTestId("tooltip-content");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
        expect(tooltip).toHaveTextContent(/controlled externally/i);
      },
      { timeout: 3000 }
    );

    // Click close button
    await userEvent.click(closeButton);

    // Wait for tooltip to disappear
    await waitFor(
      () => {
        expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
  render: function ControlledState() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <TooltipProvider>
          <Tooltip open={isOpen} onOpenChange={setIsOpen}>
            <TooltipTrigger render={<Button>Controlled tooltip trigger</Button>} />
            <TooltipContent>This tooltip&apos;s state is controlled externally</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex gap-2">
          <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
            Open tooltip
          </Button>
          <Button onClick={() => setIsOpen(false)} variant="outline" size="sm">
            Close tooltip
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Tests delay duration
 */
export const WithDelay: Story = {
  parameters: {
    order: 14,
    docs: {
      description: {
        story: "Tooltip with a 1500ms delay before appearing. Tests delayDuration prop.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);
    const button = canvas.getByRole("button");

    // Hover over button
    await userEvent.hover(button);

    // Tooltip should not appear immediately
    expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    // Wait for delay and tooltip to appear
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByTestId("tooltip-content");
        expect(tooltip).toBeVisible();
      },
      { timeout: 2000 }
    );
  },
  render: () => {
    return (
      <Tooltip delayDuration={1500}>
        <TooltipTrigger render={<Button variant="outline">Hover me (with delay)</Button>} />
        <TooltipContent>This tooltip appears after a 1500ms delay</TooltipContent>
      </Tooltip>
    );
  },
};

/**
 * Visual regression baseline
 */
export const VisualRegression: Story = {
  parameters: {
    order: 15,
    docs: {
      description: {
        story: "Baseline story for visual regression testing. Shows tooltip in open state.",
      },
    },
  },
  play: async () => {
    const tooltipBody = within(document.body);

    // Verify tooltip is visible for visual snapshot
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByTestId("tooltip-content");
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger render={<Button>Trigger</Button>} />
        <TooltipContent>Visual regression baseline</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
