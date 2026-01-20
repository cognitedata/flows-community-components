import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/aura/avatar";
import { Button } from "@/components/ui/aura/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/aura/button-group";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/aura/code-block";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/aura/tooltip";
import { cn } from "@/lib/utils";
import type { FileUIPart, UIMessage } from "ai";
import { IconChevronLeft, IconChevronRight, IconPaperclip, IconX } from "@tabler/icons-react";
import type { ComponentProps, HTMLAttributes, ReactElement, ReactNode } from "react";
import {
  createContext,
  isValidElement,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { BundledLanguage } from "shiki";
import { Streamdown } from "streamdown";

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  isResponse?: boolean;
};

export const Message = ({ className, isResponse = false, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-start justify-start gap-3 py-2 mb-0",
      isResponse ? "is-assistant items-start" : "is-user flex-row-reverse",
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({ children, className, ...props }: MessageContentProps) => (
  <div
    className={cn(
      "is-user:dark flex flex-col gap-1 overflow-hidden rounded-md text-base leading-tight tracking-tightest",
      "max-w-[var(--message-content-max-width)]",
      "group-[.is-user]:bg-accent group-[.is-user]:p-2 group-[.is-user]:text-accent-foreground",
      "group-[.is-assistant]:text-foreground group-[.is-assistant]:pt-1",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Helper function to extract initials from a name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  avatarUrl?: string;
  name?: string;
};

export const MessageAvatar = ({
  avatarUrl,
  name,
  className,
  children,
  variant,
  sizes,
  ...props
}: MessageAvatarProps) => {
  const fallbackText = name ? getInitials(name) : "ME";

  return (
    <Avatar
      className={cn("size-7 group-[.is-user]:mt-1", className)}
      variant={variant}
      sizes={sizes}
      {...props}
    >
      {children || (
        <>
          {avatarUrl && <AvatarImage alt={name || ""} className="mt-0 mb-0" src={avatarUrl} />}
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </>
      )}
    </Avatar>
  );
};

export type MessageAvatarIconProps = ComponentProps<typeof AvatarIcon>;

export const MessageAvatarIcon = (props: MessageAvatarIconProps) => <AvatarIcon {...props} />;

export type MessageActionsProps = ComponentProps<"div">;

export const MessageActions = ({ className, children, ...props }: MessageActionsProps) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

export type MessageActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
};

export const MessageAction = ({
  tooltip,
  children,
  label,
  className,
  variant = "ghost",
  size = "sm",
  ...props
}: MessageActionProps) => {
  const button = (
    <Button
      className={cn("relative icon-sm text-muted-foreground hover:text-foreground", className)}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children}
      <span className="sr-only">{label || tooltip}</span>
    </Button>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

type MessageBranchContextType = {
  currentBranch: number;
  totalBranches: number;
  goToPrevious: () => void;
  goToNext: () => void;
  branches: ReactElement[];
  setBranches: (branches: ReactElement[]) => void;
};

const MessageBranchContext = createContext<MessageBranchContextType | null>(null);

const useMessageBranch = () => {
  const context = useContext(MessageBranchContext);

  if (!context) {
    throw new Error("MessageBranch components must be used within MessageBranch");
  }

  return context;
};

export type MessageBranchProps = HTMLAttributes<HTMLDivElement> & {
  defaultBranch?: number;
  onBranchChange?: (branchIndex: number) => void;
};

export const MessageBranch = ({
  defaultBranch = 0,
  onBranchChange,
  className,
  ...props
}: MessageBranchProps) => {
  const [currentBranch, setCurrentBranch] = useState(defaultBranch);
  const [branches, setBranches] = useState<ReactElement[]>([]);

  const handleBranchChange = (newBranch: number) => {
    setCurrentBranch(newBranch);
    onBranchChange?.(newBranch);
  };

  const goToPrevious = () => {
    const newBranch = currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
    handleBranchChange(newBranch);
  };

  const goToNext = () => {
    const newBranch = currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
    handleBranchChange(newBranch);
  };

  const contextValue: MessageBranchContextType = {
    currentBranch,
    totalBranches: branches.length,
    goToPrevious,
    goToNext,
    branches,
    setBranches,
  };

  return (
    <MessageBranchContext.Provider value={contextValue}>
      <div className={cn("grid w-full gap-2 [&>div]:pb-0", className)} {...props} />
    </MessageBranchContext.Provider>
  );
};

export type MessageBranchContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageBranchContent = ({ children, ...props }: MessageBranchContentProps) => {
  const { currentBranch, setBranches, branches } = useMessageBranch();
  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  // Use useEffect to update branches when they change
  useEffect(() => {
    if (branches.length !== childrenArray.length) {
      setBranches(childrenArray);
    }
  }, [childrenArray, branches, setBranches]);

  return childrenArray.map((branch, index) => (
    <div
      className={cn(
        "grid gap-2 overflow-hidden [&>div]:pb-0",
        index === currentBranch ? "block" : "hidden"
      )}
      key={branch.key}
      {...props}
    >
      {branch}
    </div>
  ));
};

export type MessageBranchSelectorProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const MessageBranchSelector = ({ ...props }: MessageBranchSelectorProps) => {
  const { totalBranches } = useMessageBranch();

  // Don't render if there's only one branch
  if (totalBranches <= 1) {
    return null;
  }

  return (
    <ButtonGroup
      className="[&>*:not(:first-child)]:rounded-l-md [&>*:not(:last-child)]:rounded-r-md"
      orientation="horizontal"
      {...props}
    />
  );
};

export type MessageBranchPreviousProps = ComponentProps<typeof Button>;

export const MessageBranchPrevious = ({ children, ...props }: MessageBranchPreviousProps) => {
  const { goToPrevious, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Previous branch"
      disabled={totalBranches <= 1}
      onClick={goToPrevious}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <IconChevronLeft size={14} />}
    </Button>
  );
};

export type MessageBranchNextProps = ComponentProps<typeof Button>;

export const MessageBranchNext = ({ children, ...props }: MessageBranchNextProps) => {
  const { goToNext, totalBranches } = useMessageBranch();

  return (
    <Button
      aria-label="Next branch"
      disabled={totalBranches <= 1}
      onClick={goToNext}
      size="icon-sm"
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <IconChevronRight size={14} />}
    </Button>
  );
};

export type MessageBranchPageProps = HTMLAttributes<HTMLSpanElement>;

export const MessageBranchPage = ({ className, ...props }: MessageBranchPageProps) => {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <ButtonGroupText
      className={cn("border-none bg-transparent text-muted-foreground shadow-none px-2", className)}
      {...props}
    >
      {currentBranch + 1}/{totalBranches}
    </ButtonGroupText>
  );
};

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

// Custom code component that uses Aura's CodeBlock for code blocks
type MessageResponseCodeProps = {
  className?: string;
  children?: ReactNode;
};

const MessageResponseCode = ({ className, children }: MessageResponseCodeProps) => {
  // Extract language from className (e.g., "language-typescript" -> "typescript")
  const languageMatch = className?.match(/language-(\w+)/);
  const language = languageMatch?.[1] as BundledLanguage | undefined;

  // Extract code text - Streamdown passes either a string or a single nested element
  let codeText = "";
  if (typeof children === "string") {
    codeText = children;
  } else if (isValidElement(children)) {
    const props = children.props as { children?: string };
    if (typeof props.children === "string") {
      codeText = props.children;
    }
  }

  // Check if this is a code block (has language) or inline code
  const isCodeBlock = !!language;

  if (isCodeBlock) {
    return (
      <CodeBlock
        code={codeText}
        language={language}
        className="my-4 rounded-md border border-border"
      >
        <CodeBlockCopyButton />
      </CodeBlock>
    );
  }

  // Inline code - render with standard styling
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
};

// Component overrides for Streamdown elements with Aura styling
const messageResponseComponents = {
  // Headings
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="mt-0 mb-2 scroll-m-20 text-xl font-medium tracking-tightest">{children}</h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-4 mb-1 scroll-m-20 text-lg font-medium tracking-tightest">{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-4 mb-1 scroll-m-20 text-base font-medium tracking-tighter">{children}</h3>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <h4 className="mt-2 mb-0 scroll-m-20 text-sm font-medium tracking-normal">{children}</h4>
  ),
  h5: ({ children }: { children?: ReactNode }) => (
    <h5 className="mt-0 mb-0 scroll-m-20 text-xs font-medium tracking-tighter">{children}</h5>
  ),
  h6: ({ children }: { children?: ReactNode }) => (
    <h6 className="mt-0 mb-0 scroll-m-20 text-2xs font-medium tracking-tighter">{children}</h6>
  ),
  // Paragraph
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mt-2 mb-3 text-base font-normal leading-7 tracking-tightest">{children}</p>
  ),
  // Text formatting
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
  // Lists
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="ml-8.25 mb-3 pt-2 pl-0 pb-0 list-disc text-base font-normal tracking-tightest">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="ml-8.25 mb-3 pt-2 pl-0 pb-0 list-decimal text-base font-normal tracking-tightest">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => <li className="py-0">{children}</li>,
  // Blockquote
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic">
      {children}
    </blockquote>
  ),
  // Horizontal rule
  hr: () => <hr className="my-4 border-border" />,
  // Links
  a: ({
    children,
    href,
    ...props
  }: {
    children?: ReactNode;
    href?: string;
  }) => (
    <a
      className="text-foreground-link no-underline hover:underline underline-offset-4"
      href={href}
      {...props}
    >
      {children}
    </a>
  ),
  // Tables
  table: ({ children }: { children?: ReactNode }) => (
    <table className="my-6 w-full">{children}</table>
  ),
  thead: ({ children }: { children?: ReactNode }) => <thead>{children}</thead>,
  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children?: ReactNode }) => (
    <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="border px-4 py-2 text-left font-bold">{children}</th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="border px-4 py-2 text-left">{children}</td>
  ),
  // Code - uses custom CodeBlock component for code blocks, standard styling for inline code
  code: MessageResponseCode,
};

