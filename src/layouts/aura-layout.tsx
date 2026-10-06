import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AuraSidebar } from '@/components/aura/aura-sidebar';
import { ComponentsDocsBanner } from '@/components/aura/components-docs-banner';
import { TableOfContents } from '@/components/layout/table-of-contents';
import { getAuraPackageDocs } from '@/lib/aura-package-docs';
import { getComponentBySlug } from '@/lib/component-catalog-data';
import { slugify } from '@/lib/utils';

const COMPONENT_DETAIL_PATH = /^\/aura\/components\/([^/]+)/;

/** Pages sourced from `@cognite/aura` docs no longer need the notice. */
function hasPackageDocs(pathname: string) {
  const slug = COMPONENT_DETAIL_PATH.exec(pathname)?.[1];
  const component = slug ? getComponentBySlug(slug) : null;
  return component
    ? getAuraPackageDocs(slugify(component.name)) !== null
    : false;
}

export function AuraLayout() {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const hideToc =
    pathname === '/aura/components' || pathname === '/aura/primitives';
  const isComponentsSection =
    pathname === '/aura/components' || pathname.startsWith('/aura/components/');
  const showDocsBanner = isComponentsSection && !hasPackageDocs(pathname);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] gap-16 px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
        <AuraSidebar />
        <div ref={contentRef} className="min-w-0 flex-1">
          {showDocsBanner && <ComponentsDocsBanner />}
          <Outlet />
        </div>
        {!hideToc && <TableOfContents containerRef={contentRef} />}
      </div>
    </main>
  );
}
