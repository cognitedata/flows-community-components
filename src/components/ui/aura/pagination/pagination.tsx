import { forwardRef, type ComponentProps } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";

import { Button } from "@/components/ui/aura/button";
import { cn } from "@/lib/utils";

type PaginationSize = "default" | "small";

const paginationLinkVariants = cva("text-base font-normal leading-5 tracking-tightest", {
  variants: {
    size: {
      default: "",
      small: "text-sm leading-4.5 tracking-tight",
    },
    active: {
      true: "bg-toggled text-toggled-foreground hover:bg-toggled-hover hover:text-toggled-foreground",
      false: "",
    },
  },
  defaultVariants: {
    size: "default",
    active: false,
  },
});

const paginationEllipsisVariants = cva("flex items-center justify-center", {
  variants: {
    size: {
      default: "h-9 w-9",
      small: "h-7 w-7",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const getPaginationButtonStyles = (size: PaginationSize = "default") => {
  const buttonSize = size === "small" ? "icon-sm" : "icon";
  const radiusClass = size === "small" ? "rounded" : "rounded-md";

  return { buttonSize, radiusClass } as const;
};

/**
 * Pagination navigation container.
 */
const Pagination = forwardRef<HTMLElement, ComponentProps<"nav">>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
      />
    );
  }
);
Pagination.displayName = "Pagination";

/**
 * Pagination list container.
 */
const PaginationContent = forwardRef<
  HTMLUListElement,
  ComponentProps<"ul"> & { size?: PaginationSize }
>(({ className, size = "default", ...props }, ref) => {
  return (
    <ul
      ref={ref}
      data-slot="pagination-content"
      data-size={size}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
});
PaginationContent.displayName = "PaginationContent";

/**
 * Pagination list item wrapper.
 */
const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-slot="pagination-item"
        className={cn(className)}
        {...props}
      />
    );
  }
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: PaginationSize;
} & ComponentProps<"a">;

/**
 * Pagination link button for page selection.
 */
const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = "default", ...props }, ref) => {
    const { buttonSize, radiusClass } = getPaginationButtonStyles(size);

    return (
      <Button
        asChild
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-link"
        data-active={isActive}
        className={cn(
          radiusClass,
          paginationLinkVariants({ size, active: isActive }),
          className
        )}
      >
        <a ref={ref} aria-current={isActive ? "page" : undefined} {...props} />
      </Button>
    );
  }
);
PaginationLink.displayName = "PaginationLink";

/**
 * Pagination control to jump to the first page.
 */
function PaginationFirst({
  className,
  size = "default",
  ...props
}: Omit<PaginationLinkProps, "isActive">) {
  const { buttonSize, radiusClass } = getPaginationButtonStyles(size);

  return (
    <Button
      asChild
      variant="ghost"
      size={buttonSize}
      data-slot="pagination-first"
      className={cn(radiusClass, className)}
    >
      <a aria-label="Go to first page" {...props}>
        <IconChevronsLeft />
      </a>
    </Button>
  );
}

/**
 * Pagination control to navigate to the previous page.
 */
function PaginationPrevious({
  className,
  size = "default",
  ...props
}: Omit<PaginationLinkProps, "isActive">) {
  const { buttonSize, radiusClass } = getPaginationButtonStyles(size);

  return (
    <Button
      asChild
      variant="ghost"
      size={buttonSize}
      data-slot="pagination-previous"
      className={cn(radiusClass, className)}
    >
      <a aria-label="Go to previous page" {...props}>
        <IconChevronLeft />
      </a>
    </Button>
  );
}

/**
 * Pagination control to navigate to the next page.
 */
function PaginationNext({
  className,
  size = "default",
  ...props
}: Omit<PaginationLinkProps, "isActive">) {
  const { buttonSize, radiusClass } = getPaginationButtonStyles(size);

  return (
    <Button
      asChild
      variant="ghost"
      size={buttonSize}
      data-slot="pagination-next"
      className={cn(radiusClass, className)}
    >
      <a aria-label="Go to next page" {...props}>
        <IconChevronRight />
      </a>
    </Button>
  );
}

/**
 * Pagination control to jump to the last page.
 */
function PaginationLast({
  className,
  size = "default",
  ...props
}: Omit<PaginationLinkProps, "isActive">) {
  const { buttonSize, radiusClass } = getPaginationButtonStyles(size);

  return (
    <Button
      asChild
      variant="ghost"
      size={buttonSize}
      data-slot="pagination-last"
      className={cn(radiusClass, className)}
    >
      <a aria-label="Go to last page" {...props}>
        <IconChevronsRight />
      </a>
    </Button>
  );
}

/**
 * Pagination ellipsis indicator for truncated page ranges.
 */
const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & { size?: PaginationSize }
>(({ className, size = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsisVariants({ size }), className)}
      {...props}
    >
      <IconDots className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
});
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  paginationEllipsisVariants,
  paginationLinkVariants,
};

