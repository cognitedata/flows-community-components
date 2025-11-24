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
import { Button } from '@/components/ui/cognite/button';
import { Badge } from '@/components/ui/cognite/badge';
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

export type BannerProps = HTMLAttributes<HTMLDivElement> & {
  visible?: boolean;
  defaultVisible?: boolean;
  onClose?: () => void;
  inset?: boolean;
  variant?: BannerVariant;
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

  const variantClasses: Record<BannerVariant, string> = {
    default: 'bg-mountain text-foreground',
    neutral: 'bg-neutral text-foreground',
    destructive: 'bg-destructive text-foreground',
    warning: 'bg-warning text-foreground',
  };

  return (
    <BannerContext.Provider value={{ show, setShow, variant }}>
      <div
        className={cn(
          'flex w-full min-h-[44px] items-center gap-2 px-3.5 py-2',
          variantClasses[variant],
          inset && 'rounded-lg',
          className
        )}
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
  variant = 'outline',
  size = 'sm',
  className,
  ...props
}: BannerActionProps) => (
  <Button
    className={cn(
      'shrink-0 bg-transparent hover:bg-background/10 hover:text-background',
      className
    )}
    size={size}
    variant={variant}
    {...props}
  />
);

export type BannerCloseProps = ComponentProps<typeof Button>;

export const BannerClose = ({
  variant = 'ghost',
  size = 'icon',
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
        'shrink-0 bg-transparent hover:bg-background/10 hover:text-background',
        className
      )}
      onClick={handleClick}
      size={size}
      variant={variant}
      {...props}
    >
      <IconX size={18} />
    </Button>
  );
};
