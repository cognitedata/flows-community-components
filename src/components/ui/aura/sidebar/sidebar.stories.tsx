import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/aura/avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import {
  IconAppsFilled,
  IconBellFilled,
  IconBoltFilled,
  IconBuilding,
  IconChartAreaFilled,
  IconChevronLeft,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconHomeFilled,
  IconMapPinFilled,
  IconPointFilled,
  IconSearch,
  IconSettingsFilled,
  IconShieldFilled,
  IconWorld,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarHeaderInsert,
  SidebarMainPages,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSection,
  SidebarPages,
  SidebarProjectSelector,
  SidebarProvider,
  SidebarSearch,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Primitives/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["left", "right"],
      description: "Which side the sidebar appears on",
      table: {
        category: "Structure",
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: "left" },
      },
    },
    variant: {
      control: "select",
      options: ["sidebar", "floating", "inset"],
      description: "Visual variant of the sidebar",
      table: {
        category: "Structure",
        type: { summary: '"sidebar" | "floating" | "inset"' },
        defaultValue: { summary: "sidebar" },
      },
    },
    collapsible: {
      control: "select",
      options: ["offcanvas", "icon", "none"],
      description: "How the sidebar can be collapsed",
      table: {
        category: "Behavior",
        type: { summary: '"offcanvas" | "icon" | "none"' },
        defaultValue: { summary: "offcanvas" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
    chromatic: {
      viewports: [1200],
    },
    docs: {
      description: {
        component:
          "A composable sidebar component following the shadcn pattern with sticky header/footer and scrollable content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/**
 * Complete sidebar with header, scrollable content, and footer.
 * This follows the shadcn pattern with proper flexbox layout.
 */
export const IndustrialToolsExpanded: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Full sidebar structure with brand, project selector, search, navigation pages, pinned apps, and footer with user profile. The content scrolls while header and footer remain visible.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const projectLabel = canvas.getByText("AkerBP-DEV");
    await expect(projectLabel).toBeInTheDocument();
    const atlasButton = canvas.getByText("Atlas");
    await expect(atlasButton).toBeInTheDocument();
    const footer = canvas.getByText("Elizabeth Fitzgerald");
    await expect(footer).toBeInTheDocument();
  },
  render: () => (
    <div className="relative h-[996px] w-full max-w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen className="h-full">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">
                    Industrial tools
                  </div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
              <SidebarSearch>
                <IconSearch className="h-4.5 w-4.5" />
                <span>Search</span>
              </SidebarSearch>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Home" size="default">
                        <IconHomeFilled className="h-4 w-4" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Atlas">
                        <IconWorld className="h-4 w-4" />
                        <span>Atlas</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Canvas">
                        <IconChevronLeft className="h-4.5 w-4.5" />
                        <span>Canvas</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Charts">
                        <IconBoltFilled className="h-4 w-4" />
                        <span>Charts</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
                <SidebarMenuSection title="Pinned apps">
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="App" size="default">
                      <IconPointFilled className="h-4 w-4" />
                      <span>App</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="App">
                      <IconPointFilled className="h-4 w-4" />
                      <span>App</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="App">
                      <IconPointFilled className="h-4 w-4" />
                      <span>App</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenuSection>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconAppsFilled className="h-4 w-4" />
                      <span>Flows</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                This is the main content area. The sidebar header and footer remain visible while
                the content scrolls.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

/**
 * Collapsed sidebar in icon-only mode with tooltips.
 * Tests tooltip behavior on hover.
 */
export const IndustrialToolsCollapsed: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Sidebar collapsed to icon-only mode. Hover over icons to see tooltips. Click the trigger button to expand.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /toggle sidebar/i });
    await expect(trigger).toBeInTheDocument();
    const homeButton = canvas.getByText("Home");
    await expect(homeButton).toBeInTheDocument();
  },
  render: () => (
    <SidebarProvider defaultOpen={false} className="min-h-0 h-[996px]">
      <div className="flex h-full w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarHeaderInsert>
              <Avatar sizes="default">
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                  AkerBP-DEV
                </div>
                <div className="text-xs text-sidebar-foreground/70 truncate">Industrial tools</div>
              </div>
            </SidebarHeaderInsert>
            <SidebarProjectSelector>
              <IconMapPinFilled className="h-4 w-4" />
              <span>Valhall</span>
            </SidebarProjectSelector>
            <SidebarSearch>
              <IconSearch className="h-4 w-4" />
              <span>Search</span>
            </SidebarSearch>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarPages>
              <SidebarMainPages>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Home" size="default">
                      <IconHomeFilled className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Atlas">
                      <IconWorld className="h-4 w-4" />
                      <span>Atlas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Canvas">
                      <IconChevronLeft className="h-4 w-4" />
                      <span>Canvas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Charts">
                      <IconBoltFilled className="h-4 w-4" />
                      <span>Charts</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarMainPages>
              <SidebarMenuSection title="Pinned apps">
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="App" size="default">
                    <IconPointFilled className="h-4 w-4" />
                    <span>App</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="App">
                    <IconPointFilled className="h-4 w-4" />
                    <span>App</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="App">
                    <IconPointFilled className="h-4 w-4" />
                    <span>App</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenuSection>
            </SidebarPages>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex flex-col gap-3 w-full">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Flows">
                    <IconAppsFilled className="h-4 w-4" />
                    <span>Flows</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Help">
                    <IconHelp className="h-4 w-4" />
                    <span>Help</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Notifications">
                    <IconBellFilled className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <div className="flex items-center gap-2">
                <Avatar sizes="default">
                  <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-sm font-medium text-sidebar-foreground truncate">
                    Elizabeth Fitzgerald
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">
          <SidebarTrigger />
          <div className="mt-4">
            <h1 className="text-2xl font-bold mb-4">Main Content</h1>
            <p className="text-muted-foreground">
              This is the main content area. The sidebar header and footer remain visible while the
              content scrolls.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
};

export const DataManagementExpanded: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Expanded Data management navigation with mixed section patterns and contextual badges.",
      },
    },
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen className="h-full">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">Data management</div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
              <SidebarSearch>
                <IconSearch className="h-4.5 w-4.5" />
                <span>Search</span>
              </SidebarSearch>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Data explorer">
                        <IconSearch className="h-4.5 w-4.5" />
                        <span>Data explorer</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Data catalog">
                        <IconFolder className="h-4 w-4" />
                        <span>Data catalog</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Data models">
                        <IconFolder className="h-4 w-4" />
                        <span>Data models</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>

                <SidebarMenuSection title="Integrate" collapsible defaultOpen />

                <SidebarMenuSection title="Contextualize" collapsible defaultOpen>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Diagram parsing">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Diagram parsing</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Document parsing">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Document parsing</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Entity matching">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Entity matching</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Images and videos">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Images and videos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Model data with te...">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Model data with te...</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenuSection>

                <SidebarMenuSection title="Build solutions" collapsible defaultOpen />
                <SidebarMenuSection title="Configure" collapsible defaultOpen />
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                Use the controls to test different sidebar configurations.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

