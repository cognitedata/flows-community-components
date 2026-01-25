import { IconDotsVertical } from "@tabler/icons-react";
import { type ComponentProps, forwardRef } from "react";

import { Button } from "@/components/ui/aura/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground flex flex-col rounded-lg hover:bg-accent",
          className,
        )}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn(
          // Base grid layout
          "@container/card-header group/card-header grid auto-rows-min items-start gap-1.5 px-4 pt-4 [.border-b]:pb-6",
          // Conditional grid columns based on slots present
          "grid-cols-[1fr]", // default: just content
          "has-data-[slot=card-icon]:grid-cols-[auto_1fr]", // with icon
          "has-data-[slot=card-header-right]:grid-cols-[1fr_auto]", // with right slot
          "has-data-[slot=card-icon]:has-data-[slot=card-header-right]:grid-cols-[auto_1fr_auto]", // with both
          className,
        )}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

/**
 * CardIcon provides a slot for icons, badges, or avatars in the card header.
 * Positioned to the left of the title/description.
 */
const CardIcon = forwardRef<HTMLDivElement, ComponentProps<"div">>(
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
  },
);
CardIcon.displayName = "CardIcon";

const CardTitle = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-title"
        className={cn(
          "tracking-tightest text-foreground font-semibold text-lg row-start-1",
          "group-has-data-[slot=card-icon]/card-header:col-start-2",
          className,
        )}
        {...props}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-description"
        className={cn(
          "text-muted-foreground text-sm row-start-2",
          "group-has-data-[slot=card-icon]/card-header:col-start-2",
          className,
        )}
        {...props}
      />
    );
  },
);
CardDescription.displayName = "CardDescription";

/**
 * CardHeaderRight provides a positioning slot for elements in the card header's top-right corner.
 * Use this for any custom elements (badges, buttons, etc.) that should appear at the end of the header.
 */
const CardHeaderRight = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header-right"
        className={cn(
          "row-span-2 row-start-1 self-start justify-self-end",
          className,
        )}
        {...props}
      />
    );
  },
);
CardHeaderRight.displayName = "CardHeaderRight";

/**
 * CardActions provides a dropdown menu for card actions.
 * Must be wrapped in CardHeaderRight to position in the header corner.
 * Pass DropdownMenuItem components as children to populate the menu.
 */
const CardActions = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof DropdownMenu> & {
    align?: "start" | "center" | "end";
  }
>(({ children, align = "end", ...props }, ref) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" ref={ref}>
          <IconDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
});
CardActions.displayName = "CardActions";

const CardContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn("p-4", className)}
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex px-4 pb-4 ", className)}
        {...props}
      />
    );
  },
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
