import type { ComponentProps } from 'react';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/aura/card';
import { Progress } from '@/components/ui/aura/progress';
import { cn } from '@/lib/utils';

export type ArtifactProgressProps = ComponentProps<typeof Card>;

export const ArtifactProgress = ({
  className,
  ...props
}: ArtifactProgressProps) => {
  return <Card className={cn(className)} {...props} />;
};

export type ArtifactProgressHeaderProps = ComponentProps<typeof CardHeader>;

export const ArtifactProgressHeader = ({
  className,
  ...props
}: ArtifactProgressHeaderProps) => {
  return <CardHeader className={cn(className)} {...props} />;
};

export type ArtifactProgressTitleProps = ComponentProps<typeof CardTitle>;

export const ArtifactProgressTitle = ({
  className,
  ...props
}: ArtifactProgressTitleProps) => {
  return (
    <CardTitle
      className={cn('text-base font-medium tracking-tighter', className)}
      {...props}
    />
  );
};

export type ArtifactProgressDescriptionProps = ComponentProps<
  typeof CardDescription
>;

export const ArtifactProgressDescription = ({
  className,
  ...props
}: ArtifactProgressDescriptionProps) => {
  return (
    <CardDescription
      className={cn(
        'text-sm font-medium leading-4.5 tracking-tight text-muted-foreground',
        className
      )}
      {...props}
    />
  );
};

export type ArtifactProgressContentProps = ComponentProps<typeof Progress>;

export const ArtifactProgressContent = ({
  value,
  className,
  'aria-label': ariaLabel = 'Progress',
  ...props
}: ArtifactProgressContentProps) => {
  return (
    <div
      className={cn(
        'px-4 py-4.5 w-full flex items-center justify-between gap-2',
        className
      )}
    >
      <Progress value={value} aria-label={ariaLabel} {...props} />
      <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
        {value}%
      </span>
    </div>
  );
};

export type ArtifactProgressFooterProps = ComponentProps<typeof CardFooter>;

export const ArtifactProgressFooter = ({
  className,
  ...props
}: ArtifactProgressFooterProps) => {
  return <CardFooter className={cn('text-sm', className)} {...props} />;
};
