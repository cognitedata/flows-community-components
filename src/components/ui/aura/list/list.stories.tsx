import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { type ComponentProps, useState } from "react";
import {
  List,
  ListDescription,
  ListDescriptionDetails,
  ListDescriptionTerm,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
} from "./list";

type StoryPlayContext = { canvasElement: HTMLElement };

const meta: Meta<typeof List> = {
  title: "Primitives/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      table: {
        category: "Variants/Styling",
        type: { summary: "string" },
      },
    },

    children: {
      control: false,
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Name")).toBeInTheDocument();
    await expect(canvas.getByText("John Doe")).toBeInTheDocument();
    await expect(canvas.getByText("Email")).toBeInTheDocument();
    await expect(canvas.getByText("john@example.com")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <ListItemTitle>Name</ListItemTitle>
        <ListItemDescription>John Doe</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Email</ListItemTitle>
        <ListItemDescription>john@example.com</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Role</ListItemTitle>
        <ListItemDescription>Administrator</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Status</ListItemTitle>
        <ListItemDescription>Active</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const Timeline: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    const inspections = canvas.getAllByText("Inspection");
    await expect(inspections.length).toBeGreaterThan(1);
    await expect(canvas.getByText("Event")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem variant="upcoming">
        <ListItemTitle>Inspection</ListItemTitle>
        <ListItemStatus>Dec 22, 2024 5:00 AM</ListItemStatus>
        <ListItemDescription>Scheduled facility inspection</ListItemDescription>
      </ListItem>
      <ListItem variant="now">
        <ListItemTitle>Event</ListItemTitle>
        <ListItemStatus>Today 3:05 PM</ListItemStatus>
        <ListItemDescription>Control room briefing</ListItemDescription>
      </ListItem>
      <ListItem variant="completed">
        <ListItemTitle>Inspection</ListItemTitle>
        <ListItemStatus>1 d ago</ListItemStatus>
        <ListItemDescription>Completed checklist review</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const TaskList: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Pump seal replacement")).toBeInTheDocument();
    await expect(canvas.getByText("Overdue")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem variant="error">
        <ListItemTitle>Pump seal replacement</ListItemTitle>
        <ListItemStatus>Overdue</ListItemStatus>
        <ListItemDescription>P-401A requires new mechanical seal</ListItemDescription>
      </ListItem>
      <ListItem variant="now">
        <ListItemTitle>Valve calibration</ListItemTitle>
        <ListItemStatus>Due today</ListItemStatus>
        <ListItemDescription>Quarterly calibration check</ListItemDescription>
      </ListItem>
      <ListItem variant="completed">
        <ListItemTitle>Filter cleaning</ListItemTitle>
        <ListItemStatus>Completed</ListItemStatus>
        <ListItemDescription>Clean inlet filters</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const AllVariants: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Upcoming")).toBeInTheDocument();
    await expect(canvas.getByText("Now")).toBeInTheDocument();
    await expect(canvas.getByText("Completed")).toBeInTheDocument();
    await expect(canvas.getByText("Error")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem variant="upcoming">
        <ListItemTitle>Upcoming</ListItemTitle>
        <ListItemStatus>Scheduled</ListItemStatus>
        <ListItemDescription>Pending task</ListItemDescription>
      </ListItem>
      <ListItem variant="now">
        <ListItemTitle>Now</ListItemTitle>
        <ListItemStatus>In progress</ListItemStatus>
        <ListItemDescription>Active task</ListItemDescription>
      </ListItem>
      <ListItem variant="completed">
        <ListItemTitle>Completed</ListItemTitle>
        <ListItemStatus>Done</ListItemStatus>
        <ListItemDescription>Finished task</ListItemDescription>
      </ListItem>
      <ListItem variant="error">
        <ListItemTitle>Error</ListItemTitle>
        <ListItemStatus>Failed</ListItemStatus>
        <ListItemDescription>Task with issues</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const Compact: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("CPU")).toBeInTheDocument();
    await expect(canvas.getByText("45%")).toBeInTheDocument();
  },
  render: () => (
    <List className="gap-2">
      <ListItem>
        <ListItemTitle>CPU</ListItemTitle>
        <ListItemDescription>45%</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Memory</ListItemTitle>
        <ListItemDescription>2.1 GB</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Disk</ListItemTitle>
        <ListItemDescription>78%</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Network</ListItemTitle>
        <ListItemDescription>15 Mbps</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Step one")).toBeInTheDocument();
    await expect(canvas.getByText("Step two")).toBeInTheDocument();
  },
  render: () => (
    <ListOrdered>
      <ListItem>
        <ListItemTitle>Step one</ListItemTitle>
        <ListItemDescription>Initialize the system</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Step two</ListItemTitle>
        <ListItemDescription>Run diagnostics</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Step three</ListItemTitle>
        <ListItemDescription>Start operations</ListItemDescription>
      </ListItem>
    </ListOrdered>
  ),
};

export const Description: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Max pressure")).toBeInTheDocument();
    await expect(canvas.getByText("120 bar")).toBeInTheDocument();
  },
  render: () => (
    <ListDescription>
      <ListDescriptionTerm>Max pressure</ListDescriptionTerm>
      <ListDescriptionDetails>120 bar</ListDescriptionDetails>
      <ListDescriptionTerm>Temperature</ListDescriptionTerm>
      <ListDescriptionDetails>85°C</ListDescriptionDetails>
      <ListDescriptionTerm>Flow rate</ListDescriptionTerm>
      <ListDescriptionDetails>45 m³/h</ListDescriptionDetails>
    </ListDescription>
  ),
};

export const Interactive: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Name")).toBeInTheDocument();
    const activeStatuses = canvas.getAllByText("Active");
    await expect(activeStatuses).toHaveLength(2);

    const firstItem = canvas.getByText("Name");
    await userEvent.click(firstItem);

    await waitFor(() => {
      const inactiveStatuses = canvas.getAllByText("Inactive");
      expect(inactiveStatuses).toHaveLength(2);
    });
  },
  render: function ListInteractiveStory() {
    const [items, setItems] = useState([
      { id: "name", label: "Name", value: "John Doe", active: true },
      { id: "email", label: "Email", value: "john@example.com", active: false },
      { id: "role", label: "Role", value: "Administrator", active: true },
    ]);

    const toggleItem = (id: string) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
      );
    };

    return (
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            variant={item.active ? "now" : "upcoming"}
            className="cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <ListItemTitle>{item.label}</ListItemTitle>
            <ListItemStatus>{item.active ? "Active" : "Inactive"}</ListItemStatus>
            <ListItemDescription>{item.value}</ListItemDescription>
          </ListItem>
        ))}
      </List>
    );
  },
};

export const Minimal: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Item one")).toBeInTheDocument();
    await expect(canvas.getByText("Item two")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <ListItemTitle>Item one</ListItemTitle>
      </ListItem>
      <ListItem>
        <ListItemTitle>Item two</ListItemTitle>
      </ListItem>
      <ListItem>
        <ListItemTitle>Item three</ListItemTitle>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(list.children).toHaveLength(0);
  },
  render: () => <List />,
};

export const EdgeCaseLongText: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/This is an extremely long title/)).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem variant="now">
        <ListItemTitle>
          This is an extremely long title that should wrap or truncate properly
        </ListItemTitle>
        <ListItemStatus>Status</ListItemStatus>
        <ListItemDescription>
          This description is also quite long and contains a lot of text that needs to be handled
          gracefully by the component layout without breaking the design.
        </ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Normal title</ListItemTitle>
        <ListItemDescription>Normal description</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const WithCustomIcons: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Pump 3 cavitation detected")).toBeInTheDocument();
    await expect(canvas.getByText("Compressor C-5 surge events")).toBeInTheDocument();
    await expect(canvas.getByText("Boiler steam leak near header B")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
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
          likely from low NPSH/blocked strainer. Next step: inspect/clean suction strainer and raise
          tank level 20cm.
        </ListItemDescription>
      </ListItem>

      <ListItem>
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
      </ListItem>

      <ListItem>
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
          Ultrasonic survey indicates continuous hiss with elevated condensate returns; small steam
          leak wasting energy. Next step: tag exact location, plan hot repair window, and quantify
          loss after fix.
        </ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseSingleItem: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(list.children).toHaveLength(1);
    await expect(canvas.getByText("Only item")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem variant="now">
        <ListItemTitle>Only item</ListItemTitle>
        <ListItemDescription>This is the only item in the list</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseMixedContent: Story = {
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Title only")).toBeInTheDocument();
    await expect(canvas.getByText("Title with description")).toBeInTheDocument();
    await expect(canvas.getByText("Title with status only")).toBeInTheDocument();
    await expect(canvas.getByText("Complete item")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <ListItemTitle>Title only</ListItemTitle>
      </ListItem>
      <ListItem>
        <ListItemTitle>Title with description</ListItemTitle>
        <ListItemDescription>Has a description but no status</ListItemDescription>
      </ListItem>
      <ListItem variant="now">
        <ListItemTitle>Title with status only</ListItemTitle>
        <ListItemStatus>Active</ListItemStatus>
      </ListItem>
      <ListItem variant="completed">
        <ListItemTitle>Complete item</ListItemTitle>
        <ListItemStatus>Done</ListItemStatus>
        <ListItemDescription>Has both description and status</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseShortText: Story = {
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("A")).toBeInTheDocument();
    await expect(canvas.getByText("B")).toBeInTheDocument();
    await expect(canvas.getByText("C")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <ListItemTitle>A</ListItemTitle>
        <ListItemDescription>1</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>B</ListItemTitle>
        <ListItemDescription>2</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>C</ListItemTitle>
        <ListItemDescription>3</ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseManyItems: Story = {
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(list.children.length).toBeGreaterThanOrEqual(20);

    await expect(canvas.getByText("Item 1")).toBeInTheDocument();
    await expect(canvas.getByText("Item 20")).toBeInTheDocument();
  },
  render: () => (
    <List className="max-h-80 overflow-y-auto">
      {Array.from({ length: 20 }, (_, i) => (
        <ListItem key={i} variant={i % 4 === 0 ? "completed" : i % 3 === 0 ? "now" : "upcoming"}>
          <ListItemTitle>Item {i + 1}</ListItemTitle>
          <ListItemDescription>Description for item {i + 1}</ListItemDescription>
          <ListItemStatus>Status {i + 1}</ListItemStatus>
        </ListItem>
      ))}
    </List>
  ),
};

export const EdgeCaseSpecialCharacters: Story = {
  parameters: {
    order: 17,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Temperature: 85°C")).toBeInTheDocument();
    await expect(canvas.getByText(/Pressure.*120.*bar/)).toBeInTheDocument();
    await expect(canvas.getByText(/Flow rate.*45.*m³\/h/)).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <ListItemTitle>Temperature: 85°C</ListItemTitle>
        <ListItemDescription>Celsius measurement with degree symbol</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Pressure: 120 ± 5 bar</ListItemTitle>
        <ListItemDescription>Plus-minus tolerance notation</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Flow rate: 45 m³/h</ListItemTitle>
        <ListItemDescription>Cubic meter per hour with superscript</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>
          Status:{" "}
          <span role="img" aria-label="check mark">
            ✓
          </span>{" "}
          Passed
        </ListItemTitle>
        <ListItemDescription>
          Check mark and emoji:{" "}
          <span role="img" aria-label="check mark">
            ✓
          </span>{" "}
          <span role="img" aria-label="cross mark">
            ✗
          </span>{" "}
          <span role="img" aria-label="warning">
            ⚠️
          </span>{" "}
          <span role="img" aria-label="wrench">
            🔧
          </span>
        </ListItemDescription>
      </ListItem>
    </List>
  ),
};

export const EdgeCaseNoVariant: Story = {
  parameters: {
    order: 18,
  },
  play: async ({ canvasElement }: StoryPlayContext) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Plain item 1")).toBeInTheDocument();
    await expect(canvas.getByText("Plain item 2")).toBeInTheDocument();
  },
  render: () => (
    <List>
      <ListItem>
        <ListItemTitle>Plain item 1</ListItemTitle>
        <ListItemDescription>No variant, no icon</ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemTitle>Plain item 2</ListItemTitle>
        <ListItemDescription>Another plain item</ListItemDescription>
        <ListItemStatus>Status</ListItemStatus>
      </ListItem>
      <ListItem>
        <ListItemTitle>Plain item 3</ListItemTitle>
      </ListItem>
    </List>
  ),
};

export const Playground: Story = {
  args: {
    className: "",
  },
  parameters: {
    order: 99,
  },
  render: (args: ComponentProps<typeof List>) => (
    <List {...args}>
      <ListItem variant="upcoming">
        <ListItemTitle>Upcoming</ListItemTitle>
        <ListItemStatus>Scheduled</ListItemStatus>
        <ListItemDescription>Pending task</ListItemDescription>
      </ListItem>
      <ListItem variant="now">
        <ListItemTitle>Now</ListItemTitle>
        <ListItemStatus>In progress</ListItemStatus>
        <ListItemDescription>Active task</ListItemDescription>
      </ListItem>
      <ListItem variant="completed">
        <ListItemTitle>Completed</ListItemTitle>
        <ListItemStatus>Done</ListItemStatus>
        <ListItemDescription>Finished task</ListItemDescription>
      </ListItem>
    </List>
  ),
};
