import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconBell,
  IconCheck,
  IconInfoCircle,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Alert, AlertActions, AlertButton, AlertDescription, AlertTitle } from "#aura/components/ui/aura/alert";

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
      <div className="w-100">
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
export const Basic: Story = {
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
    order: 1,
    docs: {
      description: {
        story: "Default alert style with informational content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvasElement.querySelector('[data-slot="alert"]');
    await expect(alert).toBeInTheDocument();
    const title = canvas.getByText("Account verification required");
    await expect(title).toBeInTheDocument();
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
          type="button"
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
    order: 2,
    docs: {
      description: {
        story: "Alert with a close button. Provide onClose prop to show the close button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButton = canvas.getByRole("button", { name: /close/i });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await waitFor(() => {
      const alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).not.toBeInTheDocument();
    });
    const showButton = canvas.getByText("Show Alert Again");
    await userEvent.click(showButton);
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
    order: 3,
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
    order: 4,
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
export const ErrorAlert: Story = {
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
    docs: {
      description: {
        story: "Alert with multiple action buttons for user choice.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
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
            type="button"
            onClick={() => setVisible(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Show
          </button>
          <button
            type="button"
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
    order: 10,
    docs: {
      description: {
        story: "Alert visibility can be controlled externally using the visible prop.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let alert = canvasElement.querySelector('[data-slot="alert"]');
    await expect(alert).toBeInTheDocument();
    const hideButton = canvas.getByText("Hide");
    await userEvent.click(hideButton);
    await waitFor(() => {
      alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).not.toBeInTheDocument();
    });
    const showButton = canvas.getByText("Show");
    await userEvent.click(showButton);
    await waitFor(() => {
      alert = canvasElement.querySelector('[data-slot="alert"]');
      expect(alert).toBeInTheDocument();
    });
  },
};

/**
 * Edge case: very long title and description to verify wrapping and layout.
 */
export const EdgeCaseLongText: Story = {
  render: () => (
    <Alert>
      <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>
        This is an unusually long alert title that may wrap onto multiple lines when the
        container width is constrained to ensure the layout remains readable and intact
      </AlertTitle>
      <AlertDescription>
        This is an unusually long description to test how the alert handles lengthy
        content. It should wrap gracefully within the alert bounds without overflowing or
        breaking the grid. We include several sentences to simulate real-world
        notifications that might contain detailed instructions or explanations for the
        user to read and act upon.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Accept and continue</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 12,
    docs: {
      description: {
        story: "Long title and description to verify wrapping and layout stability.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/This is an unusually long alert title/)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(/This is an unusually long description to test/)
    ).toBeInTheDocument();
  },
};

/**
 * Edge case: title and description with special characters (quotes, unicode, symbols).
 */
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Don&apos;t forget: &quot;Back up&quot; &amp; restore</AlertTitle>
      <AlertDescription>
        Paths like C:\Users\file.txt, 日本語, and symbols © ® ™ should render correctly.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Got it</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 13,
    docs: {
      description: {
        story:
          "Alert with special characters: quotes, apostrophes, unicode, and symbols.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Don't forget: "Back up" & restore/)
    ).toBeInTheDocument();
    await expect(canvas.getByText(/Paths like/)).toBeInTheDocument();
    await expect(canvas.getByText(/日本語/)).toBeInTheDocument();
  },
};

/**
 * Accessibility: role="alert", close button label, and keyboard interaction.
 */
export const Accessibility: Story = {
  render: function AccessibilityAlert() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          type="button"
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
        <AlertTitle>Accessible alert</AlertTitle>
        <AlertDescription>
          This alert has role=&quot;alert&quot;, a close button with &quot;Close&quot;
          screen reader text, and can be dismissed via keyboard.
        </AlertDescription>
      </Alert>
    );
  },
  parameters: {
    order: 14,
    docs: {
      description: {
        story:
          "Demonstrates accessible alert: role=alert, labeled close button, keyboard support.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alertRegion = canvas.getByRole("alert");
    await expect(alertRegion).toBeInTheDocument();
    const closeButton = canvas.getByRole("button", { name: /close/i });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(canvasElement.querySelector('[data-slot="alert"]')).not.toBeInTheDocument();
    });
  },
};

/**
 * Visual regression testing - comprehensive overview.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4 w-100">
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
    order: 15,
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
  render: () => (
    <Alert variant="default" defaultVisible={true} onClose={() => {}}>
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
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with alert props.",
      },
    },
  },
};
