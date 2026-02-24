import { type ComponentProps, type ComponentRef, forwardRef } from 'react';

import { cn } from '../../../../lib/utils';
import { Card, CardDescription, CardTitle } from '../card';

const Artifact = forwardRef<
  ComponentRef<typeof Card>,
  ComponentProps<typeof Card>
>(({ className, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      data-slot="artifact"
      className={cn('grid grid-rows-[auto_1fr_auto]', className)}
      {...props}
    />
  );
});
Artifact.displayName = 'Artifact';

const ArtifactTitle = forwardRef<
  ComponentRef<typeof CardTitle>,
  ComponentProps<typeof CardTitle>
>(({ className, ...props }, ref) => (
  <CardTitle
    ref={ref}
    className={cn('text-base tracking-tighter', className)}
    {...props}
  />
));
ArtifactTitle.displayName = 'ArtifactTitle';

const ArtifactDescription = forwardRef<
  ComponentRef<typeof CardDescription>,
  ComponentProps<typeof CardDescription>
>(({ className, ...props }, ref) => (
  <CardDescription ref={ref} className={cn('', className)} {...props} />
));
ArtifactDescription.displayName = 'ArtifactDescription';

export { Artifact, ArtifactDescription, ArtifactTitle };
