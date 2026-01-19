import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { Label } from './label';
import { Input } from '@/components/ui/aura/input';
import { Checkbox } from '@/components/ui/aura/checkbox';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the form element the label is associated with',
      table: {
        category: 'Association',
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
      },
    },
    children: {
      control: 'text',
      description: 'Label content',
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Default label.
 */
export const Default: Story = {
  render: () => <Label>Email address</Label>,
  parameters: {
    docs: {
      description: {
        story: 'Default label styling.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Email address');
    await expect(label).toBeInTheDocument();
  },
};

/**
 * Label with input.
 */
export const WithInput: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label associated with an input field.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Email');
    await expect(input).toBeInTheDocument();
  },
};

/**
 * Label with checkbox.
 */
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label used with a checkbox.',
      },
    },
  },
};

/**
 * Required field label.
 */
export const Required: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label htmlFor="required-email">
        Email <span className="text-destructive">*</span>
      </Label>
      <Input type="email" id="required-email" placeholder="Required field" required />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label indicating a required field with asterisk.',
      },
    },
  },
};

/**
 * Label with helper text.
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label htmlFor="helper-email">Email</Label>
      <Input type="email" id="helper-email" placeholder="Enter email" />
      <p className="text-xs text-muted-foreground">
        We&apos;ll never share your email with anyone.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label with additional helper text below the input.',
      },
    },
  },
};

/**
 * Disabled label.
 */
export const Disabled: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5" data-disabled="true">
      <Label htmlFor="disabled-input" className="opacity-50">
        Disabled field
      </Label>
      <Input id="disabled-input" placeholder="Cannot edit" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label for a disabled input field.',
      },
    },
  },
};

/**
 * Label with icon.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label htmlFor="icon-input" className="flex items-center gap-1">
        <svg
          className="size-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        Username
      </Label>
      <Input id="icon-input" placeholder="Enter username" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Label with an icon for visual context.',
      },
    },
  },
};

/**
 * Multiple labels in a form.
 */
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-[300px]">
      <div className="grid items-center gap-1.5">
        <Label htmlFor="form-name">Full name</Label>
        <Input id="form-name" placeholder="John Doe" />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="form-email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input type="email" id="form-email" placeholder="john@example.com" required />
      </div>
      <div className="grid items-center gap-1.5">
        <Label htmlFor="form-phone">Phone (optional)</Label>
        <Input type="tel" id="form-phone" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="form-subscribe" />
        <Label htmlFor="form-subscribe">Subscribe to newsletter</Label>
      </div>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple labels in a typical form layout.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4 w-[350px]">
      {/* Basic */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Label>Default Label</Label>
      </div>

      {/* With input */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Input</h3>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="vr-input">Label</Label>
          <Input id="vr-input" placeholder="Input field" />
        </div>
      </div>

      {/* With checkbox */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Checkbox</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="vr-checkbox" />
          <Label htmlFor="vr-checkbox">Checkbox label</Label>
        </div>
      </div>

      {/* Required */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Required</h3>
        <Label>
          Required field <span className="text-destructive">*</span>
        </Label>
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <Label className="opacity-50">Disabled label</Label>
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
    children: 'Label text',
    htmlFor: 'playground-input',
  },
  render: (args) => (
    <div className="grid w-[300px] items-center gap-1.5">
      <Label {...args} />
      <Input id="playground-input" placeholder="Associated input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to experiment with label props.',
      },
    },
  },
};
