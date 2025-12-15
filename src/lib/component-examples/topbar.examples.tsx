import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
  TopbarSwapSlot,
  TopbarAction,
} from '@/components/ui/aura/topbar';
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/aura/breadcrumb';
import { Button } from '@/components/ui/aura/button';
// import { SwapSlot } from '@/components/ui/aura/swap-slot';
import {
  IconHome,
  IconShare,
  IconLayoutSidebar,
  IconPlus,
  IconDownload,
  IconEdit,
} from '@tabler/icons-react';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon">
            <IconLayoutSidebar className="h-4 w-4" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <IconHome className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Application</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter />
        <TopbarRight>
          {/* <TopbarSwapSlot>
            <SwapSlot className="border-2 border-dashed border-primary/40 rounded flex items-center justify-center w-[122px] h-[28px]">
              <span className="text-xs text-muted-foreground">Slot</span>
            </SwapSlot>
          </TopbarSwapSlot> */}
          <Button size="sm">
            <IconPlus />
            Button
          </Button>
          <Button variant="ghost" size="icon">
            <IconShare className="h-4 w-4" />
          </Button>
        </TopbarRight>
      </Topbar>
    </div>
  );
}

function EosTopbar() {
  return (
    <div className="w-full border rounded-lg overflow-hidden">
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon">
            <IconLayoutSidebar className="h-4 w-4" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <IconHome className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Atlas</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage> Abnormal vibration on 21PT1019</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter />
        <TopbarRight>
          <Button variant="ghost" size="sm">
            <IconDownload className="h-4 w-4" />
            Download
          </Button>
          <Button size="sm">
            <IconEdit className="h-4 w-4" />
            New chat
          </Button>
          {/* <TopbarSwapSlot> */}
          {/* <SwapSlot className="border-2 border-dashed border-primary/40 rounded flex items-center justify-center w-[122px] h-[28px]">
              <span className="text-xs text-muted-foreground">Slot</span>
            </SwapSlot> */}
          {/* </TopbarSwapSlot> */}
        </TopbarRight>
      </Topbar>
    </div>
  );
}
export const topbarExamples: ComponentExamples = {
  basic: {
    title: 'Basic Topbar',
    description:
      'A topbar with breadcrumbs on the left, empty center, and actions on the right',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
  TopbarSwapSlot,
  TopbarAction,
} from "@/components/ui/aura/topbar"
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/aura/breadcrumb"
// import { SwapSlot } from "@/components/ui/aura/swap-slot"
import { IconHome, IconSearch, IconApps, IconLayoutSidebar } from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <Topbar>
      <TopbarLeft>
        <TopbarBreadcrumbs>
          <BreadcrumbList>
            <BreadcrumbItem>
              <IconLayoutSidebar className="h-4 w-4" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <IconHome className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Application / My dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </TopbarBreadcrumbs>
      </TopbarLeft>
      <TopbarCenter />
      <TopbarRight>
        <TopbarSwapSlot>
          <SwapSlot className="h-8 w-20 border-2 border-dashed border-primary/40 rounded">
            Slot
          </SwapSlot>
        </TopbarSwapSlot>
        <TopbarAction>
          <IconApps className="h-4 w-4" />
          Button
        </TopbarAction>
        <TopbarAction variant="ghost" size="icon">
          <IconSearch className="h-4 w-4" />
        </TopbarAction>
      </TopbarRight>
    </Topbar>
  )
}`,
  },
  eos: {
    title: 'EOS Topbar',
    description:
      'A topbar with breadcrumbs on the left, empty center, and actions on the right',
    component: EosTopbar,
    difficulty: 'beginner',
    code: `import {
      Topbar,
      TopbarLeft,
      TopbarCenter,
      TopbarRight,
      TopbarBreadcrumbs,
      TopbarSwapSlot,
      TopbarAction,
    } from "@/components/ui/aura/topbar"
    import {
      BreadcrumbList,
      BreadcrumbItem,
      BreadcrumbLink,
      BreadcrumbSeparator,
      BreadcrumbPage,
    } from "@/components/ui/aura/breadcrumb"
    import { SwapSlot } from "@/components/ui/aura/swap-slot"
    import { IconHome, IconSearch, IconApps, IconLayoutSidebar } from "@tabler/icons-react"
    export function EosTopbar() {
      return (
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon">
              <IconLayoutSidebar className="h-4 w-4" />
            </Button>
          </TopbarLeft>
          <TopbarCenter />
          <TopbarRight>
            <TopbarSwapSlot>
              <SwapSlot className="border-2 border-dashed border-primary/40 rounded flex items-center justify-center w-[122px] h-[28px]">
                <span className="text-xs text-muted-foreground">Slot</span>
              </SwapSlot>
            </TopbarSwapSlot>
          </TopbarRight>
        </Topbar>
      );
    }
  }`,
  },
};

// Component metadata - single source of truth for API documentation
export const topbarMeta = {
  name: 'Topbar',
  description:
    'A flexible topbar component with breadcrumbs, center space, and action buttons. Integrates with the Sidebar component for full layout support.',
  llmUsage:
    'Use Topbar for application headers. Include TopbarLeft with TopbarBreadcrumbs for navigation, TopbarCenter for optional content, and TopbarRight with TopbarSwapSlot and TopbarAction for actions. Wrap with TopbarWithSidebar and TopbarContent when using with Sidebar.',
  importPath: '@/components/ui/aura/topbar',
};
