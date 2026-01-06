'use client';

import type { ComponentProps, HTMLAttributes } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'group relative inline-flex text-base font-medium leading-5 shrink-0 overflow-hidden rounded-md flex-col justify-center items-center hover:cursor-pointer box-border',
  {
    variants: {
      variant: {
        default:
          'bg-decorative-background-mountain text-decorative-foreground-mountain hover:bg-decorative-background-hover-mountain',
        nordic:
          'bg-decorative-background-nordic text-decorative-foreground-nordic hover:bg-decorative-background-hover-nordic',
        aurora:
          'bg-decorative-background-aurora text-decorative-foreground-aurora hover:bg-decorative-background-hover-aurora',
        fjord:
          'bg-decorative-background-fjord text-decorative-foreground-fjord hover:bg-decorative-background-hover-fjord',
        dusk: 'bg-decorative-background-dusk text-decorative-foreground-dusk hover:bg-decorative-background-hover-dusk',
        orange:
          'bg-decorative-background-orange text-decorative-foreground-orange hover:bg-decorative-background-hover-orange',
        sky: 'bg-decorative-background-sky text-decorative-foreground-sky hover:bg-decorative-background-hover-sky',
        overflow:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
      },
      sizes: {
        default:
          'size-9 text-sm [&_svg]:w-[var(--avatar-icon-default)] [&_svg]:h-[var(--avatar-icon-default)]',
        xsm: 'size-7 text-xs [&_svg]:w-[var(--avatar-icon-xs)] [&_svg]:h-[var(--avatar-icon-xs)]',
        xxsm: 'size-5 text-2xs [&_svg]:w-[var(--avatar-icon-xxs)] [&_svg]:h-[var(--avatar-icon-xxs)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizes: 'default',
    },
  }
);

/**
 * Avatar component for displaying user profile images, initials, or icons.
 * Supports multiple color variants, three sizes, and composable sub-components.
 */
function Avatar({
  className,
  variant,
  sizes,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ variant, sizes }), className)}
      {...props}
    />
  );
}

/**
 * AvatarImage displays the user's profile image.
 * Falls back to AvatarFallback if the image fails to load.
 * Includes a hover darkening effect.
 */
function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <>
      <AvatarPrimitive.Image
        data-slot="avatar-image"
        className={cn('aspect-square size-full', className)}
        {...props}
      />
      <span
        data-slot="avatar-image-backdrop"
        className="absolute inset-0 bg-(--avatar-image-backdrop) opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
}

/**
 * AvatarFallback displays when the image is loading or fails to load.
 * Typically shows user initials or a placeholder.
 */
function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        ' flex size-md items-center justify-center rounded-md',
        className
      )}
      {...props}
    />
  );
}

/**
 * AvatarIcon displays an icon instead of an image or initials.
 * Useful for system users, bots, or special entity types.
 */
function AvatarIcon({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="avatar-icon"
      className={cn(
        'flex size-full items-center justify-center rounded-md',
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarIcon, avatarVariants };
