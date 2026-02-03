import { Slot } from "@radix-ui/react-slot";
import { IconDots, IconSlash } from "@tabler/icons-react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@cognite/aura/button/button";

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
function Breadcrumb({ ...props }: ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

/**
 * Ordered list container for breadcrumb items.
 * Must be a direct child of `Breadcrumb`.
 */
function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center text-sm tracking-tight wrap-break-word",
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
function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        "inline-flex items-center text-muted-foreground text-sm tracking-tight",
        "has-[button[data-state=open]]:bg-accent has-[button[data-state=open]]:text-foreground has-[button[data-state=open]]:rounded-sm",
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
  asChild,
  className,
  ...props
}: ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "transition-colors",
        className
      )}
      {...props}
    />
  );
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
}: (ComponentProps<"span"> | ComponentProps<"a">) & { href?: string }) {
  // If href is provided, render as a link with aria-current
  if (href) {
    return (
      <BreadcrumbLink
        href={href}
        aria-current="page"
        className={cn("font-medium tracking-tight text-foreground", className)}
        {...(props as ComponentProps<"a">)}
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
        buttonVariants({ variant: "ghost", size: "sm" }),
        // Override interactive styles to be non-interactive
        "cursor-default hover:bg-transparent dark:hover:bg-transparent",
        "font-medium tracking-tight text-foreground",
        className
      )}
      {...(props as ComponentProps<"span">)}
    />
  );
}

/**
 * Button for the current page when it needs to be interactive (e.g., in a dropdown).
 * Automatically includes aria-current="page" and proper button styling.
 * **Must be used with DropdownMenuTrigger's asChild prop.**
 *
 * @example
 * <BreadcrumbItem>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild>
 *       <BreadcrumbPageButton>Actions</BreadcrumbPageButton>
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem>Rename</DropdownMenuItem>
 *       <DropdownMenuItem>Delete</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbItem>
 */
function BreadcrumbPageButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="breadcrumb-page-button"
      type="button"
      aria-current="page"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "font-medium tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

/**
 * Button for ellipsis dropdowns showing hidden navigation items.
 * Automatically includes dots icon and "More" screen reader text.
 * **Must be used with DropdownMenuTrigger's asChild prop inside BreadcrumbEllipsis.**
 *
 * @example
 * <BreadcrumbEllipsis>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild>
 *       <BreadcrumbEllipsisButton />
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem asChild>
 *         <a href="/projects">Projects</a>
 *       </DropdownMenuItem>
 *       <DropdownMenuItem asChild>
 *         <a href="/teams">Teams</a>
 *       </DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbEllipsis>
 */
function BreadcrumbEllipsisButton({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <button
      data-slot="breadcrumb-ellipsis-button"
      type="button"
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "flex items-center gap-1",
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
function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
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
 *     <DropdownMenuTrigger asChild>
 *       <BreadcrumbEllipsisButton />
 *     </DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem asChild>
 *         <a href="/projects">Projects</a>
 *       </DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 * </BreadcrumbEllipsis>
 */
function BreadcrumbEllipsis({ children, className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex items-center",
        "has-[button[data-state=open]]:bg-accent has-[button[data-state=open]]:text-foreground has-[button[data-state=open]]:rounded-sm",
        className
      )}
      {...props}
    >
      {children ?? (
        <span
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "flex items-center gap-1 cursor-default hover:bg-transparent dark:hover:bg-transparent"
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
