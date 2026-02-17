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
export type { ColorStop, ColorPalette, SemanticToken, ColorCategory, ColorPattern } from "./colors";
export {
  // eslint-disable-next-line react-refresh/only-export-components
  colorPalettes,
  // eslint-disable-next-line react-refresh/only-export-components
  semanticTokens,
  // eslint-disable-next-line react-refresh/only-export-components
  colorPatterns,
  // eslint-disable-next-line react-refresh/only-export-components
  getColorsByCategory,
  // eslint-disable-next-line react-refresh/only-export-components
  findPalette,
  // eslint-disable-next-line react-refresh/only-export-components
  getColorStop,
  // eslint-disable-next-line react-refresh/only-export-components
  getCssVar,
  // eslint-disable-next-line react-refresh/only-export-components
  getTailwindClass,
  // eslint-disable-next-line react-refresh/only-export-components
  colorExamples,
} from "./colors";
export { ColorsMetadata } from "./colors.metadata";
