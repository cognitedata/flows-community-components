import { Button } from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

type SheetStoryArgs = ComponentProps<typeof Sheet> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
};

const meta: Meta<SheetStoryArgs> = {
  title: 'Community/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      table: {
        category: 'Variants',
        type: { summary: '"top" | "right" | "bottom" | "left"' },
        defaultValue: { summary: 'right' },
      },
    },
    onOpenChange: {
      action: 'openChange',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<SheetStoryArgs>;

export const Default: Story = {
  parameters: {
    order: 1,
  },
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button>Open Sheet</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Sheet content can hold forms, navigation, or supporting context.
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('button', {
        name: /open sheet/i,
      })
    );

    const dialog = await screen.findByRole('dialog');
    await expect(
      within(dialog).getByRole('heading', {
        name: /edit profile/i,
      })
    ).toBeInTheDocument();
  },
};

export const LeftSide: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button>Open Filters</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Adjust the visible data using the controls in this side sheet.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          Add facets, toggles, or saved views here.
        </div>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole('button', {
        name: /open filters/i,
      })
    );

    const dialog = await screen.findByRole('dialog');
    const closeButton = within(dialog).getByRole('button', {
      name: /close/i,
    });
    await expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  },
};

export const Playground: Story = {
  args: {
    defaultOpen: false,
    modal: true,
    side: 'right',
  },
  parameters: {
    order: 99,
  },
  render: ({ side = 'right', ...args }) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button>Open Playground Sheet</Button>} />
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Playground Sheet</SheetTitle>
          <SheetDescription>
            Use the controls to experiment with different sheet configurations.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          This story keeps the root args configurable while exposing the sheet
          side as a separate control.
        </div>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Apply</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
