import { IconSelector as ChevronsUpDown } from '@tabler/icons-react';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';

import type { ToolUIPart } from '../../../../lib/ai/types';
import { cn } from '../../../../lib/utils';
import { Badge } from '../badge';
import { Button } from '../button';
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '../code-block';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';

type ToolProps = ComponentProps<typeof Collapsible>;

const Tool = forwardRef<ComponentRef<typeof Collapsible>, ToolProps>(
  ({ className, ...props }, ref) => (
    <Collapsible
      ref={ref}
      data-slot="tool"
      className={cn(
        'group not-prose w-full bg-background rounded-md flex flex-col gap-2',
        className
      )}
      {...props}
    />
  )
);
Tool.displayName = 'Tool';

type ToolHeaderProps = Omit<
  ComponentProps<typeof CollapsibleTrigger>,
  'type'
> & {
  title?: string;
  type: ToolUIPart['type'];
  hasError?: boolean;
};

const ToolHeader = forwardRef<
  ComponentRef<typeof CollapsibleTrigger>,
  ToolHeaderProps
>(({ className, title, type, hasError = false, ...props }, ref) => (
  <CollapsibleTrigger
    ref={ref}
    data-slot="tool-header"
    className={className}
    render={
      <Button
        variant="ghost"
        className="w-full justify-between text-base leading-5 tracking-tighter"
      >
        <span>{title ?? type.split('-').slice(1).join('-')}</span>
        <div className="flex items-center gap-2">
          {hasError ? (
            <Badge
              outline
              className="bg-background text-destructive-foreground border-border"
            >
              Error
            </Badge>
          ) : null}
          <ChevronsUpDown className="h-4 w-4" />
        </div>
      </Button>
    }
    {...props}
  />
));
ToolHeader.displayName = 'ToolHeader';

type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

const ToolContent = forwardRef<
  ComponentRef<typeof CollapsibleContent>,
  ToolContentProps
>(({ className, ...props }, ref) => (
  <CollapsibleContent
    ref={ref}
    data-slot="tool-content"
    className={cn(
      'flex flex-col gap-4 py-3 text-popover-foreground outline-none',
      className
    )}
    {...props}
  />
));
ToolContent.displayName = 'ToolContent';

type ToolInputProps = ComponentProps<'div'> & {
  input: ToolUIPart['input'];
};

const ToolInput = forwardRef<HTMLDivElement, ToolInputProps>(
  ({ className, input, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="tool-input"
      className={cn('space-y-2 overflow-hidden px-3.25', className)}
      {...props}
    >
      <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Parameters
      </h4>
      <div className="rounded-md bg-muted/50">
        <CodeBlock
          code={JSON.stringify(input, null, 2)}
          language="json"
          collapsed
        >
          <CodeBlockCopyButton />
          <CodeBlockCollapseButton />
        </CodeBlock>
      </div>
    </div>
  )
);
ToolInput.displayName = 'ToolInput';

type ToolOutputProps = ComponentProps<'div'> & {
  output: ToolUIPart['output'];
  errorText: ToolUIPart['errorText'];
};

const ToolOutput = forwardRef<HTMLDivElement, ToolOutputProps>(
  ({ className, output, errorText, ...props }, ref) => {
    if (!(output || errorText)) {
      return null;
    }

    let outputElement: ReactNode = null;
    if (typeof output === 'string') {
      outputElement = (
        <CodeBlock code={output} language="json" collapsed>
          <CodeBlockCopyButton />
          <CodeBlockCollapseButton />
        </CodeBlock>
      );
    } else if (output === null || output === undefined) {
      outputElement = null;
    } else if (typeof output === 'object') {
      outputElement = (
        <CodeBlock
          code={JSON.stringify(output, null, 2)}
          language="json"
          collapsed
        >
          <CodeBlockCopyButton />
          <CodeBlockCollapseButton />
        </CodeBlock>
      );
    } else if (
      typeof output === 'number' ||
      typeof output === 'boolean' ||
      typeof output === 'bigint'
    ) {
      outputElement = (
        <CodeBlock code={String(output)} language="json" collapsed>
          <CodeBlockCopyButton />
          <CodeBlockCollapseButton />
        </CodeBlock>
      );
    }

    if (errorText) {
      return (
        <div
          ref={ref}
          data-slot="tool-output"
          className={cn('space-y-2 px-3.25', className)}
          {...props}
        >
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-destructive-foreground">
              ERROR
            </span>
            <span className="text-foreground">{errorText}</span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="tool-output"
        className={cn('space-y-2 px-3.25', className)}
        {...props}
      >
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Result
        </h4>
        <div className="overflow-x-auto rounded-md bg-muted/50 text-xs text-foreground [&_table]:w-full">
          {outputElement}
        </div>
      </div>
    );
  }
);
ToolOutput.displayName = 'ToolOutput';

export { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput };
