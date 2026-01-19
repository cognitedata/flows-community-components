import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Shimmer Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ShimmerMetadata: ComponentMeta = {
  name: 'Shimmer',
  status: 'draft',
  description:
    'An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.',
  llmUsage:
    'Use `<Shimmer>` with text content for loading states. Use variants like "nordic", "aurora", "dusk" for branded effects.',
  importPath: '@/components/ui/aura/shimmer',
};
