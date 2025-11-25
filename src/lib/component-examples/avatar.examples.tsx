import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
} from '@/components/ui/cognite/avatar';
import type { ComponentExamples } from './types';
import { IconWheel } from '@tabler/icons-react';

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

function MainComponentDemo() {
  return (
    <div className="flex items-center flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar sizes="default" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xxsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4 pt-8">
        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            sizes="default"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="orange"
            sizes="default"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            sizes="default"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="sky"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            sizes="default"
            className="relative -ml-1 z-5 border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            sizes="xsm"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="orange"
            sizes="xsm"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            sizes="xsm"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            sizes="xsm"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="sky"
            sizes="xsm"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            sizes="xsm"
            className="relative -ml-1 z-5 border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export const avatarExamples: ComponentExamples = {
  basic: {
    title: 'Basic Avatar',
    description: 'Display user avatars with image and fallback',
    component: BasicDemo,
    difficulty: 'beginner',
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
  mainComponent: {
    title: 'Main Component',
    description: 'Available size and variation options',
    component: MainComponentDemo,
    difficulty: 'beginner',
    code: `import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/cognite/avatar"
import { IconWheel } from "@tabler/icons-react"

export function MainComponentDemo() {
  return (
   <div className="flex items-center flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar sizes="default" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xxsm" variant="nordic">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center gap-4 pt-8">
        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            sizes="default"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="orange"
            sizes="default"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            sizes="default"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="sky"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            sizes="default"
            className="relative -ml-1 z-5 border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            sizes="xsm"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="orange"
            sizes="xsm"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
            sizes="xsm"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            sizes="xsm"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="sky"
            sizes="xsm"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            sizes="xsm"
            className="relative -ml-1 z-5 border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}`,
  },
};
// Component metadata - single source of truth for API documentation
export const avatarMeta = {
  name: 'Avatar',
  description: 'An image element with a fallback for representing the user.',
  llmUsage:
    'When displaying user avatars, use `<Avatar>` with `<AvatarImage>` and `<AvatarFallback>` for graceful degradation. Use `<AvatarIcon>` for icon-only avatars.',
  importPath: '@/components/ui/cognite/avatar',
};
