import { Button } from "@/components/ui/aura/button";
import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Progress } from "./progress";
const meta: Meta<typeof Progress> = {
  title: "Primitives/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
      table: {
        category: "State",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "0",
        },
      },
    },
    max: {
      control: {
        type: "number",
        min: 1,
      },
      table: {
        category: "State",
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "100",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Display",
      },
    },
    "aria-label": {
      control: "text",
      table: {
        category: "Accessibility",
        type: {
          summary: "string",
        },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  render: () => <Progress value={50} className="w-96" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbar = canvas.getByRole("progressbar");
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAccessibleName("Progress: 50%");
    await expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    const indicator = canvasElement.querySelector('[data-slot="progress-indicator"]');
    await expect(indicator).toBeInTheDocument();
  },
};
export const CustomAriaLabel: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <div className="text-sm font-medium">Auto-generated label:</div>
        <Progress value={60} />
        <div className="text-xs text-muted-foreground">aria-label: "Progress: 60%"</div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Custom label:</div>
        <Progress value={60} aria-label="Document upload progress: 60%" />
        <div className="text-xs text-muted-foreground">
          aria-label: "Document upload progress: 60%"
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbars = canvas.getAllByRole("progressbar");
    await expect(progressbars).toHaveLength(2);
    await expect(progressbars[0]).toHaveAccessibleName("Progress: 60%");
    await expect(progressbars[1]).toHaveAccessibleName("Document upload progress: 60%");
    await expect(progressbars[0]).toHaveAttribute("aria-valuenow", "60");
    await expect(progressbars[1]).toHaveAttribute("aria-valuenow", "60");
  },
};
export const DifferentValues: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressbars = canvas.getAllByRole("progressbar");
    await expect(progressbars).toHaveLength(5);
    await expect(progressbars[0]).toHaveAttribute("aria-valuenow", "0");
    await expect(progressbars[1]).toHaveAttribute("aria-valuenow", "25");
    await expect(progressbars[2]).toHaveAttribute("aria-valuenow", "50");
    await expect(progressbars[3]).toHaveAttribute("aria-valuenow", "75");
    await expect(progressbars[4]).toHaveAttribute("aria-valuenow", "100");
    await expect(canvas.getByText("0% Complete")).toBeInTheDocument();
    await expect(canvas.getByText("25% Complete")).toBeInTheDocument();
    await expect(canvas.getByText("50% Complete")).toBeInTheDocument();
    await expect(canvas.getByText("75% Complete")).toBeInTheDocument();
    await expect(canvas.getByText("100% Complete")).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>0% Complete</span>
          <span className="text-muted-foreground">0%</span>
        </div>
        <Progress value={0} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>25% Complete</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>50% Complete</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>75% Complete</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>100% Complete</span>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};
export const WithLabel: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Files uploaded")).toBeInTheDocument();
    await expect(canvas.getByText("30%")).toBeInTheDocument();
    const progressbar = canvas.getByRole("progressbar", {
      name: "Files uploaded: 30%",
    });
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "30");
  },
  render: () => (
    <div className="space-y-2 w-96">
      <Label>Files uploaded</Label>
      <div className="flex items-center justify-between gap-2">
        <Progress value={30} className="flex-1" aria-label="Files uploaded: 30%" />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight whitespace-nowrap">
          30%
        </span>
      </div>
    </div>
  ),
};
export const Animated: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Loading...")).toBeInTheDocument();
    await waitFor(
      () => {
        const progressbar = canvas.getByRole("progressbar");
        expect(progressbar).toBeInTheDocument();
        const ariaValueNow = progressbar.getAttribute("aria-valuenow");
        expect(ariaValueNow).not.toBeNull();
        expect(Number.parseInt(ariaValueNow || "0")).toBeGreaterThanOrEqual(0);
      },
      {
        timeout: 1000,
      }
    );
    const progressbar = canvas.getByRole("progressbar");
    const initialValue = Number.parseInt(progressbar.getAttribute("aria-valuenow") || "0");
    await waitFor(
      () => {
        const currentValue = Number.parseInt(
          canvas.getByRole("progressbar").getAttribute("aria-valuenow") || "0"
        );
        expect(currentValue).toBeGreaterThan(initialValue);
      },
      {
        timeout: 1000,
      }
    );
    await expect(canvas.getByText("10%")).toBeInTheDocument();
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
      <div className="space-y-2 w-96">
        <div className="flex justify-between text-sm">
          <span>Loading...</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} aria-label={`Loading progress: ${progress}%`} />
      </div>
    );
  },
};
export const FileUpload: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Uploading document.pdf")).toBeInTheDocument();
    await expect(canvas.getByText("Uploading image.jpg")).toBeInTheDocument();
    await expect(canvas.getByText("Uploading video.mp4")).toBeInTheDocument();
    await expect(canvas.getByText("65%")).toBeInTheDocument();
    await expect(canvas.getByText("30%")).toBeInTheDocument();
    await expect(canvas.getByText("90%")).toBeInTheDocument();
    const progressbars = canvas.getAllByRole("progressbar");
    await expect(progressbars).toHaveLength(3);
    await expect(progressbars[0]).toHaveAttribute("aria-valuenow", "65");
    await expect(progressbars[1]).toHaveAttribute("aria-valuenow", "30");
    await expect(progressbars[2]).toHaveAttribute("aria-valuenow", "90");
  },
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading document.pdf</span>
          <span className="text-muted-foreground">65%</span>
        </div>
        <Progress value={65} aria-label="Upload progress for document.pdf: 65%" />
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
export const Interactive: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const incrementButton = canvas.getByRole("button", {
      name: /increment/i,
    });
    const decrementButton = canvas.getByRole("button", {
      name: /decrement/i,
    });
    const resetButton = canvas.getByRole("button", {
      name: /reset/i,
    });
    await expect(incrementButton).toBeInTheDocument();
    await expect(decrementButton).toBeInTheDocument();
    await expect(resetButton).toBeInTheDocument();
    const progressbar = canvas.getByRole("progressbar");
    await expect(canvas.getByText("50%")).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    await userEvent.click(incrementButton);
    await waitFor(
      () => {
        expect(progressbar).toHaveAttribute("aria-valuenow", "60");
        expect(canvas.getByText("60%")).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
    await userEvent.click(decrementButton);
    await waitFor(
      () => {
        expect(progressbar).toHaveAttribute("aria-valuenow", "50");
        expect(canvas.getByText("50%")).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
    await userEvent.click(resetButton);
    await waitFor(
      () => {
        expect(progressbar).toHaveAttribute("aria-valuenow", "0");
        expect(canvas.getByText("0%")).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
  },
  render: function InteractiveProgressStory() {
    const [progress, setProgress] = useState(50);
    return (
      <div className="space-y-4 w-96">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
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
export const Indeterminate: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Processing...")).toBeInTheDocument();
    await expect(canvas.getByText("—")).toBeInTheDocument();
    const progressbar = canvas.getByRole("progressbar", {
      name: "Processing progress",
    });
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "0");
  },
  render: () => (
    <div className="space-y-4 w-96">
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
export const Complete: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Upload complete")).toBeInTheDocument();
    await expect(canvas.getByText("100%")).toBeInTheDocument();
    const progressbar = canvas.getByRole("progressbar", {
      name: "Upload complete: 100%",
    });
    await expect(progressbar).toBeInTheDocument();
    await expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  },
  render: () => (
    <div className="space-y-2 w-96">
      <div className="flex justify-between text-sm">
        <span>Upload complete</span>
        <span className="text-muted-foreground">100%</span>
      </div>
      <Progress value={100} aria-label="Upload complete: 100%" />
    </div>
  ),
};
export const Multiple: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Task 1: Data processing")).toBeInTheDocument();
    await expect(canvas.getByText("Task 2: Image optimization")).toBeInTheDocument();
    await expect(canvas.getByText("Task 3: File compression")).toBeInTheDocument();
    await expect(canvas.getByText("Task 4: Finalization")).toBeInTheDocument();
    await expect(canvas.getByText("45%")).toBeInTheDocument();
    await expect(canvas.getByText("78%")).toBeInTheDocument();
    await expect(canvas.getByText("12%")).toBeInTheDocument();
    await expect(canvas.getByText("100%")).toBeInTheDocument();
    const progressbars = canvas.getAllByRole("progressbar");
    await expect(progressbars).toHaveLength(4);
    await expect(progressbars[0]).toHaveAttribute("aria-valuenow", "45");
    await expect(progressbars[1]).toHaveAttribute("aria-valuenow", "78");
    await expect(progressbars[2]).toHaveAttribute("aria-valuenow", "12");
    await expect(progressbars[3]).toHaveAttribute("aria-valuenow", "100");
  },
  render: () => (
    <div className="space-y-4 w-96">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 1: Data processing</span>
          <span className="text-muted-foreground">45%</span>
        </div>
        <Progress value={45} aria-label="Task 1: Data processing progress: 45%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 2: Image optimization</span>
          <span className="text-muted-foreground">78%</span>
        </div>
        <Progress value={78} aria-label="Task 2: Image optimization progress: 78%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 3: File compression</span>
          <span className="text-muted-foreground">12%</span>
        </div>
        <Progress value={12} aria-label="Task 3: File compression progress: 12%" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Task 4: Finalization</span>
          <span className="text-muted-foreground">100%</span>
        </div>
        <Progress value={100} aria-label="Task 4: Finalization progress: 100%" />
      </div>
    </div>
  ),
};
export const Playground: Story = {
  args: {
    value: 50,
    max: 100,
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <div className="flex items-center justify-center p-24">
      <div className="space-y-2 w-96">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="text-muted-foreground">{args.value}%</span>
        </div>
        <Progress {...args} />
      </div>
    </div>
  ),
};
