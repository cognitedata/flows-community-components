import { cn } from "@/lib/utils";
import { type ComponentProps, type ComponentRef, forwardRef } from "react";

const Skeleton = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
