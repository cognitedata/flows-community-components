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
          <Avatar
            variant="overflow"
            sizes="default"
            className="relative -ml-1 z-5 border-2 border-background"
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

function BuildingBlocksDemo() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex items-center flex-col gap-4 border-dashed border-2 border-gray-300 p-4 rounded-md">
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="nordic" sizes="xxsm">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="nordic"
                sizes="xxsm"
                className="bg-nordic-100 dark:bg-nordic-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="fjord" sizes="xxsm">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="fjord"
                sizes="xxsm"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="aurora" sizes="xxsm">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="aurora"
                sizes="xxsm"
                className="bg-aurora-100 dark:bg-aurora-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="dusk" sizes="xxsm">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="dusk"
                sizes="xxsm"
                className="bg-dusk-100 dark:bg-dusk-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="orange" sizes="xxsm">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="orange"
                sizes="xxsm"
                className="bg-orange-100 dark:bg-orange-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="sky" sizes="xxsm">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="sky"
                sizes="xxsm"
                className="bg-sky-100 dark:bg-sky-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="nordic" sizes="xxsm">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="nordic"
                sizes="xxsm"
                className="bg-nordic-100 dark:bg-nordic-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="fjord" sizes="xxsm">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="fjord"
                sizes="xxsm"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="aurora" sizes="xxsm">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="aurora"
                sizes="xxsm"
                className="bg-aurora-100 dark:bg-aurora-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="dusk" sizes="xxsm">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="dusk"
                sizes="xxsm"
                className="bg-dusk-100 dark:bg-dusk-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="orange" sizes="xxsm">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="orange"
                sizes="xxsm"
                className="bg-orange-100 dark:bg-orange-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="sky" sizes="xxsm">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="sky"
                sizes="xxsm"
                className="bg-sky-100 dark:bg-sky-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="fjord" sizes="xxsm">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="fjord"
                sizes="xxsm"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex items-center flex-col gap-4 border-dashed border-2 border-gray-300 p-4 rounded-md">
            <div className="flex items-center flex-row gap-4">
              <Avatar sizes="xsm" variant="nordic">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="nordic"
                className="bg-nordic-100 dark:bg-nordic-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar sizes="xsm" variant="fjord">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="fjord"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar sizes="xsm" variant="aurora">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="aurora"
                className="bg-aurora-100 dark:bg-aurora-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar sizes="xsm" variant="dusk">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="dusk"
                className="bg-dusk-100 dark:bg-dusk-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar sizes="xsm" variant="orange">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="orange"
                className="bg-orange-100 dark:bg-orange-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar sizes="xsm" variant="sky">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="sky"
                className="bg-sky-100 dark:bg-sky-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar sizes="xsm" variant="nordic">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="nordic"
                className="bg-nordic-100 dark:bg-nordic-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar sizes="xsm" variant="fjord">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="fjord"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar sizes="xsm" variant="aurora">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="aurora"
                className="bg-aurora-100 dark:bg-aurora-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar sizes="xsm" variant="dusk">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="dusk"
                className="bg-dusk-100 dark:bg-dusk-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar sizes="xsm" variant="orange">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="orange"
                className="bg-orange-100 dark:bg-orange-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar sizes="xsm" variant="sky">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="sky"
                className="bg-sky-100 dark:bg-sky-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar sizes="xsm" variant="fjord">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                sizes="xsm"
                variant="fjord"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex items-center flex-col gap-4 border-dashed border-2 border-gray-300 p-4 rounded-md">
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="nordic">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="nordic"
                className="bg-nordic-100 dark:bg-nordic-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="fjord">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="fjord"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="aurora">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="aurora"
                className="bg-aurora-100 dark:bg-aurora-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="dusk">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="dusk" className="bg-dusk-100 dark:bg-dusk-800">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="orange">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="orange"
                className="bg-orange-100 dark:bg-orange-800"
              >
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="sky">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar variant="sky" className="bg-sky-100 dark:bg-sky-800">
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="nordic">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="nordic"
                className="bg-nordic-100 dark:bg-nordic-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="fjord">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="fjord"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="aurora">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="aurora"
                className="bg-aurora-100 dark:bg-aurora-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="dusk">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="dusk" className="bg-dusk-100 dark:bg-dusk-800">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="orange">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar
                variant="orange"
                className="bg-orange-100 dark:bg-orange-800"
              >
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="sky">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
              <Avatar variant="sky" className="bg-sky-100 dark:bg-sky-800">
                <AvatarIcon>
                  <IconWheel />
                </AvatarIcon>
              </Avatar>
            </div>
            <div className="flex items-center flex-row gap-4">
              <Avatar variant="fjord">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
              <Avatar
                variant="fjord"
                className="bg-fjord-100 dark:bg-fjord-800"
              >
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex items-center flex-col gap-4 border-dashed border-2 border-gray-300 p-4 rounded-md">
              <div className="flex items-center flex-col gap-4">
                <Avatar variant="overflow" sizes="xsm">
                  <AvatarFallback>PJ</AvatarFallback>
                </Avatar>
                <Avatar
                  variant="overflow"
                  className="bg-secondary-100 dark:bg-secondary-800"
                  sizes="xsm"
                >
                  <AvatarFallback>+4</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex items-center flex-col gap-4 border-dashed border-2 border-gray-300 p-4 rounded-md">
              <div className="flex items-center flex-col gap-4">
                <Avatar variant="overflow">
                  <AvatarFallback>PJ</AvatarFallback>
                </Avatar>
                <Avatar
                  variant="overflow"
                  className="bg-secondary-100 dark:bg-secondary-800"
                >
                  <AvatarFallback className="bg-secondary-100 dark:bg-secondary-800">
                    +4
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
            sizes="default"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            sizes="default"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            sizes="default"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
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

        <Avatar>
          <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
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
            variant="aurora"
            sizes="default"
            className="relative -ml-1 z-2 border-2 border-background"
          >
             <AvatarImage src="/user-avatar4.png" alt="User" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            sizes="default"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar
            variant="dusk"
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
  buildingBlocks: {
    title: 'Building Blocks',
    description: 'Available size and variation options',
    component: BuildingBlocksDemo,
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
