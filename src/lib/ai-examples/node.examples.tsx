import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeDescription,
  NodeContent,
  NodeFooter,
} from "@/components/ai-elements/cognite/node";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicNodeDemo() {
  return (
    <Node handles={{ target: true, source: true }}>
      <NodeHeader>
        <NodeTitle>Processing Task</NodeTitle>
        <NodeDescription>Task description</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <p className="text-sm">Task content goes here</p>
      </NodeContent>
    </Node>
  );
}

function WithFooterDemo() {
  return (
    <Node handles={{ target: true, source: true }}>
      <NodeHeader>
        <NodeTitle>Data Analysis</NodeTitle>
        <NodeDescription>Analysing input data</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <div className="space-y-2">
          <p className="text-sm">Status: Processing</p>
          <p className="text-sm text-muted-foreground">Records: 1,234</p>
        </div>
      </NodeContent>
      <NodeFooter>
        <p className="text-sm text-muted-foreground">Last updated: just now</p>
      </NodeFooter>
    </Node>
  );
}

export const nodeExamples: ComponentExamples = {
  basic: {
    title: "Basic Node",
    description: "A flow node with header, content, and connection handles",
    component: BasicNodeDemo,
    difficulty: "beginner",
    code: `import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeDescription,
  NodeContent,
} from "@/components/ai-elements/cognite/node"

export function BasicNodeDemo() {
  return (
    <Node handles={{ target: true, source: true }}>
      <NodeHeader>
        <NodeTitle>Processing Task</NodeTitle>
        <NodeDescription>Task description</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <p>Task content goes here</p>
      </NodeContent>
    </Node>
  )
}`,
  },

  withFooter: {
    title: "Node with Footer",
    description: "Complete node structure with header, content, and footer",
    component: WithFooterDemo,
    difficulty: "beginner",
    code: `import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeContent,
  NodeFooter,
} from "@/components/ai-elements/cognite/node"

export function NodeWithFooterDemo() {
  return (
    <Node handles={{ target: true, source: true }}>
      <NodeHeader>
        <NodeTitle>Data Analysis</NodeTitle>
      </NodeHeader>
      <NodeContent>
        <p>Content here</p>
      </NodeContent>
      <NodeFooter>
        <p>Footer content</p>
      </NodeFooter>
    </Node>
  )
}`,
  },
};

