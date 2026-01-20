import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card";
import { List, ListItem } from "@/components/ui/aura/list";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type ArtifactListProps = ComponentProps<typeof Card>;

export const ArtifactList = ({ className, ...props }: ArtifactListProps) => {
  return <Card className={cn(className)} {...props} />;
};

export type ArtifactListHeaderProps = ComponentProps<typeof CardHeader>;

export const ArtifactListHeader = ({
  className,
  ...props
}: ArtifactListHeaderProps) => {
  return <CardHeader className={cn(className)} {...props} />;
};

export type ArtifactListTitleProps = ComponentProps<typeof CardTitle>;

export const ArtifactListTitle = ({
  className,
  ...props
}: ArtifactListTitleProps) => {
  return (
    <CardTitle
      className={cn("text-base font-medium tracking-tighter", className)}
      {...props}
    />
  );
};

export type ArtifactListContentProps = ComponentProps<typeof List>;

export const ArtifactListContent = ({
  className,
  ...props
}: ArtifactListContentProps) => {
  return (
    <CardContent className={cn(className)}>
      <List {...props} />
    </CardContent>
  );
};

export type ArtifactListItemProps = ComponentProps<typeof ListItem>;

export const ArtifactListItem = ({
  className,
  ...props
}: ArtifactListItemProps) => {
  return (
    <ListItem
      className={cn("p-0.5 gap-1", className)}
      {...props}
    />
  );
};