export const MessageResponse = memo(
  ({ className, components, ...props }: MessageResponseProps) => (
    <Streamdown
      className={cn("size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}
      components={{ ...messageResponseComponents, ...components }}
      controls={false}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

MessageResponse.displayName = "MessageResponse";

export type MessageAttachmentProps = HTMLAttributes<HTMLDivElement> & {
  data: FileUIPart;
  className?: string;
  onRemove?: () => void;
};

export function MessageAttachment({ data, className, onRemove, ...props }: MessageAttachmentProps) {
  const filename = data.filename || "";
  const mediaType = data.mediaType?.startsWith("image/") && data.url ? "image" : "file";
  const isImage = mediaType === "image";
  const attachmentLabel = filename || (isImage ? "Image" : "Attachment");

  return (
    <div className={cn("group relative size-24 overflow-hidden rounded-lg", className)} {...props}>
      {isImage ? (
        <>
          <img
            alt={filename || "attachment"}
            className="size-full object-cover"
            height={100}
            src={data.url}
            width={100}
          />
          {onRemove && (
            <Button
              aria-label="Remove attachment"
              className="absolute top-2 right-2 size-6 rounded-full bg-background/80 p-0 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100 [&>svg]:size-3"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              variant="ghost"
            >
              <IconX />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </>
      ) : (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex size-full shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <IconPaperclip className="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{attachmentLabel}</p>
            </TooltipContent>
          </Tooltip>
          {onRemove && (
            <Button
              aria-label="Remove attachment"
              className="size-6 shrink-0 rounded-full p-0 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100 [&>svg]:size-3"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              variant="ghost"
            >
              <IconX />
              <span className="sr-only">Remove</span>
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export type MessageAttachmentsProps = ComponentProps<"div">;

export function MessageAttachments({ children, className, ...props }: MessageAttachmentsProps) {
  if (!children) {
    return null;
  }

  return (
    <div className={cn("ml-auto flex w-fit flex-wrap items-start gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export type MessageToolbarProps = ComponentProps<"div">;

export const MessageToolbar = ({ className, children, ...props }: MessageToolbarProps) => (
  <div className={cn("mt-4 flex w-full items-center justify-between gap-4", className)} {...props}>
    {children}
  </div>
);
