import type { ComponentMeta } from '../../../../lib/types';

export const ArtifactMetadata: ComponentMeta = {
  name: 'Artifact',
  status: 'draft',
  description:
    'A generic artifact card shell for composing primitive content such as chart, list, progress, and metric-focused layouts.',
  llmUsage:
    'Use `<Artifact>` as a lightweight card wrapper around primitive content. Compose with Card subcomponents (`<CardHeader>`, `<CardHeaderLeft>`, `<CardHeaderContent>`, `<CardHeaderRight>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, `<CardFooter>`) and `<ArtifactTitle>` for artifact-specific title styling (`text-base tracking-tighter`) to build artifact-specific layouts without relying on artifact-only subcomponents.',
};
