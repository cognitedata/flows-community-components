'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/aura/collapsible';
import { cn } from '@/common/utils';
import type { ToolUIPart } from 'ai';
import { IconSelector as ChevronsUpDown } from '@tabler/icons-react';
import { Button } from '@/components/ui/aura/button';
import type { ComponentProps, ReactNode } from 'react';
import { isValidElement } from 'react';
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from './code-block';

export type ToolProps = ComponentProps<typeof Collapsible>;

export const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible
    className={cn('group not-prose w-full bg-background rounded-md', className)}
    {...props}
  />
);

export type ToolHeaderProps = {
  title?: string;
  type: ToolUIPart['type'];
  className?: string;
};

export const ToolHeader = ({
  className,
  title,
  type,
  ...props
}: ToolHeaderProps) => (
  <CollapsibleTrigger className={className} {...props} asChild>
    <Button variant="ghost" className="text-base leading-5 tracking-tighter">
      <span>{title ?? type.split('-').slice(1).join('-')}</span>
      <ChevronsUpDown className="h-4 w-4" />
    </Button>
  </CollapsibleTrigger>
);

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    className={cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      className
    )}
    {...props}
  />
);

export type ToolInputProps = ComponentProps<'div'> & {
  input: ToolUIPart['input'];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div
    className={cn('space-y-2 overflow-hidden py-3.25', className)}
    {...props}
  >
    <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
      Parameters
    </h4>
    <div className="rounded-md bg-muted/50">
      <CodeBlock code={JSON.stringify(input, null, 2)} language="json">
        <CodeBlockCopyButton />
        <CodeBlockCollapseButton />
      </CodeBlock>
    </div>
  </div>
);

export type ToolOutputProps = ComponentProps<'div'> & {
  output: ToolUIPart['output'];
  errorText: ToolUIPart['errorText'];
};

export const ToolOutput = ({
  className,
  output,
  errorText,
  ...props
}: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  const codeContent =
    typeof output === 'object' && !isValidElement(output)
      ? JSON.stringify(output, null, 2)
      : typeof output === 'string'
        ? output
        : undefined;

  if (codeContent) {
    Output = (
      <CodeBlock code={codeContent} language="json">
        <CodeBlockCopyButton />
        <CodeBlockCollapseButton />
      </CodeBlock>
    );
  }

  return (
    <div className={cn('space-y-2 py-3.25', className)} {...props}>
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {errorText ? 'Error' : 'Result'}
      </h4>
      <div
        className={cn(
          'overflow-x-auto rounded-md text-xs [&_table]:w-full',
          errorText
            ? 'bg-destructive/10 text-destructive'
            : 'bg-muted/50 text-foreground'
        )}
      >
        {errorText && <div>{errorText}</div>}
        {Output}
      </div>
    </div>
  );
};
