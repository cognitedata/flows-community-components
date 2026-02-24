import type { ComponentMeta } from '../../../../lib/types';

export const ArtifactMetadata: ComponentMeta = {
  name: 'Artifact',
  status: 'draft',
  description:
    'A generic artifact card shell for composing primitive content such as chart, list, progress, and metric-focused layouts.',
  llmUsage:
    'Use `<Artifact>` as a lightweight card wrapper around primitive content. Compose with Card subcomponents (`<CardHeader>`, `<CardHeaderLeft>`, `<CardHeaderContent>`, `<CardHeaderRight>`, `<CardContent>`, `<CardFooter>`) and artifact wrappers (`<ArtifactTitle>`, `<ArtifactDescription>`) for artifact-specific title/description usage while staying primitive-agnostic.',
};
