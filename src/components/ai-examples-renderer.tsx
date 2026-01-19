
import { GenericStoriesRenderer } from '@/components/generic-stories-renderer';

interface AIExamplesRendererProps {
  slug: string;
}

/**
 * Renders AI component examples using the portable stories system.
 *
 * All AI components use GenericStoriesRenderer to render Storybook stories
 * and examples from the component folder structure.
 */
export function AIExamplesRenderer({ slug }: AIExamplesRendererProps) {
  return <GenericStoriesRenderer slug={slug} />;
}
