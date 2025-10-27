import { Checkbox } from "@/components/ui/cognite/checkbox";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" defaultChecked />
        <Label htmlFor="marketing">Receive marketing emails</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-50">
          Disabled checkbox
        </Label>
      </div>
    </div>
  );
}

export const checkboxExamples: ComponentExamples = {
  basic: {
    title: "Checkbox Examples",
    description: "Checkboxes in different states with labels",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Checkbox } from "@/components/ui/cognite/checkbox"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" defaultChecked />
        <Label htmlFor="marketing">Receive marketing emails</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-50">
          Disabled checkbox
        </Label>
      </div>
    </div>
  )
}`,
  },
};

