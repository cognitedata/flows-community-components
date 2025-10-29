import { Suggestion } from "@/components/ai-elements/cognite/suggestion";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicSuggestionDemo() {
  return (
    <div className="space-y-3 max-w-md">
      <div className="text-sm text-muted-foreground mb-2">
        Suggested actions:
      </div>
      <div className="flex flex-wrap gap-2">
        <Suggestion suggestion="What is React?">What is React?</Suggestion>
        <Suggestion suggestion="How to use hooks?">How to use hooks?</Suggestion>
        <Suggestion suggestion="Build a todo app">Build a todo app</Suggestion>
        <Suggestion suggestion="Learn TypeScript">Learn TypeScript</Suggestion>
      </div>
    </div>
  );
}

function DifferentSizesDemo() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Small suggestions</p>
        <div className="flex flex-wrap gap-2">
          <Suggestion suggestion="Small" size="sm">Small</Suggestion>
          <Suggestion suggestion="Another" size="sm">Another</Suggestion>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Default suggestions</p>
        <div className="flex flex-wrap gap-2">
          <Suggestion suggestion="Default size">Default size</Suggestion>
          <Suggestion suggestion="Another one">Another one</Suggestion>
        </div>
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
      <Suggestion suggestion="What is React?">What is React?</Suggestion>
      <Suggestion suggestion="How to use hooks?">How to use hooks?</Suggestion>
      <Suggestion suggestion="Build a todo app">Build a todo app</Suggestion>
    </div>
  )
}`,
  },

  sizes: {
    title: "Different Sizes",
    description: "Suggestion chips in various sizes",
    component: DifferentSizesDemo,
    difficulty: "beginner",
    code: `import { Suggestion } from "@/components/ai-elements/cognite/suggestion"

export function SizesDemo() {
  return (
    <div className="space-y-4">
      <Suggestion suggestion="Small" size="sm">Small</Suggestion>
      <Suggestion suggestion="Default">Default</Suggestion>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const suggestionMeta = {
  name: "Suggestion",
  description: "A suggestion component that displays a horizontal row of clickable suggestions for user interaction.",
  importPath: "@/components/ai-elements/cognite/suggestion",
};
