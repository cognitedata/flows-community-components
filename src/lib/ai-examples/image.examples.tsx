import type { ComponentExamples } from "@/lib/component-examples/types";

// Note: Image component requires GeneratedFile type from AI SDK
// Creating a minimal stub for documentation purposes
function BasicImageDemo() {
  return (
    <div className="max-w-xs border rounded-lg p-4 text-center text-sm text-muted-foreground">
      <p>AI-generated image component</p>
      <p className="text-xs mt-2">
        Requires GeneratedFile from AI SDK
      </p>
    </div>
  );
}

export const imageExamples: ComponentExamples = {
  basic: {
    title: "AI Generated Image",
    description: "Display AI-generated images from base64 data",
    component: BasicImageDemo,
    difficulty: "beginner",
    code: `import { Image } from "@/components/ai-elements/cognite/image"
import type { Experimental_GeneratedImage } from "ai"

export function BasicImageDemo({ image }: { image: Experimental_GeneratedImage }) {
  return (
    <Image
      base64={image.base64}
      mediaType={image.mediaType}
      alt="Generated image"
    />
  )
}`,
  },
};

