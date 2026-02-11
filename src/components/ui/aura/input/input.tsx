import { type ComponentProps, type ReactNode, forwardRef, useState } from "react";

import { IconEye, IconEyeOff } from "@tabler/icons-react";

import { HelperText } from "@/components/ui/aura/helper-text";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/aura/input-group";
import {
  cn,
  disabledState,
  filledState,
  focusState,
  formElementBase,
  invalidState,
  readOnlyState,
} from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
}

const InputErrorMessage = ({ errorMessage }: { errorMessage?: ReactNode }) => {
  if (!errorMessage) return null;
  return (
    <HelperText className="pt-1" isError>
      {errorMessage}
    </HelperText>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          data-slot="input"
          aria-invalid={errorMessage ? true : undefined}
          className={cn(
            "w-full",
            formElementBase,
            "p-2 text-sm font-normal leading-normal tracking-normal placeholder:text-muted-foreground",
            filledState,
            focusState,
            invalidState,
            disabledState,
            readOnlyState,
            type === "number" &&
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            className
          )}
          {...props}
        />
        <InputErrorMessage errorMessage={errorMessage} />
      </>
    );
  }
);

Input.displayName = "Input";

interface PasswordInputProps extends Omit<InputProps, "type"> {
  defaultVisible?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, errorMessage, defaultVisible = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(defaultVisible);

    return (
      <>
        <InputGroup className="has-[>[data-align=inline-end]]:[&>input]:pr-1">
          <InputGroupInput
            ref={ref}
            type={showPassword ? "text" : "password"}
            aria-invalid={errorMessage ? true : undefined}
            className={className}
            {...props}
          />
          <InputGroupAddon align="inline-end" className="py-1 pr-1 has-[>button]:-mr-0">
            <InputGroupButton
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              size="icon-sm"
            >
              {showPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <InputErrorMessage errorMessage={errorMessage} />
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
