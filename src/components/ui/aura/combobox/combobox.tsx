import { IconCaretUpDown, IconCheck } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ComponentRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { cn } from '../../../../lib/utils';
import { Button } from '../button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

type ComboboxProps = Omit<
  ComponentProps<typeof Button>,
  'value' | 'onChange'
> & {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
};

const ComboboxCustom = forwardRef<ComponentRef<typeof Button>, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select option...',
      searchPlaceholder = 'Search...',
      emptyText = 'No option found.',
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? '');
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : internalValue;

    useEffect(() => {
      if (isControlled) {
        setInternalValue(value ?? '');
      }
    }, [isControlled, value]);

    const handleValueChange = (newValue: string) => {
      const finalValue = newValue === selectedValue ? '' : newValue;
      if (!isControlled) {
        setInternalValue(finalValue);
      }
      onValueChange?.(finalValue);
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              ref={ref}
              data-slot="combobox-trigger"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn('w-50 justify-between', className)}
              {...props}
            >
              {selectedValue
                ? options.find((option) => option.value === selectedValue)
                    ?.label
                : placeholder}
              <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          }
        />
        <PopoverContent className="w-50 p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleValueChange}
                  >
                    <IconCheck
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedValue === option.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
ComboboxCustom.displayName = 'ComboboxCustom';

const Combobox = forwardRef<ComponentRef<typeof Button>, ComboboxProps>(
  (props, ref) => {
    return <ComboboxCustom ref={ref} {...props} />;
  }
);
Combobox.displayName = 'Combobox';

export { Combobox, ComboboxCustom };
