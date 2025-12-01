import { Loader } from '@/components/ui/aura/loader';
import { Shimmer } from '@/components/ui/aura/shimmer';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicLoaderDemo() {
  return (
    <div className="flex items-center justify-center p-8 border rounded-lg">
      <Loader />
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex items-center gap-4 p-8 border rounded-lg">
      <Loader size={12} />
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={32} />
    </div>
  );
}

function InlineLoaderDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <span className="text-sm text-muted-foreground">
          Processing your request...
        </span>
      </div>
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={20} />
        <span className="text-sm">Generating response...</span>
      </div>
    </div>
  );
}

function WithShimmerDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <Shimmer className="text-sm">
          Analyzing vibration data from pump 21PT1019...
        </Shimmer>
      </div>
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <Shimmer className="text-sm">
          Generating maintenance recommendations...
        </Shimmer>
      </div>
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <Shimmer className="text-sm">Processing sensor readings...</Shimmer>
      </div>
    </div>
  );
}

function ContentLoadingDemo() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="p-6 border rounded-lg space-y-4">
        <div className="flex items-center gap-3">
          <Loader size={20} />
          <Shimmer as="h3" className="text-base font-semibold">
            Loading analysis results
          </Shimmer>
        </div>
        <div className="space-y-3 pl-8">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
        </div>
      </div>

      <div className="p-6 border rounded-lg space-y-4">
        <div className="flex items-center gap-3">
          <Loader size={20} />
          <Shimmer as="h3" className="text-base font-semibold">
            Retrieving historical maintenance records
          </Shimmer>
        </div>
        <div className="space-y-3 pl-8">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        </div>
      </div>
    </div>
  );
}

export const loaderExamples: ComponentExamples = {
  basic: {
    title: 'Basic Loader',
    description: 'A simple spinning loader icon',
    component: BasicLoaderDemo,
    difficulty: 'beginner',
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"

export function BasicLoaderDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader />
    </div>
  )
}`,
  },

  sizes: {
    title: 'Different Sizes',
    description: 'Loader component with custom size',
    component: SizesDemo,
    difficulty: 'beginner',
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"

export function SizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Loader size={12} />
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={32} />
    </div>
  )
}`,
  },

  inline: {
    title: 'Inline with Text',
    description: 'Loader displayed alongside text',
    component: InlineLoaderDemo,
    difficulty: 'beginner',
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"

export function InlineLoaderDemo() {
  return (
    <div className="p-4 border rounded-lg flex items-center gap-3">
      <Loader size={16} />
      <span>Processing your request...</span>
    </div>
  )
}`,
  },

  'with-shimmer': {
    title: 'Loader with Shimmer',
    description: 'Loader combined with shimmering text for enhanced loading feedback',
    component: WithShimmerDemo,
    difficulty: 'intermediate',
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"
import { Shimmer } from "@/components/ai-elements/cognite/shimmer"

export function WithShimmerDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <Shimmer className="text-sm">
          Analyzing vibration data from pump 21PT1019...
        </Shimmer>
      </div>
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <Shimmer className="text-sm">
          Generating maintenance recommendations...
        </Shimmer>
      </div>
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <Shimmer className="text-sm">
          Processing sensor readings...
        </Shimmer>
      </div>
    </div>
  )
}`,
  },

  'content-loading': {
    title: 'Content Loading State',
    description: 'Loader and Shimmer combined with skeleton placeholders for comprehensive loading states',
    component: ContentLoadingDemo,
    difficulty: 'intermediate',
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"
import { Shimmer } from "@/components/ai-elements/cognite/shimmer"

export function ContentLoadingDemo() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="p-6 border rounded-lg space-y-4">
        <div className="flex items-center gap-3">
          <Loader size={20} />
          <Shimmer as="h3" className="text-base font-semibold">
            Loading analysis results
          </Shimmer>
        </div>
        <div className="space-y-3 pl-8">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
          <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
        </div>
      </div>

      <div className="p-6 border rounded-lg space-y-4">
        <div className="flex items-center gap-3">
          <Loader size={20} />
          <Shimmer as="h3" className="text-base font-semibold">
            Retrieving historical maintenance records
          </Shimmer>
        </div>
        <div className="space-y-3 pl-8">
          <div className="h-4 bg-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        </div>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const loaderMeta = {
  name: 'Loader',
  description:
    'A spinning loader component for indicating loading states in AI applications.',
  importPath: '@/components/ai-elements/cognite/loader',
};
