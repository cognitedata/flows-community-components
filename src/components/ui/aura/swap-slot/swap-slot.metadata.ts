import type { ComponentMeta } from '@/lib/component-examples';

/**
 * SwapSlot Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const SwapSlotMetadata: ComponentMeta = {
  name: 'SwapSlot',
  description:
    'A container component that swaps between default and active slots, useful for showing different content based on state.',
  llmUsage:
    'Use `<SwapSlot defaultSlot={<Default />} activeSlot={<Active />} />` to swap content based on state.',
  importPath: '@/components/ui/aura/swap-slot',
  docsStories: [
    {
      storyKey: 'Default',
      title: 'Default SwapSlot',
      description: 'Basic swap slot with default content.',
    },
    {
      storyKey: 'WithActiveSlot',
      title: 'With Active Slot',
      description: 'Swap slot showing active content.',
    },
  ],
};
