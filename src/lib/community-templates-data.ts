import {
  IconLayoutDashboard,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export interface CommunityTemplateEntry {
  name: string;
  description: string;
  icon: TablerIcon;
  registryId: string;
}

export const COMMUNITY_TEMPLATES: CommunityTemplateEntry[] = [
  {
    name: 'Dashboard',
    description:
      'A data-dense overview screen with metric cards, charts, and a table.',
    icon: IconLayoutDashboard,
    registryId: 'dashboard-template',
  },
];

export interface CommunityTemplateListItem {
  name: string;
  slug: string;
}

export const ALL_COMMUNITY_TEMPLATES: CommunityTemplateListItem[] =
  COMMUNITY_TEMPLATES.map((template) => ({
    name: template.name,
    slug: slugify(template.name),
  })).sort((a, b) => a.name.localeCompare(b.name));

export function getCommunityTemplateBySlug(slug: string) {
  return (
    COMMUNITY_TEMPLATES.find((template) => slugify(template.name) === slug) ??
    null
  );
}
