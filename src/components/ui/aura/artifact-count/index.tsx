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
 *   ArtifactCountFooterLeft,
 *   ArtifactCountFooterRight,
 * } from "@/components/ui/aura/artifact-count";
 *
 * <ArtifactCount>
 *   <ArtifactCountHeader>
 *     <ArtifactCountCount>392°C</ArtifactCountCount>
 *   </ArtifactCountHeader>
 *   <ArtifactCountSeparator />
 *   <ArtifactCountFooter className="justify-between text-sm">
 *     <ArtifactCountFooterLeft>
 *       <span>Min: 384°C</span>
 *     </ArtifactCountFooterLeft>
 *     <ArtifactCountFooterRight>
 *       <span>Max: 390°C</span>
 *     </ArtifactCountFooterRight>
 *   </ArtifactCountFooter>
 * </ArtifactCount>
 */
export {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountCount,
  ArtifactCountFooter,
  ArtifactCountFooterCenter,
  ArtifactCountFooterLeft,
  ArtifactCountFooterRight,
  ArtifactCountHeader,
  ArtifactCountSeparator,
  ArtifactCountTag,
  artifactCountCountVariants,
} from "./artifact-count";
export { ArtifactCountMetadata } from "./artifact-count.metadata";
