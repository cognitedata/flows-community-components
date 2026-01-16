import type { ComponentMeta } from '@/lib/component-examples';

export const PaginationMetadata: ComponentMeta = {
  name: 'Pagination',
  description: 'A pagination component for navigating multi-page content.',
  llmUsage: 'Use `<Pagination>` with `<PaginationContent>`, `<PaginationItem>`, and `<PaginationLink>` for page navigation.',
  importPath: '@/components/ui/aura/pagination',
  docsStories: [
    { storyKey: 'Default', title: 'Default Pagination', description: 'Basic pagination.' },
  ],
};
