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
    children: {
      control: 'text',
      table: {
        category: 'Display',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    htmlFor: {
      control: 'text',
      table: {
        category: 'Accessibility',
        type: {
          summary: 'string',
        },
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        category: 'Events',
        type: {
          summary: '(event: MouseEvent) => void',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Label>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  render: () => <Label htmlFor="name">Name</Label>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Name');
    await expect(label).toBeInTheDocument();
  },
};
export const Disabled: Story = {
  parameters: {
    order: 2,
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
export const WithAsterisk: Story = {
  parameters: {
    order: 3,
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
export const WithInput: Story = {
  parameters: {
    order: 4,
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
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};
export const Playground: Story = {
  args: {
    children: 'Playground label',
    htmlFor: 'playground-id',
  },
  parameters: {
    order: 99,
  },
  render: (args) => <Label {...args} />,
};
