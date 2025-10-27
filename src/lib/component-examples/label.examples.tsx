import { Label } from "@/components/ui/cognite/label";
import { Input } from "@/components/ui/cognite/input";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="required" className="text-destructive">
          Required Field *
        </Label>
        <Input
          id="required"
          placeholder="This field is required"
          className="mt-1"
        />
      </div>
    </div>
  );
}

export const labelExamples: ComponentExamples = {
  basic: {
    title: "Label Examples",
    description: "Labels for form inputs with different styles",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Label } from "@/components/ui/cognite/label"
import { Input } from "@/components/ui/cognite/input"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter your name" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="required" className="text-destructive">
          Required Field *
        </Label>
        <Input
          id="required"
          placeholder="This field is required"
          className="mt-1"
        />
      </div>
    </div>
  )
}`,
  },
};

