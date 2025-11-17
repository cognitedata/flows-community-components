import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/cognite/context-menu";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here for context menu
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>File Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>New File</ContextMenuItem>
          <ContextMenuItem>Open File</ContextMenuItem>
          <ContextMenuItem>Save</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      
      <p className="text-sm text-muted-foreground">
        Right-click on the dashed area above to see the interactive context menu.
      </p>
    </div>
  );
}

export const contextMenuExamples: ComponentExamples = {
  basic: {
    title: "Context Menu",
    description: "Interactive right-click menu that appears at the pointer location",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/cognite/context-menu"

export function BasicDemo() {
  return (
    <div className="space-y-4">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here for context menu
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>File Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>New File</ContextMenuItem>
          <ContextMenuItem>Open File</ContextMenuItem>
          <ContextMenuItem>Save</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>Cut</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Paste</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      
      <p className="text-sm text-muted-foreground">
        Right-click on the dashed area above to see the interactive context menu.
      </p>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const contextMenuMeta = {
  name: "Context Menu",
  description: "Displays a menu at the pointer location.",
  llmUsage: "When creating right-click menus, use `<ContextMenu>` with `<ContextMenuTrigger>` and `<ContextMenuContent>`.",
  importPath: "@/components/ui/cognite/context-menu",
};
