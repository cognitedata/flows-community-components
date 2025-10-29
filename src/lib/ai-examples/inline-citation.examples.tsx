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
  InlineCitationSource,
  InlineCitationText,
} from "@/components/ai-elements/cognite/inline-citation";
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
    <p className="text-sm leading-relaxed max-w-2xl">
      According to recent studies, artificial intelligence has shown remarkable
      progress in natural language processing.{" "}
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
    <p className="text-sm leading-relaxed max-w-2xl">
      Recent research has demonstrated promising results.{" "}
      <InlineCitation>
        <InlineCitationText>{singleSource.text}</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger
            sources={singleSource.sources.map((source) => source.url)}
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
  text: "The technology continues to evolve rapidly",
  sources: [
    {
      title: "Advances in NLP",
      url: "https://example.com/nlp",
      description: "A study on NLP developments.",
    },
  ],
}

export function BasicCitationDemo() {
  return (
    <p className="text-sm">
      According to recent studies.{" "}
      <InlineCitation>
        <InlineCitationText>{citation.text}</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={citation.sources.map((s) => s.url)} />
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

export function SingleSourceDemo() {
  const source = {
    text: "This is a significant achievement",
    sources: [
      {
        title: "Research Findings",
        url: "https://example.com/research",
        description: "Study findings.",
      },
    ],
  }

  return (
    <p className="text-sm">
      Recent research.{" "}
      <InlineCitation>
        <InlineCitationText>{source.text}</InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger sources={source.sources.map((s) => s.url)} />
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
    </p>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inlineCitationMeta = {
  name: "Inline Citation",
  description: "A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.",
  importPath: "@/components/ai-elements/cognite/inline-citation",
};
