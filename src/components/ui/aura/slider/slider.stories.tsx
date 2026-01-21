import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import { Slider } from "./slider";

const meta: Meta<typeof Slider> = {
  title: "Primitives/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "object",
      description: "Controlled value (array of numbers)",
      table: {
        category: "State",
        type: { summary: "number[]" },
      },
    },
    defaultValue: {
      control: "object",
      description: "Default value (array of numbers)",
      table: {
        category: "State",
        type: { summary: "number[]" },
      },
    },
    min: {
      control: "number",
      description: "Minimum value",
      table: {
        category: "Range",
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    max: {
      control: "number",
      description: "Maximum value",
      table: {
        category: "Range",
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    step: {
      control: "number",
      description: "Step increment",
      table: {
        category: "Range",
        type: { summary: "number" },
        defaultValue: { summary: "1" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the slider",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Slider orientation",
      table: {
        category: "Layout",
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: "horizontal" },
      },
    },
    onValueChange: {
      action: "valueChange",
      description: "Callback when value changes",
      table: {
        category: "Events",
        type: { summary: "(value: number[]) => void" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

/**
 * Default slider.
 */
export const Default: Story = {
  render: () => <Slider defaultValue={[50]} />,
  parameters: {
    docs: {
      description: {
        story: "Default slider with a single thumb.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const slider = canvasElement.querySelector('[data-slot="slider"]');
    await expect(slider).toBeInTheDocument();

    const thumb = canvasElement.querySelector('[data-slot="slider-thumb"]');
    await expect(thumb).toBeInTheDocument();
  },
};

/**
 * Slider with label and value display.
 */
export const WithLabel: Story = {
  render: function SliderWithLabel() {
    const [value, setValue] = useState([50]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Volume</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider value={value} onValueChange={setValue} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Slider with label and real-time value display.",
      },
    },
  },
};

/**
 * Range slider (two thumbs).
 */
export const RangeSlider: Story = {
  render: function RangeSliderExample() {
    const [value, setValue] = useState([25, 75]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider value={value} onValueChange={setValue} min={0} max={100} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Range slider with two thumbs for selecting a range.",
      },
    },
  },
};

/**
 * Slider with custom range.
 */
export const CustomRange: Story = {
  render: function CustomRangeSlider() {
    const [value, setValue] = useState([500]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Budget</Label>
          <span className="text-sm text-muted-foreground">${value[0]}</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={100} max={1000} step={50} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$100</span>
          <span>$1000</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Slider with custom min, max, and step values.",
      },
    },
  },
};

/**
 * Disabled slider.
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="opacity-50">Disabled slider</Label>
        <Slider defaultValue={[50]} disabled />
      </div>
      <div className="space-y-2">
        <Label className="opacity-50">Disabled range</Label>
        <Slider defaultValue={[25, 75]} disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled sliders that cannot be interacted with.",
      },
    },
  },
};

/**
 * Vertical slider.
 */
export const Vertical: Story = {
  render: function VerticalSlider() {
    const [value, setValue] = useState([50]);

    return (
      <div className="flex items-center gap-8 h-[200px]">
        <div className="flex flex-col items-center gap-2">
          <Slider value={value} onValueChange={setValue} orientation="vertical" />
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Slider defaultValue={[30, 70]} orientation="vertical" />
          <span className="text-sm text-muted-foreground">Range</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical orientation sliders.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[250px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

/**
 * Controlled slider.
 */
export const Controlled: Story = {
  render: function ControlledSlider() {
    const [value, setValue] = useState([50]);

    return (
      <div className="space-y-4">
        <Slider value={value} onValueChange={setValue} />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue([0])}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Min
          </button>
          <button
            type="button"
            onClick={() => setValue([50])}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Middle
          </button>
          <button
            type="button"
            onClick={() => setValue([100])}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Max
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Value: {value[0]}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Slider with externally controlled state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Max button
    const maxButton = canvas.getByText("Max");
    await userEvent.click(maxButton);

    // Verify value updated
    await waitFor(() => {
      const valueText = canvas.getByText("Value: 100");
      expect(valueText).toBeInTheDocument();
    });
  },
};

/**
 * Step increments.
 */
export const StepIncrements: Story = {
  render: function StepSlider() {
    const [value, setValue] = useState([50]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Rating (1-5)</Label>
          <span className="text-sm text-muted-foreground">{value[0]}</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={1} max={5} step={1} />
        <div className="flex justify-between text-xs text-muted-foreground">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Slider with discrete step increments.",
      },
    },
  },
};

/**
 * Multiple sliders form.
 */
export const MultipleSliders: Story = {
  render: function MultipleSlidersForm() {
    const [settings, setSettings] = useState({
      brightness: [75],
      contrast: [50],
      saturation: [60],
    });

    const updateSetting = (key: keyof typeof settings) => (value: number[]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Brightness</Label>
            <span className="text-sm text-muted-foreground">{settings.brightness[0]}%</span>
          </div>
          <Slider value={settings.brightness} onValueChange={updateSetting("brightness")} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Contrast</Label>
            <span className="text-sm text-muted-foreground">{settings.contrast[0]}%</span>
          </div>
          <Slider value={settings.contrast} onValueChange={updateSetting("contrast")} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Saturation</Label>
            <span className="text-sm text-muted-foreground">{settings.saturation[0]}%</span>
          </div>
          <Slider value={settings.saturation} onValueChange={updateSetting("saturation")} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple sliders in a settings-like form.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4 w-[350px]">
      {/* Single thumb */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Thumb</h3>
        <Slider defaultValue={[0]} />
        <Slider defaultValue={[50]} />
        <Slider defaultValue={[100]} />
      </div>

      {/* Range */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Range</h3>
        <Slider defaultValue={[25, 75]} />
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Disabled</h3>
        <Slider defaultValue={[50]} disabled />
        <Slider defaultValue={[25, 75]} disabled />
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
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: "horizontal",
  },
  render: (args) => <Slider {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with slider props.",
      },
    },
  },
};
