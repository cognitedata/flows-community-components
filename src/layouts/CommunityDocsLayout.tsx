import { ScrollArea, Separator } from '@cognite/aura/components';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { getCommunityCatalog } from '@/lib/community-catalog';
import { cn } from '@/lib/utils';

export function CommunityDocsLayout() {
  const location = useLocation();
  const items = getCommunityCatalog();

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r md:block">
        <ScrollArea className="h-full py-6 pr-4 pl-2">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                Get Started
              </p>
              <Link
                to="/community"
                className={cn(
                  'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground',
                  location.pathname === '/community'
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Components
              </Link>
              <Link
                to="/community/installation"
                className={cn(
                  'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground',
                  location.pathname === '/community/installation'
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Installation
              </Link>
              <Link
                to="/community/contribute"
                className={cn(
                  'block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground',
                  location.pathname === '/community/contribute'
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                Contribute
              </Link>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="px-2 text-xs font-medium text-muted-foreground">
                Components
              </p>
              <nav className="flex flex-col gap-0.5">
                {items.map((item) => {
                  const href = `/community/${item.id}`;
                  const isActive = location.pathname === href;

                  return (
                    <Link
                      key={item.id}
                      to={href}
                      className={cn(
                        'rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted hover:text-foreground',
                        isActive
                          ? 'bg-muted font-medium text-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </ScrollArea>
      </aside>

      <div className="min-w-0 flex-1 px-4 py-8 md:px-8 lg:px-10">
        <Outlet />
      </div>
    </div>
  );
}
