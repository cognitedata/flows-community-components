import { NoticeBanner } from '@/components/ui/notice-banner';

const SITE_BANNER_MESSAGE =
  'This site is a work in progress. Please be patient as we continue updating and adding content.';

export function SiteBanner() {
  return (
    <NoticeBanner aria-label="Site notice" message={SITE_BANNER_MESSAGE} />
  );
}
