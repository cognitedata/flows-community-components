import { Button } from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconAlertTriangle, IconCheck, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Community/Alert Dialog',
  component: AlertDialog,
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
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  parameters: {
    order: 1,
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button>Open Dialog</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently affect your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(trigger);

    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();

    const title = within(dialog).getByRole('heading', {
      name: 'Are you sure?',
    });
    await expect(title).toBeInTheDocument();

    const cancelButton = within(dialog).getByRole('button', {
      name: /Cancel/i,
    });
    await userEvent.click(cancelButton);
  },
};

export const DestructiveAction: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            <IconTrash className="size-4" />
            Delete Account
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive-background text-destructive-foreground hover:bg-destructive-background/90">
            Yes, delete my account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const ExportData: Story = {
  parameters: {
    order: 3,
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button>Export</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Export all data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will export all your data to a CSV file. The process may take a
            few moments depending on the amount of data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Export</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithIcon: Story = {
  parameters: {
    order: 4,
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Confirm Action</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your action</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm that you want to proceed with this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <IconCheck className="size-4" />
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Warning: Story = {
  parameters: {
    order: 5,
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="outline">
            <IconAlertTriangle className="size-4" />
            Warning Action
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <IconAlertTriangle className="size-5 text-warning-foreground" />
            Warning
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action may have unintended consequences. Please review the
            details before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const InformationalSingleAction: Story = {
  parameters: {
    order: 6,
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Show Info</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Information</AlertDialogTitle>
          <AlertDialogDescription>
            This is an informational alert dialog. You can use it to display
            important information to users that requires acknowledgment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Controlled: Story = {
  parameters: {
    order: 7,
  },
  render: function ControlledAlertDialog() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Dialog
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Dialog is {open ? 'open' : 'closed'}
        </p>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This dialog&apos;s open state is controlled externally.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(openButton);

    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();

    const cancelButton = within(dialog).getByRole('button', {
      name: /Cancel/i,
    });
    await userEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  },
};

export const AsyncAction: Story = {
  parameters: {
    order: 8,
  },
  render: function AsyncAlertDialog() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleAction = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setOpen(false);
    };

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button>Save Changes</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your changes will be saved to the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const VisualRegression: Story = {
  parameters: {
    order: 9,
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => (
    <div className="flex gap-4">
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Visual Test Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This dialog is open by default for visual regression testing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    defaultOpen: false,
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button>Open Playground Dialog</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Playground Dialog</AlertDialogTitle>
          <AlertDialogDescription>
            Use the controls to experiment with different dialog configurations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
