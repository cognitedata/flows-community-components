/** Entry of `public/whats-new-posts/index.json`, rebuilt by the aura-community-changelog skill from the report folders. */
export interface ReportIndexEntry {
  slug: string;
  /** Date range, e.g. "Oct 8 – Oct 21, 2026". */
  label: string;
  headline: string;
}

/** Shape of `public/whats-new-posts/<slug>/report.json`, written by the aura-community-changelog skill. */
export interface ReportImage {
  src: string;
  alt: string;
  /** Small component captured tightly: show at natural size, centred, instead of cropping. */
  auto?: boolean;
}

export interface ReportEval {
  name: string;
  subtitle: string;
  value: number | string;
  unit: string;
  description: string;
  trend: {
    direction: 'up' | 'down' | 'flat' | null;
    improved: boolean | null;
    text: string;
  };
}

export interface ReportItem {
  title: string;
  text: string;
  url?: string;
  label?: string;
  image?: ReportImage;
}

export interface ReportCard extends ReportItem {
  subtitle?: string;
  badge?: string;
}

export interface ReportSection {
  summary: string;
  cards: ReportCard[];
}

export interface WhatsNewReportData {
  slug: string;
  headline: string;
  eyebrow: string;
  title: string;
  intro: string;
  evals: ReportEval[];
  highlights: { summary: string; items: ReportItem[] };
  components?: ReportSection;
  context?: ReportSection;
  other?: ReportSection;
  thanks: { summary: string; people: string[] };
}

/** Rows of at most 3 cards; a trailing single card becomes 2+2 with the row above it. */
export function rowSizes(count: number): number[] {
  const sizes: number[] = [];
  let left = count;
  while (left > 0) {
    if (left === 4) {
      sizes.push(2, 2);
      break;
    }
    const take = Math.min(3, left);
    sizes.push(take);
    left -= take;
  }
  return sizes;
}

function postsUrl(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}whats-new-posts/${path}`;
}

/** Image `src` values in report.json are file names relative to the report folder. */
export function reportAssetUrl(slug: string, src: string): string {
  return postsUrl(`${slug}/${src}`);
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(postsUrl(path));
  if (!response.ok) {
    throw new Error(`Could not load ${path} (HTTP ${response.status})`);
  }
  return (await response.json()) as T;
}

/** Reports, newest first. The first entry is the default page. */
export function fetchIndex(): Promise<ReportIndexEntry[]> {
  return fetchJson<ReportIndexEntry[]>('index.json');
}

export function fetchReport(slug: string): Promise<WhatsNewReportData> {
  return fetchJson<WhatsNewReportData>(`${slug}/report.json`);
}
