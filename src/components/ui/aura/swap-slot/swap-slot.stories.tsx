import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { SwapSlot } from "./swap-slot";

const meta: Meta<typeof SwapSlot> = {
  title: "Primitives/Swap Slot",
  component: SwapSlot,
  tags: ["autodocs"],
  argTypes: {
    // Display & behavior
    defaultSlot: {
      control: false,
      description:
        "Default content to display when activeSlot is not provided. Falls back to children if not set.",
      table: {
        category: "Display",
        type: { summary: "ReactNode" },
      },
    },
    activeSlot: {
      control: false,
      description: "Active content that takes priority over defaultSlot and children.",
      table: {
        category: "Display",
        type: { summary: "ReactNode" },
      },
    },
    children: {
      control: false,
      description: "Fallback content when neither activeSlot nor defaultSlot are provided.",
      table: {
        category: "Display",
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SwapSlot>;

/**
 * Basic empty swap slot with default styling
 * Shows the default dashed border container
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Basic swap slot with default styling. Displays an empty container with dashed border.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Query by class name since it's an empty div
    const swapSlot = canvasElement.querySelector(".border-dashed");
    await expect(swapSlot).toBeInTheDocument();
    await expect(swapSlot).toHaveClass("border-dashed");

    // Verify default styling classes
    await expect(swapSlot).toHaveClass("rounded-md");
    await expect(swapSlot).toHaveClass("border");

    // Verify it's empty by default
    await expect(swapSlot?.textContent).toBe("");
  },
  render: function BasicStory() {
    return <SwapSlot className="w-100" />;
  },
};

/**
 * Swap slot with children content
 * Demonstrates using children as fallback content
 */
export const WithChildren: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Swap slot with children content. Children are displayed when neither activeSlot nor defaultSlot are provided.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify children content is rendered
    await expect(canvas.getByText("Placeholder content")).toBeInTheDocument();

    // Verify the icon is present
    const swapSlot = canvasElement.querySelector(".border-dashed");
    await expect(swapSlot).toBeInTheDocument();
  },
  render: function WithChildrenStory() {
    return (
      <SwapSlot className="w-100">
        <div className="flex items-center gap-2 text-muted-foreground">
          <IconPlus className="size-4" />
          <span>Placeholder content</span>
        </div>
      </SwapSlot>
    );
  },
};

/**
 * Swap slot with defaultSlot
 * Shows default content that can be overridden by activeSlot
 */
export const WithDefaultSlot: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Swap slot with defaultSlot. This content is shown when activeSlot is not provided.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify defaultSlot content is rendered
    await expect(canvas.getByText("Default content slot")).toBeInTheDocument();

    // Verify activeSlot is not present
    await expect(canvas.queryByText("Active content slot")).not.toBeInTheDocument();
  },
  render: function WithDefaultSlotStory() {
    return (
      <SwapSlot
        className="w-100"
        defaultSlot={
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconPlus className="size-4" />
            <span>Default content slot</span>
          </div>
        }
      />
    );
  },
};

/**
 * Swap slot with activeSlot
 * Demonstrates active content that takes priority
 */
export const WithActiveSlot: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Swap slot with activeSlot. Active content takes priority over defaultSlot and children.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify activeSlot content is rendered
    await expect(canvas.getByText("Active content slot")).toBeInTheDocument();

    // Verify default content is not present
    await expect(canvas.queryByText("Default content slot")).not.toBeInTheDocument();
  },
  render: function WithActiveSlotStory() {
    return (
      <SwapSlot
        className="w-100"
        activeSlot={
          <div className="flex items-center gap-2 text-foreground">
            <IconCheck className="size-4 text-success" />
            <span>Active content slot</span>
          </div>
        }
      />
    );
  },
};

/**
 * Interactive swap demonstration
 * Shows how activeSlot takes priority over defaultSlot
 */
