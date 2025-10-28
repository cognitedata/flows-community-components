import { Response } from "@/components/ai-elements/cognite/response";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicResponseDemo() {
  return (
    <div className="border rounded-lg p-4">
      <Response>
        This is a formatted AI response with markdown support.
      </Response>
    </div>
  );
}

function ResponseWithCodeDemo() {
  return (
    <div className="border rounded-lg p-4">
      <Response>
        You can include code blocks in the response.
      </Response>
    </div>
  );
}

export const responseExamples: ComponentExamples = {
  basic: {
    title: "Basic Response",
    description: "Formatted AI response with markdown support",
    component: BasicResponseDemo,
    difficulty: "beginner",
    code: `import { Response } from "@/components/ai-elements/cognite/response"

export function BasicResponseDemo() {
  return (
    <Response>
      This is a formatted AI response with markdown support.
    </Response>
  )
}`,
  },

  withCode: {
    title: "Response with Code",
    description: "Response component with code blocks",
    component: ResponseWithCodeDemo,
    difficulty: "beginner",
    code: `import { Response } from "@/components/ai-elements/cognite/response"

export function ResponseWithCodeDemo() {
  return (
    <Response>
      You can include code blocks in the response.
    </Response>
  )
}`,
  },
};

