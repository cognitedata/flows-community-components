import type { ComponentExamples } from "@/lib/component-examples/types";

// Note: Controls is a wrapper around React Flow Controls
// It provides zoom in/out and fit view buttons
function BasicControlsDemo() {
  return (
    <div className="h-[200px] w-full border rounded-lg p-8 flex items-center justify-center text-sm text-muted-foreground">
      <p>Controls provides canvas navigation buttons</p>
      <p className="text-xs mt-2">Used within Canvas component</p>
    </div>
  );
}

export const controlsExamples: ComponentExamples = {
  basic: {
    title: "Canvas Controls",
    description: "Zoom and navigation controls for flow diagrams",
    component: BasicControlsDemo,
    difficulty: "beginner",
    code: `import { Controls } from "@/components/ai-elements/cognite/controls"
import { Canvas } from "@/components/ai-elements/cognite/canvas"

export function BasicControlsDemo() {
  // Controls are automatically included in Canvas
  return (
    <Canvas nodes={nodes} edges={edges}>
      {/* Controls are included by default */}
    </Canvas>
  )
}`,
  },
};

