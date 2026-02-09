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
import type { ToolUIPart } from "@/lib/ai/types";
import { cn } from "@/lib/utils";
import { IconSelector as ChevronsUpDown } from "@tabler/icons-react";
import type { ComponentProps, ComponentRef, ReactNode } from "react";
import { forwardRef, isValidElement } from "react";

type ToolProps = ComponentProps<typeof Collapsible>;

const Tool = forwardRef<ComponentRef<typeof Collapsible>, ToolProps>(
  ({ className, ...props }, ref) => (
    <Collapsible
      ref={ref}
      data-slot="tool"
      className={cn(
        "group not-prose w-full bg-background rounded-md flex flex-col gap-2",
        className
      )}
      {...props}
    />
  )
);
Tool.displayName = "Tool";

type ToolHeaderProps = Omit<ComponentProps<typeof CollapsibleTrigger>, "type"> & {
  title?: string;
  type: ToolUIPart["type"];
};

const ToolHeader = forwardRef<ComponentRef<typeof CollapsibleTrigger>, ToolHeaderProps>(
  ({ className, title, type, ...props }, ref) => (
    <CollapsibleTrigger ref={ref} data-slot="tool-header" className={className} {...props} asChild>
      <Button
        variant="ghost"
        className="w-full justify-between text-base leading-5 tracking-tighter"
      >
        <span>{title ?? type.split("-").slice(1).join("-")}</span>
        <ChevronsUpDown className="h-4 w-4" />
      </Button>
    </CollapsibleTrigger>
  )
);
ToolHeader.displayName = "ToolHeader";

type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

const ToolContent = forwardRef<ComponentRef<typeof CollapsibleContent>, ToolContentProps>(
  ({ className, ...props }, ref) => (
    <CollapsibleContent
      ref={ref}
      data-slot="tool-content"
      className={cn("flex flex-col gap-4 py-3 text-popover-foreground outline-none", className)}
      {...props}
    />
  )
);
ToolContent.displayName = "ToolContent";

type ToolInputProps = ComponentProps<"div"> & {
  input: ToolUIPart["input"];
};

const ToolInput = forwardRef<HTMLDivElement, ToolInputProps>(
  ({ className, input, ...props }, ref) => (
    <div
      ref={ref}
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
  )
);
ToolInput.displayName = "ToolInput";

type ToolOutputProps = ComponentProps<"div"> & {
  output: ToolUIPart["output"];
  errorText: ToolUIPart["errorText"];
};

const ToolOutput = forwardRef<HTMLDivElement, ToolOutputProps>(
  ({ className, output, errorText, ...props }, ref) => {
    if (!(output || errorText)) {
      return null;
    }

    const codeContent =
      typeof output === "object" && !isValidElement(output)
        ? JSON.stringify(output, null, 2)
        : typeof output === "string"
          ? output
          : undefined;

    const outputElement = codeContent ? (
      <CodeBlock code={codeContent} language="json" collapsed>
        <CodeBlockCopyButton />
        <CodeBlockCollapseButton />
      </CodeBlock>
    ) : (
      <div>{output as ReactNode}</div>
    );

    return (
      <div
        ref={ref}
        data-slot="tool-output"
        className={cn("space-y-2 px-3.25", className)}
        {...props}
      >
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {errorText ? "Error" : "Result"}
        </h4>
        <div
          className={cn(
            "overflow-x-auto rounded-md text-xs [&_table]:w-full",
            errorText ? "bg-destructive/10 text-destructive" : "bg-muted/50 text-foreground"
          )}
        >
          {errorText && <div>{errorText}</div>}
          {outputElement}
        </div>
      </div>
    );
  }
);
ToolOutput.displayName = "ToolOutput";

export { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput };
