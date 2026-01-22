import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type ListItemState = "upcoming" | "now" | "completed" | "error";

type ListItemContextValue = {
  state?: ListItemState;
};

const ListItemContext = createContext<ListItemContextValue>({});

const listItemStateStyles: Record<
  ListItemState,
  { icon: string; title: string; description: string; timeline: string }
> = {
  upcoming: {
    icon: "text-muted-foreground",
    title: "text-muted-foreground",
    description: "text-muted-foreground",
    timeline: "text-muted-foreground",
  },
  now: {
    icon: "text-foreground",
    title: "text-foreground",
    description: "text-muted-foreground",
    timeline: "text-muted-foreground",
  },
  completed: {
    icon: "text-muted-foreground",
    title: "text-muted-foreground",
    description: "text-muted-foreground",
    timeline: "text-muted-foreground",
  },
  error: {
    icon: "text-destructive",
    title: "text-destructive",
    description: "text-destructive",
    timeline: "text-destructive",
  },
};

const getListItemStateStyle = (
  state: ListItemState | undefined,
  key: "icon" | "title" | "description" | "timeline"
) => {
  if (!state) {
    return undefined;
  }

  return listItemStateStyles[state][key];
};

const DefaultListItemIcon = ({ state }: { state: ListItemState }) => {
  if (state === "completed") {
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

  if (state === "now") {
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

  if (state === "error") {
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
const List = forwardRef<HTMLUListElement, ComponentProps<"ul">>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        data-slot="list"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    );
  }
);
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
 * List item container with optional timeline state.
 */
const ListItem = forwardRef<
  HTMLLIElement,
  ComponentProps<"li"> & { state?: ListItemState }
>(({ className, state, ...props }, ref) => {
  return (
    <ListItemContext.Provider value={{ state }}>
      <li
        ref={ref}
        data-slot="list-item"
        data-state={state}
        className={cn(
          "flex flex-col items-start gap-1 rounded p-0.5",
          className
        )}
        {...props}
      />
    </ListItemContext.Provider>
  );
});
ListItem.displayName = "ListItem";

/**
 * Icon slot for list items, supports default state icons.
 */
const ListItemIcon = forwardRef<
  HTMLSpanElement,
  ComponentProps<"span"> & { state?: ListItemState; children?: ReactNode }
>(({ className, state, children, ...props }, ref) => {
  const context = useContext(ListItemContext);
  const resolvedState = state ?? context.state;
  const stateClass = getListItemStateStyle(resolvedState, "icon");

  return (
    <span
      ref={ref}
      data-slot="list-item-icon"
      className={cn(
        "col-start-1 row-span-2 flex h-4 w-4 items-center justify-center",
        stateClass,
        className
      )}
      {...props}
    >
      {children ??
        (resolvedState ? <DefaultListItemIcon state={resolvedState} /> : null)}
    </span>
  );
});
ListItemIcon.displayName = "ListItemIcon";

/**
 * Header grid for list items with icon, title, and timeline.
 */
const ListItemHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="list-item-header"
        className={cn(
          "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1",
          className
        )}
        {...props}
      />
    );
  }
);
ListItemHeader.displayName = "ListItemHeader";

/**
 * Title slot for list items.
 */
const ListItemTitle = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { state } = useContext(ListItemContext);
    const stateClass = getListItemStateStyle(state, "title");

    return (
      <div
        ref={ref}
        data-slot="list-item-title"
        className={cn(
          "col-start-2 row-start-1 flex items-center gap-2 text-sm font-medium leading-4.5",
          stateClass,
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
    const { state } = useContext(ListItemContext);
    const stateClass = getListItemStateStyle(state, "description");

    return (
      <div
        ref={ref}
        data-slot="list-item-description"
        className={cn(
          "col-start-2 row-start-2 text-sm leading-4.5 text-muted-foreground",
          stateClass,
          className
        )}
        {...props}
      />
    );
  }
);
ListItemDescription.displayName = "ListItemDescription";

/**
 * Timeline slot for list items.
 */
const ListItemTimeline = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    const { state } = useContext(ListItemContext);
    const stateClass = getListItemStateStyle(state, "timeline");

    return (
      <span
        ref={ref}
        data-slot="list-item-timeline"
        className={cn(
          "col-start-3 row-start-1 text-sm font-medium leading-4.5 text-muted-foreground",
          stateClass,
          className
        )}
        {...props}
      />
    );
  }
);
ListItemTimeline.displayName = "ListItemTimeline";

/**
 * Content slot for list items beyond the header grid.
 */
const ListItemContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="list-item-content"
        className={cn("w-full text-sm leading-4.5", className)}
        {...props}
      />
    );
  }
);
ListItemContent.displayName = "ListItemContent";

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
  ListItemContent,
  ListItemDescription,
  ListItemHeader,
  ListItemIcon,
  ListItemTimeline,
  ListItemTitle,
  ListOrdered
};

