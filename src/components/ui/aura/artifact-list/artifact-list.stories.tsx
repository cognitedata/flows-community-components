import { ListItemIcon } from "@/components/ui/aura/list";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListHeader,
  ArtifactListItem,
  ArtifactListItemDescription,
  ArtifactListItemStatus,
  ArtifactListItemTitle,
  ArtifactListTitle,
} from "./artifact-list";

const meta: Meta<typeof ArtifactList> = {
  title: "Primitives/Artifact - List",
  component: ArtifactList,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "CSS classes for styling the card wrapper",
      table: {
        category: "Display",
      },
    },

    children: {
      control: false,
      description: "Compositional children (Header, Content, Footer)",
      table: {
        category: "Content",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactList>;

/**
 * Basic artifact list with status indicators
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Task list with status indicators, icons, and descriptions.",
      },
    },
    layout: "centered",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that task titles are rendered
    await expect(canvas.getByText("Pump seal replacement")).toBeInTheDocument();
    await expect(canvas.getByText("Valve calibration")).toBeInTheDocument();
    await expect(canvas.getByText("Filter cleaning")).toBeInTheDocument();

    // Check status labels
    await expect(canvas.getByText("Overdue")).toBeInTheDocument();
    await expect(canvas.getByText("Due today")).toBeInTheDocument();
    await expect(canvas.getByText("Completed")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ArtifactListItemTitle>Pump seal replacement</ArtifactListItemTitle>
          <ArtifactListItemStatus>Overdue</ArtifactListItemStatus>
          <ArtifactListItemDescription>
            P-401A requires new mechanical seal
          </ArtifactListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ArtifactListItemTitle>Valve calibration</ArtifactListItemTitle>
          <ArtifactListItemStatus>Due today</ArtifactListItemStatus>
          <ArtifactListItemDescription>Quarterly calibration check</ArtifactListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ArtifactListItemTitle>Filter cleaning</ArtifactListItemTitle>
          <ArtifactListItemStatus>Completed</ArtifactListItemStatus>
          <ArtifactListItemDescription>Clean inlet filters</ArtifactListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Interactive list with stateful item updates
 */
export const Interactive: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Demonstrates stateful list items that toggle completion when clicked.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial state - first two items should be "In progress"
    const inProgressItems = canvas.getAllByText("In progress");
    await expect(inProgressItems).toHaveLength(2);

    // Click the first item to toggle it to completed
    const firstItem = canvas.getByText("Pump seal replacement");
    await userEvent.click(firstItem);

    // Wait for the state change
    await waitFor(
      () => {
        const completedItems = canvas.getAllByText("Completed");
        expect(completedItems).toHaveLength(2);
      },
      { timeout: 300 }
    );

    // Click it again to toggle back
    await userEvent.click(firstItem);

    await waitFor(
      () => {
        const inProgressItemsAfter = canvas.getAllByText("In progress");
        expect(inProgressItemsAfter).toHaveLength(2);
      },
      { timeout: 300 }
    );
  },
  render: function ArtifactListInteractiveStory() {
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
          item.id === id ? { ...item, status: item.status === "done" ? "open" : "done" } : item
        )
      );
    };

    return (
      <ArtifactList className="w-100">
        <ArtifactListContent>
          {items.map((item) => {
            const isDone = item.status === "done";

            return (
              <ArtifactListItem
                key={item.id}
                variant={isDone ? "completed" : "now"}
                className="cursor-pointer"
                onClick={() => toggleStatus(item.id)}
              >
                <ArtifactListItemTitle>{item.title}</ArtifactListItemTitle>
                <ArtifactListItemStatus>
                  {isDone ? "Completed" : "In progress"}
                </ArtifactListItemStatus>
                <ArtifactListItemDescription>{item.detail}</ArtifactListItemDescription>
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
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Large list with header showing detailed chat summaries.",
      },
    },
    layout: "centered",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check header is rendered
    await expect(canvas.getByText("Recent chat summary")).toBeInTheDocument();

    // Check list items
    await expect(canvas.getByText("Pump 3 cavitation detected")).toBeInTheDocument();
    await expect(canvas.getByText("Compressor C-5 surge events")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListHeader>
        <ArtifactListTitle>Recent chat summary</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemIcon className="text-muted-foreground">
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
          <ArtifactListItemTitle>Pump 3 cavitation detected</ArtifactListItemTitle>
          <ArtifactListItemDescription className="text-foreground">
            Suction pressure oscillations and elevated noise on P-003 during night shift; cavitation
            likely from low NPSH/blocked strainer. Next step: inspect/ clean suction strainer and
            raise tank level 20cm.
          </ArtifactListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemIcon className="text-muted-foreground">
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
          <ArtifactListItemTitle>Compressor C-5 surge events</ArtifactListItemTitle>
          <ArtifactListItemDescription className="text-foreground">
            Three start-up surge spikes with sluggish anti-surge valve response; control loop
            tuning/valve stiction suspected. Next step: Stroke-test ASV, retune PID, and verify
            transmitter calibration.
          </ArtifactListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem>
          <ListItemIcon className="text-muted-foreground">
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
          <ArtifactListItemTitle>Boiler steam leak near header B</ArtifactListItemTitle>
          <ArtifactListItemDescription className="text-foreground">
            Ultrasonic survey indicates continuous hiss with elevated condensate returns; small
            steam leak wasting energy. Next step: tag exact location, plan hot repair window, and
            quantify loss after fix.
          </ArtifactListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Compact timeline list
 */
export const TimelineOnly: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Compact timeline list without header.",
      },
    },
    layout: "centered",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that list items are rendered without header
    await expect(canvas.getByText("Inspection")).toBeInTheDocument();
    await expect(canvas.getByText("Event")).toBeInTheDocument();

    // Verify no header is present
    const container = canvasElement;
    expect(container.textContent).not.toContain("Timeline");
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListContent>
        <ArtifactListItem variant="upcoming">
          <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
          <ArtifactListItemStatus>Dec 22, 2024 5:00 AM</ArtifactListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ArtifactListItemTitle>Event</ArtifactListItemTitle>
          <ArtifactListItemStatus>Today 3:05 PM</ArtifactListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
          <ArtifactListItemStatus>1 d ago</ArtifactListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Extended timeline list
 */
export const TimelineExtended: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Extended timeline list with additional entries.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that list items are rendered
    await expect(canvas.getByText("Inspection")).toBeInTheDocument();
    await expect(canvas.getByText("Event")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListContent>
        <ArtifactListItem variant="upcoming">
          <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
          <ArtifactListItemStatus>Dec 22, 2024 5:00 AM</ArtifactListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ArtifactListItemTitle>Event</ArtifactListItemTitle>
          <ArtifactListItemStatus>Today 3:05 PM</ArtifactListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
          <ArtifactListItemStatus>1 d ago</ArtifactListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ArtifactListItemTitle>Inspection</ArtifactListItemTitle>
          <ArtifactListItemStatus>Dec 17, 2024 9:00 AM</ArtifactListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Minimal version - uses medium task list
 */
export const Minimal: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Simplest form with only list items, no header or footer.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that only list items are rendered
    await expect(canvas.getByText("Pump seal replacement")).toBeInTheDocument();
    await expect(canvas.getByText("Valve calibration")).toBeInTheDocument();

    // Verify no header or footer
    const container = canvasElement;
    expect(container.textContent).not.toContain("Tasks");
    expect(container.textContent).not.toContain("Footer");
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ArtifactListItemTitle>Pump seal replacement</ArtifactListItemTitle>
          <ArtifactListItemStatus>Overdue</ArtifactListItemStatus>
          <ArtifactListItemDescription>
            P-401A requires new mechanical seal
          </ArtifactListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ArtifactListItemTitle>Valve calibration</ArtifactListItemTitle>
          <ArtifactListItemStatus>Due today</ArtifactListItemStatus>
          <ArtifactListItemDescription>Quarterly calibration check</ArtifactListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ArtifactListItemTitle>Filter cleaning</ArtifactListItemTitle>
          <ArtifactListItemStatus>Completed</ArtifactListItemStatus>
          <ArtifactListItemDescription>Clean inlet filters</ArtifactListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
