import { AlertDialogMetadata } from '../components/ui/community/alert-dialog/alert-dialog.metadata';
import { CarouselMetadata } from '../components/ui/community/carousel/carousel.metadata';
import { ConfirmationMetadata } from '../components/ui/community/confirmation/confirmation.metadata';
import { ContextMenuMetadata } from '../components/ui/community/context-menu/context-menu.metadata';
import { DashboardTemplateMetadata } from '../components/ui/community/dashboard-template/dashboard-template.metadata';
import { DrawerMetadata } from '../components/ui/community/drawer/drawer.metadata';
import { MapMetadata } from '../components/ui/community/map/map.metadata';
import { MapLayoutTemplateMetadata } from '../components/ui/community/map-layout-template/map-layout-template.metadata';
import { MenubarMetadata } from '../components/ui/community/menubar/menubar.metadata';
import { RecordListTemplateMetadata } from '../components/ui/community/record-list-template/record-list-template.metadata';
import { SheetMetadata } from '../components/ui/community/sheet/sheet.metadata';
import { TimeSeriesChartMetadata } from '../components/ui/community/time-series-chart/time-series-chart.metadata';

import { getInstallCommands } from './install-snippets';
import type { ComponentMeta } from './types';

export type CommunityCatalogItem = {
  id: string;
  name: string;
  description: string;
  install: string;
  status: NonNullable<ComponentMeta['status']>;
  notes?: string[];
  llmUsage?: string;
};

const communityMetaById: Record<string, ComponentMeta> = {
  'alert-dialog': AlertDialogMetadata,
  carousel: CarouselMetadata,
  confirmation: ConfirmationMetadata,
  'context-menu': ContextMenuMetadata,
  'dashboard-template': DashboardTemplateMetadata,
  'map-layout-template': MapLayoutTemplateMetadata,
  'record-list-template': RecordListTemplateMetadata,
  drawer: DrawerMetadata,
  map: MapMetadata,
  menubar: MenubarMetadata,
  sheet: SheetMetadata,
  'time-series-chart': TimeSeriesChartMetadata,
};

function toCatalogItem(id: string, meta: ComponentMeta): CommunityCatalogItem {
  return {
    id,
    name: meta.name,
    description: meta.description,
    install: getInstallCommands(id).npm,
    status: meta.status ?? 'experimental',
    notes: meta.notes,
    llmUsage: meta.llmUsage,
  };
}

export function getCommunityCatalog(): CommunityCatalogItem[] {
  return Object.entries(communityMetaById)
    .filter(([, meta]) => meta.status !== 'pattern')
    .map(([id, meta]) => toCatalogItem(id, meta))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCommunityComponent(
  id: string
): CommunityCatalogItem | undefined {
  const meta = communityMetaById[id];
  if (!meta) {
    return undefined;
  }
  return toCatalogItem(id, meta);
}
