import { Children, type ComponentProps, type ComponentRef, forwardRef } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/aura/card/card";
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
} from "@/components/ui/aura/list/list";
import { cn } from "../../../../lib/utils";

/**
 * ArtifactList wraps a Card for displaying list content within artifacts.
 * Uses List primitives directly for item content - no wrapper needed for
 * ListItemTitle, ListItemDescription, ListItemStatus, or ListItemIcon.
 */
const ArtifactList = forwardRef<ComponentRef<typeof Card>, ComponentProps<typeof Card>>(
  ({ className, ...props }, ref) => {
    return (
      <Card ref={ref} data-slot="artifact-list" className={cn("gap-3", className)} {...props} />
    );
  }
);
ArtifactList.displayName = "ArtifactList";

const ArtifactListHeader = forwardRef<
  ComponentRef<typeof CardHeader>,
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

/**
 * ArtifactListTitle displays the heading for an artifact list.
 * Supports polymorphic heading elements (h1-h6) via the `as` prop for proper document hierarchy.
 * Defaults to h3, which is appropriate for most artifact use cases.
 * @example
 * <ArtifactListTitle as="h2">Section Title</ArtifactListTitle>
 * <ArtifactListTitle>Default (h3)</ArtifactListTitle>
 */
const ArtifactListTitle = forwardRef<
  ComponentRef<typeof CardTitle>,
  ComponentProps<typeof CardTitle>
>(({ className, ...props }, ref) => {
  return <CardTitle ref={ref} className={cn("text-base font-medium", className)} {...props} />;
});
ArtifactListTitle.displayName = "ArtifactListTitle";

const ArtifactListContent = forwardRef<ComponentRef<typeof List>, ComponentProps<typeof List>>(
  ({ className, children, ...props }, ref) => {
    const childArray = Children.toArray(children);
    const hasChildren = childArray.length > 0;

    return (
      <CardContent
        data-slot="artifact-list-content"
        className={cn("[[data-slot=artifact-list-header]+&]:pt-0")}
      >
        <List ref={ref} className={className} {...props}>
          {hasChildren ? (
            children
          ) : (
            <div className="text-sm text-muted-foreground">No data yet</div>
          )}
        </List>
      </CardContent>
    );
  }
);
ArtifactListContent.displayName = "ArtifactListContent";

const ArtifactListOrdered = forwardRef<
  ComponentRef<typeof ListOrdered>,
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

const ArtifactListItem = forwardRef<ComponentRef<typeof ListItem>, ComponentProps<typeof ListItem>>(
  (props, ref) => {
    return <ListItem ref={ref} data-slot="artifact-list-item" {...props} />;
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
