import { Button } from "@/components/ui/cognite/button";
import { Separator } from "@/components/ui/cognite/separator";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3 max-w-xs">
      <Button>Menu Trigger</Button>
      <div className="border rounded p-2 bg-background">
        <div className="p-2 hover:bg-muted rounded text-sm cursor-pointer">
          Profile
        </div>
        <div className="p-2 hover:bg-muted rounded text-sm cursor-pointer">
          Settings
        </div>
        <Separator className="my-1" />
        <div className="p-2 hover:bg-muted rounded text-sm cursor-pointer text-destructive">
          Logout
        </div>
      </div>
    </div>
  );
}

export const dropdownMenuExamples: ComponentExamples = {
  basic: {
    title: "Dropdown Menu Demo",
    description:
      "Contextual menus with actions (requires interactive implementation)",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`,
  },
};

