import { Kbd } from "@/components/ui/cognite/kbd";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Enter</Kbd>
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
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Enter</Kbd>
    </div>
  )
}`,
  },
};

