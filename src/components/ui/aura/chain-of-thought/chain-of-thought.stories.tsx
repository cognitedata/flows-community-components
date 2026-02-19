import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { useState } from "react";
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtStep,
} from "./chain-of-thought";
const meta: Meta<typeof ChainOfThought> = {
  title: "AI/Chain of Thought",
  component: ChainOfThought,
  tags: ["autodocs", "ai-elements"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    open: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
      },
    },
    className: {
      control: "text",
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
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ChainOfThought>;
export const Default: Story = {
  render: () => (
    <ChainOfThought>
      <ChainOfThoughtHeader>Thinking...</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Analyzing the user's request to understand what they need.">
          Analyzing the user&apos;s request to understand what they need.
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Searching for relevant information in the codebase.">
          Searching for relevant information in the codebase.
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Formulating a response based on the gathered context.">
          Formulating a response based on the gathered context.
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("Thinking...");
    await userEvent.click(trigger);
  },
};
export const OpenByDefault: Story = {
  render: () => (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Reasoning Process</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Step 1: Parse the input to extract key requirements.">
          Step 1: Parse the input to extract key requirements.
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Step 2: Consider multiple approaches to solve the problem.">
          Step 2: Consider multiple approaches to solve the problem.
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Step 3: Select the most efficient solution.">
          Step 3: Select the most efficient solution.
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};
export const Controlled: Story = {
  render: function ControlledChainOfThought() {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
          >
            Expand
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
          >
            Collapse
          </button>
        </div>
        <ChainOfThought open={open} onOpenChange={setOpen}>
          <ChainOfThoughtHeader>Controlled Chain of Thought</ChainOfThoughtHeader>
          <ChainOfThoughtContent>
            <ChainOfThoughtStep label="This chain of thought is controlled externally.">
              This chain of thought is controlled externally.
            </ChainOfThoughtStep>
            <ChainOfThoughtStep label="Use the buttons above to expand or collapse.">
              Use the buttons above to expand or collapse.
            </ChainOfThoughtStep>
          </ChainOfThoughtContent>
        </ChainOfThought>
      </div>
    );
  },
};
export const DetailedSteps: Story = {
  render: () => (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Analyzing Code</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Understanding the Problem">
          <strong>Understanding the Problem:</strong> The user wants to implement a sorting function
          that handles edge cases like empty arrays and duplicates.
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Evaluating Algorithms">
          <strong>Evaluating Algorithms:</strong> QuickSort offers O(n log n) average case,
          MergeSort guarantees O(n log n) but uses more memory, and the built-in sort method is
          well-optimized for most cases.
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Implementation Decision">
          <strong>Implementation Decision:</strong> Recommending the built-in sort with a custom
          comparator for simplicity and maintainability.
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};
export const ManySteps: Story = {
  render: () => (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Extended Analysis</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Parsing user request...">
          Parsing user request...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Identifying key entities...">
          Identifying key entities...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Searching codebase for context...">
          Searching codebase for context...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Analyzing file dependencies...">
          Analyzing file dependencies...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Evaluating potential solutions...">
          Evaluating potential solutions...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Ranking solutions by efficiency...">
          Ranking solutions by efficiency...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Generating implementation plan...">
          Generating implementation plan...
        </ChainOfThoughtStep>
        <ChainOfThoughtStep label="Preparing final response...">
          Preparing final response...
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};
export const SingleStep: Story = {
  render: () => (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader>Quick Thought</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="The answer to this question is straightforward based on the documentation.">
          The answer to this question is straightforward based on the documentation.
        </ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Collapsed</h3>
        <ChainOfThought>
          <ChainOfThoughtHeader>Collapsed Thinking</ChainOfThoughtHeader>
          <ChainOfThoughtContent>
            <ChainOfThoughtStep label="Hidden content">Hidden content</ChainOfThoughtStep>
          </ChainOfThoughtContent>
        </ChainOfThought>
      </div>

      {}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Expanded</h3>
        <ChainOfThought defaultOpen>
          <ChainOfThoughtHeader>Expanded Thinking</ChainOfThoughtHeader>
          <ChainOfThoughtContent>
            <ChainOfThoughtStep label="First step">First step</ChainOfThoughtStep>
            <ChainOfThoughtStep label="Second step">Second step</ChainOfThoughtStep>
          </ChainOfThoughtContent>
        </ChainOfThought>
      </div>
    </div>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const Playground: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <ChainOfThought {...args}>
      <ChainOfThoughtHeader>Playground</ChainOfThoughtHeader>
      <ChainOfThoughtContent>
        <ChainOfThoughtStep label="Playground step 1">Playground step 1</ChainOfThoughtStep>
        <ChainOfThoughtStep label="Playground step 2">Playground step 2</ChainOfThoughtStep>
        <ChainOfThoughtStep label="Playground step 3">Playground step 3</ChainOfThoughtStep>
      </ChainOfThoughtContent>
    </ChainOfThought>
  ),
};
