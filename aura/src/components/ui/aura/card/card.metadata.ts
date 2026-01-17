import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Card Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const CardMetadata: ComponentMeta = {
  name: 'Card',
  description:
    'A flexible card layout with header, content, action, and footer slots.',
  llmUsage:
    'Use `<Card>` with `<CardHeader>`, `<CardTitle>`, `<CardDescription>`, `<CardContent>`, and `<CardFooter>` for structured content containers.',
  importPath: '@/components/ui/aura/card',
};
