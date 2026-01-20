import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SwapSlotProps extends ComponentProps<"div"> {
  defaultSlot?: ReactNode;
  activeSlot?: ReactNode;
}

export const SwapSlot = ({
  defaultSlot,
  activeSlot,
  className,
  children,
  ...props
}: SwapSlotProps) => {
  return (
    <div
      className={cn(
        "w-full h-10 flex justify-center items-center gap-2 rounded-md border border-dashed border-ring p-4",
        className
      )}
      {...props}
    >
      {activeSlot ?? defaultSlot ?? children}
    </div>
  );
};
