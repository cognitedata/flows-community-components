import { RadioGroup, RadioGroupItem } from "@/components/ui/cognite/radio-group";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}

export const radioGroupExamples: ComponentExamples = {
  basic: {
    title: "Basic Radio Group",
    description: "A set of checkable buttons where only one can be checked at a time",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { RadioGroup, RadioGroupItem } from "@/components/ui/cognite/radio-group"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`,
  },
};
