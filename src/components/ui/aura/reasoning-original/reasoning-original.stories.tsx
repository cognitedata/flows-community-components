import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useState } from "react";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "./reasoning-original";

const meta: Meta<typeof Reasoning> = {
  title: "AI/Reasoning Original",
  component: Reasoning,
  tags: ["autodocs"],
  argTypes: {
    isStreaming: {
      control: "boolean",
      description: "Whether the reasoning is currently streaming",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the content is open by default",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    duration: {
      control: { type: "number", min: 0 },
      description: "Duration of the reasoning in milliseconds",
      table: {
        category: "Display",
        type: { summary: "number" },
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
      <ReasoningTrigger />
      <ReasoningContent>
        First, I need to understand what the user is asking for. They want to implement a sorting
        function. Let me consider the options: quicksort, mergesort, or the built-in sort. For most
        use cases, the built-in sort with a custom comparator is the best choice.
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default collapsible reasoning display with expandable content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Component should be visible
    const container = canvasElement.querySelector("[data-slot]");
    expect(container).toBeInTheDocument();
  },
};

/**
 * Streaming state.
 */
export const Streaming: Story = {
  render: () => (
    <Reasoning isStreaming>
      <ReasoningTrigger />
      <ReasoningContent>
        Analyzing the request to understand what approach would be best for this problem...
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning in streaming state with shimmer effect.",
      },
    },
  },
};

/**
 * With duration.
 */
export const WithDuration: Story = {
  render: () => (
    <Reasoning duration={3500}>
      <ReasoningTrigger />
      <ReasoningContent>
        This reasoning took 3.5 seconds to complete. The duration is displayed in the header when
        provided.
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning with duration display.",
      },
    },
  },
};

/**
 * Collapsed by default.
 */
export const CollapsedByDefault: Story = {
  render: () => (
    <Reasoning defaultOpen={false}>
      <ReasoningTrigger />
      <ReasoningContent>This content starts collapsed. Click to expand.</ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning that starts in collapsed state.",
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
 * Controlled state.
 */
export const Controlled: Story = {
  render: function ControlledReasoning() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
          >
            Expand
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
          >
            Collapse
          </button>
        </div>
        <Reasoning open={open} onOpenChange={setOpen}>
          <ReasoningTrigger />
          <ReasoningContent>This reasoning component has controlled open state.</ReasoningContent>
        </Reasoning>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Reasoning with controlled open state.",
      },
    },
  },
};

/**
 * Long content.
 */
export const LongContent: Story = {
  render: () => (
    <Reasoning>
      <ReasoningTrigger />
      <ReasoningContent>
        Let me break down this problem step by step. First, I need to understand the requirements.
        The user wants a function that can sort an array of numbers in ascending order. This seems
        straightforward, but there are several considerations. Second, I should evaluate the
        different sorting algorithms available. QuickSort has an average time complexity of O(n log
        n) but can degrade to O(n²) in worst case. MergeSort guarantees O(n log n) but requires
        additional memory. HeapSort is also O(n log n) and sorts in-place. Third, for JavaScript
        specifically, the built-in Array.sort() method is highly optimized and uses Timsort, which
        is a hybrid algorithm combining merge sort and insertion sort. It handles most real-world
        data very efficiently. Given these considerations, I recommend using the built-in sort with
        a custom comparator for numeric sorting, as (a, b) =&gt; a - b ensures correct numeric
        ordering instead of the default lexicographic sorting.
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning with longer content.",
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
      {/* Default open */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Open</h3>
        <Reasoning>
          <ReasoningTrigger />
          <ReasoningContent>Open reasoning content.</ReasoningContent>
        </Reasoning>
      </div>

      {/* Collapsed */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Collapsed</h3>
        <Reasoning defaultOpen={false}>
          <ReasoningTrigger />
          <ReasoningContent>Collapsed content.</ReasoningContent>
        </Reasoning>
      </div>

      {/* With duration */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Duration</h3>
        <Reasoning duration={2500}>
          <ReasoningTrigger />
          <ReasoningContent>Content with duration.</ReasoningContent>
        </Reasoning>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Reasoning for visual regression testing.",
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
    isStreaming: false,
    defaultOpen: true,
    duration: undefined,
  },
  render: (args) => (
    <Reasoning {...args}>
      <ReasoningTrigger />
      <ReasoningContent>
        Playground reasoning content. Toggle the controls to see different states.
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive reasoning example - use controls to experiment.",
      },
    },
  },
};
