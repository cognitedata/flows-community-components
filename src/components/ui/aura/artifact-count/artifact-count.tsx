import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/aura/card";
import { Separator } from "@/components/ui/aura/separator";
import { cn } from "@/lib/utils";

const artifactCountCountVariants = cva(
  "flex flex-col items-center justify-center rounded px-0.5 text-3xl font-medium leading-8 tracking-tightest min-h-9 min-w-9",
  {
    variants: {
      status: {
        default: "bg-muted text-muted-foreground",
        warning: "bg-warning text-warning-foreground",
        critical: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

/**
 * ArtifactCount container for count-based widgets.
 */
const ArtifactCount = forwardRef<HTMLDivElement, ComponentProps<typeof Card>>(
  ({ className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        data-slot="artifact-count"
        className={cn("flex min-h-[140px] flex-col justify-between gap-2", className)}
        {...props}
      />
    );
  }
);
ArtifactCount.displayName = "ArtifactCount";

/**
 * Header area for count widgets.
 */
const ArtifactCountHeader = forwardRef<HTMLDivElement, ComponentProps<typeof CardHeader>>(
  ({ className, ...props }, ref) => {
    return (
      <CardHeader
        ref={ref}
        data-slot="artifact-count-header"
        className={cn("flex w-full items-center gap-2", className)}
        {...props}
      />
    );
  }
);
ArtifactCountHeader.displayName = "ArtifactCountHeader";

/**
 * Emphasized count value display.
 */
const ArtifactCountCount = forwardRef<
  HTMLOutputElement,
  ComponentProps<"output"> & VariantProps<typeof artifactCountCountVariants>
>(({ className, status, ...props }, ref) => {
  return (
    <output
      ref={ref}
      data-slot="artifact-count-count"
      className={cn(artifactCountCountVariants({ status }), className)}
      {...props}
    />
  );
});
ArtifactCountCount.displayName = "ArtifactCountCount";

/**
 * Content area for count widgets.
 */
const ArtifactCountContent = forwardRef<HTMLDivElement, ComponentProps<typeof CardContent>>(
  ({ className, ...props }, ref) => {
    return (
      <CardContent
        ref={ref}
        data-slot="artifact-count-content"
        className={cn(className)}
        {...props}
      />
    );
  }
);
ArtifactCountContent.displayName = "ArtifactCountContent";

/**
 * Metadata tag for count widgets.
 */
const ArtifactCountTag = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="artifact-count-tag"
        className={cn("text-sm font-medium leading-4.5 text-muted-foreground", className)}
        {...props}
      />
    );
  }
);
ArtifactCountTag.displayName = "ArtifactCountTag";

/**
 * Footer area for count widgets.
 */
const ArtifactCountFooter = forwardRef<HTMLDivElement, ComponentProps<typeof CardFooter>>(
  ({ className, ...props }, ref) => {
    return (
      <CardFooter
        ref={ref}
        data-slot="artifact-count-footer"
        className={cn("w-full items-center justify-between gap-2 text-sm", className)}
        {...props}
      />
    );
  }
);
ArtifactCountFooter.displayName = "ArtifactCountFooter";

/**
 * Separator between header/content/footer regions.
 */
const ArtifactCountSeparator = forwardRef<HTMLDivElement, ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} data-slot="artifact-count-separator" className="w-full px-4">
        <Separator className={cn(className)} {...props} />
      </div>
    );
  }
);
ArtifactCountSeparator.displayName = "ArtifactCountSeparator";

export {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountCount,
  ArtifactCountFooter,
  ArtifactCountHeader,
  ArtifactCountSeparator,
  ArtifactCountTag,
  artifactCountCountVariants,
};
