import type { ComponentMeta } from '../../../../lib/types';

/**
 * Artifact - Count Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ArtifactCountMetadata: ComponentMeta = {
  name: 'ArtifactCount',
  status: 'draft',
  description:
    'A compositional count artifact widget component for displaying prominent values with optional content and footer context.',
  llmUsage:
    'When showing a key metric, compose `<ArtifactCount>` with `<ArtifactCountHeader>` and `<ArtifactCountCount>`. Use the `variant` prop on `<ArtifactCountCount>` (`default`, `warning`, `critical`) to style the count chip. Add `<ArtifactCountSeparator>`, `<ArtifactCountContent>`, and `<ArtifactCountFooter>` when you need supporting information. Use `<ArtifactCountFooterLeft>`, `<ArtifactCountFooterCenter>`, and `<ArtifactCountFooterRight>` to align footer content, then add class names to style text.',
  codeExamples: [
    {
      title: 'Basic Count',
      description: 'A simple count widget with a single value.',
      code: `import {
  ArtifactCount,
  ArtifactCountHeader,
  ArtifactCountCount,
  ArtifactCountFooter,
  ArtifactCountFooterLeft,
  ArtifactCountFooterRight,
} from "@/components/ui/aura/artifact-count"

export function BasicDemo() {
  return (
    <ArtifactCount>
      <ArtifactCountHeader>
        <ArtifactCountCount variant="critical">392°C</ArtifactCountCount>
      </ArtifactCountHeader>
      <ArtifactCountFooter>
        <ArtifactCountFooterLeft>Temperature</ArtifactCountFooterLeft>
        <ArtifactCountFooterRight className="text-muted-foreground">
          Updated 2h ago
        </ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  )
}`,
    },
    {
      title: 'Count with Footer',
      description: 'A count widget with a separator and footer details.',
      code: `import {
  ArtifactCount,
  ArtifactCountHeader,
  ArtifactCountCount,
  ArtifactCountSeparator,
  ArtifactCountFooter,
  ArtifactCountFooterLeft,
  ArtifactCountFooterRight,
} from "@/components/ui/aura/artifact-count"

export function FooterDemo() {
  return (
    <ArtifactCount>
      <ArtifactCountHeader>
        <ArtifactCountCount variant="warning">392°C</ArtifactCountCount>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="justify-between text-sm text-muted-foreground">
        <ArtifactCountFooterLeft>Min: 384°C</ArtifactCountFooterLeft>
        <ArtifactCountFooterRight>Max: 390°C</ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  )
}`,
    },
  ],
};
