import {
  Children,
  type ComponentProps,
  type ComponentRef,
  createContext,
  forwardRef,
  useContext,
} from "react";

import { cn } from "@/lib/utils";
import { IconBrain } from "@tabler/icons-react";

const ReasoningDecorationsContext = createContext<boolean>(true);
const useReasoningDecorations = () => useContext(ReasoningDecorationsContext);

type ReasoningProps = ComponentProps<"div">;

const Reasoning = forwardRef<ComponentRef<"div">, ReasoningProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="reasoning"
      className={cn("relative flex w-full flex-col gap-2 not-prose", className)}
      {...props}
    >
      {children}
    </div>
  )
);
Reasoning.displayName = "Reasoning";

type ReasoningHeaderProps = ComponentProps<"div"> & {
  title?: string;
};

const ReasoningHeader = forwardRef<ComponentRef<"div">, ReasoningHeaderProps>(
  ({ className, title = "Reasoning", children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="reasoning-header"
      className={cn(
        "flex items-center gap-2 text-base leading-5 tracking-tighter text-muted-foreground",
        className
      )}
      {...props}
    >
      <IconBrain className="size-4 shrink-0" />
      {children ?? <span>{title}</span>}
    </div>
  )
);
ReasoningHeader.displayName = "ReasoningHeader";

type ReasoningContentProps = ComponentProps<"div">;

const ReasoningContent = forwardRef<ComponentRef<"div">, ReasoningContentProps>(
  ({ className, children, ...props }, ref) => (
    <ReasoningDecorationsContext.Provider
      value={Children.toArray(children).filter(Boolean).length > 1}
    >
      <ReasoningContentInner ref={ref} className={className} {...props}>
        {children}
      </ReasoningContentInner>
    </ReasoningDecorationsContext.Provider>
  )
);
ReasoningContent.displayName = "ReasoningContent";

const ReasoningContentInner = forwardRef<ComponentRef<"div">, ReasoningContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="reasoning-content-inner"
      className={cn("relative flex flex-col gap-0 pl-4", className)}
      {...props}
    >
      {children}
    </div>
  )
);
ReasoningContentInner.displayName = "ReasoningContentInner";

type ReasoningItemProps = ComponentProps<"div">;

const ReasoningItem = forwardRef<ComponentRef<"div">, ReasoningItemProps>(
  ({ className, children, ...props }, ref) => {
    const showDecorations = useReasoningDecorations();

    return (
      <div
        ref={ref}
        data-slot="reasoning-item"
        className={cn(
          "relative",
          showDecorations && [
            "before:absolute before:-left-2.75 before:top-4 before:z-10 before:size-1.75 before:rounded-full before:bg-border",
            "after:absolute after:-left-2 after:top-0 after:bottom-0 after:w-px after:bg-border",
            "first:after:top-4",
            "last:after:bottom-auto last:after:h-4",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ReasoningItem.displayName = "ReasoningItem";

export { Reasoning, ReasoningContent, ReasoningHeader, ReasoningItem };
