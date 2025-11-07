"use client";

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
} from "@/components/ai-elements/inline-citation";
import {
  IconAt,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
  IconEye,
  IconCube,
} from "@tabler/icons-react";
import type { ComponentExamples } from "@/lib/component-examples/types";

const citation = {
  text: "The technology continues to evolve rapidly, with new breakthroughs being announced regularly",
  sources: [
    {
      title: "Advances in Natural Language Processing",
      url: "https://example.com/nlp-advances",
      description:
        "A comprehensive study on the recent developments in natural language processing technologies and their applications.",
    },
    {
      title: "Breakthroughs in Machine Learning",
      url: "https://mlnews.org/breakthroughs",
      description:
        "An overview of the most significant machine learning breakthroughs in the past year.",
    },
    {
      title: "AI in Healthcare: Current Trends",
      url: "https://healthai.com/trends",
      description:
        "A report on how artificial intelligence is transforming healthcare and diagnostics.",
    },
  ],
};

function BasicCitationDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        According to recent studies, artificial intelligence has shown
        remarkable progress in natural language processing.{" "}
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
    text: "This is a significant achievement in the field",
    sources: [
      {
        title: "Research Findings",
        url: "https://example.com/research",
        description: "Study findings on recent developments.",
      },
    ],
  };

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{" "}
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
        Recent research has demonstrated promising results.{" "}
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/research"
            target="_blank"
          />
        </InlineCitation>
        .
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
            url="https://example.com/image/image1.jpg"
            target="_blank"
            icon={IconPhoto}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/documentation.pdf"
            target="_blank"
            icon={IconFile}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/chart/timeline"
            target="_blank"
            icon={IconTimeline}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/asset/pump-123"
            target="_blank"
            icon={IconHexagon}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/event/maintenance-456"
            target="_blank"
            icon={IconCalendarEvent}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/sequence/sequence-789"
            target="_blank"
            icon={IconBrackets}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/work-order/wo-321"
            target="_blank"
            icon={IconBriefcase}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/observation/obs-654"
            target="_blank"
            icon={IconEye}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/3d/model-987"
            target="_blank"
            icon={IconCube}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/user/example"
            target="_blank"
            icon={IconAt}
          />
        </InlineCitation>
      </InlineCitationGroup>
    </div>
  );
}

export const inlineCitationExamples: ComponentExamples = {
  basic: {
    title: "Inline Citation",
    description: "Citation with multiple sources in a carousel",
    component: BasicCitationDemo,
    difficulty: "intermediate",
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
  InlineCitationText,
} from "@/components/ai-elements/cognite/inline-citation"

const citation = {
  text: "The technology continues to evolve rapidly, with new breakthroughs being announced regularly",
  sources: [
    {
      title: "Advances in Natural Language Processing",
      url: "https://example.com/nlp-advances",
      description:
        "A comprehensive study on the recent developments in natural language processing technologies and their applications.",
    },
    {
      title: "Breakthroughs in Machine Learning",
      url: "https://mlnews.org/breakthroughs",
      description:
        "An overview of the most significant machine learning breakthroughs in the past year.",
    },
    {
      title: "AI in Healthcare: Current Trends",
      url: "https://healthai.com/trends",
      description:
        "A report on how artificial intelligence is transforming healthcare and diagnostics.",
    },
  ],
}

export function BasicCitationDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        According to recent studies, artificial intelligence has shown remarkable
        progress in natural language processing.{" "}
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
  )
}`,
  },

  single: {
    title: "Single Source Citation",
    description: "Citation with a single source reference",
    component: SingleSourceDemo,
    difficulty: "beginner",
    code: `"use client"
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
} from "@/components/ai-elements/cognite/inline-citation"
import { IconFile } from "@tabler/icons-react"

export function SingleSourceDemo() {
  const source = {
    text: "This is a significant achievement in the field",
    sources: [
      {
        title: "Research Findings",
        url: "https://example.com/research",
        description: "Study findings on recent developments.",
      },
    ],
  }

  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{" "}
        <InlineCitation>
          <InlineCitationText>{source.text}</InlineCitationText>
          <InlineCitationCard>
            <InlineCitationCardTrigger
              sources={source.sources.map((s) => s.url)}
              icon={IconFile}
            />
            <InlineCitationCardBody>
              <InlineCitationCarousel>
                <InlineCitationCarouselHeader>
                  <InlineCitationCarouselIndex />
                </InlineCitationCarouselHeader>
                <InlineCitationCarouselContent>
                  {source.sources.map((s) => (
                    <InlineCitationCarouselItem key={s.url}>
                      <InlineCitationSource title={s.title} url={s.url} description={s.description} />
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
  )
}`,
  },

  link: {
    title: "Link Citation",
    description: "Citation with a simple link, no hover overlay",
    component: LinkDemo,
    difficulty: "beginner",
    code: `"use client"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"

export function LinkDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Recent research has demonstrated promising results.{" "}
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/research"
            target="_blank"
          />
        </InlineCitation>
        .
      </p>
    </div>
  )
}`,
  },

  "with-icons": {
    title: "Link Citations with Icons",
    description:
      "Link Citations with icons to represent different source types",
    component: WithIconsDemo,
    difficulty: "intermediate",
    code: `"use client"
import {
  InlineCitation,
  InlineCitationGroup,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import {
  IconAt,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
  IconEye,
  IconCube,
} from "@tabler/icons-react"

export function WithIconsDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <InlineCitationGroup>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/image/image1.jpg"
            target="_blank"
            icon={IconPhoto}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/documentation.pdf"
            target="_blank"
            icon={IconFile}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/chart/timeline"
            target="_blank"
            icon={IconTimeline}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/asset/pump-123"
            target="_blank"
            icon={IconHexagon}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/event/maintenance-456"
            target="_blank"
            icon={IconCalendarEvent}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/sequence/sequence-789"
            target="_blank"
            icon={IconBrackets}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/work-order/wo-321"
            target="_blank"
            icon={IconBriefcase}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/observation/obs-654"
            target="_blank"
            icon={IconEye}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/3d/model-987"
            target="_blank"
            icon={IconCube}
          />
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            url="https://example.com/user/example"
            target="_blank"
            icon={IconAt}
          />
        </InlineCitation>
      </InlineCitationGroup>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inlineCitationMeta = {
  name: "Inline Citation",
  description:
    "A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.",
  importPath: "@/components/ai-elements/cognite/inline-citation",
};
