import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

import { Switch } from './switch';

import { Label } from '@/components/ui/aura/label';
const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    defaultChecked: {
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
    disabled: {
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
    required: {
      control: 'boolean',
      table: {
        category: 'Validation',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onCheckedChange: {
      action: 'checkedChange',
      table: {
        category: 'Events',
        type: {
          summary: '(checked: boolean) => void',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Switch>;
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="default-switch" />
      <Label htmlFor="default-switch">Toggle me</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole('switch');
    await expect(switchEl).toBeInTheDocument();
    await expect(switchEl).toHaveAttribute('data-unchecked');
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute('data-checked');
    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute('data-unchecked');
  },
};
export const DefaultChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="checked-switch" defaultChecked />
      <Label htmlFor="checked-switch">Notifications enabled</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole('switch');
    await expect(switchEl).toHaveAttribute('data-checked');
  },
};
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off" className="opacity-50">
          Disabled (off)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on" className="opacity-50">
          Disabled (on)
        </Label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switches = canvas.getAllByRole('switch');
    for (const switchEl of switches) {
      await expect(switchEl).toHaveAttribute('data-disabled');
    }
  },
};
export const Controlled: Story = {
  render: function ControlledSwitch() {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="controlled-switch" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="controlled-switch">Airplane Mode</Label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEnabled(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Enable
          </button>
          <button
            type="button"
            onClick={() => setEnabled(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Disable
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Status: {enabled ? 'Enabled' : 'Disabled'}</p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enableButton = canvas.getByText('Enable');
    await userEvent.click(enableButton);
    const switchEl = canvas.getByRole('switch');
    await expect(switchEl).toHaveAttribute('data-checked');
    const disableButton = canvas.getByText('Disable');
    await userEvent.click(disableButton);
    await expect(switchEl).toHaveAttribute('data-unchecked');
  },
};
export const SettingsForm: Story = {
  render: function SettingsFormExample() {
    const [settings, setSettings] = useState({
      notifications: true,
      emails: false,
      marketing: false,
      analytics: true,
    });
    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings((prev) => ({
        ...prev,
        [key]: checked,
      }));
    };
    return (
      <div className="w-[300px] space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Push Notifications</Label>
            <p className="text-xs text-muted-foreground">Receive notifications on your device.</p>
          </div>
          <Switch
            id="notifications"
            checked={settings.notifications}
            onCheckedChange={updateSetting('notifications')}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="emails">Email Notifications</Label>
            <p className="text-xs text-muted-foreground">Receive updates via email.</p>
          </div>
          <Switch id="emails" checked={settings.emails} onCheckedChange={updateSetting('emails')} />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing">Marketing Emails</Label>
            <p className="text-xs text-muted-foreground">Receive promotional content.</p>
          </div>
          <Switch
            id="marketing"
            checked={settings.marketing}
            onCheckedChange={updateSetting('marketing')}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="analytics">Usage Analytics</Label>
            <p className="text-xs text-muted-foreground">Help improve our product.</p>
          </div>
          <Switch
            id="analytics"
            checked={settings.analytics}
            onCheckedChange={updateSetting('analytics')}
          />
        </div>
      </div>
    );
  },
};
export const WithoutVisibleLabel: Story = {
  render: () => (
    <div className="flex gap-4">
      <Switch aria-label="Toggle feature 1" />
      <Switch aria-label="Toggle feature 2" defaultChecked />
      <Switch aria-label="Toggle feature 3" disabled />
    </div>
  ),
};
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="state-off" />
        <Label htmlFor="state-off">Off</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="state-on" defaultChecked />
        <Label htmlFor="state-on">On</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="state-disabled-off" disabled />
        <Label htmlFor="state-disabled-off" className="opacity-50">
          Disabled Off
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="state-disabled-on" disabled defaultChecked />
        <Label htmlFor="state-disabled-on" className="opacity-50">
          Disabled On
        </Label>
      </div>
    </div>
  ),
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">All States</h3>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center space-x-2">
            <Switch id="vr-off" />
            <Label htmlFor="vr-off">Off</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="vr-on" defaultChecked />
            <Label htmlFor="vr-on">On</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="vr-disabled" disabled />
            <Label htmlFor="vr-disabled" className="opacity-50">
              Disabled
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="vr-disabled-on" disabled defaultChecked />
            <Label htmlFor="vr-disabled-on" className="opacity-50">
              Disabled On
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Without Labels</h3>
        <div className="flex gap-4">
          <Switch aria-label="Option 1" />
          <Switch aria-label="Option 2" defaultChecked />
          <Switch aria-label="Option 3" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const Playground: Story = {
  args: {
    disabled: false,
    defaultChecked: false,
    required: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch id="playground-switch" {...args} />
      <Label htmlFor="playground-switch">Playground switch</Label>
    </div>
  ),
};
