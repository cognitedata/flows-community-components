'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import {
  ArtifactProgress,
  ArtifactProgressHeader,
  ArtifactProgressTitle,
  ArtifactProgressDescription,
  ArtifactProgressContent,
  ArtifactProgressFooter,
} from './artifact-progress';

const meta: Meta<typeof ArtifactProgress> = {
  title: 'Primitives/Artifact - Progress',
  component: ArtifactProgress,
  tags: ['autodocs'],
  argTypes: {
    // Display
    className: {
      control: 'text',
      description: 'CSS classes for styling the card wrapper',
      table: {
        category: 'Display',
      },
    },

    // HTML attributes
    children: {
      control: false,
      description: 'Compositional children (Header, Content, Footer)',
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
type Story = StoryObj<typeof ArtifactProgress>;

/**
 * Basic artifact progress with title, description, progress bar, and footer
 * Matches the basic example from artifact-progress.examples.tsx
 */
export const Basic: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic progress artifact showing task completion with header and footer.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that title is rendered
    const title = canvas.getByText('Progress title');
    await expect(title).toBeInTheDocument();

    // Check that description is rendered
    const description = canvas.getByText('8 of 12 tasks complete');
    await expect(description).toBeInTheDocument();

    // Check that percentage is rendered
    const percentage = canvas.getByText('32%');
    await expect(percentage).toBeInTheDocument();

    // Check that footer is rendered
    const footer = canvas.getByText('On track for completion by Friday');
    await expect(footer).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Progress title</ArtifactProgressTitle>
        <ArtifactProgressDescription>
          8 of 12 tasks complete
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressContent value={32} aria-label="Task completion progress" />
      <ArtifactProgressFooter>
        On track for completion by Friday
      </ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};

/**
 * Custom styling with overridden default classes
 */
export const CustomStyling: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how to override default styles with custom classes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that custom styled title is rendered
    const title = canvas.getByText('Custom Styled Title');
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveClass('text-lg');

    // Check that custom description is rendered
    const description = canvas.getByText('Custom description styling');
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveClass('text-xs', 'italic');

    // Check that percentage is rendered
    const percentage = canvas.getByText('75%');
    await expect(percentage).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle className="text-lg">
          Custom Styled Title
        </ArtifactProgressTitle>
        <ArtifactProgressDescription className="text-xs italic">
          Custom description styling
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressContent value={75} aria-label="Custom task progress" />
      <ArtifactProgressFooter>Almost complete!</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};

/**
 * Different progress values
 */
export const ProgressValues: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows different progress percentages from 0% to 100%.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all progress values are rendered
    await expect(canvas.getByText('0%')).toBeInTheDocument();
    await expect(canvas.getByText('50%')).toBeInTheDocument();
    await expect(canvas.getByText('90%')).toBeInTheDocument();
    await expect(canvas.getByText('100%')).toBeInTheDocument();

    // Check all titles are rendered
    await expect(canvas.getByText('Just Started')).toBeInTheDocument();
    await expect(canvas.getByText('In Progress')).toBeInTheDocument();
    await expect(canvas.getByText('Nearly Done')).toBeInTheDocument();
    await expect(canvas.getByText('Complete')).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ArtifactProgress className="w-[362px]">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Just Started</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            0 of 20 tasks complete
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressContent value={0} aria-label="Project start progress" />
        <ArtifactProgressFooter>Recently initiated</ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress className="w-[362px]">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>In Progress</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            10 of 20 tasks complete
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressContent value={50} aria-label="Project progress" />
        <ArtifactProgressFooter>Halfway there</ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress className="w-[362px]">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Nearly Done</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            18 of 20 tasks complete
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressContent value={90} aria-label="Project near completion" />
        <ArtifactProgressFooter>Almost finished</ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress className="w-[362px]">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Complete</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            20 of 20 tasks complete
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressContent value={100} aria-label="Project complete" />
        <ArtifactProgressFooter>All tasks completed</ArtifactProgressFooter>
      </ArtifactProgress>
    </div>
  ),
};

