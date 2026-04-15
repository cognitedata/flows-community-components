import type {
  AnchorHTMLAttributes,
  ComponentPropsWithoutRef,
  HTMLAttributes,
  ReactNode,
} from 'react';
import { isValidElement } from 'react';

import { cn } from '@/lib/utils';

type CodeElementProps = {
  children?: ReactNode;
};

function FoundationMdxH1(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      className={cn(
        'max-w-4xl mx-auto mt-0 mb-2 scroll-m-20 text-xl font-medium tracking-tightest',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxH2(props: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className={cn(
        'max-w-4xl mx-auto mt-4 mb-1 scroll-m-20 text-lg font-medium tracking-tightest',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxH3(props: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      className={cn(
        'max-w-4xl mx-auto mt-4 mb-1 scroll-m-20 text-base font-medium tracking-tighter',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxH4(props: ComponentPropsWithoutRef<'h4'>) {
  return (
    <h4
      className={cn(
        'max-w-4xl mx-auto mt-2 mb-0 scroll-m-20 text-sm font-medium tracking-normal',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxP(props: ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn(
        'max-w-4xl mx-auto mt-2 mb-3 text-base font-normal leading-7 tracking-tightest',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxStrong(props: ComponentPropsWithoutRef<'strong'>) {
  return <strong className={cn('font-medium', props.className)} {...props} />;
}

function FoundationMdxEm(props: ComponentPropsWithoutRef<'em'>) {
  return <em className={cn('italic', props.className)} {...props} />;
}

function FoundationMdxUl(props: ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul
      className={cn(
        'max-w-4xl mx-auto ml-8.25 mb-3 pt-2 pl-0 pb-0 list-disc text-base font-normal tracking-tightest',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxOl(props: ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol
      className={cn(
        'max-w-4xl mx-auto ml-8.25 mb-3 pt-2 pl-0 pb-0 list-decimal text-base font-normal tracking-tightest',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxLi(props: ComponentPropsWithoutRef<'li'>) {
  return <li className={cn('py-0', props.className)} {...props} />;
}

function FoundationMdxBlockquote(
  props: ComponentPropsWithoutRef<'blockquote'>
) {
  return (
    <blockquote
      className={cn(
        'max-w-4xl mx-auto my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxHr(props: ComponentPropsWithoutRef<'hr'>) {
  return (
    <div className="max-w-4xl mx-auto">
      <hr className={cn('my-4 border-border', props.className)} {...props} />
    </div>
  );
}

function FoundationMdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'text-foreground-link no-underline hover:underline underline-offset-4',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxTable(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="max-w-4xl mx-auto my-6 overflow-x-auto">
      <table className={cn('w-full', props.className)} {...props} />
    </div>
  );
}

function FoundationMdxThead(props: ComponentPropsWithoutRef<'thead'>) {
  return <thead {...props} />;
}

function FoundationMdxTbody(props: ComponentPropsWithoutRef<'tbody'>) {
  return <tbody {...props} />;
}

function FoundationMdxTr(props: ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', props.className)}
      {...props}
    />
  );
}

function FoundationMdxTh(props: ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      className={cn('border px-4 py-2 text-left font-bold', props.className)}
      {...props}
    />
  );
}

function FoundationMdxTd(props: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      className={cn('border px-4 py-2 text-left', props.className)}
      {...props}
    />
  );
}

function FoundationMdxInlineCode(props: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold',
        props.className
      )}
      {...props}
    />
  );
}

function FoundationMdxPre(props: HTMLAttributes<HTMLPreElement>) {
  const children = props.children;
  let content: ReactNode = children;

  if (isValidElement<CodeElementProps>(children)) {
    content = children.props.children;
  }

  return (
    <div className="max-w-4xl mx-auto my-4 overflow-x-auto rounded-md border border-border bg-background">
      <pre
        className={cn(
          'p-4 font-mono text-sm leading-6 text-foreground',
          props.className
        )}
      >
        <code>{content}</code>
      </pre>
    </div>
  );
}

export const foundationMdxComponents = {
  h1: FoundationMdxH1,
  h2: FoundationMdxH2,
  h3: FoundationMdxH3,
  h4: FoundationMdxH4,
  p: FoundationMdxP,
  strong: FoundationMdxStrong,
  em: FoundationMdxEm,
  ul: FoundationMdxUl,
  ol: FoundationMdxOl,
  li: FoundationMdxLi,
  blockquote: FoundationMdxBlockquote,
  hr: FoundationMdxHr,
  a: FoundationMdxLink,
  table: FoundationMdxTable,
  thead: FoundationMdxThead,
  tbody: FoundationMdxTbody,
  tr: FoundationMdxTr,
  th: FoundationMdxTh,
  td: FoundationMdxTd,
  code: FoundationMdxInlineCode,
  pre: FoundationMdxPre,
};
