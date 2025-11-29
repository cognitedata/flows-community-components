import * as React from 'react';
import { cn } from '@/common/utils';

function TypographyH1({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyH2({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyH3({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyH4({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyH5({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        'scroll-m-20 text-lg font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyH6({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h6
      className={cn(
        'scroll-m-20 text-base font-medium tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyP({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-base font-normal text-foreground leading-7', className)}
      {...props}
    />
  );
}

function TypographyBlockquote({
  className,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-border pl-6 italic text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyList({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        'my-6 ml-6 list-disc [&>li]:mt-2 text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyOrderedList({
  className,
  ...props
}: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal [&>li]:mt-2 text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyListItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn('text-base leading-7', className)} {...props} />;
}

function TypographyInlineCode({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground',
        className
      )}
      {...props}
    />
  );
}

function TypographyLead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-xl font-normal text-muted-foreground', className)}
      {...props}
    />
  );
}

function TypographyLarge({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-lg font-medium text-foreground', className)}
      {...props}
    />
  );
}

function TypographySmall({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn('text-sm font-normal text-muted-foreground', className)}
      {...props}
    />
  );
}

function TypographyMuted({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm font-normal text-muted-foreground', className)}
      {...props}
    />
  );
}

function TypographyHr({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('my-8 border-border', className)} {...props} />;
}

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyOrderedList,
  TypographyListItem,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyHr,
};

