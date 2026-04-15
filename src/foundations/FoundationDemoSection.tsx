import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type FoundationDemoSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  fullWidth?: boolean;
};

export function FoundationDemoSection({
  title,
  description,
  children,
  fullWidth = false,
}: FoundationDemoSectionProps) {
  return (
    <section
      className={cn(
        'not-prose mt-10 border-t border-border pt-10 space-y-3',
        fullWidth ? 'w-full min-w-0' : 'max-w-4xl mx-auto w-full min-w-0'
      )}
    >
      <div className={cn(fullWidth && 'max-w-4xl mx-auto w-full min-w-0')}>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}
