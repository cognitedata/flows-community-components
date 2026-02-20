import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Separator } from './separator';
const meta: Meta<typeof Separator> = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: '"horizontal" | "vertical"',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Separator>;
export const Default: Story = {
  render: () => (
    <div className="w-75">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section Title</h4>
        <p className="text-sm text-muted-foreground">
          Some content above the separator.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Another Section</h4>
        <p className="text-sm text-muted-foreground">
          Some content below the separator.
        </p>
      </div>
    </div>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');
    await expect(separator).toBeInTheDocument();
    await expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  },
};
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
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separators = canvas.getAllByRole('separator');
    await expect(separators).toHaveLength(2);
    for (const sep of separators) {
      await expect(sep).toHaveAttribute('data-orientation', 'vertical');
    }
  },
};
export const AllOrientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Horizontal</h3>
        <div className="w-75 space-y-4">
          <p className="text-sm">Content above</p>
          <Separator orientation="horizontal" />
          <p className="text-sm">Content below</p>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-4">Vertical</h3>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <span>Item 1</span>
          <Separator orientation="vertical" />
          <span>Item 2</span>
          <Separator orientation="vertical" />
          <span>Item 3</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 3,
  },
};
export const InNavigation: Story = {
  render: () => (
    <nav className="flex h-5 items-center space-x-4 text-sm">
      <a href="/home" className="hover:text-foreground text-muted-foreground">
        Home
      </a>
      <Separator orientation="vertical" />
      <a
        href="/products"
        className="hover:text-foreground text-muted-foreground"
      >
        Products
      </a>
      <Separator orientation="vertical" />
      <a href="/about" className="hover:text-foreground text-muted-foreground">
        About
      </a>
      <Separator orientation="vertical" />
      <a
        href="/contact"
        className="hover:text-foreground text-muted-foreground"
      >
        Contact
      </a>
    </nav>
  ),
  parameters: {
    order: 4,
  },
};
export const InCard: Story = {
  render: () => (
    <div className="w-88 rounded-lg border p-4">
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
      <button
        type="button"
        className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        Upgrade Plan
      </button>
    </div>
  ),
  parameters: {
    order: 5,
  },
};
export const WithText: Story = {
  render: () => (
    <div className="w-75">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 6,
  },
};
export const InList: Story = {
  render: () => (
    <div className="w-75 rounded-lg border">
      <div className="p-4">
        <h4 className="font-medium">Notifications</h4>
        <p className="text-sm text-muted-foreground">
          Manage your notification settings.
        </p>
      </div>
      <Separator />
      <div className="p-4">
        <h4 className="font-medium">Privacy</h4>
        <p className="text-sm text-muted-foreground">
          Control your privacy preferences.
        </p>
      </div>
      <Separator />
      <div className="p-4">
        <h4 className="font-medium">Security</h4>
        <p className="text-sm text-muted-foreground">
          Update your security settings.
        </p>
      </div>
    </div>
  ),
  parameters: {
    order: 7,
  },
};
export const CustomStyle: Story = {
  render: () => (
    <div className="w-75 space-y-4">
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
    </div>
  ),
  parameters: {
    order: 8,
  },
};
export const Accessibility: Story = {
  render: () => (
    <div className="w-75 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Semantic role</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Separators use the ARIA separator role, making them recognizable to
          assistive technologies.
        </p>
        <div className="space-y-2">
          <p className="text-sm">Content Section 1</p>
          <Separator aria-label="Content divider" />
          <p className="text-sm">Content Section 2</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">In navigation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Screen readers announce vertical separators between navigation items.
        </p>
        <nav
          className="flex h-5 items-center space-x-4 text-sm"
          aria-label="Main navigation"
        >
          <a href="/home">Home</a>
          <Separator orientation="vertical" />
          <a href="/about">About</a>
          <Separator orientation="vertical" />
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </div>
  ),
  parameters: {
    order: 9,
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4 w-88">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Horizontal
        </h3>
        <div className="space-y-4">
          <p className="text-sm">Content above</p>
          <Separator />
          <p className="text-sm">Content below</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Vertical
        </h3>
        <div className="flex h-5 items-center space-x-4 text-sm">
          <span>Item 1</span>
          <Separator orientation="vertical" />
          <span>Item 2</span>
          <Separator orientation="vertical" />
          <span>Item 3</span>
        </div>
      </div>

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
    order: 10,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className={args.orientation === 'vertical' ? 'h-20' : 'w-75'}>
      <Separator {...args} />
    </div>
  ),
  parameters: {
    order: 99,
  },
};
