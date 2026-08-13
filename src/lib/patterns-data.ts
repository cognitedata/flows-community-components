import {
  IconBellRinging,
  IconCommand,
  IconLayoutDashboard,
  IconListNumbers,
  IconMoodEmpty,
  IconRocket,
  IconSettings,
  IconTable,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export interface PatternEntry {
  name: string;
  description: string;
  icon: TablerIcon;
}

export const PATTERNS: PatternEntry[] = [
  {
    name: 'Command palette',
    description:
      'A keyboard-driven launcher for jumping between actions, pages, and search.',
    icon: IconCommand,
  },
  {
    name: 'Dashboard layout',
    description:
      'A data-dense overview screen combining metrics, charts, and tables.',
    icon: IconLayoutDashboard,
  },
  {
    name: 'Data table with filters',
    description:
      'A sortable, filterable table pattern for browsing and refining large datasets.',
    icon: IconTable,
  },
  {
    name: 'Empty state',
    description:
      'Guidance and a clear next step when a view has no content yet.',
    icon: IconMoodEmpty,
  },
  {
    name: 'Multi-step form',
    description:
      'A wizard-style flow that breaks a long form into focused, sequential steps.',
    icon: IconListNumbers,
  },
  {
    name: 'Notifications center',
    description:
      'A centralized panel for reviewing and acting on recent alerts and updates.',
    icon: IconBellRinging,
  },
  {
    name: 'Onboarding flow',
    description:
      'A guided first-run experience that gets new users to their first success.',
    icon: IconRocket,
  },
  {
    name: 'Settings page',
    description:
      'A two-column settings layout with grouped sections and inline forms.',
    icon: IconSettings,
  },
];

export interface PatternListItem {
  name: string;
  slug: string;
}

/** Every pattern, sorted alphabetically by name. */
export const ALL_PATTERNS: PatternListItem[] = PATTERNS.map((pattern) => ({
  name: pattern.name,
  slug: slugify(pattern.name),
})).sort((a, b) => a.name.localeCompare(b.name));

export function getPatternBySlug(slug: string) {
  return PATTERNS.find((pattern) => slugify(pattern.name) === slug) ?? null;
}
