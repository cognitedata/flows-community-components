import { Suggestion } from "@/components/ai-elements/suggestion";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicSuggestionDemo() {
  return (
    <div className="space-y-3 max-w-[80%]">
      <div className="text-sm text-muted-foreground mb-2">
        Suggested actions:
      </div>
      <div className="flex flex-wrap gap-2">
        <Suggestion suggestion="What is React?">
          AI prompt suggestion 1
        </Suggestion>
        <Suggestion suggestion="How to use hooks?">
          AI prompt suggestion 2
        </Suggestion>
        <Suggestion suggestion="Build a todo app">
          AI prompt suggestion 3
        </Suggestion>
      </div>
    </div>
  );
}

export const suggestionExamples: ComponentExamples = {
  basic: {
    title: "Basic Suggestions",
    description: "Chip-style suggestions for quick actions",
    component: BasicSuggestionDemo,
    difficulty: "beginner",
    code: `import { Suggestion } from "@/components/ai-elements/cognite/suggestion"

export function BasicSuggestionDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Suggestion suggestion="What is React?">AI prompt suggestion 1</Suggestion>
      <Suggestion suggestion="How to use hooks?">AI prompt suggestion 2</Suggestion>
      <Suggestion suggestion="Build a todo app">AI prompt suggestion 3</Suggestion>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const suggestionMeta = {
  name: "Suggestion",
  description:
    "A suggestion component that displays a horizontal row of clickable suggestions for user interaction.",
  importPath: "@/components/ai-elements/cognite/suggestion",
};
