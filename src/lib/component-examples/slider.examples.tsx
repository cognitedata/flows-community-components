import { Slider } from "@/components/ui/cognite/slider";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label>Volume</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <div className="space-y-2">
        <Label>Brightness</Label>
        <Slider defaultValue={[75]} max={100} step={1} />
      </div>
    </div>
  );
}

export const sliderExamples: ComponentExamples = {
  basic: {
    title: "Basic Slider",
    description: "An input where the user selects a value from within a given range",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Slider } from "@/components/ui/cognite/slider"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label>Volume</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <div className="space-y-2">
        <Label>Brightness</Label>
        <Slider defaultValue={[75]} max={100} step={1} />
      </div>
    </div>
  )
}`,
  },
};

