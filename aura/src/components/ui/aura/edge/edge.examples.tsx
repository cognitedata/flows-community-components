import type { ComponentExamples } from '@/lib/component-examples/types';

function TemporaryEdgeDemo() {
  return (
    <div className="h-[200px] w-full border rounded-lg p-8 flex items-center justify-center text-sm text-muted-foreground">
      <p>Edge components for React Flow diagrams</p>
      <p className="text-xs mt-2">
        Temporary (dashed) and Animated (with moving dot) edges
      </p>
    </div>
  );
}

export const edgeExamples: ComponentExamples = {
  basic: {
    title: 'Custom Edge Styles',
    description: 'Temporary and animated edge components for flow diagrams',
    component: TemporaryEdgeDemo,
    difficulty: 'intermediate',
    code: `import { Edge } from "@/components/ai-elements/cognite/edge"
import { Canvas } from "@/components/ai-elements/cognite/canvas"

export function CustomEdgeDemo() {
  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "temporary", // dashed line
    },
  ]

  return (
    <Canvas nodes={nodes} edges={edges} />
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const edgeMeta = {
  name: 'Edge',
  description:
    'A visual edge for rendering animated connections between nodes in AI workflow diagrams.',
  importPath: '@/components/ai-elements/cognite/edge',
};
