import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <div className="rounded-md border p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Topbar component coming soon
        </p>
      </div>
    </div>
  );
}

export const topbarExamples: ComponentExamples = {
  basic: {
    title: "Topbar (Coming Soon)",
    description: "Custom topbar component - implementation pending",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `// Topbar component - implementation coming soon`,
  },
};

// Component metadata - single source of truth for API documentation
export const topbarMeta = {
  name: "Topbar",
  description: "Custom component for application topbar (implementation pending).",
  llmUsage: "Topbar component is a custom component - implementation details coming soon.",
  importPath: "@/components/ui/draft/topbar",
};
