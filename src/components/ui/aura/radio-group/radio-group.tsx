import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { IconCircle } from "@tabler/icons-react";

import { cn } from "../../../../lib/utils";

type Orientation = "horizontal" | "vertical";

function RadioGroup({
  className,
  orientation = "vertical",
  ...props
}: RadioGroupPrimitive.Props & { orientation?: Orientation }) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-orientation={orientation}
      className={cn(
        orientation === "horizontal" ? "flex items-center gap-3" : "grid gap-3",
        className
      )}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioPrimitive.Root.Props) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring-shadow aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
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
}

export { RadioGroup, RadioGroupItem };
