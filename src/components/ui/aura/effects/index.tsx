/**
 * Effects System
 *
 * Effect definitions for the Aura design system including shadows,
 * focus rings, border radii, and animation patterns.
 *
 * @example
 * import { shadows, getShadow, getFocusRingClasses } from '@/components/ui/aura/effects';
 *
 * const shadowValue = getShadow('shadow-md');
 */
export type {
  Shadow,
  FocusRing,
  RingWidth,
  BorderRadius,
  Transition,
  EffectPattern,
} from "./effects";
export {
  // eslint-disable-next-line react-refresh/only-export-components
  shadows,
  // eslint-disable-next-line react-refresh/only-export-components
  focusRings,
  // eslint-disable-next-line react-refresh/only-export-components
  ringWidths,
  // eslint-disable-next-line react-refresh/only-export-components
  borderRadii,
  // eslint-disable-next-line react-refresh/only-export-components
  transitions,
  // eslint-disable-next-line react-refresh/only-export-components
  effectPatterns,
  // eslint-disable-next-line react-refresh/only-export-components
  getShadow,
  // eslint-disable-next-line react-refresh/only-export-components
  getRadius,
  // eslint-disable-next-line react-refresh/only-export-components
  getFocusRingClasses,
  // eslint-disable-next-line react-refresh/only-export-components
  effectExamples,
} from "./effects";
export { EffectsMetadata } from "./effects.metadata";
