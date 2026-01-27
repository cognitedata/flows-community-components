import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import {
  ArtifactList,
  ArtifactListContent,
  ArtifactListHeader,
  ArtifactListItem,
  ArtifactListOrdered,
  ArtifactListTitle,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
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
      description: "Compositional children (Header, Content)",
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
 * Basic artifact list without header
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic task list with status indicators, icons, and descriptions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Pump seal replacement")).toBeInTheDocument();
    await expect(canvas.getByText("Overdue")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ListItemTitle>Pump seal replacement</ListItemTitle>
          <ListItemStatus>Overdue</ListItemStatus>
          <ListItemDescription>P-401A requires new mechanical seal</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Valve calibration</ListItemTitle>
          <ListItemStatus>Due today</ListItemStatus>
          <ListItemDescription>Quarterly calibration check</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Filter cleaning</ListItemTitle>
          <ListItemStatus>Completed</ListItemStatus>
          <ListItemDescription>Clean inlet filters</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Artifact list with header
 */
export const WithHeader: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Task list with an optional header section for context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Maintenance Tasks")).toBeInTheDocument();
    await expect(canvas.getByText("Pump seal replacement")).toBeInTheDocument();
    await expect(canvas.getByText("Overdue")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListHeader>
        <ArtifactListTitle>Maintenance Tasks</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ListItemTitle>Pump seal replacement</ListItemTitle>
          <ListItemStatus>Overdue</ListItemStatus>
          <ListItemDescription>P-401A requires new mechanical seal</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Valve calibration</ListItemTitle>
          <ListItemStatus>Due today</ListItemStatus>
          <ListItemDescription>Quarterly calibration check</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Filter cleaning</ListItemTitle>
          <ListItemStatus>Completed</ListItemStatus>
          <ListItemDescription>Clean inlet filters</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * All variants displayed for comparison
 */
export const AllVariants: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "All list item variants side by side for comparison.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Upcoming task")).toBeInTheDocument();
    await expect(canvas.getByText("Current task")).toBeInTheDocument();
    await expect(canvas.getByText("Completed task")).toBeInTheDocument();
    await expect(canvas.getByText("Error task")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListContent>
        <ArtifactListItem variant="upcoming">
          <ListItemTitle>Upcoming task</ListItemTitle>
          <ListItemStatus>Scheduled</ListItemStatus>
          <ListItemDescription>Pending work item</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Current task</ListItemTitle>
          <ListItemStatus>In progress</ListItemStatus>
          <ListItemDescription>Active work item</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Completed task</ListItemTitle>
          <ListItemStatus>Done</ListItemStatus>
          <ListItemDescription>Finished work item</ListItemDescription>
        </ArtifactListItem>

        <ArtifactListItem variant="error">
          <ListItemTitle>Error task</ListItemTitle>
          <ListItemStatus>Failed</ListItemStatus>
          <ListItemDescription>Task with issues</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Timeline with custom icons
 */
export const WithCustomIcons: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "List items with custom icons instead of default variant icons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Pump 3 cavitation detected")).toBeInTheDocument();
    await expect(canvas.getByText("Compressor C-5 surge events")).toBeInTheDocument();
    await expect(canvas.getByText("Boiler steam leak near header B")).toBeInTheDocument();
  },
  render: () => (
    //design requires arbitrary width as example
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
          <ListItemTitle>Pump 3 cavitation detected</ListItemTitle>
          <ListItemDescription>
            Suction pressure oscillations and elevated noise on P-003 during night shift; cavitation
            likely from low NPSH/blocked strainer. Next step: inspect/clean suction strainer and
            raise tank level 20cm.
          </ListItemDescription>
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
          <ListItemTitle>Compressor C-5 surge events</ListItemTitle>
          <ListItemDescription>
            Three start-up surge spikes with sluggish anti-surge valve response; control loop
            tuning/valve stiction suspected. Next step: Stroke-test ASV, retune PID, and verify
            transmitter calibration.
          </ListItemDescription>
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
          <ListItemTitle>Boiler steam leak near header B</ListItemTitle>
          <ListItemDescription>
            Ultrasonic survey indicates continuous hiss with elevated condensate returns; small
            steam leak wasting energy. Next step: tag exact location, plan hot repair window, and
            quantify loss after fix.
          </ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Ordered list with numbered items
 */
export const OrderedList: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Uses ArtifactListOrdered for numbered/ordered list items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Verify pump pressure")).toBeInTheDocument();
    await expect(canvas.getByText("Check valve alignment")).toBeInTheDocument();
    await expect(canvas.getByText("Run diagnostics")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Startup Checklist</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListOrdered>
        <ArtifactListItem variant="completed">
          <ListItemTitle>Verify pump pressure</ListItemTitle>
          <ListItemStatus>Done</ListItemStatus>
        </ArtifactListItem>
        <ArtifactListItem variant="now">
          <ListItemTitle>Check valve alignment</ListItemTitle>
          <ListItemStatus>In progress</ListItemStatus>
        </ArtifactListItem>
        <ArtifactListItem variant="upcoming">
          <ListItemTitle>Run diagnostics</ListItemTitle>
          <ListItemStatus>Pending</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListOrdered>
    </ArtifactList>
  ),
};

