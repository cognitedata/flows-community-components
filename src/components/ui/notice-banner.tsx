import { Banner, BannerIcon, BannerTitle } from '@cognite/aura/components';
import { IconInfoCircle } from '@tabler/icons-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const NOTICE_TONE_CLASS = {
  onInfo: 'text-info-foreground-on-info',
  foreground: 'text-foreground',
} as const;

function NoticeBanner({
  message,
  tone = 'onInfo',
  ...props
}: Omit<React.ComponentProps<typeof Banner>, 'children' | 'variant'> & {
  message: string;
  tone?: keyof typeof NOTICE_TONE_CLASS;
}) {
  return (
    <Banner variant="info" role="status" {...props}>
      <BannerIcon
        icon={IconInfoCircle}
        className={cn(tone === 'foreground' && NOTICE_TONE_CLASS.foreground)}
      />
      <BannerTitle
        className={cn('truncate text-sm sm:text-base', NOTICE_TONE_CLASS[tone])}
      >
        {message}
      </BannerTitle>
    </Banner>
  );
}

export { NoticeBanner };
