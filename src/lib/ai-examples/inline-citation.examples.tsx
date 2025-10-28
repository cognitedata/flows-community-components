import { InlineCitation } from "@/components/ai-elements/cognite/inline-citation";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicCitationDemo() {
  return (
    <div className="space-y-3 max-w-2xl">
      <p className="text-sm">
        This is some text with an <InlineCitation>[1]</InlineCitation> inline citation.
      </p>
      <p className="text-sm">
        Another example <InlineCitation>[2]</InlineCitation> with multiple citations.
      </p>
    </div>
  );
}

export const inlineCitationExamples: ComponentExamples = {
  basic: {
    title: "Inline Citation",
    description: "Citation markers within text content",
    component: BasicCitationDemo,
    difficulty: "beginner",
    code: `import { InlineCitation } from "@/components/ai-elements/cognite/inline-citation"

export function BasicCitationDemo() {
  return (
    <p>
      This is text with an <InlineCitation>[1]</InlineCitation> citation.
    </p>
  )
}`,
  },
};

