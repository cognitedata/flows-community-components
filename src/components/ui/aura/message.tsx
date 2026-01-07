'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
} from '@/components/ui/aura/avatar';
import { Button } from '@/components/ui/aura/button';
import {
  ButtonGroup,
  ButtonGroupText,
} from '@/components/ui/aura/button-group';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/aura/tooltip';
import { cn } from '@/lib/utils';
import type { FileUIPart, UIMessage } from 'ai';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPaperclip,
  IconX,
} from '@tabler/icons-react';
import type { ComponentProps, HTMLAttributes, ReactElement } from 'react';
import {
  createContext,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Streamdown } from 'streamdown';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  isResponse?: boolean;
};

export const Message = ({
  className,
  isResponse = false,
  ...props
}: MessageProps) => (
  <div
    className={cn(
      'group flex w-full items-start justify-start gap-3 py-2 mb-0',
      isResponse ? 'is-assistant items-start' : 'is-user flex-row-reverse',
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(
      'is-user:dark flex flex-col gap-1 overflow-hidden rounded-md text-base leading-tight tracking-tightest',
      'max-w-[var(--message-content-max-width)]',
      'group-[.is-user]:bg-accent group-[.is-user]:p-2 group-[.is-user]:text-accent-foreground',
      'group-[.is-assistant]:text-foreground group-[.is-assistant]:pt-1',
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
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
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
  const fallbackText = name ? getInitials(name) : 'ME';

  return (
    <Avatar
      className={cn('size-7 group-[.is-user]:mt-1', className)}
      variant={variant}
      sizes={sizes}
      {...props}
    >
      {children || (
        <>
          {avatarUrl && (
            <AvatarImage
              alt={name || ''}
              className="mt-0 mb-0"
              src={avatarUrl}
            />
          )}
          <AvatarFallback>{fallbackText}</AvatarFallback>
        </>
      )}
    </Avatar>
  );
};

export type MessageAvatarIconProps = ComponentProps<typeof AvatarIcon>;

export const MessageAvatarIcon = (props: MessageAvatarIconProps) => (
  <AvatarIcon {...props} />
);

export type MessageActionsProps = ComponentProps<'div'>;

export const MessageActions = ({
  className,
  children,
  ...props
}: MessageActionsProps) => (
  <div className={cn('flex items-center gap-2', className)} {...props}>
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
  variant = 'ghost',
  size = 'sm',
  ...props
}: MessageActionProps) => {
  const button = (
    <Button
      className={cn(
        'relative icon-sm text-muted-foreground hover:text-foreground',
        className
      )}
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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

const MessageBranchContext = createContext<MessageBranchContextType | null>(
  null
);

const useMessageBranch = () => {
  const context = useContext(MessageBranchContext);

  if (!context) {
    throw new Error(
      'MessageBranch components must be used within MessageBranch'
    );
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
    const newBranch =
      currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
    handleBranchChange(newBranch);
  };

  const goToNext = () => {
    const newBranch =
      currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
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
        className={cn('grid w-full gap-2 [&>div]:pb-0', className)}
        {...props}
      />
    </MessageBranchContext.Provider>
  );
};

export type MessageBranchContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageBranchContent = ({
  children,
  ...props
}: MessageBranchContentProps) => {
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
        'grid gap-2 overflow-hidden [&>div]:pb-0',
        index === currentBranch ? 'block' : 'hidden'
      )}
      key={branch.key}
      {...props}
    >
      {branch}
    </div>
  ));
};

export type MessageBranchSelectorProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