export const InteractiveSwap: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Interactive demonstration of swap behavior. Click the button to toggle between active and default slots.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /toggle/i });

    // Initially should show default slot
    await expect(canvas.getByText("Default content")).toBeInTheDocument();

    // Click to activate
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText("Active content")).toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Click again to deactivate
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText("Default content")).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
  render: function InteractiveSwapStory() {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="space-y-4">
        <SwapSlot
          className="w-100"
          defaultSlot={
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconPlus className="size-4" />
              <span>Default content</span>
            </div>
          }
          activeSlot={
            isActive ? (
              <div className="flex items-center gap-2 text-foreground">
                <IconCheck className="size-4 text-success" />
                <span>Active content</span>
              </div>
            ) : undefined
          }
        />
        <Button onClick={() => setIsActive(!isActive)} variant="outline">
          Toggle Active Slot
        </Button>
      </div>
    );
  },
};

/**
 * Custom styling examples
 * Shows different visual styles
 */
export const CustomStyling: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Examples of swap slot with custom styling including different backgrounds, borders, and heights.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all three styled variants are rendered
    await expect(canvas.getByText("Custom background colour")).toBeInTheDocument();
    await expect(canvas.getByText("Primary border")).toBeInTheDocument();
    await expect(canvas.getByText("Solid border")).toBeInTheDocument();
  },
  render: function CustomStylingStory() {
    return (
      <div className="space-y-4 w-100">
        <SwapSlot className="h-20 bg-accent/50">
          <span className="text-sm text-muted-foreground">Custom background colour</span>
        </SwapSlot>
        <SwapSlot className="h-24 border-2 border-primary">
          <span className="text-sm text-muted-foreground">Primary border</span>
        </SwapSlot>
        <SwapSlot className="h-16 rounded-lg border-solid">
          <span className="text-sm text-muted-foreground">Solid border</span>
        </SwapSlot>
      </div>
    );
  },
};

/**
 * Swap slot in card context
 * Demonstrates real-world usage within a card component
 */
export const InCard: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Swap slot used within a card component, demonstrating a common use case.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify card elements are rendered
    await expect(canvas.getByText("Card Title")).toBeInTheDocument();
    await expect(canvas.getByText("Card description")).toBeInTheDocument();

    // Verify swap slot content is rendered
    await expect(canvas.getByText("Slot content")).toBeInTheDocument();

    // Verify badges are rendered
    const badges = canvas.getAllByText("Badge");
    await expect(badges).toHaveLength(3);
  },
  render: function InCardStory() {
    return (
      <Card className="w-103 max-w-md">
        <CardHeader className="p-4 pb-0">
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          <p className="text-base tracking-tightest font-normal text-secondary-foreground">
            This is a description of the card content.
          </p>
          <SwapSlot className="h-18">
            <div className="flex items-center gap-2 text-muted-foreground">
              <IconPlus className="size-4" />
              <span>Slot content</span>
            </div>
          </SwapSlot>
        </CardContent>
        <CardFooter className="flex gap-2 p-4 pt-0">
          <Badge>Badge</Badge>
          <Badge variant="success">Badge</Badge>
          <Badge variant="sky">Badge</Badge>
        </CardFooter>
      </Card>
    );
  },
};

/**
 * Priority demonstration
 * Shows the priority order: activeSlot > defaultSlot > children
 */
export const PriorityOrder: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Demonstrates the priority order: activeSlot takes precedence over defaultSlot, which takes precedence over children.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test priority 1: activeSlot wins over all (only Active Slot should show)
    const activeSlot = canvas.getByText("Active Slot");
    await expect(activeSlot).toBeInTheDocument();

    // Test priority 2: defaultSlot wins over children (only 1 Default Slot visible in scenario 2)
    const defaultSlot = canvas.getByText("Default Slot");
    await expect(defaultSlot).toBeInTheDocument();

    // Test priority 3: children is shown when nothing else (only 1 Children visible in scenario 3)
    const children = canvas.getByText("Children");
    await expect(children).toBeInTheDocument();
  },
  render: function PriorityOrderStory() {
    return (
      <div className="space-y-4 w-100">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">1. With all three (activeSlot wins)</h3>
          <SwapSlot
            defaultSlot={<span>Default Slot</span>}
            activeSlot={<span className="text-success">Active Slot</span>}
          >
            <span>Children</span>
          </SwapSlot>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">
            2. With defaultSlot and children (defaultSlot wins)
          </h3>
          <SwapSlot defaultSlot={<span>Default Slot</span>}>
            <span>Children</span>
          </SwapSlot>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">3. With only children</h3>
          <SwapSlot>
            <span>Children</span>
          </SwapSlot>
        </div>
      </div>
    );
  },
};

