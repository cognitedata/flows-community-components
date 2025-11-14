"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex text-base font-medium leading-5 shrink-0 overflow-hidden rounded-md inline-flex flex-col justify-center items-center hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-mountain-50 text-mountain-650 dark:bg-mountain-800 dark:text-mountain-300",
        nordic:
          "bg-nordic-50 text-nordic-600 hover:bg-nordic-100 dark:bg-nordic-900 dark:text-nordic-300 dark:hover:bg-nordic-800",
        aurora:
          "bg-aurora-50 text-aurora-600 hover:bg-aurora-100 dark:bg-aurora-900 dark:text-aurora-300 dark:hover:bg-aurora-800",
        fjord:
          "bg-fjord-50 text-fjord-700 hover:bg-fjord-100 dark:bg-fjord-900 dark:text-fjord-300 dark:hover:bg-fjord-800",
        dusk: "bg-dusk-50 text-dusk-600 hover:bg-dusk-100 dark:bg-dusk-900 dark:text-dusk-400 dark:hover:bg-dusk-800",
        orange:
          "bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800",
        sky: "bg-sky-50 text-sky-600 hover:bg-sky-100 dark:bg-sky-900 dark:text-sky-300 dark:hover:bg-sky-800",
        overflow:
          "bg-secondary-50 text-secondary-600 hover:bg-secondary-100 dark:bg-secondary-900 dark:text-overflow-300 dark:hover:bg-secondary-800",
      },
      sizes: {
        default: "size-9 text-sm [&_svg]:w-[17.5px] [&_svg]:h-[17.5px]",
        xsm: "size-7 text-xs  [&_svg]:w-[14px] [&_svg]:h-[14px]",
        xxsm: "size-5 text-[10px] [&_svg]:w-[10.5px] [&_svg]:h-[10.5px]",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
    },
  }
);

function Avatar({
  className,
  variant,
  sizes,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ variant,sizes }), className)}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        " flex size-md items-center justify-center rounded-md",
        className
      )}
      {...props}
    />
  );
}

function AvatarIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="avatar-icon"
      className={cn(
        "flex size-full items-center justify-center rounded-md",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarIcon, avatarVariants };
