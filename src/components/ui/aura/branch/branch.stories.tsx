import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useState } from "react";
import { Branch, BranchMessages, BranchMessage, BranchNavigation } from "./branch";
import { Message, MessageContent, MessageAvatar } from "@/components/ui/aura/message";

const meta: Meta<typeof Branch> = {
  title: "AI/Branch",
  component: Branch,
  tags: ["autodocs"],
  argTypes: {
    defaultBranch: {
      control: { type: "number", min: 0 },
      description: "Default branch index to display",
      table: {
        category: "Behavior",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
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
      <div
        className="w-[500px]"
        style={{ "--message-content-max-width": "400px" } as React.CSSProperties}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Branch>;

/**
 * Default branch navigation.
 */
export const Default: Story = {
  render: () => (
    <Branch>
      <BranchNavigation />
      <BranchMessages>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>This is the first branch response.</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>This is the second branch response with different content.</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>This is the third branch response with even more variation.</p>
            </MessageContent>
          </Message>
        </BranchMessage>
      </BranchMessages>
    </Branch>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default branch navigation for switching between response variants.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find navigation buttons
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  },
};

/**
 * Two branches.
 */
export const TwoBranches: Story = {
  render: () => (
    <Branch>
      <BranchNavigation />
      <BranchMessages>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>First response: Use the built-in Array.sort() method.</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Alternative response: Implement a custom quicksort algorithm.</p>
            </MessageContent>
          </Message>
        </BranchMessage>
      </BranchMessages>
    </Branch>
  ),
  parameters: {
    docs: {
      description: {
        story: "Branch with two response options.",
      },
    },
  },
};

/**
 * Start on second branch.
 */
export const StartOnSecond: Story = {
  render: () => (
    <Branch defaultBranch={1}>
      <BranchNavigation />
      <BranchMessages>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Branch A</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Branch B (starting branch)</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Branch C</p>
            </MessageContent>
          </Message>
        </BranchMessage>
      </BranchMessages>
    </Branch>
  ),
  parameters: {
    docs: {
      description: {
        story: "Branch starting on a non-first branch.",
      },
    },
  },
};

/**
 * With change callback.
 */
export const WithCallback: Story = {
  render: function BranchWithCallback() {
    const [currentBranch, setCurrentBranch] = useState(0);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Current branch: <strong>{currentBranch + 1}</strong>
        </p>
        <Branch onBranchChange={setCurrentBranch}>
          <BranchNavigation />
          <BranchMessages>
            <BranchMessage>
              <Message isResponse={true}>
                <MessageAvatar name="AI" />
                <MessageContent>
                  <p>Option 1: Simple approach</p>
                </MessageContent>
              </Message>
            </BranchMessage>
            <BranchMessage>
              <Message isResponse={true}>
                <MessageAvatar name="AI" />
                <MessageContent>
                  <p>Option 2: Advanced approach</p>
                </MessageContent>
              </Message>
            </BranchMessage>
          </BranchMessages>
        </Branch>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Branch with callback to track changes.",
      },
    },
  },
};

/**
 * Navigation interaction.
 */
export const NavigationInteraction: Story = {
  render: () => (
    <Branch>
      <BranchNavigation />
      <BranchMessages>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Click the arrows to navigate between branches!</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>You found the second branch! Keep navigating.</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>This is the third and final branch. It wraps around!</p>
            </MessageContent>
          </Message>
        </BranchMessage>
      </BranchMessages>
    </Branch>
  ),
  parameters: {
    docs: {
      description: {
        story: "Click navigation arrows to cycle through branches.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Navigate forward
    const buttons = canvas.getAllByRole("button");
    const nextButton = buttons[buttons.length - 1]; // Last button is typically next
    await userEvent.click(nextButton);
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Default</h3>
        <Branch>
          <BranchNavigation />
          <BranchMessages>
            <BranchMessage>
              <Message isResponse={true}>
                <MessageAvatar name="AI" />
                <MessageContent>
                  <p>Branch 1</p>
                </MessageContent>
              </Message>
            </BranchMessage>
            <BranchMessage>
              <Message isResponse={true}>
                <MessageAvatar name="AI" />
                <MessageContent>
                  <p>Branch 2</p>
                </MessageContent>
              </Message>
            </BranchMessage>
          </BranchMessages>
        </Branch>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Branch for visual regression testing.",
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
    defaultBranch: 0,
  },
  render: (args) => (
    <Branch {...args}>
      <BranchNavigation />
      <BranchMessages>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Playground branch 1</p>
            </MessageContent>
          </Message>
        </BranchMessage>
        <BranchMessage>
          <Message isResponse={true}>
            <MessageAvatar name="AI" />
            <MessageContent>
              <p>Playground branch 2</p>
            </MessageContent>
          </Message>
        </BranchMessage>
      </BranchMessages>
    </Branch>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive branch example.",
      },
    },
  },
};
