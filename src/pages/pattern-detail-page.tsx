import { Link, Navigate, useParams } from 'react-router-dom';

import { CenteredContent } from '@/components/layout/centered-content';
import { PageTitle } from '@/components/page-title';
import { getPatternBySlug } from '@/lib/patterns-data';

export function PatternDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const pattern = getPatternBySlug(slug);

  if (!pattern) {
    return <Navigate to="/patterns" replace />;
  }

  const Icon = pattern.icon;

  return (
    <CenteredContent>
      <PageTitle title={`${pattern.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/patterns"
            className="hover:text-foreground hover:underline"
          >
            Patterns
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{pattern.name}</span>
        </p>
        <div className="flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
            <Icon size={22} stroke={1.5} />
          </span>
          <div className="min-w-0">
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {pattern.name}
            </h1>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              {pattern.description}
            </p>
          </div>
        </div>
      </header>
      <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
        A worked example for this pattern is on the way. In the meantime, browse
        the other patterns using the list on the left.
      </p>
    </CenteredContent>
  );
}
