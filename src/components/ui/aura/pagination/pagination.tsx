import {
  type ComponentProps,
  type ElementRef,
  type KeyboardEvent,
  createContext,
  forwardRef,
  useContext,
  useState,
} from "react";

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDots,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";

import { Button } from "@/components/ui/aura/button/button";
import { Input } from "@/components/ui/aura/input/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/aura/select/select";
import { cn } from "../../../../lib/utils";

type PaginationSize = "default" | "small";

const PaginationSizeContext = createContext<PaginationSize>("default");

const usePaginationSize = () => useContext(PaginationSizeContext);

const paginationLinkVariants = cva("text-base font-medium leading-5 tracking-tightest", {
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
  HTMLOutputElement,
  ComponentProps<"output"> & { size?: PaginationSize }
>(({ className, size, ...props }, ref) => {
  const inheritedSize = usePaginationSize();
  const resolvedSize = size ?? inheritedSize;

  return (
    <output
      ref={ref}
      data-slot="pagination-status"
      className={cn(paginationStatusVariants({ size: resolvedSize }), className)}
      {...props}
    />
  );
});
PaginationStatus.displayName = "PaginationStatus";

/**
 * Pagination-aware select trigger that inherits pagination size.
 */
const PaginationSelectTrigger = forwardRef<
  ElementRef<typeof SelectTrigger>,
  ComponentProps<typeof SelectTrigger>
>(({ className, size, ...props }, ref) => {
  const inheritedSize = usePaginationSize();
  const isPaginationSmall = inheritedSize === "small" && size === undefined;
  const resolvedSize = size ?? (isPaginationSmall ? "sm" : "default");

  return (
    <SelectTrigger
      ref={ref}
      size={resolvedSize}
      data-slot="pagination-select-trigger"
      className={cn(
        "min-h-0 min-w-0 gap-1 text-sm leading-4.5 font-medium py-1.75",
        // Override SelectTrigger's default heights using same data attribute pattern
        "data-[size=sm]:h-7 data-[size=default]:h-9",
        isPaginationSmall ? "w-16 px-2 rounded" : "w-18 pl-3 pr-2",
        className
      )}
      {...props}
    />
  );
});
PaginationSelectTrigger.displayName = "PaginationSelectTrigger";

type PaginationLinkProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  size?: PaginationSize;
} & ComponentProps<"a">;

/**
 * Pagination link button for page selection.
 */
const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, isDisabled, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const { buttonSize, radiusClass } = getPaginationButtonStyles(resolvedSize);

    return (
      <Button
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-link"
        data-active={isActive}
        className={cn(
          radiusClass,
          paginationLinkVariants({ size: resolvedSize, active: isActive }),
          isDisabled && "pointer-events-none opacity-50",
          className
        )}
        render={
          <a
            ref={ref}
            aria-current={isActive ? "page" : undefined}
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : undefined}
            {...props}
          />
        }
      />
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
    const { isDisabled, ...linkProps } = props;

    return (
      <Button
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-first"
        className={cn(radiusClass, isDisabled && "pointer-events-none opacity-50", className)}
        render={
          <a
            ref={ref}
            aria-label="Go to first page"
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : undefined}
            {...linkProps}
          >
            <IconChevronsLeft />
          </a>
        }
      />
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
    const { isDisabled, ...linkProps } = props;

    return (
      <Button
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-previous"
        className={cn(radiusClass, isDisabled && "pointer-events-none opacity-50", className)}
        render={
          <a
            ref={ref}
            aria-label="Go to previous page"
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : undefined}
            {...linkProps}
          >
            <IconChevronLeft />
          </a>
        }
      />
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
    const { isDisabled, ...linkProps } = props;

    return (
      <Button
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-next"
        className={cn(radiusClass, isDisabled && "pointer-events-none opacity-50", className)}
        render={
          <a
            ref={ref}
            aria-label="Go to next page"
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : undefined}
            {...linkProps}
          >
            <IconChevronRight />
          </a>
        }
      />
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
    const { isDisabled, ...linkProps } = props;

    return (
      <Button
        variant="ghost"
        size={buttonSize}
        data-slot="pagination-last"
        className={cn(radiusClass, isDisabled && "pointer-events-none opacity-50", className)}
        render={
          <a
            ref={ref}
            aria-label="Go to last page"
            aria-disabled={isDisabled || undefined}
            tabIndex={isDisabled ? -1 : undefined}
            {...linkProps}
          >
            <IconChevronsRight />
          </a>
        }
      />
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

type PaginationTeleportProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: PaginationSize;
} & Omit<ComponentProps<typeof Input>, "size" | "value" | "onChange" | "children" | "type">;

/**
 * Pagination teleport input - allows direct page number entry.
 * The entire "1/100" is an input, but only the current page number is editable.
 */
const PaginationTeleport = forwardRef<HTMLInputElement, PaginationTeleportProps>(
  ({ className, currentPage, totalPages, onPageChange, size, ...props }, ref) => {
    const inheritedSize = usePaginationSize();
    const resolvedSize = size ?? inheritedSize;
    const [editingValue, setEditingValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const isSmall = resolvedSize === "small";

    // Pagination-specific overrides for the Input component
    const inputClassName = cn(
      "font-medium tabular-nums text-center w-20",
      isSmall ? "h-7 text-sm px-2" : "px-2",
      className
    );

    const displayValue = isEditing ? editingValue : `${currentPage}/${totalPages}`;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsEditing(true);
      setEditingValue(currentPage.toString());
      // Select all on focus for easy replacement
      setTimeout(() => e.target.select(), 0);
    };

    const handleBlur = () => {
      setIsEditing(false);
      const pageNum = Number.parseInt(editingValue, 10);

      if (!Number.isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
        onPageChange(pageNum);
      }
      // Always reset editing value on blur
      setEditingValue("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Allow empty or numeric values only
      // Don't validate against totalPages here to allow typing multi-digit numbers
      // (e.g., typing "12" when totalPages=10 would fail if we checked each keystroke)
      // Validation happens on blur/Enter instead
      if (value === "" || /^\d+$/.test(value)) {
        setEditingValue(value);
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.currentTarget.blur();
      } else if (e.key === "Escape") {
        setEditingValue(currentPage.toString());
        e.currentTarget.blur();
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        data-slot="pagination-teleport"
        className={inputClassName}
        aria-label={`Current page, page ${currentPage} of ${totalPages}`}
        {...props}
      />
    );
  }
);
PaginationTeleport.displayName = "PaginationTeleport";

/**
 * Pagination results per page container.
 * Automatically wraps content in a list item (li).
 */
const PaginationResultsPerPage = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-slot="pagination-results-per-page"
        className={cn("flex items-center gap-2 pl-4", className)}
        {...props}
      />
    );
  }
);
PaginationResultsPerPage.displayName = "PaginationResultsPerPage";

/**
 * Pagination results per page label.
 */
const PaginationResultsPerPageLabel = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="pagination-results-per-page-label"
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
PaginationResultsPerPageLabel.displayName = "PaginationResultsPerPageLabel";

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
  PaginationResultsPerPage,
  PaginationResultsPerPageLabel,
  PaginationSelectTrigger,
  PaginationStatus,
  PaginationTeleport,
  paginationEllipsisVariants,
  paginationLinkVariants,
  paginationStatusVariants,
};
