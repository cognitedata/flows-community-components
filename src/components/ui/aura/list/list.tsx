import {
  Children,
  type ComponentProps,
  type ReactNode,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

type ListItemVariant = "upcoming" | "now" | "completed" | "error";

type ListItemContextValue = {
  variant?: ListItemVariant;
  hasIcon: boolean;
};

const ListItemContext = createContext<ListItemContextValue>({
  hasIcon: false,
});

const listItemIconVariants = cva("", {
  variants: {
    variant: {
      upcoming: "text-muted-foreground",
      now: "text-foreground",
      completed: "text-muted-foreground",
      error: "text-destructive-foreground",
    },
  },
});

const listItemTitleVariants = cva("", {
  variants: {
    variant: {
      upcoming: "text-muted-foreground",
      now: "text-foreground",
      completed: "text-muted-foreground",
      error: "text-foreground",
    },
  },
});

const listItemDescriptionVariants = cva("", {
  variants: {
    variant: {
      upcoming: "text-muted-foreground",
      now: "text-muted-foreground",
      completed: "text-muted-foreground",
      error: "text-muted-foreground",
    },
  },
});

const listItemStatusVariants = cva("", {
  variants: {
    variant: {
      upcoming: "text-muted-foreground",
      now: "text-muted-foreground",
      completed: "text-muted-foreground",
      error: "text-destructive-foreground",
    },
  },
});

const isListItemIconElement = (child: ReactNode) => {
  if (!isValidElement(child)) {
    return false;
  }

  const childType = child.type;
  const displayName =
    typeof childType === "function"
      ? childType.displayName || childType.name
      : typeof childType === "object"
        ? childType.displayName || childType.render?.displayName || childType.render?.name
        : undefined;

  return childType === ListItemIcon || displayName === "ListItemIcon";
};

const DefaultListItemIcon = ({ variant }: { variant: ListItemVariant }) => {
  if (variant === "completed") {
    return (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (variant === "now") {
    return (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.15" cx="8" cy="8" r="7" fill="currentColor" />
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "error") {
    return (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
};

/**
 * List container for unordered content.
 */
const List = forwardRef<HTMLUListElement, ComponentProps<"ul">>(({ className, ...props }, ref) => {
  return (
    <ul ref={ref} data-slot="list" className={cn("flex flex-col gap-3", className)} {...props} />
  );
});
List.displayName = "List";

/**
 * List container for ordered content.
 */
const ListOrdered = forwardRef<HTMLOListElement, ComponentProps<"ol">>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        ref={ref}
        data-slot="list-ordered"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    );
  }
);
ListOrdered.displayName = "ListOrdered";

/**
 * List container for description list content.
 */
const ListDescription = forwardRef<HTMLDListElement, ComponentProps<"dl">>(
  ({ className, ...props }, ref) => {
    return (
      <dl
        ref={ref}
        data-slot="list-description"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    );
  }
);
ListDescription.displayName = "ListDescription";

/**
 * List item container with optional status variants.
 */
const ListItem = forwardRef<HTMLLIElement, ComponentProps<"li"> & { variant?: ListItemVariant }>(
  ({ className, variant, children, ...props }, ref) => {
    const childItems = Children.toArray(children);
    const hasIconSlot = childItems.some((child) => isListItemIconElement(child));
    const shouldInsertIcon = Boolean(variant) && !hasIconSlot;
    const resolvedChildren = shouldInsertIcon
      ? [<ListItemIcon key="list-item-icon" />, ...childItems]
      : childItems;
    const hasIcon = hasIconSlot || shouldInsertIcon;

    return (
      <ListItemContext.Provider value={{ variant, hasIcon }}>
        <li
          ref={ref}
          data-slot="list-item"
          data-variant={variant}
          className={cn(
            "grid w-full items-start gap-x-3 gap-y-1 rounded p-0.5",
            hasIcon ? "grid-cols-[auto_minmax(0,1fr)_auto]" : "grid-cols-[minmax(0,1fr)_auto]",
            className
          )}
          {...props}
        >
          {resolvedChildren}
        </li>
      </ListItemContext.Provider>
    );
  }
);
ListItem.displayName = "ListItem";

/**
 * Icon slot for list items, supports default state icons.
 */
const ListItemIcon = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & { variant?: ListItemVariant; children?: ReactNode }
>(({ className, variant, children, ...props }, ref) => {
  const { variant: contextVariant } = useContext(ListItemContext);
  const resolvedVariant = variant ?? contextVariant;

  return (
    <span
      ref={ref}
      data-slot="list-item-icon"
      className={cn(
        "col-start-1 row-span-2 flex h-4 w-4 items-center justify-center",
        listItemIconVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    >
      {children ?? (resolvedVariant ? <DefaultListItemIcon variant={resolvedVariant} /> : null)}
    </span>
  );
});
ListItemIcon.displayName = "ListItemIcon";

/**
 * Title slot for list items.
 */
const ListItemTitle = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { variant, hasIcon } = useContext(ListItemContext);

    return (
      <div
        ref={ref}
        data-slot="list-item-title"
        className={cn(
          "row-start-1 flex items-center gap-2 text-sm font-medium leading-4.5",
          hasIcon ? "col-start-2" : "col-start-1",
          listItemTitleVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);
ListItemTitle.displayName = "ListItemTitle";

/**
 * Description slot for list items.
 */
const ListItemDescription = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { variant, hasIcon } = useContext(ListItemContext);

    return (
      <div
        ref={ref}
        data-slot="list-item-description"
        className={cn(
          "row-start-2 text-sm leading-4.5 text-muted-foreground",
          hasIcon ? "col-start-2" : "col-start-1",
          listItemDescriptionVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);
ListItemDescription.displayName = "ListItemDescription";

/**
 * Status slot for list items.
 */
const ListItemStatus = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    const { variant, hasIcon } = useContext(ListItemContext);

    return (
      <span
        ref={ref}
        data-slot="list-item-status"
        className={cn(
          "row-start-1 text-sm font-medium leading-4.5 text-muted-foreground",
          hasIcon ? "col-start-3" : "col-start-2",
          "justify-self-end text-right whitespace-nowrap",
          listItemStatusVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);
ListItemStatus.displayName = "ListItemStatus";

/**
 * Term slot for description lists.
 */
const ListDescriptionTerm = forwardRef<HTMLElement, ComponentProps<"dt">>(
  ({ className, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        data-slot="list-description-term"
        className={cn("text-sm font-medium leading-4.5", className)}
        {...props}
      />
    );
  }
);
ListDescriptionTerm.displayName = "ListDescriptionTerm";

/**
 * Details slot for description lists.
 */
const ListDescriptionDetails = forwardRef<HTMLElement, ComponentProps<"dd">>(
  ({ className, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        data-slot="list-description-details"
        className={cn("text-sm leading-4.5 text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
ListDescriptionDetails.displayName = "ListDescriptionDetails";

export {
  List,
  ListDescription,
  ListDescriptionDetails,
  ListDescriptionTerm,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
};
