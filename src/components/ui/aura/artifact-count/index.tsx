/**
 * Artifact - Count Component
 *
 * A compositional count artifact widget component for displaying prominent
 * values with optional content and footer context.
 *
 * @example
 * import {
 *   ArtifactCount,
 *   ArtifactCountHeader,
 *   ArtifactCountCount,
 *   ArtifactCountSeparator,
 *   ArtifactCountFooter,
 * } from "@/components/ui/aura/artifact-count";
 *
 * <ArtifactCount>
 *   <ArtifactCountHeader>
 *     <ArtifactCountCount>392°C</ArtifactCountCount>
 *   </ArtifactCountHeader>
 *   <ArtifactCountSeparator />
 *   <ArtifactCountFooter className="justify-between text-sm">
 *     <span>Min: 384°C</span>
 *     <span>Max: 390°C</span>
 *   </ArtifactCountFooter>
 * </ArtifactCount>
 */
export {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountCount,
  ArtifactCountFooter,
  ArtifactCountHeader,
  ArtifactCountSeparator,
  ArtifactCountTag,
  artifactCountCountVariants,
} from "./artifact-count";
export { ArtifactCountMetadata } from "./artifact-count.metadata";
