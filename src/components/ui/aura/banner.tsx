'use client';

import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { IconX, type IconProps } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ComponentType,
  createContext,
  type HTMLAttributes,
  type MouseEventHandler,
  useContext,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from '@/components/ui/aura/button';
import { Badge } from '@/components/ui/aura/badge';
import { cn } from '@/lib/utils';

type BannerVariant = 'default' | 'neutral' | 'destructive' | 'warning';

type BannerContextProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  variant: BannerVariant;
};

export const BannerContext = createContext<BannerContextProps>({
  show: true,
  setShow: () => {},
  variant: 'default',
});

const bannerVariants = cva(
  'flex w-full min-h-11 items-center gap-2 px-3.5 py-2',
  {
    variants: {
      variant: {
        default: 'bg-mountain text-foreground',
        neutral: 'bg-neutral text-foreground',
        destructive: 'bg-destructive text-foreground',
        warning: 'bg-warning text-foreground',
      },
      inset: {
        true: 'rounded-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inset: false,
    },
  }
);

export type BannerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof bannerVariants> & {
    visible?: boolean;
    defaultVisible?: boolean;
    onClose?: () => void;
  };

export const Banner = ({
  children,
  visible,
  defaultVisible = true,
  onClose,
  className,
  inset = false,
  variant = 'default',
  ...props
}: BannerProps) => {
  const [show, setShow] = useControllableState({
    defaultProp: defaultVisible,
    prop: visible,
    onChange: onClose,
  });

  if (!show) {
    return null;
  }

  return (
    <BannerContext.Provider
      value={{ show, setShow, variant: variant as BannerVariant }}
    >
      <div
        className={cn(bannerVariants({ variant, inset }), className)}
        {...props}
      >
        {children}
      </div>
    </BannerContext.Provider>
  );
};

type TablerIconComponent = ComponentType<IconProps>;

export type BannerIconProps = HTMLAttributes<HTMLDivElement> & {
  icon: TablerIconComponent;
};

export const BannerIcon = ({
  icon: Icon,
  className,
  ...props
}: BannerIconProps) => {
  const { variant } = useContext(BannerContext);

  return (
    <div
      className={cn(
        variant === 'neutral' && 'text-neutral-foreground',
        className
      )}
      {...props}
    >
      <Icon size={16} />
    </div>
  );
};

export type BannerTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const BannerTitle = ({ className, ...props }: BannerTitleProps) => (
  <p className={cn('text-sm tracking-tight', className)} {...props} />
);

export type BannerStatusProps = ComponentProps<typeof Badge>;

export const BannerStatus = ({
  outline = true,
  variant,
  className,
  ...props
}: BannerStatusProps) => {
  const { variant: bannerVariant } = useContext(BannerContext);

  const variantMap: Record<
    BannerVariant,
    'default' | 'warning' | 'error' | 'inProgress'
  > = {
    default: 'default',
    neutral: 'inProgress',
    destructive: 'error',
    warning: 'warning',
  };

  const badgeVariant = variant ?? variantMap[bannerVariant];

  return (
    <Badge
      outline={outline}
      variant={badgeVariant}
      className={cn('shrink-0', className)}
      {...props}
    />
  );
};

export type BannerActionsProps = HTMLAttributes<HTMLDivElement>;

export const BannerActions = ({ className, ...props }: BannerActionsProps) => (
  <div
    className={cn('flex items-center gap-2 shrink-0 ml-auto', className)}
    {...props}
  />
);

export type BannerActionProps = ComponentProps<typeof Button>;

export const BannerAction = ({
  variant = 'ghost',
  size = 'sm',
  className,
  ...props
}: BannerActionProps) => {
  const { variant: bannerVariant } = useContext(BannerContext);

  const hoverClasses: Record<BannerVariant, string> = {
    default: 'hover:bg-accent',
    neutral: 'hover:bg-neutral-hover',
    destructive: 'hover:bg-destructive-hover',
    warning: 'hover:bg-warning-hover',
  };

  return (
    <Button
      className={cn(
        'shrink-0 text-foreground',
        hoverClasses[bannerVariant],
        className
      )}
      size={size}
      variant={variant}
      {...props}
    />
  );
};

export type BannerCloseProps = ComponentProps<typeof Button>;

export const BannerClose = ({
  variant = 'ghost',
  size = 'icon-sm',
  onClick,
  className,
  ...props
}: BannerCloseProps) => {
  const { setShow } = useContext(BannerContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setShow(false);
    onClick?.(e);
  };

  return (
    <Button
      className={cn(
        'shrink-0 h-3.5 w-3.5 p-0 opacity-70 hover:opacity-100 text-foreground',
        className
      )}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    >
      <IconX size={14} />
    </Button>
  );
};
