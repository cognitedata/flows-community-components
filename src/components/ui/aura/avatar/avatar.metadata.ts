import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Avatar Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const AvatarMetadata: ComponentMeta = {
  name: 'Avatar',
  description:
    'An image element with a fallback for representing users. Supports multiple color variants, sizes, and composable sub-components.',
  llmUsage:
    'When displaying user avatars, use `<Avatar>` with `<AvatarImage>` and `<AvatarFallback>` for graceful degradation. Use `<AvatarIcon>` for icon-only avatars.',
  importPath: '@/components/ui/aura/avatar',
  docsStories: [
    {
      storyKey: 'Default',
      title: 'Default Avatar',
      description: 'Basic avatar with fallback initials.',
    },
    {
      storyKey: 'WithImage',
      title: 'With Image',
      description: 'Avatar with profile image and fallback.',
    },
    {
      storyKey: 'Variants',
      title: 'Color Variants',
      description: 'Different color variants for visual distinction.',
    },
  ],
};
