import { Textarea } from "@/components/ui/cognite/textarea";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message..."
          className="mt-1"
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="disabled">Disabled Textarea</Label>
        <Textarea
          id="disabled"
          placeholder="This textarea is disabled"
          className="mt-1"
          disabled
          rows={3}
        />
      </div>
    </div>
  );
}

export const textareaExamples: ComponentExamples = {
  basic: {
    title: "Textarea Examples",
    description: "Multi-line text input fields",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Textarea } from "@/components/ui/cognite/textarea"
import { Label } from "@/components/ui/cognite/label"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Enter your message..."
          className="mt-1"
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="disabled">Disabled Textarea</Label>
        <Textarea
          id="disabled"
          placeholder="This textarea is disabled"
          className="mt-1"
          disabled
          rows={3}
        />
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const textareaMeta = {
  name: "Textarea",
  description: "Displays a form textarea or a component that looks like a textarea.",
  llmUsage: "When asked for a textarea, use `<Textarea>` for multi-line text input and longer form content.",
  importPath: "@/components/ui/cognite/textarea",
};
