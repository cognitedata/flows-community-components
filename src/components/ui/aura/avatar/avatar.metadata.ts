import type { ComponentMeta } from '../../../../lib/types';

/**
 * Avatar Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const AvatarMetadata: ComponentMeta = {
  name: 'Avatar',
  status: 'ready-for-ga',
  description:
    'An image element with a fallback for representing users. Supports multiple color variants, sizes, and composable sub-components.',
  llmUsage:
    'When displaying user avatars, use `<Avatar>` with `<AvatarImage>` and `<AvatarFallback>` for graceful degradation. Use `<AvatarIcon>` for icon-only avatars.',
};
