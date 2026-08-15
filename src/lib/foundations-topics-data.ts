import {
  IconAccessible,
  IconBulb,
  IconFileText,
  IconIcons,
  IconLayoutGrid,
  IconPalette,
  IconRulerMeasure,
  IconSparkles,
  IconTypography,
  IconWaveSine,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import { slugify } from '@/lib/utils';

export interface FoundationTopic {
  name: string;
  description: string;
  icon: TablerIcon;
  /** Number of grid columns this card spans at the `lg` breakpoint (defaults to 1). */
  colSpan?: 2 | 3;
  /** If set, the whole card links here instead of being static. */
  href?: string;
  /** Static image shown in the card by default, in place of the icon. */
  image?: string;
  /** Video shown in place of `image` on hover, autoplaying and looping. */
  hoverVideo?: string;
}

export const FOUNDATION_TOPICS: FoundationTopic[] = [
  {
    name: 'Design heuristics',
    description:
      'The core principles and rules of thumb that guide every design decision.',
    icon: IconBulb,
  },
  {
    name: 'Color tokens',
    description:
      'The palette, semantic tokens, and light/dark theming rules behind every surface.',
    icon: IconPalette,
    image: '/foundations/color-default.png',
    hoverVideo: '/foundations/color-hover.mp4',
  },
  {
    name: 'Layout and grids',
    description:
      'Spacing scale, breakpoints, and the grid system pages are built on.',
    icon: IconLayoutGrid,
    image: '/foundations/layouts-default.png',
    hoverVideo: '/foundations/layouts-hover.mp4',
  },
  {
    name: 'Size and spacing tokens',
    description:
      'Spacing, sizing, radius, and stroke tokens for hierarchy and rhythm in layouts.',
    icon: IconRulerMeasure,
  },
  {
    name: 'Typography',
    description:
      'Type scale, font pairing, and hierarchy guidance for headings and body text.',
    icon: IconTypography,
  },
  {
    name: 'Motion',
    description:
      'Duration, easing, and guidance for when — and when not — to animate.',
    icon: IconWaveSine,
    colSpan: 2,
  },
  {
    name: 'Effects',
    description:
      'Shadows, blur, and elevation used to layer surfaces consistently.',
    icon: IconSparkles,
  },
  {
    name: 'Assets and icons',
    description:
      'The icon set, logo lockups, and imagery guidelines for on-brand visuals.',
    icon: IconIcons,
  },
  {
    name: 'Accessibility',
    description:
      'Contrast, focus states, and keyboard support baked into every component.',
    icon: IconAccessible,
  },
  {
    name: 'Content',
    description:
      'Voice, tone, and writing guidelines for UI copy across the system.',
    icon: IconFileText,
  },
];

export function getFoundationTopicBySlug(slug: string) {
  return (
    FOUNDATION_TOPICS.find((topic) => slugify(topic.name) === slug) ?? null
  );
}
