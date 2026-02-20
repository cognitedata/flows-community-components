import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { IconCheck } from '@tabler/icons-react';
import { useCallback, useState } from 'react';

import { cn } from '../../../../lib/utils';

type CheckedState = boolean | 'indeterminate';

type CheckboxProps = Omit<
  CheckboxPrimitive.Root.Props,
  'checked' | 'defaultChecked' | 'indeterminate' | 'onCheckedChange'
> & {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (checked: CheckedState) => void;
};

function Checkbox({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
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
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary data-checked:border-primary focus-visible:border-ring focus-visible:ring-ring-shadow aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-sm border shadow-xs transition-shadow outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      checked={checked === 'indeterminate' ? false : checked}
      defaultChecked={defaultChecked === 'indeterminate' ? false : defaultChecked}
      indeterminate={isControlledIndeterminate || uncontrolledIndeterminate}
      onCheckedChange={(nextChecked, _details) => handleCheckedChange(nextChecked)}
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
}

export { Checkbox };
