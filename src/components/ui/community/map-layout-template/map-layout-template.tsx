import { Avatar, AvatarFallback, Button } from '@cognite/aura/components';
import { IconMapPin, IconPlus } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';

import { MapLayoutLeftPanel } from './map-layout-left-panel';
import { MapLayoutMapArea } from './map-layout-map-area';
import { MapLayoutPreview } from './map-layout-preview';
import { MapLayoutTable } from './map-layout-table';
import {
  mapPageDescription,
  mapPageTitle,
  mapPrimaryAction,
  mapSecondaryAction,
  mapSiteRows,
  type MapLayerListView,
  type MapLayout,
} from './map-layout-template.data';

function hasLeftPanel(layout: MapLayout): boolean {
  return layout === 'left-right-panels';
}

function hasRightPanel(layout: MapLayout): boolean {
  return layout !== 'grid-full-width';
}

function hasDataGrid(layout: MapLayout): boolean {
  return layout === 'grid-right-panel' || layout === 'grid-full-width';
}

function hasPageHeader(layout: MapLayout): boolean {
  return layout === 'grid-right-panel' || layout === 'grid-full-width';
}

function PageHeader(): ReactNode {
  return (
    <header
      data-slot="page-header"
      className="flex items-center gap-3 border-b px-3 py-3"
    >
      <div className="flex flex-1 items-center gap-3">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback>
            <IconMapPin size={18} stroke={1.5} />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-base font-medium leading-5">{mapPageTitle}</h1>
          <p className="text-sm text-muted-foreground">{mapPageDescription}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="secondary">{mapSecondaryAction}</Button>
        <Button>
          <IconPlus size={16} stroke={1.5} />
          {mapPrimaryAction}
        </Button>
      </div>
    </header>
  );
}

function MapLayoutTemplate({
  layout,
  layers = 'tree',
}: {
  layout: MapLayout;
  layers?: MapLayerListView;
}): ReactNode {
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(
    () => new Set()
  );
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(() =>
    hasRightPanel(layout) ? (mapSiteRows[0]?.id ?? null) : null
  );

  const selectedSite = mapSiteRows.find((s) => s.id === selectedSiteId);

  function toggleRow(id: string): void {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleAll(): void {
    setSelectedIds((prev) => {
      if (mapSiteRows.every((row) => prev.has(row.id))) {
        return new Set();
      }
      return new Set(mapSiteRows.map((row) => row.id));
    });
  }

  return (
    <div
      data-slot="map-layout-template"
      className="flex h-[52rem] w-full min-w-0 flex-col overflow-hidden rounded-xl border bg-background"
    >
      {hasPageHeader(layout) && <PageHeader />}

      <div className="flex min-h-0 flex-1">
        {hasLeftPanel(layout) && <MapLayoutLeftPanel list={layers} />}

        <div className="flex min-w-0 flex-1 flex-col">
          <MapLayoutMapArea
            selectedSiteId={selectedSiteId}
            onSelectSite={setSelectedSiteId}
            className={hasDataGrid(layout) ? 'min-h-[45%]' : undefined}
          />

          {hasDataGrid(layout) && (
            <MapLayoutTable
              selectedIds={selectedIds}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
              selectedRowId={selectedSiteId}
              onSelectRow={setSelectedSiteId}
            />
          )}
        </div>

        {hasRightPanel(layout) && selectedSite && (
          <MapLayoutPreview site={selectedSite} />
        )}
      </div>
    </div>
  );
}

MapLayoutTemplate.displayName = 'MapLayoutTemplate';

export { MapLayoutTemplate };
