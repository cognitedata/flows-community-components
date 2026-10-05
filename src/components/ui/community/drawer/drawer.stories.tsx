import { Button, Input, Label, Textarea } from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Community/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
      },
    },
    direction: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: '"top" | "bottom" | "left" | "right"',
        },
        defaultValue: {
          summary: 'bottom',
        },
      },
    },
    onOpenChange: {
      action: 'openChange',
      table: {
        category: 'Events',
        type: {
          summary: '(open: boolean) => void',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-full max-w-md">
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer description that provides context.
          </DrawerDescription>
        </DrawerHeader>
        <div className="h-20 border border-dashed w-full rounded-md" />
        <DrawerFooter className="w-full max-w-md">
          <Button>Continue</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /open drawer/i });
    await userEvent.click(trigger);

    await body.findByRole('dialog', { name: /drawer title/i });
  },
};

export const RightDrawer: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-full">
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>
            Manage your application settings.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 w-full my-6">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
        </div>
        <DrawerFooter className="w-full">
          <Button>Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /open right drawer/i });
    await userEvent.click(trigger);

    const dialog = await body.findByRole('dialog', { name: /settings/i });
    const closeButton = within(dialog).getByRole('button', { name: /close/i });
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(
        body.queryByRole('dialog', { name: /settings/i })
      ).not.toBeInTheDocument();
    });
  },
};

export const LeftDrawer: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-full">
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Quick access to all sections.</DrawerDescription>
        </DrawerHeader>
        <nav className="space-y-2 w-full">
          <a
            href="/dashboard"
            className="block p-2 rounded hover:bg-accent text-sm"
          >
            Dashboard
          </a>
          <a
            href="/projects"
            className="block p-2 rounded hover:bg-accent text-sm"
          >
            Projects
          </a>
          <a href="/team" className="block p-2 rounded hover:bg-accent text-sm">
            Team
          </a>
          <a
            href="/settings"
            className="block p-2 rounded hover:bg-accent text-sm"
          >
            Settings
          </a>
        </nav>
        <DrawerFooter className="w-full">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /open left drawer/i });
    await userEvent.click(trigger);

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(
        body.queryByRole('dialog', { name: /navigation/i })
      ).not.toBeInTheDocument();
    });
  },
};

export const TopDrawer: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>Open Top Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-full">
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You have 3 unread messages.</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-2 w-full">
          <div className="p-2 rounded bg-accent/50">
            <p className="text-sm font-medium">New message from John</p>
            <p className="text-xs text-muted-foreground">2 minutes ago</p>
          </div>
          <div className="p-2 rounded bg-accent/50">
            <p className="text-sm font-medium">Project update</p>
            <p className="text-xs text-muted-foreground">1 hour ago</p>
          </div>
        </div>
        <DrawerFooter className="w-full">
          <DrawerClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DrawerClose>
          <Button>View all</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /open top drawer/i });
    await userEvent.click(trigger);

    const dialog = await body.findByRole('dialog', { name: /notifications/i });
    const dismissButton = within(dialog).getByRole('button', {
      name: /dismiss/i,
    });
    await userEvent.click(dismissButton);

    await waitFor(() => {
      expect(
        body.queryByRole('dialog', { name: /notifications/i })
      ).not.toBeInTheDocument();
    });
  },
};

export const Controlled: Story = {
  render: function ControlledDrawer() {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Drawer</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Drawer
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Drawer is {open ? 'open' : 'closed'}
        </p>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader className="w-full">
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer&apos;s open state is controlled externally.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="w-full">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
  parameters: {
    order: 5,
  },
};

export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-full">
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Update your profile information.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 w-full mb-12">
          <div className="grid gap-1.5">
            <Label htmlFor="drawer-name">Full name</Label>
            <Input id="drawer-name" defaultValue="John Doe" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="drawer-email">Email</Label>
            <Input
              id="drawer-email"
              type="email"
              defaultValue="john@example.com"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="drawer-bio">Bio</Label>
            <Textarea id="drawer-bio" />
          </div>
        </div>
        <DrawerFooter className="w-full">
          <Button>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 6,
  },
};

export const WithScrollingContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Terms &amp; Conditions</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="w-full">
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerDescription>
            Please read and accept our terms.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto max-h-75 text-sm text-muted-foreground">
          {Array.from(
            {
              length: 10,
            },
            (_: unknown, i: number) => (
              <p key={`terms-${i}`} className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            )
          )}
        </div>
        <DrawerFooter className="w-full">
          <Button>Accept</Button>
          <DrawerClose asChild>
            <Button variant="outline">Decline</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 7,
  },
};

export const AsyncAction: Story = {
  render: function AsyncActionDrawer() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const handleSave = () => {
      setLoading(true);
      setSaved(false);
      setTimeout(() => {
        setLoading(false);
        setSaved(true);
        setOpen(false);
      }, 500);
    };
    return (
      <div className="space-y-4">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button onClick={() => setOpen(true)}>Open Async Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Async Save</DrawerTitle>
              <DrawerDescription>
                Simulates an asynchronous operation when saving changes.
              </DrawerDescription>
            </DrawerHeader>
            <div className=" space-y-2">
              <p className="text-sm text-muted-foreground">
                Change some settings, then click Save to trigger an async
                action.
              </p>
              <Input placeholder="Setting value" />
            </div>
            <DrawerFooter className="w-full">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {saved && (
          <p className="text-sm text-success-foreground">
            Changes saved successfully.
          </p>
        )}
      </div>
    );
  },
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const openButton = canvas.getByRole('button', {
      name: /open async drawer/i,
    });
    await userEvent.click(openButton);

    const dialog = await body.findByRole('dialog', { name: /async save/i });
    const saveButton = within(dialog).getByRole('button', { name: /^save$/i });
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(saveButton).toHaveTextContent('Saving...');
    });
    await waitFor(() => {
      expect(
        canvas.getByText(/changes saved successfully/i)
      ).toBeInTheDocument();
    });
  },
};

export const KeyboardInteractions: Story = {
  render: function KeyboardInteractionsDrawer() {
    const [open, setOpen] = useState(false);
    const [activated, setActivated] = useState(false);
    return (
      <div className="space-y-4">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>Open Keyboard Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Keyboard Drawer</DrawerTitle>
              <DrawerDescription>
                Use Tab to move focus, Enter/Space to activate, and Escape to
                close.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex gap-2 my-4 self-start">
              <Button variant="outline" onClick={() => setActivated(true)}>
                Keyboard Action
              </Button>
              <Button variant="ghost" onClick={() => setActivated(false)}>
                Reset
              </Button>
            </div>
            <DrawerFooter className="w-full">
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <p className="text-sm text-muted-foreground">
          Status: {activated ? 'Activated' : 'Inactive'}
        </p>
      </div>
    );
  },
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', {
      name: /open keyboard drawer/i,
    });
    trigger.focus();
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
    await userEvent.keyboard('{Enter}');

    const dialog = await body.findByRole('dialog', {
      name: /keyboard drawer/i,
    });
    const primaryButton = within(dialog).getByRole('button', {
      name: /keyboard action/i,
    });
    primaryButton.focus();
    await waitFor(() => {
      expect(primaryButton).toHaveFocus();
    });
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(canvas.getByText(/status: activated/i)).toBeInTheDocument();
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(
        body.queryByRole('dialog', { name: /keyboard drawer/i })
      ).not.toBeInTheDocument();
    });
  },
};

export const VisualRegression: Story = {
  render: () => (
    <div className="flex gap-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Bottom</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bottom Drawer</DrawerTitle>
            <DrawerDescription>
              Visual test for bottom drawer.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Right Drawer</DrawerTitle>
            <DrawerDescription>Visual test for right drawer.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
    direction: 'bottom',
  },
  render: (args: ComponentProps<typeof Drawer>) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open Playground Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Playground Drawer</DrawerTitle>
          <DrawerDescription>
            Use the controls to experiment with different drawer configurations.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Drawer content here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 99,
  },
};
