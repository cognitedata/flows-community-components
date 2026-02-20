import { type ComponentProps, forwardRef } from 'react';

import { cn } from '../../../../lib/utils';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { Progress } from '@/components/ui/aura/progress';

type ArtifactProgressProps = ComponentProps<typeof Card>;

const ArtifactProgress = forwardRef<React.ElementRef<typeof Card>, ArtifactProgressProps>(
  ({ className, ...props }, ref) => {
    return <Card ref={ref} data-slot="artifact-progress" className={cn(className)} {...props} />;
  }
);

ArtifactProgress.displayName = 'ArtifactProgress';

type ArtifactProgressHeaderProps = ComponentProps<typeof CardHeader>;

const ArtifactProgressHeader = forwardRef<
  React.ElementRef<typeof CardHeader>,
  ArtifactProgressHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <CardHeader
      ref={ref}
      data-slot="artifact-progress-header"
      className={cn(className)}
      {...props}
    />
  );
});

ArtifactProgressHeader.displayName = 'ArtifactProgressHeader';

type ArtifactProgressTitleProps = ComponentProps<typeof CardTitle>;

const ArtifactProgressTitle = forwardRef<
  React.ElementRef<typeof CardTitle>,
  ArtifactProgressTitleProps
>(({ className, ...props }, ref) => {
  return (
    <CardTitle
      ref={ref}
      data-slot="artifact-progress-title"
      className={cn('text-base font-medium tracking-tighter mb-0.5', className)}
      {...props}
    />
  );
});

ArtifactProgressTitle.displayName = 'ArtifactProgressTitle';

type ArtifactProgressDescriptionProps = ComponentProps<typeof CardDescription>;

const ArtifactProgressDescription = forwardRef<
  React.ElementRef<typeof CardDescription>,
  ArtifactProgressDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <CardDescription
      ref={ref}
      data-slot="artifact-progress-description"
      className={cn(
        'text-sm font-medium leading-4.5 tracking-tight text-muted-foreground',
        className
      )}
      {...props}
    />
  );
});

ArtifactProgressDescription.displayName = 'ArtifactProgressDescription';

type ArtifactProgressBarProps = ComponentProps<typeof Progress> & {
  className?: string;
};

const ArtifactProgressBar = forwardRef<HTMLDivElement, ArtifactProgressBarProps>(
  ({ value, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="artifact-progress-bar"
        className={cn('px-4 py-4.5 w-full flex items-center justify-between gap-2', className)}
      >
        <Progress value={value} {...props} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">{value}%</span>
      </div>
    );
  }
);

ArtifactProgressBar.displayName = 'ArtifactProgressBar';

type ArtifactProgressFooterProps = ComponentProps<typeof CardFooter>;

const ArtifactProgressFooter = forwardRef<
  React.ElementRef<typeof CardFooter>,
  ArtifactProgressFooterProps
>(({ className, ...props }, ref) => {
  return (
    <CardFooter
      ref={ref}
      data-slot="artifact-progress-footer"
      className={cn('text-sm', className)}
      {...props}
    />
  );
});

ArtifactProgressFooter.displayName = 'ArtifactProgressFooter';

export {
  ArtifactProgress,
  ArtifactProgressBar,
  ArtifactProgressDescription,
  ArtifactProgressFooter,
  ArtifactProgressHeader,
  ArtifactProgressTitle,
};
