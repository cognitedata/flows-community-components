import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useState } from "react";
import { DatePicker, DatePickerCustom, DateRangePicker } from "./date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Primitives/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

/**
 * Default date picker.
 */
export const Default: Story = {
  render: () => <DatePicker />,
  parameters: {
    docs: {
      description: {
        story: "Default date picker with calendar popover.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the trigger button
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    // Wait for calendar to appear
    await waitFor(() => {
      const calendar = document.querySelector('[data-slot="calendar"]');
      expect(calendar).toBeInTheDocument();
    });
  },
};

/**
 * Custom date picker with controlled state.
 */
export const Controlled: Story = {
  render: function ControlledDatePicker() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="space-y-4">
        <DatePickerCustom date={date} onDateChange={setDate} />
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "None"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with controlled state.",
      },
    },
  },
};

/**
 * Custom placeholder.
 */
export const CustomPlaceholder: Story = {
  render: () => <DatePickerCustom placeholder="Select your birthday" />,
  parameters: {
    docs: {
      description: {
        story: "Date picker with custom placeholder text.",
      },
    },
  },
};

/**
 * Disabled date picker.
 */
export const Disabled: Story = {
  render: () => <DatePickerCustom disabled placeholder="Date picker disabled" />,
  parameters: {
    docs: {
      description: {
        story: "Disabled date picker.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeDisabled();
  },
};

/**
 * Date picker with pre-selected date.
 */
export const WithPreselectedDate: Story = {
  render: () => {
    const preselectedDate = new Date(2024, 5, 15); // June 15, 2024
    return <DatePickerCustom date={preselectedDate} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Date picker with a pre-selected date.",
      },
    },
  },
};

/**
 * Date range picker.
 */
export const DateRange: Story = {
  render: () => <DateRangePicker />,
  parameters: {
    docs: {
      description: {
        story: "Date range picker for selecting a start and end date.",
      },
    },
  },
};

/**
 * Controlled date range picker.
 */
export const ControlledDateRange: Story = {
  render: function ControlledRangePicker() {
    const [range, setRange] = useState<{
      from: Date | undefined;
      to?: Date | undefined;
    }>({
      from: new Date(),
      to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return (
      <div className="space-y-4">
        <DateRangePicker from={range.from} to={range.to} onValueChange={setRange} />
        <p className="text-sm text-muted-foreground">
          From: {range.from?.toLocaleDateString() || "None"}
          <br />
          To: {range.to?.toLocaleDateString() || "None"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled date range picker.",
      },
    },
  },
};

/**
 * Date range picker with custom placeholder.
 */
export const RangeCustomPlaceholder: Story = {
  render: () => <DateRangePicker placeholder="Select travel dates" />,
  parameters: {
    docs: {
      description: {
        story: "Date range picker with custom placeholder.",
      },
    },
  },
};

/**
 * Form example with date pickers.
 */
export const FormExample: Story = {
  render: function DatePickerForm() {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();

    return (
      <div className="space-y-4 w-[300px]">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <DatePickerCustom
            date={startDate}
            onDateChange={setStartDate}
            placeholder="Select start date"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <DatePickerCustom
            date={endDate}
            onDateChange={setEndDate}
            placeholder="Select end date"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Submit
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple date pickers in a form layout.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Single date picker */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Date</h3>
        <DatePicker />
      </div>

      {/* With pre-selected date */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Pre-selected</h3>
        <DatePickerCustom date={new Date()} />
      </div>

      {/* Date range */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Date Range</h3>
        <DateRangePicker />
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <DatePickerCustom disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  render: () => <DatePicker />,
  parameters: {
    docs: {
      description: {
        story: "Interactive date picker example.",
      },
    },
  },
};
