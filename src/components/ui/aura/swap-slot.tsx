import type { ComponentProps, ReactNode } from 'react';

export interface SwapSlotProps extends ComponentProps<'div'> {
  defaultSlot?: ReactNode;
  activeSlot?: ReactNode;
}

export const SwapSlot = ({
  defaultSlot,
  activeSlot,
  children,
  ...props
}: SwapSlotProps) => {
  return <div {...props}>{activeSlot ?? defaultSlot ?? children}</div>;
};
