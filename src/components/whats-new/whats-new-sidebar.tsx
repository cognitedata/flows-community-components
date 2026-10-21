import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { WHATS_NEW_POSTS } from '@/lib/whats-new-data';

/** Reports, newest first. The top entry is the current report and the default page. */
export function WhatsNewSidebar() {
  const { pathname } = useLocation();
  const [latest] = WHATS_NEW_POSTS;
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
        {WHATS_NEW_POSTS.map((post) => {
          const href = `/whats-new/${post.slug}`;
          const active =
            pathname === href || (isIndex && post.slug === latest.slug);
          return (
            <li key={post.slug}>
              <Link
                to={post.slug === latest.slug ? '/whats-new' : href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors',
                  active
                    ? 'bg-medium-bg font-medium text-foreground'
                    : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
                )}
              >
                <span>{post.month}</span>
                {post.slug === latest.slug && (
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
