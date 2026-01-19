
import { useState } from 'react';
import { Button } from '@/components/ui/aura/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSectionLabel,
  DropdownMenuTrigger,
  DropdownMenuHeader,
} from '@/components/ui/aura/dropdown-menu';
import type { ComponentExamples } from '@/lib/component-examples/types';
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
  IconTrash,
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
            <DropdownMenuHeader>
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
            </DropdownMenuHeader>
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
            <Button>User Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuHeader>
              <Avatar variant="default">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-base tracking-tighter font-medium">
                  Jane Smith
                </div>
                <span className="text-sm font-normal tracking-tight text-muted-foreground">
                  jane.smith@cognite.com
                </span>
              </div>
            </DropdownMenuHeader>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
function CheckboxItemDemo() {
  const [checkedItems, setCheckedItems] = useState({
    item1: true,
    item2: true,
    item3: false,
    item4: false,
    item5: false,
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Checkbox Item Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px]">
            <DropdownMenuCheckboxItem
              checked={checkedItems.item1}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item1: checked }))
              }
            >
              Option 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item2}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item2: checked }))
              }
            >
              Option 2
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item3}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item3: checked }))
              }
            >
              Option 3
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item4}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item4: checked }))
              }
            >
              Option 4
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item5}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item5: checked }))
              }
            >
              Option 5
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function RadioGroupDemo() {
  const [viewMode, setViewMode] = useState('label');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Radio Group Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[270px]">
            <DropdownMenuSectionLabel>Radio group</DropdownMenuSectionLabel>
            <DropdownMenuRadioGroup
              value={viewMode}
              onValueChange={setViewMode}
            >
              <DropdownMenuRadioItem value="label">Label</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="table">Table</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function DestructiveDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem>
              <IconUser />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSettingsFilled />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <IconTrash />
              Delete
            </DropdownMenuItem>
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
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/aura/avatar"
import {
  IconUser,
  IconSettingsFilled,
  IconHelp,
  IconBell,
} from "@tabler/icons-react"

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px]">
            <DropdownMenuHeader>
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
            </DropdownMenuHeader>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm text-muted-foreground">
        Click buttons to open interactive dropdown menus.
      </p>
    </div>
  );
}`,
  },
  userDetails: {
    title: 'User Details Demo',
    description: 'Dropdown menu with user avatar and details in header',
    component: UserDetailsDemo,
    difficulty: 'intermediate',
    code: `import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuHeader,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/aura/avatar"
import {
  IconUser,
  IconSettingsFilled,
  IconBell,
  IconHelp,
} from "@tabler/icons-react"

function UserDetailsDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>User Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            <DropdownMenuHeader>
              <Avatar variant="default">
                <AvatarImage src="/user-avatar2.png" alt="User" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="text-base tracking-tighter font-medium">
                  Jane Smith
                </div>
                <span className="text-sm font-normal tracking-tight text-muted-foreground">
                  jane.smith@cognite.com
                </span>
              </div>
            </DropdownMenuHeader>
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}`,
  },
  checkboxItem: {
    title: 'Checkbox Item Demo',
    description: 'Display checkbox items in a dropdown menu',
    component: CheckboxItemDemo,
    difficulty: 'intermediate',
    code: `import { useState } from "react"
import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"

function CheckboxItemDemo() {
  const [checkedItems, setCheckedItems] = useState({
    item1: true,
    item2: true,
    item3: false,
    item4: false,
    item5: false,
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Checkbox Item Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[280px]">
            <DropdownMenuCheckboxItem
              checked={checkedItems.item1}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item1: checked }))
              }
            >
              Option 1
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item2}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item2: checked }))
              }
            >
              Option 2
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item3}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item3: checked }))
              }
            >
              Option 3
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item4}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item4: checked }))
              }
            >
              Option 4
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={checkedItems.item5}
              onCheckedChange={(checked) =>
                setCheckedItems((prev) => ({ ...prev, item5: checked }))
              }
            >
              Option 5
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}`,
  },
  radioGroup: {
    title: 'Radio Group Demo',
    description:
      'Display radio group items for single selection in a dropdown menu',
    component: RadioGroupDemo,
    difficulty: 'intermediate',
    code: `import { useState } from "react"
import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSectionLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"

function RadioGroupDemo() {
  const [viewMode, setViewMode] = useState("label")

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Radio Group Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[270px]">
            <DropdownMenuSectionLabel>
              Radio group
            </DropdownMenuSectionLabel>
            <DropdownMenuRadioGroup
              value={viewMode}
              onValueChange={setViewMode}
            >
              <DropdownMenuRadioItem value="label">Label</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="table">Table</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}`,
  },
  destructive: {
    title: 'Destructive Option Demo',
    description: 'Display a dropdown menu with a destructive action option',
    component: DestructiveDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu"
import {
  IconUser,
  IconSettingsFilled,
  IconTrash,
} from "@tabler/icons-react"

function DestructiveDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Open Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem>
              <IconUser />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSettingsFilled />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <IconTrash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
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
