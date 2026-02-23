import {
  Children,
  type ComponentProps,
  type ReactNode,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { cn } from '../../../../lib/utils';

import { Button } from '@/components/ui/aura/button';
import { ScrollArea, ScrollBar } from '@/components/ui/aura/scroll-area';
import {
  Select,
  SelectContent as SelectContentPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectLabel as SelectLabelPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
} from '@/components/ui/aura/select';

export type SuggestionsProps = ComponentProps<typeof ScrollArea>;

export const Suggestions = ({
  className,
  children,
  ...props
}: SuggestionsProps) => (
  <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div className={cn('flex w-max flex-nowrap items-center gap-2', className)}>
      {children}
    </div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

// Context for Suggestion component
type SuggestionContextValue = {
  onItemSelect: (value: string) => void;
};

const SuggestionContext = createContext<SuggestionContextValue | null>(null);

const useSuggestion = () => {
  const context = useContext(SuggestionContext);
  if (!context) {
    throw new Error('Suggestion components must be used within Suggestion');
  }
  return context;
};

// Helper to detect if children contain SuggestionTrigger
const hasSuggestionTrigger = (children: ReactNode): boolean => {
  let hasTrigger = false;
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SuggestionTrigger) {
      hasTrigger = true;
    }
  });
  return hasTrigger;
};

// Main Suggestion component with dual modes
export type SuggestionProps =
  | (Omit<ComponentProps<typeof Button>, 'onClick'> & {
      suggestion: string;
      onClick?: (suggestion: string) => void;
      onValueChange?: never;
      /** Only ghost and outline variants are supported. Suggestions are designed to have secondary backgrounds with primary text. */
      variant?: 'ghost' | 'outline';
      size?: 'sm' | 'default' | 'lg' | 'icon';
    })
  | (ComponentProps<'div'> & {
      suggestion?: never;
      onClick?: never;
      onValueChange?: (value: string) => void;
      variant?: never;
      size?: never;
    });

export const Suggestion = (props: SuggestionProps) => {
  const {
    suggestion,
    onClick,
    onValueChange,
    className,
    children,
    ...restProps
  } = props;

  const [open, setOpen] = useState(false);

  // Detect mode based on children
  const isSelectMode = hasSuggestionTrigger(children as ReactNode);

  // Handle item selection for Select mode
  const handleValueChange = useCallback(
    (value: string) => {
      if (value) {
        onValueChange?.(value);
        setOpen(false); // Auto-close after selection
      }
    },
    [onValueChange]
  );

  const handleItemSelect = useCallback(
    (value: string) => {
      onValueChange?.(value);
      setOpen(false); // Auto-close after selection
    },
    [onValueChange]
  );

  const suggestionContext = useMemo(
    () => ({ onItemSelect: handleItemSelect }),
    [handleItemSelect]
  );

  // Button mode (original behaviour)
  if (!isSelectMode && suggestion) {
    const {
      variant = 'ghost',
      size = 'sm',
      ...buttonProps
    } = restProps as {
      variant?: 'ghost' | 'outline';
      size?: 'sm' | 'default' | 'lg' | 'icon';
    } & Omit<ComponentProps<typeof Button>, 'onClick' | 'variant' | 'size'>;

    const handleClick = () => {
      onClick?.(suggestion);
    };

    return (
      <Button
        className={cn(
          'min-h-9 h-auto bg-background text-sm leading-4.5 tracking-normal px-3 py-2.25',
          className
        )}
        onClick={handleClick}
        size={size}
        type="button"
        variant={variant}
        {...buttonProps}
      >
        {children || suggestion}
      </Button>
    );
  }

  // Select mode - cast to div props
  const divProps = restProps as ComponentProps<'div'>;

  return (
    <SuggestionContext.Provider value={suggestionContext}>
      <Select
        open={open}
        onOpenChange={setOpen}
        value=""
        onValueChange={handleValueChange}
      >
        <div className={cn(className)} {...divProps}>
          {children}
        </div>
      </Select>
    </SuggestionContext.Provider>
  );
};

// Suggestion sub-components that wrap Select components

export type SuggestionTriggerProps = ComponentProps<
  typeof SelectTriggerPrimitive
>;

export const SuggestionTrigger = ({
  className,
  children,
  ...props
}: SuggestionTriggerProps) => {
  return (
    <SelectTriggerPrimitive
      className={cn(
        'min-w-0 bg-background text-foreground text-sm leading-4.5 tracking-normal font-medium px-3 py-2.25 border-transparent focus-visible:border-ring [&_svg]:opacity-100',
        className
      )}
      {...props}
    >
      {children}
    </SelectTriggerPrimitive>
  );
};

export type SuggestionValueProps = Omit<
  ComponentProps<typeof SelectValuePrimitive>,
  'icon'
>;

export const SuggestionValue = ({
  className,
  ...props
}: SuggestionValueProps) => {
  return <SelectValuePrimitive className={className} {...props} />;
};

export type SuggestionContentProps = ComponentProps<
  typeof SelectContentPrimitive
>;

export const SuggestionContent = ({
  className,
  children,
  align = 'start',
  ...props
}: SuggestionContentProps) => {
  return (
    <SelectContentPrimitive className={className} align={align} {...props}>
      {children}
    </SelectContentPrimitive>
  );
};

export type SuggestionItemProps = Omit<
  ComponentProps<typeof SelectItemPrimitive>,
  'value'
> & {
  icon?: ReactNode;
};

export const SuggestionItem = ({
  className,
  children,
  icon,
  ...props
}: SuggestionItemProps) => {
  const { onItemSelect } = useSuggestion();

  // Extract text content from children to use as value
  const textValue = useMemo(() => {
    if (typeof children === 'string') {
      return children;
    }
    // For complex children, try to extract text
    return String(children);
  }, [children]);

  const handleSelect = () => {
    onItemSelect(textValue);
  };

  return (
    <SelectItemPrimitive
      className={className}
      icon={icon}
      value={textValue}
      onSelect={handleSelect}
      {...props}
    >
      {children}
    </SelectItemPrimitive>
  );
};

export type SuggestionGroupProps = ComponentProps<typeof SelectGroupPrimitive>;

export const SuggestionGroup = ({
  className,
  children,
  ...props
}: SuggestionGroupProps) => {
  return (
    <SelectGroupPrimitive className={className} {...props}>
      {children}
    </SelectGroupPrimitive>
  );
};

export type SuggestionLabelProps = ComponentProps<typeof SelectLabelPrimitive>;

export const SuggestionLabel = ({
  className,
  children,
  ...props
}: SuggestionLabelProps) => {
  return (
    <SelectLabelPrimitive className={className} {...props}>
      {children}
    </SelectLabelPrimitive>
  );
};

export type SuggestionSeparatorProps = ComponentProps<
  typeof SelectSeparatorPrimitive
>;

export const SuggestionSeparator = ({
  className,
  ...props
}: SuggestionSeparatorProps) => {
  return <SelectSeparatorPrimitive className={className} {...props} />;
};
