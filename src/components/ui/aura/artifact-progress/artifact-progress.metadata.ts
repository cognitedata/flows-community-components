import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Artifact - Progress Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ArtifactProgressMetadata: ComponentMeta = {
  name: 'ArtifactProgress',

  description:
    'A compositional progress artifact widget component that displays task completion progress with header and footer context.',

  llmUsage:
    'When showing progress for tasks or workflows, compose `<ArtifactProgress>` with `<ArtifactProgressHeader>`, `<ArtifactProgressTitle>`, `<ArtifactProgressDescription>`, `<ArtifactProgressContent>`, and `<ArtifactProgressFooter>` subcomponents. All subcomponents have sensible default styling.',

  importPath: '@/components/ui/aura/artifact-progress/artifact-progress',

  codeExamples: [
    {
      title: 'Basic Progress Artifact',
      description: 'A progress widget showing task completion with header and footer.',
      code: `import {
  ArtifactProgress,
  ArtifactProgressHeader,
  ArtifactProgressTitle,
  ArtifactProgressDescription,
  ArtifactProgressContent,
  ArtifactProgressFooter,
} from "@/components/ui/aura/artifact-progress/artifact-progress"

export function BasicDemo() {
  return (
    <ArtifactProgress>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle>Progress title</ArtifactProgressTitle>
        <ArtifactProgressDescription>
          8 of 12 tasks complete
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressContent value={32} aria-label="Task completion progress" />
      <ArtifactProgressFooter>
        On track for completion by Friday
      </ArtifactProgressFooter>
    </ArtifactProgress>
  )
}`,
    },
    {
      title: 'Custom Styling',
      description: 'Override default styles with custom classes.',
      code: `import {
  ArtifactProgress,
  ArtifactProgressHeader,
  ArtifactProgressTitle,
  ArtifactProgressDescription,
  ArtifactProgressContent,
  ArtifactProgressFooter,
} from "@/components/ui/aura/artifact-progress/artifact-progress"

export function CustomStyleDemo() {
  return (
    <ArtifactProgress>
      <ArtifactProgressHeader>
        <ArtifactProgressTitle className="text-lg">
          Custom Styled Title
        </ArtifactProgressTitle>
        <ArtifactProgressDescription className="text-xs italic">
          Custom description styling
        </ArtifactProgressDescription>
      </ArtifactProgressHeader>
      <ArtifactProgressContent value={75} aria-label="Custom task progress" />
      <ArtifactProgressFooter>Almost complete!</ArtifactProgressFooter>
    </ArtifactProgress>
  )
}`,
    },
  ],
};
