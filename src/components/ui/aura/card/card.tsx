import { IconDotsVertical } from "@tabler/icons-react";
import { type ComponentProps, type ReactNode, forwardRef } from "react";

import { Button } from "@/components/ui/aura/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import { cn } from "@/lib/utils";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Card component for displaying grouped content in a bordered container.
 * Supports composition with CardHeader, CardContent, and CardFooter sub-components.
 * Uses flexbox layout with rounded corners and hover effects.
 */
const Card = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, ...props }, ref) => {
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
});
Card.displayName = "Card";

/**
 * CardHeader provides a flexible header container for card titles, descriptions, and icons.
 * Uses CSS Grid layout that automatically adjusts columns based on which sub-components are present.
 * Supports CardIcon (left), CardTitle/CardDescription (center), and CardHeaderRight (right) slots.
 */
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
          className
        )}
        {...props}
      />
    );
  }
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
  }
);
CardIcon.displayName = "CardIcon";

/**
 * CardTitle displays the main heading for a card.
 * Supports polymorphic heading elements (h1-h6) via the `as` prop for proper document hierarchy.
 * Defaults to h3, which is appropriate for most card use cases.
 * @example
 * <CardTitle as="h2">Section Title</CardTitle>
 * <CardTitle>Default (h3)</CardTitle>
 */
const CardTitle = forwardRef<HTMLHeadingElement, ComponentProps<"h3"> & { as?: HeadingElement }>(
  ({ className, as: Tag = "h3", ...props }, ref) => {
    return (
      <Tag
        ref={ref}
        data-slot="card-title"
        className={cn(
          "tracking-tightest text-foreground font-semibold text-lg row-start-1",
          "group-has-data-[slot=card-icon]/card-header:col-start-2",
          className
        )}
        {...props}
      />
    );
  }
);
CardTitle.displayName = "CardTitle";

/**
 * CardDescription provides supplementary text below the CardTitle.
 * Renders as a semantic paragraph element with muted styling.
 * Positioned in the second row of the CardHeader grid.
 */
const CardDescription = forwardRef<HTMLParagraphElement, ComponentProps<"p">>(
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
        className={cn("row-span-2 row-start-1 self-start justify-self-end", className)}
        {...props}
      />
    );
  }
);
CardHeaderRight.displayName = "CardHeaderRight";

/**
 * CardActions provides a dropdown menu for card actions.
 * Must be wrapped in CardHeaderRight to position in the header corner.
 * Pass DropdownMenuItem components as children to populate the menu.
 */
const CardActions = forwardRef<
  HTMLButtonElement,
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

/**
 * CardContent provides the main content area of the card.
 * Includes default padding that can be overridden via className.
 * Use for text, images, forms, or any card body content.
 */
const CardContent = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} data-slot="card-content" className={cn("p-4", className)} {...props} />;
  }
);
CardContent.displayName = "CardContent";

/**
 * CardFooter provides a footer section at the bottom of the card.
 * Uses flexbox layout by default. Commonly used for actions, badges, or metadata.
 * Can be customized with flex direction and gap utilities.
 */
const CardFooter = forwardRef<HTMLDivElement, ComponentProps<"div">>(
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
