import {
  IconAlertOctagon,
  IconCarouselHorizontal,
  IconLayoutBottombar,
  IconLayoutSidebarRight,
  IconMap,
  IconMenu,
  IconMenu2,
  IconShieldCheck,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export interface CommunityComponentEntry {
  name: string;
  description: string;
  icon: TablerIcon;
}

export const COMMUNITY_COMPONENTS: CommunityComponentEntry[] = [
  {
    name: 'Alert Dialog',
    description: 'Interrupts the user to confirm a decision before proceeding.',
    icon: IconAlertOctagon,
  },
  {
    name: 'Carousel',
    description: 'Lets people browse a set of items one slide at a time.',
    icon: IconCarouselHorizontal,
  },
  {
    name: 'Confirmation',
    description:
      "Asks people to explicitly confirm a action before it's carried out.",
    icon: IconShieldCheck,
  },
  {
    name: 'Context Menu',
    description:
      "Shows relevant actions at the pointer's position on right-click.",
    icon: IconMenu2,
  },
  {
    name: 'Drawer',
    description:
      'A panel that slides in from the edge of the screen for secondary content.',
    icon: IconLayoutSidebarRight,
  },
  {
    name: 'Map',
    description:
      'An interactive map with theme-aware basemaps, built on MapLibre GL.',
    icon: IconMap,
  },
  {
    name: 'Menubar',
    description: 'A persistent horizontal menu for grouping related commands.',
    icon: IconMenu,
  },
  {
    name: 'Sheet',
    description:
      'A surface that slides up from the bottom to show supplementary content.',
    icon: IconLayoutBottombar,
  },
];

export interface CommunityComponentListItem {
  name: string;
  slug: string;
}

/** Every community component, sorted alphabetically by name. */
export const ALL_COMMUNITY_COMPONENTS: CommunityComponentListItem[] =
  COMMUNITY_COMPONENTS.map((component) => ({
    name: component.name,
    slug: slugify(component.name),
  })).sort((a, b) => a.name.localeCompare(b.name));

export function getCommunityComponentBySlug(slug: string) {
  return (
    COMMUNITY_COMPONENTS.find(
      (component) => slugify(component.name) === slug
    ) ?? null
  );
}
