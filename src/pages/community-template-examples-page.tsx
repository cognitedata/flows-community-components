import { Link, Navigate, useParams } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { StoriesRenderer } from '@/components/stories-renderer';
import { getCommunityTemplateBySlug } from '@/lib/community-templates-data';

export function CommunityTemplateExamplesPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const template = getCommunityTemplateBySlug(slug);

  if (!template?.featuredStory) {
    return <Navigate to={`/community/templates/${slug}`} replace />;
  }

  return (
    <>
      <PageTitle title={`Examples — ${template.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/community/templates"
            className="hover:text-foreground hover:underline"
          >
            Overview
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <Link
            to={`/community/templates/${slug}`}
            className="hover:text-foreground hover:underline"
          >
            {template.name}
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>Examples</span>
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Examples
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Each example composes only the parts it needs. Copy one as a starting
          point, then add or remove parts.
        </p>
      </header>
      <StoriesRenderer
        slug={template.registryId}
        exclude={[template.featuredStory]}
        descriptions={template.variantDescriptions}
      />
    </>
  );
}
