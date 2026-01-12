'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  InlineCitation,
  InlineCitationGroup,
  InlineCitationLink,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
} from './inline-citation';
import { Message, MessageContent } from './message';
import {
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
  IconHash,
} from '@tabler/icons-react';

const meta: Meta<typeof InlineCitation> = {
  title: 'AI/Inline Citation',
  component: InlineCitation,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof InlineCitation>;

/**
 * Basic link citation
 * Matches the link example from inline-citation.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic inline citation with a simple link. Tests that the citation link is rendered and clickable.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the citation link
    const link = canvas.getByRole('link', { name: /pump 21PT1019/i });
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute(
      'href',
      'https://cognite.com/assets/pump-21PT1019'
    );
    await expect(link).toHaveAttribute('target', '_blank');
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
        reveals a concerning trend in vibration patterns over the past 72 hours.
        The data shows a steady increase in amplitude, particularly during
        high-load operations.
      </p>
    </div>
  ),
};

/**
 * Link variants
 */
export const LinkVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Inline citation links with different color variants.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Check the{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/mountain"
            target="_blank"
            variant="mountain"
          >
            mountain variant
          </InlineCitationLink>
        </InlineCitation>
        ,{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/nordic"
            target="_blank"
            variant="nordic"
          >
            nordic variant
          </InlineCitationLink>
        </InlineCitation>
        , and{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/fjord"
            target="_blank"
            variant="fjord"
          >
            fjord variant
          </InlineCitationLink>
        </InlineCitation>
        .
      </p>
    </div>
  ),
};

/**
 * Link citations with icons
 * Matches the with-icons example from inline-citation.examples.tsx
 */
export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Link citations with icons and color variants for different source types. Tests hover interactions and icon rendering.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find citation links with icons
    const photoLink = canvas.getByRole('link', { name: /pumpB\.jpg/i });
    await expect(photoLink).toBeInTheDocument();

    const fileLink = canvas.getByRole('link', { name: /Maintenance Manual/i });
    await expect(fileLink).toBeInTheDocument();
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

/**
 * Citations in message context
 * Matches the in-message example from inline-citation.examples.tsx
 */
export const InMessage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Inline citations within a conversation message showing both inline and grouped usage.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col space-y-4 w-full gap-2 max-w-2xl">
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
        <MessageContent className="flex flex-col gap-2">
          <span>
            I analyzed the sensor data and found that vibration levels on{' '}
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
            exceeded normal thresholds at 03:15. This correlates with a 12%
            increase in RPM during that window.
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
        </MessageContent>
      </Message>
    </div>
  ),
};

/**
 * Hover card with single source
 */
export const WithHoverCard: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Citation with hover card showing source information. Tests hover interaction to reveal source details.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the citation trigger
    const trigger = canvas.getByText(/cognite\.com/i);
    await expect(trigger).toBeInTheDocument();

    // Hover over the trigger
    await userEvent.hover(trigger);

    // Wait for hover card to appear
    await waitFor(
      () => {
        const hoverCard = within(document.body).queryByText(
          'Pump Analysis Report'
        );
        expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        According to the{' '}
        <InlineCitationCard>
          <InlineCitation>
            <InlineCitationCardTrigger
              sources={['https://cognite.com/reports/pump-analysis']}
            />
          </InlineCitation>
          <InlineCitationCardBody>
            <InlineCitationSource
              title="Pump Analysis Report"
              url="https://cognite.com/reports/pump-analysis"
              description="Comprehensive analysis of pump performance metrics and vibration patterns over the past quarter."
            />
          </InlineCitationCardBody>
        </InlineCitationCard>
        , the equipment requires immediate attention.
      </p>
    </div>
  ),
};

/**
 * Hover card with multiple sources (carousel)
 */
