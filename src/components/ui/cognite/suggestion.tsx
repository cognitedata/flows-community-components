"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/cognite/select";
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/cognite/scroll-area";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type SuggestionsProps = ComponentProps<typeof ScrollArea>;

export const Suggestions = ({
  className,
  children,
  ...props
}: SuggestionsProps) => (
  <ScrollArea className="w-full overflow-x-auto whitespace-nowrap" {...props}>
    <div className={cn("flex w-max flex-nowrap items-center gap-2", className)}>
      {children}
    </div>
    <ScrollBar className="hidden" orientation="horizontal" />
  </ScrollArea>
);

export type SuggestionProps = Omit<ComponentProps<typeof Select>, "onValueChange"> & {
  suggestion: string;
  onValueChange?: (value: string) => void;
  className?: string;
  size?: "sm" | "default";
};

export const Suggestion = ({
  suggestion,
  onValueChange,
  className,
  size = "sm",
  children,
  ...props
}: SuggestionProps) => {
  return (
    <Select onValueChange={onValueChange} {...props}>
      <SelectTrigger
        className={cn("h-9 cursor-pointer rounded-lg leading-18 px-3 py-2.25", className)}
        size={size}
      >
        <SelectValue placeholder={children || suggestion} />
      </SelectTrigger>
      <SelectContent>
        {children}
      </SelectContent>
    </Select>
  );
};
