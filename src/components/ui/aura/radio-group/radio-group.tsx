import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { IconCircle } from '@tabler/icons-react';
import { type ComponentRef, forwardRef } from 'react';

import {
  cn,
  disabledState,
  focusState,
  invalidState,
} from '../../../../lib/utils';

type Orientation = 'horizontal' | 'vertical';

type RadioGroupProps = RadioGroupPrimitive.Props & {
  orientation?: Orientation;
};

const RadioGroup = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive>,
  RadioGroupProps
>(({ className, orientation = 'vertical', ...props }, ref) => {
  return (
    <RadioGroupPrimitive
      ref={ref}
      data-slot="radio-group"
      data-orientation={orientation}
      aria-orientation={orientation}
      className={cn(
        orientation === 'horizontal' ? 'flex items-center gap-3' : 'grid gap-3',
        className
      )}
      {...props}
    />
  );
});
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = forwardRef<
  ComponentRef<typeof RadioPrimitive.Root>,
  RadioPrimitive.Root.Props
>(({ className, ...props }, ref) => {
  return (
    <RadioPrimitive.Root
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        'border-input text-primary dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none',
        focusState,
        invalidState,
        disabledState,
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex h-full w-full items-center justify-center"
      >
        <IconCircle className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
