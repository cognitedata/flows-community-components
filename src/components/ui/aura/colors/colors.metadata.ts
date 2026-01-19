import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Colors System Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ColorsMetadata: ComponentMeta = {
  name: 'Colors',
  status: 'draft',
  description:
    'Color palette definitions, semantic tokens, and usage patterns for the Aura design system. Includes structured data for LLM consumption with CSS variables and Tailwind classes.',
  llmUsage:
    'Use `getColorsByCategory()` to get palettes by category (base, decorative, semantic, extended). Use `getCssVar()` and `getTailwindClass()` for programmatic color access.',
  importPath: '@/components/ui/aura/colors',
};
