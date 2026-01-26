import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor } from "@storybook/test";
import { within } from "@storybook/testing-library";
import { useState } from "react";
import {
  List,
  ListDescription,
  ListDescriptionDetails,
  ListDescriptionTerm,
  ListItem,
  ListItemDescription,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
} from "./list";

const meta: Meta<typeof List> = {
  title: "Primitives/List",
  component: List,
  tags: ["autodocs"],
  argTypes: {
    // Display
    className: {
      control: "text",
      description: "CSS classes for styling the list",
      table: {
        category: "Display",
        type: { summary: "string" },
      },
    },

    // Content
    children: {
      control: false,
      description: "List items and content",
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

/**
 * Basic key-value list
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Simple key-value pairs in a list.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that list items are rendered
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

/**
 * Timeline list with status markers
 */
export const Timeline: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Timeline-style list with status markers and timestamps.",
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

/**
 * Task list with status
 */
export const TaskList: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Task list with status indicators and descriptions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "All list item variants side by side for comparison.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Compact list without gaps
 */
export const Compact: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Compact list with reduced spacing.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Ordered list
 */
export const Ordered: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Ordered list using semantic <ol> markup.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Description list
 */
export const Description: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Definition list using semantic <dl> markup.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Interactive list with stateful updates
 */
export const Interactive: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Stateful list where items toggle active status on click.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial state
    await expect(canvas.getByText("Name")).toBeInTheDocument();
    const activeStatuses = canvas.getAllByText("Active");
    await expect(activeStatuses).toHaveLength(2);

    // Click to toggle first item
    const firstItem = canvas.getByText("Name");
    await userEvent.click(firstItem);

    // Verify state changed
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

/**
 * Minimal list item with title only
 */
export const Minimal: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "List items with only titles, no descriptions or status.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Edge case: Empty list
 */
export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Empty list container.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole("list");
    await expect(list).toBeInTheDocument();
    await expect(list.children).toHaveLength(0);
  },
  render: () => <List />,
};

/**
 * Edge case: Long text overflow
 */
export const EdgeCaseLongText: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "List items with very long text to test overflow behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/This is an extremely long title/)).toBeInTheDocument();
  },
  render: () => (
    <List className="w-80">
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