export const MessageBranchSelector = ({
  ...props
}: MessageBranchSelectorProps) => {
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

export const MessageBranchPrevious = ({
  children,
  ...props
}: MessageBranchPreviousProps) => {
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

export const MessageBranchNext = ({
  children,
  ...props
}: MessageBranchNextProps) => {
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

export const MessageBranchPage = ({
  className,
  ...props
}: MessageBranchPageProps) => {
  const { currentBranch, totalBranches } = useMessageBranch();

  return (
    <ButtonGroupText
      className={cn(
        'border-none bg-transparent text-muted-foreground shadow-none px-2',
        className
      )}
      {...props}
    >
      {currentBranch + 1}/{totalBranches}
    </ButtonGroupText>
  );
};

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

export const MessageResponse = memo(
  ({ className, ...props }: MessageResponseProps) => (
    <Streamdown
      className={cn(
        'size-full',
        // Headings
        '[&_h1]:mt-0 [&_h1]:mb-2 [&_h1]:scroll-m-20 [&_h1]:text-xl [&_h1]:font-medium [&_h1]:tracking-tightest',
        '[&_h2]:mt-4 [&_h2]:mb-1 [&_h2]:scroll-m-20 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-tightest',
        '[&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:scroll-m-20 [&_h3]:text-base [&_h3]:font-medium [&_h3]:tracking-tighter',
        '[&_h4]:mt-2 [&_h4]:mb-0 [&_h4]:scroll-m-20 [&_h4]:text-sm [&_h4]:font-medium [&_h4]:tracking-normal',
        '[&_h5]:mt-0 [&_h5]:mb-0 [&_h5]:scroll-m-20 [&_h5]:text-xs [&_h5]:font-medium [&_h5]:tracking-tighter',
        '[&_h6]:mt-0 [&_h6]:mb-0 [&_h6]:scroll-m-20 [&_h6]:text-2xs [&_h6]:font-medium [&_h6]:tracking-tighter',
        // Paragraphs and text formatting
        '[&_p]:mt-2 [&_p]:mb-3 [&_p]:leading-7 [&_p]:text-base [&_p]:font-normal [&_p]:tracking-tightest',
        '[&_strong]:font-medium [&_b]:font-medium',
        '[&_em]:italic [&_i]:italic',
        // Lists
        '[&_ul]:ml-8.25 [&_ul]:mb-3 [&_ul]:pt-2 [&_ul]:pl-0 [&_ul]:pb-0 [&_ul]:list-disc [&_ul]:text-base [&_ul]:font-normal [&_ul]:tracking-tightest',
        '[&_ol]:ml-8.25 [&_ol]:mb-3 [&_ol]:pt-2 [&_ol]:pl-0 [&_ol]:pb-0 [&_ol]:list-decimal [&_ol]:text-base [&_ol]:font-normal [&_ol]:tracking-tightest',
        '[&_li]:py-0',
        // Blockquotes and horizontal rules
        '[&_blockquote]:my-3 [&_blockquote]:pr-2 [&_blockquote]:pl-2 [&_blockquote]:border-l [&_blockquote]:border-l-border [&_blockquote]:text-sm [&_blockquote]:text-muted-foreground [&_blockquote]:font-normal [&_blockquote]:tracking-tight [&_blockquote]:not-italic',
        '[&_blockquote_p]:text-sm [&_blockquote_p]:tracking-tight',
        '[&_hr]:my-4 [&_hr]:border-border',
        // Links
        '[&_a]:text-foreground-link [&_a]:no-underline [&_a]:hover:underline [&_a]:underline-offset-4',
        // Inline code
        '[&_code]:relative [&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold',
        // Code blocks (Streamdown container)
        '[&_div[data-streamdown="code-block"]]:my-4 [&_div[data-streamdown="code-block"]]:w-full [&_div[data-streamdown="code-block"]]:overflow-hidden [&_div[data-streamdown="code-block"]]:rounded-xl [&_div[data-streamdown="code-block"]]:border [&_div[data-streamdown="code-block"]]:border-border',
        // Code block header
        '[&_div[data-streamdown="code-block-header"]]:flex [&_div[data-streamdown="code-block-header"]]:items-center [&_div[data-streamdown="code-block-header"]]:justify-between [&_div[data-streamdown="code-block-header"]]:bg-muted/80 [&_div[data-streamdown="code-block-header"]]:px-4 [&_div[data-streamdown="code-block-header"]]:py-3 [&_div[data-streamdown="code-block-header"]]:text-xs [&_div[data-streamdown="code-block-header"]]:text-muted-foreground',
        // Pre element inside code block
        '[&_div[data-streamdown="code-block"]_pre]:m-0 [&_div[data-streamdown="code-block"]_pre]:overflow-x-auto [&_div[data-streamdown="code-block"]_pre]:border-t [&_div[data-streamdown="code-block"]_pre]:border-border [&_div[data-streamdown="code-block"]_pre]:bg-background! [&_div[data-streamdown="code-block"]_pre]:p-4 [&_div[data-streamdown="code-block"]_pre]:text-sm [&_div[data-streamdown="code-block"]_pre]:text-foreground!',
        // Code element inside pre
        '[&_div[data-streamdown="code-block"]_pre_code]:static [&_div[data-streamdown="code-block"]_pre_code]:rounded-none [&_div[data-streamdown="code-block"]_pre_code]:bg-transparent [&_div[data-streamdown="code-block"]_pre_code]:p-0 [&_div[data-streamdown="code-block"]_pre_code]:font-mono [&_div[data-streamdown="code-block"]_pre_code]:text-sm [&_div[data-streamdown="code-block"]_pre_code]:font-normal',
        // Code block buttons
        '[&_button[data-streamdown="code-block-copy-button"]]:cursor-pointer [&_button[data-streamdown="code-block-copy-button"]]:p-1 [&_button[data-streamdown="code-block-copy-button"]]:text-muted-foreground [&_button[data-streamdown="code-block-copy-button"]]:transition-all [&_button[data-streamdown="code-block-copy-button"]]:hover:text-foreground',
        '[&_button[data-streamdown="code-block-download-button"]]:cursor-pointer [&_button[data-streamdown="code-block-download-button"]]:p-1 [&_button[data-streamdown="code-block-download-button"]]:text-muted-foreground [&_button[data-streamdown="code-block-download-button"]]:transition-all [&_button[data-streamdown="code-block-download-button"]]:hover:text-foreground',
        // Regular pre blocks (not in Streamdown code blocks)
        '[&_pre:not([data-streamdown])]:my-3 [&_pre:not([data-streamdown])]:mx-0 [&_pre:not([data-streamdown])]:overflow-x-auto [&_pre:not([data-streamdown])]:rounded-md [&_pre:not([data-streamdown])]:border [&_pre:not([data-streamdown])]:bg-card [&_pre:not([data-streamdown])]:p-4 [&_pre:not([data-streamdown])]:text-foreground [&_pre:not([data-streamdown])]:text-sm',
        '[&_pre:not([data-streamdown])_code]:static [&_pre:not([data-streamdown])_code]:rounded-none [&_pre:not([data-streamdown])_code]:bg-transparent [&_pre:not([data-streamdown])_code]:px-0 [&_pre:not([data-streamdown])_code]:py-0 [&_pre:not([data-streamdown])_code]:font-mono [&_pre:not([data-streamdown])_code]:text-sm [&_pre:not([data-streamdown])_code]:font-normal',
        // Tables
        '[&_table]:my-6 [&_table]:w-full',
        '[&_tr]:m-0 [&_tr]:border-t [&_tr]:p-0 [&_tr]:even:bg-muted',
        '[&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold',
        '[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left',
        // First and last child margin resets
        '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

MessageResponse.displayName = 'MessageResponse';

export type MessageAttachmentProps = HTMLAttributes<HTMLDivElement> & {
  data: FileUIPart;
  className?: string;
  onRemove?: () => void;
};

export function MessageAttachment({
  data,
  className,
  onRemove,
  ...props
}: MessageAttachmentProps) {
  const filename = data.filename || '';
  const mediaType =
    data.mediaType?.startsWith('image/') && data.url ? 'image' : 'file';
  const isImage = mediaType === 'image';
  const attachmentLabel = filename || (isImage ? 'Image' : 'Attachment');

  return (
    <div
      className={cn(
        'group relative size-24 overflow-hidden rounded-lg',
        className
      )}
      {...props}
    >
      {isImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={filename || 'attachment'}
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

export type MessageAttachmentsProps = ComponentProps<'div'>;

export function MessageAttachments({
  children,
  className,
  ...props
}: MessageAttachmentsProps) {
  if (!children) {
    return null;
  }

  return (
    <div
      className={cn(
        'ml-auto flex w-fit flex-wrap items-start gap-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type MessageToolbarProps = ComponentProps<'div'>;

export const MessageToolbar = ({
  className,
  children,
  ...props
}: MessageToolbarProps) => (
  <div
    className={cn(
      'mt-4 flex w-full items-center justify-between gap-4',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
