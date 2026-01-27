import { type ComponentProps, type ElementRef, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/aura/card";
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
} from "@/components/ui/aura/list";
import { cn } from "@/lib/utils";

/**
 * ArtifactList wraps a Card for displaying list content within artifacts.
 * Uses List primitives directly for item content - no wrapper needed for
 * ListItemTitle, ListItemDescription, ListItemStatus, or ListItemIcon.
 */
const ArtifactList = forwardRef<ElementRef<typeof Card>, ComponentProps<typeof Card>>(
  ({ className, ...props }, ref) => {
    return (
      <Card ref={ref} data-slot="artifact-list" className={cn("gap-3", className)} {...props} />
    );
  }
);
ArtifactList.displayName = "ArtifactList";

const ArtifactListHeader = forwardRef<
  ElementRef<typeof CardHeader>,
  ComponentProps<typeof CardHeader>
>(({ className, ...props }, ref) => {
  return (
    <CardHeader
      ref={ref}
      data-slot="artifact-list-header"
      className={cn("pb-2", className)}
      {...props}
    />
  );
});
ArtifactListHeader.displayName = "ArtifactListHeader";

const ArtifactListTitle = forwardRef<
  ElementRef<typeof CardTitle>,
  ComponentProps<typeof CardTitle>
>(({ className, ...props }, ref) => {
  return (
    <CardTitle
      ref={ref}
      data-slot="artifact-list-title"
      className={cn("text-base font-medium", className)}
      {...props}
    />
  );
});
ArtifactListTitle.displayName = "ArtifactListTitle";

const ArtifactListContent = forwardRef<ElementRef<typeof List>, ComponentProps<typeof List>>(
  ({ className, ...props }, ref) => {
    return (
      <CardContent
        data-slot="artifact-list-content"
        className={cn("[[data-slot=artifact-list-header]+&]:pt-0")}
      >
        <List ref={ref} className={className} {...props} />
      </CardContent>
    );
  }
);
ArtifactListContent.displayName = "ArtifactListContent";

const ArtifactListOrdered = forwardRef<
  ElementRef<typeof ListOrdered>,
  ComponentProps<typeof ListOrdered>
>(({ className, ...props }, ref) => {
  return (
    <CardContent
      data-slot="artifact-list-ordered"
      className={cn("[[data-slot=artifact-list-header]+&]:pt-0")}
    >
      <ListOrdered ref={ref} className={className} {...props} />
    </CardContent>
  );
});
ArtifactListOrdered.displayName = "ArtifactListOrdered";

const ArtifactListItem = forwardRef<ElementRef<typeof ListItem>, ComponentProps<typeof ListItem>>(
  ({ className, ...props }, ref) => {
    return (
      <ListItem
        ref={ref}
        data-slot="artifact-list-item"
        className={cn("p-0.5", className)}
        {...props}
      />
    );
  }
);
ArtifactListItem.displayName = "ArtifactListItem";

export {
  ArtifactList,
  ArtifactListContent,
  ArtifactListHeader,
  ArtifactListItem,
  ArtifactListOrdered,
  ArtifactListTitle,
  // Re-export List primitives for use within ArtifactList
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
};
