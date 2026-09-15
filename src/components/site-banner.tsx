import { Banner, BannerIcon, BannerTitle } from '@cognite/aura/components';
import { IconInfoCircle } from '@tabler/icons-react';

const SITE_BANNER_MESSAGE =
  'This site is a work in progress. Please be patient as we continue updating and adding content.';

export function SiteBanner() {
  return (
    <Banner
      variant="info"
      role="status"
      aria-label="Site notice"
      className="text-info-foreground-on-info"
    >
      <BannerIcon icon={IconInfoCircle} />
      <BannerTitle className="truncate text-sm text-info-foreground-on-info sm:text-base">
        {SITE_BANNER_MESSAGE}
      </BannerTitle>
    </Banner>
  );
}
