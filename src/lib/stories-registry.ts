import type { ComponentType } from 'react';
import { ButtonStoriesRenderer, buttonCodeExamples } from '@/components/button-stories-renderer';

/**
 * Registry mapping component slugs to their Storybook-based renderers.
 *
 * Components in this registry use Portable Stories (composeStories) to render
 * Storybook stories directly in the docs pages. This eliminates duplication
 * between Storybook and docs.
 *
 * Components NOT in this registry will fall back to the old examples system
 * (component-examples/*.examples.tsx).
 */
export const storyRenderers: Record<string, ComponentType> = {
  button: ButtonStoriesRenderer,
  // Add more components as they're migrated to portable stories:
  // card: CardStoriesRenderer,
  // badge: BadgeStoriesRenderer,
};

/**
 * Registry mapping component slugs to their code examples
 */
export const storyCodeExamplesRegistry: Record<string, Array<{ title: string; code: string }>> = {
  button: buttonCodeExamples,
  // Add more as components are migrated
};

/**
 * Check if a component has a story-based renderer
 */
export function hasStoryRenderer(slug: string): boolean {
  return slug in storyRenderers;
}

/**
 * Get the story renderer for a component, if it exists
 */
export function getStoryRenderer(slug: string): ComponentType | null {
  return storyRenderers[slug] || null;
}

/**
 * Get the code examples for a story-based component
 */
export function getStoryCodeExamples(slug: string): Array<{ title: string; code: string }> | null {
  return storyCodeExamplesRegistry[slug] || null;
}
