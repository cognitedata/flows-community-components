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
  ListItemIcon,
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
    order: 5,
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
    order: 6,
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
    order: 7,
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
    order: 8,
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
    order: 9,
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

/**
 * List with custom icons
 */
export const WithCustomIcons: Story = {
  parameters: {
    order: 12,
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

    // Verify custom icons are present (check for SVG elements)
    const icons = canvasElement.querySelectorAll('[data-slot="list-item-icon"] svg');
    await expect(icons.length).toBeGreaterThanOrEqual(3);
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

/**
 * Edge case: Single item
 */
export const EdgeCaseSingleItem: Story = {
  parameters: {
    order: 13,
    docs: {
      description: {
        story: "List with only a single item.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Edge case: Mixed content structure
 */
export const EdgeCaseMixedContent: Story = {
  parameters: {
    order: 14,
    docs: {
      description: {
        story:
          "List items with varying content structure - some with descriptions, some without, some with status.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Edge case: Very short text
 */
export const EdgeCaseShortText: Story = {
  parameters: {
    order: 15,
    docs: {
      description: {
        story: "List items with very short or minimal text content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Edge case: Many items
 */
export const EdgeCaseManyItems: Story = {
  parameters: {
    order: 16,
    docs: {
      description: {
        story: "List with many items to test performance and scrolling behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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

/**
 * Edge case: Special characters
 */
export const EdgeCaseSpecialCharacters: Story = {
  parameters: {
    order: 17,
    docs: {
      description: {
        story: "List items with special characters, symbols, and Unicode.",
      },
    },
  },
  play: async ({ canvasElement }) => {
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
        <ListItemTitle>Status: ✓ Passed</ListItemTitle>
        <ListItemDescription>Check mark and emoji: ✓ ✗ ⚠️ 🔧</ListItemDescription>
      </ListItem>
    </List>
  ),
};

/**
 * Edge case: No variant with custom styling
 */
export const EdgeCaseNoVariant: Story = {
  parameters: {
    order: 18,
    docs: {
      description: {
        story: "List items without any variant specified (no automatic icons).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Plain item 1")).toBeInTheDocument();
    await expect(canvas.getByText("Plain item 2")).toBeInTheDocument();

    // Verify no automatic icons were inserted
    const icons = canvasElement.querySelectorAll('[data-slot="list-item-icon"]');
    await expect(icons.length).toBe(0);
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

/**
 * Interactive playground
 */
export const Playground: Story = {
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground for experimenting with list variants and configurations.",
      },
    },
  },
  render: function PlaygroundStory() {
    const [variant, setVariant] = useState<"upcoming" | "now" | "completed" | "error" | undefined>(
      "now"
    );
    const [showDescription, setShowDescription] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const [itemCount, setItemCount] = useState(3);

    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <div className="flex flex-wrap gap-4 p-4 border rounded-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="list-variant" className="text-sm font-medium">
              Variant
            </label>
            <select
              id="list-variant"
              className="px-3 py-2 border rounded"
              value={variant ?? "none"}
              onChange={(e) =>
                setVariant(e.target.value === "none" ? undefined : (e.target.value as any))
              }
            >
              <option value="none">None</option>
              <option value="upcoming">Upcoming</option>
              <option value="now">Now</option>
              <option value="completed">Completed</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="list-item-count" className="text-sm font-medium">
              Item Count
            </label>
            <input
              id="list-item-count"
              type="number"
              min="1"
              max="10"
              className="px-3 py-2 border rounded w-20"
              value={itemCount}
              onChange={(e) => setItemCount(Number.parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showDescription}
                onChange={(e) => setShowDescription(e.target.checked)}
              />
              Show Description
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showStatus}
                onChange={(e) => setShowStatus(e.target.checked)}
              />
              Show Status
            </label>
          </div>
        </div>

        <List>
          {Array.from({ length: itemCount }, (_, i) => (
            <ListItem key={i} variant={variant}>
              <ListItemTitle>Item {i + 1}</ListItemTitle>
              {showDescription && (
                <ListItemDescription>Description for item {i + 1}</ListItemDescription>
              )}
              {showStatus && <ListItemStatus>Status {i + 1}</ListItemStatus>}
            </ListItem>
          ))}
        </List>
      </div>
    );
  },
};
