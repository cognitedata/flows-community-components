import { Canvas } from "@/components/ai-elements/cognite/canvas";
import { Node, NodeHeader, NodeTitle, NodeContent } from "@/components/ai-elements/cognite/node";
import type { ComponentExamples } from "@/lib/component-examples/types";
import { Background, type Edge, type Node as ReactFlowNode } from "@xyflow/react";

function BasicCanvasDemo() {
  const nodes: ReactFlowNode[] = [
    {
      id: "1",
      data: { label: "Node 1" },
      position: { x: 250, y: 5 },
    },
  ];

  const edges: Edge[] = [];

  return (
    <div className="h-[400px] w-full">
      <Canvas nodes={nodes} edges={edges}>
        <Background />
      </Canvas>
    </div>
  );
}

function WithMultipleNodesDemo() {
  const nodes: ReactFlowNode[] = [
    {
      id: "1",
      data: { label: "Start" },
      position: { x: 250, y: 5 },
    },
    {
      id: "2",
      data: { label: "Process" },
      position: { x: 250, y: 100 },
    },
    {
      id: "3",
      data: { label: "End" },
      position: { x: 250, y: 195 },
    },
  ];

  const edges: Edge[] = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ];

  return (
    <div className="h-[400px] w-full">
      <Canvas nodes={nodes} edges={edges}>
        <Background />
        <Node handles={{ target: true, source: true }}>
          <NodeHeader>
            <NodeTitle>Custom Node</NodeTitle>
          </NodeHeader>
          <NodeContent>
            <p className="text-sm">Custom node content</p>
          </NodeContent>
        </Node>
      </Canvas>
    </div>
  );
}

export const canvasExamples: ComponentExamples = {
  basic: {
    title: "Basic Canvas",
    description: "A flow-based canvas for visualizing interactive workflows",
    component: BasicCanvasDemo,
    difficulty: "beginner",
    code: `import { Canvas } from "@/components/ai-elements/cognite/canvas"
import { Background } from "@xyflow/react"

export function BasicCanvasDemo() {
  const nodes = [
    {
      id: "1",
      data: { label: "Node 1" },
      position: { x: 250, y: 5 },
    },
  ]

  const edges = []

  return (
    <div className="h-[400px] w-full">
      <Canvas nodes={nodes} edges={edges}>
        <Background />
      </Canvas>
    </div>
  )
}`,
  },

  withNodes: {
    title: "Canvas with Nodes",
    description: "Multiple nodes connected with edges",
    component: WithMultipleNodesDemo,
    difficulty: "intermediate",
    code: `import { Canvas } from "@/components/ai-elements/cognite/canvas"
import { Background } from "@xyflow/react"

export function CanvasWithNodesDemo() {
  const nodes = [
    { id: "1", data: { label: "Start" }, position: { x: 250, y: 5 } },
    { id: "2", data: { label: "Process" }, position: { x: 250, y: 100 } },
  ]

  const edges = [
    { id: "e1-2", source: "1", target: "2" },
  ]

  return (
    <div className="h-[400px] w-full">
      <Canvas nodes={nodes} edges={edges}>
        <Background />
      </Canvas>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const canvasMeta = {
  name: "Canvas",
  description: "An interactive canvas for AI-generated visual content with zoom, pan, and editing capabilities.",
  importPath: "@/components/ai-elements/cognite/canvas",
};
