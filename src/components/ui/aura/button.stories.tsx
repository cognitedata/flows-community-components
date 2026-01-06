import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';
import { IconPlus, IconDownload, IconTrash, IconSettings, IconSend, IconLoader2 } from '@tabler/icons-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'secondary', 'outline', 'ghost', 'link'],
      description: 'The visual style variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default primary button style
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * Secondary button for less prominent actions
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

/**
 * Outline button with border
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

/**
 * Ghost button for subtle actions
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

/**
 * Destructive button for dangerous actions
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

/**
 * Link-styled button
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

/**
 * All button variants displayed together
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * All button sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Button with left icon
 */
export const WithLeftIcon: Story = {
  render: () => (
    <Button>
      <IconPlus className="size-4" />
      Add Item
    </Button>
  ),
};

/**
 * Button with right icon
 */
export const WithRightIcon: Story = {
  render: () => (
    <Button>
      Download
      <IconDownload className="size-4" />
    </Button>
  ),
};

/**
 * Icon-only buttons in different sizes
 */
export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon-sm">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon-lg">
        <IconSettings className="size-5" />
      </Button>
    </div>
  ),
};

/**
 * Disabled state for all variants
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
};

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Please wait
      </Button>
    </div>
  ),
};

/**
 * Button examples in context
 */
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <IconSettings className="size-4" />
          Settings
        </Button>
        <Button variant="destructive" size="sm">
          <IconTrash className="size-4" />
          Delete
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg" className="w-full">
          <IconSend className="size-4" />
          Send Message
        </Button>
      </div>
    </div>
  ),
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Click me',
    disabled: false,
  },
};

