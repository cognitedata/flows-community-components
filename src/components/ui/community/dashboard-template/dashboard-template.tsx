import { Toaster, TooltipProvider } from '@cognite/aura/components';
import type { ReactNode } from 'react';

import { ChartAreaInteractive } from './chart-area-interactive';
import { documentRows } from './dashboard-template.data';
import { DataTable } from './data-table';
import { SectionCards } from './section-cards';
import { SiteHeader } from './site-header';

function DashboardTemplate(): ReactNode {
  return (
    <TooltipProvider>
      <div
        data-slot="dashboard-template"
        className="@container/main flex min-h-150 w-full min-w-0 flex-col overflow-hidden rounded-xl border bg-background"
      >
        <SiteHeader />
        <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-auto p-4">
          <SectionCards />
          <ChartAreaInteractive />
          <DataTable data={documentRows} />
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

DashboardTemplate.displayName = 'DashboardTemplate';

export { DashboardTemplate };
