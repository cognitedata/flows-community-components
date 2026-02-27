import type { ComponentProps } from 'react';

import { cn } from '../../../../lib/utils';

const getTitleFromChildren = (children: ComponentProps<'td'>['children']) => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  return undefined;
};

function Table({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto border-y bg-default"
    >
      <table
        data-slot="table"
        className={cn('w-full table-fixed caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('bg-muted/40 [&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        '[&_tr:nth-child(even)]:bg-muted [&_tr:last-child]:border-0',
        className
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  children,
  title,
  ...props
}: ComponentProps<'th'>) {
  const resolvedTitle = title ?? getTitleFromChildren(children);

  return (
    <th
      data-slot="table-head"
      title={resolvedTitle}
      className={cn(
        'text-primary h-9 px-3 text-left align-middle text-sm font-medium truncate [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

function TableCell({
  className,
  children,
  title,
  ...props
}: ComponentProps<'td'>) {
  const resolvedTitle = title ?? getTitleFromChildren(children);

  return (
    <td
      data-slot="table-cell"
      title={resolvedTitle}
      className={cn(
        'h-11 px-3 text-sm font-normal align-middle truncate [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
