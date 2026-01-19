import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from '@/components/ui/aura/label';

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Controlled selected value',
      table: {
        category: 'State',
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled)',
      table: {
        category: 'State',
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire radio group',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Mark as required for form validation',
      table: {
        category: 'Validation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the radio group',
      table: {
        category: 'Layout',
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: 'vertical' },
      },
    },
    onValueChange: {
      action: 'valueChange',
      description: 'Callback when selected value changes',
      table: {
        category: 'Events',
        type: { summary: '(value: string) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
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
type Story = StoryObj<typeof RadioGroup>;

/**
 * Default radio group.
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default radio group with vertical layout.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // First option should be selected
    const option1 = canvas.getByLabelText('Option 1');
    await expect(option1).toBeChecked();

    // Click option 2
    const option2 = canvas.getByLabelText('Option 2');
    await userEvent.click(option2);
    await expect(option2).toBeChecked();
    await expect(option1).not.toBeChecked();
  },
};

/**
 * Radio group with description.
 */
export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="default" id="d1" className="mt-1" />
        <div className="grid gap-0.5">
          <Label htmlFor="d1">Default</Label>
          <p className="text-xs text-muted-foreground">
            Standard spacing and sizing.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="comfortable" id="d2" className="mt-1" />
        <div className="grid gap-0.5">
          <Label htmlFor="d2">Comfortable</Label>
          <p className="text-xs text-muted-foreground">
            More space for easier reading.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="compact" id="d3" className="mt-1" />
        <div className="grid gap-0.5">
          <Label htmlFor="d3">Compact</Label>
          <p className="text-xs text-muted-foreground">
            Condensed layout for more content.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio options with descriptions for additional context.',
      },
    },
  },
};

/**
 * Horizontal radio group.
 */
export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="medium" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="small" id="h1" />
        <Label htmlFor="h1">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="medium" id="h2" />
        <Label htmlFor="h2">Medium</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="large" id="h3" />
        <Label htmlFor="h3">Large</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group with horizontal layout.',
      },
    },
  },
};

/**
 * Disabled radio group.
 */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" disabled>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="dis1" />
        <Label htmlFor="dis1" className="opacity-50">
          Selected (disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="dis2" />
        <Label htmlFor="dis2" className="opacity-50">
          Option 2 (disabled)
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="dis3" />
        <Label htmlFor="dis3" className="opacity-50">
          Option 3 (disabled)
        </Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled radio group prevents interaction.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioItems = canvas.getAllByRole('radio');
    for (const item of radioItems) {
      await expect(item).toBeDisabled();
    }
  },
};

/**
 * Individual disabled items.
 */
export const DisabledItems: Story = {
  render: () => (
    <RadioGroup defaultValue="available1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="available1" id="di1" />
        <Label htmlFor="di1">Available option</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="disabled1" id="di2" disabled />
        <Label htmlFor="di2" className="opacity-50">
          Unavailable option
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="available2" id="di3" />
        <Label htmlFor="di3">Another available option</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group with some items disabled.',
      },
    },
  },
};

/**
 * Controlled radio group.
 */
export const Controlled: Story = {
  render: function ControlledRadioGroup() {
    const [value, setValue] = useState('red');

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="red" id="c1" />
            <Label htmlFor="c1">Red</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="green" id="c2" />
            <Label htmlFor="c2">Green</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="blue" id="c3" />
            <Label htmlFor="c3">Blue</Label>
          </div>
        </RadioGroup>
        <div className="flex gap-2">
          <button
            onClick={() => setValue('red')}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set Red
          </button>
          <button
            onClick={() => setValue('green')}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set Green
          </button>
          <button
            onClick={() => setValue('blue')}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set Blue
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled radio group with external state management.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click "Set Green" button
    const greenButton = canvas.getByText('Set Green');
    await userEvent.click(greenButton);

    // Verify green is selected
    const greenRadio = canvas.getByLabelText('Green');
    await expect(greenRadio).toBeChecked();
  },
};

/**
 * Radio group in form.
 */
export const InForm: Story = {
  render: () => (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        alert(`Selected: ${formData.get('plan')}`);
      }}
    >
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Choose your plan</legend>
        <RadioGroup name="plan" defaultValue="pro" required>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="plan1" />
            <Label htmlFor="plan1">Free - $0/month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pro" id="plan2" />
            <Label htmlFor="plan2">Pro - $9/month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enterprise" id="plan3" />
            <Label htmlFor="plan3">Enterprise - Contact us</Label>
          </div>
        </RadioGroup>
      </fieldset>
      <button
        type="submit"
        className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Continue
      </button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Radio group used within a form.',
      },
    },
  },
};

/**
 * All radio group states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Default (with selection)</Label>
        <RadioGroup defaultValue="opt1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt1" id="s1" />
            <Label htmlFor="s1">Selected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt2" id="s2" />
            <Label htmlFor="s2">Not selected</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-2">
        <Label className="opacity-50">Disabled</Label>
        <RadioGroup defaultValue="opt1" disabled>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt1" id="d1" />
            <Label htmlFor="d1" className="opacity-50">Selected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt2" id="d2" />
            <Label htmlFor="d2" className="opacity-50">Not selected</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All radio group states for comparison.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Vertical */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Vertical</h3>
        <RadioGroup defaultValue="opt1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt1" id="vr1" />
            <Label htmlFor="vr1">Selected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt2" id="vr2" />
            <Label htmlFor="vr2">Not selected</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Horizontal */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Horizontal</h3>
        <RadioGroup defaultValue="opt1" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt1" id="vrh1" />
            <Label htmlFor="vrh1">A</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt2" id="vrh2" />
            <Label htmlFor="vrh2">B</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt3" id="vrh3" />
            <Label htmlFor="vrh3">C</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <RadioGroup defaultValue="opt1" disabled>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt1" id="vrd1" />
            <Label htmlFor="vrd1" className="opacity-50">Selected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="opt2" id="vrd2" />
            <Label htmlFor="vrd2" className="opacity-50">Not selected</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive visual overview for regression testing.',
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
    defaultValue: 'option1',
    disabled: false,
    required: false,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="p1" />
        <Label htmlFor="p1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="p2" />
        <Label htmlFor="p2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="p3" />
        <Label htmlFor="p3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to experiment with radio group props.',
      },
    },
  },
};
