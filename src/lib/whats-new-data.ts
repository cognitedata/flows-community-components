import { IconTable, type Icon as TablerIcon } from '@tabler/icons-react';

export interface WhatsNewPost {
  slug: string;
  title: string;
  /** e.g. "November 2026" or "Oct 2 – 16, 2026" */
  month: string;
  excerpt: string;
  icon: TablerIcon;
  /**
   * Folder name in `public/whats-new-posts/` holding `report.json` and its images.
   * When set, the post page renders the report natively from that data.
   */
  report?: string;
}

/**
 * Newest first. The first entry is the current report and the default page;
 * when a new report is added at the top, the previous ones move down the list.
 */
export const WHATS_NEW_POSTS: WhatsNewPost[] = [
  {
    slug: '2026-10-21',
    title:
      'DataGrid selection and filtering, new page templates, and 19 more documented components',
    month: 'Oct 8 – 21, 2026',
    excerpt:
      'DataGrid gained selection, resizing and filtering, community teams got new page templates, and 19 more components now have portable docs.',
    icon: IconTable,
    report: '2026-10-21',
  },
];

export function getWhatsNewPostBySlug(slug: string) {
  return WHATS_NEW_POSTS.find((post) => post.slug === slug) ?? null;
}
