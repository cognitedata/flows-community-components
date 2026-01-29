import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { cn } from "@/lib/utils";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type IconProps, IconX } from "@tabler/icons-react";
import { type VariantProps, cva } from "class-variance-authority";
import {
  type ComponentProps,
  type ComponentType,
  type HTMLAttributes,
  type MouseEventHandler,
  createContext,
  forwardRef,
  useContext,
} from "react";

type BannerVariant = "default" | "neutral" | "destructive" | "warning";

type BannerContextProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  variant: BannerVariant;
};

// eslint-disable-next-line react-refresh/only-export-components
export const BannerContext = createContext<BannerContextProps>({
  show: true,
  setShow: () => {},
  variant: "default",
});

const bannerVariants = cva("flex w-full min-h-11 items-center gap-2 px-3.5 py-2", {
  variants: {
    variant: {
      default: "bg-mountain text-foreground",
      neutral: "bg-neutral text-foreground",
      destructive: "bg-destructive text-foreground",
      warning: "bg-warning text-foreground",
    },
    inset: {
      true: "rounded-lg",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    inset: false,
  },
});

export type BannerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof bannerVariants> & {
    visible?: boolean;
    defaultVisible?: boolean;
    onClose?: () => void;
  };

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      children,
      visible,
      defaultVisible = true,
      onClose,
      className,
      inset = false,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const [show, setShow] = useControllableState({
      defaultProp: defaultVisible,
      prop: visible,
      onChange: onClose,
    });

    if (!show) {
      return null;
    }

    return (
      <BannerContext.Provider value={{ show, setShow, variant: variant as BannerVariant }}>
        <div
          ref={ref}
          data-slot="banner"
          className={cn(bannerVariants({ variant, inset }), className)}
          {...props}
        >
          {children}
        </div>
      </BannerContext.Provider>
    );
  }
);
Banner.displayName = "Banner";

type TablerIconComponent = ComponentType<IconProps>;

export type BannerIconProps = HTMLAttributes<HTMLDivElement> & {
  icon: TablerIconComponent;
};

export const BannerIcon = forwardRef<HTMLDivElement, BannerIconProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    const { variant } = useContext(BannerContext);

    return (
      <div
        ref={ref}
        data-slot="banner-icon"
        className={cn(variant === "neutral" && "text-neutral-foreground", className)}
        {...props}
      >
        <Icon size={16} />
      </div>
    );
  }
);
BannerIcon.displayName = "BannerIcon";

export type BannerTitleProps = HTMLAttributes<HTMLParagraphElement>;

export const BannerTitle = forwardRef<HTMLParagraphElement, BannerTitleProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-slot="banner-title"
      className={cn("text-sm tracking-tight", className)}
      {...props}
    />
  )
);
BannerTitle.displayName = "BannerTitle";

export type BannerStatusProps = ComponentProps<typeof Badge>;

export const BannerStatus = forwardRef<HTMLSpanElement, BannerStatusProps>(
  ({ outline = true, variant, className, ...props }, ref) => {
    const { variant: bannerVariant } = useContext(BannerContext);

    const variantMap: Record<BannerVariant, "default" | "warning" | "error" | "inProgress"> = {
      default: "default",
      neutral: "inProgress",
      destructive: "error",
      warning: "warning",
    };

    const badgeVariant = variant ?? variantMap[bannerVariant];

    return (
      <Badge
        ref={ref}
        data-slot="banner-status"
        outline={outline}
        variant={badgeVariant}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  }
);
BannerStatus.displayName = "BannerStatus";

export type BannerActionsProps = HTMLAttributes<HTMLDivElement>;

export const BannerActions = forwardRef<HTMLDivElement, BannerActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="banner-actions"
      className={cn("flex items-center gap-2 shrink-0 ml-auto", className)}
      {...props}
    />
  )
);
BannerActions.displayName = "BannerActions";

const hoverClasses: Record<BannerVariant, string> = {
  default: "hover:bg-undefined-hover",
  neutral: "hover:bg-neutral-hover",
  destructive: "hover:bg-destructive-hover",
  warning: "hover:bg-warning-hover",
};

export type BannerActionProps = ComponentProps<typeof Button>;

export const BannerAction = forwardRef<HTMLButtonElement, BannerActionProps>(
  ({ variant = "ghost", size = "sm", className, ...props }, ref) => {
    const { variant: bannerVariant } = useContext(BannerContext);

    return (
      <Button
        ref={ref}
        data-slot="banner-action"
        className={cn("shrink-0 text-foreground", hoverClasses[bannerVariant], className)}
        size={size}
        variant={variant}
        {...props}
      />
    );
  }
);
BannerAction.displayName = "BannerAction";

export type BannerCloseProps = Omit<ComponentProps<typeof Button>, "size">;

export const BannerClose = forwardRef<HTMLButtonElement, BannerCloseProps>(
  ({ variant = "ghost", onClick, className, ...props }, ref) => {
    const { setShow, variant: bannerVariant } = useContext(BannerContext);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      setShow(false);
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        data-slot="banner-close"
        className={cn(
          "shrink-0 opacity-70 hover:opacity-100 text-foreground rounded-sm",
          hoverClasses[bannerVariant],
          className
        )}
        onClick={handleClick}
        variant={variant}
        size="icon-sm"
        aria-label="Close banner"
        {...props}
      >
        <IconX size={14} />
      </Button>
    );
  }
);
BannerClose.displayName = "BannerClose";
