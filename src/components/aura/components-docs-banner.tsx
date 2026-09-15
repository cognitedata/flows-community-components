import { Banner, BannerIcon, BannerTitle } from '@cognite/aura/components';
import { IconInfoCircle } from '@tabler/icons-react';

const COMPONENTS_DOCS_BANNER_MESSAGE = 'Docs coming soon';

export function ComponentsDocsBanner() {
  return (
    <Banner
      variant="info"
      role="status"
      aria-label="Component documentation notice"
      className="mb-8 text-foreground [&_[data-slot=banner-icon]]:text-foreground [&_[data-slot=banner-title]]:text-foreground"
    >
      <BannerIcon icon={IconInfoCircle} />
      <BannerTitle className="truncate text-sm text-foreground sm:text-base">
        {COMPONENTS_DOCS_BANNER_MESSAGE}
      </BannerTitle>
    </Banner>
  );
}
