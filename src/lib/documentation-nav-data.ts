export interface DocumentationNavItem {
  label: string;
  /** Route slug under /documentation. Empty string means the section index page. */
  slug: string;
}

export interface DocumentationNavSection {
  title: string;
  items: DocumentationNavItem[];
}

export const DOCUMENTATION_NAV: DocumentationNavSection[] = [
  {
    title: 'Get started',
    items: [
      { label: 'Overview', slug: '' },
      { label: 'About Aura', slug: 'about-aura' },
      { label: 'Installation', slug: 'installation' },
      { label: 'MCP server', slug: 'mcp-server' },
      { label: 'Custom theming', slug: 'custom-theming' },
      { label: 'Changelog', slug: 'changelog' },
      { label: 'Migration', slug: 'migration' },
    ],
  },
  {
    title: 'Architecture',
    items: [
      { label: 'Tailwind classes', slug: 'tailwind-classes' },
      { label: 'Design.md', slug: 'designmd' },
      { label: 'Skills', slug: 'skills' },
      { label: 'Extending functionality', slug: 'extending-functionality' },
    ],
  },
  {
    title: 'Contribution',
    items: [
      { label: 'New components', slug: 'new-components' },
      { label: 'New patterns', slug: 'new-patterns' },
      { label: 'Community', slug: 'community' },
      { label: 'Figma', slug: 'figma' },
      { label: 'Guidelines', slug: 'guidelines' },
    ],
  },
];

/** Every nav item across all sections, excluding the section index ("") entry. */
export const ALL_DOCUMENTATION_NAV_ITEMS: DocumentationNavItem[] =
  DOCUMENTATION_NAV.flatMap((section) => section.items).filter(
    (item) => item.slug !== ''
  );

export function getDocumentationNavItemBySlug(slug: string) {
  return ALL_DOCUMENTATION_NAV_ITEMS.find((item) => item.slug === slug) ?? null;
}
