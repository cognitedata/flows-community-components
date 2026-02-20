import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBrandGithub,
  IconBriefcase,
  IconChartLine,
  IconFileText,
  IconPhoto,
  IconWorld,
} from '@tabler/icons-react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Badge } from '@/components/ui/aura/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/aura/hover-card';
import { Source, Sources, SourcesTitle } from '@/components/ui/aura/sources';
const meta: Meta<typeof Sources> = {
  title: 'AI/Sources',
  component: Sources,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    title: {
      control: {
        type: 'select',
      },
      options: [undefined, true, false, 'Custom Title'],
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode | boolean',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Sources');
    await expect(title).toBeInTheDocument();
  },
};
export const NoTitle: Story = {
  render: () => (
    <Sources title={false}>
      <Source url="https://docs.example.com" title="Official Docs" />
      <Source url="https://api.example.com" title="API" />
    </Sources>
  ),
  parameters: {
    order: 2,
  },
};
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
  },
};
export const WithIcons: Story = {
  render: () => (
    <Sources>
      <Source
        url="https://github.com/example/repo"
        title="GitHub Repository"
        icon={IconBrandGithub}
      />
      <Source
        url="https://example.com/docs"
        title="Documentation"
        icon={IconFileText}
      />
      <Source url="https://example.com" title="Website" icon={IconWorld} />
    </Sources>
  ),
  parameters: {
    order: 4,
  },
};
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
  },
};
export const TooManySourcesWithOverflow: Story = {
  render: () => {
    const visibleSources = [
      {
        url: 'https://example.com/asset/21PT1019',
        title: '21PT1019',
        icon: IconChartLine,
      },
      {
        url: 'https://example.com/image/pumpB.jpg',
        title: 'This is a really long source to show how these items will wrap',
        icon: IconPhoto,
      },
      {
        url: 'https://example.com/docs/LER_13FI2418N.Y-1728.pdf',
        title: 'LER_13FI2418N.Y-1728.pdf',
        icon: IconFileText,
      },
      {
        url: 'https://example.com/work-order/120_oaoXR',
        title: '120_oaoXR',
        icon: IconBriefcase,
      },
      {
        url: 'https://example.com/docs/ORB_1901.pdf',
        title: 'ORB_1901.pdf',
        icon: IconBriefcase,
      },
    ];
    const overflowSources = [
      {
        url: 'https://example.com/7',
        title: 'Source 7',
      },
      {
        url: 'https://example.com/8',
        title: 'Source 8',
      },
      {
        url: 'https://example.com/9',
        title: 'Source 9',
      },
      {
        url: 'https://example.com/10',
        title: 'Source 10',
      },
    ];
    return (
      <Sources>
        {visibleSources.map((s) => (
          <Source key={s.url} url={s.url} title={s.title} icon={s.icon} />
        ))}
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger
            href="#sources-overflow"
            className="inline-flex cursor-default items-center"
            aria-label={`${overflowSources.length} more sources`}
            onClick={(event) => event.preventDefault()}
          >
            <Badge variant="secondary">+{overflowSources.length}</Badge>
          </HoverCardTrigger>
          <HoverCardContent
            className="w-auto p-3"
            data-testid="sources-overflow-hovercard"
          >
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sources')).toBeInTheDocument();
    await expect(canvas.getByText('21PT1019')).toBeInTheDocument();
    const overflowPill = canvas.getByText('+4');
    const hoverCardSelector = '[data-slot="hover-card-content"][data-open]';
    const waitForHoverCard = async () => {
      await waitFor(() => {
        const hovercard =
          canvasElement.ownerDocument.body.querySelector(hoverCardSelector);
        expect(hovercard).toBeTruthy();
      });
    };
    await userEvent.hover(overflowPill);
    try {
      await waitForHoverCard();
    } catch {
      await userEvent.unhover(overflowPill);
      await userEvent.hover(overflowPill);
      await waitForHoverCard();
    }
  },
};
export const SingleSource: Story = {
  render: () => (
    <Sources>
      <Source url="https://example.com/article" title="Relevant Article" />
    </Sources>
  ),
  parameters: {
    order: 7,
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Default</h3>
        <Sources>
          <Source url="https://example.com/1" title="Source 1" />
          <Source url="https://example.com/2" title="Source 2" />
        </Sources>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          No Title
        </h3>
        <Sources title={false}>
          <Source url="https://example.com/1" title="Source 1" />
          <Source url="https://example.com/2" title="Source 2" />
        </Sources>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Icons
        </h3>
        <Sources>
          <Source
            url="https://github.com"
            title="GitHub"
            icon={IconBrandGithub}
          />
        </Sources>
      </div>
    </div>
  ),
  parameters: {
    order: 8,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
