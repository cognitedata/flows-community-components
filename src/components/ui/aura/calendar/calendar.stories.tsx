import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
const meta: Meta<typeof Calendar> = {
  title: "Primitives/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      table: {
        category: "Behavior",
        type: {
          summary: '"single" | "multiple" | "range"',
        },
        defaultValue: {
          summary: "single",
        },
      },
    },
    showOutsideDays: {
      control: "boolean",
      table: {
        category: "Display",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
    captionLayout: {
      control: "select",
      options: ["label", "dropdown", "dropdown-months", "dropdown-years"],
      table: {
        category: "Display",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "label",
        },
      },
    },
    buttonVariant: {
      control: "select",
      options: ["ghost", "outline", "secondary"],
      table: {
        category: "Appearance",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "ghost",
        },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        category: "State",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Calendar>;
export const Default: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" className="rounded-md" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const calendar = canvasElement.querySelector('[data-slot="calendar"]');
    await expect(calendar).toBeInTheDocument();
    const prevButton = canvasElement.querySelector(".rdp-button_previous");
    const nextButton = canvasElement.querySelector(".rdp-button_next");
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
  },
};
export const SingleSelection: Story = {
  render: function SingleSelectionCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const dayButtons = canvasElement.querySelectorAll(
      '[data-slot="calendar"] button:not(.rdp-button_previous):not(.rdp-button_next)'
    );
    if (dayButtons.length > 10) {
      await userEvent.click(dayButtons[10] as HTMLElement);
    }
  },
};
export const RangeSelection: Story = {
  render: function RangeSelectionCalendar() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            className="rounded-md"
            numberOfMonths={2}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Range: {range?.from?.toLocaleDateString()} - {range?.to?.toLocaleDateString()}
        </p>
      </div>
    );
  },
};
export const MultipleSelection: Story = {
  render: function MultipleSelectionCalendar() {
    const [dates, setDates] = useState<Date[] | undefined>([]);
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Calendar mode="multiple" selected={dates} onSelect={setDates} className="rounded-md" />
        </div>
        <p className="text-sm text-muted-foreground">Selected: {dates?.length || 0} date(s)</p>
      </div>
    );
  },
};
export const WithDropdowns: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar
        mode="single"
        captionLayout="dropdown"
        fromYear={2020}
        toYear={2030}
        className="rounded-md"
      />
    </div>
  ),
};
export const DisabledDates: Story = {
  render: () => {
    const disabledDays = [
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      {
        dayOfWeek: [0, 6],
      },
    ];
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Calendar mode="single" disabled={disabledDays} className="rounded-md" />
        </div>
        <p className="text-sm text-muted-foreground">Weekends and specific dates are disabled.</p>
      </div>
    );
  },
};
export const WithWeekNumbers: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" showWeekNumber className="rounded-md" />
    </div>
  ),
};
export const WithoutOutsideDays: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" showOutsideDays={false} className="rounded-md" />
    </div>
  ),
};
export const DateConstraints: Story = {
  render: () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Calendar mode="single" fromDate={today} toDate={nextMonth} className="rounded-md" />
        </div>
        <p className="text-sm text-muted-foreground">
          Only dates from today to one month ahead are selectable.
        </p>
      </div>
    );
  },
};
export const TwoMonths: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" numberOfMonths={2} className="rounded-md" />
    </div>
  ),
};
export const OutlineButtons: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" buttonVariant="outline" className="rounded-md" />
    </div>
  ),
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Selection</h3>
        <div className="rounded-md border w-fit">
          <Calendar mode="single" className="rounded-md" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Range Selection (2 months)</h3>
        <div className="rounded-md border w-fit">
          <Calendar mode="range" numberOfMonths={2} className="rounded-md" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Dropdowns</h3>
        <div className="rounded-md border w-fit">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            fromYear={2020}
            toYear={2030}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const Playground: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
    captionLayout: "label",
    buttonVariant: "ghost",
  },
  render: (args) => (
    <div className="rounded-md border">
      <Calendar {...args} className="rounded-md" />
    </div>
  ),
};
