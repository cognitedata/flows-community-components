/**
 * Colors System
 *
 * Color palette definitions, semantic tokens, and usage patterns
 * for the Aura design system. Includes structured data for LLM
 * consumption with CSS variables and Tailwind classes.
 *
 * @example
 * import { colorPalettes, getColorsByCategory } from '@/components/ui/aura/colors';
 *
 * const decorativeColors = getColorsByCategory('decorative');
 */
export type { ColorStop, ColorPalette, SemanticToken, ColorCategory, ColorPattern } from './colors';
export {
  colorPalettes,
  semanticTokens,
  colorPatterns,
  getColorsByCategory,
  findPalette,
  getColorStop,
  getCssVar,
  getTailwindClass,
  colorExamples,
} from './colors';
export { ColorsMetadata } from './colors.metadata';
