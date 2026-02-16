import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconDots, IconSlash } from "@tabler/icons-react";
import type { ComponentProps } from "react";

import { buttonVariants } from "@/components/ui/aura/button/button";
import { cn } from "@/lib/utils";

function Breadcrumb({ ...props }: ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

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

function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(
        "inline-flex items-center text-muted-foreground text-sm tracking-tight",
        "has-[button[data-popup-open]]:bg-accent has-[button[data-popup-open]]:text-foreground has-[button[data-popup-open]]:rounded-sm",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbLink({ className, render, children, ...props }: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "transition-colors",
          className
        ),
      },
      { ...props, children }
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
}

function BreadcrumbPage({
  className,
  href,
  ...props
}: (ComponentProps<"span"> | ComponentProps<"a">) & { href?: string }) {
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

  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      tabIndex={-1}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "cursor-default hover:bg-transparent dark:hover:bg-transparent",
        "font-medium tracking-tight text-foreground",
        className
      )}
      {...(props as ComponentProps<"span">)}
    />
  );
}

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

function BreadcrumbEllipsis({ children, className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex items-center",
        "has-[button[data-popup-open]]:bg-accent has-[button[data-popup-open]]:text-foreground has-[button[data-popup-open]]:rounded-sm",
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
