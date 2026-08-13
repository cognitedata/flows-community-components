'use client';

import { cn } from '@/lib/utils';

export interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center gap-0.5 rounded-lg bg-medium-bg p-0.5',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
            value === option.value
              ? 'bg-base-bg text-foreground shadow-sm'
              : 'text-muted-fg hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
