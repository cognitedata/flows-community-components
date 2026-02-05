import { type ComponentProps, forwardRef, useEffect, useState } from "react";

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
  hoverState,
  invalidState,
  readOnlyState,
} from "@/lib/utils";
import { IconCheck, IconCopy, IconEye, IconEyeOff } from "@tabler/icons-react";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
  copy?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, errorMessage, copy = true, readOnly, value, defaultValue, ...props },
    ref
  ) => {
    const [copied, setCopied] = useState(false);
    const [isClipboardAvailable, setIsClipboardAvailable] = useState(true);

    useEffect(() => {
      setIsClipboardAvailable(
        typeof navigator !== "undefined" && typeof navigator.clipboard !== "undefined"
      );
    }, []);

    const handleCopy = async () => {
      const inputValue = value || defaultValue;
      if (inputValue && typeof inputValue === "string") {
        try {
          await navigator.clipboard.writeText(inputValue);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
      }
    };

    const shouldShowCopy = readOnly && copy && isClipboardAvailable;

    if (shouldShowCopy) {
      return (
        <>
          <InputGroup>
            <InputGroupInput
              ref={ref}
              type={type}
              readOnly={readOnly}
              value={value}
              defaultValue={defaultValue}
              aria-invalid={errorMessage ? true : undefined}
              className={className}
              {...props}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                size="icon-sm"
              >
                {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {errorMessage && (
            <HelperText className="pt-1" isError>
              {errorMessage}
            </HelperText>
          )}
        </>
      );
    }

    return (
      <>
        <input
          ref={ref}
          type={type}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          data-slot="input"
          aria-invalid={errorMessage ? true : undefined}
          className={cn(
            "w-full",
            formElementBase,
            hoverState,
            filledState,
            focusState,
            invalidState,
            disabledState,
            readOnlyState,
            className
          )}
          {...props}
        />

        {errorMessage && (
          <HelperText className="pt-1" isError>
            {errorMessage}
          </HelperText>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

interface PasswordInputProps extends Omit<InputProps, "type" | "copy"> {
  defaultVisible?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, errorMessage, defaultVisible = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(defaultVisible);

    return (
      <>
        <InputGroup>
          <InputGroupInput
            ref={ref}
            type={showPassword ? "text" : "password"}
            aria-invalid={errorMessage ? true : undefined}
            className={className}
            {...props}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              size="icon-sm"
            >
              {showPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {errorMessage && (
          <HelperText className="pt-1" isError>
            {errorMessage}
          </HelperText>
        )}
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };
