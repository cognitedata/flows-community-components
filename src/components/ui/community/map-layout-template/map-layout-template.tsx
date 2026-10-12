import { Avatar, AvatarFallback, Button } from '@cognite/aura/components';
import { IconMapPin, IconPlus } from '@tabler/icons-react';
import { type ReactNode, useState } from 'react';

import { MapLayoutLeftPanel } from './map-layout-left-panel';
import { MapLayoutMapArea } from './map-layout-map-area';
import { MapLayoutPreview } from './map-layout-preview';
import { MapLayoutTable } from './map-layout-table';
import {
  mapLayerSelection,
  mapPageDescription,
  mapPageTitle,
  mapPrimaryAction,
  mapSecondaryAction,
  mapSiteRows,
  type MapLayerListView,
  type MapLayout,
} from './map-layout-template.data';

type MapSelection = { kind: 'site' | 'layer'; id: string };

function hasLeftPanel(layout: MapLayout): boolean {
  return layout === 'left-right-panels';
}

function hasRightPanel(layout: MapLayout): boolean {
  return layout !== 'grid-full-width';
}

function hasDataGrid(layout: MapLayout): boolean {
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
  const [selection, setSelection] = useState<MapSelection | null>(null);

  const selectedSite =
    selection?.kind === 'site'
      ? mapSiteRows.find((site) => site.id === selection.id)
      : undefined;
  const selectedLayer =
    selection?.kind === 'layer' ? mapLayerSelection(selection.id) : null;

  function selectSite(id: string): void {
    setSelection((current) =>
      current?.kind === 'site' && current.id === id
        ? null
        : { kind: 'site', id }
    );
  }

  function selectLayer(id: string): void {
    if (!mapLayerSelection(id)) {
      return;
    }
    setSelection({ kind: 'layer', id });
  }

  function deselectLayer(id: string): void {
    setSelection((current) =>
      current?.kind === 'layer' && current.id === id ? null : current
    );
  }

  function clearSiteSelection(id?: string): void {
    setSelection((current) => {
      if (current?.kind !== 'site') {
        return current;
      }
      if (id !== undefined && current.id !== id) {
        return current;
      }
      return null;
    });
  }

  function toggleRow(id: string): void {
    const wasChecked = selectedIds.has(id);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    if (wasChecked) {
      clearSiteSelection(id);
    } else {
      setSelection({ kind: 'site', id });
    }
  }

  function toggleAll(): void {
    const allSelected = mapSiteRows.every((row) => selectedIds.has(row.id));
    setSelectedIds(() =>
      allSelected ? new Set() : new Set(mapSiteRows.map((row) => row.id))
    );
    if (allSelected) {
      clearSiteSelection();
    }
  }

  return (
    <div
      data-slot="map-layout-template"
      className="flex h-[52rem] w-full min-w-0 flex-col overflow-hidden rounded-xl border bg-background"
    >
      <PageHeader />

      <div className="flex min-h-0 flex-1">
        {hasLeftPanel(layout) && (
          <MapLayoutLeftPanel
            list={layers}
            selectedId={selection?.kind === 'layer' ? selection.id : null}
            onSelect={selectLayer}
            onDeselect={deselectLayer}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <MapLayoutMapArea
            selectedSiteId={selectedSite?.id ?? null}
            onSelectSite={selectSite}
            className={hasDataGrid(layout) ? 'min-h-[45%]' : undefined}
          />

          {hasDataGrid(layout) && (
            <MapLayoutTable
              selectedIds={selectedIds}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
              selectedRowId={selectedSite?.id ?? null}
              onSelectRow={selectSite}
            />
          )}
        </div>

        {hasRightPanel(layout) && (selectedSite || selectedLayer) && (
          <MapLayoutPreview
            site={selectedSite}
            layer={selectedLayer ?? undefined}
          />
        )}
      </div>
    </div>
  );
}

MapLayoutTemplate.displayName = 'MapLayoutTemplate';

export { MapLayoutTemplate };
