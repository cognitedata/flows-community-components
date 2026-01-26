import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/aura/card";
import {
  List,
  ListDescription,
  ListItem,
  ListItemDescription,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
} from "@/components/ui/aura/list";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const ArtifactList = ({ className, ...props }: ComponentProps<typeof Card>) => {
  return <Card className={cn(className)} {...props} />;
};

const ArtifactListHeader = ({ className, ...props }: ComponentProps<typeof CardHeader>) => {
  return <CardHeader className={cn(className)} {...props} />;
};

const ArtifactListTitle = ({ className, ...props }: ComponentProps<typeof CardTitle>) => {
  return <CardTitle className={cn("text-base font-medium", className)} {...props} />;
};

const ArtifactListContent = ({ className, ...props }: ComponentProps<typeof List>) => {
  return (
    <CardContent className={cn(className)}>
      <List {...props} />
    </CardContent>
  );
};

const ArtifactListOrdered = ({ className, ...props }: ComponentProps<typeof ListOrdered>) => {
  return (
    <CardContent className={cn(className)}>
      <ListOrdered {...props} />
    </CardContent>
  );
};

const ArtifactListDescription = ({
  className,
  ...props
}: ComponentProps<typeof ListDescription>) => {
  return (
    <CardContent className={cn(className)}>
      <ListDescription {...props} />
    </CardContent>
  );
};

const ArtifactListItem = ({ className, ...props }: ComponentProps<typeof ListItem>) => {
  return <ListItem className={cn("p-0.5", className)} {...props} />;
};

const ArtifactListItemTitle = ({ className, ...props }: ComponentProps<typeof ListItemTitle>) => {
  return <ListItemTitle className={cn(className)} {...props} />;
};

const ArtifactListItemDescription = ({
  className,
  ...props
}: ComponentProps<typeof ListItemDescription>) => {
  return <ListItemDescription className={cn(className)} {...props} />;
};

const ArtifactListItemStatus = ({ className, ...props }: ComponentProps<typeof ListItemStatus>) => {
  return <ListItemStatus className={cn(className)} {...props} />;
};

export {
  ArtifactList,
  ArtifactListContent,
  ArtifactListDescription,
  ArtifactListHeader,
  ArtifactListItem,
  ArtifactListItemDescription,
  ArtifactListItemStatus,
  ArtifactListItemTitle,
  ArtifactListOrdered,
  ArtifactListTitle,
};
