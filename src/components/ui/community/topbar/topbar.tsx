import { Breadcrumb, Button } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ComponentProps,
  type ComponentRef,
  forwardRef,
} from 'react';

const Topbar: ForwardRefExoticComponent<
  Omit<ComponentProps<'div'>, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar"
        className={cn(
          'flex h-11 w-full items-center border-b bg-background px-3 py-2',
          className
        )}
        {...props}
      />
    );
  }
);
Topbar.displayName = 'Topbar';

const TopbarLeft: ForwardRefExoticComponent<
  Omit<ComponentProps<'div'>, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar-left"
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    );
  }
);
TopbarLeft.displayName = 'TopbarLeft';

const TopbarCenter: ForwardRefExoticComponent<
  Omit<ComponentProps<'div'>, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar-center"
        className={cn('flex flex-1 items-center justify-center', className)}
        {...props}
      />
    );
  }
);
TopbarCenter.displayName = 'TopbarCenter';

const TopbarRight: ForwardRefExoticComponent<
  Omit<ComponentProps<'div'>, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar-right"
        className={cn('flex items-center gap-2', className)}
        {...props}
      />
    );
  }
);
TopbarRight.displayName = 'TopbarRight';

const TopbarBreadcrumbs: ForwardRefExoticComponent<
  Omit<ComponentProps<typeof Breadcrumb>, 'ref'> &
    RefAttributes<ComponentRef<typeof Breadcrumb>>
> = forwardRef<
  ComponentRef<typeof Breadcrumb>,
  ComponentProps<typeof Breadcrumb>
>(({ className, ...props }, ref) => {
  return (
    <Breadcrumb
      ref={ref}
      data-slot="topbar-breadcrumbs"
      className={className}
      {...props}
    />
  );
});
TopbarBreadcrumbs.displayName = 'TopbarBreadcrumbs';

const TopbarAction: ForwardRefExoticComponent<
  Omit<ComponentProps<typeof Button>, 'ref'> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        data-slot="topbar-action"
        className={className}
        {...props}
      />
    );
  }
);
TopbarAction.displayName = 'TopbarAction';

export {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
  TopbarAction,
};
