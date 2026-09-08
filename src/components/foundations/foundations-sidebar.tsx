import { Link, useLocation } from 'react-router-dom';

import { cn, slugify } from '@/lib/utils';

const TOPICS_ITEMS = [
  'Design heuristics',
  'Color tokens',
  'Size and spacing tokens',
  'Typography',
  'Effects',
  'Motion',
  'Assets and icons',
  'Accessibility',
];

export function FoundationsSidebar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Foundations navigation"
      className="sticky top-chrome-pad hidden h-[calc(100vh-var(--spacing-chrome-pad)-1rem)] w-56 shrink-0 flex-col gap-8 overflow-y-auto pb-8 md:flex"
    >
      <div>
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
          Topics
        </h2>
        <ul className="flex flex-col gap-0.5">
          <li>
            <Link
              to="/foundations"
              className={cn(
                'block rounded-lg px-2 py-1.5 text-sm transition-colors',
                pathname === '/foundations'
                  ? 'bg-medium-bg font-medium text-foreground'
                  : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
              )}
            >
              Overview
            </Link>
          </li>
          {TOPICS_ITEMS.map((label) => {
            const href = `/foundations/${slugify(label)}`;
            const active = pathname === href;
            return (
              <li key={label}>
                <Link
                  to={href}
                  className={cn(
                    'block rounded-lg px-2 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-medium-bg font-medium text-foreground'
                      : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
          Content
        </h2>
      </div>
    </nav>
  );
}
