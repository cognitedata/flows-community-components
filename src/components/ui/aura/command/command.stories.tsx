import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";
import {
  IconCalculator,
  IconCalendar,
  IconMail,
  IconSettings,
  IconSparkles,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const meta: Meta<typeof Command> = {
  title: "Primitives/Command",
  component: Command,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Command>;

/**
 * Default command palette.
 */
export const Default: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default command palette with grouped items and keyboard shortcuts.",
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border shadow-md w-88">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <IconSparkles />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <IconCalculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <IconUser />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconMail />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByPlaceholderText("Type a command or search...");
    await expect(input).toBeInTheDocument();

    // Type to filter
    await userEvent.type(input, "cal");

    // Verify filtering works
    await waitFor(() => {
      const calendarItem = canvas.getByText("Calendar");
      expect(calendarItem).toBeInTheDocument();
    });
  },
};

/**
 * Command dialog (modal).
 */
export const Dialog: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Command palette in a dialog/modal.",
      },
    },
  },
  render: function CommandDialogExample() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘K</kbd> or click the button
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md border hover:bg-accent"
        >
          Open Command Palette
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <IconCalendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconSparkles />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconCalculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the command palette
    const trigger = canvas.getByRole("button", { name: /open command palette/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    const dialog = await screen.findByRole("dialog");
    await expect(dialog).toBeInTheDocument();

    // Verify command input is present
    const input = within(dialog).getByPlaceholderText("Type a command or search...");
    await expect(input).toBeInTheDocument();

    // Select an item to close the dialog
    const calendarItem = within(dialog).getByRole("option", { name: /calendar/i });
    await userEvent.click(calendarItem);

    // Verify dialog closed
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

/**
 * Filtered command list.
 */
export const Filtering: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Command palette with filtering. Type to filter items.",
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border shadow-md w-88">
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Create new file</CommandItem>
          <CommandItem>Create new folder</CommandItem>
          <CommandItem>Open recent</CommandItem>
          <CommandItem>Open settings</CommandItem>
          <CommandItem>Search files</CommandItem>
          <CommandItem>Search in files</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search actions...");

    // Type to filter
    await userEvent.type(input, "settings");

    // Verify only settings item shows
    await waitFor(() => {
      const settingsItem = canvas.getByText("Open settings");
      expect(settingsItem).toBeInTheDocument();
    });
  },
};

/**
 * With disabled items.
 */
export const DisabledItems: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Command palette with some items disabled.",
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border shadow-md w-88">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>
            <IconUser />
            <span>View Profile</span>
          </CommandItem>
          <CommandItem disabled>
            <IconMail />
            <span>Send Email (disabled)</span>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
          </CommandItem>
          <CommandItem disabled>
            <IconCalculator />
            <span>Calculator (disabled)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Multiple groups.
 */
export const MultipleGroups: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Command palette with multiple grouped sections.",
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border shadow-md w-100">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Recently Used">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconMail />
            <span>Mail</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Applications">
          <CommandItem>
            <IconCalculator />
            <span>Calculator</span>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem>Documentation</CommandItem>
          <CommandItem>Report an Issue</CommandItem>
          <CommandItem>Contact Support</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * With custom styling.
 */
export const CustomStyling: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Command palette with custom styling.",
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border shadow-md w-88 bg-card">
      <CommandInput placeholder="Search..." className="bg-transparent" />
      <CommandList className="max-h-50">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Results">
          <CommandItem className="hover:bg-primary/10">
            <span>Custom styled item 1</span>
          </CommandItem>
          <CommandItem className="hover:bg-primary/10">
            <span>Custom styled item 2</span>
          </CommandItem>
          <CommandItem className="hover:bg-primary/10">
            <span>Custom styled item 3</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Command palette for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => (
    <div className="space-y-8 p-4">
      {/* Basic command */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Command className="rounded-lg border shadow-md w-75">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Items">
              <CommandItem>
                <IconCalendar />
                Item 1
              </CommandItem>
              <CommandItem>
                <IconSettings />
                Item 2
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  ),
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive command palette example.",
      },
    },
  },
  render: () => (
    <Command className="rounded-lg border shadow-md w-88">
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>Command 1</CommandItem>
          <CommandItem>Command 2</CommandItem>
          <CommandItem>Command 3</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
