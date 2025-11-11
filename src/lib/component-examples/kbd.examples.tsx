import { Kbd } from "@/components/ui/cognite/kbd";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Kbd>⇧⌘A</Kbd>
    </div>
  );
}

export const kbdExamples: ComponentExamples = {
  basic: {
    title: "Keyboard Shortcuts",
    description: "Display keyboard shortcuts with proper styling",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Kbd } from "@/components/ui/cognite/kbd"

export function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-2">
       <Kbd>⇧⌘A</Kbd>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const kbdMeta = {
  name: "Kbd",
  description: "Represents keyboard input or keyboard shortcuts.",
  llmUsage: "When displaying keyboard shortcuts, use `<Kbd>` to style them properly.",
  importPath: "@/components/ui/cognite/kbd",
};
