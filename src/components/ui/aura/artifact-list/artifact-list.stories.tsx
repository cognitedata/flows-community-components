import { ListItemHeader, ListItemIcon } from "@/components/ui/aura/list";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { within } from '@storybook/testing-library';
import { useState } from 'react';
import {
    ArtifactList,
    ArtifactListContent,
    ArtifactListHeader,
    ArtifactListItem,
    ArtifactListItemDescription,
    ArtifactListItemTimeline,
    ArtifactListItemTitle,
    ArtifactListTitle,
} from "./artifact-list";

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
        <ArtifactListItem state="error">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Pump seal replacement</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Overdue</ArtifactListItemTimeline>
            <ArtifactListItemDescription>
              P-401A requires new mechanical seal
            </ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="now">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Valve calibration</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Due today</ArtifactListItemTimeline>
            <ArtifactListItemDescription>
              Quarterly calibration check
            </ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="completed">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Filter cleaning</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Completed</ArtifactListItemTimeline>
            <ArtifactListItemDescription>Clean inlet filters</ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Interactive list with stateful item updates
 */
export const Interactive: Story = {
  args: {
    className: "w-100",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates stateful list items that toggle completion when clicked.",
      },
    },
  },
  render: function ArtifactListInteractiveStory(args) {
    const [items, setItems] = useState([
      {
        id: "seal",
        title: "Pump seal replacement",
        detail: "P-401A requires new mechanical seal",
        status: "open",
      },
      {
        id: "valve",
        title: "Valve calibration",
        detail: "Quarterly calibration check",
        status: "open",
      },
      {
        id: "filters",
        title: "Filter cleaning",
        detail: "Clean inlet filters",
        status: "done",
      },
    ]);

    const toggleStatus = (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: item.status === "done" ? "open" : "done" }
            : item
        )
      );
    };

    return (
      <ArtifactList {...args}>
        <ArtifactListContent>
          {items.map((item) => {
            const isDone = item.status === "done";

            return (
              <ArtifactListItem
                key={item.id}
                state={isDone ? "completed" : "now"}
                className="cursor-pointer"
                onClick={() => toggleStatus(item.id)}
              >
                <ListItemHeader>
                  <ListItemIcon />
                  <ArtifactListItemTitle>{item.title}</ArtifactListItemTitle>
                  <ArtifactListItemTimeline>
                    {isDone ? "Completed" : "In progress"}
                  </ArtifactListItemTimeline>
                  <ArtifactListItemDescription>
                    {item.detail}
                  </ArtifactListItemDescription>
                </ListItemHeader>
              </ArtifactListItem>
            );
          })}
        </ArtifactListContent>
      </ArtifactList>
    );
  },
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
            <ArtifactListItemTitle>Pump 3 cavitation detected</ArtifactListItemTitle>
            <ArtifactListItemDescription className="text-foreground">
              Suction pressure oscillations and elevated noise on P-003 during
              night shift; cavitation likely from low NPSH/blocked strainer.
              Next step: inspect/ clean suction strainer and raise tank level
              20cm.
            </ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
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
            <ArtifactListItemTitle>Compressor C-5 surge events</ArtifactListItemTitle>
            <ArtifactListItemDescription className="text-foreground">
              Three start-up surge spikes with sluggish anti-surge valve
              response; control loop tuning/valve stiction suspected. Next
              step: Stroke-test ASV, retune PID, and verify transmitter
              calibration.
            </ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemHeader>
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
            <ArtifactListItemTitle>Boiler steam leak near header B</ArtifactListItemTitle>
            <ArtifactListItemDescription className="text-foreground">
              Ultrasonic survey indicates continuous hiss with elevated
              condensate returns; small steam leak wasting energy. Next step:
              tag exact location, plan hot repair window, and quantify loss
              after fix.
            </ArtifactListItemDescription>
          </ListItemHeader>
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
    className: "w-100",
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
        <ArtifactListItem state="upcoming">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Dec 22, 2024 5:00 AM</ArtifactListItemTimeline>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="now">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Event</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Today 3:05 PM</ArtifactListItemTimeline>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="completed">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
            <ArtifactListItemTimeline>1 d ago</ArtifactListItemTimeline>
          </ListItemHeader>
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
    className: "w-100",
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
        <ArtifactListItem state="upcoming">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Dec 22, 2024 5:00 AM</ArtifactListItemTimeline>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="now">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Event</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Today 3:05 PM</ArtifactListItemTimeline>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="completed">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
            <ArtifactListItemTimeline>1 d ago</ArtifactListItemTimeline>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="completed">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Dec 17, 2024 9:00 AM</ArtifactListItemTimeline>
          </ListItemHeader>
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
        <ArtifactListItem state="error">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Pump seal replacement</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Overdue</ArtifactListItemTimeline>
            <ArtifactListItemDescription>
              P-401A requires new mechanical seal
            </ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="now">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Valve calibration</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Due today</ArtifactListItemTimeline>
            <ArtifactListItemDescription>
              Quarterly calibration check
            </ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>

        <ArtifactListItem state="completed">
          <ListItemHeader>
            <ListItemIcon />
            <ArtifactListItemTitle>Filter cleaning</ArtifactListItemTitle>
            <ArtifactListItemTimeline>Completed</ArtifactListItemTimeline>
            <ArtifactListItemDescription>Clean inlet filters</ArtifactListItemDescription>
          </ListItemHeader>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
