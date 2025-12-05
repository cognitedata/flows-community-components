'use client';

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationGroup,
  InlineCitationLink,
  InlineCitationSource,
  InlineCitationText,
} from '@/components/ui/aura/inline-citation';
import {
  Message,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
  IconHash,
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

const citation = {
  text: 'The technology continues to evolve rapidly, with new breakthroughs being announced regularly',
  sources: [
    {
      title: 'Advances in Natural Language Processing',
      url: 'https://example.com/nlp-advances',
      description:
        'A comprehensive study on the recent developments in natural language processing technologies and their applications.',
    },
    {
      title: 'Breakthroughs in Machine Learning',
      url: 'https://mlnews.org/breakthroughs',
      description:
        'An overview of the most significant machine learning breakthroughs in the past year.',
    },
    {
      title: 'AI in Healthcare: Current Trends',
      url: 'https://healthai.com/trends',
      description:
        'A report on how artificial intelligence is transforming healthcare and diagnostics.',
    },
  ],
};

function BasicCitationDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        According to recent studies, artificial intelligence has shown
        remarkable progress in natural language processing.{' '}
        <InlineCitation>
          <InlineCitationText>{citation.text}</InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger
              sources={citation.sources.map((source) => source.url)}
            />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselPrev />
                  <InlineCitationCarouselNext />
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  {citation.sources.map((source) => (
                    <InlineCitationCarouselItem key={source.url}>
                      <InlineCitationSource
                        description={source.description}
                        title={source.title}
                        url={source.url}
                      />
                    </InlineCitationCarouselItem>
                  ))}
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
        .
      </p>
    </div>
  );
}

function SingleSourceDemo() {
  const singleSource = {
    text: 'This is a significant achievement in the field',
    sources: [
      {
        title: 'Research Findings',
        url: 'https://example.com/research',
        description: 'Study findings on recent developments.',
      },
    ],
  };

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{' '}
        <InlineCitation>
          <InlineCitationText>{singleSource.text}</InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger
              sources={singleSource.sources.map((source) => source.url)}
              icon={IconFile}
            />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  {singleSource.sources.map((source) => (
                    <InlineCitationCarouselItem key={source.url}>
                      <InlineCitationSource
                        description={source.description}
                        title={source.title}
                        url={source.url}
                      />
                    </InlineCitationCarouselItem>
                  ))}
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
        .
      </p>
    </div>
  );
}

function LinkDemo() {
  return (
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
        high-load operations, which correlates with elevated bearing
        temperatures. Historical maintenance records indicate similar patterns
        preceded bearing failures in comparable equipment. The motor temperature
        has increased by 8°C over the same period, suggesting potential
        mechanical stress. We recommend immediate inspection and scheduling
        preventive maintenance to avoid unplanned downtime and potential
        equipment damage.
      </p>
    </div>
  );
}

function WithIconsDemo() {
  return (
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
  );
}

function InMessageDemo() {
  return (
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
            </InlineCitation>
            {' '}exceeded normal thresholds at 03:15. This correlates with a 12%
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
            <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

export const inlineCitationExamples: ComponentExamples = {
  'with-icons': {
    title: 'Link Citations with Icons',
    description:
      'Link Citations with icons and color variants for different source types',
    component: WithIconsDemo,
    difficulty: 'intermediate',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationGroup,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
} from '@tabler/icons-react';

export function WithIconsDemo() {
  return (
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
            variant="nordic"
          >
            Vibration Timeline
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/asset/pump-21PT1019"
            target="_blank"
            icon={IconHexagon}
            variant="aurora"
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
  );
}`,
  },

  'in-message': {
    title: 'In Message Context',
    description:
      'Inline citations within a conversation message showing both inline and grouped usage',
    component: InMessageDemo,
    difficulty: 'intermediate',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  Message,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  IconHash,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
} from '@tabler/icons-react';

export function InMessageDemo() {
  return (
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
            </InlineCitation>
            {' '}exceeded normal thresholds at 03:15. This correlates with a 12%
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
            <MessageAction size="icon-sm" label="Refresh" tooltip="Refresh">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}`,
  },

  link: {
    title: 'Link Citation',
    description: 'Citation with a simple link, no hover overlay',
    component: LinkDemo,
    difficulty: 'beginner',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';

export function LinkDemo() {
  return (
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
        high-load operations, which correlates with elevated bearing
        temperatures. Historical maintenance records indicate similar patterns
        preceded bearing failures in comparable equipment. The motor temperature
        has increased by 8°C over the same period, suggesting potential
        mechanical stress. We recommend immediate inspection and scheduling
        preventive maintenance to avoid unplanned downtime and potential
        equipment damage.
      </p>
    </div>
  );
}`,
  },

  basic: {
    title: 'Inline Citation',
    description: 'Citation with multiple sources in a carousel',
    component: BasicCitationDemo,
    difficulty: 'intermediate',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationSource,
  InlineCitationText,
} from '@/components/ui/aura/inline-citation';

const citation = {
  text: 'The technology continues to evolve rapidly, with new breakthroughs being announced regularly',
  sources: [
    {
      title: 'Advances in Natural Language Processing',
      url: 'https://example.com/nlp-advances',
      description:
        'A comprehensive study on the recent developments in natural language processing technologies and their applications.',
    },
    {
      title: 'Breakthroughs in Machine Learning',
      url: 'https://mlnews.org/breakthroughs',
      description:
        'An overview of the most significant machine learning breakthroughs in the past year.',
    },
    {
      title: 'AI in Healthcare: Current Trends',
      url: 'https://healthai.com/trends',
      description:
        'A report on how artificial intelligence is transforming healthcare and diagnostics.',
    },
  ],
};

export function BasicCitationDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        According to recent studies, artificial intelligence has shown remarkable
        progress in natural language processing.{' '}
        <InlineCitation>
          <InlineCitationText>{citation.text}</InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={citation.sources.map((source) => source.url)} />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselPrev />
                  <InlineCitationCarouselNext />
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  {citation.sources.map((source) => (
                    <InlineCitationCarouselItem key={source.url}>
                      <InlineCitationSource
                        description={source.description}
                        title={source.title}
                        url={source.url}
                      />
                    </InlineCitationCarouselItem>
                  ))}
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
        .
      </p>
    </div>
  );
}`,
  },

  single: {
    title: 'Single Source Citation',
    description: 'Citation with a single source reference',
    component: SingleSourceDemo,
    difficulty: 'beginner',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationSource,
} from '@/components/ui/aura/inline-citation';
import { IconFile } from '@tabler/icons-react';

export function SingleSourceDemo() {
  const singleSource = {
    text: 'This is a significant achievement in the field',
    sources: [
      {
        title: 'Research Findings',
        url: 'https://example.com/research',
        description: 'Study findings on recent developments.',
      },
    ],
  };

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{' '}
        <InlineCitation>
          <InlineCitationText>{singleSource.text}</InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger
              sources={singleSource.sources.map((source) => source.url)}
              icon={IconFile}
            />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  {singleSource.sources.map((source) => (
                    <InlineCitationCarouselItem key={source.url}>
                      <InlineCitationSource
                        description={source.description}
                        title={source.title}
                        url={source.url}
                      />
                    </InlineCitationCarouselItem>
                  ))}
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
        .
      </p>
    </div>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inlineCitationMeta = {
  name: 'Inline Citation',
  description:
    'A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.',
  importPath: '@/components/ui/aura/inline-citation',
};
