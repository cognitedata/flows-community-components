import { NoticeBanner } from '@/components/ui/notice-banner';

const COMPONENTS_DOCS_BANNER_MESSAGE = 'Docs coming soon';

export function ComponentsDocsBanner() {
  return (
    <NoticeBanner
      aria-label="Component documentation notice"
      className="mb-8"
      message={COMPONENTS_DOCS_BANNER_MESSAGE}
      tone="foreground"
    />
  );
}
