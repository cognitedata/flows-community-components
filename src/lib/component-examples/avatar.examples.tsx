import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
} from "@/components/ui/cognite/avatar";
import type { ComponentExamples } from "./types";
import { IconWheel } from "@tabler/icons-react";

function BasicDemo() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar variant="default">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            className="relative -ml-1 first:ml-0 z-[1] border-2 border-background"
          >
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            className="relative -ml-1 z-[2] border-2 border-background"
          >
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            className="relative -ml-1 z-[3] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            className="relative -ml-1 z-[4] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            className="relative -ml-1 z-[5] border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>

        <Avatar>
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            className="relative -ml-1 first:ml-0 z-[1] border-2 border-background"
          >
             <AvatarImage src="/user-avatar3.png" alt="User" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            className="relative -ml-1 z-[2] border-2 border-background"
          >
             <AvatarImage src="/user-avatar4.png" alt="User" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            className="relative -ml-1 z-[3] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            className="relative -ml-1 z-[4] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            className="relative -ml-1 z-[5] border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}

function SizesVariantsDemo() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="fjord">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
        <Avatar sizes="xsm" variant="fjord">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
        <Avatar sizes="default" variant="fjord">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="aurora">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="aurora">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="aurora">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="dusk">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="dusk">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="dusk">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="orange">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="orange">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="orange">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="sky">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="sky">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="sky">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
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
    <>
      <div className="flex items-center gap-4">
        <Avatar variant="default">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            className="relative -ml-1 first:ml-0 z-[1] border-2 border-background"
          >
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            className="relative -ml-1 z-[2] border-2 border-background"
          >
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            className="relative -ml-1 z-[3] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            className="relative -ml-1 z-[4] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            className="relative -ml-1 z-[5] border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>

        <Avatar>
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            className="relative -ml-1 first:ml-0 z-[1] border-2 border-background"
          >
             <AvatarImage src="/user-avatar3.png" alt="User" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            className="relative -ml-1 z-[2] border-2 border-background"
          >
             <AvatarImage src="/user-avatar4.png" alt="User" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            className="relative -ml-1 z-[3] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            className="relative -ml-1 z-[4] border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            className="relative -ml-1 z-[5] border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  )
}`,
  },
  sizes: {
    title: "Avatar Sizes",
    description: "Different avatar sizes using custom classes",
    component: SizesVariantsDemo,
    difficulty: "beginner",
    code: `import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/cognite/avatar"
import { IconWheel } from "@tabler/icons-react"

export function SizesVariantsDemo() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="fjord">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
        <Avatar sizes="xsm" variant="fjord">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
        <Avatar sizes="default" variant="fjord">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="aurora">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="aurora">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="aurora">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="dusk">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="dusk">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="dusk">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="orange">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="orange">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="orange">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="sky">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="sky">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="sky">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4">
        <Avatar sizes="xxsm" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="default" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const avatarMeta = {
  name: "Avatar",
  description: "An image element with a fallback for representing the user.",
  llmUsage: "When displaying user avatars, use `<Avatar>` with `<AvatarImage>` and `<AvatarFallback>` for graceful degradation. Use `<AvatarIcon>` for icon-only avatars.",
  importPath: "@/components/ui/cognite/avatar",
};
