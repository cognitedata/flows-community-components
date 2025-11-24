import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/cognite/menubar';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarItem>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>
              Copy<MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem inset>
              Paste<MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarItem inset>
              Paste to replace<MenubarShortcut>⇧⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarItem inset>
              Duplicate<MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Annotations</MenubarCheckboxItem>
            <MenubarCheckboxItem>Comments</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Layout guides</MenubarCheckboxItem>
            <MenubarCheckboxItem>Rulers</MenubarCheckboxItem>
            <MenubarCheckboxItem>Pixel grid</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarLabel>Layout</MenubarLabel>
            <MenubarItem>Full Screen</MenubarItem>
            <MenubarItem>Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarLabel>Layout</MenubarLabel>
            <MenubarItem>Full Screen</MenubarItem>
            <MenubarItem>Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Documentation</MenubarItem>
            <MenubarItem>Keyboard Shortcuts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

function SmallSizeDemo() {
  return (
    <div className="space-y-4">
      <Menubar size="sm">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo<MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo<MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cut<MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Copy<MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Paste<MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <p className="text-sm text-muted-foreground">
        A more compact menubar using the small size variant.
      </p>
    </div>
  );
}

export const menubarExamples: ComponentExamples = {
  basic: {
    title: 'Menubar Demo',
    description:
      'Interactive menu bar with dropdown menus common in desktop applications',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/cognite/menubar"

export function BasicDemo() {
  return (
    <div className="space-y-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarItem>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
            <MenubarItem>Share</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>Copy<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
            <MenubarItem inset>Paste<MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
            <MenubarItem inset>Paste to replace<MenubarShortcut>⇧⌘V</MenubarShortcut></MenubarItem>
            <MenubarItem inset>Duplicate<MenubarShortcut>⌘D</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarCheckboxItem checked>Annotations</MenubarCheckboxItem>
            <MenubarCheckboxItem>Comments</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>Layout guides</MenubarCheckboxItem>
            <MenubarCheckboxItem>Rulers</MenubarCheckboxItem>
            <MenubarCheckboxItem>Pixel grid</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarLabel>Layout</MenubarLabel>
            <MenubarItem>Full Screen</MenubarItem>
            <MenubarItem>Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger disabled>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
            <MenubarSeparator />
            <MenubarLabel>Layout</MenubarLabel>
            <MenubarItem>Full Screen</MenubarItem>
            <MenubarItem>Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Documentation</MenubarItem>
            <MenubarItem>Keyboard Shortcuts</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>About</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}`,
  },
  smallSize: {
    title: 'Small Size',
    description: 'A more compact menubar using the small size variant',
    component: SmallSizeDemo,
    difficulty: 'beginner',
    code: `import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/cognite/menubar"

export function SmallSizeDemo() {
  return (
    <div className="space-y-4">
      <Menubar size="sm">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New Tab</MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
            <MenubarItem>Redo<MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Cut<MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
            <MenubarItem>Copy<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
            <MenubarItem>Paste<MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
            <MenubarItem>Reset Zoom</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const menubarMeta = {
  name: 'Menubar',
  description: 'A visually persistent menu common in desktop applications.',
  llmUsage:
    'When creating menu bars, use `<Menubar>` with `<MenubarMenu>`, `<MenubarTrigger>`, and `<MenubarContent>`.',
  importPath: '@/components/ui/cognite/menubar',
};
