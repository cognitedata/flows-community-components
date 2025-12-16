import * as React from 'react';
import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { Input } from '@/components/ui/aura/input';
import { Label } from '@/components/ui/aura/label';
import { Badge } from '@/components/ui/aura/badge';
import { Separator } from '@/components/ui/aura/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/aura/tabs';
import { cn } from '@/common/utils';

// Code block component for syntax highlighting
function CodeBlock({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg bg-muted px-4 py-3 text-sm',
        className
      )}
      {...props}
    >
      <code>{children}</code>
    </pre>
  );
}

// Inline code component
function InlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium',
        className
      )}
      {...props}
    />
  );
}

// Component preview wrapper
function ComponentPreview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border bg-background p-8 mb-6',
        className
      )}
    >
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, any>;

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Headings
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          'font-heading mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        className={cn(
          'font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3
        className={cn(
          'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4
        className={cn(
          'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h5
        className={cn(
          'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6
        className={cn(
          'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
          className
        )}
        {...props}
      />
    ),
    // Text elements
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
      <li className={cn('mt-2', className)} {...props} />
    ),
    // Code
    pre: CodeBlock,
    code: InlineCode,
    // Tables
    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn('w-full', className)} {...props} />
      </div>
    ),
    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr
        className={cn('m-0 border-t p-0 even:bg-muted', className)}
        {...props}
      />
    ),
    th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th
        className={cn(
          'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td
        className={cn(
          'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    // Blockquote
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote
        className={cn('mt-6 border-l-2 pl-6 italic', className)}
        {...props}
      />
    ),
    // Links
    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <a
        className={cn('font-medium underline underline-offset-4', className)}
        {...props}
      />
    ),
    // Custom components
    ComponentPreview,
    // UI Components (for live examples)
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    Label,
    Badge,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    ...components,
  };
}
