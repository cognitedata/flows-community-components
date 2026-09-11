import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AuraSidebar } from '@/components/aura/aura-sidebar';
import { TableOfContents } from '@/components/layout/table-of-contents';

export function AuraLayout() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const hideToc =
    pathname === '/aura/components' || pathname === '/aura/primitives';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] gap-16 px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
        <AuraSidebar />
        <div ref={contentRef} className="min-w-0 flex-1">
          <Outlet />
        </div>
        {!hideToc && <TableOfContents containerRef={contentRef} />}
      </div>
    </main>
  );
}
