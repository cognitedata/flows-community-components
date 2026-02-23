import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { useCallback, useMemo } from 'react';

import { cn } from '../../../../lib/utils';

type SliderProps = Omit<
  SliderPrimitive.Root.Props<readonly number[]>,
  'value' | 'defaultValue' | 'onValueChange'
> & {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
};

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  onValueChange,
  ...props
}: SliderProps) {
  const _values = useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  );

  const handleValueChange = useCallback(
    (nextValue: number | readonly number[]) => {
      const next = Array.isArray(nextValue) ? [...nextValue] : [nextValue];
      onValueChange?.(next);
    },
    [onValueChange]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full',
        className
      )}
      thumbAlignment="edge"
      onValueChange={handleValueChange as any}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col">
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="bg-muted relative z-0 grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className="bg-primary absolute z-10 select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="border-primary ring-ring-shadow block size-4 shrink-0 rounded-full border bg-background shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
