import type * as React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import {
  ABOUT_AURA_INTRO,
  AboutAuraContent,
} from '@/components/documentation/topic-content/about-aura-content';
import {
  APP_REVIEW_INTRO,
  AppReviewContent,
} from '@/components/documentation/topic-content/app-review-content';
import {
  CUSTOM_THEMING_INTRO,
  CustomThemingContent,
} from '@/components/documentation/topic-content/custom-theming-content';
import {
  DesignMdContent,
  DesignMdIntro,
} from '@/components/documentation/topic-content/design-md-content';
import {
  InstallationContent,
  InstallationIntro,
} from '@/components/documentation/topic-content/installation-content';
import {
  MIGRATION_INTRO,
  MigrationContent,
} from '@/components/documentation/topic-content/migration-content';
import { CenteredContent } from '@/components/layout/centered-content';
import { PageTitle } from '@/components/page-title';
import { getDocumentationNavItemBySlug } from '@/lib/documentation-nav-data';

const TOPIC_CONTENT: Record<
  string,
  { Content: React.ComponentType; intro?: React.ReactNode }
> = {
  'about-aura': { Content: AboutAuraContent, intro: ABOUT_AURA_INTRO },
  installation: { Content: InstallationContent, intro: <InstallationIntro /> },
  'custom-theming': {
    Content: CustomThemingContent,
    intro: CUSTOM_THEMING_INTRO,
  },
  designmd: { Content: DesignMdContent, intro: <DesignMdIntro /> },
  migration: { Content: MigrationContent, intro: MIGRATION_INTRO },
  appreview: { Content: AppReviewContent, intro: APP_REVIEW_INTRO },
};

export function DocumentationTopicDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const item = getDocumentationNavItemBySlug(slug);

  if (!item) {
    return <Navigate to="/aura/documentation" replace />;
  }

  const topic = TOPIC_CONTENT[slug];
  const Content = topic?.Content;

  return (
    <CenteredContent>
      <PageTitle title={`${item.label} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/aura/documentation"
            className="hover:text-foreground hover:underline"
          >
            Documentation
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{item.label}</span>
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {item.label}
        </h1>
        {topic?.intro ? (
          <p className="mt-3 max-w-[60ch] text-muted-fg">{topic.intro}</p>
        ) : null}
      </header>
      {Content ? (
        <Content />
      ) : (
        <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
          Content for this page is on the way. In the meantime, browse the other
          Documentation pages using the list on the left.
        </p>
      )}
    </CenteredContent>
  );
}
