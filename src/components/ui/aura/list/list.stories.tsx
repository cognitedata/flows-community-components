/* eslint-disable no-console */

import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { within } from '@storybook/testing-library';
import { useState } from "react";
import {
  List,
  ListDescription,
  ListDescriptionDetails,
  ListDescriptionTerm,
  ListItem,
  ListItemContent,
  ListItemHeader,
  ListItemIcon,
  ListItemLabel,
  ListItemTitle,
  ListItemValue,
  ListOrdered,
} from './list';

const meta: Meta<typeof List> = {
  title: 'Primitives/List',
  component: List,
  tags: ['autodocs'],
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
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof List>;

/**
 * Basic key-value list
 */
export const Basic: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Simple key-value pairs in a list.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that list items are rendered
    await expect(canvas.getByText('Name')).toBeInTheDocument();
    await expect(canvas.getByText('John Doe')).toBeInTheDocument();
    await expect(canvas.getByText('Email')).toBeInTheDocument();
    await expect(canvas.getByText('john@example.com')).toBeInTheDocument();
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemLabel>Name</ListItemLabel>
        <ListItemValue>John Doe</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Email</ListItemLabel>
        <ListItemValue>john@example.com</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Role</ListItemLabel>
        <ListItemValue>Administrator</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Status</ListItemLabel>
        <ListItemValue>Active</ListItemValue>
      </ListItem>
    </List>
  ),
};

/**
 * Complete usage of all list variants and slots
 */
export const Complete: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Shows unordered, ordered, and description lists plus all item slots (label/value, icon/title/header/content).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Owner")).toBeInTheDocument();
    await expect(canvas.getByText("Inspection")).toBeInTheDocument();
    await expect(canvas.getByText("Step one")).toBeInTheDocument();
    await expect(canvas.getByText("Max pressure")).toBeInTheDocument();
  },
  render: (args) => (
    <div className="flex w-100 flex-col gap-6">
      <List {...args}>
        <ListItem>
          <ListItemLabel>Owner</ListItemLabel>
          <ListItemValue>Facilities</ListItemValue>
        </ListItem>
        <ListItem>
          <ListItemLabel>Asset</ListItemLabel>
          <ListItemValue>P-401A</ListItemValue>
        </ListItem>
      </List>

      <List>
        <ListItem>
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
                    className="text-foreground"
                  />
                </svg>
              </ListItemIcon>
              <span className="text-sm font-medium">Inspection</span>
            </ListItemTitle>
          </ListItemHeader>
          <ListItemContent className="pl-6 text-muted-foreground">
            Dec 22, 2024 5:00 AM
          </ListItemContent>
        </ListItem>
      </List>

      <ListOrdered>
        <ListItem>
          <ListItemLabel>Step one</ListItemLabel>
          <ListItemValue>Initialize the system</ListItemValue>
        </ListItem>
        <ListItem>
          <ListItemLabel>Step two</ListItemLabel>
          <ListItemValue>Run diagnostics</ListItemValue>
        </ListItem>
      </ListOrdered>

      <ListDescription className="grid gap-2">
        <ListDescriptionTerm>Max pressure</ListDescriptionTerm>
        <ListDescriptionDetails>120 bar</ListDescriptionDetails>
        <ListDescriptionTerm>Temperature</ListDescriptionTerm>
        <ListDescriptionDetails>85°C</ListDescriptionDetails>
      </ListDescription>
    </div>
  ),
};

/**
 * Interactive list with stateful updates
 */
export const Interactive: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Stateful list where items toggle active status on click.",
      },
    },
  },
  render: function ListInteractiveStory(args) {
    const [items, setItems] = useState([
      { id: "name", label: "Name", value: "John Doe", active: true },
      { id: "email", label: "Email", value: "john@example.com", active: false },
      { id: "role", label: "Role", value: "Administrator", active: true },
    ]);

    const toggleItem = (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, active: !item.active } : item
        )
      );
    };

    return (
      <List {...args}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            className="cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <ListItemLabel
              className={item.active ? "text-foreground" : "text-muted-foreground"}
            >
              {item.label}
            </ListItemLabel>
            <ListItemValue>{item.value}</ListItemValue>
          </ListItem>
        ))}
      </List>
    );
  },
};

/**
 * Timeline list with icons
 */
export const Timeline: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Timeline-style list with status indicators and timestamps.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Inspection')).toBeInTheDocument();
    await expect(canvas.getByText('Event')).toBeInTheDocument();
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
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
      </ListItem>

      <ListItem>
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
                  className="text-foreground"
                />
              </svg>
            </ListItemIcon>
            <span className="text-sm font-medium">Event</span>
          </ListItemTitle>
        </ListItemHeader>
        <ListItemContent className="pl-6 text-muted-foreground">
          Today 3:05 PM
        </ListItemContent>
      </ListItem>

      <ListItem>
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
      </ListItem>
    </List>
  ),
};

/**
 * Task list with status
 */
export const TaskList: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Task list with status indicators and descriptions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemHeader>
          <ListItemTitle>
            <ListItemIcon className="relative flex h-4 w-4 items-center justify-center">
              <span className="h-[6px] w-[6px] rounded-full bg-destructive-foreground" />
            </ListItemIcon>
            <span className="text-sm font-medium">Pump seal replacement</span>
          </ListItemTitle>
          <span className="text-sm font-medium text-destructive-foreground">
            Overdue
          </span>
        </ListItemHeader>
        <ListItemContent className="pl-6 text-muted-foreground">
          P-401A requires new mechanical seal
        </ListItemContent>
      </ListItem>

      <ListItem>
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
                  className="text-foreground"
                />
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
      </ListItem>

      <ListItem>
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
      </ListItem>
    </List>
  ),
};

/**
 * Compact list without gaps
 */
export const Compact: Story = {
  args: {
    className: 'gap-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact list with reduced spacing.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('CPU')).toBeInTheDocument();
    await expect(canvas.getByText('45%')).toBeInTheDocument();
  },
  render: (args) => (
    <List {...args}>
      <ListItem>
        <ListItemLabel>CPU</ListItemLabel>
        <ListItemValue>45%</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Memory</ListItemLabel>
        <ListItemValue>2.1 GB</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Disk</ListItemLabel>
        <ListItemValue>78%</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Network</ListItemLabel>
        <ListItemValue>15 Mbps</ListItemValue>
      </ListItem>
    </List>
  ),
};

/**
 * Ordered list
 */
export const Ordered: Story = {
  args: {},
  parameters: {
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
        <ListItemLabel>Step one</ListItemLabel>
        <ListItemValue>Initialize the system</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Step two</ListItemLabel>
        <ListItemValue>Run diagnostics</ListItemValue>
      </ListItem>
      <ListItem>
        <ListItemLabel>Step three</ListItemLabel>
        <ListItemValue>Start operations</ListItemValue>
      </ListItem>
    </ListOrdered>
  ),
};

/**
 * Description list
 */
export const Description: Story = {
  args: {},
  parameters: {
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
    <ListDescription className="grid gap-2">
      <ListDescriptionTerm>Max pressure</ListDescriptionTerm>
      <ListDescriptionDetails>120 bar</ListDescriptionDetails>
      <ListDescriptionTerm>Temperature</ListDescriptionTerm>
      <ListDescriptionDetails>85°C</ListDescriptionDetails>
      <ListDescriptionTerm>Flow rate</ListDescriptionTerm>
      <ListDescriptionDetails>45 m³/h</ListDescriptionDetails>
    </ListDescription>
  ),
};
