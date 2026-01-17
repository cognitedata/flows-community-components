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
} from '@/components/ui/aura/menubar';
import type { ComponentExamples } from '@/lib/component-examples/types';

function MenubarDemo() {
  return (
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
  );
}

export const menubarExamples: ComponentExamples = {
  basic: {
    title: 'Menubar Demo',
    description:
      'Interactive menu bar with dropdown menus common in desktop applications',
    component: MenubarDemo,
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
} from "@/components/ui/aura/menubar"

export function MenubarDemo() {
  return (
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
  importPath: '@/components/ui/aura/menubar',
};
