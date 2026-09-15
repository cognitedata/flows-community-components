import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ALL_COMPONENTS } from '@/lib/component-catalog-data';
import { VISIBLE_DOCUMENTATION_NAV_ITEMS } from '@/lib/documentation-nav-data';
import { VISIBLE_FOUNDATION_TOPICS } from '@/lib/foundations-topics-data';
import { cn, slugify } from '@/lib/utils';

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  const active = pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        'block rounded-lg px-2 py-1.5 text-sm transition-colors',
        active
          ? 'bg-medium-bg font-medium text-foreground'
          : 'text-muted-fg hover:bg-medium-bg hover:text-foreground'
      )}
    >
      {children}
    </Link>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-foreground uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  );
}

export function AuraSidebar() {
  return (
    <nav
      aria-label="Aura navigation"
      className="sticky top-chrome-pad hidden h-[calc(100vh-var(--spacing-chrome-pad)-1rem)] w-56 shrink-0 flex-col gap-8 overflow-y-auto pb-8 md:flex"
    >
      <SidebarSection title="Getting started">
        {VISIBLE_DOCUMENTATION_NAV_ITEMS.map((item) => (
          <li key={item.slug}>
            <SidebarLink href={`/aura/documentation/${item.slug}`}>
              {item.label}
            </SidebarLink>
          </li>
        ))}
      </SidebarSection>

      <SidebarSection title="Foundations">
        {VISIBLE_FOUNDATION_TOPICS.map((topic) => (
          <li key={topic.name}>
            <SidebarLink href={`/aura/foundations/${slugify(topic.name)}`}>
              {topic.name}
            </SidebarLink>
          </li>
        ))}
      </SidebarSection>

      <SidebarSection title="Components">
        <li>
          <SidebarLink href="/aura/components">Overview</SidebarLink>
        </li>
        {ALL_COMPONENTS.map((component) => (
          <li key={component.slug}>
            <SidebarLink href={`/aura/components/${component.slug}`}>
              {component.name}
            </SidebarLink>
          </li>
        ))}
      </SidebarSection>
    </nav>
  );
}
