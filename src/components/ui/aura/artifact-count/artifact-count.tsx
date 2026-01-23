import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/aura/card";
import { Separator } from "@/components/ui/aura/separator";
import { cn } from "@/lib/utils";

const artifactCountCountVariants = cva(
  "flex flex-col items-center justify-center rounded p-1 text-3xl font-medium leading-8 tracking-tightest min-w-10",
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
  },
);

/**
 * ArtifactCount container for count-based widgets.
 */
const ArtifactCount = ({
  className,
  ...props
}: ComponentProps<typeof Card>) => {
  return (
    <Card
      data-slot="artifact-count"
      className={cn("flex flex-col gap-7", className)}
      {...props}
    />
  );
};

/**
 * Header area for count widgets.
 */
const ArtifactCountHeader = ({
  className,
  ...props
}: ComponentProps<typeof CardHeader>) => {
  return (
    <CardHeader
      data-slot="artifact-count-header"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
};

/**
 * Emphasized count value display.
 */
const ArtifactCountCount = forwardRef<
  HTMLParagraphElement,
  ComponentProps<"p"> & VariantProps<typeof artifactCountCountVariants>
>(({ className, status, ...props }, ref) => {
  return (
    <p
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
const ArtifactCountContent = ({
  className,
  ...props
}: ComponentProps<typeof CardContent>) => {
  return (
    <CardContent
      data-slot="artifact-count-content"
      className={cn(className)}
      {...props}
    />
  );
};

/**
 * Metadata tag for count widgets.
 */
const ArtifactCountTag = ({ className, ...props }: ComponentProps<"span">) => {
  return (
    <span
      data-slot="artifact-count-tag"
      className={cn(
        "text-sm font-medium leading-4.5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};

/**
 * Footer area for count widgets.
 */
const ArtifactCountFooter = ({
  className,
  ...props
}: ComponentProps<typeof CardFooter>) => {
  return (
    <CardFooter
      data-slot="artifact-count-footer"
      className={cn("justify-between text-sm", className)}
      {...props}
    />
  );
};

/**
 * Separator between header/content/footer regions.
 */
const ArtifactCountSeparator = ({
  className,
  ...props
}: ComponentProps<typeof Separator>) => {
  return (
    <div data-slot="artifact-count-separator" className="px-4">
      <Separator className={cn(className)} {...props} />
    </div>
  );
};

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
