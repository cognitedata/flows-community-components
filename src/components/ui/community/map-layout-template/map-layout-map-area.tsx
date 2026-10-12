import { cn } from '@cognite/aura/utils';
import type { ReactNode } from 'react';

import {
  Map,
  MapMarker,
  MapMarkerDot,
  MapMarkerLabel,
  naturalEarth10m,
  type MapPaletteName,
  type MapStatus,
} from '../map/map';

import {
  mapSiteRows,
  type MapAssetStatus,
  type MapSiteRow,
} from './map-layout-template.data';

const statusTones: Record<MapAssetStatus, MapStatus> = {
  Online: 'success',
  Warning: 'warning',
  Offline: 'critical',
  Maintenance: 'neutral',
};

const siteColors: MapPaletteName[] = [
  'fjord',
  'dusk',
  'aurora',
  'sky',
  'orange',
  'nordic',
  'mountain',
  'fjord',
  'dusk',
  'aurora',
];

function MapLayoutMapArea({
  className,
  selectedSiteId,
  onSelectSite,
}: {
  className?: string;
  selectedSiteId?: string | null;
  onSelectSite?: (siteId: string) => void;
}): ReactNode {
  return (
    <div
      data-slot="map-area"
      className={cn('relative min-h-0 min-w-0 flex-1', className)}
    >
      <Map
        center={[4.5, 56.6]}
        zoom={3.6}
        geography={naturalEarth10m}
        className="absolute inset-0"
      >
        {mapSiteRows.map((site, index) => (
          <SiteMarker
            key={site.id}
            site={site}
            color={siteColors[index % siteColors.length] ?? 'fjord'}
            selected={selectedSiteId === site.id}
            onSelect={() => onSelectSite?.(site.id)}
          />
        ))}
      </Map>
    </div>
  );
}

function SiteMarker({
  site,
  color,
  selected,
  onSelect,
}: {
  site: MapSiteRow;
  color: MapPaletteName;
  selected: boolean;
  onSelect: () => void;
}): ReactNode {
  return (
    <MapMarker
      longitude={site.longitude}
      latitude={site.latitude}
      anchor="bottom"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={site.name}
      className="flex cursor-pointer flex-col items-center gap-1"
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      {selected ? (
        <MapMarkerLabel color={color} dot aria-hidden>
          {site.name}
        </MapMarkerLabel>
      ) : (
        <MapMarkerDot
          color={color}
          status={statusTones[site.status]}
          pulse={site.status === 'Online'}
          size="large"
          aria-hidden
        />
      )}
    </MapMarker>
  );
}

MapLayoutMapArea.displayName = 'MapLayoutMapArea';

export { MapLayoutMapArea };
