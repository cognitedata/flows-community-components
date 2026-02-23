import { type VariantProps, cva } from 'class-variance-authority';
import { type ComponentProps, forwardRef } from 'react';

import { cn } from '../../../../lib/utils';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/aura/card';
import { Separator } from '@/components/ui/aura/separator';

const artifactCountCountVariants = cva(
  'flex flex-col items-center justify-center rounded px-0.5 text-3xl font-medium leading-8 tracking-tightest min-h-9 min-w-9',
  {
    variants: {
      variant: {
        default: 'bg-undefined text-undefined-foreground-alternate',
        warning: 'bg-warning text-warning-foreground-alternate',
        critical: 'bg-destructive text-destructive-foreground-alternate',
      },
    },
    defaultVariants: {
      variant: 'default',
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
        className={cn(
          'flex min-h-35 flex-col justify-between gap-2',
          className
        )}
        {...props}
      />
    );
  }
);
ArtifactCount.displayName = 'ArtifactCount';

/**
 * Header area for count widgets.
 */
const ArtifactCountHeader = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof CardHeader>
>(({ className, ...props }, ref) => {
  return (
    <CardHeader
      ref={ref}
      data-slot="artifact-count-header"
      className={cn('flex w-full items-center gap-2', className)}
      {...props}
    />
  );
});
ArtifactCountHeader.displayName = 'ArtifactCountHeader';

/**
 * Emphasized count value display.
 */
const ArtifactCountCount = forwardRef<
  HTMLOutputElement,
  ComponentProps<'output'> & VariantProps<typeof artifactCountCountVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <output
      ref={ref}
      data-slot="artifact-count-count"
      className={cn(artifactCountCountVariants({ variant }), className)}
      {...props}
    />
  );
});
ArtifactCountCount.displayName = 'ArtifactCountCount';

/**
 * Content area for count widgets.
 */
const ArtifactCountContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof CardContent>
>(({ className, ...props }, ref) => {
  return (
    <CardContent
      ref={ref}
      data-slot="artifact-count-content"
      className={cn(className)}
      {...props}
    />
  );
});
ArtifactCountContent.displayName = 'ArtifactCountContent';

/**
 * Metadata tag for count widgets.
 */
const ArtifactCountTag = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="artifact-count-tag"
        className={cn(
          'text-sm font-medium leading-4.5 text-muted-foreground',
          className
        )}
        {...props}
      />
    );
  }
);
ArtifactCountTag.displayName = 'ArtifactCountTag';

/**
 * Footer area for count widgets.
 */
const ArtifactCountFooter = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof CardFooter>
>(({ className, ...props }, ref) => {
  return (
    <CardFooter
      ref={ref}
      data-slot="artifact-count-footer"
      className={cn('w-full items-center gap-2 text-sm', className)}
      {...props}
    />
  );
});
ArtifactCountFooter.displayName = 'ArtifactCountFooter';

/**
 * Footer item aligned to the left.
 */
const ArtifactCountFooterLeft = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="artifact-count-footer-left"
      className={cn('flex flex-1 items-center justify-start gap-2', className)}
      {...props}
    />
  );
});
ArtifactCountFooterLeft.displayName = 'ArtifactCountFooterLeft';

/**
 * Footer item aligned to the center.
 */
const ArtifactCountFooterCenter = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="artifact-count-footer-center"
      className={cn('flex flex-1 items-center justify-center gap-2', className)}
      {...props}
    />
  );
});
ArtifactCountFooterCenter.displayName = 'ArtifactCountFooterCenter';

/**
 * Footer item aligned to the right.
 */
const ArtifactCountFooterRight = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="artifact-count-footer-right"
      className={cn('flex flex-1 items-center justify-end gap-2', className)}
      {...props}
    />
  );
});
ArtifactCountFooterRight.displayName = 'ArtifactCountFooterRight';

/**
 * Separator between header/content/footer regions.
 */
const ArtifactCountSeparator = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} data-slot="artifact-count-separator" className="w-full px-4">
      <Separator className={cn(className)} {...props} />
    </div>
  );
});
ArtifactCountSeparator.displayName = 'ArtifactCountSeparator';

export {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountCount,
  ArtifactCountFooter,
  ArtifactCountFooterCenter,
  ArtifactCountFooterLeft,
  ArtifactCountFooterRight,
  ArtifactCountHeader,
  ArtifactCountSeparator,
  ArtifactCountTag,
  artifactCountCountVariants,
};