/**
 * Compact timeline list
 */
export const Timeline: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Compact timeline list with dates and status indicators.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const inspections = canvas.getAllByText("Inspection");
    await expect(inspections.length).toBeGreaterThan(1);
    await expect(canvas.getByText("Event")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListContent>
        <ArtifactListItem variant="upcoming">
          <ListItemTitle>Inspection</ListItemTitle>
          <ListItemStatus>Dec 22, 2024 5:00 AM</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Event</ListItemTitle>
          <ListItemStatus>Today 3:05 PM</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Inspection</ListItemTitle>
          <ListItemStatus>1 d ago</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Inspection</ListItemTitle>
          <ListItemStatus>Dec 17, 2024 9:00 AM</ListItemStatus>
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
    order: 7,
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
                <ListItemTitle>{item.title}</ListItemTitle>
                <ListItemStatus>{isDone ? "Completed" : "In progress"}</ListItemStatus>
                <ListItemDescription>{item.detail}</ListItemDescription>
              </ArtifactListItem>
            );
          })}
        </ArtifactListContent>
      </ArtifactList>
    );
  },
};

/**
 * Edge case: Empty list
 */
export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Empty artifact list with no items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector("[data-slot='artifact-list']");
    await expect(list).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-100">
      <ArtifactListHeader>
        <ArtifactListTitle>Empty Task List</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent />
    </ArtifactList>
  ),
};

/**
 * Edge case: Long text overflow
 */
export const EdgeCaseLongText: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "List items with very long text to test overflow behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/This is an extremely long task title/)).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-80">
      <ArtifactListHeader>
        <ArtifactListTitle>
          This is a very long header title that might overflow the container
        </ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="error">
          <ListItemTitle>
            This is an extremely long task title that should wrap or truncate properly within the
            list item
          </ListItemTitle>
          <ListItemStatus>Overdue since yesterday</ListItemStatus>
          <ListItemDescription>
            This description is also quite long and contains detailed information about the task
            that needs to be handled gracefully by the component layout.
          </ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem variant="now">
          <ListItemTitle>Normal task</ListItemTitle>
          <ListItemStatus>Due today</ListItemStatus>
          <ListItemDescription>Normal description</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};

/**
 * Playground for interactive experimentation
 */
export const Playground: Story = {
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground for experimenting with the ArtifactList component.",
      },
    },
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListHeader>
        <ArtifactListTitle>Playground List</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="now">
          <ListItemTitle>Sample task</ListItemTitle>
          <ListItemStatus>In progress</ListItemStatus>
          <ListItemDescription>Try adjusting the className prop</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
  args: {
    className: "w-100",
  },
};
