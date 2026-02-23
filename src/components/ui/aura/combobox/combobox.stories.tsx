import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCheck,
  IconGrid3x3,
  IconPlus,
  IconSelector,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { type KeyboardEvent, type MouseEvent, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { cn } from '../../../../lib/utils';
import { Avatar, AvatarFallback } from '../avatar';
import { Badge } from '../badge';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../command';
import { HelperText } from '../helper-text';
import { Label } from '../label';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
const meta: Meta<typeof Popover> = {
  title: 'Primitives/Combobox',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
      },
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    modal: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      table: {
        category: 'Events',
        type: {
          summary: '(open: boolean) => void',
        },
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

const dataTypes = [
  {
    value: 'asset',
    label: 'Asset',
  },
  {
    value: 'event',
    label: 'Event',
  },
  {
    value: 'observation',
    label: 'Observation',
  },
  {
    value: 'time-series',
    label: 'Time series',
  },
  {
    value: 'work-order',
    label: 'Work order',
  },
];

const options = [
  {
    value: 'notifications',
    label: 'Email notifications',
  },
  {
    value: 'marketing',
    label: 'Marketing emails',
  },
  {
    value: 'updates',
    label: 'Product updates',
  },
  {
    value: 'security',
    label: 'Security alerts',
  },
  {
    value: 'newsletter',
    label: 'Newsletter',
  },
];
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveTextContent('Michael Jordan');
    await userEvent.click(trigger);
    const searchInput = await body.findByPlaceholderText(
      'Search users...',
      undefined,
      {
        timeout: 1000,
      }
    );
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(
      body.getByRole('option', { name: /dennis rodman/i })
    ).toBeInTheDocument();
    await expect(
      body.getByRole('option', { name: /michael jordan/i })
    ).toBeInTheDocument();
    await expect(
      body.getByRole('option', { name: /scottie pippen/i })
    ).toBeInTheDocument();
    await userEvent.type(searchInput, 'Dennis');
    await waitFor(() => {
      expect(
        body.getByRole('option', { name: /dennis rodman/i })
      ).toBeInTheDocument();
      expect(
        body.queryByRole('option', { name: /michael jordan/i })
      ).not.toBeInTheDocument();
    });
  },
  render: function BasicStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('michael-jordan');
    const selectedUser = users.find((user) => user.value === value);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className="py-1 px-1"
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label={
                    selectedUser
                      ? `Selected user: ${selectedUser.label}`
                      : 'Select user'
                  }
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    {selectedUser ? (
                      <>
                        <IconUser />
                        <span className="text-base tracking-tightest font-normal text-foreground">
                          {selectedUser.label}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Select user...
                      </span>
                    )}
                  </div>
                  <IconSelector className="h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <PopoverContent className="w-95 p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    <CommandEmpty>No user found.</CommandEmpty>
                    {users.map((user) => (
                      <CommandItem
                        key={user.value}
                        value={user.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="flex justify-between h-9 pr-0"
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
export const WithAddNew: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    const searchInput = await body.findByPlaceholderText('Search users...');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'Steve Kerr');
    await body.findByRole('button', {
      name: 'Add Steve Kerr',
    });
  },
  render: function WithAddNewStory() {
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
    };
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className="py-1 px-1"
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label={
                    selectedUser
                      ? `Selected user: ${selectedUser.label}`
                      : 'Select user'
                  }
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    {selectedUser ? (
                      <>
                        <IconUser />
                        <span className="text-base tracking-tightest font-normal text-foreground">
                          {selectedUser.label}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Select user...
                      </span>
                    )}
                  </div>
                  <IconSelector className="h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <PopoverContent
              className="w-95 p-0"
              aria-label="User selection with add new"
            >
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
                            setValue(
                              currentValue === value ? '' : currentValue
                            );
                            setOpen(false);
                          }}
                          className="flex justify-between h-9 pr-0"
                        >
                          <div className="flex items-center">
                            <Avatar
                              sizes="xxsm"
                              variant="fjord"
                              className="mr-2"
                            >
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
                  {filteredUsers.length === 0 && !canAddUser && searchValue && (
                    <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                      <CommandEmpty>No user found.</CommandEmpty>
                    </CommandGroup>
                  )}
                </CommandList>
                {canAddUser && (
                  <div className="p-2 border-t">
                    <Button
                      variant="secondary"
                      className="w-full h-9"
                      onClick={handleAddUser}
                    >
                      <IconPlus className="h-3.5 w-3.5 " />
                      Add {searchValue.trim()}
                    </Button>
                  </div>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
};
export const MultiSelect: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveTextContent('Event');
    await expect(trigger).toHaveTextContent('Observation');
    await userEvent.click(trigger);
    await body.findByPlaceholderText('Search data type...');
    await userEvent.click(await body.findByRole('option', { name: /asset/i }));
    await body.findByPlaceholderText('Search data type...');
  },
  render: function MultiSelectStory() {
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
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    };
    const handleRemove = (value: string, e: MouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedValues((prev) => prev.filter((v) => v !== value));
    };
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">Data type</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select data types"
                  className="w-full justify-between min-h-9 h-auto py-1 px-2"
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
                          aria-label={`Remove ${type.label}`}
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
              }
            />
            <PopoverContent
              className="w-95 p-0"
              aria-label="Data type selection"
            >
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
                          className="flex justify-between h-9 pr-0"
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
export const WithCheckboxes: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveTextContent('2 selected');
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(body.getAllByRole('option').length).toBeGreaterThanOrEqual(5);
    });
    const checkboxes = body.getAllByRole('checkbox');
    await expect(checkboxes[0]).toBeChecked();
    await expect(checkboxes[1]).toBeChecked();
    await expect(checkboxes[2]).not.toBeChecked();
    await userEvent.click(
      await body.findByRole('option', { name: /product updates/i })
    );
    await waitFor(() => {
      expect(trigger).toHaveTextContent('3 selected');
    });
  },
  render: function WithCheckboxesStory() {
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
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    };
    const selectedLabels = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">Preferences</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select preferences"
                  className="w-full justify-between min-h-9 h-auto py-1 px-2"
                >
                  <span className="text-sm text-muted-foreground">
                    {selectedLabels.length > 0
                      ? `${selectedLabels.length} selected`
                      : 'Select preferences...'}
                  </span>
                  <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                </Button>
              }
            />
            <PopoverContent
              className="w-95 p-0"
              aria-label="Preferences selection"
            >
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
                          className="flex items-center gap-2 h-9"
                        >
                          <Checkbox
                            checked={isSelected}
                            className="data-[checked]:bg-foreground data-[checked]:border-foreground data-[checked]:text-background dark:data-[checked]:bg-foreground dark:data-[checked]:text-background"
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
export const KeyboardNavigation: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
    await body.findByPlaceholderText('Search users...');
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => {
      const selectedItem = body.getAllByRole('option').find((option) => {
        return option.getAttribute('aria-selected') === 'true';
      });
      expect(selectedItem).toBeDefined();
    });
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(
        body.queryByPlaceholderText('Search users...')
      ).not.toBeInTheDocument();
    });
  },
  render: function KeyboardNavigationStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const simpleUsers = users.slice(0, 3);
    const selectedUser = simpleUsers.find((user) => user.value === value);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label={
                    selectedUser
                      ? `Selected user: ${selectedUser.label}`
                      : 'Select user'
                  }
                  className="w-full justify-between"
                >
                  <span>
                    {selectedUser ? selectedUser.label : 'Select user...'}
                  </span>
                  <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                </Button>
              }
            />
            <PopoverContent className="w-95 p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    <CommandEmpty>No user found.</CommandEmpty>
                    {simpleUsers.map((user) => (
                      <CommandItem
                        key={user.value}
                        value={user.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2 h-9"
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
export const EmptyState: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    await body.findByText('No users available');
  },
  render: function EmptyStateStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select user"
                  className="w-full justify-between"
                >
                  <span className="text-sm text-muted-foreground">
                    Select user...
                  </span>
                  <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                </Button>
              }
            />
            <PopoverContent className="w-95 p-0" aria-label="User selection">
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
export const Disabled: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    const styles = window.getComputedStyle(trigger);
    expect(styles.pointerEvents).toBe('none');
    expect(
      body.queryByPlaceholderText('Search users...')
    ).not.toBeInTheDocument();
  },
  render: function DisabledStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select user"
                  className="w-full justify-between"
                  disabled
                >
                  <span className="text-sm text-muted-foreground">
                    Select user...
                  </span>
                  <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
                </Button>
              }
            />
            <PopoverContent className="w-95 p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    <CommandEmpty>No user found.</CommandEmpty>
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
export const WithError: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');
    const helperText = canvas.getByText('Please select a user');
    await expect(helperText).toBeInTheDocument();
  },
  render: function WithErrorStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const selectedUser = users.find((user) => user.value === value);
    return (
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label className="m-0 p-0">User</Label>
        <Popover
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
          }}
        >
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-invalid={true}
                aria-label={
                  selectedUser
                    ? `Selected user: ${selectedUser.label}`
                    : 'Select user'
                }
                className="w-full justify-between aria-invalid:border-destructive-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
              >
                <span>
                  {selectedUser ? selectedUser.label : 'Select user...'}
                </span>
                <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
              </Button>
            }
          />
          <PopoverContent className="w-95 p-0" aria-label="User selection">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandList>
                <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                  <CommandEmpty>No user found.</CommandEmpty>
                  {users.slice(0, 3).map((user) => (
                    <CommandItem
                      key={user.value}
                      value={user.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 h-9"
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
export const ComplexInteractive: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(body.getAllByRole('option').length).toBeGreaterThanOrEqual(10);
    });
    await userEvent.click(body.getByRole('option', { name: 'Menu item 1' }));
    await waitFor(() => {
      expect(trigger).toHaveTextContent('Menu item 1');
    });
  },
  render: function ComplexInteractiveStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const menuItems = Array.from(
      {
        length: 5,
      },
      (_, i) => ({
        value: `menu-item-${i + 1}`,
        label: `Menu item ${i + 1}`,
      })
    );
    const secondMenuItems = Array.from(
      {
        length: 5,
      },
      (_, i) => ({
        value: `menu-item-${i + 6}`,
        label: `Menu item ${i + 6}`,
      })
    );
    const allItems = [...menuItems, ...secondMenuItems];
    const selectedItem = allItems.find((item) => item.value === value);
    return (
      <div className="flex flex-col gap-3 w-75">
        <Label className="m-0 p-0">View</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label={
                  selectedItem
                    ? `Selected view: ${selectedItem.label}`
                    : 'Select view'
                }
                className="w-full justify-between"
              >
                <span>
                  {selectedItem ? selectedItem.label : 'Select view...'}
                </span>
                <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
              </Button>
            }
          />
          <PopoverContent className="w-75 p-0" aria-label="View selection">
            <Command>
              <CommandInput placeholder="Search views..." />
              <CommandList>
                <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                  <CommandEmpty>No view found.</CommandEmpty>
                </CommandGroup>
                <CommandGroup
                  heading="Section label"
                  className="px-1 pt-0 pb-1 mt-1"
                >
                  {menuItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
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
                <CommandGroup
                  heading="Section label"
                  className="px-1 pt-0 pb-1 mt-1"
                >
                  {secondMenuItems.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
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
export const Playground: Story = {
  parameters: {
    order: 99,
  },
  render: function PlaygroundStory() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('michael-jordan');
    const selectedUser = users.find((user) => user.value === value);
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 w-95">
          <Label className="m-0 p-0">User</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  aria-label={
                    selectedUser
                      ? `Selected user: ${selectedUser.label}`
                      : 'Select user'
                  }
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    {selectedUser ? (
                      <>
                        <IconUser />
                        <span className="text-base tracking-tightest font-normal text-foreground">
                          {selectedUser.label}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Select user...
                      </span>
                    )}
                  </div>
                  <IconSelector className="h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <PopoverContent className="w-95 p-0" aria-label="User selection">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandList>
                  <CommandGroup className="px-1 pt-0 pb-1 mt-1">
                    <CommandEmpty>No user found.</CommandEmpty>
                    {users.map((user) => (
                      <CommandItem
                        key={user.value}
                        value={user.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? '' : currentValue);
                          setOpen(false);
                        }}
                        className="flex justify-between h-9 pr-0"
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
          Experiment with the combobox using the controls above.
        </p>
      </div>
    );
  },
};
