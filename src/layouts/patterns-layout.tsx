import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { TableOfContents } from '@/components/layout/table-of-contents';
import { PatternsSidebar } from '@/components/patterns/patterns-sidebar';

/** Set to false to show the Patterns section again. */
const PATTERNS_SECTION_HIDDEN = true;

export function PatternsLayout() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isLandingPage = pathname === '/patterns';

  if (PATTERNS_SECTION_HIDDEN) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] gap-16 px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
        <PatternsSidebar />
        <div ref={contentRef} className="min-w-0 flex-1">
          <Outlet />
        </div>
        {!isLandingPage && <TableOfContents containerRef={contentRef} />}
      </div>
    </main>
  );
}
