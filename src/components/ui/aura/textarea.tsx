'use client';

import { useState, type ComponentProps, type ChangeEvent } from 'react';

import { cn } from '@/common/utils';
import { HelperText } from './helper-text';

interface TextareaProps extends ComponentProps<'textarea'> {
  maxChars?: number;
  errorMessage?: string;
  overLimitMessage?: string;
  charactersLeftMessage?: (remaining: number) => string;
}

function Textarea({
  className,
  maxChars,
  errorMessage,
  overLimitMessage = 'Too many characters',
  charactersLeftMessage = (remaining) => `${remaining} characters left`,
  ...props
}: TextareaProps) {
  // Initialize character count from defaultValue or value
  const [charCount, setCharCount] = useState(() => {
    const initialValue = props.defaultValue || props.value || '';
    return String(initialValue).length;
  });

  // Check if character count exceeds maxChars
  const isOverLimit = maxChars !== undefined && charCount > maxChars;

  // Invalid if errorMessage provided OR over character limit
  const isInvalid = !!errorMessage || isOverLimit;

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
        aria-invalid={isInvalid ? true : undefined}
        className={cn(
          'border-border placeholder:text-muted-foreground focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent p-1.75 text-base tracking-tightest leading-5 transition-[color] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onChange={handleChange}
        {...props}
      />
      {errorMessage && <HelperText isError>{errorMessage}</HelperText>}
      {maxChars !== undefined && (
        <HelperText isError={isOverLimit}>
          {isOverLimit
            ? overLimitMessage
            : charactersLeftMessage(maxChars - charCount)}
        </HelperText>
      )}
    </>
  );
}

export { Textarea };
