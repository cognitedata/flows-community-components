'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import { SwapSlot } from './swap-slot';
import { Button } from './button';
import { Badge } from './badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';
import { IconPlus, IconCheck } from '@tabler/icons-react';

const meta: Meta<typeof SwapSlot> = {
  title: 'AI/Swap Slot',
  component: SwapSlot,
  tags: ['autodocs'],
  argTypes: {
    // Display & behavior
    defaultSlot: {
      control: false,
      description:
        'Default content to display when activeSlot is not provided. Falls back to children if not set.',
      table: {
        category: 'Display',
        type: { summary: 'ReactNode' },
      },
    },
    activeSlot: {
      control: false,
      description:
        'Active content that takes priority over defaultSlot and children.',
      table: {
        category: 'Display',
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: false,
      description:
        'Fallback content when neither activeSlot nor defaultSlot are provided.',
      table: {
        category: 'Display',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SwapSlot>;

/**
 * Basic empty swap slot with default styling
 * Shows the default dashed border container
 */
export const Basic: Story = {
  args: {
    className: 'w-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic swap slot with default styling. Displays an empty container with dashed border.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Query by class name since it's an empty div
    const swapSlot = canvasElement.querySelector('.border-dashed');
    await expect(swapSlot).toBeInTheDocument();
    await expect(swapSlot).toHaveClass('border-dashed');
  },
};

/**
 * Swap slot with children content
 * Demonstrates using children as fallback content
 */
export const WithChildren: Story = {
  args: {
    className: 'w-[400px]',
  },
  render: (args) => (
    <SwapSlot {...args}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <IconPlus className="size-4" />
        <span>Placeholder content</span>
      </div>
    </SwapSlot>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Swap slot with children content. Children are displayed when neither activeSlot nor defaultSlot are provided.',
      },
    },
  },
};

/**
 * Swap slot with defaultSlot
 * Shows default content that can be overridden by activeSlot
 */
export const WithDefaultSlot: Story = {
  args: {
    className: 'w-[400px]',
    defaultSlot: (
      <div className="flex items-center gap-2 text-muted-foreground">
        <IconPlus className="size-4" />
        <span>Default content slot</span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Swap slot with defaultSlot. This content is shown when activeSlot is not provided.',
      },
    },
  },
};

/**
 * Swap slot with activeSlot
 * Demonstrates active content that takes priority
 */
export const WithActiveSlot: Story = {
  args: {
    className: 'w-[400px]',
    activeSlot: (
      <div className="flex items-center gap-2 text-foreground">
        <IconCheck className="size-4 text-success" />
        <span>Active content slot</span>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Swap slot with activeSlot. Active content takes priority over defaultSlot and children.',
      },
    },
  },
};

/**
 * Interactive swap demonstration
 * Shows how activeSlot takes priority over defaultSlot
 */
export const InteractiveSwap: Story = {
  args: {
    className: 'w-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration of swap behavior. Click the button to toggle between active and default slots.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', { name: /toggle/i });

    // Initially should show default slot
    await expect(canvas.getByText('Default content')).toBeInTheDocument();

    // Click to activate
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText('Active content')).toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Click again to deactivate
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText('Default content')).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
  render: function InteractiveSwapStory(args) {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="space-y-4">
        <SwapSlot
          {...args}
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
  render: () => (
    <div className="space-y-4 w-[400px]">
      <SwapSlot className="h-20 bg-accent/50">
        <span className="text-sm text-muted-foreground">
          Custom background color
        </span>
      </SwapSlot>
      <SwapSlot className="h-24 border-2 border-primary">
        <span className="text-sm text-muted-foreground">Primary border</span>
      </SwapSlot>
      <SwapSlot className="h-16 rounded-lg border-solid">
        <span className="text-sm text-muted-foreground">Solid border</span>
      </SwapSlot>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of swap slot with custom styling including different backgrounds, borders, and heights.',
      },
    },
  },
};

/**
 * Swap slot in card context
 * Demonstrates real-world usage within a card component
 */
export const InCard: Story = {
  render: () => (
    <Card className="w-[412px] max-w-md">
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Swap slot used within a card component, demonstrating a common use case.',
      },
    },
  },
};

/**
 * Priority demonstration
 * Shows the priority order: activeSlot > defaultSlot > children
 */
export const PriorityOrder: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm">
          1. With all three (activeSlot wins)
        </h3>
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the priority order: activeSlot takes precedence over defaultSlot, which takes precedence over children.',
      },
    },
  },
};

/**
 * With complex content
 * Shows swap slot with more complex React components
 */
export const WithComplexContent: Story = {
  render: () => {
    const [isActive, setIsActive] = useState(false);

    return (
      <div className="space-y-4 w-[400px]">
        <SwapSlot
          className="min-h-32 h-auto"
          defaultSlot={
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <span className="font-medium">Default State</span>
                <Badge variant="archived">Inactive</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This is the default slot with complex content including badges
                and multiple text elements.
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
          {isActive ? 'Deactivate' : 'Activate'} Slot
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Swap slot with complex content including multiple elements, badges, and buttons.',
      },
    },
  },
};

/**
 * Empty state
 * Shows swap slot in its empty state
 */
export const EmptyState: Story = {
  render: () => (
    <SwapSlot className="w-[400px] h-20">{/* Intentionally empty */}</SwapSlot>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty swap slot showing just the container with dashed border.',
      },
    },
  },
};