/**
 * With complex content
 * Shows swap slot with more complex React components
 */
export const WithComplexContent: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Swap slot with complex content including multiple elements, badges, and buttons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially should show default slot
    await expect(canvas.getByText("Default State")).toBeInTheDocument();
    await expect(canvas.getByText("Inactive")).toBeInTheDocument();

    // Find and click the toggle button
    const toggleButton = canvas.getByRole("button", { name: /activate/i });
    await userEvent.click(toggleButton);

    // Should now show active slot
    await waitFor(
      () => {
        expect(canvas.getByText("Active State")).toBeInTheDocument();
        expect(canvas.getByText("Active")).toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Verify action buttons are present
    await expect(canvas.getByRole("button", { name: "Action 1" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Action 2" })).toBeInTheDocument();

    // Click to deactivate
    const deactivateButton = canvas.getByRole("button", {
      name: /deactivate/i,
    });
    await userEvent.click(deactivateButton);

    // Should return to default slot
    await waitFor(
      () => {
        expect(canvas.getByText("Default State")).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
  render: function WithComplexContentStory() {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="space-y-4 w-100">
        <SwapSlot
          className="min-h-32 h-auto"
          defaultSlot={
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <span className="font-medium">Default State</span>
                <Badge variant="archived">Inactive</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This is the default slot with complex content including badges and multiple text
                elements.
              </p>
            </div>
          }
          activeSlot={
            isActive ? (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Active State</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="text-sm text-foreground">
                  This is the active slot with different styling and content.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline">
                    Action 1
                  </Button>
                  <Button size="sm" variant="outline">
                    Action 2
                  </Button>
                </div>
              </div>
            ) : undefined
          }
        />
        <Button onClick={() => setIsActive(!isActive)} variant="outline">
          {isActive ? "Deactivate" : "Activate"} Slot
        </Button>
      </div>
    );
  },
};

/**
 * Empty state
 * Shows swap slot in its empty state
 */
export const EmptyState: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Empty swap slot showing just the container with dashed border.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Verify empty swap slot is rendered with correct styling
    const swapSlot = canvasElement.querySelector(".border-dashed");
    await expect(swapSlot).toBeInTheDocument();
    await expect(swapSlot).toHaveClass("border-dashed");

    // Verify it's empty (no text content)
    await expect(swapSlot?.textContent).toBe("");
  },
  render: function EmptyStateStory() {
    return <SwapSlot className="w-100 h-20">{/* Intentionally empty */}</SwapSlot>;
  },
};

/**
 * Interactive playground for testing swap slot props.
 */
export const Playground: Story = {
  args: {
    className: "w-100",
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          "Interactive playground to test different swap slot configurations. Use the controls panel to experiment with props.",
      },
    },
  },
  render: function PlaygroundStory(args) {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="flex items-center justify-center p-24">
        <div className="space-y-4 w-100">
          <SwapSlot
            {...args}
            defaultSlot={
              <div className="flex items-center gap-2 text-muted-foreground">
                <IconPlus className="size-4" />
                <span>Default slot content</span>
              </div>
            }
            activeSlot={
              isActive ? (
                <div className="flex items-center gap-2 text-foreground">
                  <IconCheck className="size-4 text-success" />
                  <span>Active slot content</span>
                </div>
              ) : undefined
            }
          />
          <Button onClick={() => setIsActive(!isActive)} variant="outline">
            Toggle Active Slot
          </Button>
        </div>
      </div>
    );
  },
};
