'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { IconAsterisk } from '@tabler/icons-react';
import { type ChangeEvent, useState } from 'react';

import { Label } from './label';

import { Input } from '@/components/ui/aura/input';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    // Display
    children: {
      control: 'text',
      description: 'Label text content.',
      table: {
        category: 'Display',
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Optional CSS class names for custom styling.',
      table: {
        category: 'Display',
      },
    },

    // Accessibility
    htmlFor: {
      control: 'text',
      description:
        'ID of the form control this label is associated with. When provided, clicking the label will focus the control.',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },

    // Events
    onClick: {
      action: 'clicked',
      description: 'Click handler for the label element.',
      table: {
        category: 'Events',
        type: { summary: '(event: MouseEvent) => void' },
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
 * Basic label usage with simple text.
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: 'A basic label with simple text content.',
      },
    },
  },
  render: () => <Label htmlFor="name">Name</Label>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Name');
    await expect(label).toBeInTheDocument();
  },
};

/**
 * Label styled to indicate a disabled field, typically used alongside a disabled input.
 */
export const Disabled: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          'A label presented in a disabled style. Combine with a disabled input to reflect non-interactive state.',
      },
    },
  },
  render: () => (
    <div className="group space-y-2 max-w-sm" data-disabled="true">
      <Label htmlFor="disabled-input">Disabled label</Label>
      <Input id="disabled-input" disabled placeholder="Disabled input" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Disabled label');
    const input = canvas.getByPlaceholderText('Disabled input');

    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
  },
};

/**
 * Label indicating a required field using an asterisk.
 */
export const WithAsterisk: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          'A label that visually indicates a required field using an asterisk icon. Useful for required form fields.',
      },
    },
  },
  render: () => (
    <Label htmlFor="email">
      Email address
      <IconAsterisk
        title="required"
        className="inline-block ml-0.5 self-start -translate-y-px h-1 w-1 text-red-500"
      />
    </Label>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText(/Email address/);
    const asterisk = canvas.getByTitle('required');

    await expect(label).toBeInTheDocument();
    await expect(asterisk).toBeInTheDocument();
  },
};

/**
 * Fully wired label with an input, demonstrating focus behavior when clicking the label.
 */
export const WithInput: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          'Label associated with an input via `htmlFor` and `id`. Clicking the label focuses the corresponding input.',
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <div className="max-w-sm">
        <Label htmlFor="project-name">Project name</Label>
        <Input
          id="project-name"
          value={value}
          onChange={handleChange}
          placeholder="Enter project name"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText('Project name');
    const input = canvas.getByPlaceholderText('Enter project name');

    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();

    // Click label and ensure input receives focus
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

/**
 * Playground for exploring label props and combinations.
 */
export const Playground: Story = {
  args: {
    children: 'Playground label',
    htmlFor: 'playground-id',
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          'Interactive playground for the Label component. Use controls to experiment with different props and configurations.',
      },
    },
  },
  render: (args) => <Label {...args} />,
};
