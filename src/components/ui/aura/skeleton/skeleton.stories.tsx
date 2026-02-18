import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Primitives/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional classes for sizing and shape.",
      table: {
        category: "Variants/Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic skeleton placeholder for loading states.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    const skeleton = skeletons[0];
    await expect(skeletons.length).toBe(1);
    await expect(skeleton).toBeInTheDocument();
    await expect(skeleton).toHaveClass("animate-pulse");
  },
  render: () => <Skeleton className="w-100 h-8" />,
};

export const Shapes: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Skeleton shapes for different content types.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    await expect(skeletons.length).toBe(3);
  },
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Skeleton className="w-100 h-4" />
      <Skeleton className="size-12 rounded-full" />
      <Skeleton className="w-75 h-32" />
    </div>
  ),
};

export const TextBlock: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Skeleton layout mimicking text content structure.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    await expect(skeletons.length).toBe(4);
  },
  render: () => (
    <div className="flex flex-col gap-2 w-100">
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-4/5 h-4" />
      <Skeleton className="w-3/5 h-4" />
    </div>
  ),
};

export const Card: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Skeleton layout for card components.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    await expect(skeletons.length).toBe(4);
  },
  render: () => (
    <div className="flex flex-col gap-3 w-100">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-3" />
        </div>
      </div>
      <Skeleton className="w-full h-24" />
    </div>
  ),
};

export const Table: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Skeleton layout for table rows.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const rows = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    await expect(rows.length).toBe(4);
  },
  render: () => (
    <div className="flex flex-col gap-2 w-125">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </div>
  ),
};

export const ListItems: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Skeleton layout for list items with icons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const items = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    await expect(items.length).toBe(6);
  },
  render: () => (
    <div className="flex flex-col gap-3 w-100">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded" />
        <Skeleton className="flex-1 h-4" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded" />
        <Skeleton className="flex-1 h-4" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded" />
        <Skeleton className="flex-1 h-4" />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    className: "w-100 h-8",
  },
  render: (args) => <Skeleton {...args} />,
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground to experiment with skeleton styling.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll('[data-slot="skeleton"]');
    const skeleton = skeletons[0];
    await expect(skeletons.length).toBe(1);
    await expect(skeleton).toBeInTheDocument();
  },
};
