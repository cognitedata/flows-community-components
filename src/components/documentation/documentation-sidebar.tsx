import { Link, useLocation } from 'react-router-dom';

import { DOCUMENTATION_NAV } from '@/lib/documentation-nav-data';
import { cn } from '@/lib/utils';

export function DocumentationSidebar() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Documentation navigation"
      className="sticky top-chrome-pad hidden h-[calc(100vh-var(--spacing-chrome-pad)-1rem)] w-56 shrink-0 flex-col gap-8 overflow-y-auto pb-8 md:flex"
    >
      {DOCUMENTATION_NAV.map((section) => (
        <div key={section.title}>
          <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
            {section.title}
          </h2>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const href = item.slug
                ? `/documentation/${item.slug}`
                : '/documentation';
              const active = pathname === href;
              return (
                <li key={item.label}>
                  <Link
                    to={href}
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
      ))}
    </nav>
  );
}
