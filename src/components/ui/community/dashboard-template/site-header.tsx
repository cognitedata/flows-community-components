import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  Topbar,
  TopbarLeft,
} from '@cognite/aura/components';
import type { ReactNode } from 'react';

export function SiteHeader(): ReactNode {
  return (
    <Topbar data-slot="dashboard-header" className="border-b">
      <TopbarLeft>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Documents</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </TopbarLeft>
    </Topbar>
  );
}
