import { Shimmer } from '@/components/ui/aura/shimmer';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicShimmerDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Loading shimmer effect:</p>
      <div className="border rounded-lg p-4 h-12">
        <Shimmer>Processing...</Shimmer>
      </div>
    </div>
  );
}

function GradientVariantsDemo() {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer variant="nordic">Nordic gradient</Shimmer>
      <Shimmer variant="aurora">Aurora gradient</Shimmer>
      <Shimmer variant="dusk">Dusk gradient</Shimmer>
      <Shimmer variant="equinox">Equinox gradient</Shimmer>
      <Shimmer variant="summer">Summer gradient</Shimmer>
      <Shimmer variant="spring">Spring gradient</Shimmer>
      <Shimmer variant="fall">Fall gradient</Shimmer>
    </div>
  );
}

export const shimmerExamples: ComponentExamples = {
  basic: {
    title: 'Basic Shimmer',
    description: 'Animated shimmer effect for loading states',
    component: BasicShimmerDemo,
    difficulty: 'beginner',
    code: `import { Shimmer } from "@/components/ai-elements/cognite/shimmer"

export function BasicShimmerDemo() {
  return (
    <Shimmer>Processing...</Shimmer>
  )
}`,
  },

  gradients: {
    title: 'Gradient Variants',
    description: 'Shimmer effects with seasonal and brand colour gradients',
    component: GradientVariantsDemo,
    difficulty: 'beginner',
    code: `import { Shimmer } from "@/components/ai-elements/cognite/shimmer"

export function GradientVariantsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Shimmer variant="nordic">Nordic gradient</Shimmer>
      <Shimmer variant="aurora">Aurora gradient</Shimmer>
      <Shimmer variant="dusk">Dusk gradient</Shimmer>
      <Shimmer variant="equinox">Equinox gradient</Shimmer>
      <Shimmer variant="summer">Summer gradient</Shimmer>
      <Shimmer variant="spring">Spring gradient</Shimmer>
      <Shimmer variant="fall">Fall gradient</Shimmer>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const shimmerMeta = {
  name: 'Shimmer',
  description:
    'An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.',
  importPath: '@/components/ai-elements/cognite/shimmer',
};
