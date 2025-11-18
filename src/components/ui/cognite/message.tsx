import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
} from '#aura/avatar';
import { cn } from '#lib/utils';
import type { UIMessage } from 'ai';
import type { ComponentProps, HTMLAttributes } from 'react';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full items-end justify-end items-start gap-2 py-2 mb-0',
      from === 'user'
        ? 'is-user'
        : 'is-assistant flex-row-reverse items-start justify-end',
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
  src?: string;
  name?: string;
};

export const MessageAvatar = ({
  src,
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
          {src && (
            <AvatarImage alt={name || ''} className="mt-0 mb-0" src={src} />
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
