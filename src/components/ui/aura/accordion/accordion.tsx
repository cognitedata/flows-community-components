import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { IconChevronDown } from "@tabler/icons-react";
import { type ComponentProps, forwardRef, useMemo } from "react";

import { cn } from "@/lib/utils";
import type { Icon } from "@tabler/icons-react";

type AccordionType = "single" | "multiple";

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

const Accordion = forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  (props, ref) => {
    const { type = "single" } = props;
    const multiple = type === "multiple";

    const { collapsible = false } = (props as AccordionSingleProps) ?? {};
    const {
      type: _type,
      collapsible: _collapsible,
      value,
      defaultValue,
      onValueChange,
      ...rootProps
    } = props as any;

    const controlledValue = useMemo(() => {
      if (value === undefined) return undefined;
      if (multiple) return Array.isArray(value) ? value : [value];
      if (value === "") return [];
      return [value];
    }, [multiple, value]);

    const uncontrolledDefaultValue = useMemo(() => {
      if (defaultValue === undefined) return undefined;
      if (multiple) return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      if (defaultValue === "") return [];
      return [defaultValue];
    }, [defaultValue, multiple]);

    return (
      <AccordionPrimitive.Root
        ref={ref}
        data-slot="accordion"
        multiple={multiple}
        value={controlledValue as any}
        defaultValue={uncontrolledDefaultValue as any}
        onValueChange={(nextValue, details) => {
          if (multiple) {
            onValueChange?.(nextValue.filter((v: unknown) => v != null) as any);
            return;
          }

          if (collapsible === false && nextValue.length === 0) {
            details.cancel();
            return;
          }

          const next = nextValue[0];
          onValueChange?.((next ?? "") as any);
        }}
        {...rootProps}
      />
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
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
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
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
  React.ElementRef<typeof AccordionPrimitive.Panel>,
  AccordionPrimitive.Panel.Props
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      data-slot="accordion-content"
      className="data-closed:animate-accordion-up data-open:animate-accordion-down overflow-hidden text-base leading-5 tracking-tightest"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0 px-2 pb-2 pt-0",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
