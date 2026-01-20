import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import {
  Queue,
  QueueHeader,
  QueueContent,
  QueueItem,
  QueueItemIndicator,
  QueueItemContent,
  QueueList,
} from "./queue";

const meta: Meta<typeof Queue> = {
  title: "AI/Queue",
  component: Queue,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[350px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Queue>;

/**
 * Default queue.
 */
export const Default: Story = {
  render: () => (
    <Queue>
      <QueueHeader title="Task Queue" count={3} />
      <QueueContent>
        <QueueList>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator completed />
              <QueueItemContent completed>Install dependencies</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Build the project</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Run tests</QueueItemContent>
            </div>
          </QueueItem>
        </QueueList>
      </QueueContent>
    </Queue>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default collapsible queue with task items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText("Task Queue");
    await expect(header).toBeInTheDocument();
  },
};

/**
 * All completed.
 */
export const AllCompleted: Story = {
  render: () => (
    <Queue>
      <QueueHeader title="Completed Tasks" count={3} />
      <QueueContent>
        <QueueList>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator completed />
              <QueueItemContent completed>Parse user input</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator completed />
              <QueueItemContent completed>Search knowledge base</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator completed />
              <QueueItemContent completed>Generate response</QueueItemContent>
            </div>
          </QueueItem>
        </QueueList>
      </QueueContent>
    </Queue>
  ),
  parameters: {
    docs: {
      description: {
        story: "Queue with all tasks completed.",
      },
    },
  },
};

/**
 * All pending.
 */
export const AllPending: Story = {
  render: () => (
    <Queue>
      <QueueHeader title="Pending Tasks" count={4} />
      <QueueContent>
        <QueueList>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Analyze code structure</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Identify dependencies</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Generate documentation</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Create examples</QueueItemContent>
            </div>
          </QueueItem>
        </QueueList>
      </QueueContent>
    </Queue>
  ),
  parameters: {
    docs: {
      description: {
        story: "Queue with all tasks pending.",
      },
    },
  },
};

/**
 * Collapsed by default.
 */
export const CollapsedByDefault: Story = {
  render: () => (
    <Queue>
      <QueueHeader title="Collapsed Queue" count={2} />
      <QueueContent>
        <QueueList>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Task 1</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Task 2</QueueItemContent>
            </div>
          </QueueItem>
        </QueueList>
      </QueueContent>
    </Queue>
  ),
  parameters: {
    docs: {
      description: {
        story: "Queue that starts in collapsed state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to expand
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
  },
};

/**
 * Long queue.
 */
export const LongQueue: Story = {
  render: () => (
    <Queue>
      <QueueHeader title="Build Pipeline" count={8} />
      <QueueContent>
        <QueueList>
          {[
            { title: "Checkout repository", completed: true },
            { title: "Install dependencies", completed: true },
            { title: "Run linter", completed: true },
            { title: "Run type checker", completed: true },
            { title: "Build application", completed: false },
            { title: "Run unit tests", completed: false },
            { title: "Run integration tests", completed: false },
            { title: "Deploy to staging", completed: false },
          ].map((task, i) => (
            <QueueItem key={i}>
              <div className="flex items-center gap-2">
                <QueueItemIndicator completed={task.completed} />
                <QueueItemContent completed={task.completed}>{task.title}</QueueItemContent>
              </div>
            </QueueItem>
          ))}
        </QueueList>
      </QueueContent>
    </Queue>
  ),
  parameters: {
    docs: {
      description: {
        story: "Queue with many items showing a build pipeline.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Expanded with mixed status */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Mixed Status</h3>
        <Queue>
          <QueueHeader title="Tasks" count={3} />
          <QueueContent>
            <QueueList>
              <QueueItem>
                <div className="flex items-center gap-2">
                  <QueueItemIndicator completed />
                  <QueueItemContent completed>Done</QueueItemContent>
                </div>
              </QueueItem>
              <QueueItem>
                <div className="flex items-center gap-2">
                  <QueueItemIndicator />
                  <QueueItemContent>Pending</QueueItemContent>
                </div>
              </QueueItem>
            </QueueList>
          </QueueContent>
        </Queue>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Queue for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {},
  render: (args) => (
    <Queue {...args}>
      <QueueHeader title="Playground Queue" count={2} />
      <QueueContent>
        <QueueList>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Playground task 1</QueueItemContent>
            </div>
          </QueueItem>
          <QueueItem>
            <div className="flex items-center gap-2">
              <QueueItemIndicator />
              <QueueItemContent>Playground task 2</QueueItemContent>
            </div>
          </QueueItem>
        </QueueList>
      </QueueContent>
    </Queue>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive queue example.",
      },
    },
  },
};
