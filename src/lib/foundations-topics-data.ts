import {
  IconAccessible,
  IconBulb,
  IconFileText,
  IconIcons,
  IconLayoutGrid,
  IconPalette,
  IconRulerMeasure,
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
  /** When true, the topic is omitted from navigation and overview. */
  hidden?: boolean;
}

export const FOUNDATION_TOPICS: FoundationTopic[] = [
  {
    name: 'Design heuristics',
    description:
      'The core principles and rules of thumb that guide every design decision.',
    icon: IconBulb,
    image: '/foundations/design-heuristics-default.png',
    hoverVideo: '/foundations/design-heuristics-hover.mp4',
  },
  {
    name: 'Color tokens',
    description:
      'The palette, semantic tokens, and light/dark theming rules behind every surface.',
    icon: IconPalette,
    image: '/foundations/colors-default.png',
    hoverVideo: '/foundations/colors-hover.mp4',
  },
  {
    name: 'Layout and grids',
    description:
      'Spacing scale, breakpoints, and the grid system pages are built on.',
    icon: IconLayoutGrid,
    image: '/foundations/layouts-grids-default.png',
    hoverVideo: '/foundations/layouts-grids-hover.mp4',
    hidden: true,
  },
  {
    name: 'Size & spacing tokens',
    description:
      'Spacing, sizing, radius, and stroke tokens for hierarchy and rhythm in layouts.',
    icon: IconRulerMeasure,
    image: '/foundations/size-spacing-default.png',
    hoverVideo: '/foundations/size-spacing-hover.mp4',
  },
  {
    name: 'Typography',
    description:
      'Type scale, font pairing, and hierarchy guidance for headings and body text.',
    icon: IconTypography,
    image: '/foundations/typography-default.png',
    hoverVideo: '/foundations/typography-hover.mp4',
  },
  {
    name: 'Motion & effects',
    description:
      'Duration, easing, elevation, and focus styling — and when to use each.',
    icon: IconWaveSine,
    image: '/foundations/motion-default.png',
    hoverVideo: '/foundations/motion-hover.mp4',
  },
  {
    name: 'Assets & icons',
    description:
      'The icon set, logo lockups, and imagery guidelines for on-brand visuals.',
    icon: IconIcons,
    image: '/foundations/assets-icons-default.png',
    hoverVideo: '/foundations/assets-icons-hover.mp4',
  },
  {
    name: 'Accessibility',
    description:
      'Contrast, focus states, and keyboard support baked into every component.',
    icon: IconAccessible,
    image: '/foundations/accessibility-default.png',
    hoverVideo: '/foundations/accessibility-hover.mp4',
  },
  {
    name: 'Content',
    description:
      'Voice, tone, and writing guidelines for UI copy across the system.',
    icon: IconFileText,
    image: '/foundations/content-default.png',
    hoverVideo: '/foundations/content-hover.mp4',
  },
].map((topic) => ({
  ...topic,
  href: `/aura/foundations/${slugify(topic.name)}`,
  hoverVideo: topic.hoverVideo ? `${topic.hoverVideo}?v=2` : undefined,
}));

export const VISIBLE_FOUNDATION_TOPICS = FOUNDATION_TOPICS.filter(
  (topic) => !topic.hidden
);

export const FOUNDATION_SLUG_ALIASES: Record<string, string> = {
  motion: 'motion-effects',
  effects: 'motion-effects',
  'assets-and-icons': 'assets-icons',
  'size-and-spacing-tokens': 'size-spacing-tokens',
};

export function resolveFoundationSlug(slug: string) {
  return FOUNDATION_SLUG_ALIASES[slug] ?? slug;
}

export function getFoundationTopicBySlug(slug: string) {
  const resolved = resolveFoundationSlug(slug);
  const topic =
    FOUNDATION_TOPICS.find((topic) => slugify(topic.name) === resolved) ??
    null;
  if (!topic || topic.hidden) return null;
  return topic;
}
