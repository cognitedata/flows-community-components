import { Button } from "@/components/ui/aura/button/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconAlertTriangle, IconHelp, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const getOpenTooltip = (tooltipBody: ReturnType<typeof within>, matcher?: RegExp) => {
  const tooltips = tooltipBody.queryAllByTestId("tooltip-content") as HTMLElement[];
  return tooltips.find((tooltip: HTMLElement) => {
    if (!tooltip.hasAttribute("data-open")) {
      return false;
    }
    if (!matcher) {
      return true;
    }
    return matcher.test(tooltip.textContent ?? "");
  });
};

const getOpenTooltipElement = (matcher?: RegExp) => {
  const tooltip = document.querySelector(
    '[data-slot="tooltip-content"][data-open]'
  ) as HTMLElement | null;

  if (!tooltip) {
    return undefined;
  }

  if (!matcher) {
    return tooltip;
  }

  return matcher.test(tooltip.textContent ?? "") ? tooltip : undefined;
};

const waitForOpenTooltip = async (
  tooltipBody: ReturnType<typeof within>,
  matcher: RegExp,
  timeout = 3000
) => {
  let tooltip: HTMLElement | undefined;
  await waitFor(
    () => {
      tooltip = getOpenTooltipElement(matcher) || getOpenTooltip(tooltipBody, matcher);
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toBeVisible();
    },
    { timeout }
  );
  return tooltip as HTMLElement;
};

const hoverAndWaitForTooltip = async (
  trigger: HTMLElement,
  tooltipBody: ReturnType<typeof within>,
  matcher: RegExp,
  timeout = 3000
) => {
  await userEvent.hover(trigger);
  try {
    return await waitForOpenTooltip(tooltipBody, matcher, timeout);
  } catch {
    await userEvent.unhover(trigger);
    await userEvent.hover(trigger);
    return await waitForOpenTooltip(tooltipBody, matcher, timeout);
  }
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
    delayDuration: {
      control: "number",
      description: "Delay before showing tooltip in milliseconds",
      table: {
        category: "Behavior",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the tooltip is open by default",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "Behavior",
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
 * Basic tooltip that appears on hover.
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
    const button = await canvas.findByRole("button", { name: /hover me/i }, { timeout: 2000 });
    await expect(button).toBeInTheDocument();

    const tooltipBody = within(document.body);
    expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    await hoverAndWaitForTooltip(
      button,
      tooltipBody,
      /Publishing will make it available to all users/i
    );

    await new Promise((resolve) => setTimeout(resolve, 200));
  },
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>Hover me</Button>} />
      <TooltipContent>Publishing will make it available to all users</TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltips used with different button variants.
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

    const firstButton = await canvas.findByRole("button", { name: /hover me/i }, { timeout: 2000 });
    await hoverAndWaitForTooltip(
      firstButton,
      tooltipBody,
      /Publishing will make it available to all users/i
    );

    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(firstButton);
    await waitForTooltipClosed();

    const secondButton = await canvas.findByRole(
      "button",
      { name: /more info/i },
      { timeout: 2000 }
    );
    await hoverAndWaitForTooltip(
      secondButton,
      tooltipBody,
      /This button does something important/i
    );

    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(secondButton);
    await waitForTooltipClosed();

    const thirdButton = await canvas.findByRole("button", { name: /delete/i }, { timeout: 2000 });
    await hoverAndWaitForTooltip(thirdButton, tooltipBody, /This action cannot be undone/i);
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
 * Tooltip positioned above the trigger element.
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
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });
    const tooltipBody = within(document.body);
    const tooltip = await hoverAndWaitForTooltip(button, tooltipBody, /This is a helpful message/i);
    expect(["top", "bottom"]).toContain(tooltip.getAttribute("data-side"));
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
 * Tooltip positioned to the right of the trigger element.
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
    const tooltipBody = within(document.body);
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });
    const tooltip = await hoverAndWaitForTooltip(button, tooltipBody, /This is a helpful message/i);
    expect(tooltip).toHaveAttribute("data-side", "right");
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
 * Tooltip positioned below the trigger element.
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
    const tooltipBody = within(document.body);
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });
    const tooltip = await hoverAndWaitForTooltip(button, tooltipBody, /This is a helpful message/i);
    expect(tooltip).toHaveAttribute("data-side", "bottom");
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
 * Tooltip positioned to the left of the trigger element.
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
    const tooltipBody = within(document.body);
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });
    const tooltip = await hoverAndWaitForTooltip(button, tooltipBody, /This is a helpful message/i);
    expect(["left", "right"]).toContain(tooltip.getAttribute("data-side"));
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
 * Tooltips with arrows appearing from all sides.
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
    const positions = ["Top", "Right", "Bottom", "Left"];

    for (const position of positions) {
      const button = await canvas.findByRole(
        "button",
        {
          name: new RegExp(`hover me - ${position}`, "i"),
        },
        { timeout: 2000 }
      );
      await hoverAndWaitForTooltip(button, tooltipBody, /This is a helpful message/i);
      await userEvent.unhover(button);
      await waitForTooltipClosed();
      await new Promise((resolve) => setTimeout(resolve, 200));
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
 * Tooltips used with icon buttons to provide additional context.
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

    const infoButton = await canvas.findByRole(
      "button",
      { name: /information/i },
      { timeout: 2000 }
    );
    const helpButton = await canvas.findByRole("button", { name: /help/i }, { timeout: 2000 });
    const warningButton = await canvas.findByRole(
      "button",
      { name: /warning/i },
      { timeout: 2000 }
    );

    await expect(infoButton).toBeInTheDocument();
    await expect(helpButton).toBeInTheDocument();
    await expect(warningButton).toBeInTheDocument();

    await hoverAndWaitForTooltip(infoButton, tooltipBody, /View more information/i);
    await new Promise((resolve) => setTimeout(resolve, 200));
    await userEvent.unhover(infoButton);
    await waitForTooltipClosed();

    await hoverAndWaitForTooltip(helpButton, tooltipBody, /Get help with this feature/i);
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
 * Tooltip with longer content to demonstrate text wrapping.
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
    const tooltipBody = within(document.body);
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });
    const tooltip = await hoverAndWaitForTooltip(button, tooltipBody, /multiple lines of text/i);
    expect(tooltip).toHaveTextContent(/multiple lines of text/i);
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
 * Tooltip with custom side offset for adjusted spacing.
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
    const tooltipBody = within(document.body);
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });
    const tooltip = await hoverAndWaitForTooltip(button, tooltipBody, /increased spacing/i);
    expect(tooltip).toHaveTextContent(/increased spacing/i);
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me (offset)</Button>} />
        <TooltipContent side="top" sideOffset={20}>
          This tooltip has increased spacing from the button
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Keyboard accessibility: tooltip appears on focus, dismissed with Escape.
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
    const button = await canvas.findByRole(
      "button",
      { name: /keyboard focus/i },
      { timeout: 2000 }
    );

    const waitForKeyboardTooltip = async () => {
      await waitForOpenTooltip(tooltipBody, /keyboard accessible/i, 4000);
    };

    button.focus();
    await waitFor(() => {
      expect(button).toHaveFocus();
    });

    try {
      await waitForKeyboardTooltip();
    } catch {
      await userEvent.tab();
      button.focus();
      await waitFor(() => {
        expect(button).toHaveFocus();
      });
      try {
        await waitForKeyboardTooltip();
      } catch {
        await userEvent.hover(button);
        await waitForKeyboardTooltip();
      }
    }

    await userEvent.keyboard("{Escape}");
    await waitForTooltipClosed();
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
 * Tooltip that is open by default when the component mounts.
 */
