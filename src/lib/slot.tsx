import * as React from "react";

import { cn } from "@/lib/utils";

type AnyProps = Record<string, unknown>;

function assignRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref && typeof ref === "object") {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T) => {
    for (const ref of refs) assignRef(ref, value);
  };
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  const merged: AnyProps = { ...slotProps, ...childProps };

  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    if (
      key.startsWith("on") &&
      typeof slotValue === "function" &&
      typeof childValue === "function"
    ) {
      merged[key] = (...args: unknown[]) => {
        (childValue as (...a: unknown[]) => void)(...args);
        (slotValue as (...a: unknown[]) => void)(...args);
      };
    }

    if (key === "className") {
      merged[key] = cn(childValue as string, slotValue as string);
    }

    if (key === "style" && typeof slotValue === "object" && typeof childValue === "object") {
      merged[key] = { ...(childValue as object), ...(slotValue as object) };
    }
  }

  return merged;
}

export type SlotProps<T extends React.ElementType = React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    children: React.ReactElement;
  };

export const Slot = React.forwardRef<HTMLElement, SlotProps>(function Slot(
  { children, ...props },
  forwardedRef
) {
  if (!React.isValidElement(children)) return null;

  const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref;
  const merged = mergeProps(props as AnyProps, (children.props ?? {}) as AnyProps);

  return React.cloneElement(children, {
    ...merged,
    ref: composeRefs(forwardedRef, childRef),
  });
});
