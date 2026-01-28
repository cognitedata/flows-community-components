import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";

import { IconSelector as ChevronsUpDown } from "@tabler/icons-react";
import type { ToolUIPart } from "ai";

import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from "@/components/ui/aura/code-block";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/aura/collapsible";
import { cn } from "@/lib/utils";

type ToolProps = ComponentProps<typeof Collapsible>;

const Tool = ({ className, ...props }: ToolProps) => (
  <Collapsible
    data-slot="tool"
    className={cn("group not-prose w-full bg-background rounded-md flex flex-col gap-2", className)}
    {...props}
  />
);

type ToolHeaderProps = {
  title?: string;
  type: ToolUIPart["type"];
  className?: string;
  hasError?: boolean;
};

const ToolHeader = ({ className, title, type, hasError, ...props }: ToolHeaderProps) => (
  <CollapsibleTrigger className={className} {...props} asChild>
    <Button
      data-slot="tool-trigger"
      variant="ghost"
      className="w-full justify-between text-base leading-5 tracking-tighter"
    >
      <span>{title ?? type.split("-").slice(1).join("-")}</span>
      <div className="flex items-center gap-2">
        {hasError && (
          <Badge outline className="text-destructive-foreground border-border bg-background">
            Error
          </Badge>
        )}
        <ChevronsUpDown aria-hidden="true" className="h-4 w-4" />
      </div>
    </Button>
  </CollapsibleTrigger>
);

type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

const ToolContent = ({ className, ...props }: ToolContentProps) => (
  <CollapsibleContent
    data-slot="tool-content"
    className={cn("flex flex-col gap-4 py-3 text-popover-foreground outline-none", className)}
    {...props}
  />
);

type ToolInputProps = ComponentProps<"div"> & {
  input: ToolUIPart["input"];
};

const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
  <div
    data-slot="tool-input"
    className={cn("space-y-2 overflow-hidden px-3.25", className)}
    {...props}
  >
    <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
      Parameters
    </h4>
    <div className="rounded-md bg-muted/50">
      <CodeBlock code={JSON.stringify(input, null, 2)} language="json" collapsed>
        <CodeBlockCopyButton />
        <CodeBlockCollapseButton />
      </CodeBlock>
    </div>
  </div>
);

type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
};

const ToolOutput = ({ className, output, errorText, ...props }: ToolOutputProps) => {
  if (!(output || errorText)) {
    return null;
  }

  let Output = <div>{output as ReactNode}</div>;

  const codeContent =
    typeof output === "object" && !isValidElement(output)
      ? JSON.stringify(output, null, 2)
      : typeof output === "string"
        ? output
        : undefined;

  if (codeContent) {
    Output = (
      <CodeBlock code={codeContent} language="json" collapsed>
        <CodeBlockCopyButton />
        <CodeBlockCollapseButton />
      </CodeBlock>
    );
  }

  if (errorText) {
    return (
      <div data-slot="tool-output" className={cn("space-y-2 px-3.25", className)} {...props}>
        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-destructive-foreground">ERROR</span>
          <span className="text-foreground">{errorText}</span>
        </div>
      </div>
    );
  }

  return (
    <div data-slot="tool-output" className={cn("space-y-2 px-3.25", className)} {...props}>
      <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Result</h4>
      <div className="overflow-x-auto rounded-md bg-muted/50 text-xs text-foreground [&_table]:w-full">
        {Output}
      </div>
    </div>
  );
};

export type { ToolProps, ToolHeaderProps, ToolContentProps, ToolInputProps, ToolOutputProps };
export { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput };
