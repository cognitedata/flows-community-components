'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { Button } from './button';
import {
  IconInfoCircle,
  IconHelp,
  IconAlertTriangle,
} from '@tabler/icons-react';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Display & behavior
    delayDuration: {
      control: 'number',
      description: 'Delay before showing tooltip in milliseconds',
      table: {
        category: 'Display',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the tooltip is open by default',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Basic tooltip with default positioning (top)
 * Matches the basic example from tooltip.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic tooltip that appears on hover. Tests hover interaction and tooltip visibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button', { name: /hover me/i });
    await expect(button).toBeInTheDocument();

    // Hover over the button
    await userEvent.hover(button);

    // Wait for tooltip to appear (tooltip is rendered in a portal, so search in document)
    const tooltipBody = within(document.body);
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByText(
          'Publishing will make it available to all users'
        );
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );

    // Move away to hide tooltip
    await userEvent.unhover(button);
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          Publishing will make it available to all users
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Multiple tooltips with different button variants
 */
export const WithButtonVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips used with different button variants to show contextual information.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <div className="flex justify-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            Publishing will make it available to all users
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">More info</Button>
          </TooltipTrigger>
          <TooltipContent>This button does something important</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </TooltipTrigger>
          <TooltipContent>This action cannot be undone</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on top
 */
export const PositionTop: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned above the trigger element.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);

    // Wait for tooltip to appear (tooltip is rendered in a portal)
    const tooltipBody = within(document.body);
    await waitFor(
      () => {
        const tooltip = tooltipBody.queryByText('This is a helpful message');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toBeVisible();
      },
      { timeout: 3000 }
    );
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me - Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on the right
 */
export const PositionRight: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned to the right of the trigger element.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me - Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on the bottom
 */
export const PositionBottom: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned below the trigger element.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me - Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip positioned on the left
 */
export const PositionLeft: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned to the left of the trigger element.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me - Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">This is a helpful message</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * All positions displayed together
 * Matches the positions example from tooltip.examples.tsx
 */
export const AllPositions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltips with arrows appearing from all sides.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center gap-16 min-h-[300px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">This is a helpful message</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">This is a helpful message</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Tooltip with icon buttons
 */
export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tooltips used with icon buttons to provide additional context.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconInfoCircle className="size-4" />
              <span className="sr-only">Information</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>View more information</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconHelp className="size-4" />
              <span className="sr-only">Help</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Get help with this feature</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconAlertTriangle className="size-4" />
              <span className="sr-only">Warning</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>This action requires attention</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
};

/**
 * Long tooltip content
 */
export const LongContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip with longer content to demonstrate text wrapping and balance.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for details</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          This is a longer tooltip message that demonstrates how the component
          handles multiple lines of text. The text will wrap naturally and
          maintain good readability.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/**
 * Tooltip with custom offset
 */
export const WithOffset: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip with custom side offset to adjust spacing from the trigger element.',
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me (offset)</Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={12}>
          This tooltip has increased spacing from the button
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
