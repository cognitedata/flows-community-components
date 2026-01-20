import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { IconBell, IconLock, IconSettings, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Controlled active tab value",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },
    defaultValue: {
      control: "text",
      description: "Default active tab value (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the tabs",
      table: {
        category: "Layout",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
      },
    },
    onValueChange: {
      action: "valueChange",
      description: "Callback when active tab changes",
      table: {
        category: "Events",
        type: { summary: "(value: string) => void" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
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
type Story = StoryObj<typeof Tabs>;

/**
 * Default tabs component.
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4">
        <p className="text-sm text-muted-foreground">Make changes to your account settings here.</p>
      </TabsContent>
      <TabsContent value="password" className="p-4">
        <p className="text-sm text-muted-foreground">Change your password and security settings.</p>
      </TabsContent>
      <TabsContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">Configure your application preferences.</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default tabs component with text-only triggers.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find tabs
    const accountTab = canvas.getByRole("tab", { name: /account/i });
    const passwordTab = canvas.getByRole("tab", { name: /password/i });

    // Verify first tab is selected
    await expect(accountTab).toHaveAttribute("data-state", "active");

    // Click second tab
    await userEvent.click(passwordTab);

    // Verify second tab is selected
    await expect(passwordTab).toHaveAttribute("data-state", "active");
    await expect(accountTab).toHaveAttribute("data-state", "inactive");
  },
};

/**
 * Tabs with icons.
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="profile">
      <TabsList>
        <TabsTrigger value="profile">
          <IconUser className="size-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <IconBell className="size-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security">
          <IconLock className="size-4" />
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="p-4">
        <p className="text-sm text-muted-foreground">Manage your profile information.</p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <p className="text-sm text-muted-foreground">Configure notification preferences.</p>
      </TabsContent>
      <TabsContent value="security" className="p-4">
        <p className="text-sm text-muted-foreground">Update security settings.</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with icons alongside text labels.",
      },
    },
  },
};

/**
 * Controlled tabs.
 */
export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
      <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">
            Content for Tab 1
          </TabsContent>
          <TabsContent value="tab2" className="p-4">
            Content for Tab 2
          </TabsContent>
          <TabsContent value="tab3" className="p-4">
            Content for Tab 3
          </TabsContent>
        </Tabs>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("tab1")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Go to Tab 1
          </button>
          <button
            onClick={() => setActiveTab("tab2")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Go to Tab 2
          </button>
          <button
            onClick={() => setActiveTab("tab3")}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Go to Tab 3
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Active tab: {activeTab}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Tabs with externally controlled state.",
      },
    },
  },
};

/**
 * Disabled tabs.
 */
export const DisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="enabled1">
      <TabsList>
        <TabsTrigger value="enabled1">Enabled</TabsTrigger>
        <TabsTrigger value="disabled1" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="enabled2">Also Enabled</TabsTrigger>
        <TabsTrigger value="disabled2" disabled>
          Also Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="enabled1" className="p-4">
        First enabled tab content.
      </TabsContent>
      <TabsContent value="enabled2" className="p-4">
        Second enabled tab content.
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with some triggers disabled.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledTab = canvas.getAllByRole("tab")[1];
    await expect(disabledTab).toBeDisabled();
  },
};

/**
 * Tabs with rich content.
 */
export const RichContent: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4 space-y-4">
        <h3 className="font-medium">Dashboard Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-md">
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
          <div className="p-4 border rounded-md">
            <p className="text-2xl font-bold">$12,345</p>
            <p className="text-sm text-muted-foreground">Revenue</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="p-4">
        <h3 className="font-medium">Analytics Dashboard</h3>
        <p className="text-sm text-muted-foreground mt-2">View detailed analytics and metrics.</p>
      </TabsContent>
      <TabsContent value="reports" className="p-4">
        <h3 className="font-medium">Reports</h3>
        <p className="text-sm text-muted-foreground mt-2">Generate and download reports.</p>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with rich content including cards and statistics.",
      },
    },
  },
};

/**
 * Full width tabs.
 */
export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">
          All
        </TabsTrigger>
        <TabsTrigger value="active" className="flex-1">
          Active
        </TabsTrigger>
        <TabsTrigger value="archived" className="flex-1">
          Archived
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="p-4">
        Showing all items.
      </TabsContent>
      <TabsContent value="active" className="p-4">
        Showing active items only.
      </TabsContent>
      <TabsContent value="archived" className="p-4">
        Showing archived items.
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with full-width trigger buttons.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Basic tabs */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Active Tab</TabsTrigger>
            <TabsTrigger value="tab2">Inactive Tab</TabsTrigger>
            <TabsTrigger value="tab3" disabled>
              Disabled
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="p-4">
            Tab content here.
          </TabsContent>
        </Tabs>
      </div>

      {/* With icons */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <Tabs defaultValue="settings">
          <TabsList>
            <TabsTrigger value="user">
              <IconUser className="size-4" />
              User
            </TabsTrigger>
            <TabsTrigger value="settings">
              <IconSettings className="size-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="p-4">
            Settings content.
          </TabsContent>
        </Tabs>
      </div>

      {/* Full width */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Full Width</h3>
        <Tabs defaultValue="first">
          <TabsList className="w-full">
            <TabsTrigger value="first" className="flex-1">
              First
            </TabsTrigger>
            <TabsTrigger value="second" className="flex-1">
              Second
            </TabsTrigger>
            <TabsTrigger value="third" className="flex-1">
              Third
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    defaultValue: "tab1",
    orientation: "horizontal",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">First Tab</TabsTrigger>
        <TabsTrigger value="tab2">Second Tab</TabsTrigger>
        <TabsTrigger value="tab3">Third Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">
        Content for the first tab.
      </TabsContent>
      <TabsContent value="tab2" className="p-4">
        Content for the second tab.
      </TabsContent>
      <TabsContent value="tab3" className="p-4">
        Content for the third tab.
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with tabs props.",
      },
    },
  },
};
