import { Input } from "@/components/ui/cognite/input";
import { Label } from "@/components/ui/cognite/label";
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
    code: `import { Input } from "@/components/ui/cognite/input"

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
    code: `import { Input } from "@/components/ui/cognite/input"
import { Label } from "@/components/ui/cognite/label"

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
    code: `import { Input } from "@/components/ui/cognite/input"

export function DisabledDemo() {
  return (
    <div className="max-w-sm">
      <Input disabled placeholder="Disabled input" />
    </div>
  )
}`,
  },
};

