import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
} from 'react';

import { cn } from '../../../../lib/utils';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type ListType = 'ul' | 'ol' | 'dl';
type ListProps = ComponentPropsWithoutRef<'ul'> & { type?: ListType };

const List = ({ className, type = 'ul', ...props }: ListProps) => {
  if (type === 'ol') {
    return (
      <ol
        data-slot="list-ordered"
        className={cn('flex flex-col gap-3', className)}
        {...props}
      />
    );
  }

  if (type === 'dl') {
    return (
      <dl
        data-slot="list-description"
        className={cn(
          'flex flex-col [&>dt]:mb-0.5 [&>dd]:mb-2.5 [&>dd:last-child]:mb-0',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <ul
      data-slot="list"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
};

const ListDescriptionTerm = forwardRef<HTMLElement, ComponentProps<'dt'>>(
  ({ className, ...props }, ref) => (
    <dt
      ref={ref}
      data-slot="list-description-term"
      className={cn('text-sm font-medium leading-4.5', className)}
      {...props}
    />
  )
);
ListDescriptionTerm.displayName = 'ListDescriptionTerm';

const ListDescriptionDescription = forwardRef<
  HTMLElement,
  ComponentProps<'dd'>
>(({ className, ...props }, ref) => (
  <dd
    ref={ref}
    data-slot="list-description-description"
    className={cn('text-sm leading-4.5 text-muted-foreground', className)}
    {...props}
  />
));
ListDescriptionDescription.displayName = 'ListDescriptionDescription';

const ListItem = forwardRef<HTMLLIElement, ComponentProps<'li'>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-slot="list-item"
      className={cn(
        'grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2 gap-y-1',
        '[&>*]:col-span-2',
        '[&>[data-slot="list-item-icon"]]:col-span-1 [&>[data-slot="list-item-icon"]]:col-start-1 [&>[data-slot="list-item-icon"]]:row-span-2 [&>[data-slot="list-item-icon"]]:self-start',
        '[&>:not([data-slot="list-item-icon"])]:col-span-1 [&>:not([data-slot="list-item-icon"])]:col-start-2',
        className
      )}
      {...props}
    />
  )
);
ListItem.displayName = 'ListItem';

type ListItemIconProps = Omit<ComponentProps<'span'>, 'children'> & {
  children: ReactNode;
};

const ListItemIcon = forwardRef<HTMLSpanElement, ListItemIconProps>(
  ({ className, children, ...props }, ref) => {
    const decorative = !props['aria-label'] && !props['aria-labelledby'];

    return (
      <span
        ref={ref}
        data-slot="list-item-icon"
        aria-hidden={decorative ? true : undefined}
        className={cn(
          'inline-flex h-4 w-4 mt-0.25 items-center justify-center text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
ListItemIcon.displayName = 'ListItemIcon';

const ListHeading = forwardRef<
  HTMLHeadingElement,
  ComponentProps<'h3'> & { as?: HeadingElement }
>(({ className, as: Tag = 'h3', ...props }, ref) => (
  <Tag
    ref={ref}
    data-slot="list-heading"
    className={cn(
      '[&+*[data-slot^="list"]]:mt-3 pb-2 text-base font-medium leading-5 tracking-tighter text-card-foreground',
      className
    )}
    {...props}
  />
));
ListHeading.displayName = 'ListHeading';

export {
  List,
  ListDescriptionDescription,
  ListDescriptionTerm,
  ListHeading,
  ListItem,
  ListItemIcon,
};
