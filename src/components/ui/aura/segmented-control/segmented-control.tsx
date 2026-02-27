import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';

import { cn } from '../../../../lib/utils';

function SegmentedControl({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="segmented-control"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function SegmentedControlList({
  className,
  ...props
}: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="segmented-control-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-0.75',
        className
      )}
      {...props}
    />
  );
}

function SegmentedControlButton({
  className,
  ...props
}: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="segmented-control-trigger"
      className={cn(
        "data-active:bg-background dark:data-active:text-foreground focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:outline-ring dark:data-active:border-input dark:data-active:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring focus-visible:outline-1 data-disabled:pointer-events-none data-disabled:opacity-50 data-active:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function SegmentedControlContent({
  className,
  ...props
}: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="segmented-control-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export {
  SegmentedControl,
  SegmentedControlList,
  SegmentedControlButton,
  SegmentedControlContent,
};
