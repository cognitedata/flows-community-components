import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { Task, TaskTrigger, TaskContent, TaskItem, TaskItemFile } from "./task";
import { IconCheck, IconFile } from "@tabler/icons-react";

const meta: Meta<typeof Task> = {
  title: "AI/Task",
  component: Task,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Whether the task content is open by default",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
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
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Task>;

/**
 * Default task.
 */
export const Default: Story = {
  render: () => (
    <Task>
      <TaskTrigger title="Searching project files" />
      <TaskContent>
        <TaskItem>Found 3 relevant files</TaskItem>
        <TaskItem>
          <TaskItemFile>
            <IconFile className="size-3" />
            src/components/Button.tsx
          </TaskItemFile>
        </TaskItem>
        <TaskItem>
          <TaskItemFile>
            <IconFile className="size-3" />
            src/utils/helpers.ts
          </TaskItemFile>
        </TaskItem>
      </TaskContent>
    </Task>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default collapsible task with search results.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("Searching project files");
    await expect(trigger).toBeInTheDocument();
  },
};

/**
 * Collapsed by default.
 */
export const CollapsedByDefault: Story = {
  render: () => (
    <Task defaultOpen={false}>
      <TaskTrigger title="Analyzing code structure" />
      <TaskContent>
        <TaskItem>Analyzed 15 files</TaskItem>
        <TaskItem>Found 3 potential improvements</TaskItem>
      </TaskContent>
    </Task>
  ),
  parameters: {
    docs: {
      description: {
        story: "Task that starts collapsed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Content should be hidden initially
    const trigger = canvas.getByText("Analyzing code structure");

    // Click to expand
    await userEvent.click(trigger);

    // Content should be visible now
    const content = canvas.getByText("Analyzed 15 files");
    await expect(content).toBeInTheDocument();
  },
};

/**
 * Multiple file results.
 */
export const MultipleFiles: Story = {
  render: () => (
    <Task>
      <TaskTrigger title="Reading configuration files" />
      <TaskContent>
        <TaskItem>Configuration files found:</TaskItem>
        <TaskItem>
          <TaskItemFile>
            <IconFile className="size-3" />
            tsconfig.json
          </TaskItemFile>
        </TaskItem>
        <TaskItem>
          <TaskItemFile>
            <IconFile className="size-3" />
            package.json
          </TaskItemFile>
        </TaskItem>
        <TaskItem>
          <TaskItemFile>
            <IconFile className="size-3" />
            vite.config.ts
          </TaskItemFile>
        </TaskItem>
        <TaskItem>
          <TaskItemFile>
            <IconFile className="size-3" />
            eslint.config.js
          </TaskItemFile>
        </TaskItem>
      </TaskContent>
    </Task>
  ),
  parameters: {
    docs: {
      description: {
        story: "Task showing multiple file results.",
      },
    },
  },
};

/**
 * Task with status.
 */
export const WithStatus: Story = {
  render: () => (
    <Task>
      <TaskTrigger title="Installing dependencies" />
      <TaskContent>
        <TaskItem className="flex items-center gap-2">
          <IconCheck className="size-4 text-green-500" />
          <span>react@18.2.0 installed</span>
        </TaskItem>
        <TaskItem className="flex items-center gap-2">
          <IconCheck className="size-4 text-green-500" />
          <span>typescript@5.0.0 installed</span>
        </TaskItem>
        <TaskItem className="flex items-center gap-2">
          <IconCheck className="size-4 text-green-500" />
          <span>tailwindcss@3.4.0 installed</span>
        </TaskItem>
      </TaskContent>
    </Task>
  ),
  parameters: {
    docs: {
      description: {
        story: "Task with status indicators.",
      },
    },
  },
};

/**
 * Multiple tasks.
 */
export const MultipleTasks: Story = {
  render: () => (
    <div className="space-y-4">
      <Task defaultOpen={false}>
        <TaskTrigger title="Step 1: Parsing input" />
        <TaskContent>
          <TaskItem>Parsed user query successfully</TaskItem>
        </TaskContent>
      </Task>
      <Task defaultOpen={false}>
        <TaskTrigger title="Step 2: Searching codebase" />
        <TaskContent>
          <TaskItem>Found 5 relevant files</TaskItem>
        </TaskContent>
      </Task>
      <Task>
        <TaskTrigger title="Step 3: Generating response" />
        <TaskContent>
          <TaskItem>Creating response based on context...</TaskItem>
        </TaskContent>
      </Task>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple sequential tasks.",
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
      {/* Expanded */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Expanded</h3>
        <Task>
          <TaskTrigger title="Expanded task" />
          <TaskContent>
            <TaskItem>Task content item</TaskItem>
            <TaskItem>
              <TaskItemFile>file.tsx</TaskItemFile>
            </TaskItem>
          </TaskContent>
        </Task>
      </div>

      {/* Collapsed */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Collapsed</h3>
        <Task defaultOpen={false}>
          <TaskTrigger title="Collapsed task" />
          <TaskContent>
            <TaskItem>Hidden content</TaskItem>
          </TaskContent>
        </Task>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tasks for visual regression testing.",
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
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Task {...args}>
      <TaskTrigger title="Playground task" />
      <TaskContent>
        <TaskItem>Playground task content</TaskItem>
        <TaskItem>
          <TaskItemFile>example-file.ts</TaskItemFile>
        </TaskItem>
      </TaskContent>
    </Task>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive task example - toggle defaultOpen to change initial state.",
      },
    },
  },
};
