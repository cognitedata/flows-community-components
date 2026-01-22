import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Artifact - Count Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ArtifactCountMetadata: ComponentMeta = {
  name: "ArtifactCount",
  status: "draft",
  description:
    "A compositional count artifact widget component for displaying prominent values with optional content and footer context.",
  llmUsage:
    "When showing a key metric, compose `<ArtifactCount>` with `<ArtifactCountHeader>` and `<ArtifactCountCount>`. Use the `status` prop on `<ArtifactCountCount>` (`default`, `warning`, `critical`) to style the count chip. Add `<ArtifactCountSeparator>`, `<ArtifactCountContent>`, and `<ArtifactCountFooter>` when you need supporting information. Layout footer content with flex utilities in usage code.",
  importPath: "@/components/ui/aura/artifact-count",
  codeExamples: [
    {
      title: "Basic Count",
      description: "A simple count widget with a single value.",
      code: `import {
  ArtifactCount,
  ArtifactCountHeader,
  ArtifactCountCount,
} from "@/components/ui/aura/artifact-count"

export function BasicDemo() {
  return (
    <ArtifactCount>
      <ArtifactCountHeader>
        <ArtifactCountCount status="critical">392°C</ArtifactCountCount>
      </ArtifactCountHeader>
    </ArtifactCount>
  )
}`,
    },
    {
      title: "Count with Footer",
      description: "A count widget with a separator and footer details.",
      code: `import {
  ArtifactCount,
  ArtifactCountHeader,
  ArtifactCountCount,
  ArtifactCountSeparator,
  ArtifactCountFooter,
} from "@/components/ui/aura/artifact-count"

export function FooterDemo() {
  return (
    <ArtifactCount>
      <ArtifactCountHeader>
        <ArtifactCountCount status="warning">392°C</ArtifactCountCount>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="justify-between text-sm text-muted-foreground">
        <span>Min: 384°C</span>
        <span>Max: 390°C</span>
      </ArtifactCountFooter>
    </ArtifactCount>
  )
}`,
    },
  ],
};
