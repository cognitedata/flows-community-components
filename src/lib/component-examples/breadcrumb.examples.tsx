import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#aura/breadcrumb';
import type { ComponentExamples } from './types';

function BasicDemo() {
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
} from "#aura/breadcrumb"

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
  importPath: '#aura/breadcrumb',
};
