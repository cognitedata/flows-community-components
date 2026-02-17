import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { type Icon, IconChevronDown } from "@tabler/icons-react";
import { type ComponentProps, type ComponentRef, forwardRef, useMemo } from "react";

import { cn } from "../../../../lib/utils";

type AccordionCommonProps = Omit<
  ComponentProps<typeof AccordionPrimitive.Root>,
  "multiple" | "value" | "defaultValue" | "onValueChange"
>;

type AccordionSingleProps = {
  type?: "single";
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type AccordionMultipleProps = {
  type: "multiple";
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionProps = AccordionCommonProps & (AccordionSingleProps | AccordionMultipleProps);

type AccordionMergedProps = AccordionCommonProps & {
  type?: "single" | "multiple";
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: ((value: string) => void) | ((value: string[]) => void);
};

const Accordion = forwardRef<ComponentRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  (props, ref) => {
    const merged = props as AccordionMergedProps;
    const {
      type = "single",
      collapsible = false,
      value,
      defaultValue,
      onValueChange,
      ...rootProps
    } = merged;
    const multiple = type === "multiple";

    const controlledValue = useMemo<string[] | undefined>(() => {
      if (value === undefined) return undefined;
      if (multiple) {
        if (Array.isArray(value)) return value;
        return [value];
      }
      if (Array.isArray(value)) return value;
      if (value === "") return [];
      return [value];
    }, [multiple, value]);

    const uncontrolledDefaultValue = useMemo<string[] | undefined>(() => {
      if (defaultValue === undefined) return undefined;
      if (multiple) {
        if (Array.isArray(defaultValue)) return defaultValue;
        return [defaultValue];
      }
      if (Array.isArray(defaultValue)) return defaultValue;
      if (defaultValue === "") return [];
      return [defaultValue];
    }, [defaultValue, multiple]);

    return (
      <AccordionPrimitive.Root
        ref={ref}
        data-slot="accordion"
        multiple={multiple}
        value={controlledValue}
        defaultValue={uncontrolledDefaultValue}
        onValueChange={(nextValue, details) => {
          if (!onValueChange) return;

          if (multiple) {
            const filtered = nextValue.filter((v): v is string => v != null);
            (onValueChange as (value: string[]) => void)(filtered);
            return;
          }

          if (!collapsible && nextValue.length === 0) {
            details.cancel();
            return;
          }

          const next = nextValue[0] ?? "";
          (onValueChange as (value: string) => void)(next);
        }}
        {...rootProps}
      />
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionPrimitive.Item.Props
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("mt-2 first:mt-0 rounded-md hover:bg-accent data-open:bg-accent", className)}
      {...props}
    />
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionPrimitive.Trigger.Props & {
    icon?: Icon;
  }
>(({ className, children, icon, ...props }, ref) => {
  const Icon = icon;

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring-shadow group/accordion-trigger flex flex-1 items-start justify-between gap-4 rounded-md p-2 text-left focus-visible:ring text-base leading-5 tracking-tightest font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
          )}
          <span>{children}</span>
        </div>
        <IconChevronDown className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Panel>,
  AccordionPrimitive.Panel.Props
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-base leading-5 tracking-tightest transition-all duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn("px-2 pb-2 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
