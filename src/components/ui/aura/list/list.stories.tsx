import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  EventItem,
  EventItemDescription,
  EventItemIcon,
  EventItemStatus,
  EventItemTitle,
} from '../event-item';

import {
  List,
  ListDescriptionDescription,
  ListDescriptionTerm,
  ListHeading,
  ListItem,
  ListItemIcon,
} from './list';

const meta: Meta<typeof List> = {
  title: 'Primitives/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['ul', 'ol', 'dl'],
      table: {
        category: 'Display',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Display',
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
type Story = StoryObj<typeof List>;

export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(canvas.getByText('First item')).toBeInTheDocument();
    await expect(canvas.getByText('Second item')).toBeInTheDocument();
    await expect(canvas.getByText('Third item')).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </List>
  ),
};

export const WithHeading: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Recent chat summary' })
    ).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
    await expect(
      canvas.getByText('Pump 3 cavitation detected')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Compressor C-5 surge events')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Boiler steam leak near header B')
    ).toBeInTheDocument();
    await expect(canvas.getAllByLabelText('Event icon')).toHaveLength(3);
  },
  render: () => (
    <div>
      <ListHeading>Recent chat summary</ListHeading>
      <List className="w-100">
        <ListItem>
          <ListItemIcon
            className="text-muted-foreground"
            aria-label="Event icon"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.04C1 3.25649 3.25648 1 6.04 1H9.96C9.96 3.78351 7.70352 6.04 4.92 6.04H1Z"
                fill="currentColor"
              />
              <path
                d="M15 9.96C15 12.7435 12.7435 15 9.96 15H6.04C6.04 12.2165 8.29648 9.96 11.08 9.96H15Z"
                fill="currentColor"
              />
              <path
                d="M15 9.96C12.2165 9.96 9.96 7.70352 9.96 4.92L9.96 1C12.7435 1 15 3.25648 15 6.04V9.96Z"
                fill="currentColor"
              />
              <path
                d="M6.04 15C3.25649 15 1 12.7435 1 9.96V6.04C3.78351 6.04 6.04 8.29648 6.04 11.08V15Z"
                fill="currentColor"
              />
            </svg>
          </ListItemIcon>
          <p className="text-sm font-medium leading-4.5 text-card-foreground">
            Pump 3 cavitation detected
          </p>
          <p className="text-sm leading-4.5 text-muted-foreground">
            Suction pressure oscillations and elevated noise on P-003 during
            night shift; cavitation likely from low NPSH/blocked strainer. Next
            step: inspect/clean suction strainer and raise tank level 20cm.
          </p>
        </ListItem>
        <ListItem>
          <ListItemIcon
            className="text-muted-foreground"
            aria-label="Event icon"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.04C1 3.25649 3.25648 1 6.04 1H9.96C9.96 3.78351 7.70352 6.04 4.92 6.04H1Z"
                fill="currentColor"
              />
              <path
                d="M15 9.96C15 12.7435 12.7435 15 9.96 15H6.04C6.04 12.2165 8.29648 9.96 11.08 9.96H15Z"
                fill="currentColor"
              />
              <path
                d="M15 9.96C12.2165 9.96 9.96 7.70352 9.96 4.92L9.96 1C12.7435 1 15 3.25648 15 6.04V9.96Z"
                fill="currentColor"
              />
              <path
                d="M6.04 15C3.25649 15 1 12.7435 1 9.96V6.04C3.78351 6.04 6.04 8.29648 6.04 11.08V15Z"
                fill="currentColor"
              />
            </svg>
          </ListItemIcon>
          <p className="text-sm font-medium leading-4.5 text-card-foreground">
            Compressor C-5 surge events
          </p>
          <p className="text-sm leading-4.5 text-muted-foreground">
            Three start-up surge spikes with sluggish anti-surge valve response;
            control loop tuning/valve stiction suspected. Next step: Stroke-test
            ASV, retune PID, and verify transmitter calibration.
          </p>
        </ListItem>
        <ListItem>
          <ListItemIcon
            className="text-muted-foreground"
            aria-label="Event icon"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.04C1 3.25649 3.25648 1 6.04 1H9.96C9.96 3.78351 7.70352 6.04 4.92 6.04H1Z"
                fill="currentColor"
              />
              <path
                d="M15 9.96C15 12.7435 12.7435 15 9.96 15H6.04C6.04 12.2165 8.29648 9.96 11.08 9.96H15Z"
                fill="currentColor"
              />
              <path
                d="M15 9.96C12.2165 9.96 9.96 7.70352 9.96 4.92L9.96 1C12.7435 1 15 3.25648 15 6.04V9.96Z"
                fill="currentColor"
              />
              <path
                d="M6.04 15C3.25649 15 1 12.7435 1 9.96V6.04C3.78351 6.04 6.04 8.29648 6.04 11.08V15Z"
                fill="currentColor"
              />
            </svg>
          </ListItemIcon>
          <p className="text-sm font-medium leading-4.5 text-card-foreground">
            Boiler steam leak near header B
          </p>
          <p className="text-sm leading-4.5 text-muted-foreground">
            Ultrasonic survey indicates continuous hiss with elevated condensate
            returns; Small steam leak wasting energy. Next step: tag exact
            location, plan hot repair window, and quantify loss after fix.
          </p>
        </ListItem>
      </List>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Compressor C-5 surge events')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Pump 3 cavitation detected')
    ).toBeInTheDocument();
    await expect(canvas.getByLabelText('Event icon one')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Event icon two')).toBeInTheDocument();
  },
  render: () => (
    <List className="w-100">
      <ListItem>
        <ListItemIcon
          className="text-muted-foreground"
          aria-label="Event icon one"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6.04C1 3.25649 3.25648 1 6.04 1H9.96C9.96 3.78351 7.70352 6.04 4.92 6.04H1Z"
              fill="currentColor"
            />
            <path
              d="M15 9.96C15 12.7435 12.7435 15 9.96 15H6.04C6.04 12.2165 8.29648 9.96 11.08 9.96H15Z"
              fill="currentColor"
            />
            <path
              d="M15 9.96C12.2165 9.96 9.96 7.70352 9.96 4.92L9.96 1C12.7435 1 15 3.25648 15 6.04V9.96Z"
              fill="currentColor"
            />
            <path
              d="M6.04 15C3.25649 15 1 12.7435 1 9.96V6.04C3.78351 6.04 6.04 8.29648 6.04 11.08V15Z"
              fill="currentColor"
            />
          </svg>
        </ListItemIcon>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Compressor C-5 surge events
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Three startup surge spikes with sluggish anti-surge valve response.
        </p>
      </ListItem>
      <ListItem>
        <ListItemIcon
          className="text-card-foreground"
          aria-label="Event icon two"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.15" cx="8" cy="8" r="7" fill="currentColor" />
            <circle cx="8" cy="8" r="3" fill="currentColor" />
          </svg>
        </ListItemIcon>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Pump 3 cavitation detected
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Elevated noise and suction pressure oscillations observed overnight.
        </p>
      </ListItem>
    </List>
  ),
};

