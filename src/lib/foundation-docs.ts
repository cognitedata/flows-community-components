import type { ComponentType } from 'react';

import ColorsFoundationContent from '../../docs/foundations/colors.mdx';
import EffectsFoundationContent from '../../docs/foundations/effects.mdx';
import LayoutsFoundationContent from '../../docs/foundations/layouts.mdx';
import TypographyFoundationContent from '../../docs/foundations/typography.mdx';

export type FoundationDocSlug = 'colors' | 'effects' | 'layouts' | 'typography';

export interface FoundationDoc {
  slug: FoundationDocSlug;
  title: string;
  description: string;
  Content: ComponentType<Record<string, unknown>>;
  storybookUrl: string;
}

export const foundationDocs: Record<FoundationDocSlug, FoundationDoc> = {
  colors: {
    slug: 'colors',
    title: 'Colors',
    description:
      'Design tokens grouped by role and ordered per globals.css, with live palette ramps.',
    Content: ColorsFoundationContent,
    storybookUrl:
      'https://cognitedata.github.io/aura/storybook/?path=/docs/foundations-colors--docs',
  },
  effects: {
    slug: 'effects',
    title: 'Effects',
    description:
      'Elevation shadows and keyboard focus rings with light and dark previews.',
    Content: EffectsFoundationContent,
    storybookUrl:
      'https://cognitedata.github.io/aura/storybook/?path=/docs/foundations-effects--docs',
  },
  layouts: {
    slug: 'layouts',
    title: 'Layouts',
    description:
      'Container query breakpoints, 12-column grid, max-width steps, and interactive layout demos.',
    Content: LayoutsFoundationContent,
    storybookUrl:
      'https://cognitedata.github.io/aura/storybook/?path=/docs/foundations-layout--docs',
  },
  typography: {
    slug: 'typography',
    title: 'Typography',
    description:
      'Type scale and font weights for text, marketing, and code in the design system.',
    Content: TypographyFoundationContent,
    storybookUrl:
      'https://cognitedata.github.io/aura/storybook/?path=/docs/foundations-typography--docs',
  },
};

export function getFoundationDoc(slug: string): FoundationDoc | null {
  return foundationDocs[slug as FoundationDocSlug] ?? null;
}
