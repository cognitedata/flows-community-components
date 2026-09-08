import type * as React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { AccessibilityContent } from '@/components/foundations/topic-content/accessibility-content';
import { AssetsAndIconsContent } from '@/components/foundations/topic-content/assets-and-icons-content';
import { ColorTokensContent } from '@/components/foundations/topic-content/color-tokens-content';
import { DesignHeuristicsContent } from '@/components/foundations/topic-content/design-heuristics-content';
import { EffectsContent } from '@/components/foundations/topic-content/effects-content';
import { MotionContent } from '@/components/foundations/topic-content/motion-content';
import { SizeAndSpacingTokensContent } from '@/components/foundations/topic-content/size-and-spacing-tokens-content';
import { TypographyContent } from '@/components/foundations/topic-content/typography-content';
import { CenteredContent } from '@/components/layout/centered-content';
import { PageTitle } from '@/components/page-title';
import { getFoundationTopicBySlug } from '@/lib/foundations-topics-data';

const TOPIC_CONTENT: Record<string, React.ComponentType> = {
  'design-heuristics': DesignHeuristicsContent,
  'color-tokens': ColorTokensContent,
  'size-and-spacing-tokens': SizeAndSpacingTokensContent,
  typography: TypographyContent,
  effects: EffectsContent,
  motion: MotionContent,
  'assets-and-icons': AssetsAndIconsContent,
  accessibility: AccessibilityContent,
};

export function FoundationTopicDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const topic = getFoundationTopicBySlug(slug);

  if (!topic) {
    return <Navigate to="/foundations" replace />;
  }

  const Icon = topic.icon;
  const Content = TOPIC_CONTENT[slug];

  return (
    <CenteredContent>
      <PageTitle title={`${topic.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/foundations"
            className="hover:text-foreground hover:underline"
          >
            Foundations
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{topic.name}</span>
        </p>
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
            <Icon size={22} stroke={1.5} />
          </span>
          <div className="min-w-0">
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {topic.name}
            </h1>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              {topic.description}
            </p>
          </div>
        </div>
      </header>
      {Content ? (
        <Content />
      ) : (
        <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
          Content for this page is on the way. In the meantime, browse the other
          Foundations topics using the list on the left.
        </p>
      )}
    </CenteredContent>
  );
}
