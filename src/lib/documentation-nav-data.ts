export interface DocumentationNavItem {
  label: string;
  /** Route slug under /aura/documentation. */
  slug: string;
}

export interface DocumentationNavSection {
  title: string;
  items: DocumentationNavItem[];
}

export const DOCUMENTATION_NAV: DocumentationNavSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', slug: 'about-aura' },
      { label: 'Changelog', slug: 'changelog' },
      { label: 'Installation', slug: 'installation' },
      { label: 'MCP server', slug: 'mcp-server' },
      { label: 'Custom theming', slug: 'custom-theming' },
      { label: 'Architecture', slug: 'architecture' },
      { label: 'Design.md & skills', slug: 'designmd' },
      { label: 'Migration', slug: 'migration' },
      { label: 'Contribution', slug: 'contribution' },
    ],
  },
];

export const ALL_DOCUMENTATION_NAV_ITEMS: DocumentationNavItem[] =
  DOCUMENTATION_NAV.flatMap((section) => section.items);

export function getDocumentationNavItemBySlug(slug: string) {
  return ALL_DOCUMENTATION_NAV_ITEMS.find((item) => item.slug === slug) ?? null;
}
