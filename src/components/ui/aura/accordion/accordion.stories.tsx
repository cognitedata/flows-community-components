import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconBrush, IconClock, IconInfoCircle, IconSettings, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Primitives/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Determines whether one or multiple items can be open at the same time",
      table: {
        category: "Behavior",
        type: { summary: '"single" | "multiple"' },
      },
    },
    collapsible: {
      control: "boolean",
      description:
        'When type is "single", allows closing content when clicking trigger of open item',
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    defaultValue: {
      control: "text",
      description: "The value of the item(s) to expand by default",
      table: {
        category: "Behavior",
        type: { summary: "string | string[]" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the entire accordion",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Variants/Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/**
 * Basic accordion with single item expansion and collapsible behavior.
 */
export const Basic: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses smooth transitions for opening and closing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic accordion with collapsible sections. Only one item can be open at a time.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await expect(triggers).toHaveLength(3);
    await userEvent.click(triggers[0]);
    await waitFor(() => {
      expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
    });
    await userEvent.click(triggers[1]);
    await waitFor(() => {
      expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
      expect(triggers[1]).toHaveAttribute("aria-expanded", "true");
    });
  },
};

/**
 * Accordion with default expanded item.
 */
export const DefaultExpanded: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-2" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconInfoCircle}>
          When should I use single vs. multiple mode?
        </AccordionTrigger>
        <AccordionContent>
          You should use single mode when you want to allow only one section to be open at a time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconInfoCircle}>
          Should any sections be open by default?
        </AccordionTrigger>
        <AccordionContent>
          Micro-interactions are events which have one main task — a single purpose — and they are
          found all over your device and within apps.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={IconInfoCircle}>
          Any special considerations for mobile?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you should use the collapsible prop to allow the user to collapse the accordion on
          mobile.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Accordion with item-2 expanded by default using the defaultValue prop.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const defaultOpenTrigger = await canvas.findByRole("button", {
      name: "Should any sections be open by default?",
    });

    await waitFor(() => {
      expect(defaultOpenTrigger).toHaveAttribute("aria-expanded", "true");
    });
  },
};

/**
 * Accordion with icons in the trigger.
 */
export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconInfoCircle}>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconBrush}>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={IconClock}>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses smooth transitions for opening and closing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Accordion triggers can include icons for visual context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await expect(triggers).toHaveLength(3);
    await expect(canvas.getByRole("button", { name: "Is it accessible?" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Is it styled?" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Is it animated?" })).toBeInTheDocument();
  },
};

/**
 * Multiple items can be open simultaneously.
 */
export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>This section can be open at the same time as others.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Multiple sections can be expanded simultaneously.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Click to expand and collapse independently.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          'Allow multiple accordion items to be open simultaneously by setting type to "multiple".',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await userEvent.click(triggers[0]);
    await userEvent.click(triggers[1]);
    await waitFor(() => {
      expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
      expect(triggers[1]).toHaveAttribute("aria-expanded", "true");
    });
  },
};

/**
 * Controlled accordion with external state management.
 */
export const Controlled: Story = {
  render: function ControlledAccordion() {
    const [value, setValue] = useState<string>("item-1");

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("item-1")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Open Item 1
          </button>
          <button
            type="button"
            onClick={() => setValue("item-2")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Open Item 2
          </button>
          <button
            type="button"
            onClick={() => setValue("item-3")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Open Item 3
          </button>
        </div>
        <Accordion type="single" value={value} onValueChange={setValue} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content for item 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content for item 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Item 3</AccordionTrigger>
            <AccordionContent>Content for item 3</AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="text-sm text-muted-foreground">Current value: {value}</p>
      </div>
    );
  },
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Accordion can be controlled externally using value and onValueChange props.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openItem2Button = canvas.getByRole("button", { name: "Open Item 2" });
    await userEvent.click(openItem2Button);
    await waitFor(() => {
      const currentValue = canvas.getByText(/Current value: item-2/);
      expect(currentValue).toBeInTheDocument();
    });
  },
};

/**
 * Disabled accordion.
 */
export const Disabled: Story = {
  render: () => (
    <Accordion type="single" collapsible disabled className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Disabled Item 1</AccordionTrigger>
        <AccordionContent>This content cannot be accessed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Disabled Item 2</AccordionTrigger>
        <AccordionContent>This content cannot be accessed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Disabled accordion prevents all interaction.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    for (const trigger of triggers) {
      const isAriaDisabled = trigger.getAttribute("aria-disabled") === "true";
      const hasDataDisabled = trigger.hasAttribute("data-disabled");
      expect(isAriaDisabled || hasDataDisabled || (trigger as HTMLButtonElement).disabled).toBe(
        true
      );
    }
  },
};

/**
 * Accordion with rich content.
 */
export const RichContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconUser}>User Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Email notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Push notifications</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Weekly digest</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconSettings}>App Settings</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark mode</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Compact view</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Accordion content can include any React elements including forms and interactive components.",
      },
    },
  },
};

/**
 * Visual regression testing - comprehensive overview.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single (Collapsible)</h3>
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Expanded Item</AccordionTrigger>
            <AccordionContent>This item is expanded by default.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Collapsed Item</AccordionTrigger>
            <AccordionContent>This item is collapsed.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger icon={IconInfoCircle}>Info</AccordionTrigger>
            <AccordionContent>Information content.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger icon={IconSettings}>Settings</AccordionTrigger>
            <AccordionContent>Settings content.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <Accordion type="single" collapsible disabled className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Disabled Item</AccordionTrigger>
            <AccordionContent>Cannot interact.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    order: 8,
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
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Section</AccordionTrigger>
        <AccordionContent>Content for the first section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Section</AccordionTrigger>
        <AccordionContent>Content for the second section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Section</AccordionTrigger>
        <AccordionContent>Content for the third section.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with accordion props.",
      },
    },
  },
};
