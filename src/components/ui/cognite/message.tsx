import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
} from '@/components/ui/cognite/avatar';
import { cn } from '@/lib/utils';
import type { ComponentProps, HTMLAttributes } from 'react';

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
      'group flex w-full items-start justify-start gap-2 py-2 mb-0',
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
      'is-user:dark flex gap-1 overflow-hidden rounded-md text-base leading-tight tracking-tightest',
      'max-w-[80%]',
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
