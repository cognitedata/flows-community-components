import * as React from 'react';

import { cn } from '@/lib/utils';
import { HelperText } from './helper-text';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  const dataInvalid = (props as unknown as { [key: string]: unknown })[
    'data-invalid'
  ];
  const isInvalid = dataInvalid === true || dataInvalid === 'true';

  // Remove data-invalid from props to avoid passing it to the DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { 'data-invalid': _, ...restProps } = props as unknown as {
    [key: string]: unknown;
  };

  return (
    <>
      <input
        type={type}
        data-slot="input"
        aria-invalid={isInvalid ? true : undefined}
        className={cn(
          'border border-border p-1.75 w-[400px] rounded-md h-9.15 text-base leading-20 tracking-tightest text-muted-foreground dark:text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 filled:border-border filled:text-foreground focus:shadow-[0_0_0_2px_var(--ring)] aria-invalid:border-destructive-foreground focus-visible:shadow-none disabled:shadow-none disabled:bg-disabled disabled:border-disabled',
          className
        )}
        {...(restProps as React.ComponentProps<'input'>)}
      />

      {isInvalid && <HelperText isError>Error message</HelperText>}
    </>
  );
}

export { Input };
