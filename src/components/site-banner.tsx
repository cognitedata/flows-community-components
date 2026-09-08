import { Banner, BannerIcon, BannerTitle } from '@cognite/aura/components';
import { IconInfoCircle } from '@tabler/icons-react';

const SITE_BANNER_MESSAGE =
  'This site is a work in progress. Please be patient as we continue updating and adding content.';

export function SiteBanner() {
  return (
    <Banner variant="info" role="status" aria-label="Site notice">
      <BannerIcon icon={IconInfoCircle} />
      <BannerTitle className="truncate text-sm sm:text-base">
        {SITE_BANNER_MESSAGE}
      </BannerTitle>
    </Banner>
  );
}
