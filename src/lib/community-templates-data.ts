import type { Icon as TablerIcon } from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export interface CommunityTemplateEntry {
  name: string;
  description: string;
  icon: TablerIcon;
}

export const COMMUNITY_TEMPLATES: CommunityTemplateEntry[] = [];

export function getCommunityTemplateBySlug(slug: string) {
  return (
    COMMUNITY_TEMPLATES.find((template) => slugify(template.name) === slug) ??
    null
  );
}
