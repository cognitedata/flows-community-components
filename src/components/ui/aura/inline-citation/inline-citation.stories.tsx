import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  IconBrackets,
  IconBriefcase,
  IconCalendarEvent,
  IconCopy,
  IconDownload,
  IconFile,
  IconHash,
  IconHexagon,
  IconPhoto,
  IconRefresh,
  IconTimeline,
  IconTool,
  IconWheel,
} from '@tabler/icons-react';

import { InlineCitation, InlineCitationGroup, InlineCitationLink } from './inline-citation';

import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
} from '@/components/ui/aura/message';
const meta: Meta<typeof InlineCitation> = {
  title: 'AI/Inline Citation',
  component: InlineCitation,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof InlineCitation>;
export const Default: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const citations = canvas.getAllByRole('link');
    await expect(citations).toHaveLength(7);
    const firstLink = citations[0];
    await expect(firstLink).toHaveAttribute('href', 'https://example.com/image/pumpB.jpg');
    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <InlineCitationGroup>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/image/pumpB.jpg"
            target="_blank"
            icon={IconPhoto}
            variant="nordic"
          >
            pumpB.jpg
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/documentation.pdf"
            target="_blank"
            icon={IconFile}
            variant="fjord"
          >
            Maintenance Manual
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/chart/vibration-timeline"
            target="_blank"
            icon={IconTimeline}
            variant="mountain"
          >
            Vibration Timeline
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/asset/pump-21PT1019"
            target="_blank"
            icon={IconHexagon}
            variant="nordic"
          >
            21PT1019
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/event/maintenance-2024-03"
            target="_blank"
            icon={IconCalendarEvent}
            variant="fjord"
          >
            March Maintenance
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/sequence/startup-seq"
            target="_blank"
            icon={IconBrackets}
            variant="nordic"
          >
            Startup Sequence
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/work-order/wo-5421"
            target="_blank"
            icon={IconBriefcase}
            variant="fjord"
          >
            WO-5421
          </InlineCitationLink>
        </InlineCitation>
      </InlineCitationGroup>
    </div>
  ),
};
export const LinkCitation: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: /pump 21PT1019/i,
    });
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', 'https://cognite.com/assets/pump-21PT1019');
    await expect(link).toHaveAttribute('target', '_blank');
    await userEvent.hover(link);
    await expect(link).toBeVisible();
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Our analysis of{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://cognite.com/assets/pump-21PT1019"
            target="_blank"
            variant="fjord"
          >
            pump 21PT1019
          </InlineCitationLink>
        </InlineCitation>{' '}
        reveals a concerning trend in vibration patterns over the past 72 hours. The data shows a
        steady increase in amplitude, particularly during high-load operations, which correlates
        with elevated bearing temperatures. Historical maintenance records indicate similar patterns
        preceded bearing failures in comparable equipment. The motor temperature has increased by
        8°C over the same period, suggesting potential mechanical stress. We recommend immediate
        inspection and scheduling preventive maintenance to avoid unplanned downtime and potential
        equipment damage.
      </p>
    </div>
  ),
};
export const InMessageContext: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');
    await expect(links.length).toBeGreaterThanOrEqual(4);
    const buttons = canvas.getAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(0);
  },
  render: () => (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          <span>
            There are abnormal vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/pump/21PT1019"
                target="_blank"
                icon={IconHash}
                variant="nordic"
              >
                21PT1019
              </InlineCitationLink>
            </InlineCitation>
          </span>
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <span>
            I analysed the sensor data and found that vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/pump/21PT1019"
                target="_blank"
                icon={IconHash}
                variant="nordic"
              >
                21PT1019
              </InlineCitationLink>
            </InlineCitation>{' '}
            exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during
            that window.
          </span>
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/documentation.pdf"
                target="_blank"
                icon={IconFile}
              >
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction
              size="icon-sm"
              label="Explain Tool Call(s)"
              tooltip="Explain Tool Call(s)"
            >
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  ),
};
export const InvalidUrls: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const citations = canvas.getAllByRole('link');
    await expect(citations.length).toBeGreaterThanOrEqual(3);
    const errorElements = canvas.queryAllByText(/error/i);
    await expect(errorElements.length).toBe(0);
  },
  render: () => (
    <div className="space-y-4 text-sm max-w-2xl">
      <p>
        Citations with invalid URLs should render gracefully:{' '}
        <InlineCitation>
          <InlineCitationLink href="not-a-valid-url" variant="fjord">
            Invalid URL
          </InlineCitationLink>
        </InlineCitation>{' '}
        <InlineCitation>
          <InlineCitationLink href="" variant="mountain">
            Empty URL
          </InlineCitationLink>
        </InlineCitation>{' '}
        <InlineCitation>
          <InlineCitationLink href="just-text" variant="nordic">
            No protocol
          </InlineCitationLink>
        </InlineCitation>{' '}
        <InlineCitation>
          <InlineCitationLink href="://missing-protocol" variant="fjord">
            Malformed
          </InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
};
export const LongUrls: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute(
      'href',
      'https://example.com/very/long/path/with/many/segments/and/query/parameters?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5'
    );
    await expect(link).toBeVisible();
  },
  render: () => (
    <div className="space-y-4 text-sm max-w-2xl">
      <p>
        Citation with very long URL:{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/very/long/path/with/many/segments/and/query/parameters?param1=value1&param2=value2&param3=value3&param4=value4&param5=value5"
            target="_blank"
            variant="fjord"
            icon={IconFile}
          >
            Long URL Document
          </InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
};
export const LongCitationText: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveTextContent(
      'This is a very long citation text that should not wrap to multiple lines'
    );
  },
  render: () => (
    <div className="space-y-4 text-sm max-w-2xl">
      <p>
        Citation with very long text:{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/document"
            target="_blank"
            variant="mountain"
            icon={IconFile}
          >
            This is a very long citation text that should not wrap to multiple lines
          </InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
};
export const ManyCitations: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const citations = canvas.getAllByRole('link');
    await expect(citations.length).toBeGreaterThan(10);
  },
  render: () => {
    const citations = [
      {
        text: 'pump-21PT1019',
        icon: IconHexagon,
        variant: 'nordic' as const,
      },
      {
        text: 'valve-34HV2201',
        icon: IconHexagon,
        variant: 'fjord' as const,
      },
      {
        text: 'compressor-C401',
        icon: IconHexagon,
        variant: 'mountain' as const,
      },
      {
        text: 'MaintenanceLog.pdf',
        icon: IconFile,
        variant: 'fjord' as const,
      },
      {
        text: 'sensor-TT1402',
        icon: IconHexagon,
        variant: 'nordic' as const,
      },
      {
        text: 'TimeSeries-72h',
        icon: IconTimeline,
        variant: 'mountain' as const,
      },
      {
        text: 'motor-M2019',
        icon: IconHexagon,
        variant: 'fjord' as const,
      },
      {
        text: 'InspectionReport.pdf',
        icon: IconFile,
        variant: 'nordic' as const,
      },
      {
        text: 'turbine-GT501',
        icon: IconHexagon,
        variant: 'mountain' as const,
      },
      {
        text: 'bearing-BRG-101',
        icon: IconHexagon,
        variant: 'fjord' as const,
      },
      {
        text: 'VibrationAnalysis.jpg',
        icon: IconPhoto,
        variant: 'nordic' as const,
      },
      {
        text: 'WO-2024-5421',
        icon: IconBriefcase,
        variant: 'mountain' as const,
      },
    ];
    return (
      <div className="space-y-4 text-sm max-w-2xl">
        <p className="leading-relaxed">
          The analysis references multiple assets and documentation:{' '}
          {citations.map((citation) => (
            <span key={citation.text}>
              <InlineCitation>
                <InlineCitationLink
                  href={`https://example.com/${citation.text}`}
                  target="_blank"
                  icon={citation.icon}
                  variant={citation.variant}
                >
                  {citation.text}
                </InlineCitationLink>
              </InlineCitation>{' '}
            </span>
          ))}
          All sources have been cross-referenced with the maintenance database.
        </p>
      </div>
    );
  },
};
export const ColorVariants: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const citations = canvas.getAllByRole('link');
    await expect(citations).toHaveLength(3);
  },
  render: () => (
    <div className="space-y-3">
      <p className="text-sm">
        Fjord variant (blue):{' '}
        <InlineCitation>
          <InlineCitationLink href="https://example.com" variant="fjord" icon={IconFile}>
            Fjord
          </InlineCitationLink>
        </InlineCitation>
      </p>
      <p className="text-sm">
        Mountain variant (green):{' '}
        <InlineCitation>
          <InlineCitationLink href="https://example.com" variant="mountain" icon={IconFile}>
            Mountain
          </InlineCitationLink>
        </InlineCitation>
      </p>
      <p className="text-sm">
        Nordic variant (purple):{' '}
        <InlineCitation>
          <InlineCitationLink href="https://example.com" variant="nordic" icon={IconFile}>
            Nordic
          </InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
};
export const LinkTargetAndIconVariants: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selfLink = canvas.getByRole('link', {
      name: /self target/i,
    });
    const blankLink = canvas.getByRole('link', {
      name: /blank target/i,
    });
    await expect(selfLink).toBeInTheDocument();
    await expect(selfLink).toHaveAttribute('href', '/local/report');
    await expect(selfLink).toHaveAttribute('target', '_self');
    await expect(selfLink).not.toHaveAttribute('rel');
    await expect(blankLink).toBeInTheDocument();
    await expect(blankLink).toHaveAttribute('href', 'https://example.com/remote/report');
    await expect(blankLink).toHaveAttribute('target', '_blank');
    await expect(blankLink).toHaveAttribute('rel', 'noopener noreferrer');
  },
  render: () => (
    <div className="space-y-3 text-sm max-w-2xl">
      <p>
        Local report (no icon, opens in same tab):{' '}
        <InlineCitation>
          <InlineCitationLink href="/local/report" target="_self">
            Self target
          </InlineCitationLink>
        </InlineCitation>
      </p>
      <p>
        Remote report (with icon, opens in new tab):{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/remote/report"
            target="_blank"
            icon={IconFile}
            variant="mountain"
          >
            Blank target
          </InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
};
