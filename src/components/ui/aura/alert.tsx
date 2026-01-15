'use client';

import { createContext, useContext, type ComponentProps } from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconX } from '@tabler/icons-react';
import type { MouseEventHandler } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/aura/button';

type AlertVariant = 'default' | 'secondary' | 'warning' | 'error';

type AlertContextProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  variant: AlertVariant;
};

const AlertContext = createContext<AlertContextProps>({
  show: true,
  setShow: () => {},
  variant: 'default',
});

const alertVariants = cva(
  'relative w-full rounded-md border pt-2.5 pr-3 has-[>button[data-slot=alert-close]]:pr-12 pb-2 pl-3 text-sm grid has-[>svg]:grid-cols-[var(--alert-icon-width)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-2 has-[>svg]:gap-y-1 items-start [&>svg]:size-4 [&>svg]:translate-y-0.65 [&>svg]:text-current',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground border-card',
        secondary: 'bg-neutral text-neutral-foreground border-neutral',
        warning: 'bg-warning text-warning-foreground border-warning',
        error: 'bg-destructive text-destructive-foreground border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type AlertProps = ComponentProps<'div'> &
  VariantProps<typeof alertVariants> & {
    visible?: boolean;
    defaultVisible?: boolean;
    onClose?: () => void;
  };

function Alert({
  className,
  variant = 'default',
  visible,
  defaultVisible = true,
  onClose,
  children,
  ...props
}: AlertProps) {
  const [show, setShow] = useControllableState({
    defaultProp: defaultVisible,
    prop: visible,
    onChange: onClose,
  });

  if (!show) {
    return null;
  }

  return (
    <AlertContext.Provider
      value={{ show, setShow, variant: variant as AlertVariant }}
    >
      <div
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {onClose && <AlertClose />}
        {children}
      </div>
    </AlertContext.Provider>
  );
}

function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'text-base font-medium leading-5 tracking-tightest',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-card-foreground col-start-2 grid justify-items-start gap-1 text-sm font-normal leading-4.5 tracking-tight items-center',
        className
      )}
      {...props}
    />
  );
}

function AlertActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-actions"
      className={cn(
        'col-start-2 flex flex-wrap items-start gap-2 pt-1',
        className
      )}
      {...props}
    />
  );
}

function AlertButton({ className, ...props }: ComponentProps<'button'>) {
  const { variant } = useContext(AlertContext);

  const hoverClasses: Record<AlertVariant, string> = {
    default: 'hover:bg-undefined-hover',
    secondary: 'hover:bg-neutral-hover',
    warning: 'hover:bg-warning-hover',
    error: 'hover:bg-destructive-hover',
  };

  return (
    <Button
      data-slot="alert-button"
      variant="ghost"
      size="sm"
      className={cn('text-foreground', hoverClasses[variant], className)}
      {...props}
    />
  );
}

function AlertClose({
  className,
  onClick,
  ...props
}: ComponentProps<'button'>) {
  const { setShow } = useContext(AlertContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setShow(false);
    onClick?.(e);
  };

  return (
    <Button
      data-slot="alert-close"
      variant="ghost"
      size="icon-sm"
      className={cn(
        'absolute top-3 right-4 h-3.5 w-3.5 p-0 opacity-70 hover:opacity-100 text-foreground',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <IconX size={14} />
      <span className="sr-only">Close</span>
    </Button>
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertButton,
  AlertClose,
};
