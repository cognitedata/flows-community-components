import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/cognite/command";
import type { ComponentExamples } from "./types";
import React from "react";
import {
  IconChartLine,
  IconHexagon,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/draft/button";

function BasicDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <Button
        type="button"
        aria-label="Open command menu"
        onClick={() => setOpen(true)}
        variant="secondary"
        size="icon"
      >
        <IconSearch className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent">
            <CommandItem>
              <IconHexagon className="text-muted-foreground" />
              Troubleshooting 21PT-1019 report
            </CommandItem>
            <CommandItem>
              <IconChartLine className="text-muted-foreground" />
              XRC:21 pressure valve
            </CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <IconHexagon className="text-muted-foreground" />
              Atlas
            </CommandItem>
            <CommandItem>
              <IconUser className="text-muted-foreground" />
              Profile
            </CommandItem>
            <CommandItem>
              <IconSettings />
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export const commandExamples: ComponentExamples = {
  basic: {
    title: "Command Menu",
    description:
      "Interactive command menu with search functionality and keyboard navigation",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/cognite/command"
import {
  IconChartLine,
  IconHexagon,
  IconSearch,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/draft/button";

export function BasicDemo() {
 const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <Button
        type="button"
        aria-label="Open command menu"
        onClick={() => setOpen(true)}
        variant="secondary"
        size="icon"
      >
        <IconSearch className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent">
            <CommandItem>
              <IconHexagon className="text-muted-foreground" />
              Troubleshooting 21PT-1019 report
            </CommandItem>
            <CommandItem>
              <IconChartLine className="text-muted-foreground" />
              XRC:21 pressure valve
            </CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <IconHexagon className="text-muted-foreground" />
              Atlas
            </CommandItem>
            <CommandItem>
              <IconUser className="text-muted-foreground" />
              Profile
            </CommandItem>
            <CommandItem>
              <IconSettings />
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const commandMeta = {
  name: "Command",
  description: "Fast, composable command menu for React.",
  llmUsage:
    "When creating command palettes or searchable menus, use `<Command>` with `<CommandInput>`, `<CommandList>`, and `<CommandItem>` components.",
  importPath: "@/components/ui/cognite/command",
};
