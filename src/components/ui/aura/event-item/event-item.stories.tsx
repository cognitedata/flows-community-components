import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconSettings2 } from '@tabler/icons-react';
import { expect, within } from 'storybook/test';

import { List, ListItem } from '../list';

import {
  EventItem,
  EventItemDate,
  EventItemDescription,
  EventItemIcon,
  EventItemStatus,
  EventItemTitle,
} from './event-item';

const meta: Meta<typeof EventItem> = {
  title: 'Primitives/EventItem',
  component: EventItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['upcoming', 'now', 'completed', 'error'],
      table: {
        category: 'State',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventItem>;

export const Basic: Story = {
  parameters: { order: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Pump seal replacement' })
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem>
        <EventItemTitle>Pump seal replacement</EventItemTitle>
      </EventItem>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: { order: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(
      canvas.getByLabelText('Urgency indicator')
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem>
        <EventItemIcon aria-label="Urgency indicator">
          <IconSettings2 className="size-3 text-muted-foreground" />
        </EventItemIcon>
        <EventItemTitle>Pump seal replacement</EventItemTitle>
      </EventItem>
    </div>
  ),
};

export const WithDate: Story = {
  parameters: { order: 3 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText(/Apr 26, 2026/)).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem date="2026-04-26T12:00:00.000Z" now="2026-04-23T12:00:00.000Z">
        <EventItemIcon />
        <EventItemTitle>Pump seal replacement</EventItemTitle>
        <EventItemDate format="absolute" />
      </EventItem>
    </div>
  ),
};

export const WithDateAndStatus: Story = {
  parameters: { order: 4 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Valve calibration')).toBeInTheDocument();
    await expect(canvas.getByText('In progress')).toBeInTheDocument();
    await expect(canvas.getByText('in 3 days')).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem date="2026-04-26T12:00:00.000Z" now="2026-04-23T12:00:00.000Z">
        <EventItemIcon />
        <EventItemTitle>Valve calibration</EventItemTitle>
        <EventItemStatus>In progress</EventItemStatus>
        <EventItemDate format="relative" />
      </EventItem>
    </div>
  ),
};

export const WithDateAndRelativeStatus: Story = {
  parameters: { order: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Inspection')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
    await expect(canvas.getByText(/Apr 20, 2026/)).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem date="2026-04-20T09:00:00.000Z" now="2026-04-23T09:00:00.000Z">
        <EventItemIcon />
        <EventItemTitle>Inspection</EventItemTitle>
        <EventItemStatus />
        <EventItemDate format="absolute" />
      </EventItem>
    </div>
  ),
};

export const WithDescriptionAndStatus: Story = {
  parameters: { order: 6 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Filter replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Blocked')).toBeInTheDocument();
    await expect(
      canvas.getByText('Waiting for shutdown window approval.')
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem>
        <EventItemIcon />
        <EventItemTitle>Filter replacement</EventItemTitle>
        <EventItemStatus>Blocked</EventItemStatus>
        <EventItemDescription>
          Waiting for shutdown window approval.
        </EventItemDescription>
      </EventItem>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { order: 7 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Upcoming event')).toBeInTheDocument();
    await expect(canvas.getByText('Current event')).toBeInTheDocument();
    await expect(canvas.getByText('Completed event')).toBeInTheDocument();
    await expect(canvas.getByText('Error event')).toBeInTheDocument();
    await expect(canvas.getByRole('list')).toBeInTheDocument();
    await expect(canvas.getByText('Completed')).toBeInTheDocument();
    await expect(canvas.getByText('Due today')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <List>
        <ListItem>
          <EventItem
            date="2026-04-26T09:00:00.000Z"
            now="2026-04-23T09:00:00.000Z"
          >
            <EventItemIcon />
            <EventItemTitle>Upcoming event</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>Plan maintenance window</EventItemDescription>
          </EventItem>
        </ListItem>
        <ListItem>
          <EventItem
            date="2026-04-23T13:00:00.000Z"
            now="2026-04-23T09:00:00.000Z"
          >
            <EventItemIcon />
            <EventItemTitle>Current event</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>
              Technician currently on-site
            </EventItemDescription>
          </EventItem>
        </ListItem>
        <ListItem>
          <EventItem
            completed
            date="2026-04-22T09:00:00.000Z"
            now="2026-04-23T09:00:00.000Z"
          >
            <EventItemIcon />
            <EventItemTitle>Completed event</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>
              Checklist fully completed
            </EventItemDescription>
          </EventItem>
        </ListItem>
        <ListItem>
          <EventItem
            date="2026-04-20T09:00:00.000Z"
            now="2026-04-23T09:00:00.000Z"
          >
            <EventItemIcon />
            <EventItemTitle>Error event</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>
              Pump failed startup verification
            </EventItemDescription>
          </EventItem>
        </ListItem>
      </List>
    </div>
  ),
};

export const CustomIcon: Story = {
  parameters: { order: 8 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Compressor C-5 surge events')
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem>
        <EventItemIcon aria-label="Event source icon">
          <IconSettings2 className="size-3 text-muted-foreground" />
        </EventItemIcon>
        <EventItemTitle>Compressor C-5 surge events</EventItemTitle>
        <EventItemDescription>
          Three startup surge spikes with sluggish anti-surge valve response.
        </EventItemDescription>
      </EventItem>
    </div>
  ),
};

export const VariantOverride: Story = {
  parameters: { order: 9 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Overdue but forced upcoming')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <EventItem
        variant="upcoming"
        date="2026-04-20T09:00:00.000Z"
        now="2026-04-23T09:00:00.000Z"
      >
        <EventItemIcon />
        <EventItemTitle>Overdue but forced upcoming</EventItemTitle>
        <EventItemStatus />
        <EventItemDescription>
          Variant is explicitly overridden while status still derives from date.
        </EventItemDescription>
      </EventItem>
    </div>
  ),
};

export const EdgeCaseManyItems: Story = {
  parameters: { order: 10 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titles = canvas.getAllByRole('heading', { level: 3 });
    await expect(titles.length).toBeGreaterThanOrEqual(20);
    await expect(canvas.getByText('Item 1')).toBeInTheDocument();
    await expect(canvas.getByText('Item 20')).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100 max-h-80 space-y-3 overflow-y-auto">
      {Array.from({ length: 20 }, (_, index) => {
        const date = new Date('2026-04-23T09:00:00.000Z');
        date.setDate(date.getDate() + (index % 5) - 2);

        return (
          <EventItem
            key={index}
            date={date}
            now="2026-04-23T09:00:00.000Z"
            completed={index % 7 === 0}
          >
            <EventItemIcon />
            <EventItemTitle>Item {index + 1}</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>
              Description for item {index + 1}
            </EventItemDescription>
          </EventItem>
        );
      })}
    </div>
  ),
};
