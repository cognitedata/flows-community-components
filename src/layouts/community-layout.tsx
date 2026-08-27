import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { CommunitySidebar } from '@/components/community/community-sidebar';
import { TableOfContents } from '@/components/layout/table-of-contents';

export function CommunityLayout() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isLandingPage = pathname === '/community';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] gap-16 px-4 pt-24 pb-24 sm:pt-28">
        <CommunitySidebar />
        <div ref={contentRef} className="min-w-0 flex-1">
          <Outlet />
        </div>
        {!isLandingPage && <TableOfContents containerRef={contentRef} />}
      </div>
    </main>
  );
}
