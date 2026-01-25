"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { useState } from "react";
import {
  ArtifactProgress,
  ArtifactProgressBar,
  ArtifactProgressDescription,
  ArtifactProgressFooter,
  ArtifactProgressHeader,
  ArtifactProgressTitle,
} from "./artifact-progress";

const meta: Meta<typeof ArtifactProgress> = {
  title: "Primitives/Artifact - Progress",
  component: ArtifactProgress,
  tags: ["autodocs"],
  argTypes: {
    // Display
    className: {
      control: "text",
      description: "CSS classes for styling the card wrapper",
      table: {
        category: "Display",
      },
    },

    // HTML attributes
    children: {
      control: false,
      description: "Compositional children (Header, Content, Footer)",
      table: {
        category: "Content",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactProgress>;

/**
 * Basic artifact progress with title, description, progress bar, and footer
 * Uses auto-generated aria-label since context is already in visible title/description
 */
export const Basic: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic progress artifact showing task completion with header and footer. Uses auto-generated aria-label ('Progress: 32%') since the visible title and description already provide context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that title is rendered
    const title = canvas.getByText("Progress title");
    await expect(title).toBeInTheDocument();

    // Check that description is rendered
    const description = canvas.getByText("8 of 12 tasks complete");
    await expect(description).toBeInTheDocument();

    // Check that percentage is rendered
    const percentage = canvas.getByText("32%");
    await expect(percentage).toBeInTheDocument();

    // Check that footer is rendered
    const footer = canvas.getByText("On track for completion by Friday");
    await expect(footer).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Progress title</ArtifactProgressTitle>
        <ArtifactProgressDescription>8 of 12 tasks complete</ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={32} />
      <ArtifactProgressFooter>On track for completion by Friday</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};

/**
 * Custom styling with overridden default classes
 */
export const CustomStyling: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Demonstrates how to override default styles with custom classes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that custom styled title is rendered
    const title = canvas.getByText("Custom Styled Title");
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveClass("text-lg");

    // Check that custom description is rendered
    const description = canvas.getByText("Custom description styling");
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveClass("text-xs", "italic");

    // Check that percentage is rendered
    const percentage = canvas.getByText("75%");
    await expect(percentage).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle className="text-lg">Custom Styled Title</ArtifactProgressTitle>
        <ArtifactProgressDescription className="text-xs italic">
          Custom description styling
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={75} />
      <ArtifactProgressFooter>Almost complete!</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};

/**
 * Custom aria-label for specific context
 */
export const CustomAriaLabel: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Demonstrates when and how to override the auto-generated aria-label to provide more specific context about what's being tracked.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check both examples are rendered
    await expect(canvas.getByText("Auto-generated label")).toBeInTheDocument();
    await expect(canvas.getByText("Custom label")).toBeInTheDocument();
    
    // Check that both progress bars are rendered
    const progressBars = canvas.getAllByRole("progressbar");
    await expect(progressBars).toHaveLength(2);
    
    // Check the custom aria-label
    await expect(progressBars[1]).toHaveAccessibleName("Document upload progress: 60%");
  },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <ArtifactProgress>
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Auto-generated label</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            Uses default aria-label
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={60} />
        <ArtifactProgressFooter className="text-xs text-muted-foreground">
          aria-label: "Progress: 60%"
        </ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress>
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Custom label</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            Provides specific context
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={60} aria-label="Document upload progress: 60%" />
        <ArtifactProgressFooter className="text-xs text-muted-foreground">
          aria-label: "Document upload progress: 60%"
        </ArtifactProgressFooter>
      </ArtifactProgress>
    </div>
  ),
};

/**
 * Different progress values
 * Uses auto-generated aria-labels since visible labels provide context
 */
export const ProgressValues: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Shows different progress percentages from 0% to 100%. Uses auto-generated aria-labels since each artifact has descriptive visible titles and descriptions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all progress values are rendered
    await expect(canvas.getByText("0%")).toBeInTheDocument();
    await expect(canvas.getByText("50%")).toBeInTheDocument();
    await expect(canvas.getByText("90%")).toBeInTheDocument();
    await expect(canvas.getByText("100%")).toBeInTheDocument();

    // Check all titles are rendered
    await expect(canvas.getByText("Just Started")).toBeInTheDocument();
    await expect(canvas.getByText("In Progress")).toBeInTheDocument();
    await expect(canvas.getByText("Nearly Done")).toBeInTheDocument();
    await expect(canvas.getByText("Complete")).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <ArtifactProgress className="w-96">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Just Started</ArtifactProgressTitle>
          <ArtifactProgressDescription>0 of 20 tasks complete</ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={0} />
        <ArtifactProgressFooter>Recently initiated</ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress className="w-96">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>In Progress</ArtifactProgressTitle>
          <ArtifactProgressDescription>10 of 20 tasks complete</ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={50} />
        <ArtifactProgressFooter>Halfway there</ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress className="w-96">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Nearly Done</ArtifactProgressTitle>
          <ArtifactProgressDescription>18 of 20 tasks complete</ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={90} />
        <ArtifactProgressFooter>Almost finished</ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress className="w-96">
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Complete</ArtifactProgressTitle>
          <ArtifactProgressDescription>20 of 20 tasks complete</ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={100} />
        <ArtifactProgressFooter>All tasks completed</ArtifactProgressFooter>
      </ArtifactProgress>
    </div>
  ),
};

