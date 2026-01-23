import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/aura/button";
import { Calendar } from "@/components/ui/aura/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/aura/popover";
import { cn } from "@/lib/utils";

export function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-60 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <IconCalendar className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

export function DatePickerCustom({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
  id,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  const handleDateChange = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-60 justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <IconCalendar className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  from?: Date | undefined;
  to?: Date | undefined;
  onValueChange?: (range: {
    from: Date | undefined;
    to?: Date | undefined;
  }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DateRangePicker({
  from,
  to,
  onValueChange,
  placeholder = "Pick a date range",
  className,
  disabled = false,
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({ from, to });

  const handleRangeChange = (
    range: { from: Date | undefined; to?: Date | undefined } | undefined
  ) => {
    const newRange = range || { from: undefined, to: undefined };
    setSelectedRange(newRange);
    onValueChange?.(newRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-60 justify-start text-left font-normal",
            !selectedRange.from && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <IconCalendar className="mr-2 h-4 w-4" />
          {selectedRange.from ? (
            selectedRange.to ? (
              <>
                {format(selectedRange.from, "LLL dd, y")} - {format(selectedRange.to, "LLL dd, y")}
              </>
            ) : (
              format(selectedRange.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" selected={selectedRange} onSelect={handleRangeChange} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
