import { type ComponentProps, type ComponentRef, forwardRef } from 'react';

import { cn } from '../../../../lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '../card';
import { Count, countVariants } from '../count';
import { Separator } from '../separator';

const ArtifactCount = forwardRef<
  ComponentRef<typeof Card>,
  ComponentProps<typeof Card>
>(({ className, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      data-slot="artifact-count"
      className={cn('flex min-h-35 flex-col justify-between gap-2', className)}
      {...props}
    />
  );
});
ArtifactCount.displayName = 'ArtifactCount';

const ArtifactCountHeader = forwardRef<
  ComponentRef<typeof CardHeader>,
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

const ArtifactCountCount = forwardRef<
  ComponentRef<typeof Count>,
  ComponentProps<typeof Count>
>(({ className, ...props }, ref) => {
  return (
    <Count
      ref={ref}
      data-slot="artifact-count-count"
      className={cn(className)}
      {...props}
    />
  );
});
ArtifactCountCount.displayName = 'ArtifactCountCount';

const artifactCountCountVariants = countVariants;

const ArtifactCountContent = forwardRef<
  ComponentRef<typeof CardContent>,
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

const ArtifactCountTag = forwardRef<
  ComponentRef<'span'>,
  ComponentProps<'span'>
>(({ className, ...props }, ref) => {
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
});
ArtifactCountTag.displayName = 'ArtifactCountTag';

const ArtifactCountFooter = forwardRef<
  ComponentRef<typeof CardFooter>,
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

const ArtifactCountFooterLeft = forwardRef<
  ComponentRef<'div'>,
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

const ArtifactCountFooterCenter = forwardRef<
  ComponentRef<'div'>,
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

const ArtifactCountFooterRight = forwardRef<
  ComponentRef<'div'>,
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

const ArtifactCountSeparator = forwardRef<
  ComponentRef<'div'>,
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
