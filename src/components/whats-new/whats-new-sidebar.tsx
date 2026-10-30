import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import type { ReportIndexEntry } from '@/lib/whats-new-report';

/** Reports, newest first. The top entry is the current report and the default page. */
export function WhatsNewSidebar({ entries }: { entries: ReportIndexEntry[] }) {
  const { pathname } = useLocation();
  const [latest] = entries;
  const isIndex = pathname.replace(/\/$/, '') === '/whats-new';

  return (
    <nav
      aria-label="Reports"
      className="w-full shrink-0 md:sticky md:top-chrome-pad md:h-[calc(100vh-var(--spacing-chrome-pad)-1rem)] md:w-56 md:overflow-y-auto md:pb-8"
    >
      <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-foreground uppercase">
        What&apos;s new
      </h2>
      <ul className="flex flex-col gap-0.5">
        {entries.map((entry) => {
          const href = `/whats-new/${entry.slug}`;
          const isLatest = entry.slug === latest.slug;
          const active = pathname === href || (isIndex && isLatest);
          return (
            <li key={entry.slug}>
              <Link
                to={isLatest ? '/whats-new' : href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                  active
                    ? 'bg-medium-bg font-medium text-foreground'
                    : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
                )}
              >
                <span>{entry.label}</span>
                {isLatest && (
                  <span className="rounded-sm border border-border px-1.5 py-0.5 text-xs font-medium text-muted-fg">
                    Latest
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
