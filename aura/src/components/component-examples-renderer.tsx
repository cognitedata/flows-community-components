
import { GenericStoriesRenderer } from './generic-stories-renderer';

interface ComponentExamplesRendererProps {
  slug: string;
}

/**
 * Renders component examples using the portable stories system.
 *
 * All components use GenericStoriesRenderer to render Storybook stories
 * and examples from the component folder structure.
 */
export function ComponentExamplesRenderer({
  slug,
}: ComponentExamplesRendererProps) {
  return <GenericStoriesRenderer slug={slug} />;
}
