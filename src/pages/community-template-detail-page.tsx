import { Link, Navigate, useParams } from 'react-router-dom';

import { MarkdownDoc } from '@/components/documentation/markdown-doc';
import { PageTitle } from '@/components/page-title';
import { StoriesRenderer } from '@/components/stories-renderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getCommunityComponent,
  getCommunityInstallCommands,
} from '@/lib/community-catalog';
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
  const installCommands = getCommunityInstallCommands(template.registryId);

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

      <section className="mb-12 space-y-4" aria-labelledby="install-heading">
        <h2
          id="install-heading"
          className="font-heading text-2xl font-semibold tracking-tight"
        >
          Installation
        </h2>
        <Tabs defaultValue="pnpm">
          <TabsList>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="bun">bun</TabsTrigger>
          </TabsList>
          {(
            [
              ['pnpm', installCommands.pnpm],
              ['npm', installCommands.npm],
              ['yarn', installCommands.yarn],
              ['bun', installCommands.bun],
            ] as const
          ).map(([manager, command]) => (
            <TabsContent key={manager} value={manager} className="mt-4">
              <pre className="overflow-x-auto rounded-xl border border-border bg-muted-bg p-4 text-sm">
                <code>{command}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
        <p className="text-sm text-muted-fg">
          Requires the <code className="text-foreground">@aura</code> registry
          in your <code className="text-foreground">components.json</code>. See{' '}
          <Link
            to="/community/installation"
            className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
          >
            installation
          </Link>
          .
        </p>
      </section>

      <section className="mb-12 space-y-4" aria-labelledby="usage-heading">
        <h2
          id="usage-heading"
          className="font-heading text-2xl font-semibold tracking-tight"
        >
          Usage
        </h2>
        <MarkdownDoc markdown={template.usage} />
      </section>

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
            , so coding agents follow the same approach when they build or edit
            charts in your app.
          </p>
          <Link
            to={`/community/templates/${slug}/skill`}
            className="inline-flex text-sm font-medium text-link-fg hover:text-link-fg-hover hover:underline"
          >
            Read SKILL.md
          </Link>
        </section>
      )}

      <section aria-labelledby="examples-heading" className="space-y-4">
        <h2
          id="examples-heading"
          className="font-heading text-2xl font-semibold tracking-tight"
        >
          Example
        </h2>
        {template.featuredStory ? (
          <>
            <StoriesRenderer
              slug={template.registryId}
              include={[template.featuredStory]}
            />
            <Link
              to={`/community/templates/${slug}/examples`}
              className="inline-flex text-sm font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              More examples
            </Link>
          </>
        ) : (
          <StoriesRenderer slug={template.registryId} />
        )}
      </section>
    </>
  );
}
