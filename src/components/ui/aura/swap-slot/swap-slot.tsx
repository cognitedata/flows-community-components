import { type ComponentProps, type ReactNode, forwardRef } from "react";
import { cn } from "../../../../lib/utils";

export interface SwapSlotProps extends ComponentProps<"div"> {
  defaultSlot?: ReactNode;
  activeSlot?: ReactNode;
}

export const SwapSlot = forwardRef<HTMLDivElement, SwapSlotProps>(
  ({ defaultSlot, activeSlot, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="swap-slot"
        className={cn(
          "w-full h-10 flex justify-center items-center gap-2 rounded-md border border-dashed border-ring p-4",
          className
        )}
        {...props}
      >
        {activeSlot ?? defaultSlot ?? children}
      </div>
    );
  }
);
SwapSlot.displayName = "SwapSlot";
