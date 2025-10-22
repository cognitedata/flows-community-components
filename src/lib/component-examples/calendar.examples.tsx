import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="max-w-sm">
      <div className="border rounded p-4 bg-background">
        <div className="text-center font-medium mb-4">December 2024</div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="p-2 text-center text-muted-foreground">
              {day}
            </div>
          ))}
          {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`p-2 text-center ${
                day === 10
                  ? "bg-primary text-primary-foreground rounded"
                  : "hover:bg-muted rounded cursor-pointer"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const calendarExamples: ComponentExamples = {
  basic: {
    title: "Calendar Demo",
    description: "Date picker calendar component",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import { Calendar } from "@/components/ui/cognite/calendar"
import { useState } from "react"

export function BasicDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`,
  },
};

