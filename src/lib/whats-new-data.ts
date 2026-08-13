import {
  IconBook2,
  IconLayoutGrid,
  IconPalette,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

export interface WhatsNewPost {
  slug: string;
  title: string;
  /** e.g. "November 2026" */
  month: string;
  excerpt: string;
  icon: TablerIcon;
}

/** Newest first. */
export const WHATS_NEW_POSTS: WhatsNewPost[] = [
  {
    slug: 'august-2026',
    title: 'Customer theming, MCP server, and a new Patterns library',
    month: 'August 2026',
    excerpt:
      'This month we shipped a live re-theming panel, an MCP server for connecting agents directly to Aura, and a first batch of layout patterns alongside the component catalog.',
    icon: IconPalette,
  },
  {
    slug: 'july-2026',
    title: 'Foundations rewritten, Community components open up',
    month: 'July 2026',
    excerpt:
      'Foundations grew real per-topic pages, and the Community section now welcomes contributed components like Drawer, Sheet, and Carousel.',
    icon: IconLayoutGrid,
  },
  {
    slug: 'june-2026',
    title: 'A new documentation structure',
    month: 'June 2026',
    excerpt:
      'Documentation moved to a proper sidebar-driven structure with dedicated sections for getting started, architecture, and contribution.',
    icon: IconBook2,
  },
];

export function getWhatsNewPostBySlug(slug: string) {
  return WHATS_NEW_POSTS.find((post) => post.slug === slug) ?? null;
}
