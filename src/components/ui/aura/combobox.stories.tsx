'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import {
  IconCheck,
  IconGrid3x3,
  IconPlus,
  IconSelector,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { Label } from './label';
import { Avatar, AvatarFallback } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { HelperText } from './helper-text';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover';
import { cn } from '@/lib/utils';

const meta: Meta<typeof Popover> = {
  title: 'UI/Combobox',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    // State
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Whether the combobox is modal',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    // Events
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when open state changes',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['openChanged'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

const users = [
  {
    value: 'dennis-rodman',
    label: 'Dennis Rodman',
    initials: 'DR',
    position: 'Power forward',
  },
  {
    value: 'luc-longley',
    label: 'Luc Longley',
    initials: 'LL',
    position: 'Center',
  },
  {
    value: 'michael-jordan',
    label: 'Michael Jordan',
    initials: 'MJ',
    position: 'Shooting guard',
  },
  {
    value: 'ron-harper',
    label: 'Ron Harper',
    initials: 'RH',
    position: 'Point guard',
  },
  {
    value: 'scottie-pippen',
    label: 'Scottie Pippen',
    initials: 'SP',
    position: 'Small forward',
  },
];

/**
 * Basic combobox with user selection
 * Tests opening, searching, selecting, and accessibility
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic searchable combobox with avatar, badge, and selection state. Tests opening, searching, and keyboard navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and verify trigger button
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Verify initial selected value is displayed
    await expect(trigger).toHaveTextContent('Michael Jordan');

    // Click to open combobox
    await userEvent.click(trigger);

    // Wait for popover to open
    await waitFor(
      () => {
        const input = canvasElement.ownerDocument.querySelector(
          '[data-slot="command-input"]'
        );
        expect(input).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify trigger aria-expanded changed
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Verify users are listed
    const commandList = canvasElement.ownerDocument.querySelector(
      '[data-slot="command-list"]'
    );
    await expect(commandList).toHaveTextContent('Dennis Rodman');
    await expect(commandList).toHaveTextContent('Michael Jordan');
    await expect(commandList).toHaveTextContent('Scottie Pippen');

    // Verify search input exists
    const searchInput = canvasElement.ownerDocument.querySelector(
      '[data-slot="command-input"]'
    ) as HTMLInputElement;
    await expect(searchInput).toBeInTheDocument();

    // Test search functionality
    await userEvent.type(searchInput, 'Dennis');
    await waitFor(() => {
      expect(commandList).toHaveTextContent('Dennis Rodman');
      expect(commandList).not.toHaveTextContent('Michael Jordan');
    });
  },
  render: function BasicStory(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('michael-jordan');

    const selectedUser = users.find((user) => user.value === value);

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">User</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild className="py-1 px-1">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  {selectedUser && (
                    <>
                      <IconUser />
                      <span className="text-base tracking-tightest font-normal text-foreground">
                        {selectedUser.label}
                      </span>
                    </>
                  )}
                </div>
                <IconSelector className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    {users.map((user) => (
                      <CommandItem
                        key={user.value}
                        value={user.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="flex justify-between h-[36px] pr-0"
                      >
                        <div className="flex items-center">
                          <Avatar sizes="xxsm" variant="fjord" className="mr-2">
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          <span className="flex-1 text-base tracking-tightest font-normal text-foreground pr-1.5">
                            {user.label}
                          </span>
                          <Badge variant="secondary" size="default">
                            {user.position}
                          </Badge>
                        </div>
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === user.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-sm text-muted-foreground">
          A searchable select component built with Popover and Command.
        </p>
      </div>
    );
  },
};

/**
 * Combobox with ability to add new items
 * Tests dynamic item creation and state management
 */
export const WithAddNew: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Combobox that allows adding new items that don\'t exist in the list. Tests search, filtering, and dynamic item creation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);

    await waitFor(() => {
      const input = canvasElement.ownerDocument.querySelector(
        '[data-slot="command-input"]'
      ) as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    // Type a search that doesn't match
    const searchInput = canvasElement.ownerDocument.querySelector(
      '[data-slot="command-input"]'
    ) as HTMLInputElement;
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Steve Kerr');

    // Wait for "Add" button to appear by checking button text content
    await waitFor(() => {
      const buttons = canvasElement.ownerDocument.querySelectorAll('button');
      let found = false;
      buttons.forEach((btn) => {
        if (btn.textContent?.includes('Add Steve Kerr')) {
          found = true;
        }
      });
      expect(found).toBe(true);
    });
  },
  render: function WithAddNewStory(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('michael-jordan');
    const [userList, setUserList] = useState(users);
    const [searchValue, setSearchValue] = useState('');

    const selectedUser = userList.find((user) => user.value === value);

    const filteredUsers = userList.filter((user) =>
      user.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    const canAddUser =
      searchValue.trim() &&
      !userList.some(
        (user) => user.label.toLowerCase() === searchValue.toLowerCase().trim()
      );

    const handleAddUser = () => {
      if (!canAddUser) return;

      const newUser = {
        value: searchValue.toLowerCase().replace(/\s+/g, '-'),
        label: searchValue.trim(),
        initials: searchValue
          .trim()
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        position: 'Player',
      };

      setUserList([...userList, newUser]);
      setValue(newUser.value);
      setSearchValue('');
      // Keep combobox open to show the newly added item
    };

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">User</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild className="py-1 px-1">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  {selectedUser && (
                    <>
                      <IconUser />
                      <span className="text-base tracking-tightest font-normal text-foreground">
                        {selectedUser.label}
                      </span>
                    </>
                  )}
                </div>
                <IconSelector className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="User selection with add new">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search users..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                  className="h-10"
                />
                <CommandList>
                  {filteredUsers.length > 0 && (
                    <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                      {filteredUsers.map((user) => (
                        <CommandItem
                          key={user.value}
                          value={user.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue);
                            setOpen(false);
                          }}
                          className="flex justify-between h-[36px] pr-0"
                        >
                          <div className="flex items-center">
                            <Avatar sizes="xxsm" variant="fjord" className="mr-2">
                              <AvatarFallback>{user.initials}</AvatarFallback>
                            </Avatar>
                            <span className="flex-1 text-base tracking-tightest font-normal text-foreground pr-1.5">
                              {user.label}
                            </span>
                            <Badge variant="secondary" size="default">
                              {user.position}
                            </Badge>
                          </div>
                          <IconCheck
                            className={cn(
                              'mr-2 h-4 w-4',
                              value === user.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                  {canAddUser && (
                    <div className="p-2 border-t">
                      <Button
                        variant="secondary"
                        className="w-full h-[36px]"
                        onClick={handleAddUser}
                      >
                        <IconPlus className="h-3.5 w-3.5 " />
                        Add {searchValue.trim()}
                      </Button>
                    </div>
                  )}
                  {filteredUsers.length === 0 && !canAddUser && searchValue && (
                    <CommandEmpty>No user found.</CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

const dataTypes = [
  { value: 'asset', label: 'Asset' },
  { value: 'event', label: 'Event' },
  { value: 'observation', label: 'Observation' },
  { value: 'time-series', label: 'Time series' },
  { value: 'work-order', label: 'Work order' },
];

/**
 * Multi-select combobox with badges
 * Tests multiple selection, badge display, and removal
 */
export const MultiSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select combobox with badge display for selected items. Tests multiple selection, badge removal, and state management.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');

    // Verify initial selected values shown
    await expect(trigger).toHaveTextContent('Event');
    await expect(trigger).toHaveTextContent('Observation');

    // Click to open
    await userEvent.click(trigger);

    await waitFor(() => {
      const input = canvasElement.ownerDocument.querySelector(
        '[data-slot="command-input"]'
      );
      expect(input).toBeInTheDocument();
    });

    // Find and click an unchecked item to select it
    const commandItems = canvasElement.ownerDocument.querySelectorAll(
      '[data-slot="command-item"]'
    );

    // Click first item (should toggle selection)
    if (commandItems[0]) {
      await userEvent.click(commandItems[0] as Element);
    }

    // Verify selection state updated (combobox should still be open for multi-select)
    await waitFor(() => {
      const input = canvasElement.ownerDocument.querySelector(
        '[data-slot="command-input"]'
      );
      expect(input).toBeInTheDocument();
    });
  },
  render: function MultiSelectStory(args) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([
      'event',
      'observation',
    ]);
    const [searchValue, setSearchValue] = useState('');

    const filteredDataTypes = dataTypes.filter((type) =>
      type.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    const selectedDataTypes = dataTypes.filter((type) =>
      selectedValues.includes(type.value)
    );

    const visibleSelected = selectedDataTypes.slice(0, 2);
    const remainingCount = selectedDataTypes.length - 2;

    const handleToggle = (value: string) => {
      setSelectedValues((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };

    const handleRemove = (
      value: string,
      e: React.MouseEvent | React.KeyboardEvent
    ) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedValues((prev) => prev.filter((v) => v !== value));
    };

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">Data type</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between min-h-[36px] h-auto py-1 px-2"
              >
                <div className="flex items-center gap-1.5 flex-wrap flex-1">
                  {visibleSelected.map((type) => (
                    <Badge
                      key={type.value}
                      variant="secondary"
                      className="flex items-center gap-1 pr-0.5"
                    >
                      <span className="text-sm">{type.label}</span>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleRemove(type.value, e)}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleRemove(type.value, e);
                          }
                        }}
                        className="ml-0.5 rounded-sm hover:bg-secondary-hover p-0.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-ring"
                      >
                        <IconX className="h-3 w-3" />
                      </span>
                    </Badge>
                  ))}
                  {remainingCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      + {remainingCount} more
                    </span>
                  )}
                  {selectedDataTypes.length === 0 && (
                    <span className="text-sm text-muted-foreground">
                      Select data types...
                    </span>
                  )}
                </div>
                <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="Data type selection">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search data type..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                  className="h-10"
                />
                <CommandList>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    {filteredDataTypes.map((type) => {
                      const isSelected = selectedValues.includes(type.value);
                      return (
                        <CommandItem
                          key={type.value}
                          value={type.value}
                          onSelect={() => handleToggle(type.value)}
                          className="flex justify-between h-[36px] pr-0"
                        >
                          <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                            {type.label}
                          </span>
                          <IconCheck
                            className={cn(
                              'mr-2 h-4 w-4',
                              isSelected ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

const options = [
  { value: 'notifications', label: 'Email notifications' },
  { value: 'marketing', label: 'Marketing emails' },
  { value: 'updates', label: 'Product updates' },
  { value: 'security', label: 'Security alerts' },
  { value: 'newsletter', label: 'Newsletter' },
];

/**
 * Combobox with visible checkboxes
 * Tests checkbox interaction and multi-select with visual indicators
 */
export const WithCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Multi-select combobox with visible checkboxes. Tests checkbox state, interaction, and accessibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveTextContent('2 selected');

    await userEvent.click(trigger);

    await waitFor(() => {
      const checkboxes = canvasElement.ownerDocument.querySelectorAll(
        '[data-slot="checkbox"]'
      );
      expect(checkboxes.length).toBeGreaterThanOrEqual(5);
    });

    // Verify checked states
    const checkboxes = canvasElement.ownerDocument.querySelectorAll(
      '[data-slot="checkbox"]'
    );

    // First two should be checked (notifications, marketing)
    expect(checkboxes[0]).toHaveAttribute('data-state', 'checked');
    expect(checkboxes[1]).toHaveAttribute('data-state', 'checked');
    expect(checkboxes[2]).toHaveAttribute('data-state', 'unchecked');
  },
  render: function WithCheckboxesStory(args) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([
      'notifications',
      'marketing',
    ]);
    const [searchValue, setSearchValue] = useState('');

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    );

    const handleToggle = (value: string) => {
      setSelectedValues((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };

    const selectedLabels = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">Preferences</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between min-h-[36px] h-auto py-1 px-2"
              >
                <span className="text-sm text-muted-foreground">
                  {selectedLabels.length > 0
                    ? `${selectedLabels.length} selected`
                    : 'Select preferences...'}
                </span>
                <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="Preferences selection">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search preferences..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                  className="h-10"
                />
                <CommandList>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    {filteredOptions.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => handleToggle(option.value)}
                          className="flex items-center gap-2 h-[36px]"
                        >
                          <Checkbox
                            checked={isSelected}
                            className="data-[state=checked]:bg-foreground data-[state=checked]:border-foreground data-[state=checked]:text-background dark:data-[state=checked]:bg-foreground dark:data-[state=checked]:text-background"
                          />
                          <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                            {option.label}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

/**
 * Keyboard navigation test
 * Tests keyboard accessibility patterns
 */
export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tests keyboard navigation: Arrow keys to navigate items, Enter to select, Escape to close, Tab to move focus.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    trigger.focus();
    await expect(trigger).toHaveFocus();

    // Press Enter to open
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      const input = canvasElement.ownerDocument.querySelector(
        '[data-slot="command-input"]'
      ) as HTMLInputElement;
      expect(input).toBeInTheDocument();
    });

    // Press ArrowDown to navigate items
    await userEvent.keyboard('{ArrowDown}');

    await waitFor(() => {
      const selectedItem = canvasElement.ownerDocument.querySelector(
        '[data-selected="true"]'
      );
      expect(selectedItem).toBeInTheDocument();
    });

    // Press Escape to close
    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      const input = canvasElement.ownerDocument.querySelector(
        '[data-slot="command-input"]'
      );
      expect(input).not.toBeInTheDocument();
    });
  },
  render: function KeyboardNavigationStory(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const simpleUsers = users.slice(0, 3);
    const selectedUser = simpleUsers.find((user) => user.value === value);

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">User</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              <span>{selectedUser ? selectedUser.label : 'Select user...'}</span>
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    {simpleUsers.map((user) => (
                      <CommandItem
                        key={user.value}
                        value={user.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2 h-[36px]"
                      >
                        <IconUser className="h-4 w-4" />
                        <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                          {user.label}
                        </span>
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === user.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

/**
 * Edge case: Empty combobox
 */
export const EmptyState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: Combobox with no available options.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);

    await waitFor(() => {
      const empty = canvasElement.ownerDocument.querySelector(
        '[data-slot="command-empty"]'
      );
      expect(empty).toBeInTheDocument();
      expect(empty).toHaveTextContent('No users available');
    });
  },
  render: function EmptyStateStory(args) {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">User</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                <span className="text-sm text-muted-foreground">
                  Select user...
                </span>
                <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandEmpty>No users available</CommandEmpty>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

/**
 * Edge case: Disabled combobox
 */
export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: Combobox with disabled trigger button.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Verify styles indicate disabled state
    const styles = window.getComputedStyle(trigger);
    expect(styles.pointerEvents).toBe('none');

    // Verify popover is not open
    const input = canvasElement.ownerDocument.querySelector(
      '[data-slot="command-input"]'
    );
    expect(input).not.toBeInTheDocument();
  },
  render: function DisabledStory(args) {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-3">
        <div className="space-y-2 w-[380px]">
          <Label className="m-0 p-0">User</Label>
          <Popover
            {...args}
            open={open}
            onOpenChange={(newOpen) => {
              setOpen(newOpen);
              args.onOpenChange?.(newOpen);
            }}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
                disabled
              >
                <span className="text-sm text-muted-foreground">
                  Select user...
                </span>
                <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};

/**
 * With validation error
 */
export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combobox in error state with validation message.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');

    const helperText = canvas.getByText('Please select a user');
    await expect(helperText).toBeInTheDocument();
  },
  render: function WithErrorStory(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const selectedUser = users.find((user) => user.value === value);

    return (
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label className="m-0 p-0">User</Label>
        <Popover
          {...args}
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
            args.onOpenChange?.(newOpen);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-invalid={true}
              className="w-full justify-between aria-invalid:border-destructive-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
            >
              <span>{selectedUser ? selectedUser.label : 'Select user...'}</span>
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[380px] p-0" aria-label="User selection">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                  {users.slice(0, 3).map((user) => (
                    <CommandItem
                      key={user.value}
                      value={user.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 h-[36px]"
                    >
                      <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                        {user.label}
                      </span>
                      <IconCheck
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === user.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <HelperText isError>Please select a user</HelperText>
      </div>
    );
  },
};

/**
 * Complex interactive example with sections
 */
export const ComplexInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complex example with multiple sections, separators, and icons. Shows full combobox capabilities.',
      },
    },
  },
  render: function ComplexInteractiveStory(args) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const menuItems = Array.from({ length: 5 }, (_, i) => ({
      value: `menu-item-${i + 1}`,
      label: `Menu item ${i + 1}`,
    }));

    const secondMenuItems = Array.from({ length: 5 }, (_, i) => ({
      value: `menu-item-${i + 6}`,
      label: `Menu item ${i + 6}`,
    }));

    const allItems = [...menuItems, ...secondMenuItems];
    const selectedItem = allItems.find((item) => item.label === value);

    return (
      <div className="space-y-3 w-[300px]">
        <Label className="m-0 p-0">View</Label>
        <Popover
          {...args}
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
            args.onOpenChange?.(newOpen);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              <span>{selectedItem ? selectedItem.label : 'Select view...'}</span>
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" aria-label="View selection">
            <Command>
              <CommandInput placeholder="Search views..." />
              <CommandList>
                <CommandEmpty>No view found.</CommandEmpty>
                <CommandGroup heading="Section label" className="px-1 pt-0 pb-1 mt-1">
                  {menuItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Section label" className="px-1 pt-0 pb-1 mt-1">
                  {secondMenuItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.label}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <IconGrid3x3 className="h-4 w-4" />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