export const DataManagementCollapsed: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Collapsed Data management navigation in icon mode with identical content to the expanded variant.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /toggle sidebar/i });
    await expect(trigger).toBeInTheDocument();
    const dataCatalogButton = canvas.getByText("Data catalog");
    await expect(dataCatalogButton).toBeInTheDocument();
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen={false} className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">Data management</div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
              <SidebarSearch>
                <IconSearch className="h-4 w-4" />
                <span>Search</span>
              </SidebarSearch>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Data explorer">
                        <IconSearch className="h-4.5 w-4.5" />
                        <span>Data explorer</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Data catalog">
                        <IconFolder className="h-4 w-4" />
                        <span>Data catalog</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Data models">
                        <IconFolder className="h-4 w-4" />
                        <span>Data models</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>

                <SidebarMenuSection title="Integrate" collapsible defaultOpen={false} />

                <SidebarMenuSection title="Contextualize" collapsible defaultOpen>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Diagram parsing">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Diagram parsing</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Document parsing">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Document parsing</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Entity matching">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Entity matching</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Images and videos">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Images and videos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Model data with te...">
                      <IconFileDescription className="h-4 w-4" />
                      <span>Model data with te...</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenuSection>

                <SidebarMenuSection title="Build solutions" collapsible defaultOpen={false} />
                <SidebarMenuSection title="Configure" collapsible defaultOpen={false} />
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Help">
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Notifications">
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                Use the controls to test different sidebar configurations.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

