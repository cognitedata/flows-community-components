import type {
  ToolbarButtonProps,
  ToolbarGroupProps,
  ToolbarRootProps,
  ToolbarSeparatorProps,
} from '@base-ui/react/toolbar';
import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import { buttonVariants } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { VariantProps } from 'class-variance-authority';
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ComponentRef,
  forwardRef,
} from 'react';

const Toolbar: ForwardRefExoticComponent<
  Omit<ToolbarRootProps, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Root>,
  ToolbarPrimitive.Root.Props
>(({ orientation, className, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Root
      ref={ref}
      data-slot="toolbar"
      className={cn(
        'flex items-center justify-start p-1 gap-1 rounded-lg border shadow-md data-[orientation=vertical]:flex-col data-[orientation=horizontal]:flex-row',
        className
      )}
      orientation={orientation}
      {...props}
    />
  );
});

const ToolbarButton: ForwardRefExoticComponent<
  Omit<ToolbarButtonProps & VariantProps<typeof buttonVariants>, 'ref'> &
    RefAttributes<HTMLButtonElement>
> = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Button>,
  ToolbarPrimitive.Button.Props & VariantProps<typeof buttonVariants>
>(({ className, variant = 'ghost', size, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Button
      ref={ref}
      data-slot="toolbar-button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

const ToolbarSeparator: ForwardRefExoticComponent<
  Omit<ToolbarSeparatorProps, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Separator>,
  ToolbarPrimitive.Separator.Props
>(({ className, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Separator
      ref={ref}
      data-slot="toolbar-separator"
      className={cn(
        'bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-4 data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  );
});

const ToolbarGroup: ForwardRefExoticComponent<
  Omit<ToolbarGroupProps, 'ref'> & RefAttributes<HTMLDivElement>
> = forwardRef<
  ComponentRef<typeof ToolbarPrimitive.Group>,
  ToolbarPrimitive.Group.Props
>(({ className, ...props }, ref) => {
  return (
    <ToolbarPrimitive.Group
      ref={ref}
      data-slot="toolbar-group"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
});

Toolbar.displayName = 'Toolbar';
ToolbarButton.displayName = 'ToolbarButton';
ToolbarSeparator.displayName = 'ToolbarSeparator';
ToolbarGroup.displayName = 'ToolbarGroup';

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup };
