import { Input } from "@/components/ui/draft/input";
import { Label } from "@/components/ui/draft/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="max-w-sm">
      <Input placeholder="Enter text..." />
    </div>
  );
}

function WithLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email Address</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  );
}

function DisabledDemo() {
  return (
    <div className="max-w-sm">
      <Input disabled placeholder="Disabled input" />
    </div>
  );
}

export const inputExamples: ComponentExamples = {
  basic: {
    title: "Basic Input",
    description: "A simple text input field",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Input } from "@/components/ui/draft/input"

export function BasicDemo() {
  return (
    <div className="max-w-sm">
      <Input placeholder="Enter text..." />
    </div>
  )
}`,
  },

  withLabel: {
    title: "Input with Label",
    description: "Input field with an associated label",
    component: WithLabelDemo,
    difficulty: "beginner",
    code: `import { Input } from "@/components/ui/draft/input"
import { Label } from "@/components/ui/draft/label"

export function WithLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email Address</Label>
      <Input type="email" id="email" placeholder="name@example.com" />
    </div>
  )
}`,
  },

  disabled: {
    title: "Disabled Input",
    description: "Input in a disabled state",
    component: DisabledDemo,
    difficulty: "beginner",
    code: `import { Input } from "@/components/ui/draft/input"

export function DisabledDemo() {
  return (
    <div className="max-w-sm">
      <Input disabled placeholder="Disabled input" />
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inputMeta = {
  name: "Input",
  description: "A styled input field component with built-in validation states and accessibility features.",
  llmUsage: "When creating form inputs, use `<Input type='text' placeholder='Enter text' />` instead of `<input>`. Pair with `<Label>` for accessibility.",
  importPath: "@/components/ui/draft/input",
};
