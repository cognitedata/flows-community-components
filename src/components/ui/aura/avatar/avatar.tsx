import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, type ComponentRef, type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "group/avatar relative inline-flex text-base font-medium leading-5 shrink-0 overflow-hidden rounded-md flex-col justify-center items-center hover:cursor-pointer box-border",
  {
    variants: {
      variant: {
        default:
          "bg-decorative-background-mountain text-decorative-foreground-mountain hover:bg-decorative-background-hover-mountain",
        nordic:
          "bg-decorative-background-nordic text-decorative-foreground-nordic hover:bg-decorative-background-hover-nordic",
        aurora:
          "bg-decorative-background-aurora text-decorative-foreground-aurora hover:bg-decorative-background-hover-aurora",
        fjord:
          "bg-decorative-background-fjord text-decorative-foreground-fjord hover:bg-decorative-background-hover-fjord",
        dusk: "bg-decorative-background-dusk text-decorative-foreground-dusk hover:bg-decorative-background-hover-dusk",
        orange:
          "bg-decorative-background-orange text-decorative-foreground-orange hover:bg-decorative-background-hover-orange",
        sky: "bg-decorative-background-sky text-decorative-foreground-sky hover:bg-decorative-background-hover-sky",
        overflow: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
      },
      sizes: {
        default:
          "size-9 text-sm [&_svg]:w-[var(--avatar-icon-default)] [&_svg]:h-[var(--avatar-icon-default)]",
        xsm: "size-7 text-xs [&_svg]:w-[var(--avatar-icon-xs)] [&_svg]:h-[var(--avatar-icon-xs)]",
        xxsm: "size-5 text-2xs [&_svg]:w-[var(--avatar-icon-xxs)] [&_svg]:h-[var(--avatar-icon-xxs)]",
      },
    },
    defaultVariants: {
      variant: "default",
      sizes: "default",
    },
  }
);

const Avatar = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants>
>(({ className, variant, sizes, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(avatarVariants({ variant, sizes }), className)}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  ComponentProps<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => {
  return (
    <>
      <AvatarPrimitive.Image
        ref={ref}
        data-slot="avatar-image"
        className={cn("aspect-square size-full", className)}
        {...props}
      />
      <span
        data-slot="avatar-image-backdrop"
        className="absolute inset-0 bg-(--avatar-image-backdrop) opacity-0 transition-opacity group-hover/avatar:opacity-100 pointer-events-none"
        aria-hidden="true"
      />
    </>
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  ComponentProps<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(" flex size-md items-center justify-center rounded-md", className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

const AvatarIcon = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="avatar-icon"
        className={cn("flex size-full items-center justify-center rounded-md", className)}
        {...props}
      />
    );
  }
);
AvatarIcon.displayName = "AvatarIcon";

export { Avatar, AvatarImage, AvatarFallback, AvatarIcon };
