import {
  ListItemContent,
  ListItemHeader,
  ListItemIcon,
  ListItemTitle,
} from '@/components/ui/aura/list';
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { within } from '@storybook/testing-library';
import { useState } from 'react';
import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListHeader,
  ArtifactListItem,
  ArtifactListTitle,
} from './artifact-list';

const meta: Meta<typeof ArtifactList> = {
  title: 'Primitives/Artifact - List',
  component: ArtifactList,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS classes for styling the card wrapper',
      table: {
        category: 'Display',
      },
    },

    children: {
      control: false,
      description: 'Compositional children (Header, Content, Footer)',
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactList>;

/**
 * Basic artifact list with status indicators
 */
export const Basic: Story = {
  args: {
    className: 'w-100',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Task list with status indicators, icons, and descriptions.',
      },
    },
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that task titles are rendered
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Valve calibration')).toBeInTheDocument();
    await expect(canvas.getByText('Filter cleaning')).toBeInTheDocument();

    // Check status labels
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
    await expect(canvas.getByText('Due today')).toBeInTheDocument();
    await expect(canvas.getByText('Completed')).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="relative flex h-4 w-4 items-center justify-center">
                <span className="h-[6px] w-[6px] rounded-full bg-destructive-foreground" />
              </ListItemIcon>
              <span className="text-sm font-medium">
                Pump seal replacement
              </span>
            </ListItemTitle>
            <span className="text-sm font-medium text-destructive-foreground">
              Overdue
            </span>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            P-401A requires new mechanical seal
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="8"
                    cy="8"
                    r="7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                  <circle cx="8" cy="8" r="3" fill="currentColor" className="text-foreground" />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium">Valve calibration</span>
            </ListItemTitle>
            <span className="text-sm font-medium text-muted-foreground">
              Due today
            </span>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Quarterly calibration check
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
                    fill="currentColor"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Filter cleaning
              </span>
            </ListItemTitle>
            <span className="text-sm font-medium text-muted-foreground">
              Completed
            </span>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Clean inlet filters
          </ListItemContent>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * With header - Large chat summary list
 */
export const WithHeader: Story = {
  args: {
    className: 'w-100',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large list with header showing detailed chat summaries.',
      },
    },
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check header is rendered
    await expect(canvas.getByText('Recent chat summary')).toBeInTheDocument();
    
    // Check list items
    await expect(canvas.getByText('Pump 3 cavitation detected')).toBeInTheDocument();
    await expect(canvas.getByText('Compressor C-5 surge events')).toBeInTheDocument();
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListHeader>
        <ArtifactListTitle>Recent chat summary</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
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
              <span className="text-sm font-medium text-foreground">
                Pump 3 cavitation detected
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-foreground">
            Suction pressure oscillations and elevated noise on P-003 during
            night shift; cavitation likely from low NPSH/blocked strainer.
            Next step: inspect/ clean suction strainer and raise tank level
            20cm.
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
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
              <span className="text-sm font-medium text-foreground">
                Compressor C-5 surge events
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-foreground">
            Three start-up surge spikes with sluggish anti-surge valve
            response; control loop tuning/valve stiction suspected. Next
            step: Stroke-test ASV, retune PID, and verify transmitter
            calibration.
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
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
              <span className="text-sm font-medium text-foreground">
                Boiler steam leak near header B
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-foreground">
            Ultrasonic survey indicates continuous hiss with elevated
            condensate returns; small steam leak wasting energy. Next step:
            tag exact location, plan hot repair window, and quantify loss
            after fix.
          </ListItemContent>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Without header - Compact timeline
 */
export const WithoutHeader: Story = {
  args: {
    className: 'w-[259px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact timeline list without header.',
      },
    },
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that list items are rendered without header
    await expect(canvas.getByText('Inspection')).toBeInTheDocument();
    await expect(canvas.getByText('Event')).toBeInTheDocument();

    // Verify no header is present
    const container = canvasElement;
    expect(container.textContent).not.toContain('Timeline');
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="8"
                    cy="8"
                    r="7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="3"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Inspection
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Dec 22, 2024 5:00 AM
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="8"
                    cy="8"
                    r="7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                  <circle cx="8" cy="8" r="3" fill="currentColor" className="text-foreground" />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium">Event</span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Today 3:05 PM
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
                    fill="currentColor"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Inspection
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            1 d ago
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
                    fill="currentColor"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Inspection
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Dec 17, 2024 9:00 AM
          </ListItemContent>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Without footer - uses the compact timeline example
 */
export const WithoutFooter: Story = {
  args: {
    className: 'w-[259px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact timeline list without a footer section.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that list items are rendered
    await expect(canvas.getByText('Inspection')).toBeInTheDocument();
    await expect(canvas.getByText('Event')).toBeInTheDocument();

    // Verify no footer is present
    const container = canvasElement;
    expect(container.textContent).not.toContain('Footer');
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="8"
                    cy="8"
                    r="7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="3"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Inspection
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Dec 22, 2024 5:00 AM
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="8"
                    cy="8"
                    r="7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                  <circle cx="8" cy="8" r="3" fill="currentColor" className="text-foreground" />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium">Event</span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Today 3:05 PM
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
                    fill="currentColor"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Inspection
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            1 d ago
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
                    fill="currentColor"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Inspection
              </span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Dec 17, 2024 9:00 AM
          </ListItemContent>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Minimal version - uses medium task list
 */
export const Minimal: Story = {
  args: {
    className: 'w-100',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simplest form with only list items, no header or footer.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that only list items are rendered
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Valve calibration')).toBeInTheDocument();

    // Verify no header or footer
    const container = canvasElement;
    expect(container.textContent).not.toContain('Tasks');
    expect(container.textContent).not.toContain('Footer');
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="relative flex h-4 w-4 items-center justify-center">
                <span className="h-[6px] w-[6px] rounded-full bg-destructive-foreground" />
              </ListItemIcon>
              <span className="text-sm font-medium">
                Pump seal replacement
              </span>
            </ListItemTitle>
            <span className="text-sm font-medium text-destructive-foreground">
              Overdue
            </span>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            P-401A requires new mechanical seal
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="8"
                    cy="8"
                    r="7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                  <circle cx="8" cy="8" r="3" fill="currentColor" className="text-foreground" />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium">Valve calibration</span>
            </ListItemTitle>
            <span className="text-sm font-medium text-muted-foreground">
              Due today
            </span>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Quarterly calibration check
          </ListItemContent>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
            <ListItemTitle>
              <ListItemIcon className="text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
                    fill="currentColor"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium text-muted-foreground">
                Filter cleaning
              </span>
            </ListItemTitle>
            <span className="text-sm font-medium text-muted-foreground">
              Completed
            </span>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Clean inlet filters
          </ListItemContent>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
