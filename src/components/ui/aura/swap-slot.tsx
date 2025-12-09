'use client';

import * as React from 'react';
import { type ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/common/utils';

function SwapSlot({
  className,
  asChild = false,
  ...props
}: ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="swap-slot"
      className={cn('flex items-center', className)}
      {...props}
    />
  );
}

export { SwapSlot };
