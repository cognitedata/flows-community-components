import { Badge } from "@/components/ui/aura/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/aura/hover-card";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import {
  IconBrandGithub,
  IconBriefcase,
  IconChartLine,
  IconFileText,
  IconPhoto,
  IconWorld,
} from "@tabler/icons-react";
import { Source, Sources, SourcesTitle } from "./sources";

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
      <div className="w-125">
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
export const Basic: Story = {
  render: () => (
    <Sources>
      <Source url="https://example.com/docs" title="Documentation" />
      <Source url="https://example.com/api" title="API Reference" />
      <Source url="https://example.com/guide" title="Getting Started" />
    </Sources>
  ),
  parameters: {
    order: 1,
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
 * Sources with title hidden.
 */
export const NoTitle: Story = {
  render: () => (
    <Sources title={false}>
      <Source url="https://docs.example.com" title="Official Docs" />
      <Source url="https://api.example.com" title="API" />
    </Sources>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Sources with the title section hidden.",
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
    order: 3,
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
    order: 4,
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
    order: 5,
    docs: {
      description: {
        story: "Sources with multiple items that wrap.",
      },
    },
  },
};

/**
 * Too many sources with overflow indicator and hover to reveal.
 * When there are many sources, show a subset and a "+ N" pill; hovering the pill
 * reveals the remaining sources in a hover card (like AvatarGroup).
 */
export const TooManySourcesWithOverflow: Story = {
  render: () => {
    const visibleSources = [
      {
        url: "https://example.com/asset/21PT1019",
        title: "21PT1019",
        icon: IconChartLine,
      },
      {
        url: "https://example.com/image/pumpB.jpg",
        title: "This is a really long source to show how these items will wrap",
        icon: IconPhoto,
      },
      {
        url: "https://example.com/docs/LER_13FI2418N.Y-1728.pdf",
        title: "LER_13FI2418N.Y-1728.pdf",
        icon: IconFileText,
      },
      {
        url: "https://example.com/work-order/120_oaoXR",
        title: "120_oaoXR",
        icon: IconBriefcase,
      },
      {
        url: "https://example.com/docs/ORB_1901.pdf",
        title: "ORB_1901.pdf",
        icon: IconBriefcase,
      },
    ];
    const overflowSources = [
      { url: "https://example.com/7", title: "Source 7" },
      { url: "https://example.com/8", title: "Source 8" },
      { url: "https://example.com/9", title: "Source 9" },
      { url: "https://example.com/10", title: "Source 10" },
    ];
    return (
      <Sources>
        {visibleSources.map((s) => (
          <Source key={s.url} url={s.url} title={s.title} icon={s.icon} />
        ))}
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <button
              type="button"
              className="inline-flex cursor-default items-center"
              aria-label={`${overflowSources.length} more sources`}
            >
              <Badge variant="secondary">+{overflowSources.length}</Badge>
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-auto p-3">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                {overflowSources.length} more sources
              </p>
              <ul className="flex flex-col gap-1.5">
                {overflowSources.map((s) => (
                  <li key={s.url}>
                    <Source url={s.url} title={s.title} />
                  </li>
                ))}
              </ul>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Sources>
    );
  },
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "When there are too many sources, show a subset with an overflow indicator (+ N). Hover the + N pill to reveal the remaining sources in a hover card, similar to AvatarGroup.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Sources")).toBeInTheDocument();
    await expect(canvas.getByText("21PT1019")).toBeInTheDocument();
    const overflowPill = canvas.getByRole("button", { name: "4 more sources" });
    await userEvent.hover(overflowPill);
    const hoverCard = await screen.findByRole("dialog");
    await expect(within(hoverCard).getByText("4 more sources")).toBeInTheDocument();
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
    order: 7,
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
    order: 8,
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
