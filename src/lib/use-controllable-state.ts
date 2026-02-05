import * as React from "react";

type UseControllableStateParams<T> = {
  prop?: T;
  defaultProp: T;
  onChange?: (next: T) => void;
};

type SetStateAction<T> = T | ((prev: T) => T);

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>): readonly [T, (next: SetStateAction<T>) => void] {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<T>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? (prop as T) : uncontrolledValue;

  const onChangeRef = React.useRef(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const setValue = React.useCallback(
    (next: SetStateAction<T>) => {
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(value) : next;

      if (!isControlled) {
        setUncontrolledValue(resolved);
      }

      onChangeRef.current?.(resolved);
    },
    [isControlled, value]
  );

  return [value, setValue] as const;
}
