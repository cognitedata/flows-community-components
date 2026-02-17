import {
  Children,
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
} from "react";

import { cva } from "class-variance-authority";

import { cn } from "../../../../lib/utils";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type ListItemVariant = "upcoming" | "now" | "completed" | "error";

type ListItemContextValue = {
  variant?: ListItemVariant;
};

const ListItemContext = createContext<ListItemContextValue>({});

const listItemIconVariants = cva("", {
  variants: {
    variant: {
      upcoming: "text-muted-foreground",
      now: "text-card-foreground",
      completed: "text-muted-foreground",
      error: "text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "upcoming",
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
  defaultVariants: {
    variant: "now",
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
  defaultVariants: {
    variant: "now",
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
  defaultVariants: {
    variant: "now",
  },
});

function isObjectLike(val: unknown): val is Record<string, unknown> {
  return (typeof val === "object" || typeof val === "function") && val !== null;
}

function getReactDisplayName(value: unknown): string | undefined {
  if (!isObjectLike(value)) return undefined;
  const d = value.displayName ?? value.name;
  if (typeof d === "string") return d;
  const render = value.render;
  if (isObjectLike(render)) {
    const rd = render.displayName ?? render.name;
    return typeof rd === "string" ? rd : undefined;
  }
  return undefined;
}

const isListItemIconElement = (child: ReactNode) => {
  if (!isValidElement(child)) return false;
  const childType = child.type;
  const displayName = getReactDisplayName(childType);
  return childType === ListItemIcon || displayName === "ListItemIcon";
};

const isListItemStatusElement = (child: ReactNode) => {
  if (!isValidElement(child)) return false;
  const childType = child.type;
  const displayName = getReactDisplayName(childType);
  return childType === ListItemStatus || displayName === "ListItemStatus";
};

const isListItemDescriptionElement = (child: ReactNode) => {
  if (!isValidElement(child)) return false;
  const childType = child.type;
  const displayName = getReactDisplayName(childType);
  return childType === ListItemDescription || displayName === "ListItemDescription";
};

const isListItemTitleElement = (child: ReactNode) => {
  if (!isValidElement(child)) return false;
  const childType = child.type;
  const displayName = getReactDisplayName(childType);
  return childType === ListItemTitle || displayName === "ListItemTitle";
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

const List = forwardRef<ComponentRef<"ul">, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => {
    return (
      <ul ref={ref} data-slot="list" className={cn("flex flex-col gap-3", className)} {...props} />
    );
  }
);
List.displayName = "List";

const ListOrdered = forwardRef<ComponentRef<"ol">, ComponentProps<"ol">>(
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

const ListDescription = forwardRef<ComponentRef<"dl">, ComponentProps<"dl">>(
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

const ListItem = forwardRef<
  ComponentRef<"li">,
  ComponentProps<"li"> & { variant?: ListItemVariant }
>(({ className, variant, children, ...props }, ref) => {
  const childItems = Children.toArray(children);
  const iconSlot = childItems.find((child) => isListItemIconElement(child));
  const statusSlot = childItems.find((child) => isListItemStatusElement(child));
  const titleSlot = childItems.find((child) => isListItemTitleElement(child));
  const descriptionSlot = childItems.find((child) => isListItemDescriptionElement(child));
  const shouldInsertIcon = Boolean(variant) && iconSlot === undefined;
  const icon = shouldInsertIcon ? <ListItemIcon key="list-item-icon" /> : iconSlot;
  const rest = childItems.filter(
    (child) =>
      child !== iconSlot && child !== statusSlot && child !== titleSlot && child !== descriptionSlot
  );

  return (
    <ListItemContext.Provider value={{ variant }}>
      <li
        ref={ref}
        data-slot="list-item"
        data-variant={variant}
        className={cn("flex w-full items-start gap-2 rounded p-0.5", className)}
        {...props}
      >
        {icon}
        <div
          data-slot="list-item-body"
          className={cn("min-w-0 flex-1", descriptionSlot ? "space-y-1" : undefined)}
        >
          {(titleSlot || statusSlot) && (
            <div data-slot="list-item-row" className="flex items-start justify-between gap-2">
              {titleSlot}
              {statusSlot}
            </div>
          )}
          {descriptionSlot}
          {rest}
        </div>
      </li>
    </ListItemContext.Provider>
  );
});
ListItem.displayName = "ListItem";

const ListItemIcon = forwardRef<
  ComponentRef<"span">,
  ComponentProps<"span"> & { variant?: ListItemVariant; children?: ReactNode }
>(({ className, variant, children, ...props }, ref) => {
  const { variant: contextVariant } = useContext(ListItemContext);
  const resolvedVariant = variant ?? contextVariant;

  return (
    <span
      ref={ref}
      data-slot="list-item-icon"
      aria-hidden="true"
      className={cn(
        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground",
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

const ListItemTitle = forwardRef<
  ComponentRef<HeadingElement>,
  ComponentProps<"h3"> & { as?: HeadingElement }
>(({ className, as: Tag = "h3", ...props }, ref) => {
  const { variant } = useContext(ListItemContext);

  return (
    <Tag
      ref={ref}
      data-slot="list-item-title"
      className={cn(
        "min-w-0 flex items-center gap-2 text-sm font-medium leading-4.5",
        listItemTitleVariants({ variant }),
        className
      )}
      {...props}
    />
  );
});
ListItemTitle.displayName = "ListItemTitle";

const ListItemDescription = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { variant } = useContext(ListItemContext);

    return (
      <div
        ref={ref}
        data-slot="list-item-description"
        className={cn(
          "text-sm leading-4.5 text-muted-foreground",
          listItemDescriptionVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);
ListItemDescription.displayName = "ListItemDescription";

const ListItemStatus = forwardRef<ComponentRef<"span">, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    const { variant } = useContext(ListItemContext);

    return (
      <span
        ref={ref}
        data-slot="list-item-status"
        className={cn(
          "text-sm font-medium leading-4.5 text-muted-foreground whitespace-nowrap text-right",
          listItemStatusVariants({ variant }),
          className
        )}
        {...props}
      />
    );
  }
);
ListItemStatus.displayName = "ListItemStatus";

const ListDescriptionTerm = forwardRef<ComponentRef<"dt">, ComponentProps<"dt">>(
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

const ListDescriptionDetails = forwardRef<ComponentRef<"dd">, ComponentProps<"dd">>(
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
