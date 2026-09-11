import { Link, useLocation } from 'react-router-dom';

import { ALL_PATTERNS } from '@/lib/patterns-data';
import { cn } from '@/lib/utils';

const OVERVIEW_ITEMS = [
  { label: 'Introduction', href: '/patterns/introduction' },
  { label: 'Patterns', href: '/patterns' },
  {
    label: 'Extending functionality',
    href: '/patterns/extending-functionality',
  },
];

export function PatternsSidebar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Patterns navigation"
      className="sticky top-chrome-pad hidden h-[calc(100vh-var(--spacing-chrome-pad)-1rem)] w-56 shrink-0 flex-col gap-8 overflow-y-auto pb-8 md:flex"
    >
      <div>
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-foreground uppercase">
          Overview
        </h2>
        <ul className="flex flex-col gap-0.5">
          {OVERVIEW_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'block rounded-lg px-2 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-medium-bg font-medium text-foreground'
                      : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-foreground uppercase">
          Patterns
        </h2>
        <ul className="flex flex-col gap-0.5">
          {ALL_PATTERNS.map((pattern) => {
            const href = `/patterns/${pattern.slug}`;
            const active = pathname === href;
            return (
              <li key={pattern.slug}>
                <Link
                  to={href}
                  className={cn(
                    'block rounded-lg px-2 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-medium-bg font-medium text-foreground'
                      : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
                  )}
                >
                  {pattern.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
