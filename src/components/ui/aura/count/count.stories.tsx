import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Count } from './count';

const meta: Meta<typeof Count> = {
  title: 'Primitives/Count',
  component: Count,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'warning', 'critical'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: "'default' | 'warning' | 'critical'",
        },
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Count>;

export const Basic: Story = {
  parameters: {
    order: 1,
  },
  render: () => <Count>392°C</Count>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('392°C')).toBeInTheDocument();
  },
};

export const Variants: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Count variant="default">12</Count>
      <Count variant="warning">8</Count>
      <Count variant="critical">3</Count>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('12')).toBeInTheDocument();
    await expect(canvas.getByText('8')).toBeInTheDocument();
    await expect(canvas.getByText('3')).toBeInTheDocument();
  },
};

export const Playground: Story = {
  parameters: {
    order: 99,
  },
  args: {
    variant: 'default',
    children: '42',
  },
  render: (args) => <Count {...args} />,
};
