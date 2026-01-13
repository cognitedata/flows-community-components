import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';
import {
  IconPlus,
  IconDownload,
  IconSettings,
  IconTrash,
  IconSend,
  IconLoader2,
  IconBookmark,
  IconExternalLink,
} from '@tabler/icons-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'secondary',
        'outline',
        'ghost',
        'link',
      ],
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
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'The default primary button style for main actions.',
      },
    },
  },
  args: {
    children: 'Button',
  },
};

/**
 * Secondary button for less prominent actions
 */
export const Secondary: Story = {
  name: 'Secondary',
  parameters: {
    docs: {
      description: {
        story: 'Secondary button for less prominent actions.',
      },
    },
  },
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

/**
 * Outline button with border
 */
export const Outline: Story = {
  name: 'Outline',
  parameters: {
    docs: {
      description: {
        story: 'Outline button with border, useful for secondary actions.',
      },
    },
  },
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

/**
 * Ghost button for subtle actions
 */
export const Ghost: Story = {
  name: 'Ghost',
  parameters: {
    docs: {
      description: {
        story: 'Ghost button for subtle, low-emphasis actions.',
      },
    },
  },
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

/**
 * Destructive button for dangerous actions
 */
export const Destructive: Story = {
  name: 'Destructive',
  parameters: {
    docs: {
      description: {
        story: 'Destructive button for dangerous actions like delete.',
      },
    },
  },
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

/**
 * Link-styled button
 */
export const Link: Story = {
  name: 'Link',
  parameters: {
    docs: {
      description: {
        story: 'Link-styled button that looks like a hyperlink.',
      },
    },
  },
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

/**
 * Button variants showcase with icons
 */
export const ButtonVariants: Story = {
  name: 'Button Variants',
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for various use cases.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default" size="icon-sm">
        <IconPlus />
      </Button>
      <Button variant="secondary" size="icon-sm">
        <IconBookmark />
      </Button>
      <Button variant="destructive" size="icon-sm">
        <IconTrash />
      </Button>
      <Button variant="default">
        <IconPlus /> Add data
      </Button>
      <Button variant="secondary">
        Explore more
        <IconExternalLink />
      </Button>
      <Button variant="destructive">
        <IconTrash />
        Delete
      </Button>
    </div>
  ),
};

/**
 * Comprehensive matrix of all sizes × variants with states
 */
export const MainComponent: Story = {
  name: 'Main Component',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Available size and variation options with normal, hover, and disabled states.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3 flex-col">
      {/* Primary variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-primary-hover dark:[&>button]:bg-primary-hover">
          <Button size="default">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="default" disabled>
          <IconPlus />
          Button
        </Button>
        <Button size="default">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-primary-hover dark:[&>button]:bg-primary-hover">
          <Button size="default">
            <IconPlus />
          </Button>
        </div>
        <Button size="default" disabled>
          <IconPlus />
        </Button>
        <Button size="sm">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-primary-hover dark:[&>button]:bg-primary-hover">
          <Button size="sm">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="sm" disabled>
          <IconPlus />
          Button
        </Button>
        <Button size="sm">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-primary-hover dark:[&>button]:bg-primary-hover">
          <Button size="sm">
            <IconPlus />
          </Button>
        </div>
        <Button size="sm" disabled>
          <IconPlus />
        </Button>
      </div>

      {/* Secondary variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant="secondary">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-secondary-hover dark:[&>button]:bg-secondary-hover">
          <Button size="default" variant="secondary">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="default" disabled variant="secondary">
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant="secondary">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-secondary-hover dark:[&>button]:bg-secondary-hover">
          <Button size="default" variant="secondary">
            <IconPlus />
          </Button>
        </div>
        <Button size="default" disabled variant="secondary">
          <IconPlus />
        </Button>
        <Button size="sm" variant="secondary">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-secondary-hover dark:[&>button]:bg-secondary-hover">
          <Button size="sm" variant="secondary">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="sm" disabled variant="secondary">
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant="secondary">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-secondary-hover dark:[&>button]:bg-secondary-hover">
          <Button size="sm" variant="secondary">
            <IconPlus />
          </Button>
        </div>
        <Button size="sm" disabled variant="secondary">
          <IconPlus />
        </Button>
      </div>

      {/* Outline variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant="outline">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-input/50">
          <Button size="default" variant="outline">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="default" disabled variant="outline">
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant="outline">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-input/50">
          <Button size="default" variant="outline">
            <IconPlus />
          </Button>
        </div>
        <Button size="default" disabled variant="outline">
          <IconPlus />
        </Button>
        <Button size="sm" variant="outline">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-input/50">
          <Button size="sm" variant="outline">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="sm" disabled variant="outline">
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant="outline">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-input/50">
          <Button size="sm" variant="outline">
            <IconPlus />
          </Button>
        </div>
        <Button size="sm" disabled variant="outline">
          <IconPlus />
        </Button>
      </div>

      {/* Ghost variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant="ghost">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-accent/50">
          <Button size="default" variant="ghost">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="default" disabled variant="ghost">
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant="ghost">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-accent/50">
          <Button size="default" variant="ghost">
            <IconPlus />
          </Button>
        </div>
        <Button size="default" disabled variant="ghost">
          <IconPlus />
        </Button>
        <Button size="sm" variant="ghost">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-accent/50">
          <Button size="sm" variant="ghost">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="sm" disabled variant="ghost">
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant="ghost">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-accent/50">
          <Button size="sm" variant="ghost">
            <IconPlus />
          </Button>
        </div>
        <Button size="sm" disabled variant="ghost">
          <IconPlus />
        </Button>
      </div>

      {/* Destructive variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant="destructive">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-destructive-hover dark:[&>button]:bg-destructive-hover">
          <Button size="default" variant="destructive">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="default" disabled variant="destructive">
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant="destructive">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-destructive-hover dark:[&>button]:bg-destructive-hover">
          <Button size="default" variant="destructive">
            <IconPlus />
          </Button>
        </div>
        <Button size="default" disabled variant="destructive">
          <IconPlus />
        </Button>
        <Button size="sm" variant="destructive">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-destructive-hover dark:[&>button]:bg-destructive-hover">
          <Button size="sm" variant="destructive">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="sm" disabled variant="destructive">
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant="destructive">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-destructive-hover dark:[&>button]:bg-destructive-hover">
          <Button size="sm" variant="destructive">
            <IconPlus />
          </Button>
        </div>
        <Button size="sm" disabled variant="destructive">
          <IconPlus />
        </Button>
      </div>

      {/* Link variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant="link">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-accent/50 dark:[&>button]:bg-accent/30 [&>button]:underline">
          <Button size="default" variant="link">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="default" disabled variant="link">
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant="link">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-accent/50 dark:[&>button]:bg-accent/30 [&>button]:underline">
          <Button size="default" variant="link">
            <IconPlus />
          </Button>
        </div>
        <Button size="default" disabled variant="link">
          <IconPlus />
        </Button>
        <Button size="sm" variant="link">
          <IconPlus />
          Button
        </Button>
        <div className="[&>button]:bg-accent/50 dark:[&>button]:bg-accent/30 [&>button]:underline">
          <Button size="sm" variant="link">
            <IconPlus />
            Button
          </Button>
        </div>
        <Button size="sm" disabled variant="link">
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant="link">
          <IconPlus />
        </Button>
        <div className="[&>button]:bg-accent/50 dark:[&>button]:bg-accent/30 [&>button]:underline">
          <Button size="sm" variant="link">
            <IconPlus />
          </Button>
        </div>
        <Button size="sm" disabled variant="link">
          <IconPlus />
        </Button>
      </div>
    </div>
  ),
};

/**
 * All button variants displayed together
 */
export const AllVariants: Story = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.',
      },
    },
  },
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
  name: 'All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All button sizes from small to large.',
      },
    },
  },
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
  name: 'With Left Icon',
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned on the left side.',
      },
    },
  },
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
  name: 'With Right Icon',
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned on the right side.',
      },
    },
  },
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
  name: 'Icon Buttons',
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons in different sizes for toolbar actions.',
      },
    },
  },
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
  name: 'Disabled States',
  parameters: {
    docs: {
      description: {
        story: 'Disabled state shown across all button variants.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
};

/**
 * Loading state with spinner
 */
export const Loading: Story = {
  name: 'Loading States',
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner for async actions.',
      },
    },
  },
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
 * Button states - disabled and loading
 */
export const ButtonStates: Story = {
  name: 'Button States',
  parameters: {
    docs: {
      description: {
        story: 'Disabled and loading states.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button disabled variant="secondary">Disabled</Button>
      <Button disabled variant="secondary">
        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  ),
};

/**
 * Button examples in context
 */
export const InContext: Story = {
  name: 'In Context',
  parameters: {
    docs: {
      description: {
        story: 'Realistic button usage scenarios in common UI patterns.',
      },
    },
  },
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
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - use the controls to experiment with button props.',
      },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    children: 'Click me',
    disabled: false,
  },
};

// =============================================================================
// Component Metadata (used by docs pages)
// =============================================================================

/**
 * Metadata for the Button component - used by documentation pages
 */
export const ButtonMetadata = {
  name: 'Button',
  description:
    'A versatile button component with multiple variants and sizes, built with Radix UI Slot and class-variance-authority.',
  llmUsage:
    "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'.",
  importPath: '@/components/ui/aura/button',
};
