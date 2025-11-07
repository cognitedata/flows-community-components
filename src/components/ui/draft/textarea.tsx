import { useState, type ComponentProps, type ChangeEvent } from "react"

import { cn } from "@/lib/utils"
import { IconExclamationCircle } from "@tabler/icons-react"

interface TextareaProps extends ComponentProps<"textarea"> {
  maxChars?: number;
}

function Textarea({ className, maxChars, ...props }: TextareaProps) {
  // Initialize character count from defaultValue or value
  const [charCount, setCharCount] = useState(() => {
    const initialValue = props.defaultValue || props.value || "";
    return String(initialValue).length;
  });
  
  const dataInvalid = (props as unknown as { [key: string]: unknown })[
    "data-invalid"
  ];
  const isInvalid = dataInvalid === true || dataInvalid === "true";
  
  // Check if character count exceeds maxChars
  const isOverLimit = maxChars !== undefined && charCount > maxChars;
  const finalIsInvalid = isInvalid || isOverLimit;
  
  // Remove data-invalid from props to avoid passing it to the DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { "data-invalid": _, ...restProps } = props as unknown as {
    [key: string]: unknown;
  };
  
  // Handle textarea changes to track character count
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  
  return (
    <>
      <textarea
        data-slot="textarea"
        aria-invalid={finalIsInvalid ? true : undefined}
        className={cn(
          "border-border placeholder:text-muted-foreground focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent p-1.75 text-base tracking-tightest leading-20 transition-[color] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleChange}
        {...(restProps as ComponentProps<"textarea">)}
      />
      {isInvalid && (
        <div className="flex flex-row gap-1 justify-start items-center">
          <IconExclamationCircle className="text-destructive-foreground text-sm size-4" />
          <span className="text-destructive-foreground text-sm">
            Error message
          </span>
        </div>
      )}
      {maxChars !== undefined && (
        <div className="flex flex-row gap-1 justify-start items-center">
          {isOverLimit && (
            <IconExclamationCircle className="text-destructive-foreground text-sm size-4" />
          )}
          <span className={cn(
            "text-sm tracking-tight leading-20",
            isOverLimit ? "text-destructive-foreground" : "text-muted-foreground"
          )}>
            {isOverLimit 
              ? "Too many characters" 
              : `${maxChars - charCount} characters left`
            }
          </span>
        </div>
      )}
    </>
  )
}

export { Textarea }
