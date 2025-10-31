import { Calendar } from "@/components/ui/draft/calendar";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Calendar
          mode="single"
          className="rounded-md"
        />
      </div>
      
      <div className="rounded-md border">
        <Calendar
          mode="range"
          className="rounded-md"
        />
      </div>
      
      <p className="text-sm text-muted-foreground">
        Interactive calendar with month/year navigation. Click the arrow buttons to navigate between months.
      </p>
    </div>
  );
}

export const calendarExamples: ComponentExamples = {
  basic: {
    title: "Calendar Demo",
    description: "Interactive calendar component with month/year navigation and date selection",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import { Calendar } from "@/components/ui/draft/calendar"
import { useState } from "react"

export function BasicDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      
      <Calendar
        mode="range"
        className="rounded-md border"
      />
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const calendarMeta = {
  name: "Calendar",
  description: "A date picker component for selecting dates and date ranges.",
  llmUsage: "When asked for a calendar, use `<Calendar>` for date selection functionality.",
  importPath: "@/components/ui/draft/calendar",
};
