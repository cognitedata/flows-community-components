import type { Meta, StoryObj } from '@storybook/react';

import { TimeInput } from './time-input';

const meta: Meta<typeof TimeInput> = {
  title: 'Primitives/Time Input',
  component: TimeInput,
  tags: ['autodocs'],
  argTypes: {
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
type Story = StoryObj<typeof TimeInput>;

/**
 * Default time input (placeholder component).
 */
export const Default: Story = {
  render: () => (
    <TimeInput className="p-4 border rounded-md">
      <p className="text-sm text-muted-foreground">
        Time Input component placeholder. This component is currently in development.
      </p>
    </TimeInput>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Time input component (currently a placeholder).',
      },
    },
  },
};

/**
 * Placeholder for future implementation.
 */
export const Placeholder: Story = {
  render: () => (
    <TimeInput className="p-4 border rounded-md bg-muted/20">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium">Time Input</p>
        <p className="text-xs text-muted-foreground">
          This component will allow users to select or input time values.
        </p>
      </div>
    </TimeInput>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Placeholder showing the intended purpose of the Time Input component.',
      },
    },
  },
};