export const WithCarousel: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Citation with hover card carousel showing multiple sources. Tests carousel navigation and source switching.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the citation trigger
    const trigger = canvas.getByText(/example\.com/i);
    await expect(trigger).toBeInTheDocument();

    // Hover over the trigger
    await userEvent.hover(trigger);

    // Wait for hover card to appear
    await waitFor(
      () => {
        const hoverCard = within(document.body).queryByText('Source 1');
        expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Find and click next button
    const nextButton = within(document.body).getByLabelText('Next');
    await userEvent.click(nextButton);

    // Wait for next source to appear
    await waitFor(
      () => {
        const source2 = within(document.body).queryByText('Source 2');
        expect(source2).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Multiple sources indicate{' '}
        <InlineCitationCard>
          <InlineCitation>
            <InlineCitationCardTrigger
              sources={[
                'https://example.com/source1',
                'https://example.com/source2',
                'https://example.com/source3',
              ]}
            />
          </InlineCitation>
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselContent>
                <InlineCitationCarouselItem>
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselIndex />
                    <InlineCitationCarouselNext />
                  </InlineCitationCarouselHeader>
                  <InlineCitationSource
                    title="Source 1"
                    url="https://example.com/source1"
                    description="First source with detailed information about the topic."
                  />
                </InlineCitationCarouselItem>
                <InlineCitationCarouselItem>
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselIndex />
                    <InlineCitationCarouselNext />
                  </InlineCitationCarouselHeader>
                  <InlineCitationSource
                    title="Source 2"
                    url="https://example.com/source2"
                    description="Second source providing additional context and details."
                  />
                </InlineCitationCarouselItem>
                <InlineCitationCarouselItem>
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselIndex />
                    <InlineCitationCarouselNext />
                  </InlineCitationCarouselHeader>
                  <InlineCitationSource
                    title="Source 3"
                    url="https://example.com/source3"
                    description="Third source with complementary information."
                  />
                </InlineCitationCarouselItem>
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
        .
      </p>
    </div>
  ),
};

/**
 * Citation with quote
 */
export const WithQuote: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Citation hover card with quoted text from the source.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        The report states{' '}
        <InlineCitationCard>
          <InlineCitation>
            <InlineCitationCardTrigger
              sources={['https://example.com/report']}
            />
          </InlineCitation>
          <InlineCitationCardBody>
            <InlineCitationSource
              title="Technical Report"
              url="https://example.com/report"
            >
              <InlineCitationQuote>
                The vibration levels have increased by 15% over the past month,
                indicating potential bearing wear that requires immediate
                attention.
              </InlineCitationQuote>
            </InlineCitationSource>
          </InlineCitationCardBody>
        </InlineCitationCard>
        .
      </p>
    </div>
  ),
};

/**
 * Multiple citations in text
 */
export const MultipleInText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple inline citations within a single paragraph of text.',
      },
    },
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
        reveals concerning trends. Historical data from{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/maintenance-log"
            target="_blank"
            variant="nordic"
          >
            maintenance logs
          </InlineCitationLink>
        </InlineCitation>{' '}
        shows similar patterns, and the{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/sensor-data"
            target="_blank"
            variant="mountain"
          >
            sensor readings
          </InlineCitationLink>
        </InlineCitation>{' '}
        confirm the findings.
      </p>
    </div>
  ),
};

/**
 * Long text with citations
 */
export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Citations within longer text content to demonstrate readability and integration.',
      },
    },
  },
  render: () => (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Our comprehensive analysis of{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://cognite.com/assets/pump-21PT1019"
            target="_blank"
            variant="fjord"
          >
            pump 21PT1019
          </InlineCitationLink>
        </InlineCitation>{' '}
        reveals a concerning trend in vibration patterns over the past 72 hours.
        The data shows a steady increase in amplitude, particularly during
        high-load operations, which correlates with elevated bearing
        temperatures. Historical maintenance records from{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/maintenance"
            target="_blank"
            variant="nordic"
          >
            previous maintenance cycles
          </InlineCitationLink>
        </InlineCitation>{' '}
        indicate similar patterns preceded bearing failures in comparable
        equipment. The motor temperature has increased by 8°C over the same
        period, suggesting potential mechanical stress. We recommend immediate
        inspection and scheduling preventive maintenance to avoid unplanned
        downtime and potential equipment damage.
      </p>
    </div>
  ),
};
