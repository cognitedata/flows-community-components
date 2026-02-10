import { Button } from "@/components/ui/aura/button";
import { Input } from "@/components/ui/aura/input";
import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Primitives/Popover",
  component: Popover,
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
        defaultValue: { summary: "false" },
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
    modal: {
      control: "boolean",
      description: "Whether the popover should be modal",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A popover component built on Base UI that displays rich content in a portal, triggered by a button. Perfect for contextual information and secondary actions.",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "aria-valid-attr-value",
            selector: '[data-slot="popover-trigger"]',
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Basic popover with title and description.
 * Matches the basic example from popover.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "A simple popover with heading and description text. The popover appears centered below the trigger button. Click the button to open.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /open popover/i });
    await expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    await waitFor(
      async () => {
        const heading = body.getByText(/get started with atlas/i);
        await expect(heading).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    const description = body.getByText(/cognite atlas ai helps you create and manage/i);
    await expect(description).toBeInTheDocument();
  },
  render: function PopoverBasicStory() {
    return (
      <div className="flex items-center justify-center p-12">
        <Popover>
          <PopoverTrigger render={<Button>Open Popover</Button>} />
          <PopoverContent aria-label="Get started with Atlas">
            <div className="space-y-2">
              <h3 className="font-medium text-popover-foreground text-base line-height-18 tracking-tighter mb-2">
                Get started with Atlas
              </h3>
              <p className="text-sm font-normal text-muted-foreground tracking-tight">
                Cognite Atlas AI helps you create and manage industrial AI agents that solve your
                specific business needs
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popovers positioned on different sides of the trigger.
 * Demonstrates the `side` prop with top, right, bottom, and left positions.
 */
export const Sides: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Popovers can be positioned on any side of the trigger using the `side` prop on PopoverContent. Available options: top, right, bottom (default), left.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const topButton = canvas.getByRole("button", { name: /^top$/i });
    await userEvent.click(topButton);

    await waitFor(
      async () => {
        const content = body.getByText(/this popover appears on top/i);
        await expect(content).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    await userEvent.click(topButton);
  },
  render: function PopoverSidesStory() {
    return (
      <div className="flex items-center justify-center gap-4 p-24">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Top</Button>} />
          <PopoverContent side="top" aria-label="Top positioned popover">
            <p className="text-sm text-popover-foreground">This popover appears on top</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Right</Button>} />
          <PopoverContent side="right" aria-label="Right positioned popover">
            <p className="text-sm text-popover-foreground">This popover appears on the right</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Bottom</Button>} />
          <PopoverContent side="bottom" aria-label="Bottom positioned popover">
            <p className="text-sm text-popover-foreground">This popover appears on the bottom</p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Left</Button>} />
          <PopoverContent side="left" aria-label="Left positioned popover">
            <p className="text-sm text-popover-foreground">This popover appears on the left</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popovers with different alignment options.
 * Demonstrates the `align` prop with start, center, and end positions.
 */
export const Alignment: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Control the alignment of the popover relative to the trigger using the `align` prop on PopoverContent. Options: start, center (default), end.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const startButton = canvas.getByRole("button", { name: /align start/i });
    await userEvent.click(startButton);

    await waitFor(
      async () => {
        const content = body.getByText(/aligned to start/i);
        await expect(content).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  },
  render: function PopoverAlignmentStory() {
    return (
      <div className="flex flex-col items-start gap-4 p-12">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Align Start</Button>} />
          <PopoverContent align="start" className="w-80" aria-label="Start aligned popover">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Aligned to start</h4>
              <p className="text-sm text-muted-foreground">
                This popover is aligned to the start (left edge) of the trigger.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Align Center</Button>} />
          <PopoverContent align="center" className="w-80" aria-label="Center aligned popover">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Aligned to center</h4>
              <p className="text-sm text-muted-foreground">
                This popover is centered relative to the trigger button.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Align End</Button>} />
          <PopoverContent align="end" className="w-80" aria-label="End aligned popover">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Aligned to end</h4>
              <p className="text-sm text-muted-foreground">
                This popover is aligned to the end (right edge) of the trigger.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popover containing a form with inputs and actions.
 * Shows how popovers can contain interactive controls.
 */
export const WithForm: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Popovers can contain interactive form controls like inputs and buttons. Perfect for quick actions or data entry without navigating away.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /create project/i });
    await userEvent.click(trigger);

    await waitFor(
      async () => {
        const heading = body.getByText(/create new project/i);
        await expect(heading).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    const nameInput = body.getByPlaceholderText(/enter project name/i);
    await expect(nameInput).toBeInTheDocument();
    await userEvent.type(nameInput, "My Project", { delay: 50 });
    await expect(nameInput).toHaveValue("My Project");

    const createButton = body.getByRole("button", { name: /^create$/i });
    await expect(createButton).toBeInTheDocument();
  },
  render: function PopoverWithFormStory() {
    return (
      <div className="flex items-center justify-center p-12">
        <Popover>
          <PopoverTrigger render={<Button>Create Project</Button>} />
          <PopoverContent className="w-80" aria-label="Create new project">
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <h4 className="font-medium text-sm leading-none">Create new project</h4>
                <p className="text-sm text-muted-foreground">
                  Set up a new project to organise your work
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project-name">Name</Label>
                  <Input id="project-name" placeholder="Enter project name" autoComplete="off" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Input
                    id="project-description"
                    placeholder="Brief project description"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Create</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popover with custom width.
 * The default width is 18rem (w-72), but can be customised using className.
 */
export const CustomWidth: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Control the width of the popover content by passing a className with width utilities to PopoverContent. Default width is 18rem (w-72).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const narrowButton = canvas.getByRole("button", { name: /narrow/i });
    await userEvent.click(narrowButton);

    await waitFor(
      async () => {
        const content = body.getByText(/narrow popover with w-48/i);
        await expect(content).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    await userEvent.click(narrowButton);
    const wideButton = canvas.getByRole("button", { name: /wide/i });
    await userEvent.click(wideButton);

    await waitFor(
      async () => {
        const content = body.getByText(/wide popover with w-96/i);
        await expect(content).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  },
  render: function PopoverCustomWidthStory() {
    return (
      <div className="flex items-center justify-center gap-4 p-12">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Narrow</Button>} />
          <PopoverContent className="w-48" aria-label="Narrow width popover">
            <p className="text-sm text-popover-foreground">
              This is a narrow popover with w-48 (12rem) width.
            </p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Default</Button>} />
          <PopoverContent aria-label="Default width popover">
            <p className="text-sm text-popover-foreground">
              This uses the default width of w-72 (18rem).
            </p>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger render={<Button variant="outline">Wide</Button>} />
          <PopoverContent className="w-96" aria-label="Wide popover">
            <p className="text-sm text-popover-foreground">
              This is a wide popover with w-96 (24rem) width. It can contain more detailed
              information or multiple columns of content.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popover with rich content including lists and actions.
 * Demonstrates more complex layouts within popovers.
 */
export const RichContent: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Popovers can contain rich content including headings, lists, and multiple action buttons. Useful for action menus or quick access panels.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /view actions/i });
    await userEvent.click(trigger);

    await waitFor(
      async () => {
        const heading = body.getByText(/quick actions/i);
        await expect(heading).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    const exportButton = body.getByRole("button", { name: /export data/i });
    await expect(exportButton).toBeInTheDocument();

    await userEvent.click(exportButton);
  },
  render: function PopoverRichContentStory() {
    return (
      <div className="flex items-center justify-center p-12">
        <Popover>
          <PopoverTrigger render={<Button>View Actions</Button>} />
          <PopoverContent className="w-80" aria-label="Quick actions menu">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-base tracking-tighter mb-1">Quick Actions</h4>
                <p className="text-sm text-muted-foreground tracking-tight">
                  Choose an action to perform
                </p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Export data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Share with team
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Download report
                </Button>
              </div>
              <div className="pt-2 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  View all actions
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Controlled popover with external state management.
 * Demonstrates programmatic control of popover state.
 */
export const Controlled: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "A controlled popover where the open state is managed externally. Includes a button to programmatically toggle the popover.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const toggleButton = canvas.getByRole("button", {
      name: /toggle with external button/i,
    });
    await expect(toggleButton).toBeInTheDocument();

    const trigger = canvas.getByRole("button", { name: /popover trigger/i });
    await expect(trigger).not.toHaveAttribute("data-popup-open");

    await userEvent.click(toggleButton);

    await waitFor(
      async () => {
        expect(trigger).toHaveAttribute("data-popup-open");
      },
      { timeout: 500 }
    );

    const heading = body.getByText(/controlled popover/i);
    await expect(heading).toBeInTheDocument();

    const description = body.getByText(/controlled externally/i);
    await expect(description).toBeInTheDocument();
  },
  render: function PopoverControlledStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-12">
        <Button variant="outline" onClick={() => setOpen(!open)} className="mb-4">
          Toggle with external button
        </Button>
        <Popover modal={false} open={open} onOpenChange={setOpen}>
          <PopoverTrigger render={<Button>Popover Trigger</Button>} />
          <PopoverContent aria-label="Controlled popover">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Controlled Popover</h4>
              <p className="text-sm text-muted-foreground">
                This popover is controlled externally. The button above can toggle it
                programmatically.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Minimal popover content for empty-state style usage.
 */
export const EmptyContent: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Popover with minimal content to validate rendering and interaction when content is intentionally sparse.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /open empty popover/i });
    await expect(trigger).toBeInTheDocument();

    await userEvent.click(trigger);

    await waitFor(
      async () => {
        const content = body.getByText("No additional details.");
        await expect(content).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  },
  render: function PopoverEmptyContentStory() {
    return (
      <div className="flex items-center justify-center p-12">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open Empty Popover</Button>} />
          <PopoverContent aria-label="Minimal content popover">
            <p className="text-sm text-muted-foreground">No additional details.</p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popover with long content constrained to a scrollable viewport.
 */
export const LongContentScrollable: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Long popover content constrained with max height and scrolling to verify overflow behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /open long content/i });
    await userEvent.click(trigger);

    await waitFor(
      async () => {
        const heading = body.getByText("Release notes");
        await expect(heading).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    const heading = body.getByText("Release notes");
    const container = heading.closest('[data-slot="popover-content"]');
    await expect(container).toBeInTheDocument();
    if (!container) {
      throw new Error("Popover content container not found");
    }
    await expect(container).toHaveClass("max-h-48");
    await expect(container).toHaveClass("overflow-y-auto");
  },
  render: function PopoverLongContentScrollableStory() {
    return (
      <div className="flex items-center justify-center p-12">
        <Popover>
          <PopoverTrigger render={<Button variant="outline">Open Long Content</Button>} />
          <PopoverContent
            aria-label="Long content popover"
            className="max-h-48 w-96 overflow-y-auto"
          >
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Release notes</h4>
              <p className="text-sm text-muted-foreground">
                Bug fixes and improvements are listed below.
              </p>
              <ul className="space-y-2 text-sm">
                <li>Improved keyboard navigation for floating surfaces.</li>
                <li>Reduced layout shift during open/close animations.</li>
                <li>Refined positioning behavior near viewport boundaries.</li>
                <li>Updated interaction handling for nested controls.</li>
                <li>Improved content readability in dense data layouts.</li>
                <li>Enhanced performance for repeated open/close interactions.</li>
                <li>Additional internal cleanup for maintainability.</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Popover behavior in constrained narrow layouts.
 */
export const NarrowViewport: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story:
          "Constrained layout scenario that verifies readable popover content and stable positioning in narrow containers.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole("button", { name: /open compact popover/i });
    await userEvent.click(trigger);

    await waitFor(
      async () => {
        const text = body.getByText(/content wraps correctly in narrow layouts/i);
        await expect(text).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    const text = body.getByText(/content wraps correctly in narrow layouts/i);
    const container = text.closest('[data-slot="popover-content"]');
    await expect(container).toBeInTheDocument();
    if (!container) {
      throw new Error("Popover content container not found");
    }
    await expect(container).toHaveClass("max-w-56");
  },
  render: function PopoverNarrowViewportStory() {
    return (
      <div className="w-64 rounded-lg border p-3">
        <Popover>
          <PopoverTrigger render={<Button className="w-full">Open Compact Popover</Button>} />
          <PopoverContent align="start" aria-label="Compact popover" className="max-w-56">
            <p className="text-sm text-muted-foreground">
              Content wraps correctly in narrow layouts while remaining readable.
            </p>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};

/**
 * Interactive playground for testing popover props.
 */
export const Playground: Story = {
  args: {
    modal: false,
    defaultOpen: false,
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          "Interactive playground to test different popover configurations. Use the controls panel to experiment with props.",
      },
    },
  },
  render: function PopoverPlaygroundStory(args) {
    return (
      <div className="flex items-center justify-center p-24">
        <Popover {...args}>
          <PopoverTrigger render={<Button>Open Popover</Button>} />
          <PopoverContent aria-label="Popover playground">
            <div className="space-y-2">
              <h3 className="font-medium text-popover-foreground text-base line-height-18 tracking-tighter">
                Popover Playground
              </h3>
              <p className="text-sm font-normal text-muted-foreground tracking-tight">
                Use the controls panel to customise the popover behaviour and appearance.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
