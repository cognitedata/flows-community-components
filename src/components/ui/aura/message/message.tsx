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

import { IconChevronLeft, IconChevronRight, IconPaperclip, IconX } from "@tabler/icons-react";
import type { BundledLanguage } from "shiki";
import { Streamdown } from "streamdown";

import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/aura/avatar";
import { Button } from "@/components/ui/aura/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/aura/button-group";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/aura/code-block";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/aura/tooltip";
import type { FileUIPart, UIMessage } from "@/lib/ai/types";
import { cn, getInitials } from "@/lib/utils";

type MessageProps = HTMLAttributes<HTMLDivElement> & {
  isResponse?: boolean;
};

const Message = ({ className, isResponse = false, ...props }: MessageProps) => (
  <div
    data-slot="message"
    className={cn(
      "group flex w-full items-start justify-start gap-3 py-2 mb-0",
      isResponse ? "is-assistant items-start" : "is-user flex-row-reverse",
      className
    )}
    {...props}
  />
);

type MessageContentProps = HTMLAttributes<HTMLDivElement>;

const MessageContent = ({ children, className, ...props }: MessageContentProps) => (
  <div
    data-slot="message-content"
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

type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  avatarUrl?: string;
  name?: string;
};

const MessageAvatar = ({
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
      data-slot="message-avatar"
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

type MessageAvatarIconProps = ComponentProps<typeof AvatarIcon>;

const MessageAvatarIcon = (props: MessageAvatarIconProps) => (
  <AvatarIcon data-slot="message-avatar-icon" {...props} />
);

type MessageActionsProps = ComponentProps<"div">;

const MessageActions = ({ className, children, ...props }: MessageActionsProps) => (
  <div data-slot="message-actions" className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

type MessageActionProps = ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
};

const MessageAction = ({
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
      data-slot="message-action"
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
        <TooltipTrigger render={button} />
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

type MessageBranchProps = HTMLAttributes<HTMLDivElement> & {
  defaultBranch?: number;
  onBranchChange?: (branchIndex: number) => void;
};

const MessageBranch = ({
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
      <div
        data-slot="message-branch"
        className={cn("grid w-full gap-2 [&>div]:pb-0", className)}
        {...props}
      />
    </MessageBranchContext.Provider>
  );
};

type MessageBranchContentProps = HTMLAttributes<HTMLDivElement>;

const MessageBranchContent = ({ children, ...props }: MessageBranchContentProps) => {
  const { currentBranch, setBranches, branches } = useMessageBranch();
  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  useEffect(() => {
    if (branches.length !== childrenArray.length) {
      setBranches(childrenArray);
    }
  }, [childrenArray, branches, setBranches]);

  return childrenArray.map((branch, index) => (
    <div
      data-slot="message-branch-content"
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

type MessageBranchSelectorProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

const MessageBranchSelector = ({ ...props }: MessageBranchSelectorProps) => {
  const { totalBranches } = useMessageBranch();

  if (totalBranches <= 1) {
    return null;
  }

  return (
    <ButtonGroup
      data-slot="message-branch-selector"
      className="[&>*:not(:first-child)]:rounded-l-md [&>*:not(:last-child)]:rounded-r-md"
      orientation="horizontal"
      {...props}
    />
  );
};

type MessageBranchPreviousProps = ComponentProps<typeof Button>;

const MessageBranchPrevious = ({ children, ...props }: MessageBranchPreviousProps) => {
  const { goToPrevious, totalBranches } = useMessageBranch();

  return (
    <Button
      data-slot="message-branch-previous"
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

type MessageBranchNextProps = ComponentProps<typeof Button>;

const MessageBranchNext = ({ children, ...props }: MessageBranchNextProps) => {
  const { goToNext, totalBranches } = useMessageBranch();

  return (
    <Button
      data-slot="message-branch-next"
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

type MessageBranchPageProps = HTMLAttributes<HTMLSpanElement>;

const MessageBranchPage = ({ className, ...props }: MessageBranchPageProps) => {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <ButtonGroupText
      data-slot="message-branch-page"
      className={cn("border-none bg-transparent text-muted-foreground shadow-none px-2", className)}
      {...props}
    >
      {currentBranch + 1}/{totalBranches}
    </ButtonGroupText>
  );
};

type MessageResponseProps = ComponentProps<typeof Streamdown>;

type MessageResponseCodeProps = {
  className?: string;
  children?: ReactNode;
};

const MessageResponseCode = ({ className, children }: MessageResponseCodeProps) => {
  const languageMatch = className?.match(/language-(\w+)/);
  const language = languageMatch?.[1] as BundledLanguage | undefined;

  let codeText = "";
  if (typeof children === "string") {
    codeText = children;
  } else if (isValidElement(children)) {
    const props = children.props as { children?: string };
    if (typeof props.children === "string") {
      codeText = props.children;
    }
  }

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

  return (
    <code className="relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold">
      {children}
    </code>
  );
};

const messageResponseComponents = {
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
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mt-2 mb-3 text-base font-normal leading-7 tracking-tightest">{children}</p>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
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
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-4 border-border" />,
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
  code: MessageResponseCode,
};

const MessageResponse = memo(
  ({ className, components, ...props }: MessageResponseProps) => (
    <Streamdown
      data-slot="message-response"
      className={cn(
        "size-full",
        '[&_div[data-streamdown="mermaid-block"]_.relative.w-full]:min-h-28',
        '[&_div[data-streamdown="mermaid-block"]_>div>.fixed]:z-[200]',
        '[&_div[data-streamdown="mermaid-block"]_.fixed.inset-0_.flex-col.absolute]:fixed',
        '[&_div[data-streamdown="mermaid-block"]_.fixed.inset-0_.flex-col.absolute]:top-4',
        '[&_div[data-streamdown="mermaid-block"]_.fixed.inset-0_.flex-col.absolute]:bottom-auto',
        '[&_div[data-streamdown="mermaid-block"]_.fixed.inset-0_.flex-col.absolute]:left-4',
        '[&_div[data-streamdown="mermaid-block"]_.fixed.inset-0_.flex-col.absolute]:z-[201]',
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      components={{ ...messageResponseComponents, ...components }}
      controls={false}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

MessageResponse.displayName = "MessageResponse";

type MessageAttachmentProps = HTMLAttributes<HTMLDivElement> & {
  data: FileUIPart;
  className?: string;
  onRemove?: () => void;
};

function MessageAttachment({ data, className, onRemove, ...props }: MessageAttachmentProps) {
  const filename = data.filename || "";
  const mediaType = data.mediaType?.startsWith("image/") && data.url ? "image" : "file";
  const isImage = mediaType === "image";
  const attachmentLabel = filename || (isImage ? "Image" : "Attachment");

  return (
    <div
      data-slot="message-attachment"
      className={cn("group relative size-24 overflow-hidden rounded-lg", className)}
      {...props}
    >
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
            <TooltipTrigger
              render={
                <div className="flex size-full shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <IconPaperclip className="size-4" />
                </div>
              }
            />
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

type MessageAttachmentsProps = ComponentProps<"div">;

function MessageAttachments({ children, className, ...props }: MessageAttachmentsProps) {
  if (!children) {
    return null;
  }

  return (
    <div
      data-slot="message-attachments"
      className={cn("ml-auto flex w-fit flex-wrap items-start gap-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

type MessageToolbarProps = ComponentProps<"div">;

const MessageToolbar = ({ className, children, ...props }: MessageToolbarProps) => (
  <div
    data-slot="message-toolbar"
    className={cn("mt-4 flex w-full items-center justify-between gap-4", className)}
    {...props}
  >
    {children}
  </div>
);

export {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
  MessageResponse,
  MessageAttachment,
  MessageAttachments,
  MessageToolbar,
};
