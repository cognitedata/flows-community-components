import { IconX } from '@tabler/icons-react';
import { type VariantProps, cva } from 'class-variance-authority';
import {
  type ComponentProps,
  type ComponentRef,
  type MouseEventHandler,
  createContext,
  forwardRef,
  useContext,
} from 'react';

import { useControllableState } from '../../../../lib/use-controllable-state';
import { cn } from '../../../../lib/utils';
import { Button } from '../button';

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
  'relative w-full rounded-md pt-2.5 pr-3 has-[>button[data-slot=alert-close]]:pr-12 pb-2 pl-3 text-sm grid has-[>svg]:grid-cols-[auto_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-2 has-[>svg]:gap-y-1 items-start [&>svg]:size-4 [&>svg]:translate-y-0.65 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-undefined-alternative text-card-foreground [&>svg]:text-undefined-foreground',
        secondary:
          'bg-neutral-alternative text-foreground [&>svg]:text-neutral-foreground',
        warning: 'bg-warning-alternative [&>svg]:text-warning-foreground',
        error:
          'bg-destructive-alternative text-foreground [&>svg]:text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type AlertProps = ComponentProps<'div'> &
  Omit<VariantProps<typeof alertVariants>, 'variant'> & {
    variant?: AlertVariant;
    visible?: boolean;
    defaultVisible?: boolean;
    onClose?: () => void;
  };

const Alert = forwardRef<ComponentRef<'div'>, AlertProps>(
  (
    {
      className,
      variant = 'default',
      visible,
      defaultVisible = true,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useControllableState({
      defaultProp: defaultVisible,
      prop: visible,
      onChange: onClose,
    });
    const alertVariant = variant ?? 'default';

    if (!show) {
      return null;
    }

    return (
      <AlertContext.Provider value={{ show, setShow, variant: alertVariant }}>
        <div
          ref={ref}
          data-slot="alert"
          role="alert"
          className={cn(alertVariants({ variant: alertVariant }), className)}
          {...props}
        >
          {onClose && <AlertClose />}
          {children}
        </div>
      </AlertContext.Provider>
    );
  }
);
Alert.displayName = 'Alert';

const alertTitleVariants: Record<AlertVariant, string> = {
  default: 'text-undefined-foreground',
  secondary: 'text-neutral-foreground',
  warning: 'text-warning-foreground',
  error: 'text-destructive-foreground',
};

const AlertTitle = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    const { variant } = useContext(AlertContext);
    return (
      <div
        ref={ref}
        data-slot="alert-title"
        className={cn(
          'text-base font-medium leading-5 tracking-tightest',
          alertTitleVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
AlertTitle.displayName = 'AlertTitle';

const alertDescriptionVariants: Record<AlertVariant, string> = {
  default: 'text-card-foreground',
  secondary: 'text-foreground',
  warning: 'text-card-foreground',
  error: 'text-foreground',
};

const AlertDescription = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    const { variant } = useContext(AlertContext);
    return (
      <div
        ref={ref}
        data-slot="alert-description"
        className={cn(
          'col-start-2 grid justify-items-start gap-1 text-sm font-normal leading-4.5 tracking-tight items-center',
          alertDescriptionVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
AlertDescription.displayName = 'AlertDescription';

const AlertActions = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-actions"
      className={cn(
        'col-start-2 flex flex-wrap items-start gap-2 pt-1',
        className
      )}
      {...props}
    />
  )
);
AlertActions.displayName = 'AlertActions';

const AlertButton = forwardRef<
  ComponentRef<'button'>,
  ComponentProps<'button'>
>(({ className, ...props }, ref) => {
  const { variant } = useContext(AlertContext);

  const hoverClasses: Record<AlertVariant, string> = {
    default: 'hover:bg-undefined-hover',
    secondary: 'hover:bg-neutral-hover',
    warning: 'hover:bg-warning-hover',
    error: 'hover:bg-destructive-hover',
  };

  return (
    <Button
      ref={ref}
      data-slot="alert-button"
      variant="ghost"
      size="sm"
      className={cn('text-foreground', hoverClasses[variant], className)}
      {...props}
    />
  );
});
AlertButton.displayName = 'AlertButton';

const AlertClose = forwardRef<ComponentRef<'button'>, ComponentProps<'button'>>(
  ({ className, onClick, ...props }, ref) => {
    const { setShow } = useContext(AlertContext);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      setShow(false);
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
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
);
AlertClose.displayName = 'AlertClose';

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions,
  AlertButton,
  AlertClose,
};
