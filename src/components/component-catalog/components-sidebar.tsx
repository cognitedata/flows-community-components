import { Link, useLocation } from 'react-router-dom';

import { ALL_COMPONENTS } from '@/lib/component-catalog-data';
import { cn } from '@/lib/utils';

export function ComponentsSidebar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primitives navigation"
      className="sticky top-chrome-pad hidden h-[calc(100vh-var(--spacing-chrome-pad)-1rem)] w-56 shrink-0 flex-col gap-8 overflow-y-auto pb-8 md:flex"
    >
      <div>
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
          PRIMITIVES
        </h2>
        <ul className="flex flex-col gap-0.5">
          <li>
            <Link
              to="/primitives"
              className={cn(
                'block rounded-lg px-2 py-1.5 text-sm transition-colors',
                pathname === '/primitives'
                  ? 'bg-medium-bg font-medium text-foreground'
                  : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
              )}
            >
              Overview
            </Link>
          </li>
          {ALL_COMPONENTS.map((component) => {
            const href = `/primitives/${component.slug}`;
            const active = pathname === href;
            return (
              <li key={component.slug}>
                <Link
                  to={href}
                  className={cn(
                    'block rounded-lg px-2 py-1.5 text-sm transition-colors',
                    active
                      ? 'bg-medium-bg font-medium text-foreground'
                      : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
                  )}
                >
                  {component.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
