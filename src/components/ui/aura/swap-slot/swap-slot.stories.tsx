import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { SwapSlot } from './swap-slot';

import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
const meta: Meta<typeof SwapSlot> = {
  title: 'Primitives/Swap Slot',
  component: SwapSlot,
  tags: ['autodocs'],
  argTypes: {
    defaultSlot: {
      control: false,
      table: {
        category: 'Display',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    activeSlot: {
      control: false,
      table: {
        category: 'Display',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Display',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    className: {
      control: 'text',
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
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const swapSlot = canvasElement.querySelector('.border-dashed');
    await expect(swapSlot).toBeInTheDocument();
    await expect(swapSlot).toHaveClass('border-dashed');
    await expect(swapSlot).toHaveClass('rounded-md');
    await expect(swapSlot).toHaveClass('border');
    await expect(swapSlot?.textContent).toBe('');
  },
  render: function BasicStory() {
    return <SwapSlot className="w-100" />;
  },
};
export const WithChildren: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Placeholder content')).toBeInTheDocument();
    const swapSlot = canvasElement.querySelector('.border-dashed');
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
export const WithDefaultSlot: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Default content slot')).toBeInTheDocument();
    await expect(canvas.queryByText('Active content slot')).not.toBeInTheDocument();
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
export const WithActiveSlot: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Active content slot')).toBeInTheDocument();
    await expect(canvas.queryByText('Default content slot')).not.toBeInTheDocument();
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
export const InteractiveSwap: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button', {
      name: /toggle/i,
    });
    await expect(canvas.getByText('Default content')).toBeInTheDocument();
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText('Active content')).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText('Default content')).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
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
export const CustomStyling: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Custom background colour')).toBeInTheDocument();
    await expect(canvas.getByText('Primary border')).toBeInTheDocument();
    await expect(canvas.getByText('Solid border')).toBeInTheDocument();
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
export const InCard: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Card Title')).toBeInTheDocument();
    await expect(canvas.getByText('Card description')).toBeInTheDocument();
    await expect(canvas.getByText('Slot content')).toBeInTheDocument();
    const badges = canvas.getAllByText('Badge');
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
export const PriorityOrder: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const activeSlot = canvas.getByText('Active Slot');
    await expect(activeSlot).toBeInTheDocument();
    const defaultSlot = canvas.getByText('Default Slot');
    await expect(defaultSlot).toBeInTheDocument();
    const children = canvas.getByText('Children');
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
export const WithComplexContent: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Default State')).toBeInTheDocument();
    await expect(canvas.getByText('Inactive')).toBeInTheDocument();
    const toggleButton = canvas.getByRole('button', {
      name: /activate/i,
    });
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText('Active State')).toBeInTheDocument();
        expect(canvas.getByText('Active')).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
    await expect(
      canvas.getByRole('button', {
        name: 'Action 1',
      })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('button', {
        name: 'Action 2',
      })
    ).toBeInTheDocument();
    const deactivateButton = canvas.getByRole('button', {
      name: /deactivate/i,
    });
    await userEvent.click(deactivateButton);
    await waitFor(
      () => {
        expect(canvas.getByText('Default State')).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
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
          {isActive ? 'Deactivate' : 'Activate'} Slot
        </Button>
      </div>
    );
  },
};
export const EmptyState: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const swapSlot = canvasElement.querySelector('.border-dashed');
    await expect(swapSlot).toBeInTheDocument();
    await expect(swapSlot).toHaveClass('border-dashed');
    await expect(swapSlot?.textContent).toBe('');
  },
  render: function EmptyStateStory() {
    return <SwapSlot className="w-100 h-20">{}</SwapSlot>;
  },
};
export const Playground: Story = {
  args: {
    className: 'w-100',
  },
  parameters: {
    order: 99,
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
