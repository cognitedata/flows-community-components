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

