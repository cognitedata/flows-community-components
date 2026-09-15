export interface DocumentationNavItem {
  label: string;
  /** Route slug under /aura/documentation. */
  slug: string;
  /** When true, the item is omitted from navigation. */
  hidden?: boolean;
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
      { label: 'Changelog', slug: 'changelog', hidden: true },
      { label: 'Installation', slug: 'installation' },
      { label: 'Custom theming', slug: 'custom-theming' },
      { label: 'DESIGN.md', slug: 'designmd' },
      { label: 'Migration', slug: 'migration' },
      { label: 'App review', slug: 'appreview' },
    ],
  },
];

export const ALL_DOCUMENTATION_NAV_ITEMS: DocumentationNavItem[] =
  DOCUMENTATION_NAV.flatMap((section) => section.items);

export const VISIBLE_DOCUMENTATION_NAV_ITEMS: DocumentationNavItem[] =
  ALL_DOCUMENTATION_NAV_ITEMS.filter((item) => !item.hidden);

export function getDocumentationNavItemBySlug(slug: string) {
  const item =
    ALL_DOCUMENTATION_NAV_ITEMS.find((item) => item.slug === slug) ?? null;
  if (!item || item.hidden) return null;
  return item;
}
