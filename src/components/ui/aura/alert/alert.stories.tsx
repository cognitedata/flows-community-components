import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useState } from "react";
import { Alert, AlertTitle, AlertDescription, AlertActions, AlertButton } from "./alert";
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertHexagon,
  IconUser,
  IconCheck,
  IconBell,
} from "@tabler/icons-react";

const meta: Meta<typeof Alert> = {
  title: "Primitives/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    // Appearance
    variant: {
      control: "select",
      options: ["default", "secondary", "warning", "error"],
      description: "The visual style variant of the alert",
      table: {
        category: "Appearance",
        type: { summary: '"default" | "secondary" | "warning" | "error"' },
        defaultValue: { summary: "default" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },

    // State
    visible: {
      control: "boolean",
      description: "Controlled visibility state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultVisible: {
      control: "boolean",
      description: "Default visibility state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },

    // Events
    onClose: {
      action: "closed",
      description: "Callback fired when alert is closed",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

/**
 * Default alert with title, description, and action button.
 */
export const Default: Story = {
  render: () => (
    <Alert>
      <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Account verification required</AlertTitle>
      <AlertDescription>
        Please check your email and click the verification link to activate your account.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Verify account</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default alert style with informational content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert is rendered
    const alert = canvasElement.querySelector('[data-slot="alert"]');
    await expect(alert).toBeInTheDocument();

    // Verify title and description
    const title = canvas.getByText("Account verification required");
    await expect(title).toBeInTheDocument();

    // Verify action button
    const button = canvas.getByRole("button", { name: /verify account/i });
    await expect(button).toBeInTheDocument();
  },
};

/**
 * Dismissible alert with close button.
 */
export const Dismissible: Story = {
  render: function DismissibleAlert() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          onClick={() => setVisible(true)}
          className="px-4 py-2 text-sm border rounded-md hover:bg-accent"
        >
          Show Alert Again
        </button>
      );
    }

    return (
      <Alert onClose={() => setVisible(false)}>
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>Click the X button to dismiss this alert.</AlertDescription>
      </Alert>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with a close button. Provide onClose prop to show the close button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find close button
    const closeButton = canvas.getByRole("button", { name: /close/i });
    await expect(closeButton).toBeInTheDocument();

    // Click close button
    await userEvent.click(closeButton);

    // Verify alert is dismissed
    await waitFor(() => {
      const alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).not.toBeInTheDocument();
    });

    // Click show again button
    const showButton = canvas.getByText("Show Alert Again");
    await userEvent.click(showButton);

    // Verify alert is visible again
    await waitFor(() => {
      const alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).toBeInTheDocument();
    });
  },
};

/**
 * Secondary variant for less urgent information.
 */
export const Secondary: Story = {
  render: () => (
    <Alert variant="secondary">
      <IconUser className="w-3.5 h-3.5 mt-0.5" />
      <AlertDescription>
        Changes will not be saved until you click &apos;Update&apos;.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Update</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Secondary variant for less prominent notifications.",
      },
    },
  },
};

/**
 * Warning variant for cautionary messages.
 */
export const Warning: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Storage almost full</AlertTitle>
      <AlertDescription>
        You&apos;re using 90% of your available storage. Consider upgrading your plan.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Upgrade plan</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Warning variant for cautionary messages that need attention.",
      },
    },
  },
};

/**
 * Error variant for critical messages.
 */
export const Error: Story = {
  render: () => (
    <Alert variant="error">
      <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Unable to connect data</AlertTitle>
      <AlertDescription>Verify you have the correct ID and try again.</AlertDescription>
      <AlertActions>
        <AlertButton className="text-card-foreground -ml-2.25">Try again</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Error variant for critical issues that need immediate attention.",
      },
    },
  },
};

/**
 * All alert variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is the default alert style.</AlertDescription>
      </Alert>
      <Alert variant="secondary">
        <IconUser className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Secondary Alert</AlertTitle>
        <AlertDescription>This is the secondary alert style.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is the warning alert style.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>This is the error alert style.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available alert variants for comparison.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const alerts = canvasElement.querySelectorAll('[data-slot="alert"]');
    await expect(alerts).toHaveLength(4);
  },
};

/**
 * Alert without title (description only).
 */
