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

import { Button } from '@/components/ui/aura/button';
const meta: Meta<typeof AlertDialog> = {
  title: 'Primitives/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
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
    const trigger = canvas.getByRole('button', {
      name: /open dialog/i,
    });
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
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
            <IconAlertTriangle className="size-5 text-yellow-500" />
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
    const openButton = canvas.getByRole('button', {
      name: /open dialog/i,
    });
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
export const KeyboardNavigation: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /open dialog/i,
    });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    await userEvent.keyboard('{Tab}');
    const actionButton = within(dialog).getByRole('button', {
      name: /confirm/i,
    });
    const cancelButton = within(dialog).getByRole('button', {
      name: /cancel/i,
    });
    await waitFor(() => {
      expect([actionButton, cancelButton]).toContain(
        dialog.ownerDocument.activeElement
      );
    });
    await userEvent.keyboard('{Tab}');
    await waitFor(() => {
      const activeElement = dialog.ownerDocument.activeElement;
      expect(activeElement).not.toBeNull();
      expect(dialog.contains(activeElement)).toBe(true);
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
    await userEvent.click(trigger);
    const reopenedDialog = await screen.findByRole('alertdialog');
    const confirmButton = within(reopenedDialog).getByRole('button', {
      name: /confirm/i,
    });
    await userEvent.click(confirmButton);
    await waitFor(() => {
      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });
  },
  render: function KeyboardNavigationStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button>Open Dialog</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Keyboard Navigation Test</AlertDialogTitle>
            <AlertDialogDescription>
              Use Tab to navigate, ESC to close, or Enter to confirm. The dialog
              traps focus internally.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};
export const LongContent: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /open dialog/i,
    });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    await expect(
      within(dialog).getByRole('heading', {
        name: /This is a very long title/i,
      })
    ).toBeInTheDocument();
    await expect(
      within(dialog).getByText(/This is an extremely long description/i)
    ).toBeInTheDocument();
    await expect(dialog).toBeInTheDocument();
  },
  render: function LongContentStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button>Open Dialog</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This is a very long title that might wrap to multiple lines and
              test how the dialog handles overflow when the content exceeds the
              expected width
            </AlertDialogTitle>
            <AlertDialogDescription>
              This is an extremely long description that contains a lot of text
              to test how the alert dialog component handles content that
              extends beyond the typical length. The description should wrap
              properly and maintain readability. It should also ensure that the
              dialog remains accessible and usable even when the content is very
              lengthy. This tests the component&apos;s ability to handle edge
              cases where users might provide verbose messages or detailed
              explanations that require more space than usual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};
export const NoDescription: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /open dialog/i,
    });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    const title = within(dialog).getByRole('heading', {
      name: 'Are you sure?',
    });
    await expect(title).toBeInTheDocument();
    const description = dialog.querySelector(
      '[data-slot="alert-dialog-description"]'
    );
    await expect(description).not.toBeInTheDocument();
    const cancelButton = within(dialog).getByRole('button', {
      name: /Cancel/i,
    });
    await expect(cancelButton).toBeInTheDocument();
  },
  render: function NoDescriptionStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button>Open Dialog</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};
export const DisabledButtons: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', {
      name: /open dialog/i,
    });
    await userEvent.click(trigger);
    const dialog = await screen.findByRole('alertdialog');
    expect(dialog).toBeInTheDocument();
    const cancelButton = within(dialog).getByRole('button', {
      name: /Cancel/i,
    });
    await expect(cancelButton).toBeDisabled();
    const actionButton = within(dialog).getByRole('button', {
      name: /Save/i,
    });
    await expect(actionButton).toBeDisabled();
    await expect(cancelButton).toHaveAttribute('disabled');
    await expect(actionButton).toHaveAttribute('disabled');
  },
  render: function DisabledButtonsStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger render={<Button>Open Dialog</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              The buttons are disabled. This might happen during a loading state
              or when certain conditions aren&apos;t met.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled>Save</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
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
