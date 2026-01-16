import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisButton,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPageButton,
  BreadcrumbSeparator,
} from '@/components/ui/aura/breadcrumb';
import type { ComponentExamples } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/aura/dropdown-menu';
import {
  IconPencil,
  IconTag,
  IconCircleArrowDown,
  IconTrash,
} from '@tabler/icons-react';

function BasicDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbEllipsis>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbEllipsisButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <a href="/projects">Projects</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/teams">Teams</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/workspaces">Workspaces</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbEllipsis>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbPageButton>Test canvas</BreadcrumbPageButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px] p-0">
              <div className="p-1">
                <DropdownMenuItem className="p-2">
                  <IconPencil /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconTag /> Add tags
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconCircleArrowDown /> Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" className="p-2">
                  <IconTrash />
                  Delete
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const breadcrumbExamples: ComponentExamples = {
  basic: {
    title: 'Basic Breadcrumb',
    description: 'Navigation breadcrumbs showing the current page location',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbEllipsisButton,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPageButton,
  BreadcrumbSeparator,
} from "@/components/ui/aura/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/aura/dropdown-menu"
import {
  IconPencil,
  IconTag,
  IconCircleArrowDown,
  IconTrash,
} from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbEllipsis>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbEllipsisButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <a href="/projects">Projects</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/teams">Teams</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/workspaces">Workspaces</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbEllipsis>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbPageButton>Test canvas</BreadcrumbPageButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px] p-0">
              <div className="p-1">
                <DropdownMenuItem className="p-2">
                  <IconPencil /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconTag /> Add tags
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2">
                  <IconCircleArrowDown /> Download as PDF
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" className="p-2">
                  <IconTrash />
                  Delete
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const breadcrumbMeta = {
  name: 'Breadcrumb',
  description:
    'Displays the path to the current resource using a hierarchy of links.',
  llmUsage:
    'When showing navigation breadcrumbs, use `<Breadcrumb>` with `<BreadcrumbList>`, `<BreadcrumbItem>`, and `<BreadcrumbLink>` components.',
  importPath: '@/components/ui/aura/breadcrumb',
};
