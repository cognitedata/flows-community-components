import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';

import { Checkbox } from './checkbox';

import { Label } from '@/components/ui/aura/label';
const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      table: {
        category: 'State',
        type: {
          summary: 'boolean | "indeterminate"',
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
    name: {
      control: 'text',
      table: {
        category: 'Form',
        type: {
          summary: 'string',
        },
      },
    },
    value: {
      control: 'text',
      table: {
        category: 'Form',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'on',
        },
      },
    },
    onCheckedChange: {
      action: 'checkedChange',
      table: {
        category: 'Events',
        type: {
          summary: '(checked: boolean | "indeterminate") => void',
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
type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="default" />
      <Label htmlFor="default">Accept terms and conditions</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};
export const DefaultChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <Label htmlFor="checked">Receive marketing emails</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
  },
};
export const Disabled: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <Label htmlFor="disabled-unchecked" className="opacity-50">
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="opacity-50">
          Disabled checked
        </Label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    for (const checkbox of checkboxes) {
      await expect(checkbox).toHaveAttribute('data-disabled');
    }
  },
};
export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="controlled">Controlled checkbox</Label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Check
          </button>
          <button
            type="button"
            onClick={() => setChecked(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Uncheck
          </button>
          <button
            type="button"
            onClick={() => setChecked(!checked)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Toggle
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Checked: {checked ? 'true' : 'false'}</p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkButton = canvas.getByText('Check');
    await userEvent.click(checkButton);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeChecked();
    const uncheckButton = canvas.getByText('Uncheck');
    await userEvent.click(uncheckButton);
    await expect(checkbox).not.toBeChecked();
  },
};
export const Indeterminate: Story = {
  render: function IndeterminateCheckbox() {
    const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="indeterminate" checked={checked} onCheckedChange={setChecked} />
          <Label htmlFor="indeterminate">Select all items</Label>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setChecked(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            None
          </button>
          <button
            type="button"
            onClick={() => setChecked('indeterminate')}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Indeterminate
          </button>
        </div>
        <p className="text-sm text-muted-foreground">State: {String(checked)}</p>
      </div>
    );
  },
};
export const CheckboxGroup: Story = {
  render: function CheckboxGroupExample() {
    const [selected, setSelected] = useState<string[]>(['email']);
    const toggleItem = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };
    return (
      <div className="space-y-4">
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium">Notification preferences</legend>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email"
              checked={selected.includes('email')}
              onCheckedChange={() => toggleItem('email')}
            />
            <Label htmlFor="email">Email notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sms"
              checked={selected.includes('sms')}
              onCheckedChange={() => toggleItem('sms')}
            />
            <Label htmlFor="sms">SMS notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="push"
              checked={selected.includes('push')}
              onCheckedChange={() => toggleItem('push')}
            />
            <Label htmlFor="push">Push notifications</Label>
          </div>
        </fieldset>
        <p className="text-sm text-muted-foreground">Selected: {selected.join(', ') || 'None'}</p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailCheckbox = canvas.getByLabelText('Email notifications');
    await expect(emailCheckbox).toBeChecked();
    const smsCheckbox = canvas.getByLabelText('SMS notifications');
    await userEvent.click(smsCheckbox);
    await expect(smsCheckbox).toBeChecked();
  },
};
export const WithValidation: Story = {
  render: () => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
    >
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms">
          I agree to the terms and conditions <span className="text-red-500">*</span>
        </Label>
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  ),
};
export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox aria-label="Option 1" />
      <Checkbox aria-label="Option 2" defaultChecked />
      <Checkbox aria-label="Option 3" disabled />
    </div>
  ),
};
export const AllStates: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked-state" defaultChecked />
        <Label htmlFor="checked-state">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked-state" disabled />
        <Label htmlFor="disabled-unchecked-state" className="opacity-50">
          Disabled unchecked
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked-state" disabled defaultChecked />
        <Label htmlFor="disabled-checked-state" className="opacity-50">
          Disabled checked
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
            <Checkbox id="vr-unchecked" />
            <Label htmlFor="vr-unchecked">Unchecked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-checked" defaultChecked />
            <Label htmlFor="vr-checked">Checked</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-disabled" disabled />
            <Label htmlFor="vr-disabled" className="opacity-50">
              Disabled
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="vr-disabled-checked" disabled defaultChecked />
            <Label htmlFor="vr-disabled-checked" className="opacity-50">
              Disabled Checked
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Without Labels</h3>
        <div className="flex gap-4">
          <Checkbox aria-label="Option 1" />
          <Checkbox aria-label="Option 2" defaultChecked />
          <Checkbox aria-label="Option 3" disabled />
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
      <Checkbox id="playground" {...args} />
      <Label htmlFor="playground">Playground checkbox</Label>
    </div>
  ),
};
