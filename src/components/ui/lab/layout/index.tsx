/**
 * Layout System
 *
 * Layout and grid definitions for the Aura design system including
 * breakpoints, grid configurations, and container query patterns.
 *
 * @example
 * import { layoutBreakpoints, getBreakpoint, gridPatterns } from '@cognite/aura-lab/layout';
 *
 * const mdBreakpoint = getBreakpoint('md');
 */
export type { LayoutBreakpoint, ColumnSpan, GridPattern, LayoutComposition } from "./layout";
export {
  // eslint-disable-next-line react-refresh/only-export-components
  layoutBreakpoints,
  // eslint-disable-next-line react-refresh/only-export-components
  gridPatterns,
  // eslint-disable-next-line react-refresh/only-export-components
  columnSpans,
  // eslint-disable-next-line react-refresh/only-export-components
  layoutCompositions,
  // eslint-disable-next-line react-refresh/only-export-components
  getBreakpoint,
  // eslint-disable-next-line react-refresh/only-export-components
  getContainerPrefix,
  // eslint-disable-next-line react-refresh/only-export-components
  getResponsiveSpan,
  // eslint-disable-next-line react-refresh/only-export-components
  layoutExamples,
} from "./layout";
export { LayoutMetadata } from "./layout.metadata";
