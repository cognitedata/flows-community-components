import { cn } from '@/lib/utils';

export function NameOnlyCard({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-muted-bg px-4 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-medium-bg',
        className
      )}
    >
      {name}
    </div>
  );
}