export const WithEventItems: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
    await expect(canvas.getByText('Due today')).toBeInTheDocument();
    await expect(canvas.getByText('Completed')).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <List>
        <ListItem>
          <EventItem date="2026-04-20T09:00:00.000Z" now="2026-04-23">
            <EventItemIcon />
            <EventItemTitle>Pump seal replacement</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>
              P-401A requires new mechanical seal
            </EventItemDescription>
          </EventItem>
        </ListItem>
        <ListItem>
          <EventItem date="2026-04-23T09:00:00.000Z" now="2026-04-23">
            <EventItemIcon />
            <EventItemTitle>Valve calibration</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>
              Quarterly calibration check
            </EventItemDescription>
          </EventItem>
        </ListItem>
        <ListItem>
          <EventItem completed now="2026-04-23">
            <EventItemIcon />
            <EventItemTitle>Filter cleaning</EventItemTitle>
            <EventItemStatus />
            <EventItemDescription>Clean inlet filters</EventItemDescription>
          </EventItem>
        </ListItem>
      </List>
    </div>
  ),
};

export const Compact: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('CPU')).toBeInTheDocument();
    await expect(canvas.getByText('45%')).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);
  },
  render: () => (
    <List className="gap-2">
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          CPU
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">45%</p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Memory
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">2.1 GB</p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Disk
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">78%</p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Network
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">15 Mbps</p>
      </ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Step one')).toBeInTheDocument();
    await expect(canvas.getByText('Step two')).toBeInTheDocument();
    await expect(canvas.getByRole('list')).toBeInTheDocument();
  },
  render: () => (
    <List type="ol">
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Step one
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Initialize the system
        </p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Step two
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Run diagnostics
        </p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Step three
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Start operations
        </p>
      </ListItem>
    </List>
  ),
};

export const Description: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Max pressure')).toBeInTheDocument();
    await expect(canvas.getByText('120 bar')).toBeInTheDocument();
    await expect(canvas.getByText('Flow rate')).toBeInTheDocument();
  },
  render: () => (
    <List type="dl">
      <ListDescriptionTerm>Max pressure</ListDescriptionTerm>
      <ListDescriptionDescription>120 bar</ListDescriptionDescription>
      <ListDescriptionTerm>Temperature</ListDescriptionTerm>
      <ListDescriptionDescription>85°C</ListDescriptionDescription>
      <ListDescriptionTerm>Flow rate</ListDescriptionTerm>
      <ListDescriptionDescription>45 m³/h</ListDescriptionDescription>
    </List>
  ),
};

export const Minimal: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Item one')).toBeInTheDocument();
    await expect(canvas.getByText('Item two')).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
  render: () => (
    <List>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Item one
        </p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Item two
        </p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Item three
        </p>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list', { name: 'Empty list' });
    await expect(list).toBeInTheDocument();
    await expect(list.children).toHaveLength(0);
  },
  render: () => <List aria-label="Empty list" />,
};

export const EdgeCaseSpecialCharacters: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature: 85°C')).toBeInTheDocument();
    await expect(canvas.getByText(/Pressure.*120.*bar/)).toBeInTheDocument();
    await expect(canvas.getByText(/Flow rate.*45.*m³\/h/)).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Temperature: 85°C
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Celsius measurement with degree symbol
        </p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Pressure: 120 ± 5 bar
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Plus-minus tolerance notation
        </p>
      </ListItem>
      <ListItem>
        <p className="text-base font-medium leading-5 tracking-tighter text-card-foreground">
          Flow rate: 45 m³/h
        </p>
        <p className="text-sm leading-4.5 text-muted-foreground">
          Cubic meter per hour with superscript
        </p>
      </ListItem>
    </List>
  ),
};
