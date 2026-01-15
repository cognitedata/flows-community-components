import { Button } from '@/components/ui/aura/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';
import type { ComponentExamples } from './types';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/aura/avatar';
import {
  IconUser,
  IconHelp,
  IconBell,
  IconSettingsFilled,
} from '@tabler/icons-react';

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px]">
            <DropdownMenuLabel className="flex flex-row items-center gap-2 border-b border-border ">
              <Avatar variant="default">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-base tracking-tighter font-medium">
                  Jane Smith
                </div>
                <span className="text-sm font-normal tracking-tight text-muted-foreground dark:text-muted-foreground">
                  jane.smith@cognite.com
                </span>
              </div>
            </DropdownMenuLabel>
            <div className="px-1 pt-1">
              <DropdownMenuItem>
                <IconUser />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettingsFilled />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconBell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconHelp />
                Help
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground">
        Click buttons to open interactive dropdown menus.
      </p>
    </div>
  );
}

function UserDetailsDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open User DetailsMenu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px] px-1">
            <DropdownMenuLabel className="flex flex-row items-center gap-2 border-none pb-1">
              <div className="text-sm font-normal tracking-tight text-muted-foreground dark:text-muted-foreground">
                User settings
              </div>
            </DropdownMenuLabel>
            <div>
              <DropdownMenuItem>
                <IconUser />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettingsFilled />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconBell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconHelp />
                Help
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export const dropdownMenuExamples: ComponentExamples = {
  basic: {
    title: 'Dropdown Menu Demo',
    description:
      'Interactive contextual menus with actions and keyboard navigation',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/aura/avatar"
import {
  IconUser,
  IconSettings,
  IconHelp,
  IconBell,
} from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px] p-0">
            <DropdownMenuLabel className="flex flex-row items-center gap-2 pt-1 pb-1 border-b border-border">
              <Avatar variant="default">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-base tracking-tighter font-medium">
                  Jane Smith
                </div>
                <span className="text-sm font-normal tracking-tight text-muted-foreground dark:text-muted-foreground">
                  jane.smith@cognite.com
                </span>
              </div>
            </DropdownMenuLabel>
            <div className="p-1">
              <DropdownMenuItem>
                <IconUser />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettings />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconBell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconHelp />
                Help
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground">
        Click buttons to open interactive dropdown menus.
      </p>
    </div>
  )
}`,
  },
  userDetails: {
    title: 'User Details Demo',
    description: 'Display user details in a dropdown menu',
    component: UserDetailsDemo,
    difficulty: 'intermediate',
    code: `import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  IconUser,
  IconSettingsFilled,
  IconBell,
  IconHelp,
} from "@tabler/icons-react"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/aura/avatar';
import * as React from 'react';

function UserDetailsDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open User DetailsMenu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px]">
            <DropdownMenuLabel className="flex flex-row items-center gap-2 ">
              <div>User Details</div>
            </DropdownMenuLabel>
            <div className="px-1 pt-1">
              <DropdownMenuItem>
                <IconUser />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettingsFilled />
                Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <IconBell />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconHelp />
                Help
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const dropdownMenuMeta = {
  name: 'Dropdown Menu',
  description:
    'Displays a menu to the user triggered by a button press or hover.',
  llmUsage:
    'When asked for a dropdown menu, use `<DropdownMenu>` for contextual actions and navigation.',
  importPath: '@/components/ui/aura/dropdown-menu',
};
