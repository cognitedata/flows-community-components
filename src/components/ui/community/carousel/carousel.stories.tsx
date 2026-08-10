import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Community/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full px-12">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

const SLIDES = ['One', 'Two', 'Three', 'Four', 'Five'];

export const Basic: Story = {
  parameters: { order: 1 },
  render: () => (
    <Carousel>
      <CarouselContent>
        {SLIDES.map((label) => (
          <CarouselItem key={label}>
            <div className="flex h-32 items-center justify-center rounded-lg border bg-muted text-lg font-medium">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithoutNavigation: Story = {
  parameters: { order: 2 },
  render: () => (
    <Carousel>
      <CarouselContent>
        {SLIDES.map((label) => (
          <CarouselItem key={label}>
            <div className="flex h-32 items-center justify-center rounded-lg border bg-muted text-lg font-medium">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  ),
};

export const MultipleVisible: Story = {
  parameters: { order: 3 },
  render: () => (
    <Carousel opts={{ align: 'start' }}>
      <CarouselContent>
        {SLIDES.map((label) => (
          <CarouselItem key={label} className="basis-1/3">
            <div className="flex h-24 items-center justify-center rounded-lg border bg-muted text-sm font-medium">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Vertical: Story = {
  parameters: { order: 4 },
  render: () => (
    <Carousel orientation="vertical" className="max-h-48">
      <CarouselContent className="h-48">
        {SLIDES.map((label) => (
          <CarouselItem key={label}>
            <div className="flex h-32 items-center justify-center rounded-lg border bg-muted text-lg font-medium">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Playground: Story = {
  parameters: { order: 99 },
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {SLIDES.map((label) => (
          <CarouselItem key={label}>
            <div className="flex h-32 items-center justify-center rounded-lg border bg-muted text-lg font-medium">
              {label}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
