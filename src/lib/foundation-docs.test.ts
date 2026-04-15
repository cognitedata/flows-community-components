import { describe, expect, it } from 'vitest';

import { foundationDocs, getFoundationDoc } from './foundation-docs';

describe('foundationDocs', () => {
  it('includes the current foundation slugs', () => {
    expect(Object.keys(foundationDocs).sort()).toEqual([
      'colors',
      'effects',
      'layouts',
      'typography',
    ]);
  });

  it('returns null for an unknown slug', () => {
    expect(getFoundationDoc('unknown')).toBeNull();
  });

  it('loads MDX content component for colors', () => {
    expect(typeof getFoundationDoc('colors')?.Content).toBe('function');
  });

  it('points layouts doc to Storybook foundations layout', () => {
    expect(getFoundationDoc('layouts')?.storybookUrl).toContain(
      '/docs/foundations-layout--docs'
    );
  });
});
