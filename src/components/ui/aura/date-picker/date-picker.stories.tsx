import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
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
export const Default: Story = {
  render: () => <DatePicker />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitFor(() => {
      const calendar = document.querySelector('[data-slot="calendar"]');
      expect(calendar).toBeInTheDocument();
    });
  },
};
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
};
export const CustomPlaceholder: Story = {
  render: () => <DatePickerCustom placeholder="Select your birthday" />,
};
export const Disabled: Story = {
  render: () => <DatePickerCustom disabled placeholder="Date picker disabled" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeDisabled();
  },
};
export const WithPreselectedDate: Story = {
  render: () => {
    const preselectedDate = new Date(2024, 5, 15);
    return <DatePickerCustom date={preselectedDate} />;
  },
};
export const DateRange: Story = {
  render: () => <DateRangePicker />,
};
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
};
export const RangeCustomPlaceholder: Story = {
  render: () => <DateRangePicker placeholder="Select travel dates" />,
};
export const FormExample: Story = {
  render: function DatePickerForm() {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    return (
      <div className="space-y-4 w-[300px]">
        <div className="space-y-2">
          <label htmlFor="start-date" className="text-sm font-medium">
            Start Date
          </label>
          <DatePickerCustom
            id="start-date"
            date={startDate}
            onDateChange={setStartDate}
            placeholder="Select start date"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="end-date" className="text-sm font-medium">
            End Date
          </label>
          <DatePickerCustom
            id="end-date"
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
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Date</h3>
        <DatePicker />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Pre-selected</h3>
        <DatePickerCustom date={new Date()} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Date Range</h3>
        <DateRangePicker />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <DatePickerCustom disabled />
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
  render: () => <DatePicker />,
};
