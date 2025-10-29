"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex size-9 text-base font-medium leading-5 shrink-0 overflow-hidden rounded-md inline-flex flex-col justify-center items-center hover:cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-mountain-50 text-mountain-650 dark:bg-mountain-800 dark:text-mountain-300",
        nordic:
          "bg-nordic-50 text-nordic-600 dark:bg-nordic-900 dark:text-nordic-300",
        aurora:
          "bg-aurora-50 text-aurora-600 dark:bg-aurora-900 dark:text-aurora-300",
        fjord:
          "bg-fjord-50 text-fjord-700 hover:bg-fjord-100 dark:bg-fjord-900 dark:text-fjord-300",

        dusk: "bg-dusk-50 text-dusk-600 dark:bg-dusk-900 dark:text-dusk-400",
        orange:
          "bg-orange-50 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
        sky: "bg-sky-50 text-sky-600 dark:bg-sky-900 dark:text-sky-300",
        overflow:
          "bg-secondary-50 text-secondary-600 dark:bg-secondary-900 dark:text-overflow-300",
      },
      sizes: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xsm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        xxsm: "h-10 rounded-md px-6 has-[>svg]:px-4",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Avatar({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ variant }), className)}
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
      className={cn("aspect-square size-md", className)}
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

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
