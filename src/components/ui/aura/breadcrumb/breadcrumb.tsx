import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { IconDots, IconSlash } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

import { cn } from '../../../../lib/utils';

import { buttonVariants } from '@/components/ui/aura/button/button';

/**
 * Root container for breadcrumb navigation.
 * Renders a semantic `<nav>` element with aria-label="breadcrumb".
 *
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */
function Breadcrumb({ ...props }: ComponentProps<'nav'>) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * Ordered list container for breadcrumb items.
 * Must be a direct child of `Breadcrumb`.
 */
function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center text-sm tracking-tight wrap-break-word',
        className
      )}
      {...props}
    />
  );
}

/**
 * Individual breadcrumb item container.
 * Wraps a single breadcrumb link or page. Use between `BreadcrumbSeparator` components.
 */
function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        'inline-flex items-center text-muted-foreground text-sm tracking-tight',
        'has-[button[data-popup-open]]:bg-accent has-[button[data-popup-open]]:text-foreground has-[button[data-popup-open]]:rounded-sm',
        className
      )}
      {...props}
    />
  );
}

/**
 * Clickable link for navigable breadcrumb items.
 * Use for all items except the current page.
 *
 * @example
 * <BreadcrumbItem>
 *   <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
 * </BreadcrumbItem>
 */
function BreadcrumbLink({
  className,
  render,
  children,
  ...props
}: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn(
          buttonVariants({ variant: 'ghost', size: 'sm' }),
          'transition-colors',
          className
        ),
      },
      { ...props, children }
    ),
    render,
    state: {
      slot: 'breadcrumb-link',
    },
  });
}

/**
 * Non-interactive indicator for the current page.
 * Automatically includes aria-current="page" for accessibility.
 *
 * @param {string} [href] - Optional href to make the current page clickable (e.g., for refreshing)
 *
 * @example
 * // Non-interactive current page
 * <BreadcrumbItem>
 *   <BreadcrumbPage>Settings</BreadcrumbPage>
 * </BreadcrumbItem>
 *
 * @example
 * // Interactive current page (clickable)
 * <BreadcrumbItem>
 *   <BreadcrumbPage href="/settings">Settings</BreadcrumbPage>
 * </BreadcrumbItem>
 */
function BreadcrumbPage({
  className,
  href,
  ...props
}: (ComponentProps<'span'> | ComponentProps<'a'>) & { href?: string }) {
  // If href is provided, render as a link with aria-current
  if (href) {
    return (
      <BreadcrumbLink
        href={href}
        aria-current="page"
        className={cn('font-medium tracking-tight text-foreground', className)}
        {...(props as ComponentProps<'a'>)}
      />
    );
  }

  // Otherwise, render as non-interactive span
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      tabIndex={-1}
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        // Override interactive styles to be non-interactive
        'cursor-default hover:bg-transparent dark:hover:bg-transparent',
        'font-medium tracking-tight text-foreground',
        className
      )}
      {...(props as ComponentProps<'span'>)}
    />
  );
}

/**
 * Button for the current page when it needs to be interactive (e.g., in a dropdown).
 * Automatically includes aria-current="page" and proper button styling.
 * **Must be used with DropdownMenuTrigger's render prop.**
 *
 * @example
 * <BreadcrumbItem>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger render={<BreadcrumbPageButton>Actions</BreadcrumbPageButton>} />
 *     <DropdownMenuContent>
 *       <DropdownMenuItem>Rename</DropdownMenuItem>
 *       <DropdownMenuItem>Delete</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbItem>
 */
function BreadcrumbPageButton({
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      data-slot="breadcrumb-page-button"
      type="button"
      aria-current="page"
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

/**
 * Button for ellipsis dropdowns showing hidden navigation items.
 * Automatically includes dots icon and "More" screen reader text.
 * **Must be used with DropdownMenuTrigger's render prop inside BreadcrumbEllipsis.**
 *
 * @example
 * <BreadcrumbEllipsis>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger render={<BreadcrumbEllipsisButton />} />
 *     <DropdownMenuContent>
 *       <DropdownMenuItem render={<a href="/projects">Projects</a>} />
 *       <DropdownMenuItem render={<a href="/teams">Teams</a>} />
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbEllipsis>
 */
function BreadcrumbEllipsisButton({
  className,
  children,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      data-slot="breadcrumb-ellipsis-button"
      type="button"
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'flex items-center gap-1',
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <IconDots className="size-3" />
          <span className="sr-only">More</span>
        </>
      )}
    </button>
  );
}

/**
 * Visual separator between breadcrumb items.
 * Defaults to a slash icon but accepts custom content.
 *
 * @example
 * // Default slash separator
 * <BreadcrumbSeparator />
 *
 * @example
 * // Custom chevron separator
 * <BreadcrumbSeparator>
 *   <IconChevronRight className="size-4" />
 * </BreadcrumbSeparator>
 */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <IconSlash className="size-3 text-muted-foreground" />}
    </li>
  );
}

/**
 * Container for ellipsis indicator showing collapsed navigation items.
 * Can be used statically (default) or with a dropdown menu to reveal hidden items.
 *
 * @example
 * // Static ellipsis (non-interactive)
 * <BreadcrumbEllipsis />
 *
 * @example
 * // Interactive ellipsis with dropdown
 * <BreadcrumbEllipsis>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger render={<BreadcrumbEllipsisButton />} />
 *     <DropdownMenuContent>
 *       <DropdownMenuItem render={<a href="/projects">Projects</a>} />
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbEllipsis>
 */
function BreadcrumbEllipsis({
  children,
  className,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        'inline-flex items-center',
        'has-[button[data-popup-open]]:bg-accent has-[button[data-popup-open]]:text-foreground has-[button[data-popup-open]]:rounded-sm',
        className
      )}
      {...props}
    >
      {children ?? (
        <span
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'flex items-center gap-1 cursor-default hover:bg-transparent dark:hover:bg-transparent'
          )}
        >
          <IconDots className="size-3" />
          <span className="sr-only">More</span>
        </span>
      )}
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbPageButton,
  BreadcrumbEllipsisButton,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