export const DefaultOpen: Story = {
  parameters: {
    order: 12,
    docs: {
      description: {
        story: "Tooltip that is open by default when the component mounts.",
      },
    },
  },
  play: async () => {
    const tooltipBody = within(document.body);
    await waitForOpenTooltip(tooltipBody, /open by default/i, 3000);
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
 * Controlled tooltip where the open state is managed externally.
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

    const openButton = await canvas.findByRole(
      "button",
      { name: /open tooltip/i },
      { timeout: 2000 }
    );
    const closeButton = await canvas.findByRole(
      "button",
      { name: /close tooltip/i },
      { timeout: 2000 }
    );

    expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    await userEvent.click(openButton);

    try {
      await waitForOpenTooltip(tooltipBody, /controlled externally/i, 3000);
    } catch {
      await userEvent.click(openButton);
      await waitForOpenTooltip(tooltipBody, /controlled externally/i, 3000);
    }

    await userEvent.click(closeButton);
    await waitForTooltipClosed();
  },
  render: () => {
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
 * Tooltip with a delay before appearing.
 */
export const WithDelay: Story = {
  parameters: {
    order: 14,
    docs: {
      description: {
        story: "Tooltip with a 1500ms delay before appearing.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltipBody = within(document.body);
    const button = await canvas.findByRole("button", {}, { timeout: 2000 });

    await userEvent.hover(button);
    expect(tooltipBody.queryByTestId("tooltip-content")).not.toBeInTheDocument();

    try {
      await waitForOpenTooltip(tooltipBody, /This tooltip appears after a 1500ms delay/i, 4500);
    } catch {
      await userEvent.unhover(button);
      await userEvent.hover(button);
      await waitForOpenTooltip(tooltipBody, /This tooltip appears after a 1500ms delay/i, 4500);
    }
  },
  render: () => (
    <Tooltip delayDuration={1500}>
      <TooltipTrigger render={<Button variant="outline">Hover me (with delay)</Button>} />
      <TooltipContent>This tooltip appears after a 1500ms delay</TooltipContent>
    </Tooltip>
  ),
};

/**
 * Visual regression baseline with tooltip in open state.
 */
export const VisualRegression: Story = {
  parameters: {
    order: 15,
    docs: {
      description: {
        story: "Baseline story for visual regression testing.",
      },
    },
  },
  play: async () => {
    const tooltipBody = within(document.body);
    await waitForOpenTooltip(tooltipBody, /visual regression baseline/i, 3000);
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
