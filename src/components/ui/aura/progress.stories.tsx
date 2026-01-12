'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState, useEffect } from 'react';
import { Progress } from './progress';
import { Label } from './label';

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Display & behavior
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value from 0 to 100',
      table: {
        category: 'Display',
        type: { summary: 'number' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
    max: {
      control: 'number',
      description: 'Maximum value (defaults to 100)',
      table: {
        category: 'Display',
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Basic progress bar
 * Matches the basic example from progress.examples.tsx
 */
export const Basic: Story = {
  args: {
    value: 30,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic progress bar showing 30% completion. Tests that the progress indicator is rendered correctly.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the progress element
    const progress = canvas.getByRole('progressbar');
    await expect(progress).toBeInTheDocument();
    await expect(progress).toHaveAttribute('aria-valuenow', '30');
    await expect(progress).toHaveAttribute('aria-valuemin', '0');
    await expect(progress).toHaveAttribute('aria-valuemax', '100');
  },
  render: (args) => <Progress {...args} />,
};

/**
 * Progress with label and percentage
 * Matches the basic example from progress.examples.tsx
 */
export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar with label and percentage display. Common pattern for file uploads and task completion.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col gap-1 max-w-md">
      <Label>Files uploaded</Label>
      <div className="w-full flex items-center justify-between gap-2">
        <Progress value={30} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          30%
        </span>
      </div>
    </div>
  ),
};

/**
 * Different progress values
 */
export const ProgressValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bars showing different completion states from 0% to 100%.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 max-w-md w-full">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>0% Complete</span>
          <span className="text-muted-foreground">0%</span>
        </div>
        <Progress value={0} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>25% Complete</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>50% Complete</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>75% Complete</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>100% Complete</span>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};

/**
 * Animated progress simulation
 */
export const Animated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar that animates from 0% to 100% to simulate a loading or upload process.',
      },
    },
  },
  render: function AnimatedProgressStory() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0; // Reset to 0 for continuous demo
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="w-full flex flex-col gap-1 max-w-md">
        <Label>Processing...</Label>
        <div className="w-full flex items-center justify-between gap-2">
          <Progress value={progress} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            {progress}%
          </span>
        </div>
      </div>
    );
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bars with different heights using custom className styling.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 max-w-md w-full">
      <div>
        <Label className="text-xs">Small (h-1)</Label>
        <Progress value={50} className="h-1" />
      </div>
      <div>
        <Label className="text-xs">Default (h-2)</Label>
        <Progress value={50} />
      </div>
      <div>
        <Label className="text-xs">Medium (h-3)</Label>
        <Progress value={50} className="h-3" />
      </div>
      <div>
        <Label className="text-xs">Large (h-4)</Label>
        <Progress value={50} className="h-4" />
      </div>
    </div>
  ),
};

/**
 * Multiple progress bars
 */
export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multiple progress bars showing different tasks or file uploads.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 max-w-md w-full">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <Label>File 1.pdf</Label>
          <span className="text-muted-foreground">45%</span>
        </div>
        <Progress value={45} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <Label>File 2.jpg</Label>
          <span className="text-muted-foreground">78%</span>
        </div>
        <Progress value={78} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <Label>File 3.docx</Label>
          <span className="text-muted-foreground">12%</span>
        </div>
        <Progress value={12} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <Label>File 4.zip</Label>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};

/**
 * Indeterminate state
 */
export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar with undefined value, typically used for indeterminate loading states.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col gap-1 max-w-md">
      <Label>Loading...</Label>
      <Progress value={undefined} />
    </div>
  ),
};

/**
 * Custom styling
 */
export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with custom styling using className prop.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 max-w-md w-full">
      <div>
        <Label className="text-xs">Default styling</Label>
        <Progress value={60} />
      </div>
      <div>
        <Label className="text-xs">Custom width</Label>
        <Progress value={60} className="w-64" />
      </div>
      <div>
        <Label className="text-xs">Rounded corners</Label>
        <Progress value={60} className="rounded-lg" />
      </div>
    </div>
  ),
};

/**
 * Step-by-step progress
 */
export const StepProgress: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar that updates in steps, simulating a multi-step process.',
      },
    },
  },
  render: function StepProgressStory() {
    const [step, setStep] = useState(1);
    const steps = [
      { label: 'Initializing', value: 0 },
      { label: 'Processing', value: 25 },
      { label: 'Analyzing', value: 50 },
      { label: 'Finalizing', value: 75 },
      { label: 'Complete', value: 100 },
    ];

    const currentStep = steps[step - 1];

    return (
      <div className="w-full flex flex-col gap-2 max-w-md">
        <div className="flex justify-between text-sm">
          <Label>{currentStep.label}</Label>
          <span className="text-muted-foreground">{currentStep.value}%</span>
        </div>
        <Progress value={currentStep.value} />
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="text-xs px-2 py-1 border rounded"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
            className="text-xs px-2 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};
