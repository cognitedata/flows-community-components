import { cn } from "@/lib/utils";
import { IconBrain } from "@tabler/icons-react";
import { Children, type ComponentProps, createContext, useContext } from "react";

const ReasoningDecorationsContext = createContext<boolean>(true);
const useReasoningDecorations = () => useContext(ReasoningDecorationsContext);

export type ReasoningProps = ComponentProps<"div">;

export const Reasoning = ({ className, children, ...props }: ReasoningProps) => (
  <div className={cn("relative flex w-full flex-col gap-2 not-prose", className)} {...props}>
    {children}
  </div>
);

export type ReasoningHeaderProps = ComponentProps<"div"> & {
  title?: string;
};

export const ReasoningHeader = ({
  className,
  title = "Reasoning",
  children,
  ...props
}: ReasoningHeaderProps) => (
  <div
    className={cn(
      "flex items-center gap-2 text-base leading-5 tracking-tighter text-muted-foreground",
      className
    )}
    {...props}
  >
    <IconBrain className="size-4 shrink-0" />
    {children ?? <span>{title}</span>}
  </div>
);

export type ReasoningContentProps = ComponentProps<"div">;

export const ReasoningContent = ({ className, children, ...props }: ReasoningContentProps) => (
  <ReasoningDecorationsContext.Provider
    value={Children.toArray(children).filter(Boolean).length > 1}
  >
    <ReasoningContentInner className={className} {...props}>
      {children}
    </ReasoningContentInner>
  </ReasoningDecorationsContext.Provider>
);

const ReasoningContentInner = ({ className, children, ...props }: ReasoningContentProps) => (
  <div className={cn("relative flex flex-col gap-0 pl-3.75", className)} {...props}>
    {children}
  </div>
);

export type ReasoningItemProps = ComponentProps<"div">;

export const ReasoningItem = ({ className, children, ...props }: ReasoningItemProps) => {
  const showDecorations = useReasoningDecorations();

  return (
    <div
      className={cn(
        "relative",
        showDecorations && [
          // Dot using ::before
          "before:absolute before:-left-2.5 before:top-3.75 before:z-10 before:size-1.25 before:rounded-full before:bg-border",
          // Vertical line segment using ::after
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
};
