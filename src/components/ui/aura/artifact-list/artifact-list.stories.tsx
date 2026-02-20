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
  tags: ["autodocs", "ai-elements"],
  argTypes: {
    className: {
      control: "text",
      table: {
        category: "Display",
      },
    },
    children: {
      control: false,
      table: {
        category: "Content",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
const titleArgTypes = {
  as: {
    control: "select",
    options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    table: {
      category: "Content",
      defaultValue: {
        summary: "h3",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ArtifactList>;
export const Basic: Story = {
  parameters: {
    order: 1,
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
          <ListItemDescription>P-401A requires new mechanical seal</ListItemDescription>
          <ListItemStatus>Overdue</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Valve calibration</ListItemTitle>
          <ListItemDescription>Quarterly calibration check</ListItemDescription>
          <ListItemStatus>Due today</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Filter cleaning</ListItemTitle>
          <ListItemDescription>Clean inlet filters</ListItemDescription>
          <ListItemStatus>Completed</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const WithHeader: Story = {
  parameters: {
    order: 2,
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
          <ListItemDescription>P-401A requires new mechanical seal</ListItemDescription>
          <ListItemStatus>Overdue</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Valve calibration</ListItemTitle>
          <ListItemDescription>Quarterly calibration check</ListItemDescription>
          <ListItemStatus>Due today</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Filter cleaning</ListItemTitle>
          <ListItemDescription>Clean inlet filters</ListItemDescription>
          <ListItemStatus>Completed</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const AllVariants: Story = {
  parameters: {
    order: 3,
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
          <ListItemDescription>Pending work item</ListItemDescription>
          <ListItemStatus>Scheduled</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="now">
          <ListItemTitle>Current task</ListItemTitle>
          <ListItemDescription>Active work item</ListItemDescription>
          <ListItemStatus>In progress</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="completed">
          <ListItemTitle>Completed task</ListItemTitle>
          <ListItemDescription>Finished work item</ListItemDescription>
          <ListItemStatus>Done</ListItemStatus>
        </ArtifactListItem>

        <ArtifactListItem variant="error">
          <ListItemTitle>Error task</ListItemTitle>
          <ListItemDescription>Task with issues</ListItemDescription>
          <ListItemStatus>Failed</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const WithCustomIcons: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Pump 3 cavitation detected")).toBeInTheDocument();
    await expect(canvas.getByText("Compressor C-5 surge events")).toBeInTheDocument();
    await expect(canvas.getByText("Boiler steam leak near header B")).toBeInTheDocument();
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
export const OrderedList: Story = {
  parameters: {
    order: 5,
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
export const Timeline: Story = {
  parameters: {
    order: 6,
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
export const Interactive: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inProgressItems = canvas.getAllByText("In progress");
    await expect(inProgressItems).toHaveLength(2);
    const firstItem = canvas.getByText("Pump seal replacement");
    await userEvent.click(firstItem);
    await waitFor(
      () => {
        const completedItems = canvas.getAllByText("Completed");
        expect(completedItems).toHaveLength(2);
      },
      {
        timeout: 300,
      }
    );
    await userEvent.click(firstItem);
    await waitFor(
      () => {
        const inProgressItemsAfter = canvas.getAllByText("In progress");
        expect(inProgressItemsAfter).toHaveLength(2);
      },
      {
        timeout: 300,
      }
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
          item.id === id
            ? {
                ...item,
                status: item.status === "done" ? "open" : "done",
              }
            : item
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
                <ListItemDescription>{item.detail}</ListItemDescription>
                <ListItemStatus>{isDone ? "Completed" : "In progress"}</ListItemStatus>
              </ArtifactListItem>
            );
          })}
        </ArtifactListContent>
      </ArtifactList>
    );
  },
};
export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 8,
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
export const EdgeCaseLongText: Story = {
  parameters: {
    order: 9,
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
          <ListItemDescription>
            This description is also quite long and contains detailed information about the task
            that needs to be handled gracefully by the component layout.
          </ListItemDescription>
          <ListItemStatus>Overdue since yesterday</ListItemStatus>
        </ArtifactListItem>
        <ArtifactListItem variant="now">
          <ListItemTitle>Normal task</ListItemTitle>
          <ListItemDescription>Normal description</ListItemDescription>
          <ListItemStatus>Due today</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const SemanticHeadings: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const h2Title = canvas.getByRole("heading", {
      level: 2,
      name: "Main Section Tasks (h2)",
    });
    await expect(h2Title).toBeInTheDocument();
    const h3Title = canvas.getByRole("heading", {
      level: 3,
      name: "Default Heading (h3)",
    });
    await expect(h3Title).toBeInTheDocument();
    const h4Title = canvas.getByRole("heading", {
      level: 4,
      name: "Subsection Tasks (h4)",
    });
    await expect(h4Title).toBeInTheDocument();
    const h3ItemTitle = canvas.getByRole("heading", {
      level: 3,
      name: "High-level task",
    });
    await expect(h3ItemTitle).toBeInTheDocument();
    const h4ItemTitle = canvas.getByRole("heading", {
      level: 4,
      name: "Standard task",
    });
    await expect(h4ItemTitle).toBeInTheDocument();
    const h5ItemTitle = canvas.getByRole("heading", {
      level: 5,
      name: "Nested task",
    });
    await expect(h5ItemTitle).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <ArtifactList>
        <ArtifactListHeader>
          <ArtifactListTitle as="h2">Main Section Tasks (h2)</ArtifactListTitle>
        </ArtifactListHeader>
        <ArtifactListContent>
          <ArtifactListItem variant="now">
            <ListItemTitle as="h3">High-level task</ListItemTitle>
            <ListItemDescription>
              ListItemTitle uses as="h3" to maintain hierarchy under h2 ArtifactListTitle
            </ListItemDescription>
            <ListItemStatus>In progress</ListItemStatus>
          </ArtifactListItem>
        </ArtifactListContent>
      </ArtifactList>

      <ArtifactList>
        <ArtifactListHeader>
          <ArtifactListTitle>Default Heading (h3)</ArtifactListTitle>
        </ArtifactListHeader>
        <ArtifactListContent>
          <ArtifactListItem variant="now">
            <ListItemTitle as="h4">Standard task</ListItemTitle>
            <ListItemDescription>
              ListItemTitle uses as="h4" to maintain hierarchy under h3 ArtifactListTitle
            </ListItemDescription>
            <ListItemStatus>In progress</ListItemStatus>
          </ArtifactListItem>
        </ArtifactListContent>
      </ArtifactList>

      <ArtifactList>
        <ArtifactListHeader>
          <ArtifactListTitle as="h4">Subsection Tasks (h4)</ArtifactListTitle>
        </ArtifactListHeader>
        <ArtifactListContent>
          <ArtifactListItem variant="now">
            <ListItemTitle as="h5">Nested task</ListItemTitle>
            <ListItemDescription>
              ListItemTitle uses as="h5" to maintain hierarchy under h4 ArtifactListTitle
            </ListItemDescription>
            <ListItemStatus>In progress</ListItemStatus>
          </ArtifactListItem>
        </ArtifactListContent>
      </ArtifactList>
    </div>
  ),
};
export const EdgeCaseSingleItem: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(list.children).toHaveLength(1);
    await expect(canvas.getByText("Single task")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Single Item List</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="now">
          <ListItemTitle>Single task</ListItemTitle>
          <ListItemDescription>This is the only item in the list</ListItemDescription>
          <ListItemStatus>Active</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const EdgeCaseMixedContent: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Title only")).toBeInTheDocument();
    await expect(canvas.getByText("Title with description")).toBeInTheDocument();
    await expect(canvas.getByText("Title with status only")).toBeInTheDocument();
    await expect(canvas.getByText("Complete item")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Mixed Content</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemTitle>Title only</ListItemTitle>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Title with description</ListItemTitle>
          <ListItemDescription>Has a description but no status</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem variant="now">
          <ListItemTitle>Title with status only</ListItemTitle>
          <ListItemStatus>Active</ListItemStatus>
        </ArtifactListItem>
        <ArtifactListItem variant="completed">
          <ListItemTitle>Complete item</ListItemTitle>
          <ListItemStatus>Done</ListItemStatus>
          <ListItemDescription>Has both description and status</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const EdgeCaseShortText: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("A")).toBeInTheDocument();
    await expect(canvas.getByText("B")).toBeInTheDocument();
    await expect(canvas.getByText("C")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Short Items</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemTitle>A</ListItemTitle>
          <ListItemDescription>1</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>B</ListItemTitle>
          <ListItemDescription>2</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>C</ListItemTitle>
          <ListItemDescription>3</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const EdgeCaseManyItems: Story = {
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(list.children.length).toBeGreaterThanOrEqual(20);
    await expect(canvas.getByText("Task 1")).toBeInTheDocument();
    await expect(canvas.getByText("Task 20")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96 max-h-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Many Tasks</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent className="overflow-y-auto max-h-80">
        {Array.from(
          {
            length: 20,
          },
          (_, i) => (
            <ArtifactListItem
              key={i}
              variant={i % 4 === 0 ? "completed" : i % 3 === 0 ? "now" : "upcoming"}
            >
              <ListItemTitle>Task {i + 1}</ListItemTitle>
              <ListItemDescription>Description for task {i + 1}</ListItemDescription>
              <ListItemStatus>Status {i + 1}</ListItemStatus>
            </ArtifactListItem>
          )
        )}
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const EdgeCaseSpecialCharacters: Story = {
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Temperature: 85°C")).toBeInTheDocument();
    await expect(canvas.getByText(/Pressure.*120.*bar/)).toBeInTheDocument();
    await expect(canvas.getByText(/Flow rate.*45.*m³\/h/)).toBeInTheDocument();
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Measurements & Symbols</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemTitle>Temperature: 85°C</ListItemTitle>
          <ListItemDescription>Celsius measurement with degree symbol</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Pressure: 120 ± 5 bar</ListItemTitle>
          <ListItemDescription>Plus-minus tolerance notation</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Flow rate: 45 m³/h</ListItemTitle>
          <ListItemDescription>Cubic meter per hour with superscript</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Status: ✓ Passed</ListItemTitle>
          <ListItemDescription>Check mark and emoji: ✓ ✗ ⚠️ 🔧</ListItemDescription>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const EdgeCaseNoVariant: Story = {
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Plain item 1")).toBeInTheDocument();
    await expect(canvas.getByText("Plain item 2")).toBeInTheDocument();
    const icons = canvasElement.querySelectorAll('[data-slot="list-item-icon"]');
    await expect(icons.length).toBe(0);
  },
  render: () => (
    <ArtifactList className="w-96">
      <ArtifactListHeader>
        <ArtifactListTitle>Plain Items</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem>
          <ListItemTitle>Plain item 1</ListItemTitle>
          <ListItemDescription>No variant, no icon</ListItemDescription>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Plain item 2</ListItemTitle>
          <ListItemDescription>Another plain item</ListItemDescription>
          <ListItemStatus>Status</ListItemStatus>
        </ArtifactListItem>
        <ArtifactListItem>
          <ListItemTitle>Plain item 3</ListItemTitle>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
};
export const Playground: Story = {
  parameters: {
    order: 99,
  },
  render: (args) => (
    <ArtifactList {...args}>
      <ArtifactListHeader>
        <ArtifactListTitle>Playground List</ArtifactListTitle>
      </ArtifactListHeader>
      <ArtifactListContent>
        <ArtifactListItem variant="now">
          <ListItemTitle>Sample task</ListItemTitle>
          <ListItemDescription>Try adjusting the className prop</ListItemDescription>
          <ListItemStatus>In progress</ListItemStatus>
        </ArtifactListItem>
      </ArtifactListContent>
    </ArtifactList>
  ),
  args: {
    className: "w-100",
  },
};
