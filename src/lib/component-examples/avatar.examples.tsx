import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
} from '@/components/ui/aura/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/aura/hover-card';
import type { ComponentExamples } from './types';
import { IconWheel } from '@tabler/icons-react';

function BasicDemo() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar sizes="xsm" variant="nordic">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
        <Avatar sizes="xsm" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>

        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            sizes="default"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarImage src="/user-avatar3.png" alt="User" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarImage src="/user-avatar4.png" alt="User" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarImage src="/user-avatar5.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarImage src="/user-avatar6.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarImage src="/user-avatar7.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar
                variant="overflow"
                sizes="default"
                className="relative -ml-1 z-5 border-2 border-background"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">
                  4 more people
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar
                variant="overflow"
                sizes="default"
                className="relative -ml-1 z-5 border-2 border-background"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">
                  4 more people
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar
                variant="overflow"
                sizes="xsm"
                className="relative -ml-1 z-5 border-2 border-background"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">
                  4 more people
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}

function BuildingBlocksDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* All color variants - Fallback */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Color variants with fallback (hover to see hover state)
        </p>
        <div className="flex items-center gap-4">
          <Avatar variant="default">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar variant="dusk">
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <Avatar variant="orange">
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
          <Avatar variant="sky">
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar variant="overflow">
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">
                  4 more people
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* All color variants - Icons */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Color variants with icons
        </p>
        <div className="flex items-center gap-4">
          <Avatar variant="default">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="dusk">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="orange">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="sky">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
        </div>
      </div>

      {/* Size variants */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Size variants</p>
        <div className="flex items-center gap-4">
          <Avatar variant="nordic" sizes="default">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xsm">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xxsm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With images */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">With images</p>
        <div className="flex items-center gap-4">
          <Avatar variant="fjord">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" sizes="xsm">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
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
    code: `import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/aura/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/aura/hover-card"
import { IconWheel } from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar sizes="xsm" variant="nordic">
          <AvatarIcon>
            <IconWheel />
          </AvatarIcon>
        </Avatar>
        <Avatar sizes="xsm" variant="fjord">
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar sizes="xsm" variant="default">
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>

        <div id="avatar-group" className="flex items-center">
          <Avatar
            variant="nordic"
            sizes="default"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarImage src="/user-avatar3.png" alt="User" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarImage src="/user-avatar4.png" alt="User" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarImage src="/user-avatar5.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarImage src="/user-avatar6.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="default"
            sizes="default"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarImage src="/user-avatar7.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar
                variant="overflow"
                sizes="default"
                className="relative -ml-1 z-5 border-2 border-background"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">4 more people</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
    code: `import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/aura/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/aura/hover-card"
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
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar
                variant="overflow"
                sizes="default"
                className="relative -ml-1 z-5 border-2 border-background"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">4 more people</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
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
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar
                variant="overflow"
                sizes="xsm"
                className="relative -ml-1 z-5 border-2 border-background"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">4 more people</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  )
}`,
  },
  buildingBlocks: {
    title: 'Building Blocks',
    description: 'Available size and variation options',
    component: BuildingBlocksDemo,
    difficulty: 'beginner',
    code: `import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/aura/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/aura/hover-card"
import { IconWheel } from "@tabler/icons-react"

export function BuildingBlocksDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* All color variants - Fallback */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Color variants with fallback (hover to see hover state)
        </p>
        <div className="flex items-center gap-4">
          <Avatar variant="default">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar variant="dusk">
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <Avatar variant="orange">
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
          <Avatar variant="sky">
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Avatar variant="overflow">
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-3">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground font-medium">4 more people</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar variant="aurora" sizes="xsm">
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Emma Liu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="dusk" sizes="xsm">
                      <AvatarFallback>JK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">James Kim</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="orange" sizes="xsm">
                      <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Sarah Brown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar variant="sky" sizes="xsm">
                      <AvatarFallback>MT</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Michael Torres</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* All color variants - Icons */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Color variants with icons</p>
        <div className="flex items-center gap-4">
          <Avatar variant="default">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
          <Avatar variant="dusk">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
          <Avatar variant="orange">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
          <Avatar variant="sky">
            <AvatarIcon><IconWheel /></AvatarIcon>
          </Avatar>
        </div>
      </div>

      {/* Size variants */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Size variants</p>
        <div className="flex items-center gap-4">
          <Avatar variant="nordic" sizes="default">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xsm">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xxsm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* With images */}
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">With images</p>
        <div className="flex items-center gap-4">
          <Avatar variant="fjord">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" sizes="xsm">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
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
  importPath: '@/components/ui/aura/avatar',
};
