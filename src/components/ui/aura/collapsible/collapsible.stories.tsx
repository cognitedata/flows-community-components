import { Button } from "@/components/ui/aura/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconSelector } from "@tabler/icons-react";
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Primitives/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  argTypes: {
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
      },
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback when open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the collapsible",
      table: {
        category: "State",
        type: { summary: "boolean" },
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
    actions: {
      handles: ["openChanged"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

/**
 * Basic collapsible
 * Shows a simple collapsible with trigger and content
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic collapsible component with a trigger button and expandable content. Click the trigger to expand or collapse.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeInTheDocument();

    // Verify content is initially hidden
    const content = canvasElement.querySelector('[data-slot="collapsible-content"]');
    await expect(content).toBeInTheDocument();

    // Click to expand
    await userEvent.click(trigger);
    await waitFor(
      () => {
        expect(content).toHaveAttribute("data-state", "open");
      },
      { timeout: 300 }
    );

    // Click again to collapse
    await userEvent.click(trigger);
    await waitFor(
      () => {
        expect(content).toHaveAttribute("data-state", "closed");
      },
      { timeout: 300 }
    );
  },
  render: () => (
    <Collapsible className="w-[400px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          <span>What is a collapsible?</span>
          <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-2">
          A collapsible is an interactive component that expands and collapses to show or hide
          content. Multiple collapsibles can be open at the same time, unlike accordions which are
          mutually exclusive.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/**
 * Default open
 * Collapsible that starts in the open state
 */
export const DefaultOpen: Story = {
  parameters: {
    docs: {
      description: {
        story: "Collapsible that starts in the open state using the defaultOpen prop.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Trigger button should be present
    const trigger = canvas.getByRole("button", {
      name: /frequently asked questions/i,
    });
    await expect(trigger).toBeInTheDocument();

    // Content should start open
    const content = canvasElement.querySelector(
      '[data-slot="collapsible-content"]'
    );
    await expect(content).toBeInTheDocument();
    await expect(content).toHaveAttribute("data-state", "open");
  },
  render: () => (
    <Collapsible defaultOpen className="w-[400px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          <span>Frequently Asked Questions</span>
          <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-2">
          <p className="mb-2">
            This collapsible starts open by default. You can collapse it by clicking the trigger
            button.
          </p>
          <p>
            Use defaultOpen when you want to show content immediately but still allow users to
            collapse it.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/**
 * Controlled state
 * Demonstrates controlling the open state programmatically
 */
export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controlled collapsible where the open state is managed externally. Use the open prop and onOpenChange callback.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the toggle button
    const toggleButton = canvas.getByRole("button", { name: /toggle/i });
    await expect(toggleButton).toBeInTheDocument();

    // Find the collapsible trigger
    const trigger = canvas.getByRole("button", { name: /controlled/i });
    await expect(trigger).toBeInTheDocument();

    // Click toggle to open
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        const content = canvasElement.querySelector('[data-slot="collapsible-content"]');
        expect(content).toHaveAttribute("data-state", "open");
      },
      { timeout: 300 }
    );
  },
  render: function ControlledCollapsibleStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4 w-[400px]">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
            Toggle Collapsible
          </Button>
          <span className="text-sm text-muted-foreground flex items-center">
            State: {isOpen ? "Open" : "Closed"}
          </span>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span>Controlled Collapsible</span>
              <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 py-2">
              This collapsible is controlled externally. The open state is managed by React state,
              and you can toggle it using the button above or by clicking the trigger.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};

/**
 * With custom trigger
 * Shows collapsible with a custom styled trigger
 */
export const WithCustomTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Collapsible with a custom trigger button. You can style the trigger however you like.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /advanced settings/i });
    await expect(trigger).toBeInTheDocument();

    // Content should be closed initially
    const content = canvasElement.querySelector(
      '[data-slot="collapsible-content"]'
    );
    await expect(content).toHaveAttribute("data-state", "closed");

    // Click to open
    await userEvent.click(trigger);
    await waitFor(
      () => {
        expect(content).toHaveAttribute("data-state", "open");
      },
      { timeout: 300 }
    );
  },
  render: () => (
    <Collapsible className="w-[400px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between font-semibold">
          <span>Advanced Settings</span>
          <IconSelector className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-2 space-y-2">
          <p>Here are some advanced settings you can configure:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Enable experimental features</li>
            <li>Configure API endpoints</li>
            <li>Set up custom integrations</li>
          </ul>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/**
 * Multiple collapsibles
 * Shows multiple independent collapsibles
 */
export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Multiple collapsibles that work independently. Unlike accordions, multiple collapsibles can be open at the same time.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const q1 = canvas.getByRole("button", { name: /question 1/i });
    const q2 = canvas.getByRole("button", { name: /question 2/i });

    await expect(q1).toBeInTheDocument();
    await expect(q2).toBeInTheDocument();

    const contents = canvasElement.querySelectorAll(
      '[data-slot="collapsible-content"]'
    );
    await expect(contents.length).toBeGreaterThanOrEqual(2);

    // Open first question
    await userEvent.click(q1);
    await waitFor(
      () => {
        expect(contents[0]).toHaveAttribute("data-state", "open");
      },
      { timeout: 300 }
    );

    // Open second question without closing the first
    await userEvent.click(q2);
    await waitFor(
      () => {
        expect(contents[1]).toHaveAttribute("data-state", "open");
      },
      { timeout: 300 }
    );

    // Both can be open at the same time
    await expect(contents[0]).toHaveAttribute("data-state", "open");
    await expect(contents[1]).toHaveAttribute("data-state", "open");
  },
  render: () => (
    <div className="space-y-2 w-[400px]">
      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span>Question 1: What is React?</span>
            <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            React is a JavaScript library for building user interfaces, particularly web
            applications.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span>Question 2: What is TypeScript?</span>
            <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span>Question 3: What is Next.js?</span>
            <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            Next.js is a React framework for production with features like server-side rendering and
            static site generation.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

/**
 * Disabled state
 * Shows collapsible in disabled state
 */
export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Disabled collapsible that cannot be toggled. The trigger is disabled and the content cannot be expanded.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /disabled collapsible/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toBeDisabled();

    const content = canvasElement.querySelector(
      '[data-slot="collapsible-content"]'
    );
    await expect(content).toBeInTheDocument();

    // Verify it starts and remains in the closed state (no interaction needed)
    await expect(content).toHaveAttribute("data-state", "closed");
  },
  render: () => (
    <Collapsible disabled className="w-[400px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between" disabled>
          <span>Disabled Collapsible</span>
          <IconSelector className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-2">
          This content cannot be accessed because the collapsible is disabled.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/**
 * With rich content
 * Shows collapsible with complex content inside
 */
export const WithRichContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Collapsible containing rich content including lists, paragraphs, and formatted text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /documentation/i });
    await expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    // Verify rich content appears
    await expect(canvas.getByText("Getting Started")).toBeInTheDocument();
    await expect(
      canvas.getByText("Follow these steps to get started with the component library:")
    ).toBeInTheDocument();
  },
  render: () => (
    <Collapsible className="w-[400px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between">
          <span>Documentation</span>
          <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-2 space-y-3">
          <h3 className="font-semibold text-base">Getting Started</h3>
          <p className="text-sm">Follow these steps to get started with the component library:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Install the required dependencies</li>
            <li>Import the components you need</li>
            <li>Start building your UI</li>
          </ol>
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              For more information, visit our documentation site.
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/**
 * FAQ example
 * Real-world FAQ section using collapsibles
 */
export const FAQ: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "FAQ section using collapsibles. This demonstrates a common use case where multiple questions can be expanded simultaneously.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First FAQ question should toggle on click
    const q1 = canvas.getByRole("button", {
      name: /what's the difference between collapsible and accordion\?/i,
    });
    await expect(q1).toBeInTheDocument();

    await userEvent.click(q1);
    await expect(
      canvas.getByText(/collapsibles work independently—multiple can be open at once/i)
    ).toBeInTheDocument();

    // Third FAQ is defaultOpen and should already show content
    await expect(
      canvas.getByText(/yes! use the open prop for controlled state/i)
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-2 w-[500px]">
      <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>

      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between text-left">
            <span>What&apos;s the difference between Collapsible and Accordion?</span>
            <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180 shrink-0 ml-2" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            Collapsibles work independently—multiple can be open at once. The Collapsible component
            is for independent sections. Use accordion patterns when you want mutually exclusive
            content areas.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between text-left">
            <span>How do I customize the styling?</span>
            <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180 shrink-0 ml-2" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            You can customize the styling by passing className props to any of the collapsible
            components. The trigger and content can be styled independently.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen className="space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between text-left">
            <span>Can I control the open state programmatically?</span>
            <IconSelector className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180 shrink-0 ml-2" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 py-2">
            Yes! Use the open prop for controlled state, or defaultOpen for uncontrolled state with
            an initial value. The onOpenChange callback will be called whenever the state changes.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
