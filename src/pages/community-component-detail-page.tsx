import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { StoriesRenderer } from '@/components/stories-renderer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getCommunityComponent,
  getCommunityInstallCommands,
} from '@/lib/community-catalog';
import { getCommunityComponentBySlug } from '@/lib/community-data';
import { getStatusLabel } from '@/lib/component-status';

const noteLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function renderNote(note: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  for (const match of note.matchAll(noteLinkPattern)) {
    const [full, label, href] = match;
    parts.push(note.slice(lastIndex, match.index));
    parts.push(
      <a
        key={match.index}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
      >
        {label}
      </a>
    );
    lastIndex = match.index + full.length;
  }
  parts.push(note.slice(lastIndex));
  return parts;
}

export function CommunityComponentDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const catalog = getCommunityComponent(slug);
  const component = getCommunityComponentBySlug(slug);

  if (!component || !catalog) {
    return <Navigate to="/community/components" replace />;
  }

  const Icon = component.icon;
  const installCommands = getCommunityInstallCommands(slug);

  return (
    <>
      <PageTitle title={`${component.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/community/components"
            className="hover:text-foreground hover:underline"
          >
            Overview
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{component.name}</span>
        </p>
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
            <Icon size={22} stroke={1.5} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {component.name}
              </h1>
              <span className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-fg">
                {getStatusLabel(catalog.status)}
              </span>
            </div>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              {component.description}
            </p>
            {catalog.notes?.map((note) => (
              <p key={note} className="mt-2 max-w-[60ch] text-sm text-muted-fg">
                {renderNote(note)}
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

      {catalog.llmUsage ? (
        <section className="mb-12 space-y-4" aria-labelledby="usage-heading">
          <h2
            id="usage-heading"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            Usage
          </h2>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
            {catalog.llmUsage}
          </p>
        </section>
      ) : null}

      <section aria-labelledby="examples-heading" className="space-y-4">
        <h2
          id="examples-heading"
          className="font-heading text-2xl font-semibold tracking-tight"
        >
          Examples
        </h2>
        <StoriesRenderer slug={slug} />
      </section>
    </>
  );
}