export const AdminExpanded: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Expanded Admin navigation with management items, organization badge, and compact footer actions.",
      },
    },
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen className="h-full">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">Admin</div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Access management">
                        <IconShieldFilled className="h-4 w-4" />
                        <span>Access management</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Project settings">
                        <IconSettingsFilled className="h-4 w-4" />
                        <span>Project settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="My organization">
                        <IconBuilding className="h-4 w-4" />
                        <span>My organization</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge variant="mountain">Badge</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

export const AdminCollapsed: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Collapsed Admin navigation in icon mode with the same content as the expanded variant.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /toggle sidebar/i });
    await expect(trigger).toBeInTheDocument();
    const projectSettingsButton = canvas.getByText("Project settings");
    await expect(projectSettingsButton).toBeInTheDocument();
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen={false} className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">Admin</div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Access management">
                        <IconShieldFilled className="h-4 w-4" />
                        <span>Access management</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Project settings">
                        <IconSettingsFilled className="h-4 w-4" />
                        <span>Project settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="My organization">
                        <IconBuilding className="h-4 w-4" />
                        <span>My organization</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge variant="mountain">Badge</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Help">
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Notifications">
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

export const AtlasAIExpanded: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Expanded Atlas AI navigation with model library badge and compact application footer actions.",
      },
    },
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen className="h-full">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">Atlas AI</div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="AI agents">
                        <IconAppsFilled className="h-4 w-4" />
                        <span>AI agents</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Evaluate agents">
                        <IconBoltFilled className="h-4 w-4" />
                        <span>Evaluate agents</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Model library">
                        <IconWorld className="h-4 w-4" />
                        <span>Model library</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Consumption">
                        <IconChartAreaFilled className="h-4 w-4" />
                        <span>Consumption</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

export const AtlasAICollapsed: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Collapsed Atlas AI navigation in icon mode with the same content as the expanded variant.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /toggle sidebar/i });
    await expect(trigger).toBeInTheDocument();
    const modelLibraryButton = canvas.getByText("Model library");
    await expect(modelLibraryButton).toBeInTheDocument();
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider defaultOpen={false} className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">Atlas AI</div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="AI agents">
                        <IconAppsFilled className="h-4 w-4" />
                        <span>AI agents</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Evaluate agents">
                        <IconBoltFilled className="h-4 w-4" />
                        <span>Evaluate agents</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Model library">
                        <IconWorld className="h-4 w-4" />
                        <span>Model library</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge variant="fjord">Beta</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Consumption">
                        <IconChartAreaFilled className="h-4 w-4" />
                        <span>Consumption</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Help">
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Notifications">
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

/**
 * Sidebar with minimal content to show footer positioning
 * Demonstrates that footer stays at bottom with little content.
 */
export const MinimalContent: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Sidebar with only a few navigation items. Shows that the footer remains at the bottom even with minimal scrollable content.",
      },
    },
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">
                    Industrial tools
                  </div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
              <SidebarSearch>
                <IconSearch className="h-4.5 w-4.5" />
                <span>Search</span>
              </SidebarSearch>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Home" size="default">
                        <IconHomeFilled className="h-4 w-4" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Atlas">
                        <IconWorld className="h-4 w-4" />
                        <span>Atlas</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconAppsFilled className="h-4 w-4" />
                      <span>App library</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconHelp className="h-4 w-4" />
                      <span>Help</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconBellFilled className="h-4 w-4" />
                      <span>Notifications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                Footer remains at the bottom even with minimal content above it.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

/**
 * Interactive playground for testing sidebar props
 */
export const Playground: Story = {
  parameters: {
    order: 10,
  },
  args: {
    side: "left",
    variant: "sidebar",
    collapsible: "icon",
  },
  render: (args) => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar {...args}>
            <SidebarHeader>
              <SidebarHeaderInsert>
                <Avatar sizes="default">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                    AkerBP-DEV
                  </div>
                  <div className="text-xs text-sidebar-foreground/70 truncate">
                    Industrial tools
                  </div>
                </div>
              </SidebarHeaderInsert>
              <SidebarProjectSelector>
                <IconMapPinFilled className="h-4 w-4" />
                <span>Valhall</span>
              </SidebarProjectSelector>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarPages>
                <SidebarMainPages>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Home">
                        <IconHomeFilled className="h-4 w-4" />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Atlas">
                        <IconWorld className="h-4 w-4" />
                        <span>Atlas</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarMainPages>
              </SidebarPages>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex flex-col gap-3 w-full">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconAppsFilled className="h-4 w-4" />
                      <span>App library</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                Use the controls to test different sidebar configurations.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};
