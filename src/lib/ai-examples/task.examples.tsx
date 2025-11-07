import {
  Task,
  TaskTrigger,
  TaskContent,
  TaskItem,
} from "@/components/ai-elements/task";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicTaskDemo() {
  return (
    <Task>
      <TaskTrigger title="Generated Files" />
      <TaskContent>
        <TaskItem>file1.tsx</TaskItem>
        <TaskItem>file2.css</TaskItem>
        <TaskItem>file3.json</TaskItem>
      </TaskContent>
    </Task>
  );
}

function CustomTaskDemo() {
  return (
    <Task>
      <TaskTrigger title="Analysis Steps">
        <div className="flex w-full cursor-pointer items-center gap-2 text-sm">
          <span>Custom trigger content</span>
        </div>
      </TaskTrigger>
      <TaskContent>
        <TaskItem>Step 1: Collect data</TaskItem>
        <TaskItem>Step 2: Analyse patterns</TaskItem>
        <TaskItem>Step 3: Generate report</TaskItem>
      </TaskContent>
    </Task>
  );
}

export const taskExamples: ComponentExamples = {
  basic: {
    title: "Basic Task",
    description: "Collapsible task list with items",
    component: BasicTaskDemo,
    difficulty: "beginner",
    code: `import {
  Task,
  TaskTrigger,
  TaskContent,
  TaskItem,
} from "@/components/ai-elements/cognite/task"

export function BasicTaskDemo() {
  return (
    <Task>
      <TaskTrigger title="Generated Files" />
      <TaskContent>
        <TaskItem>file1.tsx</TaskItem>
        <TaskItem>file2.css</TaskItem>
      </TaskContent>
    </Task>
  )
}`,
  },

  customTrigger: {
    title: "Custom Trigger",
    description: "Task with custom trigger content",
    component: CustomTaskDemo,
    difficulty: "intermediate",
    code: `import {
  Task,
  TaskTrigger,
  TaskContent,
  TaskItem,
} from "@/components/ai-elements/cognite/task"

export function CustomTaskDemo() {
  return (
    <Task>
      <TaskTrigger title="Custom Title">
        <div className="flex items-center gap-2">
          <span>Custom content</span>
        </div>
      </TaskTrigger>
      <TaskContent>
        <TaskItem>Item 1</TaskItem>
        <TaskItem>Item 2</TaskItem>
      </TaskContent>
    </Task>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const taskMeta = {
  name: "Task",
  description:
    "A collapsible task list component for displaying AI workflow progress, with status indicators and optional descriptions.",
  importPath: "@/components/ai-elements/cognite/task",
};
