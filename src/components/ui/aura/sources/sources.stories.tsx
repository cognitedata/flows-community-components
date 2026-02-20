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

import { Badge } from '../badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../hover-card';

import { Source, Sources, SourcesTitle } from './sources';
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
      <Source url="https://cognite.test/docs" title="Documentation" />
      <Source url="https://cognite.test/api" title="API Reference" />
      <Source url="https://cognite.test/guide" title="Getting Started" />
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
      <Source url="https://cognite.test/docs" title="Official Docs" />
      <Source url="https://cognite.test/api" title="API" />
    </Sources>
  ),
  parameters: {
    order: 2,
  },
};
export const CustomTitle: Story = {
  render: () => (
    <Sources title={<SourcesTitle title="References" />}>
      <Source url="https://cognite.test/ref1" title="Reference 1" />
      <Source url="https://cognite.test/ref2" title="Reference 2" />
      <Source url="https://cognite.test/ref3" title="Reference 3" />
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
        url="https://cognite.test/github-repo"
        title="GitHub Repository"
        icon={IconBrandGithub}
      />
      <Source
        url="https://cognite.test/docs"
        title="Documentation"
        icon={IconFileText}
      />
      <Source url="https://cognite.test" title="Website" icon={IconWorld} />
    </Sources>
  ),
  parameters: {
    order: 4,
  },
};
export const ManySources: Story = {
  render: () => (
    <Sources>
      <Source url="https://cognite.test/1" title="React Documentation" />
      <Source url="https://cognite.test/2" title="TypeScript Handbook" />
      <Source url="https://cognite.test/3" title="MDN Web Docs" />
      <Source url="https://cognite.test/4" title="Stack Overflow" />
      <Source url="https://cognite.test/5" title="GitHub Issues" />
      <Source url="https://cognite.test/6" title="API Reference" />
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
        url: 'https://cognite.test/asset/21PT1019',
        title: '21PT1019',
        icon: IconChartLine,
      },
      {
        url: 'https://cognite.test/image/pumpB.jpg',
        title: 'This is a really long source to show how these items will wrap',
        icon: IconPhoto,
      },
      {
        url: 'https://cognite.test/docs/LER_13FI2418N.Y-1728.pdf',
        title: 'LER_13FI2418N.Y-1728.pdf',
        icon: IconFileText,
      },
      {
        url: 'https://cognite.test/work-order/120_oaoXR',
        title: '120_oaoXR',
        icon: IconBriefcase,
      },
      {
        url: 'https://cognite.test/docs/ORB_1901.pdf',
        title: 'ORB_1901.pdf',
        icon: IconBriefcase,
      },
    ];
    const overflowSources = [
      {
        url: 'https://cognite.test/7',
        title: 'Source 7',
      },
      {
        url: 'https://cognite.test/8',
        title: 'Source 8',
      },
      {
        url: 'https://cognite.test/9',
        title: 'Source 9',
      },
      {
        url: 'https://cognite.test/10',
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
            render={
              <Badge
                variant="secondary"
                className="cursor-default"
                render={
                  <button
                    type="button"
                    aria-label={`${overflowSources.length} more sources`}
                  />
                }
              >
                +{overflowSources.length}
              </Badge>
            }
          />
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Sources')).toBeInTheDocument();
    await expect(await canvas.findByText('21PT1019')).toBeInTheDocument();

    const overflowTrigger = await canvas.findByRole('button', {
      name: '4 more sources',
    });
    await userEvent.hover(overflowTrigger);
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText('4 more sources')).toBeInTheDocument();
      expect(body.getByText('Source 7')).toBeInTheDocument();
    });
  },
};
export const SingleSource: Story = {
  render: () => (
    <Sources>
      <Source url="https://cognite.test/article" title="Relevant Article" />
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
          <Source url="https://cognite.test/1" title="Source 1" />
          <Source url="https://cognite.test/2" title="Source 2" />
        </Sources>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          No Title
        </h3>
        <Sources title={false}>
          <Source url="https://cognite.test/1" title="Source 1" />
          <Source url="https://cognite.test/2" title="Source 2" />
        </Sources>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Icons
        </h3>
        <Sources>
          <Source
            url="https://cognite.test/github"
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
