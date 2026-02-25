import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  IconLoader2,
} from '@tabler/icons-react';
import type { CSSProperties } from 'react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { useTheme } from '../../../theme-provider';

const toasterStyle: CSSProperties & Record<`--${string}`, string> = {
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)',
  '--border-radius': 'var(--radius)',
};

const Toaster = ({ style, ...props }: ToasterProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      data-slot="toaster"
      theme={resolvedTheme}
      className="toaster group"
      icons={{
        success: <IconCircleCheck className="size-4" />,
        info: <IconInfoCircle className="size-4" />,
        warning: <IconAlertTriangle className="size-4" />,
        error: <IconAlertOctagon className="size-4" />,
        loading: <IconLoader2 className="size-4 animate-spin" />,
      }}
      style={{ ...toasterStyle, ...style }}
      {...props}
    />
  );
};

export { Toaster };
