import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Reasoning, ReasoningContent, ReasoningHeader, ReasoningItem } from "./reasoning";

const meta: Meta<typeof Reasoning> = {
  title: "AI/Reasoning",
  component: Reasoning,
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
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Reasoning>;

/**
 * Default reasoning display.
 */
export const Default: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            First, I need to understand the problem by analyzing the input requirements.
          </p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            Then, I&apos;ll consider different approaches and evaluate their trade-offs.
          </p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            Finally, I&apos;ll select the most efficient solution and implement it.
          </p>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default reasoning component showing AI thought process.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const reasoning = canvasElement.querySelector(".flex.flex-col.gap-2");
    await expect(reasoning).toBeInTheDocument();
  },
};

/**
 * Single reasoning step.
 */
export const SingleStep: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader title="Thinking..." />
      <ReasoningContent>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            Analyzing the request to determine the best approach for solving this problem.
          </p>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning with a single step (no decorations).",
      },
    },
  },
};

/**
 * Custom header title.
 */
export const CustomTitle: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader title="Chain of Thought" />
      <ReasoningContent>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            Step 1: Parse the user&apos;s query to identify key requirements.
          </p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            Step 2: Retrieve relevant context from the knowledge base.
          </p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">
            Step 3: Synthesize the information into a coherent response.
          </p>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning with a custom header title.",
      },
    },
  },
};

/**
 * Detailed reasoning with longer content.
 */
export const DetailedReasoning: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Understanding the Problem</p>
            <p className="text-sm text-muted-foreground">
              The user wants to sort an array of numbers in ascending order. This is a classic
              algorithmic problem with multiple solutions.
            </p>
          </div>
        </ReasoningItem>
        <ReasoningItem>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Evaluating Options</p>
            <p className="text-sm text-muted-foreground">
              I can use: (1) Built-in sort method - simple but may not be fastest, (2) Quick sort -
              efficient average case O(n log n), (3) Merge sort - stable and guaranteed O(n log n).
            </p>
          </div>
        </ReasoningItem>
        <ReasoningItem>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Decision</p>
            <p className="text-sm text-muted-foreground">
              For this use case, the built-in sort with a comparison function is most appropriate as
              it balances simplicity with good performance.
            </p>
          </div>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Detailed reasoning with structured content in each step.",
      },
    },
  },
};

/**
 * Many reasoning steps.
 */
export const ManySteps: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Parsing the input query...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Identifying key entities...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Searching knowledge base...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Evaluating search results...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Ranking by relevance...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Composing final response...</p>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning with many steps showing the thought process.",
      },
    },
  },
};

/**
 * Custom header content.
 */
export const CustomHeader: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader>
        <span className="flex items-center gap-2">
          Thinking
          <span className="text-xs bg-muted px-1.5 py-0.5 rounded">3 steps</span>
        </span>
      </ReasoningHeader>
      <ReasoningContent>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">First step of reasoning...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Second step of reasoning...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Final step of reasoning...</p>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning with custom header content.",
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
      {/* Single step */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Step</h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <p className="text-sm text-muted-foreground">Single reasoning step.</p>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>

      {/* Multiple steps */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Multiple Steps</h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <p className="text-sm text-muted-foreground">First step.</p>
            </ReasoningItem>
            <ReasoningItem>
              <p className="text-sm text-muted-foreground">Second step.</p>
            </ReasoningItem>
            <ReasoningItem>
              <p className="text-sm text-muted-foreground">Third step.</p>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning components for visual regression testing.",
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
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Playground reasoning step 1...</p>
        </ReasoningItem>
        <ReasoningItem>
          <p className="text-sm text-muted-foreground">Playground reasoning step 2...</p>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive reasoning example.",
      },
    },
  },
};