/**
 * Without footer
 * Uses auto-generated aria-label since title provides context
 */
export const WithoutFooter: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Progress artifact without a footer section. Uses auto-generated aria-label since the visible title provides sufficient context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that header content is rendered
    await expect(canvas.getByText("Data Processing")).toBeInTheDocument();
    await expect(canvas.getByText("Processing 450 of 1000 records")).toBeInTheDocument();

    // Check that progress is rendered
    await expect(canvas.getByText("45%")).toBeInTheDocument();

    // Verify no footer is present by checking the container doesn't have footer text
    const container = canvasElement;
    expect(container.textContent).not.toContain("On track");
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Data Processing</ArtifactProgressTitle>
        <ArtifactProgressDescription>Processing 450 of 1000 records</ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={45} />
    </ArtifactProgress>
  ),
};

/**
 * Without header
 * Uses custom aria-label since there's no visible title for context
 */
export const WithoutHeader: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Minimal progress artifact with just the progress bar and footer. Uses a custom aria-label ('File upload progress: 67%') since there's no header/title to provide context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that progress is rendered
    await expect(canvas.getByText("67%")).toBeInTheDocument();

    // Check that footer is rendered
    await expect(canvas.getByText("Upload in progress")).toBeInTheDocument();

    // Verify no header is present
    const container = canvasElement;
    expect(container.textContent).not.toContain("Progress title");
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressBar value={67} aria-label="File upload progress: 67%" />
      <ArtifactProgressFooter>Upload in progress</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};

/**
 * Minimal version with only progress
 * Demonstrates auto-generated aria-label as the simplest use case
 */
export const Minimal: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Simplest form with only the progress bar. Uses auto-generated aria-label ('Progress: 55%') for basic accessibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that only progress is rendered
    await expect(canvas.getByText("55%")).toBeInTheDocument();

    // Verify no header or footer
    const container = canvasElement;
    expect(container.textContent).not.toContain("Progress title");
    expect(container.textContent).not.toContain("On track");
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressBar value={55} />
    </ArtifactProgress>
  ),
};

/**
 * Interactive progress simulation
 */
export const Interactive: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Simulates progress incrementing over time. Progress automatically increases from 0 to 100.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that title is rendered
    await expect(canvas.getByText("Deployment Status")).toBeInTheDocument();

    // Check initial state shows 0%
    await expect(canvas.getByText("0%")).toBeInTheDocument();

    // Wait a bit and check that progress has incremented
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Should no longer be at 0%
    const percentageText = canvas.getByText(/%$/);
    const value = Number.parseInt(percentageText.textContent || "0");
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
    const status = progress === 0 ? "Not started" : progress === 100 ? "Complete!" : "In progress";

    return (
      <ArtifactProgress {...args}>
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Deployment Status</ArtifactProgressTitle>
          <ArtifactProgressDescription>
            {tasksComplete} of 15 tasks complete
          </ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={progress} />
        <ArtifactProgressFooter>{status}</ArtifactProgressFooter>
      </ArtifactProgress>
    );
  },
};

/**
 * Custom content padding
 * Uses auto-generated aria-label when visible content provides context
 */
export const CustomPadding: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Demonstrates custom padding on the progress bar. Uses auto-generated aria-label since the visible title provides context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check all elements are rendered
    await expect(canvas.getByText("Custom Padding")).toBeInTheDocument();
    await expect(canvas.getByText("With extra padding")).toBeInTheDocument();
    await expect(canvas.getByText("40%")).toBeInTheDocument();
    await expect(canvas.getByText("More space around progress")).toBeInTheDocument();

    // Find the content wrapper and verify it has custom padding classes
    const progressContent = canvasElement.querySelector(".px-8.py-8");
    expect(progressContent).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactProgress {...args}>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Custom Padding</ArtifactProgressTitle>
        <ArtifactProgressDescription>With extra padding</ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={40} className="px-8 py-8" />
      <ArtifactProgressFooter>More space around progress</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};
