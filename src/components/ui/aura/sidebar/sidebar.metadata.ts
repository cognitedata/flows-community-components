import type { ComponentMeta } from '@/lib/component-examples';

/**
 * Sidebar Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const SidebarMetadata: ComponentMeta = {
  name: 'Sidebar',
  status: 'draft',
  description:
    'A collapsible sidebar navigation component with support for mobile sheets, keyboard shortcuts, and nested menu structures.',
  llmUsage:
    'Use `<SidebarProvider>` to wrap your app, then `<Sidebar>` with `<SidebarContent>`, `<SidebarMenu>`, and `<SidebarMenuItem>` for navigation.',
  importPath: '@/components/ui/aura/sidebar',
};
