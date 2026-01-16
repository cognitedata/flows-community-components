'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState, useEffect } from 'react';
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
    // Verify progress bar container exists
    const progress = canvasElement.querySelector('[data-slot="progress"]');
    await expect(progress).toBeInTheDocument();

    // Verify progress indicator exists
    const indicator = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicator).toBeInTheDocument();

    // Verify aria-label is set correctly
    await expect(progress).toHaveAttribute('aria-label', 'Progress: 50%');

    // Verify default styling classes
    await expect(progress).toHaveClass('w-[400px]');
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all progress bars are rendered
    await expect(canvas.getByText('0% Complete')).toBeInTheDocument();
    await expect(canvas.getByText('25% Complete')).toBeInTheDocument();
    await expect(canvas.getByText('50% Complete')).toBeInTheDocument();
    await expect(canvas.getByText('75% Complete')).toBeInTheDocument();
    await expect(canvas.getByText('100% Complete')).toBeInTheDocument();

    // Verify all progress indicators exist
    const indicators = canvasElement.querySelectorAll(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicators).toHaveLength(5);
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify label is rendered
    await expect(canvas.getByText('Files uploaded')).toBeInTheDocument();

    // Verify percentage display
    await expect(canvas.getByText('30%')).toBeInTheDocument();

    // Verify progress bar exists
    const indicator = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicator).toBeInTheDocument();
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

    // Verify loading text is present
    await expect(canvas.getByText('Loading...')).toBeInTheDocument();

    // Wait for progress to start incrementing
    await waitFor(
      () => {
        const progressText = canvas.getByText(/^\d+%$/);
        expect(progressText).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify progress indicator exists and is animating
    const indicator = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicator).toBeInTheDocument();

    // Wait for progress to increase
    await waitFor(
      () => {
        const progressText = canvas.getByText(/^\d+%$/);
        const value = parseInt(progressText.textContent || '0');
        expect(value).toBeGreaterThan(0);
      },
      { timeout: 1500 }
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all file upload items are rendered
    await expect(
      canvas.getByText('Uploading document.pdf')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Uploading image.jpg')).toBeInTheDocument();
    await expect(canvas.getByText('Uploading video.mp4')).toBeInTheDocument();

    // Verify all percentages are displayed
    await expect(canvas.getByText('65%')).toBeInTheDocument();
    await expect(canvas.getByText('30%')).toBeInTheDocument();
    await expect(canvas.getByText('90%')).toBeInTheDocument();

    // Verify all progress indicators exist
    const indicators = canvasElement.querySelectorAll(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicators).toHaveLength(3);
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
    const resetButton = canvas.getByRole('button', { name: /reset/i });

    await expect(incrementButton).toBeInTheDocument();
    await expect(decrementButton).toBeInTheDocument();
    await expect(resetButton).toBeInTheDocument();

    // Verify initial state (50%)
    await expect(canvas.getByText('50%')).toBeInTheDocument();

    // Test incrementing
    await userEvent.click(incrementButton);
    await waitFor(
      () => {
        expect(canvas.getByText('60%')).toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Test decrementing
    await userEvent.click(decrementButton);
    await waitFor(
      () => {
        expect(canvas.getByText('50%')).toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Test reset
    await userEvent.click(resetButton);
    await waitFor(
      () => {
        expect(canvas.getByText('0%')).toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Verify progress indicator still exists
    const indicator = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicator).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify processing text is rendered
    await expect(canvas.getByText('Processing...')).toBeInTheDocument();

    // Verify indeterminate indicator (—)
    await expect(canvas.getByText('—')).toBeInTheDocument();

    // Verify progress bar exists
    const progress = canvasElement.querySelector('[data-slot="progress"]');
    await expect(progress).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify completion text
    await expect(canvas.getByText('Upload complete')).toBeInTheDocument();

    // Verify 100% display
    await expect(canvas.getByText('100%')).toBeInTheDocument();

    // Verify progress indicator is fully filled
    const indicator = canvasElement.querySelector(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicator).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all task labels are rendered
    await expect(
      canvas.getByText('Task 1: Data processing')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Task 2: Image optimization')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Task 3: File compression')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Task 4: Finalization')).toBeInTheDocument();

    // Verify all percentages are displayed
    await expect(canvas.getByText('45%')).toBeInTheDocument();
    await expect(canvas.getByText('78%')).toBeInTheDocument();
    await expect(canvas.getByText('12%')).toBeInTheDocument();
    await expect(canvas.getByText('100%')).toBeInTheDocument();

    // Verify all progress indicators exist
    const indicators = canvasElement.querySelectorAll(
      '[data-slot="progress-indicator"]'
    );
    await expect(indicators).toHaveLength(4);
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