export const DescriptionOnly: Story = {
  render: () => (
    <Alert variant="secondary">
      <IconBell className="w-3.5 h-3.5 mt-0.5" />
      <AlertDescription>You have 3 new notifications waiting for you.</AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert can be used with just a description when a title is not needed.",
      },
    },
  },
};

/**
 * Success-style alert using default variant with check icon.
 */
export const Success: Story = {
  render: () => (
    <Alert>
      <IconCheck className="w-3.5 h-3.5 mt-0.5 text-green-600" />
      <AlertTitle>Changes saved successfully</AlertTitle>
      <AlertDescription>
        Your profile has been updated and the changes are now live.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Success-style alert using the default variant with a green check icon.",
      },
    },
  },
};

/**
 * Alert with multiple action buttons.
 */
export const MultipleActions: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Session expiring soon</AlertTitle>
      <AlertDescription>
        Your session will expire in 5 minutes. Would you like to extend it?
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Extend session</AlertButton>
        <AlertButton>Log out</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert with multiple action buttons for user choice.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both action buttons are present
    const extendButton = canvas.getByRole("button", { name: /extend session/i });
    const logoutButton = canvas.getByRole("button", { name: /log out/i });

    await expect(extendButton).toBeInTheDocument();
    await expect(logoutButton).toBeInTheDocument();
  },
};

/**
 * Controlled visibility example.
 */
export const ControlledVisibility: Story = {
  render: function ControlledAlert() {
    const [visible, setVisible] = useState(true);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setVisible(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Show
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Hide
          </button>
        </div>
        <Alert visible={visible} onClose={() => setVisible(false)}>
          <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Controlled Alert</AlertTitle>
          <AlertDescription>
            This alert&apos;s visibility is controlled externally.
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground">Visible: {visible ? "true" : "false"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alert visibility can be controlled externally using the visible prop.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert is visible initially
    let alert = canvasElement.querySelector('[data-slot="alert"]');
    await expect(alert).toBeInTheDocument();

    // Click hide button
    const hideButton = canvas.getByText("Hide");
    await userEvent.click(hideButton);

    // Verify alert is hidden
    await waitFor(() => {
      alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).not.toBeInTheDocument();
    });

    // Click show button
    const showButton = canvas.getByText("Show");
    await userEvent.click(showButton);

    // Verify alert is visible again
    await waitFor(() => {
      alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).toBeInTheDocument();
    });
  },
};

/**
 * Visual regression testing - comprehensive overview.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4 w-[450px]">
      {/* All variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">All Variants</h3>
        <Alert>
          <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>Default alert variant.</AlertDescription>
        </Alert>
        <Alert variant="secondary">
          <IconUser className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Secondary</AlertTitle>
          <AlertDescription>Secondary alert variant.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Warning alert variant.</AlertDescription>
        </Alert>
        <Alert variant="error">
          <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error alert variant.</AlertDescription>
        </Alert>
      </div>

      {/* With actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Actions</h3>
        <Alert onClose={() => {}}>
          <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>With Close and Action</AlertTitle>
          <AlertDescription>Alert with close button and action.</AlertDescription>
          <AlertActions>
            <AlertButton className="-ml-2.25">Action</AlertButton>
          </AlertActions>
        </Alert>
      </div>

      {/* Description only */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Description Only</h3>
        <Alert variant="secondary">
          <IconBell className="w-3.5 h-3.5 mt-0.5" />
          <AlertDescription>Alert with description only, no title.</AlertDescription>
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    variant: "default",
    defaultVisible: true,
  },
  render: (args) => (
    <Alert {...args} onClose={() => {}}>
      <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Playground Alert</AlertTitle>
      <AlertDescription>
        Use the controls to experiment with different alert configurations.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Action</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with alert props.",
      },
    },
  },
};
