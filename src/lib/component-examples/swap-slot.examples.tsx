import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <div className="rounded-md border p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Swap Slot component coming soon
        </p>
      </div>
    </div>
  );
}

export const swapSlotExamples: ComponentExamples = {
  basic: {
    title: "Swap Slot (Coming Soon)",
    description: "Custom swap slot component - implementation pending",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `// Swap Slot component - implementation coming soon`,
  },
};

// Component metadata - single source of truth for API documentation
export const swapSlotMeta = {
  name: "Swap Slot",
  description: "Custom component for swapping content slots (implementation pending).",
  llmUsage: "Swap slot component is a custom component - implementation details coming soon.",
  importPath: "@/components/ui/cognite/swap-slot",
};
