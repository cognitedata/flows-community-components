'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import React, { useState, useEffect } from 'react';
import { Progress } from './progress';
import { Label } from './label';
import { Button } from './button';

const meta: Meta<typeof Progress> = {
  title: 'AI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
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
      control: { type: 'number', min: 1 },
      description: 'Maximum value (default: 100)',
      table: {
        category: 'Display',
        type: { summary: 'number' },
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
 * Shows a simple progress indicator at 50%
 */
export const Basic: Story = {
  args: {
    value: 50,
    className: 'w-[400px]',
    'aria-label': 'Progress: 50%',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic progress bar showing 50% completion. The value prop controls the progress from 0 to 100.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvasElement.querySelector('[data-slot="progress"]');
    await expect(progress).toBeInTheDocument();

    const indicator = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicator).toBeInTheDocument();
  },
};

/**
 * Different progress values
 * Shows progress bars at various completion states
 */
export const DifferentValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bars showing different completion percentages: 0%, 25%, 50%, 75%, and 100%.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>0% Complete</span>
          <span className="text-muted-foreground">0%</span>
        </div>
        <Progress value={0} aria-label="Progress: 0%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>25% Complete</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} aria-label="Progress: 25%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>50% Complete</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} aria-label="Progress: 50%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>75% Complete</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} aria-label="Progress: 75%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>100% Complete</span>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} aria-label="Progress: 100%" />
      </div>
    </div>
  ),
};

/**
 * With label
 * Progress bar with a label showing context
 */
export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar with a label providing context about what is being tracked.',
      },
    },
  },
  render: () => (
    <div className="space-y-2 w-[400px]">
      <Label>Files uploaded</Label>
      <div className="flex items-center justify-between gap-2">
        <Progress
          value={30}
          className="flex-1"
          aria-label="Files uploaded: 30%"
        />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight whitespace-nowrap">
          30%
        </span>
      </div>
    </div>
  ),
};

/**
 * Animated progress
 * Demonstrates progress bar with animated value changes
 */
export const Animated: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Animated progress bar that automatically increments from 0% to 100% to demonstrate the transition animation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for animation to start
    await waitFor(
      () => {
        const indicator = canvasElement.querySelector(
          '[data-slot="progress-indicator"]'
        );
        expect(indicator).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  },
  render: function AnimatedProgressStory() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="space-y-2 w-[400px]">
        <div className="flex justify-between text-sm">
          <span>Loading...</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <Progress
          value={progress}
          aria-label={`Loading progress: ${progress}%`}
        />
      </div>
    );
  },
};

/**
 * File upload progress
 * Real-world example showing file upload progress
 */
export const FileUpload: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar used in a file upload scenario, showing upload progress with file count.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading document.pdf</span>
          <span className="text-muted-foreground">65%</span>
        </div>
        <Progress
          value={65}
          aria-label="Upload progress for document.pdf: 65%"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading image.jpg</span>
          <span className="text-muted-foreground">30%</span>
        </div>
        <Progress value={30} aria-label="Upload progress for image.jpg: 30%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading video.mp4</span>
          <span className="text-muted-foreground">90%</span>
        </div>
        <Progress value={90} aria-label="Upload progress for video.mp4: 90%" />
      </div>
    </div>
  ),
};

/**
 * Interactive progress
 * Allows user to control progress value with buttons
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive progress bar that can be controlled with buttons to increment or decrement the value.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const incrementButton = canvas.getByRole('button', { name: /increment/i });
    const decrementButton = canvas.getByRole('button', { name: /decrement/i });

    await expect(incrementButton).toBeInTheDocument();
    await expect(decrementButton).toBeInTheDocument();

    // Test incrementing
    await userEvent.click(incrementButton);
    await waitFor(
      () => {
        const progressText = canvas.getByText(/^\d+%$/);
        expect(progressText).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
  render: function InteractiveProgressStory() {
    const [progress, setProgress] = useState(50);

    return (
      <div className="space-y-4 w-[400px]">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} aria-label={`Progress: ${progress}%`} />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProgress(Math.max(0, progress - 10))}
          >
            Decrement
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProgress(Math.min(100, progress + 10))}
          >
            Increment
          </Button>
          <Button variant="outline" size="sm" onClick={() => setProgress(0)}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Indeterminate state
 * Shows progress bar with undefined value (0%)
 */
export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar in an indeterminate state (value is 0 or undefined), typically used when the total progress is unknown.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Processing...</span>
          <span className="text-muted-foreground">—</span>
        </div>
        <Progress value={0} aria-label="Processing progress" />
      </div>
    </div>
  ),
};

/**
 * Complete state
 * Shows progress bar at 100% completion
 */
export const Complete: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Progress bar at 100% completion, indicating the task is finished.',
      },
    },
  },
  render: () => (
    <div className="space-y-2 w-[400px]">
      <div className="flex justify-between text-sm">
        <span>Upload complete</span>
        <span className="text-muted-foreground">100%</span>
      </div>
      <Progress value={100} aria-label="Upload complete: 100%" />
    </div>
  ),
};

/**
 * Multiple progress bars
 * Shows multiple progress indicators in a list
 */
export const Multiple: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multiple progress bars showing different tasks or items with varying completion states.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 w-[400px]">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 1: Data processing</span>
          <span className="text-muted-foreground">45%</span>
        </div>
        <Progress
          value={45}
          aria-label="Task 1: Data processing progress: 45%"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 2: Image optimization</span>
          <span className="text-muted-foreground">78%</span>
        </div>
        <Progress
          value={78}
          aria-label="Task 2: Image optimization progress: 78%"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 3: File compression</span>
          <span className="text-muted-foreground">12%</span>
        </div>
        <Progress
          value={12}
          aria-label="Task 3: File compression progress: 12%"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 4: Finalization</span>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress
          value={100}
          aria-label="Task 4: Finalization progress: 100%"
        />
      </div>
    </div>
  ),
};
