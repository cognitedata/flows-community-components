import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { type Icon, IconChevronDown } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ComponentRef,
  forwardRef,
  useMemo,
} from 'react';

import { cn } from '../../../../lib/utils';

type AccordionCommonProps = Omit<
  ComponentProps<typeof AccordionPrimitive.Root>,
  'multiple' | 'value' | 'defaultValue' | 'onValueChange'
>;

type AccordionSingleProps = {
  type?: 'single';
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type AccordionMultipleProps = {
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

type AccordionProps = AccordionCommonProps &
  (AccordionSingleProps | AccordionMultipleProps);

const Accordion = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>((props, ref) => {
  if (props.type === 'multiple') {
    const {
      type: _type,
      value,
      defaultValue,
      onValueChange,
      ...rootProps
    } = props;

    const controlledValue = useMemo<string[] | undefined>(() => {
      if (value === undefined) return undefined;
      return value;
    }, [value]);

    const uncontrolledDefaultValue = useMemo<string[] | undefined>(() => {
      if (defaultValue === undefined) return undefined;
      return defaultValue;
    }, [defaultValue]);

    return (
      <AccordionPrimitive.Root
        ref={ref}
        data-slot="accordion"
        multiple
        value={controlledValue}
        defaultValue={uncontrolledDefaultValue}
        onValueChange={(nextValue) => {
          if (!onValueChange) return;
          const filtered = nextValue.filter(
            (next): next is string => next != null
          );
          onValueChange(filtered);
        }}
        {...rootProps}
      />
    );
  }

  const {
    type: _type,
    collapsible = false,
    value,
    defaultValue,
    onValueChange,
    ...rootProps
  } = props;

  const controlledValue = useMemo<string[] | undefined>(() => {
    if (value === undefined) return undefined;
    if (value === '') return [];
    return [value];
  }, [value]);

  const uncontrolledDefaultValue = useMemo<string[] | undefined>(() => {
    if (defaultValue === undefined) return undefined;
    if (defaultValue === '') return [];
    return [defaultValue];
  }, [defaultValue]);

  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion"
      multiple={false}
      value={controlledValue}
      defaultValue={uncontrolledDefaultValue}
      onValueChange={(nextValue, details) => {
        if (!onValueChange) return;
        if (!collapsible && nextValue.length === 0) {
          details.cancel();
          return;
        }
        onValueChange(nextValue[0] ?? '');
      }}
      {...rootProps}
    />
  );
});
Accordion.displayName = 'Accordion';

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionPrimitive.Item.Props
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn('mt-2 first:mt-0 rounded-md', className)}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

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
          'focus-visible:border-ring focus-visible:ring-ring-shadow group/accordion-trigger flex flex-1 items-start justify-between gap-4 rounded-md p-2 text-left hover:bg-accent focus-visible:ring text-base leading-5 tracking-tightest font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
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
AccordionTrigger.displayName = 'AccordionTrigger';

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
      <div className={cn('px-2 pb-2 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
