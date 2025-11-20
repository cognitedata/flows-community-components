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
  InlineCitationSource,
} from '@/components/ui/cognite/inline-citation';
import { IconAt, IconFile, IconPhoto, IconTimeline } from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

function CitationDemo() {
  const source = {
    url: 'https://example.com/research',
    title: 'Research Findings',
  };

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{' '}
        <InlineCitation>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={[source.url]} />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  <InlineCitationCarouselItem>
                    <InlineCitationSource
                      title={source.title}
                      url={source.url}
                    />
                  </InlineCitationCarouselItem>
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

function CitationsWithIconsDemo() {
  const sources = [
    {
      url: 'https://example.com/documentation.pdf',
      title: 'Documentation',
      icon: IconFile,
    },
    {
      url: 'https://example.com/image/image1.jpg',
      title: 'Image',
      icon: IconPhoto,
    },
    {
      url: 'https://example.com/user/example',
      title: 'User',
      icon: IconAt,
    },
    {
      url: 'https://example.com/chart/timeline',
      title: 'Timeline Chart',
      icon: IconTimeline,
    },
  ];

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        {sources.map((source) => (
          <InlineCitation key={source.url}>
            <InlineCitationCard>
              <InlineCitationCardTrigger
                sources={[source.url]}
                icon={source.icon}
              />
              <InlineCitationCardBody>
                <InlineCitationCarousel>
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselNext />
                    <InlineCitationCarouselIndex />
                  </InlineCitationCarouselHeader>
                  <InlineCitationCarouselContent>
                    <InlineCitationCarouselItem>
                      <InlineCitationSource
                        title={source.title}
                        url={source.url}
                      />
                    </InlineCitationCarouselItem>
                  </InlineCitationCarouselContent>
                </InlineCitationCarousel>
              </InlineCitationCardBody>
            </InlineCitationCard>
          </InlineCitation>
        ))}
      </p>
    </div>
  );
}

export const inlineCitationExamples: ComponentExamples = {
  citation: {
    title: 'Citation',
    description: 'Citation with a hover overlay',
    component: CitationDemo,
    difficulty: 'beginner',
    code: `"use client"
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
} from "@/components/ui/cognite/inline-citation"

export function CitationDemo() {
  const source = {
    url: "https://example.com/research",
    title: "Research Findings",
  }

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{" "}
        <InlineCitation>
          <InlineCitationCard>
            <InlineCitationCardTrigger sources={[source.url]} />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselPrev />
                  <InlineCitationCarouselNext />
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  <InlineCitationCarouselItem>
                    <InlineCitationSource title={source.title} url={source.url} />
                  </InlineCitationCarouselItem>
                </InlineCitationCarouselContent>
              </InlineCitationCarousel>
            </InlineCitationCardBody>
          </InlineCitationCard>
        </InlineCitation>
        .
      </p>
    </div>
  )
}`,
  },

  'with-icons': {
    title: 'Citations with Icons',
    description: 'Citations with icons to represent different source types',
    component: CitationsWithIconsDemo,
    difficulty: 'intermediate',
    code: `"use client"
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
} from "@/components/ui/cognite/inline-citation"
import {
  IconAt,
  IconFile,
  IconPhoto,
  IconTimeline,
} from "@tabler/icons-react"

export function CitationsWithIconsDemo() {
  const sources = [
    {
      url: "https://example.com/documentation.pdf",
      title: "Documentation",
      icon: IconFile,
    },
    {
      url: "https://example.com/image/image1.jpg",
      title: "Image",
      icon: IconPhoto,
    },
    {
      url: "https://example.com/user/example",
      title: "User",
      icon: IconAt,
    },
    {
      url: "https://example.com/chart/timeline",
      title: "Timeline Chart",
      icon: IconTimeline,
    },
  ]

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        {sources.map((source) => (
          <InlineCitation key={source.url}>
            <InlineCitationCard>
              <InlineCitationCardTrigger sources={[source.url]} icon={source.icon} />
              <InlineCitationCardBody>
                <InlineCitationCarousel>
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselNext />
                    <InlineCitationCarouselIndex />
                  </InlineCitationCarouselHeader>
                  <InlineCitationCarouselContent>
                    <InlineCitationCarouselItem>
                      <InlineCitationSource title={source.title} url={source.url} />
                    </InlineCitationCarouselItem>
                  </InlineCitationCarouselContent>
                </InlineCitationCarousel>
              </InlineCitationCardBody>
            </InlineCitationCard>
          </InlineCitation>
        ))}
      </p>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inlineCitationMeta = {
  name: 'Inline Citation',
  description:
    'A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.',
  importPath: '@/components/ui/cognite/inline-citation',
};
