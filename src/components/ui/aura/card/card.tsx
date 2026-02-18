import { IconDotsVertical } from "@tabler/icons-react";
import { type ComponentProps, type ComponentRef, type ReactNode, forwardRef } from "react";

import { cn } from "../../../../lib/utils";
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../dropdown-menu";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Card = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col rounded-lg hover:bg-accent",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          "@container/card-header group/card-header grid auto-rows-min items-start gap-1.5 px-4 pt-4 [.border-b]:pb-6",
          "grid-cols-[1fr]",
          "has-data-[slot=card-icon]:grid-cols-[auto_1fr]",
          "has-data-[slot=card-header-right]:grid-cols-[1fr_auto]",
          "has-data-[slot=card-icon]:has-data-[slot=card-header-right]:grid-cols-[auto_1fr_auto]",
          className
        )}
        {...props}
      />
    );
  }
);
CardHeader.displayName = "CardHeader";

const CardIcon = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-icon"
        className={cn("col-start-1 row-start-1 h-full", className)}
        {...props}
      >
        <div className="flex items-center h-full">{children}</div>
      </div>
    );
  }
);
CardIcon.displayName = "CardIcon";

const CardTitle = forwardRef<ComponentRef<"h3">, ComponentProps<"h3"> & { as?: HeadingElement }>(
  ({ className, as: Tag = "h3", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        data-slot="card-title"
        className={cn(
          "tracking-tightest text-foreground font-medium text-lg row-start-1",
          "group-has-data-[slot=card-icon]/card-header:col-start-2",
          className
        )}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<ComponentRef<"p">, ComponentProps<"p">>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="card-description"
        className={cn(
          "text-muted-foreground text-sm row-start-2",
          "group-has-data-[slot=card-icon]/card-header:col-start-2",
          className
        )}
        {...props}
      />
    );
  }
);
CardDescription.displayName = "CardDescription";

const CardHeaderRight = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header-right"
        className={cn("row-span-2 row-start-1 self-start justify-self-end", className)}
        {...props}
      />
    );
  }
);
CardHeaderRight.displayName = "CardHeaderRight";

const CardActions = forwardRef<
  ComponentRef<typeof Button>,
  Omit<ComponentProps<typeof DropdownMenu>, "children"> & {
    children?: ReactNode;
    align?: "start" | "center" | "end";
  }
>(({ children, align = "end", ...props }, ref) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" ref={ref}>
            <IconDotsVertical />
          </Button>
        }
      />
      <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
});
CardActions.displayName = "CardActions";

const CardContent = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="card-content" className={cn("p-4", className)} {...props} />;
  }
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex px-4 pb-4", className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardIcon,
  CardHeaderRight,
  CardFooter,
  CardTitle,
  CardActions,
  CardDescription,
  CardContent,
};