/**
 * Without footer
 */
export const WithoutFooter: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress artifact without a footer section.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that header content is rendered
    await expect(canvas.getByText('Data Processing')).toBeInTheDocument();
    await expect(
      canvas.getByText('Processing 450 of 1000 records')
    ).toBeInTheDocument();

    // Check that progress is rendered
    await expect(canvas.getByText('45%')).toBeInTheDocument();

    // Verify no footer is present by checking the container doesn't have footer text
    const container = canvasElement;
    expect(container.textContent).not.toContain('On track');
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Data Processing</ArtifactProgressTitle>
        <ArtifactProgressDescription>
          Processing 450 of 1000 records
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressContent value={45} aria-label="Data processing progress" />
    </ArtifactProgress>
  ),
};

/**
 * Without header
 */
export const WithoutHeader: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal progress artifact with just the progress bar and footer.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that progress is rendered
    await expect(canvas.getByText('67%')).toBeInTheDocument();

    // Check that footer is rendered
    await expect(canvas.getByText('Upload in progress')).toBeInTheDocument();

    // Verify no header is present
    const container = canvasElement;
    expect(container.textContent).not.toContain('Progress title');
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressContent value={67} aria-label="Upload progress" />
      <ArtifactProgressFooter>Upload in progress</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};

/**
 * Minimal version with only progress
 */
export const Minimal: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplest form with only the progress bar.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that only progress is rendered
    await expect(canvas.getByText('55%')).toBeInTheDocument();

    // Verify no header or footer
    const container = canvasElement;
    expect(container.textContent).not.toContain('Progress title');
    expect(container.textContent).not.toContain('On track');
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressContent value={55} aria-label="Progress" />
    </ArtifactProgress>
  ),
};

/**
 * Interactive progress simulation
 */
export const Interactive: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Simulates progress incrementing over time. Progress automatically increases from 0 to 100.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that title is rendered
    await expect(canvas.getByText('Deployment Status')).toBeInTheDocument();

    // Check initial state shows 0%
    await expect(canvas.getByText('0%')).toBeInTheDocument();

    // Wait a bit and check that progress has incremented
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Should no longer be at 0%
    const percentageText = canvas.getByText(/%$/);
    const value = parseInt(percentageText.textContent || '0');
    expect(value).toBeGreaterThan(0);
  },
  render: function InteractiveProgressStory(args) {
    const [progress, setProgress] = useState(0);

    // Simulate progress incrementing
    useState(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    });

    const tasksComplete = Math.floor((progress / 100) * 15);
    const status =
      progress === 0
        ? 'Not started'
        : progress === 100
          ? 'Complete!'
          : 'In progress';

    return (
      <ArtifactProgress {...args}>
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Deployment Status</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            {tasksComplete} of 15 tasks complete
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressContent value={progress} aria-label="Deployment progress" />
        <ArtifactProgressFooter>{status}</ArtifactProgressFooter>
      </ArtifactProgress>
    );
  },
};

/**
 * Custom content padding
 */
export const CustomPadding: Story = {
  args: {
    className: 'w-[362px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates custom padding on the progress content.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all elements are rendered
    await expect(canvas.getByText('Custom Padding')).toBeInTheDocument();
    await expect(canvas.getByText('With extra padding')).toBeInTheDocument();
    await expect(canvas.getByText('40%')).toBeInTheDocument();
    await expect(
      canvas.getByText('More space around progress')
    ).toBeInTheDocument();

    // Find the content wrapper and verify it has custom padding classes
    const progressContent = canvasElement.querySelector('.px-8.py-8');
    expect(progressContent).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Custom Padding</ArtifactProgressTitle>
        <ArtifactProgressDescription>
          With extra padding
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressContent
        value={40}
        className="px-8 py-8"
        aria-label="Custom padding progress"
      />
      <ArtifactProgressFooter>More space around progress</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};
