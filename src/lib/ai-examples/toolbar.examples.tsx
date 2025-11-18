import type { ComponentExamples } from '@/lib/component-examples/types';

// Note: Toolbar is a wrapper for React Flow NodeToolbar
// It provides a toolbar that appears on node hover
function BasicToolbarDemo() {
  return (
    <div className="h-[200px] w-full border rounded-lg p-8 flex items-center justify-center text-sm text-muted-foreground">
      <p>Toolbar appears on flow diagram nodes</p>
      <p className="text-xs mt-2">Used within Node components in Canvas</p>
    </div>
  );
}

export const toolbarExamples: ComponentExamples = {
  basic: {
    title: 'Node Toolbar',
    description: 'Toolbar that appears on node hover in flow diagrams',
    component: BasicToolbarDemo,
    difficulty: 'intermediate',
    code: `import { Toolbar } from "@/components/ai-elements/cognite/toolbar"
import { Node } from "@/components/ai-elements/cognite/node"

export function BasicToolbarDemo() {
  return (
    <Node handles={{ target: true, source: true }}>
      <NodeHeader>
        <NodeTitle>Node with Toolbar</NodeTitle>
      </NodeHeader>
      <Toolbar>
        <button>Action 1</button>
        <button>Action 2</button>
      </Toolbar>
    </Node>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const toolbarMeta = {
  name: 'Toolbar',
  description:
    'A customizable toolbar component for AI interface controls and actions.',
  importPath: '@/components/ai-elements/cognite/toolbar',
};
