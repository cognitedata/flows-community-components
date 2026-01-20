import type { ComponentProps } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

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

const ListItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        data-slot="list-item"
        className={cn(
          "flex flex-col items-start gap-1 rounded p-0.5",
          className
        )}
        {...props}
      />
    );
  }
);
ListItem.displayName = "ListItem";

const ListItemIcon = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="list-item-icon"
        className={cn("flex-none", className)}
        {...props}
      />
    );
  }
);
ListItemIcon.displayName = "ListItemIcon";

const ListItemLabel = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="list-item-label"
        className={cn("text-sm font-medium leading-[18px]", className)}
        {...props}
      />
    );
  }
);
ListItemLabel.displayName = "ListItemLabel";

const ListDescriptionTerm = forwardRef<HTMLElement, ComponentProps<"dt">>(
  ({ className, ...props }, ref) => {
    return (
      <dt
        ref={ref}
        data-slot="list-description-term"
        className={cn("text-sm font-medium", className)}
        {...props}
      />
    );
  }
);
ListDescriptionTerm.displayName = "ListDescriptionTerm";

const ListDescriptionDetails = forwardRef<HTMLElement, ComponentProps<"dd">>(
  ({ className, ...props }, ref) => {
    return (
      <dd
        ref={ref}
        data-slot="list-description-details"
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
ListDescriptionDetails.displayName = "ListDescriptionDetails";

const ListItemValue = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="list-item-value"
        className={cn("text-sm leading-[18px] text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
ListItemValue.displayName = "ListItemValue";

const ListItemHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="list-item-header"
        className={cn(
          "flex w-full items-center justify-between gap-2",
          className
        )}
        {...props}
      />
    );
  }
);
ListItemHeader.displayName = "ListItemHeader";

const ListItemTitle = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="list-item-title"
        className={cn("flex items-center gap-2 text-sm leading-[18px]", className)}
        {...props}
      />
    );
  }
);
ListItemTitle.displayName = "ListItemTitle";

const ListItemContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="list-item-content"
        className={cn("w-full text-sm leading-[18px]", className)}
        {...props}
      />
    );
  }
);
ListItemContent.displayName = "ListItemContent";

export {
  List,
  ListDescription,
  ListDescriptionDetails,
  ListDescriptionTerm, ListItem,
  ListItemContent,
  ListItemHeader, ListItemIcon, ListItemLabel,
  ListItemTitle,
  ListItemValue,
  ListOrdered
};

