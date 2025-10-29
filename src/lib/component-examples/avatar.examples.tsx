import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/cognite/avatar";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}

export const avatarExamples: ComponentExamples = {
  basic: {
    title: "Basic Avatar",
    description: "Display user avatars with image and fallback",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/cognite/avatar"

export function BasicDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
  },
  sizes: {
    title: "Avatar Sizes",
    description: "Different avatar sizes using custom classes",
    component: SizesDemo,
    difficulty: "beginner",
    code: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/cognite/avatar"

export function SizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const avatarMeta = {
  name: "Avatar",
  description: "An image element with a fallback for representing the user.",
  llmUsage: "When displaying user avatars, use `<Avatar>` with `<AvatarImage>` and `<AvatarFallback>` for graceful degradation.",
  importPath: "@/components/ui/cognite/avatar",
};
