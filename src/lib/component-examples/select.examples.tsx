import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/cognite/select";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Label>Choose an option</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export const selectExamples: ComponentExamples = {
  basic: {
    title: "Select Dropdown",
    description: "A dropdown select component for choosing from options",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/cognite/select"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Label>Choose an option</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const selectMeta = {
  name: "Select",
  description: "Displays a list of options for the user to pick from—triggered by a button.",
  llmUsage: "When asked for a select dropdown, use `<Select>` for choosing from multiple options.",
  importPath: "@/components/ui/cognite/select",
};
