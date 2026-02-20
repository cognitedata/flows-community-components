import { Button } from "@/components/ui/aura/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import {
  IconCalculator,
  IconCalendar,
  IconLoader2,
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
      table: {
        category: "Advanced",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Command>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  render: () => (
    <Command className="w-88 rounded-lg border shadow-md">
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
    const input = canvas.getByPlaceholderText("Type a command or search...");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "cal");
    await waitFor(() => {
      expect(canvas.getByText("Calendar")).toBeInTheDocument();
    });
  },
};
export const Dialog: Story = {
  parameters: {
    order: 2,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Press <kbd className="rounded bg-muted px-2 py-1 text-xs">⌘K</kbd> or use the button.
        </p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open Command Palette
        </Button>
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
    const trigger = canvas.getByRole("button", {
      name: /open command palette/i,
    });
    await userEvent.click(trigger);
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="command-dialog"]');
      expect(dialog).toBeInTheDocument();
    });
    const dialog = document.querySelector('[data-slot="command-dialog"]');
    const input = within(dialog as HTMLElement).getByPlaceholderText("Type a command or search...");
    await expect(input).toBeInTheDocument();
    const calendarItem = within(dialog as HTMLElement).getByRole("option", {
      name: /calendar/i,
    });
    await userEvent.click(calendarItem);
    await waitFor(() => {
      expect(canvas.queryByTestId("command-dialog-content")).not.toBeInTheDocument();
    });
  },
};
export const Filtering: Story = {
  parameters: {
    order: 3,
  },
  render: () => (
    <Command className="w-88 rounded-lg border shadow-md">
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
    await userEvent.type(input, "settings");
    await waitFor(() => {
      expect(canvas.getByText("Open settings")).toBeInTheDocument();
    });
  },
};
export const DisabledItems: Story = {
  parameters: {
    order: 4,
  },
  render: () => (
    <Command className="w-88 rounded-lg border shadow-md">
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("View Profile")).toBeInTheDocument();
    await expect(canvas.getByText("Settings")).toBeInTheDocument();
    await expect(canvas.getByText("Send Email (disabled)")).toBeInTheDocument();
    await expect(canvas.getByText("Calculator (disabled)")).toBeInTheDocument();
  },
};
export const MultipleGroups: Story = {
  parameters: {
    order: 5,
  },
  render: () => (
    <Command className="w-100 rounded-lg border shadow-md">
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Recently Used")).toBeInTheDocument();
    await expect(canvas.getByText("Applications")).toBeInTheDocument();
    await expect(canvas.getByText("Help")).toBeInTheDocument();
  },
};
export const CustomStyling: Story = {
  parameters: {
    order: 6,
  },
  render: () => (
    <Command className="w-88 rounded-lg border bg-card shadow-md">
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Custom styled item 1")).toBeInTheDocument();
    await expect(canvas.getByText("Custom styled item 2")).toBeInTheDocument();
    await expect(canvas.getByText("Custom styled item 3")).toBeInTheDocument();
  },
};
export const KeyboardNavigation: Story = {
  parameters: {
    order: 7,
  },
  render: () => (
    <Command className="w-88 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconMail />
            <span>Mail</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type a command...");
    await userEvent.click(input);
    await expect(input).toHaveFocus();
    await userEvent.type(input, "cal");
    await waitFor(() => {
      expect(canvas.getByText("Calendar")).toBeInTheDocument();
    });
    await userEvent.clear(input);
    await waitFor(() => {
      expect(canvas.getByText("Settings")).toBeInTheDocument();
      expect(canvas.getByText("Mail")).toBeInTheDocument();
    });
    await expect(canvas.getByText("⌘C")).toBeInTheDocument();
    await expect(canvas.getByText("⌘S")).toBeInTheDocument();
    await expect(canvas.getByText("⌘M")).toBeInTheDocument();
  },
};
export const NoResultsFound: Story = {
  parameters: {
    order: 8,
  },
  render: () => (
    <Command className="w-88 rounded-lg border shadow-md">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
          </CommandItem>
          <CommandItem>
            <IconMail />
            <span>Mail</span>
          </CommandItem>
          <CommandItem>
            <IconCalculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search commands...");
    await userEvent.type(input, "xyz123nonexistent");
    await waitFor(() => {
      expect(canvas.getByText("No results found.")).toBeInTheDocument();
    });
    await userEvent.clear(input);
    await waitFor(() => {
      expect(canvas.getByText("Calendar")).toBeInTheDocument();
    });
  },
};
export const LongList: Story = {
  parameters: {
    order: 9,
  },
  render: () => {
    const items = Array.from(
      {
        length: 30,
      },
      (_, i) => `Item ${i + 1}`
    );
    return (
      <Command className="w-88 rounded-lg border shadow-md">
        <CommandInput placeholder="Search items..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="All Items">
            {items.map((item) => (
              <CommandItem key={item}>
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search items...");
    await expect(canvas.getByText("Item 1")).toBeInTheDocument();
    await userEvent.type(input, "item 20");
    await waitFor(() => {
      expect(canvas.getByText("Item 20")).toBeInTheDocument();
    });
  },
};
export const AsyncSearch: Story = {
  parameters: {
    order: 10,
  },
  render: () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const handleSearch = async (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockResults = ["John Doe", "Jane Smith", "Johnny Appleseed", "John Johnson"].filter(
        (name) => name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(mockResults);
      setIsLoading(false);
    };
    return (
      <Command className="w-88 rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search users..."
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          {isLoading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <IconLoader2 className="mx-auto mb-2 size-5 animate-spin" />
              Searching...
            </div>
          ) : (
            <>
              <CommandEmpty>No users found.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Users">
                  {results.map((user) => (
                    <CommandItem key={user}>
                      <IconUser />
                      <span>{user}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </Command>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search users...");
    await userEvent.type(input, "jane");
    await waitFor(
      () => {
        expect(canvas.queryByText("Searching...") || canvas.queryByText("Jane Smith")).toBeTruthy();
      },
      {
        timeout: 3000,
      }
    );
  },
};
export const VisualRegression: Story = {
  parameters: {
    order: 11,
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Command className="w-75 rounded-lg border shadow-md">
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
export const Playground: Story = {
  parameters: {
    order: 99,
  },
  args: {
    className: "w-88 rounded-lg border shadow-md",
  },
  render: (args) => (
    <Command {...args}>
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
