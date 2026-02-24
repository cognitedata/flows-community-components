import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBell,
  IconLock,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Button } from '../button';

import {
  SegmentedControl,
  SegmentedControlContent,
  SegmentedControlList,
  SegmentedControlTrigger,
} from './segmented-control';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Primitives/Segmented Control',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: {
          summary: 'string',
        },
      },
    },
    defaultValue: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: {
          summary: 'string',
        },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: '"horizontal" | "vertical"',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    onValueChange: {
      action: 'valueChange',
      table: {
        category: 'Events',
        type: {
          summary: '(value: string) => void',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;
export const Default: Story = {
  parameters: {
    order: 1,
  },
  render: () => (
    <SegmentedControl defaultValue="account">
      <SegmentedControlList>
        <SegmentedControlTrigger value="account">
          Account
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="password">
          Password
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="settings">
          Settings
        </SegmentedControlTrigger>
      </SegmentedControlList>
      <SegmentedControlContent value="account" className="p-4">
        <p className="text-sm text-muted-foreground">
          Make changes to your account settings here.
        </p>
      </SegmentedControlContent>
      <SegmentedControlContent value="password" className="p-4">
        <p className="text-sm text-muted-foreground">
          Change your password and security settings.
        </p>
      </SegmentedControlContent>
      <SegmentedControlContent value="settings" className="p-4">
        <p className="text-sm text-muted-foreground">
          Configure your application preferences.
        </p>
      </SegmentedControlContent>
    </SegmentedControl>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const accountTab = canvas.getByRole('tab', {
      name: /account/i,
    });
    const passwordTab = canvas.getByRole('tab', {
      name: /password/i,
    });
    await expect(accountTab).toHaveAttribute('aria-selected', 'true');
    await expect(
      canvas.getByText('Make changes to your account settings here.')
    ).toBeVisible();
    await userEvent.click(passwordTab);
    await expect(passwordTab).toHaveAttribute('aria-selected', 'true');
    await expect(accountTab).toHaveAttribute('aria-selected', 'false');
    await expect(
      canvas.getByText('Change your password and security settings.')
    ).toBeVisible();
  },
};
export const WithIcons: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <SegmentedControl defaultValue="profile">
      <SegmentedControlList>
        <SegmentedControlTrigger value="profile">
          <IconUser className="size-4" />
          Profile
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="notifications">
          <IconBell className="size-4" />
          Notifications
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="security">
          <IconLock className="size-4" />
          Security
        </SegmentedControlTrigger>
      </SegmentedControlList>
      <SegmentedControlContent value="profile" className="p-4">
        <p className="text-sm text-muted-foreground">
          Manage your profile information.
        </p>
      </SegmentedControlContent>
      <SegmentedControlContent value="notifications" className="p-4">
        <p className="text-sm text-muted-foreground">
          Configure notification preferences.
        </p>
      </SegmentedControlContent>
      <SegmentedControlContent value="security" className="p-4">
        <p className="text-sm text-muted-foreground">
          Update security settings.
        </p>
      </SegmentedControlContent>
    </SegmentedControl>
  ),
};
export const Controlled: Story = {
  parameters: {
    order: 3,
  },
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = useState('tab1');
    return (
      <div className="space-y-4">
        <SegmentedControl value={activeTab} onValueChange={setActiveTab}>
          <SegmentedControlList>
            <SegmentedControlTrigger value="tab1">
              Tab 1
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="tab2">
              Tab 2
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="tab3">
              Tab 3
            </SegmentedControlTrigger>
          </SegmentedControlList>
          <SegmentedControlContent value="tab1" className="p-4">
            Content for Tab 1
          </SegmentedControlContent>
          <SegmentedControlContent value="tab2" className="p-4">
            Content for Tab 2
          </SegmentedControlContent>
          <SegmentedControlContent value="tab3" className="p-4">
            Content for Tab 3
          </SegmentedControlContent>
        </SegmentedControl>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('tab1')}
          >
            Go to Tab 1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('tab2')}
          >
            Go to Tab 2
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('tab3')}
          >
            Go to Tab 3
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Active tab: {activeTab}</p>
      </div>
    );
  },
};
export const DisabledTabs: Story = {
  parameters: {
    order: 4,
  },
  render: () => (
    <SegmentedControl defaultValue="enabled1">
      <SegmentedControlList>
        <SegmentedControlTrigger value="enabled1">
          Enabled
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="disabled1" disabled>
          Disabled
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="enabled2">
          Also Enabled
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="disabled2" disabled>
          Also Disabled
        </SegmentedControlTrigger>
      </SegmentedControlList>
      <SegmentedControlContent value="enabled1" className="p-4">
        First enabled tab content.
      </SegmentedControlContent>
      <SegmentedControlContent value="enabled2" className="p-4">
        Second enabled tab content.
      </SegmentedControlContent>
    </SegmentedControl>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledTab = canvas.getByRole('tab', { name: /^Disabled/i });
    const isAriaDisabled = disabledTab.getAttribute('aria-disabled') === 'true';
    const hasDataDisabled = disabledTab.hasAttribute('data-disabled');
    const isNativeDisabled = disabledTab.matches(':disabled');
    expect(isAriaDisabled || hasDataDisabled || isNativeDisabled).toBe(true);
  },
};
export const RichContent: Story = {
  parameters: {
    order: 5,
  },
  render: () => (
    <SegmentedControl defaultValue="overview">
      <SegmentedControlList>
        <SegmentedControlTrigger value="overview">
          Overview
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="analytics">
          Analytics
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="reports">
          Reports
        </SegmentedControlTrigger>
      </SegmentedControlList>
      <SegmentedControlContent value="overview" className="p-4 space-y-4">
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
      </SegmentedControlContent>
      <SegmentedControlContent value="analytics" className="p-4">
        <h3 className="font-medium">Analytics Dashboard</h3>
        <p className="text-sm text-muted-foreground mt-2">
          View detailed analytics and metrics.
        </p>
      </SegmentedControlContent>
      <SegmentedControlContent value="reports" className="p-4">
        <h3 className="font-medium">Reports</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Generate and download reports.
        </p>
      </SegmentedControlContent>
    </SegmentedControl>
  ),
};
export const FullWidth: Story = {
  parameters: {
    order: 6,
  },
  render: () => (
    <SegmentedControl defaultValue="all" className="w-full">
      <SegmentedControlList className="w-full">
        <SegmentedControlTrigger value="all" className="flex-1">
          All
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="active" className="flex-1">
          Active
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="archived" className="flex-1">
          Archived
        </SegmentedControlTrigger>
      </SegmentedControlList>
      <SegmentedControlContent value="all" className="p-4">
        Showing all items.
      </SegmentedControlContent>
      <SegmentedControlContent value="active" className="p-4">
        Showing active items only.
      </SegmentedControlContent>
      <SegmentedControlContent value="archived" className="p-4">
        Showing archived items.
      </SegmentedControlContent>
    </SegmentedControl>
  ),
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <SegmentedControl defaultValue="tab1">
          <SegmentedControlList>
            <SegmentedControlTrigger value="tab1">
              Active Tab
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="tab2">
              Inactive Tab
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="tab3" disabled>
              Disabled
            </SegmentedControlTrigger>
          </SegmentedControlList>
          <SegmentedControlContent value="tab1" className="p-4">
            Tab content here.
          </SegmentedControlContent>
        </SegmentedControl>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Icons
        </h3>
        <SegmentedControl defaultValue="settings">
          <SegmentedControlList>
            <SegmentedControlTrigger value="user">
              <IconUser className="size-4" />
              User
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="settings">
              <IconSettings className="size-4" />
              Settings
            </SegmentedControlTrigger>
          </SegmentedControlList>
          <SegmentedControlContent value="settings" className="p-4">
            Settings content.
          </SegmentedControlContent>
        </SegmentedControl>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Full Width
        </h3>
        <SegmentedControl defaultValue="first">
          <SegmentedControlList className="w-full">
            <SegmentedControlTrigger value="first" className="flex-1">
              First
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="second" className="flex-1">
              Second
            </SegmentedControlTrigger>
            <SegmentedControlTrigger value="third" className="flex-1">
              Third
            </SegmentedControlTrigger>
          </SegmentedControlList>
        </SegmentedControl>
      </div>
    </div>
  ),
  parameters: {
    order: 7,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const Playground: Story = {
  parameters: {
    order: 99,
  },
  args: {
    defaultValue: 'tab1',
    orientation: 'horizontal',
  },
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlList>
        <SegmentedControlTrigger value="tab1">
          First Tab
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="tab2">
          Second Tab
        </SegmentedControlTrigger>
        <SegmentedControlTrigger value="tab3">
          Third Tab
        </SegmentedControlTrigger>
      </SegmentedControlList>
      <SegmentedControlContent value="tab1" className="p-4">
        Content for the first tab.
      </SegmentedControlContent>
      <SegmentedControlContent value="tab2" className="p-4">
        Content for the second tab.
      </SegmentedControlContent>
      <SegmentedControlContent value="tab3" className="p-4">
        Content for the third tab.
      </SegmentedControlContent>
    </SegmentedControl>
  ),
};
