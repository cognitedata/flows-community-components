import { Link, Navigate, useParams } from 'react-router-dom';

import {
  AuraRegistryNote,
  CommunityInstallSection,
} from '@/components/community/community-install-section';
import { MarkdownDoc } from '@/components/documentation/markdown-doc';
import { PageTitle } from '@/components/page-title';
import { StoriesRenderer } from '@/components/stories-renderer';
import { getCommunityComponent } from '@/lib/community-catalog';
import { getCommunityTemplateBySlug } from '@/lib/community-templates-data';
import { getStatusLabel } from '@/lib/component-status';

export function CommunityTemplateDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const template = getCommunityTemplateBySlug(slug);
  const catalog = template
    ? getCommunityComponent(template.registryId)
    : undefined;

  if (!template || !catalog) {
    return <Navigate to="/community/templates" replace />;
  }

  const Icon = template.icon;

  return (
    <>
      <PageTitle title={`${template.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/community/templates"
            className="hover:text-foreground hover:underline"
          >
            Overview
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{template.name}</span>
        </p>
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
            <Icon size={22} stroke={1.5} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {template.name}
              </h1>
              <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-fg">
                {getStatusLabel(catalog.status)}
              </span>
            </div>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              {template.description}
            </p>
            {catalog.notes?.map((note) => (
              <p key={note} className="mt-2 max-w-[60ch] text-sm text-muted-fg">
                {note}
              </p>
            ))}
          </div>
        </div>
      </header>

      {template.variantInstalls ? (
        <div className="mb-12">
          <AuraRegistryNote />
        </div>
      ) : (
        <CommunityInstallSection name={template.registryId} />
      )}

      {!template.variantInstalls && (
        <section className="mb-12 space-y-4" aria-labelledby="usage-heading">
          <h2
            id="usage-heading"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <MarkdownDoc markdown={template.usage} />
        </section>
      )}

      {template.skill && (
        <section className="mb-12 space-y-4" aria-labelledby="skill-heading">
          <h2
            id="skill-heading"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            Agent skill
          </h2>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
            Installing this item also adds the{' '}
            <code className="text-foreground">{template.skill.name}</code> skill
            to{' '}
            <code className="text-foreground">
              {template.skill.installPath}
            </code>
            , so coding agents follow it when they add this to your app.
          </p>
          <Link
            to={`/community/templates/${slug}/skill`}
            className="inline-flex text-sm font-medium text-link-fg hover:text-link-fg-hover hover:underline"
          >
            Read SKILL.md
          </Link>
        </section>
      )}

      <section
        aria-labelledby={
          template.variantInstalls ? undefined : 'examples-heading'
        }
        className="space-y-4"
      >
        {!template.variantInstalls && (
          <h2
            id="examples-heading"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            {template.variantDescriptions ? 'Examples' : 'Example'}
          </h2>
        )}
        {template.featuredStory ? (
          <>
            <StoriesRenderer
              slug={template.registryId}
              include={[template.featuredStory]}
              descriptions={template.variantDescriptions}
              installs={template.variantInstalls}
            />
            <Link
              to={`/community/templates/${slug}/examples`}
              className="inline-flex text-sm font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              More examples
            </Link>
          </>
        ) : (
          <StoriesRenderer
            slug={template.registryId}
            descriptions={template.variantDescriptions}
            installs={template.variantInstalls}
          />
        )}
      </section>
    </>
  );
}
