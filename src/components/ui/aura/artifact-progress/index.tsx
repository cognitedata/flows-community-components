/**
 * Artifact - Progress Component
 *
 * A compositional progress artifact widget component that displays task completion
 * progress with header and footer context.
 *
 * @example
 * import {
 *   ArtifactProgress,
 *   ArtifactProgressHeader,
 *   ArtifactProgressTitle,
 *   ArtifactProgressDescription,
 *   ArtifactProgressBar,
 *   ArtifactProgressFooter,
 * } from '@/components/ui/aura/artifact-progress';
 *
 * <ArtifactProgress>
 *   <ArtifactProgressHeader>
 *     <ArtifactProgressTitle>Progress title</ArtifactProgressTitle>
 *     <ArtifactProgressDescription>8 of 12 tasks complete</ArtifactProgressDescription>
 *   </ArtifactProgressHeader>
 *   <ArtifactProgressBar value={32} />
 *   <ArtifactProgressFooter>On track for completion by Friday</ArtifactProgressFooter>
 * </ArtifactProgress>
 */
export {
  ArtifactProgress,
  ArtifactProgressHeader,
  ArtifactProgressTitle,
  ArtifactProgressDescription,
  ArtifactProgressBar,
  ArtifactProgressFooter,
} from "./artifact-progress";
export type {
  ArtifactProgressProps,
  ArtifactProgressHeaderProps,
  ArtifactProgressTitleProps,
  ArtifactProgressDescriptionProps,
  ArtifactProgressBarProps,
  ArtifactProgressFooterProps,
} from "./artifact-progress";
export { ArtifactProgressMetadata } from "./artifact-progress.metadata";
