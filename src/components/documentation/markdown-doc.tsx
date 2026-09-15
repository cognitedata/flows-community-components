import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import * as React from 'react';
import type { Components } from 'react-markdown';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn, slugify } from '@/lib/utils';

const AURA_README_URL = 'https://www.npmjs.com/package/@cognite/aura';

const HIGHLIGHT_LANGUAGES = [
  'bash',
  'css',
  'js',
  'json',
  'jsx',
  'md',
  'sh',
  'ts',
  'tsx',
  'typescript',
  'javascript',
  'yaml',
  'yml',
] as const;

function flattenText(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return String(child);
      }
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return flattenText(child.props.children);
      }
      return '';
    })
    .join('');
}

function resolveMarkdownHref(href: string): string {
  if (href === './README.md' || href === 'README.md') {
    return AURA_README_URL;
  }
  return href;
}

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

function highlightLanguage(
  value: string | undefined
): (typeof HIGHLIGHT_LANGUAGES)[number] | null {
  if (!value) return null;
  const normalized = value === 'yml' ? 'yaml' : value;
  for (const language of HIGHLIGHT_LANGUAGES) {
    if (language === normalized) return language;
  }
  return null;
}

function PlainCodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-muted-bg p-4 font-mono text-xs leading-relaxed text-foreground">
      <code>{code}</code>
    </pre>
  );
}

const markdownComponents: Components = {
  h2({ children }) {
    const id = slugify(flattenText(children));
    return (
      <h2
        id={id}
        className="mt-12 font-heading text-xl font-semibold tracking-tight text-foreground first:mt-0 sm:mt-14 sm:text-2xl"
      >
        {children}
      </h2>
    );
  },
  h3({ children }) {
    const id = slugify(flattenText(children));
    return (
      <h3 id={id} className="text-sm font-semibold text-foreground">
        {children}
      </h3>
    );
  },
  h4({ children }) {
    const id = slugify(flattenText(children));
    return (
      <h4
        id={id}
        className="mt-6 font-heading text-base font-semibold tracking-tight text-foreground"
      >
        {children}
      </h4>
    );
  },
  p({ children }) {
    return <p className="max-w-[70ch]">{children}</p>;
  },
  strong({ children }) {
    return <strong className="font-medium text-foreground">{children}</strong>;
  },
  a({ href, children }) {
    if (!href) return <span>{children}</span>;
    const resolved = resolveMarkdownHref(href);
    const external = isExternalHref(resolved);
    return (
      <a
        href={resolved}
        className="text-link-fg hover:text-link-fg-hover hover:underline"
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : undefined)}
      >
        {children}
      </a>
    );
  },
  ul({ className, children }) {
    const isTaskList = className?.includes('contains-task-list');
    return (
      <ul
        className={cn(
          'max-w-[70ch] space-y-1.5',
          isTaskList ? 'list-none pl-0' : 'list-disc pl-5'
        )}
      >
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol className="max-w-[70ch] list-decimal space-y-1.5 pl-5">{children}</ol>
    );
  },
  li({ children }) {
    return <li>{children}</li>;
  },
  hr() {
    return <hr className="border-border" />;
  },
  blockquote({ children }) {
    return (
      <blockquote className="max-w-[70ch] border-l-2 border-border pl-4 text-muted-fg">
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return <thead>{children}</thead>;
  },
  tbody({ children }) {
    return <tbody>{children}</tbody>;
  },
  tr({ children }) {
    return (
      <tr className="border-b border-border last:border-b-0">{children}</tr>
    );
  },
  th({ children }) {
    return (
      <th className="bg-muted-bg px-4 py-2.5 text-xs font-medium tracking-wide text-medium-fg uppercase">
        {children}
      </th>
    );
  },
  td({ children }) {
    return <td className="px-4 py-2.5 align-top text-muted-fg">{children}</td>;
  },
  pre({ children }) {
    return <div className="max-w-full">{children}</div>;
  },
  code({ className, children }) {
    const languageMatch = /language-([A-Za-z0-9_-]+)/.exec(className ?? '');
    const value = String(children).replace(/\n$/, '');
    const isBlock = Boolean(languageMatch) || value.includes('\n');
    if (!isBlock) {
      return <code>{children}</code>;
    }
    const language = highlightLanguage(languageMatch?.[1]);
    if (language) {
      return (
        <CodeBlock code={value} language={language}>
          <CodeBlockCopyButton />
        </CodeBlock>
      );
    }
    return <PlainCodeBlock code={value} />;
  },
  input({ type, checked }) {
    if (type !== 'checkbox') return null;
    return (
      <input
        type="checkbox"
        checked={Boolean(checked)}
        disabled
        className="mr-2 align-middle"
        readOnly
      />
    );
  },
};

export function MarkdownDoc({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'space-y-4 text-sm leading-relaxed text-muted-fg',
        className
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </Markdown>
    </div>
  );
}
