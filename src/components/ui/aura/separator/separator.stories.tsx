import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Primitives/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the separator",
      table: {
        category: "Layout",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
      },
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is purely decorative",
      table: {
        category: "Accessibility",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

/**
 * Default horizontal separator.
 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section Title</h4>
        <p className="text-sm text-muted-foreground">Some content above the separator.</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Another Section</h4>
        <p className="text-sm text-muted-foreground">Some content below the separator.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default horizontal separator dividing content sections.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const separator = canvasElement.querySelector('[data-slot="separator"]');
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute("data-orientation", "horizontal");
  },
};

/**
 * Vertical separator.
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" />
      <div>Docs</div>
      <Separator orientation="vertical" />
      <div>Source</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical separator for inline content division.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const separators = canvasElement.querySelectorAll('[data-slot="separator"]');
    await expect(separators).toHaveLength(2);
    for (const sep of separators) {
      await expect(sep).toHaveAttribute("data-orientation", "vertical");
    }
  },
};

/**
 * Separator in navigation.
 */
export const InNavigation: Story = {
  render: () => (
    <nav className="flex h-5 items-center space-x-4 text-sm">
      <a href="#" className="hover:text-foreground text-muted-foreground">
        Home
      </a>
      <Separator orientation="vertical" />
      <a href="#" className="hover:text-foreground text-muted-foreground">
        Products
      </a>
      <Separator orientation="vertical" />
      <a href="#" className="hover:text-foreground text-muted-foreground">
        About
      </a>
      <Separator orientation="vertical" />
      <a href="#" className="hover:text-foreground text-muted-foreground">
        Contact
      </a>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical separators used in navigation.",
      },
    },
  },
};

/**
 * Separator in card.
 */
export const InCard: Story = {
  render: () => (
    <div className="w-[350px] rounded-lg border p-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-medium">Subscription</h3>
          <p className="text-sm text-muted-foreground">Pro Plan</p>
        </div>
        <div className="text-right">
          <p className="font-medium">$29/mo</p>
          <p className="text-sm text-muted-foreground">Billed monthly</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Storage</span>
          <span>100 GB</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Users</span>
          <span>Unlimited</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Support</span>
          <span>Priority</span>
        </div>
      </div>
      <Separator className="my-4" />
      <button className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
        Upgrade Plan
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal separators used within a card component.",
      },
    },
  },
};

/**
 * Separator with text.
 */
export const WithText: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separator with centered text overlay.",
      },
    },
  },
};

/**
 * Multiple separators in list.
 */
export const InList: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border">
      <div className="p-4">
        <h4 className="font-medium">Notifications</h4>
        <p className="text-sm text-muted-foreground">Manage your notification settings.</p>
      </div>
      <Separator />
      <div className="p-4">
        <h4 className="font-medium">Privacy</h4>
        <p className="text-sm text-muted-foreground">Control your privacy preferences.</p>
      </div>
      <Separator />
      <div className="p-4">
        <h4 className="font-medium">Security</h4>
        <p className="text-sm text-muted-foreground">Update your security settings.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators dividing list items.",
      },
    },
  },
};

/**
 * Custom styled separator.
 */
export const CustomStyle: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default</p>
        <Separator />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Thicker</p>
        <Separator className="h-0.5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Colored</p>
        <Separator className="bg-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-2">Dashed (via border)</p>
        <div className="border-t border-dashed border-border" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators with custom styles applied.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4 w-[350px]">
      {/* Horizontal */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Horizontal</h3>
        <div className="space-y-4">
          <p className="text-sm">Content above</p>
          <Separator />
          <p className="text-sm">Content below</p>
        </div>
      </div>

      {/* Vertical */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Vertical</h3>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <span>Item 1</span>
          <Separator orientation="vertical" />
          <span>Item 2</span>
          <Separator orientation="vertical" />
          <span>Item 3</span>
        </div>
      </div>

      {/* In card */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">In Card</h3>
        <div className="rounded-lg border p-3">
          <p className="text-sm">Section 1</p>
          <Separator className="my-3" />
          <p className="text-sm">Section 2</p>
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
    orientation: "horizontal",
    decorative: true,
  },
  render: (args) => (
    <div className={args.orientation === "vertical" ? "h-20" : "w-[300px]"}>
      <Separator {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with separator props.",
      },
    },
  },
};
