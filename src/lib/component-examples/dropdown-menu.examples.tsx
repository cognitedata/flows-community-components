import { Button } from "@/components/ui/cognite/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSectionLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu";
import type { ComponentExamples } from "./types";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/cognite/avatar";
import {
  IconUser,
  IconSettings,
  IconHelp,
  IconBell,
} from "@tabler/icons-react";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex flex-row gap-2">
              <Avatar>
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="text-base font-medium">Jane Smith</div>
                <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                  jane.smith@cognite.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSectionLabel>Section label</DropdownMenuSectionLabel>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground">
        Click buttons to open interactive dropdown menus.
      </p>
    </div>
  );
}

export const dropdownMenuExamples: ComponentExamples = {
  basic: {
    title: "Dropdown Menu Demo",
    description:
      "Interactive contextual menus with actions and keyboard navigation",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSectionLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"
import { Button } from "@/components/ui/cognite/button"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/cognite/avatar"
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
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex flex-row gap-2">
              <Avatar>
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <div className="text-base font-medium">Jane Smith</div>
                <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                  jane.smith@cognite.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSectionLabel>Section label</DropdownMenuSectionLabel>
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
};

// Component metadata - single source of truth for API documentation
export const dropdownMenuMeta = {
  name: "Dropdown Menu",
  description:
    "Displays a menu to the user triggered by a button press or hover.",
  llmUsage:
    "When asked for a dropdown menu, use `<DropdownMenu>` for contextual actions and navigation.",
  importPath: "@/components/ui/cognite/dropdown-menu",
};
