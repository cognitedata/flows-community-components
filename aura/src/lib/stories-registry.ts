/**
 * Stories Registry
 *
 * Tracks which components use the new folder structure with portable stories.
 * Components listed here will use GenericStoriesRenderer instead of the legacy
 * examples system.
 */
import { slugToPascalCase } from '@/lib/utils';

/**
 * Set of component slugs that use the folder structure with portable stories.
 * Add a component slug here when it's migrated to the new structure:
 *   src/components/ui/aura/{slug}/
 *     ├── index.tsx
 *     ├── {slug}.tsx
 *     ├── {slug}.stories.tsx
 *     ├── {slug}.test.tsx
 *     └── {slug}.metadata.ts
 */
export const componentsWithStories = new Set<string>([
  // Batch 1: Components with existing stories
  'avatar',
  'badge',
  'button',
  'card',
  'collapsible',
  'colors',
  'combobox',
  'confirmation',
  'dropdown-menu',
  'effects',
  'layout',
  'popover',
  'prompt-input',
  'shimmer',
  'sidebar',
  'suggestion',
  'swap-slot',
  'tooltip',
  // Batch 2: Component-examples components
  'accordion',
  'alert',
  'alert-dialog',
  'banner',
  'breadcrumb',
  'calendar',
  'checkbox',
  'command',
  'context-menu',
  'date-picker',
  'dialog',
  'drawer',
  'helper-text',
  'input',
  'kbd',
  'label',
  'menubar',
  'pagination',
  'progress',
  'radio-group',
  'select',
  'separator',
  'slider',
  'sonner-toast',
  'switch',
  'table',
  'tabs',
  'textarea',
  'time-input',
  'toggle',
  'topbar',
  // Batch 3: AI-examples components
  'artifact',
  'branch',
  'canvas',
  'chain-of-thought',
  'code-block',
  'connection',
  'context',
  'controls',
  'conversation',
  'edge',
  'image',
  'inline-citation',
  'loader',
  'message',
  'node',
  'open-in-chat',
  'panel',
  'plan',
  'queue',
  'reasoning',
  'reasoning-original',
  'sources',
  'task',
  'tool',
  'toolbar',
  // Batch 4: Components without examples
  'button-group',
  'carousel',
  'chart',
  'hover-card',
  'icon-conversation-empty-state',
  'input-group',
  'scroll-area',
  'sheet',
  'skeleton',
]);

/**
 * Check if a component uses the portable stories system
 */
export function hasStoryRenderer(slug: string): boolean {
  return componentsWithStories.has(slug);
}

/**
 * Get code examples for a component from its metadata file.
 * Returns null if the component doesn't use the folder structure.
 */
export async function getStoryCodeExamples(
  slug: string
): Promise<Array<{ title: string; code: string }> | null> {
  if (!hasStoryRenderer(slug)) {
    return null;
  }

  try {
    const pascalCaseSlug = slugToPascalCase(slug);

    const metadataModule = await import(
      `@/components/ui/aura/${slug}/${slug}.metadata`
    );
    const metadata = metadataModule[`${pascalCaseSlug}Metadata`];

    return metadata?.codeExamples || null;
  } catch (error) {
    console.error(`Failed to get story code examples for '${slug}':`, error);
    return null;
  }
}
