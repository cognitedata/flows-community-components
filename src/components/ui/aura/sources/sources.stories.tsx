import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import { Sources, Source, SourcesTitle } from "./sources";
import { IconBrandGithub, IconFileText, IconWorld } from "@tabler/icons-react";

const meta: Meta<typeof Sources> = {
  title: "AI/Sources",
  component: Sources,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "select" },
      options: [undefined, true, false, "Custom Title"],
      description: "Title above the sources list",
      table: {
        category: "Content",
        type: { summary: "ReactNode | boolean" },
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
type Story = StoryObj<typeof Sources>;

/**
 * Default sources display.
 */
export const Default: Story = {
  render: () => (
    <Sources>
      <Source url="https://example.com/docs" title="Documentation" />
      <Source url="https://example.com/api" title="API Reference" />
      <Source url="https://example.com/guide" title="Getting Started" />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default sources component with default title.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText("Sources");
    await expect(title).toBeInTheDocument();
  },
};

/**
 * Sources without title.
 */
export const WithoutTitle: Story = {
  render: () => (
    <Sources title={false}>
      <Source url="https://docs.example.com" title="Official Docs" />
      <Source url="https://api.example.com" title="API" />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sources without the title section.",
      },
    },
  },
};

/**
 * Custom title.
 */
export const CustomTitle: Story = {
  render: () => (
    <Sources title={<SourcesTitle title="References" />}>
      <Source url="https://example.com/ref1" title="Reference 1" />
      <Source url="https://example.com/ref2" title="Reference 2" />
      <Source url="https://example.com/ref3" title="Reference 3" />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sources with a custom title.",
      },
    },
  },
};

/**
 * Sources with icons.
 */
export const WithIcons: Story = {
  render: () => (
    <Sources>
      <Source
        url="https://github.com/example/repo"
        title="GitHub Repository"
        icon={IconBrandGithub}
      />
      <Source url="https://example.com/docs" title="Documentation" icon={IconFileText} />
      <Source url="https://example.com" title="Website" icon={IconWorld} />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sources with custom icons.",
      },
    },
  },
};

/**
 * Many sources.
 */
export const ManySources: Story = {
  render: () => (
    <Sources>
      <Source url="https://example.com/1" title="React Documentation" />
      <Source url="https://example.com/2" title="TypeScript Handbook" />
      <Source url="https://example.com/3" title="MDN Web Docs" />
      <Source url="https://example.com/4" title="Stack Overflow" />
      <Source url="https://example.com/5" title="GitHub Issues" />
      <Source url="https://example.com/6" title="API Reference" />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sources with multiple items that wrap.",
      },
    },
  },
};

/**
 * Single source.
 */
export const SingleSource: Story = {
  render: () => (
    <Sources>
      <Source url="https://example.com/article" title="Relevant Article" />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sources with a single item.",
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
      {/* Default */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Default</h3>
        <Sources>
          <Source url="https://example.com/1" title="Source 1" />
          <Source url="https://example.com/2" title="Source 2" />
        </Sources>
      </div>

      {/* Without title */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">No Title</h3>
        <Sources title={false}>
          <Source url="https://example.com/1" title="Source 1" />
          <Source url="https://example.com/2" title="Source 2" />
        </Sources>
      </div>

      {/* With icons */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <Sources>
          <Source url="https://github.com" title="GitHub" icon={IconBrandGithub} />
        </Sources>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Sources for visual regression testing.",
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
    <Sources>
      <Source url="https://example.com/playground1" title="Playground Source 1" />
      <Source url="https://example.com/playground2" title="Playground Source 2" />
    </Sources>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive sources example.",
      },
    },
  },
};
