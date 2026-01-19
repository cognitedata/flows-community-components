import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Effects System Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const EffectsMetadata: ComponentMeta = {
  name: 'Effects',
  status: 'draft',
  description:
    'Effect definitions for the Aura design system including shadows, focus rings, border radii, and animation patterns.',
  llmUsage:
    'Use `getShadow()` for shadow values, `getRadius()` for border radius, and `getFocusRingClasses()` for accessible focus indicators.',
  importPath: '@/components/ui/aura/effects',
};
