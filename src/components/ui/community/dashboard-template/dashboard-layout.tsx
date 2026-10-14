import { Button, Tabs, TabsList, TabsTrigger } from '@cognite/aura/components';
import { IconBuildingFactory, IconPlus } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';

import { DashboardLayoutGrid } from './dashboard-layout-grid';
import { DashboardLayoutOverview } from './dashboard-layout-overview';
import { DashboardLayoutPanel } from './dashboard-layout-panel';
import { DashboardLayoutPreview } from './dashboard-layout-preview';
import {
  dashboardDefaultScope,
  dashboardPageDescription,
  dashboardPageTitle,
  dashboardPrimaryAction,
  dashboardSecondaryAction,
  dashboardTabs,
  dashboardWorkOrders,
  type DashboardLayoutId,
  type DashboardTab,
} from './dashboard-layouts.data';

function hasPanel(layout: DashboardLayoutId): boolean {
  return layout.startsWith('panel');
}

function hasGrid(layout: DashboardLayoutId): boolean {
  return layout.startsWith('grid') || layout.startsWith('preview');
}

function hasPreview(layout: DashboardLayoutId): boolean {
  return layout.startsWith('preview');
}

function usesTabs(layout: DashboardLayoutId): boolean {
  return layout.endsWith('tabs');
}

function isDashboardTab(value: string): value is DashboardTab {
  return dashboardTabs.some((item) => item === value);
}

function DashboardLayout({ layout }: { layout: DashboardLayoutId }): ReactNode {
  const tabs = usesTabs(layout);
  const grid = hasGrid(layout);
  const preview = hasPreview(layout);
  const bulk = layout.startsWith('grid');
  const headerAction = !tabs && !grid;
  const [tab, setTab] = useState<DashboardTab>(dashboardTabs[0]);
  const [scope, setScope] = useState<string>(dashboardDefaultScope);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );

  const selectedOrder = dashboardWorkOrders.find(
    (row) => row.id === selectedId
  );

  function selectRow(id: string): void {
    setSelectedId((current) => (current === id ? null : id));
  }

  function toggleRow(id: string, checked: boolean): void {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }

  function toggleAll(checked: boolean): void {
    setCheckedIds(
      checked ? new Set(dashboardWorkOrders.map((row) => row.id)) : new Set()
    );
  }

  return (
    <div className="@container/main flex h-[52rem] w-full min-w-0 flex-col overflow-hidden rounded-xl border bg-background">
      <div className="flex flex-col gap-3 border-b px-4 py-3">
        {tabs ? (
          <Tabs
            value={tab}
            onValueChange={(value) => {
              if (isDashboardTab(value)) {
                setTab(value);
              }
            }}
          >
            <TabsList>
              {dashboardTabs.map((item) => (
                <TabsTrigger key={item} value={item}>
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted-background text-muted-foreground">
                <IconBuildingFactory size={18} stroke={1.5} />
              </span>
              <div className="min-w-0">
                <h2 className="text-base font-medium leading-5">
                  {dashboardPageTitle}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {dashboardPageDescription}
                </p>
              </div>
            </div>
            {headerAction ? (
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="secondary">{dashboardSecondaryAction}</Button>
                <Button>
                  <IconPlus size={16} stroke={1.5} />
                  {dashboardPrimaryAction}
                </Button>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className="flex min-h-0 min-w-0 flex-1">
        {hasPanel(layout) ? (
          <DashboardLayoutPanel scope={scope} onScopeChange={setScope} />
        ) : null}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-auto p-4">
          {grid ? (
            <DashboardLayoutGrid
              showCheckboxes={bulk}
              showPrimary
              selectedId={preview ? selectedId : null}
              checkedIds={checkedIds}
              onSelectRow={selectRow}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
            />
          ) : (
            <DashboardLayoutOverview
              scope={hasPanel(layout) ? scope : undefined}
            />
          )}
        </div>
        {preview && selectedOrder ? (
          <DashboardLayoutPreview order={selectedOrder} />
        ) : null}
      </div>
    </div>
  );
}

DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout };
