import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { Calendar } from './calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Primitives/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    // Behavior
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Selection mode for the calendar',
      table: {
        category: 'Behavior',
        type: { summary: '"single" | "multiple" | "range"' },
        defaultValue: { summary: 'single' },
      },
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from adjacent months',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    captionLayout: {
      control: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      description: 'Layout of the month/year caption',
      table: {
        category: 'Display',
        type: { summary: 'string' },
        defaultValue: { summary: 'label' },
      },
    },
    buttonVariant: {
      control: 'select',
      options: ['ghost', 'outline', 'secondary'],
      description: 'Variant for navigation buttons',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'ghost' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the calendar',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/**
 * Default single date selection calendar.
 */
export const Default: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" className="rounded-md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default calendar for single date selection.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const calendar = canvasElement.querySelector('[data-slot="calendar"]');
    await expect(calendar).toBeInTheDocument();

    // Verify navigation buttons exist
    const prevButton = canvasElement.querySelector('.rdp-button_previous');
    const nextButton = canvasElement.querySelector('.rdp-button_next');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
  },
};

/**
 * Single date selection with controlled state.
 */
export const SingleSelection: Story = {
  render: function SingleSelectionCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
        </div>
        <p className="text-sm text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with controlled single date selection.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Find a day button and click it
    const dayButtons = canvasElement.querySelectorAll(
      '[data-slot="calendar"] button:not(.rdp-button_previous):not(.rdp-button_next)'
    );
    if (dayButtons.length > 10) {
      await userEvent.click(dayButtons[10] as HTMLElement);
    }
  },
};

/**
 * Date range selection calendar.
 */
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
  parameters: {
    docs: {
      description: {
        story: 'Calendar for selecting a date range with two months displayed.',
      },
    },
  },
};

/**
 * Multiple date selection.
 */
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
  parameters: {
    docs: {
      description: {
        story: 'Calendar allowing multiple date selection.',
      },
    },
  },
};

/**
 * Calendar with dropdown navigation.
 */
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
  parameters: {
    docs: {
      description: {
        story: 'Calendar with dropdown selectors for month and year navigation.',
      },
    },
  },
};

/**
 * Calendar with disabled dates.
 */
export const DisabledDates: Story = {
  render: () => {
    const disabledDays = [
      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      { dayOfWeek: [0, 6] }, // Disable weekends
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
  parameters: {
    docs: {
      description: {
        story: 'Calendar with disabled weekends and specific dates.',
      },
    },
  },
};

/**
 * Calendar with week numbers.
 */
export const WithWeekNumbers: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" showWeekNumber className="rounded-md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar displaying week numbers.',
      },
    },
  },
};

/**
 * Calendar without outside days.
 */
export const WithoutOutsideDays: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" showOutsideDays={false} className="rounded-md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar hiding days from adjacent months.',
      },
    },
  },
};

/**
 * Calendar with date constraints.
 */
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
  parameters: {
    docs: {
      description: {
        story: 'Calendar with date range constraints.',
      },
    },
  },
};

/**
 * Two-month calendar display.
 */
export const TwoMonths: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" numberOfMonths={2} className="rounded-md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar displaying two months side by side.',
      },
    },
  },
};

/**
 * Calendar with different button variant.
 */
export const OutlineButtons: Story = {
  render: () => (
    <div className="rounded-md border">
      <Calendar mode="single" buttonVariant="outline" className="rounded-md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Calendar with outline style navigation buttons.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Single selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Selection</h3>
        <div className="rounded-md border w-fit">
          <Calendar mode="single" className="rounded-md" />
        </div>
      </div>

      {/* Range selection */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Range Selection (2 months)</h3>
        <div className="rounded-md border w-fit">
          <Calendar mode="range" numberOfMonths={2} className="rounded-md" />
        </div>
      </div>

      {/* With dropdowns */}
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
    docs: {
      description: {
        story: 'Comprehensive visual overview for regression testing.',
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
  args: {
    mode: 'single',
    showOutsideDays: true,
    captionLayout: 'label',
    buttonVariant: 'ghost',
  },
  render: (args) => (
    <div className="rounded-md border">
      <Calendar {...args} className="rounded-md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to experiment with calendar props.',
      },
    },
  },
};
