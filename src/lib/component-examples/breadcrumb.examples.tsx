import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
        <BreadcrumbEllipsis />
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/canvas">Canvas</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbPage>Test canvas</BreadcrumbPage>
              <span className="sr-only">Toggle menu</span>
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
                <DropdownMenuItem className="text-destructive-foreground p-2">
                  <IconTrash className="text-destructive-foreground hover:text-destructive-foreground" />
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
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/aura/breadcrumb"

export function BasicDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
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
