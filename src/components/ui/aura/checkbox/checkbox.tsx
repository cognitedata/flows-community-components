import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { IconCheck } from '@tabler/icons-react';
import { type ComponentRef, forwardRef, useCallback, useState } from 'react';

import { cn, disabledState, focusState, invalidState } from '@/lib/utils';

type CheckedState = boolean | 'indeterminate';

type CheckboxProps = Omit<
  CheckboxPrimitive.Root.Props,
  'checked' | 'defaultChecked' | 'indeterminate' | 'onCheckedChange'
> & {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
};

const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const isControlledIndeterminate = checked === 'indeterminate';
  const [uncontrolledIndeterminate, setUncontrolledIndeterminate] = useState(
    checked === undefined && defaultChecked === 'indeterminate'
  );

  const handleCheckedChange = useCallback(
    (nextChecked: boolean) => {
      if (checked === undefined && uncontrolledIndeterminate) {
        setUncontrolledIndeterminate(false);
      }
      onCheckedChange?.(nextChecked);
    },
    [checked, onCheckedChange, uncontrolledIndeterminate]
  );

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary size-4 shrink-0 rounded-sm border shadow-xs transition-shadow',
        focusState,
        invalidState,
        disabledState,
        className
      )}
      checked={checked === 'indeterminate' ? false : checked}
      defaultChecked={
        defaultChecked === 'indeterminate' ? false : defaultChecked
      }
      indeterminate={isControlledIndeterminate || uncontrolledIndeterminate}
      onCheckedChange={(nextChecked, _details) =>
        handleCheckedChange(nextChecked)
      }
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <IconCheck className="size-3.5 text-current" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
