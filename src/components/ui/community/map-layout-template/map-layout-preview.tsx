import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardTitle,
} from '@cognite/aura/components';
import type { ReactNode } from 'react';

import {
  formatMapDate,
  mapAssetStatuses,
  type MapSiteRow,
} from './map-layout-template.data';

function MapLayoutPreview({ site }: { site: MapSiteRow }): ReactNode {
  const initials = site.name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <aside
      data-slot="map-preview"
      aria-label="Preview"
      className="flex w-[282px] shrink-0 flex-col border-l"
    >
      <div className="flex items-start gap-3 px-3 py-3">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <CardTitle className="truncate font-sans text-base font-medium leading-5 tracking-normal">
            {site.name}
          </CardTitle>
          <CardDescription className="truncate">{site.type}</CardDescription>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3">
        <CardContent className="flex flex-col gap-3">
          <Badge variant={mapAssetStatuses[site.status]}>{site.status}</Badge>
          <span className="text-sm text-foreground">{site.description}</span>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <span>Area: {site.area}</span>
            <span>Owner: {site.owner}</span>
            <span>Last inspection: {formatMapDate(site.lastInspection)}</span>
          </div>
        </CardContent>
      </div>
      <div className="flex gap-2 border-t px-3 py-3">
        <Button variant="secondary" className="flex-1">
          Add comment
        </Button>
        <Button className="flex-1">View details</Button>
      </div>
    </aside>
  );
}

MapLayoutPreview.displayName = 'MapLayoutPreview';

export { MapLayoutPreview };
