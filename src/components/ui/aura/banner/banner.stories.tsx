import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCheck,
  IconCopy,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  Banner,
  BannerAction,
  BannerActions,
  BannerClose,
  BannerIcon,
  BannerStatus,
  BannerTitle,
} from "./banner";
const meta: Meta<typeof Banner> = {
  title: "Primitives/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "neutral", "destructive", "warning"],
      table: {
        category: "Display",
        type: {
          summary: '"default" | "neutral" | "destructive" | "warning"',
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    inset: {
      control: "boolean",
      table: {
        category: "Display",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Display",
      },
    },
    visible: {
      control: "boolean",
      table: {
        category: "State",
        type: {
          summary: "boolean",
        },
      },
    },
    defaultVisible: {
      control: "boolean",
      table: {
        category: "State",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
    onClose: {
      action: "closed",
      table: {
        category: "Events",
        type: {
          summary: "() => void",
        },
      },
    },
    children: {
      control: false,
      table: {
        category: "Internal",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Banner>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Banner title")).toBeInTheDocument();
    const banner = canvasElement.querySelector('[class*="bg-mountain"]');
    await expect(banner).toBeInTheDocument();
    const actionButton = canvas.getByRole("button", {
      name: /action/i,
    });
    await expect(actionButton).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Banner title</BannerTitle>
        <BannerActions>
          <BannerAction>Action</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const Variants: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Default variant")).toBeInTheDocument();
    await expect(canvas.getByText("Neutral variant")).toBeInTheDocument();
    await expect(canvas.getByText("Destructive variant")).toBeInTheDocument();
    await expect(canvas.getByText("Warning variant")).toBeInTheDocument();
    const banners = canvasElement.querySelectorAll('[class*="bg-"]');
    await expect(banners.length).toBeGreaterThanOrEqual(4);
  },
  render: () => (
    <div className="w-100 space-y-4">
      <Banner variant="default">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Default variant</BannerTitle>
      </Banner>
      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Neutral variant</BannerTitle>
      </Banner>
      <Banner variant="destructive">
        <BannerIcon icon={IconAlertCircle} />
        <BannerTitle>Destructive variant</BannerTitle>
      </Banner>
      <Banner variant="warning">
        <BannerIcon icon={IconAlertTriangle} />
        <BannerTitle>Warning variant</BannerTitle>
      </Banner>
    </div>
  ),
};
export const WithStatus: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Workflow has been published")).toBeInTheDocument();
    await expect(canvas.getByText("Published")).toBeInTheDocument();
    const actionButton = canvas.getByRole("button", {
      name: /request review/i,
    });
    await expect(actionButton).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Workflow has been published</BannerTitle>
        <BannerStatus>Published</BannerStatus>
        <BannerActions>
          <BannerAction>Request review</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const MultipleActions: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const duplicateButton = canvas.getByRole("button", {
      name: /duplicate/i,
    });
    const editButton = canvas.getByRole("button", {
      name: /edit/i,
    });
    await expect(duplicateButton).toBeInTheDocument();
    await expect(editButton).toBeInTheDocument();
    await userEvent.click(duplicateButton);
  },
  render: () => (
    <div className="w-100">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Read only. Duplicate to make changes.</BannerTitle>
        <BannerActions>
          <BannerAction>
            <IconCopy size={16} />
            <span>Duplicate</span>
          </BannerAction>
          <BannerAction>Edit</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const Dismissible: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bannerTitle = canvas.getByText("This banner can be dismissed");
    await expect(bannerTitle).toBeInTheDocument();
    const closeButton = canvas.getByRole("button", {
      name: "Close banner",
    });
    await expect(closeButton).toBeInTheDocument();
    const actionButton = canvas.getByRole("button", {
      name: /learn more/i,
    });
    await expect(actionButton).toBeInTheDocument();
  },
  render: function DismissibleStory() {
    return (
      <div className="w-100">
        <Banner>
          <BannerIcon icon={IconInfoCircle} />
          <BannerTitle>This banner can be dismissed</BannerTitle>
          <BannerActions>
            <BannerAction>Learn more</BannerAction>
            <BannerClose />
          </BannerActions>
        </Banner>
      </div>
    );
  },
};
export const ControlledVisibility: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Controlled visibility banner")).toBeInTheDocument();
    const toggleButton = canvas.getByRole("button", {
      name: /toggle banner/i,
    });
    await expect(toggleButton).toBeInTheDocument();
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.queryByText("Controlled visibility banner")).not.toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText("Controlled visibility banner")).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
  },
  render: function ControlledVisibilityStory() {
    const [visible, setVisible] = useState(true);
    return (
      <div className="space-y-4">
        <Banner visible={visible} onClose={() => setVisible(false)}>
          <BannerIcon icon={IconInfoCircle} />
          <BannerTitle>Controlled visibility banner</BannerTitle>
          <BannerActions>
            <BannerClose />
          </BannerActions>
        </Banner>
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="px-4 py-2 bg-accent text-accent-foreground rounded"
        >
          Toggle Banner
        </button>
      </div>
    );
  },
};
export const Inset: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Inset banner")).toBeInTheDocument();
    const banner = canvasElement.querySelector('[class*="rounded-lg"]');
    await expect(banner).toBeInTheDocument();
  },
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <Banner inset>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Inset banner</BannerTitle>
        <BannerActions>
          <BannerAction>Action</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const ReadOnlyWarning: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Read only. Duplicate to make changes.")).toBeInTheDocument();
    const duplicateButton = canvas.getByRole("button", {
      name: /duplicate/i,
    });
    await expect(duplicateButton).toBeInTheDocument();
    await userEvent.click(duplicateButton);
  },
  render: () => (
    <div className="w-100">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Read only. Duplicate to make changes.</BannerTitle>
        <BannerActions>
          <BannerAction>
            <IconCopy size={16} />
            <span>Duplicate</span>
          </BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const SuccessNotification: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Workflow has been published")).toBeInTheDocument();
    await expect(canvas.getByText("Published")).toBeInTheDocument();
    const reviewButton = canvas.getByRole("button", {
      name: /request review/i,
    });
    await expect(reviewButton).toBeInTheDocument();
  },
  render: function SuccessNotificationStory() {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="px-4 py-2 bg-accent text-accent-foreground rounded"
        >
          Show Banner
        </button>
      );
    }
    return (
      <Banner variant="neutral" visible={visible}>
        <BannerIcon icon={IconCheck} />
        <BannerTitle>Workflow has been published</BannerTitle>
        <BannerStatus>Published</BannerStatus>
        <BannerActions>
          <BannerAction>Request review</BannerAction>
          <BannerClose />
        </BannerActions>
      </Banner>
    );
  },
};
export const ErrorNotification: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Failed to save changes")).toBeInTheDocument();
    const retryButton = canvas.getByRole("button", {
      name: /retry/i,
    });
    await expect(retryButton).toBeInTheDocument();
    await userEvent.click(retryButton);
  },
  render: () => (
    <div className="w-100">
      <Banner variant="destructive">
        <BannerIcon icon={IconAlertCircle} />
        <BannerTitle>Failed to save changes</BannerTitle>
        <BannerActions>
          <BannerAction>Retry</BannerAction>
          <BannerClose />
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const WarningNotification: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Your trial expires in 3 days")).toBeInTheDocument();
    const upgradeButton = canvas.getByRole("button", {
      name: /upgrade/i,
    });
    await expect(upgradeButton).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <Banner variant="warning">
        <BannerIcon icon={IconAlertTriangle} />
        <BannerTitle>Your trial expires in 3 days</BannerTitle>
        <BannerActions>
          <BannerAction>Upgrade now</BannerAction>
          <BannerClose />
        </BannerActions>
      </Banner>
    </div>
  ),
};
export const Playground: Story = {
  args: {
    variant: "default",
    inset: false,
    defaultVisible: true,
    className: "w-100",
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon icon={IconInfoCircle} />
      <BannerTitle>Customize this banner using the controls</BannerTitle>
      <BannerActions>
        <BannerAction>Action</BannerAction>
        <BannerClose />
      </BannerActions>
    </Banner>
  ),
};
