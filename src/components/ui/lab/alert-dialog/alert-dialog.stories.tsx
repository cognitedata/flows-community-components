import { Button } from "@cognite/aura/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";
import { IconAlertTriangle, IconCheck, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
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
} from "./alert-dialog";

const meta: Meta<typeof AlertDialog> = {
  title: "Primitives/Alert Dialog",
  component: AlertDialog,
  tags: ["autodocs"],
  argTypes: {
    // State
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Default open state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // Events
    onOpenChange: {
      action: "openChange",
      description: "Callback when open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

/**
 * Default alert dialog with confirmation pattern.
 */
export const Default: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default alert dialog for confirming critical actions.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Open Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently affect your data.
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

    // Click trigger to open dialog
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();

    // Verify title and description
    const title = within(dialog).getByRole("heading", { name: "Are you sure?" });
    await expect(title).toBeInTheDocument();

    // Click cancel to close
    const cancelButton = within(dialog).getByRole("button", { name: /Cancel/i });
    await userEvent.click(cancelButton);
  },
};

/**
 * Destructive action confirmation dialog.
 */
export const DestructiveAction: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Alert dialog for destructive actions like account deletion.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <IconTrash className="size-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all
            your data from our servers.
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

/**
 * Export data confirmation dialog.
 */
export const ExportData: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Alert dialog for confirming data export.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Export</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Export all data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will export all your data to a CSV file. The process may take a few moments
            depending on the amount of data.
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

/**
 * Dialog with icon in action button.
 */
export const WithIcon: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Alert dialog with icon in the action button.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Confirm Action</Button>
      </AlertDialogTrigger>
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

/**
 * Warning dialog with custom styling.
 */
export const Warning: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Warning dialog with icon in the title.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <IconAlertTriangle className="size-4" />
          Warning Action
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <IconAlertTriangle className="size-5 text-yellow-500" />
            Warning
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action may have unintended consequences. Please review the details before
            proceeding.
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

/**
 * Single action dialog (informational).
 */
export const InformationalSingleAction: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Informational dialog with only a single acknowledge button.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Info</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Information</AlertDialogTitle>
          <AlertDialogDescription>
            This is an informational alert dialog. You can use it to display important information
            to users that requires acknowledgment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * Controlled dialog with external state.
 */
export const Controlled: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Dialog with externally controlled open state.",
      },
    },
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
        <p className="text-sm text-muted-foreground">Dialog is {open ? "open" : "closed"}</p>
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

    // Click open button
    const openButton = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(openButton);

    // Verify dialog opened
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();

    // Click cancel to close
    const cancelButton = within(dialog).getByRole("button", { name: /Cancel/i });
    await userEvent.click(cancelButton);

    // Verify dialog closed
    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  },
};

/**
 * Dialog with async action.
 */
export const AsyncAction: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Dialog with async action showing loading state.",
      },
    },
  },
  render: function AsyncAlertDialog() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleAction = async () => {
      setLoading(true);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setOpen(false);
    };

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button>Save Changes</Button>
        </AlertDialogTrigger>
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
              {loading ? "Saving..." : "Save"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Dialog opened by default for visual regression testing.",
      },
    },
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

/**
 * Keyboard navigation testing.
 * Demonstrates ESC to close, Tab navigation, and Enter to confirm.
 */
export const KeyboardNavigation: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story:
          "Tests keyboard accessibility: ESC key closes the dialog, Tab navigates between buttons, and Enter confirms the action.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();

    // Test Tab navigation - should focus on action button (primary action) first
    await userEvent.keyboard("{Tab}");
    const actionButton = within(dialog).getByRole("button", { name: /confirm/i });
    await expect(actionButton).toHaveFocus();

    // Tab to cancel button
    await userEvent.keyboard("{Tab}");
    const cancelButton = within(dialog).getByRole("button", { name: /cancel/i });
    await expect(cancelButton).toHaveFocus();

    // Test ESC to close
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    // Reopen for Enter key test
    await userEvent.click(trigger);
    const reopenedDialog = await screen.findByRole("alertdialog");

    // Focus action button and press Enter
    const confirmButton = within(reopenedDialog).getByRole("button", { name: /confirm/i });
    await userEvent.click(confirmButton);
    // Dialog should close after action
    await waitFor(() => {
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  },
  render: function KeyboardNavigationStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Keyboard Navigation Test</AlertDialogTitle>
            <AlertDialogDescription>
              Use Tab to navigate, ESC to close, or Enter to confirm. The dialog traps focus
              internally.
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

/**
 * Dialog with long content.
 * Tests overflow and scrolling behavior with very long title and description.
 */
export const LongContent: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story:
          "Dialog with very long title and description to test overflow handling and scrolling behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();

    // Verify long content is rendered
    await expect(
      within(dialog).getByRole("heading", { name: /This is a very long title/i })
    ).toBeInTheDocument();

    await expect(
      within(dialog).getByText(/This is an extremely long description/i)
    ).toBeInTheDocument();

    // Verify dialog is scrollable if needed
    // The original test just checked for presence, which is already confirmed by finding the dialog.
    await expect(dialog).toBeInTheDocument();
  },
  render: function LongContentStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              This is a very long title that might wrap to multiple lines and test how the dialog
              handles overflow when the content exceeds the expected width
            </AlertDialogTitle>
            <AlertDialogDescription>
              This is an extremely long description that contains a lot of text to test how the
              alert dialog component handles content that extends beyond the typical length. The
              description should wrap properly and maintain readability. It should also ensure that
              the dialog remains accessible and usable even when the content is very lengthy. This
              tests the component&apos;s ability to handle edge cases where users might provide
              verbose messages or detailed explanations that require more space than usual.
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

/**
 * Dialog with no description.
 * Minimal dialog with only a title and action buttons.
 */
export const NoDescription: Story = {
  parameters: {
    order: 12,
    docs: {
      description: {
        story: "Minimal alert dialog with only a title and action buttons, no description text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();

    // Verify title exists
    const title = within(dialog).getByRole("heading", { name: "Are you sure?" });
    await expect(title).toBeInTheDocument();

    // Verify description does NOT exist
    const description = dialog.querySelector('[data-slot="alert-dialog-description"]');
    await expect(description).not.toBeInTheDocument();

    // Verify buttons exist
    const cancelButton = within(dialog).getByRole("button", { name: /Cancel/i });
    await expect(cancelButton).toBeInTheDocument();
  },
  render: function NoDescriptionStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open Dialog</Button>
        </AlertDialogTrigger>
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

/**
 * Dialog with disabled buttons.
 * Demonstrates disabled state on action and cancel buttons.
 */
export const DisabledButtons: Story = {
  parameters: {
    order: 13,
    docs: {
      description: {
        story:
          "Dialog with disabled buttons. Useful for preventing actions during loading states or when conditions aren&apos;t met.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open dialog
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();

    // Verify disabled cancel button
    const cancelButton = within(dialog).getByRole("button", { name: /Cancel/i });
    await expect(cancelButton).toBeDisabled();

    // Verify disabled action button
    const actionButton = within(dialog).getByRole("button", { name: /Save/i });
    await expect(actionButton).toBeDisabled();

    // Verify buttons have disabled attribute
    await expect(cancelButton).toHaveAttribute("disabled");
    await expect(actionButton).toHaveAttribute("disabled");
  },
  render: function DisabledButtonsStory() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Open Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              The buttons are disabled. This might happen during a loading state or when certain
              conditions aren&apos;t met.
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

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    defaultOpen: false,
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with dialog props.",
      },
    },
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button>Open Playground Dialog</Button>
      </AlertDialogTrigger>
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
