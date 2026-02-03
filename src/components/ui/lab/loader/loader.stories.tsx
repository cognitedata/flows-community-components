import { Button } from "@cognite/aura/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Loader } from "./loader";

const meta: Meta<typeof Loader> = {
  title: "AI/Loader",
  component: Loader,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "number",
      description: "Size of the loader in pixels",
      table: {
        category: "Appearance",
        type: { summary: "number" },
        defaultValue: { summary: "16" },
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
};

export default meta;
type Story = StoryObj<typeof Loader>;

/**
 * Default loader.
 */
export const Default: Story = {
  render: () => <Loader />,
  parameters: {
    docs: {
      description: {
        story: "Default spinning loader.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const loader = canvasElement.querySelector(".animate-spin");
    await expect(loader).toBeInTheDocument();
  },
};

/**
 * Different sizes.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loader size={12} />
        <span className="text-xs text-muted-foreground">12px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={16} />
        <span className="text-xs text-muted-foreground">16px (default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} />
        <span className="text-xs text-muted-foreground">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={32} />
        <span className="text-xs text-muted-foreground">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={48} />
        <span className="text-xs text-muted-foreground">48px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader in different sizes.",
      },
    },
  },
};

/**
 * Loader in button.
 */
export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Loader size={16} />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <Loader size={16} />
        Please wait
      </Button>
      <Button variant="secondary" disabled>
        <Loader size={16} />
        Processing
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader used inside buttons to indicate loading state.",
      },
    },
  },
};

/**
 * Loader with text.
 */
export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Loader size={16} />
        <span className="text-sm">Loading...</span>
      </div>
      <div className="flex items-center gap-2">
        <Loader size={16} />
        <span className="text-sm text-muted-foreground">Please wait</span>
      </div>
      <div className="flex items-center gap-3">
        <Loader size={20} />
        <div>
          <p className="text-sm font-medium">Processing your request</p>
          <p className="text-xs text-muted-foreground">This may take a moment</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader displayed alongside text.",
      },
    },
  },
};

/**
 * Centered loader.
 */
export const Centered: Story = {
  render: () => (
    <div className="w-[300px] h-[200px] border rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader size={32} />
        <span className="text-sm text-muted-foreground">Loading content...</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader centered in a container.",
      },
    },
  },
};

/**
 * Loader in card.
 */
export const InCard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Data Loading</h3>
        <Loader size={16} />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader displayed in a card with skeleton content.",
      },
    },
  },
};

/**
 * Overlay loader.
 */
export const Overlay: Story = {
  render: () => (
    <div className="relative w-[300px] h-[200px] border rounded-lg">
      <div className="p-4">
        <h3 className="font-medium mb-2">Content Area</h3>
        <p className="text-sm text-muted-foreground">This content is being loaded or processed.</p>
      </div>
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Loader size={24} />
          <span className="text-sm">Saving...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader as an overlay on content.",
      },
    },
  },
};

/**
 * Custom colored loader.
 */
export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loader size={24} className="text-primary" />
      <Loader size={24} className="text-blue-500" />
      <Loader size={24} className="text-green-500" />
      <Loader size={24} className="text-yellow-500" />
      <Loader size={24} className="text-red-500" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader with custom colors using className.",
      },
    },
  },
};

/**
 * Inline loader.
 */
export const Inline: Story = {
  render: () => (
    <div className="space-y-2 text-sm">
      <p>
        Fetching data <Loader size={14} className="inline-block mx-1" /> please wait.
      </p>
      <p>
        Status: <Loader size={14} className="inline-block mx-1" /> Connecting...
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loader used inline within text.",
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
      {/* Sizes */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Sizes</h3>
        <div className="flex items-center gap-6">
          <Loader size={12} />
          <Loader size={16} />
          <Loader size={24} />
          <Loader size={32} />
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Colors</h3>
        <div className="flex items-center gap-6">
          <Loader size={20} />
          <Loader size={20} className="text-primary" />
          <Loader size={20} className="text-blue-500" />
          <Loader size={20} className="text-green-500" />
        </div>
      </div>

      {/* In button */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">In Button</h3>
        <Button disabled>
          <Loader size={16} />
          Loading
        </Button>
      </div>

      {/* With text */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Text</h3>
        <div className="flex items-center gap-2">
          <Loader size={16} />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
    chromatic: {
      // Animation makes snapshot unreliable, but show the states
      pauseAnimationAtEnd: true,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    size: 16,
  },
  render: (args) => <Loader {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with loader props.",
      },
    },
  },
};
