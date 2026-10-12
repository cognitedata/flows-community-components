import {
  Badge,
  CheckboxItem,
  CheckboxItemControl,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconDots } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import {
  formatMapDate,
  mapAssetStatuses,
  mapSiteRows,
  type MapSiteRow,
} from './map-layout-template.data';

const columns = [
  { key: 'name' as const, label: 'Name' },
  { key: 'type' as const, label: 'Type' },
  { key: 'area' as const, label: 'Area' },
  { key: 'status' as const, label: 'Status' },
  { key: 'lastInspection' as const, label: 'Last inspection' },
];

function MapLayoutTable({
  selectedIds,
  onToggleRow,
  onToggleAll,
  selectedRowId,
  onSelectRow,
}: {
  selectedIds: ReadonlySet<string>;
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  selectedRowId?: string | null;
  onSelectRow?: (id: string) => void;
}): ReactNode {
  const allSelected = mapSiteRows.every((row) => selectedIds.has(row.id));

  return (
    <div data-slot="map-table" className="flex flex-col border-t">
      <div className="overflow-x-auto pt-3">
        <table className="w-full border-collapse text-sm" aria-label="Sites">
          <thead>
            <tr className="border-b">
              <th className="w-12 px-3 py-2 text-left">
                <CheckboxItem>
                  <CheckboxItemControl
                    checked={allSelected}
                    onCheckedChange={onToggleAll}
                    aria-label="Select all rows"
                  />
                </CheckboxItem>
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {col.label}
                </th>
              ))}
              <th className="w-12 px-3 py-2" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {mapSiteRows.slice(0, 5).map((row) => (
              <MapTableRow
                key={row.id}
                row={row}
                checked={selectedIds.has(row.id)}
                active={selectedRowId === row.id}
                onToggle={() => onToggleRow(row.id)}
                onSelect={() => onSelectRow?.(row.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MapTableRow({
  row,
  checked,
  active,
  onToggle,
  onSelect,
}: {
  row: MapSiteRow;
  checked: boolean;
  active: boolean;
  onToggle: () => void;
  onSelect: () => void;
}): ReactNode {
  return (
    <tr
      className={cn(
        'cursor-pointer border-b transition-colors hover:bg-muted-background',
        active && 'bg-muted-background'
      )}
      onClick={onSelect}
    >
      <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
        <CheckboxItem>
          <CheckboxItemControl
            checked={checked}
            onCheckedChange={onToggle}
            aria-label={`Select ${row.name}`}
          />
        </CheckboxItem>
      </td>
      <td className="px-3 py-2 font-medium">{row.name}</td>
      <td className="px-3 py-2 text-muted-foreground">{row.type}</td>
      <td className="px-3 py-2 text-muted-foreground">{row.area}</td>
      <td className="px-3 py-2">
        <Badge variant={mapAssetStatuses[row.status]}>{row.status}</Badge>
      </td>
      <td className="px-3 py-2 text-muted-foreground">
        {formatMapDate(row.lastInspection)}
      </td>
      <td className="px-3 py-2">
        <button
          type="button"
          aria-label={`Actions for ${row.name}`}
          className="flex size-7 items-center justify-center rounded-md hover:bg-muted-background"
          onClick={(e) => e.stopPropagation()}
        >
          <IconDots size={16} stroke={1.5} />
        </button>
      </td>
    </tr>
  );
}

MapLayoutTable.displayName = 'MapLayoutTable';

export { MapLayoutTable };
