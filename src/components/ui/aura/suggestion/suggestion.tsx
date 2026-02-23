import {
  type ComponentProps,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "../../../../lib/utils";
import { Button } from "../button";
import { ScrollArea, ScrollBar } from "../scroll-area";
import {
  Select,
  SelectContent as SelectContentPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectLabel as SelectLabelPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
} from "../select";

type SuggestionsProps = ComponentProps<typeof ScrollArea>;

export const Suggestions = ({ className, children, ...props }: SuggestionsProps) => (
  <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div className={cn("flex w-max flex-nowrap items-center gap-2", className)}>{children}</div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

type SuggestionContextValue = {
  onItemSelect: (value: string) => void;
};

const SuggestionContext = createContext<SuggestionContextValue | null>(null);

const useSuggestion = () => {
  const context = useContext(SuggestionContext);
  if (!context) {
    throw new Error("Suggestion components must be used within Suggestion");
  }
  return context;
};

type SuggestionButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  suggestion: string;
  onClick?: (suggestion: string) => void;
  onValueChange?: never;
  variant?: "ghost" | "outline";
  size?: "sm" | "default" | "lg" | "icon";
};

type SuggestionSelectProps = ComponentProps<"div"> & {
  suggestion?: never;
  onClick?: never;
  onValueChange?: (value: string) => void;
  variant?: never;
  size?: never;
};

type SuggestionProps = SuggestionButtonProps | SuggestionSelectProps;

const isButtonSuggestion = (props: SuggestionProps): props is SuggestionButtonProps =>
  "suggestion" in props;

export const Suggestion = (props: SuggestionProps) => {
  if (isButtonSuggestion(props)) {
    const {
      suggestion,
      onClick,
      className,
      children,
      variant = "ghost",
      size = "sm",
      ...buttonProps
    } = props;

    const handleClick = () => {
      onClick?.(suggestion);
    };

    return (
      <Button
        className={cn(
          "min-h-9 h-auto bg-background text-sm leading-4.5 tracking-normal px-3 py-2.25",
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

  const { onValueChange, className, children, ...divProps } = props;
  const [open, setOpen] = useState(false);

  const handleValueChange = useCallback(
    (value: string) => {
      if (value) {
        onValueChange?.(value);
        setOpen(false);
      }
    },
    [onValueChange]
  );

  const handleItemSelect = useCallback(
    (value: string) => {
      onValueChange?.(value);
      setOpen(false);
    },
    [onValueChange]
  );

  const suggestionContext = useMemo(() => ({ onItemSelect: handleItemSelect }), [handleItemSelect]);

  return (
    <SuggestionContext.Provider value={suggestionContext}>
      <Select open={open} onOpenChange={setOpen} value="" onValueChange={handleValueChange}>
        <div className={cn(className)} {...divProps}>
          {children}
        </div>
      </Select>
    </SuggestionContext.Provider>
  );
};

type SuggestionTriggerProps = ComponentProps<typeof SelectTriggerPrimitive>;

export const SuggestionTrigger = ({ className, children, ...props }: SuggestionTriggerProps) => {
  return (
    <SelectTriggerPrimitive
      className={cn(
        "min-w-0 bg-background text-foreground text-sm leading-4.5 tracking-normal font-medium px-3 py-2.25 border-transparent focus-visible:border-ring [&_svg]:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </SelectTriggerPrimitive>
  );
};

type SuggestionValueProps = Omit<ComponentProps<typeof SelectValuePrimitive>, "icon">;

export const SuggestionValue = ({ className, ...props }: SuggestionValueProps) => {
  return <SelectValuePrimitive className={className} {...props} />;
};

type SuggestionContentProps = ComponentProps<typeof SelectContentPrimitive>;

export const SuggestionContent = ({
  className,
  children,
  align = "start",
  ...props
}: SuggestionContentProps) => {
  return (
    <SelectContentPrimitive className={className} align={align} {...props}>
      {children}
    </SelectContentPrimitive>
  );
};

type SuggestionItemProps = Omit<ComponentProps<typeof SelectItemPrimitive>, "value"> & {
  icon?: ReactNode;
};

export const SuggestionItem = ({ className, children, icon, ...props }: SuggestionItemProps) => {
  const { onItemSelect } = useSuggestion();

  const textValue = useMemo(() => {
    if (typeof children === "string") {
      return children;
    }
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

type SuggestionGroupProps = ComponentProps<typeof SelectGroupPrimitive>;

export const SuggestionGroup = ({ className, children, ...props }: SuggestionGroupProps) => {
  return (
    <SelectGroupPrimitive className={className} {...props}>
      {children}
    </SelectGroupPrimitive>
  );
};

type SuggestionLabelProps = ComponentProps<typeof SelectLabelPrimitive>;

export const SuggestionLabel = ({ className, children, ...props }: SuggestionLabelProps) => {
  return (
    <SelectLabelPrimitive className={className} {...props}>
      {children}
    </SelectLabelPrimitive>
  );
};

type SuggestionSeparatorProps = ComponentProps<typeof SelectSeparatorPrimitive>;

export const SuggestionSeparator = ({ className, ...props }: SuggestionSeparatorProps) => {
  return <SelectSeparatorPrimitive className={className} {...props} />;
};
