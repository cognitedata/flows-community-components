import { Link, useLocation } from 'react-router-dom';

import { ALL_COMPONENTS } from '@/lib/component-catalog-data';
import { cn } from '@/lib/utils';

const OVERVIEW_ITEMS = [
  { label: 'Introduction', href: '/components/introduction' },
  { label: 'Components', href: '/components' },
];

export function ComponentsSidebar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Components navigation"
      className="sticky top-24 hidden h-[calc(100vh-7rem)] w-56 shrink-0 flex-col gap-8 overflow-y-auto pb-8 md:flex"
    >
      <div>
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
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
        <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
          Components
        </h2>
        <ul className="flex flex-col gap-0.5">
          {ALL_COMPONENTS.map((component) => {
            const href = `/components/${component.slug}`;
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
