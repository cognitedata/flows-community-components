"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { useEffect, useState } from "react";
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
  tags: ["autodocs", "ai-elements"],
  argTypes: {
    className: {
      control: "text",
      table: {
        category: "Display",
      },
    },
    children: {
      control: false,
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
export const Basic: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Progress title");
    await expect(title).toBeInTheDocument();
    const description = canvas.getByText("8 of 12 tasks complete");
    await expect(description).toBeInTheDocument();
    const percentage = canvas.getByText("32%");
    await expect(percentage).toBeInTheDocument();
    const footer = canvas.getByText("On track for completion by Friday");
    await expect(footer).toBeInTheDocument();
  },
  render: () => (
    <ArtifactProgress className="w-96">
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Progress title</ArtifactProgressTitle>
        <ArtifactProgressDescription>8 of 12 tasks complete</ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={32} />
      <ArtifactProgressFooter>On track for completion by Friday</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};
export const CustomStyling: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Custom Styled Title");
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveClass("text-lg");
    const description = canvas.getByText("Custom description styling");
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveClass("text-xs", "italic");
    const percentage = canvas.getByText("75%");
    await expect(percentage).toBeInTheDocument();
  },
  render: () => (
    <ArtifactProgress className="w-96">
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
export const CustomAriaLabel: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Auto-generated label")).toBeInTheDocument();
    await expect(canvas.getByText("Custom label")).toBeInTheDocument();
    const progressBars = canvas.getAllByRole("progressbar");
    await expect(progressBars).toHaveLength(2);
    await expect(progressBars[1]).toHaveAccessibleName("Document upload progress: 60%");
  },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <ArtifactProgress>
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Auto-generated label</ArtifactProgressTitle>
          <ArtifactProgressDescription>Uses default aria-label</ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={60} />
        <ArtifactProgressFooter className="text-xs text-muted-foreground">
          aria-label: "Progress: 60%"
        </ArtifactProgressFooter>
      </ArtifactProgress>

      <ArtifactProgress>
        <ArtifactProgressHeader>
          <ArtifactProgressTitle>Custom label</ArtifactProgressTitle>
          <ArtifactProgressDescription>Provides specific context</ArtifactProgressDescription>
        </ArtifactProgressHeader>
        <ArtifactProgressBar value={60} aria-label="Document upload progress: 60%" />
        <ArtifactProgressFooter className="text-xs text-muted-foreground">
          aria-label: "Document upload progress: 60%"
        </ArtifactProgressFooter>
      </ArtifactProgress>
    </div>
  ),
};
export const ProgressValues: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("0%")).toBeInTheDocument();
    await expect(canvas.getByText("50%")).toBeInTheDocument();
    await expect(canvas.getByText("90%")).toBeInTheDocument();
    await expect(canvas.getByText("100%")).toBeInTheDocument();
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
export const WithoutFooter: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Data Processing")).toBeInTheDocument();
    await expect(canvas.getByText("Processing 450 of 1000 records")).toBeInTheDocument();
    await expect(canvas.getByText("45%")).toBeInTheDocument();
    const container = canvasElement;
    expect(container.textContent).not.toContain("On track");
  },
  render: () => (
    <ArtifactProgress className="w-96">
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Data Processing</ArtifactProgressTitle>
        <ArtifactProgressDescription>Processing 450 of 1000 records</ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={45} />
    </ArtifactProgress>
  ),
};
export const WithoutHeader: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("67%")).toBeInTheDocument();
    await expect(canvas.getByText("Upload in progress")).toBeInTheDocument();
    const container = canvasElement;
    expect(container.textContent).not.toContain("Progress title");
  },
  render: () => (
    <ArtifactProgress className="w-96">
      <ArtifactProgressBar value={67} aria-label="File upload progress: 67%" />
      <ArtifactProgressFooter>Upload in progress</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};
export const Minimal: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("55%")).toBeInTheDocument();
    const container = canvasElement;
    expect(container.textContent).not.toContain("Progress title");
    expect(container.textContent).not.toContain("On track");
  },
  render: () => (
    <ArtifactProgress className="w-96">
      <ArtifactProgressBar value={55} />
    </ArtifactProgress>
  ),
};
export const Interactive: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Deployment Status")).toBeInTheDocument();
    await expect(canvas.getByText("0%")).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const percentageText = canvas.getByText(/%$/);
    const value = Number.parseInt(percentageText.textContent || "0");
    expect(value).toBeGreaterThan(0);
  },
  render: function InteractiveProgressStory() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
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
    }, []);
    const tasksComplete = Math.floor((progress / 100) * 15);
    const status = progress === 0 ? "Not started" : progress === 100 ? "Complete!" : "In progress";
    return (
      <ArtifactProgress className="w-96">
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
export const CustomPadding: Story = {
  args: {
    className: "w-96",
  },
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Custom Padding")).toBeInTheDocument();
    await expect(canvas.getByText("With extra padding")).toBeInTheDocument();
    await expect(canvas.getByText("40%")).toBeInTheDocument();
    await expect(canvas.getByText("More space around progress")).toBeInTheDocument();
    const progressContent = canvasElement.querySelector(".px-8.py-8");
    expect(progressContent).toBeInTheDocument();
  },
  render: () => (
    <ArtifactProgress className="w-96">
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Custom Padding</ArtifactProgressTitle>
        <ArtifactProgressDescription>With extra padding</ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressBar value={40} className="px-8 py-8" />
      <ArtifactProgressFooter>More space around progress</ArtifactProgressFooter>
    </ArtifactProgress>
  ),
};
