import { Loader } from "@/components/ai-elements/cognite/loader";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicLoaderDemo() {
  return (
    <div className="flex items-center justify-center p-8 border rounded-lg">
      <Loader />
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex items-center gap-4 p-8 border rounded-lg">
      <Loader size={12} />
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={32} />
    </div>
  );
}

function InlineLoaderDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={16} />
        <span className="text-sm text-muted-foreground">Processing your request...</span>
      </div>
      <div className="p-4 border rounded-lg flex items-center gap-3">
        <Loader size={20} />
        <span className="text-sm">Generating response...</span>
      </div>
    </div>
  );
}

export const loaderExamples: ComponentExamples = {
  basic: {
    title: "Basic Loader",
    description: "A simple spinning loader icon",
    component: BasicLoaderDemo,
    difficulty: "beginner",
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"

export function BasicLoaderDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader />
    </div>
  )
}`,
  },

  sizes: {
    title: "Different Sizes",
    description: "Loader component with custom size",
    component: SizesDemo,
    difficulty: "beginner",
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"

export function SizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Loader size={12} />
      <Loader size={16} />
      <Loader size={24} />
      <Loader size={32} />
    </div>
  )
}`,
  },

  inline: {
    title: "Inline with Text",
    description: "Loader displayed alongside text",
    component: InlineLoaderDemo,
    difficulty: "beginner",
    code: `import { Loader } from "@/components/ai-elements/cognite/loader"

export function InlineLoaderDemo() {
  return (
    <div className="p-4 border rounded-lg flex items-center gap-3">
      <Loader size={16} />
      <span>Processing your request...</span>
    </div>
  )
}`,
  },
};

