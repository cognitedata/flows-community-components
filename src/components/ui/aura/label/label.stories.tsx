"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, expect } from "@storybook/test";
import { useState, type ChangeEvent } from "react";

import { Label } from "./label";
import { Input } from "../input/input";

const meta: Meta<typeof Label> = {
  title: "Form/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    // Display
    children: {
      control: "text",
      description: "Label text content.",
      table: {
        category: "Display",
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS class names for custom styling.",
      table: {
        category: "Display",
      },
    },

    // Accessibility
    htmlFor: {
      control: "text",
      description:
        "ID of the form control this label is associated with. When provided, clicking the label will focus the control.",
      table: {
        category: "Accessibility",
        type: { summary: "string" },
      },
    },

    // Events
    onClick: {
      action: "clicked",
      description: "Click handler for the label element.",
      table: {
        category: "Events",
        type: { summary: "(event: MouseEvent) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Basic label usage with simple text.
 */
export const Basic: Story = {
  args: {
    children: "Name",
  },
  parameters: {
    docs: {
      description: {
        story: "A basic label with simple text content.",
      },
    },
  },
  render: (args) => <Label {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("Name");
    await expect(label).toBeInTheDocument();
  },
};

/**
 * Label styled to indicate a disabled field, typically used alongside a disabled input.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled label',
    htmlFor: 'disabled-input',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A label presented in a disabled style. Combine with a disabled input to reflect non-interactive state.',
      },
    },
  },
  render: (args) => (
    <div className="group space-y-2 max-w-sm" data-disabled="true">
      <Label {...args} />
      <Input id="disabled-input" disabled placeholder="Disabled input" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("Disabled label");
    const input = canvas.getByPlaceholderText("Disabled input");

    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
  },
};

/**
 * Label indicating a required field using an asterisk.
 */
export const WithAsterisk: Story = {
  args: {
    children: (
      <>
        Email address{" "}
        <img
          src="/asterisk.svg"
          alt="required"
          className="inline-block ml-0.5 relative -top-1"
        />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A label that visually indicates a required field using an asterisk icon. Useful for required form fields.",
      },
    },
  },
  render: (args) => <Label {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText(/Email address/);
    const asterisk = canvas.getByAltText("required");

    await expect(label).toBeInTheDocument();
    await expect(asterisk).toBeInTheDocument();
  },
};

/**
 * Fully wired label with an input, demonstrating focus behavior when clicking the label.
 */
export const WithInput: Story = {
  args: {
    children: "Project name",
    htmlFor: "project-name",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label associated with an input via `htmlFor` and `id`. Clicking the label focuses the corresponding input.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };

    return (
      <div className="max-w-sm">
        <Label {...args} />
        <Input
          id="project-name"
          value={value}
          onChange={handleChange}
          placeholder="Enter project name"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const label = canvas.getByText("Project name");
    const input = canvas.getByPlaceholderText("Enter project name");

    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();

    // Click label and ensure input receives focus
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};
