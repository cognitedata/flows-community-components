import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Label } from '../label';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number[]',
        },
      },
    },
    defaultValue: {
      control: 'object',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number[]',
        },
      },
    },
    min: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    max: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '100',
        },
      },
    },
    step: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '1',
        },
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: '"horizontal" | "vertical"',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    onValueChange: {
      action: 'valueChange',
      table: {
        category: 'Events',
        type: {
          summary: '(value: number[]) => void',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Slider>;
export const Default: Story = {
  render: () => <Slider defaultValue={[50]} />,
  parameters: { order: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = await canvas.findByRole('slider');
    await expect(slider).toBeInTheDocument();
  },
};
export const WithLabel: Story = {
  render: function SliderWithLabel() {
    const [value, setValue] = useState([50]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="slider-volume">Volume</Label>
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <Slider id="slider-volume" value={value} onValueChange={setValue} />
      </div>
    );
  },
  parameters: {
    order: 2,
  },
};
export const RangeSlider: Story = {
  render: function RangeSliderExample() {
    const [value, setValue] = useState([25, 75]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="slider-price-range">Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${value[0]} - ${value[1]}
          </span>
        </div>
        <Slider
          id="slider-price-range"
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
        />
      </div>
    );
  },
  parameters: {
    order: 3,
  },
};
export const CustomRange: Story = {
  render: function CustomRangeSlider() {
    const [value, setValue] = useState([500]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="slider-budget">Budget</Label>
          <span className="text-sm text-muted-foreground">${value[0]}</span>
        </div>
        <Slider
          id="slider-budget"
          value={value}
          onValueChange={setValue}
          min={100}
          max={1000}
          step={50}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$100</span>
          <span>$1000</span>
        </div>
      </div>
    );
  },
  parameters: {
    order: 4,
  },
};
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="opacity-50" htmlFor="slider-disabled-single">
          Disabled slider
        </Label>
        <Slider id="slider-disabled-single" defaultValue={[50]} disabled />
      </div>
      <div className="space-y-2">
        <Label className="opacity-50" htmlFor="slider-disabled-range">
          Disabled range
        </Label>
        <Slider id="slider-disabled-range" defaultValue={[25, 75]} disabled />
      </div>
    </div>
  ),
  parameters: {
    order: 5,
  },
};
export const Vertical: Story = {
  render: function VerticalSlider() {
    const [value, setValue] = useState([50]);
    return (
      <div className="flex items-center gap-8 h-52">
        <div className="flex flex-col items-center gap-2">
          <Slider
            value={value}
            onValueChange={setValue}
            orientation="vertical"
          />
          <span className="text-sm text-muted-foreground">{value[0]}%</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Slider defaultValue={[30, 70]} orientation="vertical" />
          <span className="text-sm text-muted-foreground">Range</span>
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div className="h-64 flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  parameters: {
    order: 6,
  },
};
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
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const maxButton = await canvas.findByRole('button', { name: 'Max' });
    await userEvent.click(maxButton);
    await waitFor(() => {
      const valueText = canvas.getByText('Value: 100');
      expect(valueText).toBeInTheDocument();
    });
  },
};
export const StepIncrements: Story = {
  render: function StepSlider() {
    const [value, setValue] = useState([50]);
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Rating (1-5)</Label>
          <span className="text-sm text-muted-foreground">{value[0]}</span>
        </div>
        <Slider
          value={value}
          onValueChange={setValue}
          min={1}
          max={5}
          step={1}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    order: 8,
  },
};

export const MultipleSliders: Story = {
  render: function MultipleSlidersForm() {
    const [settings, setSettings] = useState({
      brightness: [75],
      contrast: [50],
      saturation: [60],
    });
    const updateSetting = (key: keyof typeof settings) => (value: number[]) => {
      setSettings((prev) => ({
        ...prev,
        [key]: value,
      }));
    };
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Brightness</Label>
            <span className="text-sm text-muted-foreground">
              {settings.brightness[0]}%
            </span>
          </div>
          <Slider
            value={settings.brightness}
            onValueChange={updateSetting('brightness')}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Contrast</Label>
            <span className="text-sm text-muted-foreground">
              {settings.contrast[0]}%
            </span>
          </div>
          <Slider
            value={settings.contrast}
            onValueChange={updateSetting('contrast')}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Saturation</Label>
            <span className="text-sm text-muted-foreground">
              {settings.saturation[0]}%
            </span>
          </div>
          <Slider
            value={settings.saturation}
            onValueChange={updateSetting('saturation')}
          />
        </div>
      </div>
    );
  },
  parameters: {
    order: 9,
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4 w-88">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Single Thumb
        </h3>
        <Slider defaultValue={[0]} />
        <Slider defaultValue={[50]} />
        <Slider defaultValue={[100]} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Range</h3>
        <Slider defaultValue={[25, 75]} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Disabled
        </h3>
        <Slider defaultValue={[50]} disabled />
        <Slider defaultValue={[25, 75]} disabled />
      </div>
    </div>
  ),
  parameters: {
    order: 10,
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
export const Playground: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: 'horizontal',
  },
  parameters: {
    order: 99,
  },
  render: (args) => <Slider {...args} />,
};
