/**
 * Layout System
 *
 * Layout and grid definitions for the Aura design system including
 * breakpoints, grid configurations, and container query patterns.
 *
 * @example
 * import { layoutBreakpoints, getBreakpoint, gridPatterns } from '@/components/ui/aura/layout';
 *
 * const mdBreakpoint = getBreakpoint('md');
 */
export type { LayoutBreakpoint, ColumnSpan, GridPattern, LayoutComposition } from './layout';
export {
  layoutBreakpoints,
  gridPatterns,
  columnSpans,
  layoutCompositions,
  getBreakpoint,
  getContainerPrefix,
  getResponsiveSpan,
  layoutExamples,
} from './layout';
export { LayoutMetadata } from './layout.metadata';
