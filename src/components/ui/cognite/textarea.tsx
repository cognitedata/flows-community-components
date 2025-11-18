'use client';

import { useState, type ComponentProps, type ChangeEvent } from 'react';

import { cn } from '@/lib/utils';
import { HelperText } from './helper-text';

interface TextareaProps extends ComponentProps<'textarea'> {
  maxChars?: number;
}

function Textarea({ className, maxChars, ...props }: TextareaProps) {
  // Initialize character count from defaultValue or value
  const [charCount, setCharCount] = useState(() => {
    const initialValue = props.defaultValue || props.value || '';
    return String(initialValue).length;
  });

  const dataInvalid = (props as unknown as { [key: string]: unknown })[
    'data-invalid'
  ];
  const isInvalid = dataInvalid === true || dataInvalid === 'true';

  // Check if character count exceeds maxChars
  const isOverLimit = maxChars !== undefined && charCount > maxChars;
  const finalIsInvalid = isInvalid || isOverLimit;

  // Remove data-invalid from props to avoid passing it to the DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { 'data-invalid': _, ...restProps } = props as unknown as {
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
          'border-border hover:bg-accent placeholder:text-muted-foreground focus-visible:ring-ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent p-1.75 text-base tracking-tightest leading-20 transition-[color] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        onChange={handleChange}
        {...(restProps as ComponentProps<'textarea'>)}
      />
      {isInvalid && <HelperText isError>Error message</HelperText>}
      {maxChars !== undefined && (
        <HelperText isError={isOverLimit}>
          {isOverLimit
            ? 'Too many characters'
            : `${maxChars - charCount} characters left`}
        </HelperText>
      )}
    </>
  );
}

export { Textarea };
