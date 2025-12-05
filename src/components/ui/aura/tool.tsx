'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/aura/collapsible';
import { cn } from '@/common/utils';
import type { ToolUIPart } from 'ai';
import { IconChevronDown } from '@tabler/icons-react';
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
    className={cn(
      'group not-prose mb-4 w-full  bg-background rounded-md',
      className
    )}
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
  <CollapsibleTrigger
    className={cn(
      'w-full h-9 flex items-center justify-between rounded-md px-3 py-2.25 hover:bg-accent',
      className
    )}
    {...props}
  >
    <div className="flex items-center gap-2">
      <span className="font-normal text-base leading-5 tracking-tightest">
        {title ?? type.split('-').slice(1).join('-')}
      </span>
    </div>
    <IconChevronDown className="size-4 text-foreground transition-transform group-data-[state=open]:rotate-180" />
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
  <div className={cn('space-y-2 overflow-hidden p-4', className)} {...props}>
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

  if (typeof output === 'object' && !isValidElement(output)) {
    Output = (
      <CodeBlock code={JSON.stringify(output, null, 2)} language="json">
        <CodeBlockCopyButton />
        <CodeBlockCollapseButton />
      </CodeBlock>
    );
  } else if (typeof output === 'string') {
    Output = <CodeBlock code={output} language="json" />;
  }

  return (
    <div className={cn('space-y-2 p-4', className)} {...props}>
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
