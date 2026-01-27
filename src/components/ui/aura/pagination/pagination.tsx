import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import { type ComponentProps, createContext, forwardRef, useContext } from "react";

import { Button } from "@/components/ui/aura/button";
import { cn } from "@/lib/utils";

type PaginationSize = "default" | "small";

const PaginationSizeContext = createContext<PaginationSize>("default");

const usePaginationSize = () => useContext(PaginationSizeContext);

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

const paginationStatusVariants = cva("px-4 text-sm text-muted-foreground", {
  variants: {
    size: {
      default: "",
      small: "px-3",
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
    <PaginationSizeContext.Provider value={size}>
      <ul
        ref={ref}
        data-slot="pagination-content"
        data-size={size}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
      />
    </PaginationSizeContext.Provider>
  );
});
PaginationContent.displayName = "PaginationContent";

/**
 * Pagination list item wrapper.
 */
const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return <li ref={ref} data-slot="pagination-item" className={cn(className)} {...props} />;
  }
);
PaginationItem.displayName = "PaginationItem";

/**
 * Pagination status text (e.g. "Page 3 of 10").
 */
const PaginationStatus = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & { size?: PaginationSize }
>(({ className, size, ...props }, ref) => {
  const inheritedSize = usePaginationSize();
  const resolvedSize = size ?? inheritedSize;

  return (
    <span
      ref={ref}
      data-slot="pagination-status"
      className={cn(paginationStatusVariants({ size: resolvedSize }), className)}
      {...props}
    />
  );
});
PaginationStatus.displayName = "PaginationStatus";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: PaginationSize;
} & ComponentProps<"a">;

/**
 * Pagination link button for page selection.
 */
const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const { buttonSize, radiusClass } = getPaginationButtonStyles(resolvedSize);

    return (
      <Button
        asChild
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-link"
        data-active={isActive}
        className={cn(
          radiusClass,
          paginationLinkVariants({ size: resolvedSize, active: isActive }),
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
const PaginationFirst = forwardRef<HTMLAnchorElement, Omit<PaginationLinkProps, "isActive">>(
  ({ className, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const { buttonSize, radiusClass } = getPaginationButtonStyles(resolvedSize);

    return (
      <Button
        asChild
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-first"
        className={cn(radiusClass, className)}
      >
        <a ref={ref} aria-label="Go to first page" {...props}>
          <IconChevronsLeft />
        </a>
      </Button>
    );
  }
);
PaginationFirst.displayName = "PaginationFirst";

/**
 * Pagination control to navigate to the previous page.
 */
const PaginationPrevious = forwardRef<HTMLAnchorElement, Omit<PaginationLinkProps, "isActive">>(
  ({ className, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const { buttonSize, radiusClass } = getPaginationButtonStyles(resolvedSize);

    return (
      <Button
        asChild
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-previous"
        className={cn(radiusClass, className)}
      >
        <a ref={ref} aria-label="Go to previous page" {...props}>
          <IconChevronLeft />
        </a>
      </Button>
    );
  }
);
PaginationPrevious.displayName = "PaginationPrevious";

/**
 * Pagination control to navigate to the next page.
 */
const PaginationNext = forwardRef<HTMLAnchorElement, Omit<PaginationLinkProps, "isActive">>(
  ({ className, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const { buttonSize, radiusClass } = getPaginationButtonStyles(resolvedSize);

    return (
      <Button
        asChild
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-next"
        className={cn(radiusClass, className)}
      >
        <a ref={ref} aria-label="Go to next page" {...props}>
          <IconChevronRight />
        </a>
      </Button>
    );
  }
);
PaginationNext.displayName = "PaginationNext";

/**
 * Pagination control to jump to the last page.
 */
const PaginationLast = forwardRef<HTMLAnchorElement, Omit<PaginationLinkProps, "isActive">>(
  ({ className, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const { buttonSize, radiusClass } = getPaginationButtonStyles(resolvedSize);

    return (
      <Button
        asChild
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-last"
        className={cn(radiusClass, className)}
      >
        <a ref={ref} aria-label="Go to last page" {...props}>
          <IconChevronsRight />
        </a>
      </Button>
    );
  }
);
PaginationLast.displayName = "PaginationLast";

/**
 * Pagination ellipsis indicator for truncated page ranges.
 */
const PaginationEllipsis = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & { size?: PaginationSize }
>(({ className, size, ...props }, ref) => {
  const inheritedSize = usePaginationSize();
  const resolvedSize = size ?? inheritedSize;

  return (
    <span
      ref={ref}
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsisVariants({ size: resolvedSize }), className)}
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
  PaginationStatus,
  paginationEllipsisVariants,
  paginationLinkVariants,
  paginationStatusVariants,
};
