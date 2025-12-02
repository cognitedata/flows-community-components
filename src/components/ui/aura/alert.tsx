'use client';

import * as React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { cva, type VariantProps } from 'class-variance-authority';
import { IconX } from '@tabler/icons-react';
import type { MouseEventHandler } from 'react';

import { cn } from '@/common/utils';
import { Button } from '#aura/button';

type AlertContextProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const AlertContext = React.createContext<AlertContextProps>({
  show: true,
  setShow: () => {},
});

const alertVariants = cva(
  'relative w-full max-w-[var(--alert-max-width)] rounded-md border pt-2 pr-3 pb-2 pl-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-2 gap-0.70 items-center [&>svg]:size-4 [&>svg]:translate-y-0.65 [&>svg]:text-current',
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

type AlertProps = React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants> & {
    visible?: boolean;
    defaultVisible?: boolean;
    onClose?: () => void;
  };

function Alert({
  className,
  variant,
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
    <AlertContext.Provider value={{ show, setShow }}>
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

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
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

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-card-foreground col-start-2 grid justify-items-start gap-1 text-sm font-normal leading-[18px] tracking-tight min-h-7 items-center',
        className
      )}
      {...props}
    />
  );
}

function AlertButton({ className, ...props }: React.ComponentProps<'button'>) {
  return (
    <div className="col-start-2 grid justify-items-start gap-1 w-auto">
      <Button
        data-slot="alert-button"
        variant="ghost"
        className={cn('!px-0 text-foreground', className)}
        {...props}
      />
    </div>
  );
}

function AlertClose({
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const { setShow } = React.useContext(AlertContext);

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
      <IconX className="h-3.5 w-3.5" />
      <span className="sr-only">Close</span>
    </Button>
  );
}

export { Alert, AlertTitle, AlertDescription, AlertButton, AlertClose };
