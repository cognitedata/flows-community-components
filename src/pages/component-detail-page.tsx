import { IconExternalLink } from '@tabler/icons-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { ChromaticStorybookEmbed } from '@/components/component-catalog/chromatic-storybook-embed';
import { PageTitle } from '@/components/page-title';
import { chromaticStorybookManagerUrl } from '@/lib/chromatic-storybook';
import { getComponentBySlug } from '@/lib/component-catalog-data';
import { useStorybookTheme } from '@/lib/storybook-theme';

export function ComponentDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const theme = useStorybookTheme();
  const component = getComponentBySlug(slug);

  if (!component) {
    return <Navigate to="/components" replace />;
  }

  const Icon = component.icon;

  return (
    <>
      <PageTitle title={`${component.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/components"
            className="hover:text-foreground hover:underline"
          >
            Components
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{component.name}</span>
        </p>
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
            <Icon size={22} stroke={1.5} />
          </span>
          <div className="min-w-0">
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {component.name}
            </h1>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              {component.description}
            </p>
            {component.storybookId && (
              <a
                href={chromaticStorybookManagerUrl(
                  component.storybookId,
                  theme
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-link-fg transition-colors hover:text-link-fg-hover"
              >
                Open in Storybook
                <IconExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </header>

      {component.storybookId ? (
        <section aria-label={`${component.name} Storybook preview`}>
          <ChromaticStorybookEmbed
            storyId={component.storybookId}
            title={`${component.name} preview`}
          />
        </section>
      ) : (
        <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
          A live Storybook preview is not available for this component yet.
        </p>
      )}
    </>
  );
}
