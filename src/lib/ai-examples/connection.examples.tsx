import type { ComponentExamples } from "@/lib/component-examples/types";

// Note: Connection is a custom SVG connection line component for React Flow
// It's typically rendered as part of a flow diagram
function BasicConnectionDemo() {
  return (
    <div className="h-[200px] w-full border rounded-lg p-8 flex items-center justify-center text-sm text-muted-foreground">
      <p>Connection renders custom SVG connection lines in flow diagrams</p>
      <p className="text-xs mt-2">Typically used within @xyflow/react</p>
    </div>
  );
}

export const connectionExamples: ComponentExamples = {
  basic: {
    title: "Custom Connection Line",
    description: "Animated SVG connection lines between nodes",
    component: BasicConnectionDemo,
    difficulty: "advanced",
    code: `import { Connection } from "@/components/ai-elements/cognite/connection"
import { ConnectionLineComponent } from "@xyflow/react"

export function BasicConnectionDemo() {
  // Used as a custom connection line component
  return (
    <Canvas
      connectionLineComponent={Connection}
      nodes={nodes}
      edges={edges}
    />
  )
}`,
  },
};

