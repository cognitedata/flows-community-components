import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';
import type { VariantProps } from 'class-variance-authority';

import { cn } from '../../../../lib/utils';
import { toggleVariants } from '../toggle';

function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={cn('flex items-center p-1 gap-1 rounded-lg border shadow-md')}
      {...props}
    />
  );
}

function ToolbarButton({
  className,
  variant,
  size,
  ...props
}: ToolbarPrimitive.Button.Props & VariantProps<typeof toggleVariants>) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={cn('h-4 w-px bg-border', className)}
      {...props}
    />
  );
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
}

export { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarGroup };
