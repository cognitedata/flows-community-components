import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { CommunitySidebar } from '@/components/community/community-sidebar';
import { TableOfContents } from '@/components/layout/table-of-contents';

export function CommunityLayout() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const hideToc =
    pathname === '/community' ||
    pathname === '/community/components' ||
    pathname === '/community/templates' ||
    pathname === '/community/templates/dashboard';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] gap-16 px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
        <CommunitySidebar />
        <div ref={contentRef} className="min-w-0 flex-1">
          <Outlet />
        </div>
        {!hideToc && <TableOfContents containerRef={contentRef} />}
      </div>
    </main>
  );
}
