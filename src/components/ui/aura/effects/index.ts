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
  BorderRadius,
  Transition,
  EffectPattern,
} from './effects';
export {
  shadows,
  focusRings,
  borderRadii,
  transitions,
  effectPatterns,
  getShadow,
  getRadius,
  getFocusRingClasses,
  effectExamples,
} from './effects';
export { EffectsMetadata } from './effects.metadata';
