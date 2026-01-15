'use client';

import { useState } from 'react';
import {
  IconCheck,
  IconGrid3x3,
  IconPlus,
  IconSelector,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Avatar, AvatarFallback } from '@/components/ui/aura/avatar';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import { Checkbox } from '@/components/ui/aura/checkbox';
import { HelperText } from '@/components/ui/aura/helper-text';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';
import type { ComponentExamples } from './types';

const users = [
  {
    value: 'dennis-rodman',
    label: 'Dennis Rodman',
    initials: 'PJ',
    position: 'Power forward',
  },
  {
    value: 'luc-longley',
    label: 'Luc Longley',
    initials: 'PJ',
    position: 'Center',
  },
  {
    value: 'michael-jordan',
    label: 'Michael Jordan',
    initials: 'PJ',
    position: 'Shooting guard',
  },
  {
    value: 'ron-harper',
    label: 'Ron Harper',
    initials: 'PJ',
    position: 'Point guard',
  },
  {
    value: 'scottie-pippen',
    label: 'Scottie Pippen',
    initials: 'PJ',
    position: 'Small forward',
  },
];

function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('michael-jordan');

  const selectedUser = users.find((user) => user.value === value);

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[380px]">
        <Label className="m-0 p-0">User</Label>
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup className="px-1 py-0 mt-1">
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
}

const initialUsers = [
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

function AddUsersDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('michael-jordan');
  const [users, setUsers] = useState(initialUsers);
  const [searchValue, setSearchValue] = useState('');

  const selectedUser = users.find((user) => user.value === value);

  const filteredUsers = users.filter((user) =>
    user.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const canAddUser =
    searchValue.trim() &&
    !users.some(
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

    setUsers([...users, newUser]);
    setValue(newUser.value);
    setSearchValue('');
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[380px]">
        <Label className="m-0 p-0">User</Label>
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search users..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-10"
              />
              <CommandList>
                {filteredUsers.length > 0 && (
                  <CommandGroup className="px-1 py-0 mt-1">
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
}

const dataTypes = [
  { value: 'asset', label: 'Asset' },
  { value: 'event', label: 'Event' },
  { value: 'observation', label: 'Observation' },
  { value: 'time-series', label: 'Time series' },
  { value: 'work-order', label: 'Work order' },
  { value: 'document', label: 'Document' },
  { value: 'file', label: 'File' },
  { value: 'sequence', label: 'Sequence' },
];

function MultiSelectDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([
    'event',
    'observation',
    'time-series',
    'work-order',
    'document',
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
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search data type..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-10"
              />
              <CommandList>
                <CommandGroup className="px-1 py-0 mt-1">
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
}

function SimpleDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const menuItems = Array.from({ length: 5 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `Menu item ${i + 1}`,
  }));

  const secondMenuItems = Array.from({ length: 5 }, (_, i) => ({
    value: `second-item-${i + 1}`,
    label: `Menu item ${i + 6}`,
  }));

  const allItems = [...menuItems, ...secondMenuItems];

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[300px]">
        <Label className="m-0 p-0">View</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? allItems.find((item) => item.value === value)?.label
                : 'Select view...'}
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search views..." />
              <CommandList>
                <CommandEmpty>No view found.</CommandEmpty>
                <CommandGroup heading="Section label">
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
                <CommandGroup heading="Section label">
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
    </div>
  );
}
function SimpleWithIconDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const menuItems = Array.from({ length: 5 }, (_, i) => ({
    value: `item-${i + 1}`,
    label: `Menu item ${i + 1}`,
  }));

  const secondMenuItems = Array.from({ length: 5 }, (_, i) => ({
    value: `second-item-${i + 1}`,
    label: `Menu item ${i + 6}`,
  }));

  const allItems = [...menuItems, ...secondMenuItems];

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[300px]">
        <Label className="m-0 p-0">View</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? allItems.find((item) => item.value === value)?.label
                : 'Select view...'}
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search views..." />
              <CommandList>
                <CommandEmpty>No view found.</CommandEmpty>
                <CommandGroup heading="Section label">
                  {menuItems.map((item) => (
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
                <CommandSeparator />
                <CommandGroup heading="Section label">
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
    </div>
  );
}

const teamMembers = [
  {
    value: 'alice',
    label: 'Alice Johnson',
    initials: 'AJ',
    email: 'alice@example.com',
  },
  {
    value: 'bob',
    label: 'Bob Smith',
    initials: 'BS',
    email: 'bob@example.com',
  },
  {
    value: 'charlie',
    label: 'Charlie Brown',
    initials: 'CB',
    email: 'charlie@example.com',
  },
  {
    value: 'diana',
    label: 'Diana Prince',
    initials: 'DP',
    email: 'diana@example.com',
  },
  {
    value: 'eve',
    label: 'Eve Wilson',
    initials: 'EW',
    email: 'eve@example.com',
  },
];

function AvatarDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('alice');

  const selectedMember = teamMembers.find((member) => member.value === value);

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[380px]">
        <Label className="m-0 p-0">Team Member</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                {selectedMember && (
                  <>
                    <Avatar sizes="xsm" variant="fjord">
                      <AvatarFallback>{selectedMember.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-base tracking-tightest font-normal text-foreground">
                      {selectedMember.label}
                    </span>
                  </>
                )}
                {!selectedMember && (
                  <span className="text-sm text-muted-foreground">
                    Select team member...
                  </span>
                )}
              </div>
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[380px] p-0">
            <Command>
              <CommandInput placeholder="Search team members..." />
              <CommandList>
                <CommandEmpty>No team member found.</CommandEmpty>
                <CommandGroup className="px-1 py-0 mt-1">
                  {teamMembers.map((member) => (
                    <CommandItem
                      key={member.value}
                      value={member.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 h-[36px] pr-0"
                    >
                      <Avatar sizes="xsm" variant="fjord">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-base tracking-tightest font-normal text-foreground">
                          {member.label}
                        </span>
                      </div>
                      <IconCheck
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          value === member.value ? 'opacity-100' : 'opacity-0'
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
}

function FocusedDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('option-1');

  const options = [
    { value: 'option-1', label: 'Description' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ];

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="grid w-full max-w-sm items-center gap-1">
      <Label className="m-0 p-0">Label</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring"
            autoFocus
          >
            <div className="flex items-center gap-2">
              <IconGrid3x3 className="h-4 w-4" />
              <span className="text-base tracking-tightest font-normal text-foreground">
                {selectedOption?.label || 'Select option...'}
              </span>
            </div>
            <IconSelector className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup className="px-1 py-0 mt-1">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 h-[36px] pr-0"
                  >
                    <IconGrid3x3 className="h-4 w-4" />
                    <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                      {option.label}
                    </span>
                    <IconCheck
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <HelperText>Help text</HelperText>
    </div>
  );
}

function ValidationDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const errorMessage = 'Help text';

  const options = [
    { value: 'option-1', label: 'Description' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
  ];

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="grid w-full max-w-sm items-center gap-1">
      <Label className="m-0 p-0">Label</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={true}
            className="w-full justify-between aria-invalid:border-destructive-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
          >
            <div className="flex items-center gap-2">
              <IconGrid3x3 className="h-4 w-4" />
              <span className="text-base tracking-tightest font-normal text-foreground">
                {selectedOption?.label || 'Select option...'}
              </span>
            </div>
            <IconSelector className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup className="px-1 py-0 mt-1">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 h-[36px] pr-0"
                  >
                    <IconGrid3x3 className="h-4 w-4" />
                    <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                      {option.label}
                    </span>
                    <IconCheck
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <HelperText isError>{errorMessage}</HelperText>
    </div>
  );
}

function CheckboxDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([
    'notifications',
    'marketing',
  ]);
  const [searchValue, setSearchValue] = useState('');

  const options = [
    { value: 'notifications', label: 'Email notifications' },
    { value: 'marketing', label: 'Marketing emails' },
    { value: 'updates', label: 'Product updates' },
    { value: 'security', label: 'Security alerts' },
    { value: 'newsletter', label: 'Newsletter' },
  ];

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
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search preferences..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-10"
              />
              <CommandList>
                <CommandGroup className="px-1 py-0 mt-1">
                  {filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleToggle(option.value)}
                        className="flex items-center gap-2 h-[36px]"
                      >
                        <Checkbox checked={isSelected} className="data-[state=checked]:!bg-foreground data-[state=checked]:!border-foreground data-[state=checked]:!text-background dark:data-[state=checked]:!bg-foreground" />
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
}

export const comboboxExamples: ComponentExamples = {
  basic: {
    title: 'Basic Combobox',
    description: 'A searchable select dropdown with autocomplete',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `import { useState } from 'react';
import { IconCheck, IconSelector, IconUser } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Avatar, AvatarFallback } from '@/components/ui/aura/avatar';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';

const users = [
  {
    value: 'dennis-rodman',
    label: 'Dennis Rodman',
    initials: 'PJ',
    position: 'Power forward',
  },
  {
    value: 'luc-longley',
    label: 'Luc Longley',
    initials: 'PJ',
    position: 'Center',
  },
  {
    value: 'michael-jordan',
    label: 'Michael Jordan',
    initials: 'PJ',
    position: 'Shooting guard',
  },
  {
    value: 'ron-harper',
    label: 'Ron Harper',
    initials: 'PJ',
    position: 'Point guard',
  },
  {
    value: 'scottie-pippen',
    label: 'Scottie Pippen',
    initials: 'PJ',
    position: 'Small forward',
  },
];

export function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('michael-jordan');

  const selectedUser = users.find((user) => user.value === value);

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[380px]">
        <Label className="m-0 p-0">User</Label>
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command>
              <CommandInput placeholder="Search users..." />
              <CommandList>
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup className="px-1 py-0 mt-1">
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
}`,
  },
  addUsers: {
    title: 'Add Users',
    description:
      "Combobox with ability to add new users that don't exist in the list",
    component: AddUsersDemo,
    difficulty: 'advanced',
    code: `import { useState } from 'react';
import { IconCheck, IconPlus, IconSelector, IconUser } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Avatar, AvatarFallback } from '@/components/ui/aura/avatar';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';

const initialUsers = [
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

export function AddUsersDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('michael-jordan');
  const [users, setUsers] = useState(initialUsers);
  const [searchValue, setSearchValue] = useState('');

  const selectedUser = users.find((user) => user.value === value);

  const filteredUsers = users.filter((user) =>
    user.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  const canAddUser =
    searchValue.trim() &&
    !users.some(
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

    setUsers([...users, newUser]);
    setValue(newUser.value);
    setSearchValue('');
    setOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[380px]">
        <Label className="m-0 p-0">User</Label>
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search users..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-10"
              />
              <CommandList>
                {filteredUsers.length > 0 && (
                  <CommandGroup className="px-1 py-0 mt-1">
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
      <p className="text-sm text-muted-foreground">
        Search for users or add new ones that don't exist in the list.
      </p>
    </div>
  );
}`,
  },
  multiSelect: {
    title: 'Multi-Select Combobox',
    description: 'Select multiple items with tags and remove functionality',
    component: MultiSelectDemo,
    difficulty: 'advanced',
    code: `import { useState } from 'react';
import { IconCheck, IconSelector, IconX } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';

const dataTypes = [
  { value: 'asset', label: 'Asset' },
  { value: 'event', label: 'Event' },
  { value: 'observation', label: 'Observation' },
  { value: 'time-series', label: 'Time series' },
  { value: 'work-order', label: 'Work order' },
  { value: 'document', label: 'Document' },
  { value: 'file', label: 'File' },
  { value: 'sequence', label: 'Sequence' },
];

export function MultiSelectDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([
    'event',
    'observation',
    'asset',
    'time-series',
    'work-order',
    'document',
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
        <Popover open={open} onOpenChange={setOpen}>
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
          <PopoverContent className="w-[380px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search data type..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-10"
              />
              <CommandList>
                <CommandGroup className="px-1 py-0 mt-1">
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
}`,
  },
  simple: {
    title: 'Simple Combobox',
    description: 'A simple combobox with sections',
    component: SimpleDemo,
    difficulty: 'beginner',
    code: `import { useState } from 'react';
import { IconSelector } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Button } from '@/components/ui/aura/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';

const menuItems = Array.from({ length: 5 }, (_, i) => ({
  value: \`item-\${i + 1}\`,
  label: 'Menu item',
}));

export function SimpleDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[300px]">
        <Label className="m-0 p-0">View</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? menuItems.find((item) => item.value === value)?.label
                : 'Select view...'}
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search views..." />
              <CommandList>
                <CommandEmpty>No view found.</CommandEmpty>
                <CommandGroup heading="Section label">
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
                <CommandGroup heading="Section label">
                  {menuItems.map((item) => (
                    <CommandItem
                      key={\`second-\${item.value}\`}
                      value={\`second-\${item.value}\`}
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
    </div>
  );
}`,
  },
  simpleWithIcon: {
    title: 'Simple with Icon Combobox',
    description: 'A simple combobox with sections and icons',
    component: SimpleWithIconDemo,
    difficulty: 'beginner',
    code: `import { useState } from 'react';
import { IconGrid3x3, IconSelector } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Button } from '@/components/ui/aura/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';

const menuItems = Array.from({ length: 5 }, (_, i) => ({
  value: \`item-\${i + 1}\`,
  label: 'Menu item',
}));

export function SimpleWithIconDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[300px]">
        <Label className="m-0 p-0">View</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? menuItems.find((item) => item.value === value)?.label
                : 'Select view...'}
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search views..." />
              <CommandList>
                <CommandEmpty>No view found.</CommandEmpty>
                <CommandGroup heading="Section label">
                  {menuItems.map((item) => (
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
                <CommandSeparator />
                <CommandGroup heading="Section label">
                  {menuItems.map((item) => (
                    <CommandItem
                      key={\`second-\${item.value}\`}
                      value={\`second-\${item.value}\`}
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
    </div>
  );
}`,
  },
  avatar: {
    title: 'Avatar Combobox',
    description: 'A combobox with avatars for user selection',
    component: AvatarDemo,
    difficulty: 'intermediate',
    code: `import { useState } from 'react';
import { IconCheck, IconSelector } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Avatar, AvatarFallback } from '@/components/ui/aura/avatar';
import { Button } from '@/components/ui/aura/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';

const teamMembers = [
  {
    value: 'alice',
    label: 'Alice Johnson',
    initials: 'AJ',
    email: 'alice@example.com',
  },
  {
    value: 'bob',
    label: 'Bob Smith',
    initials: 'BS',
    email: 'bob@example.com',
  },
  {
    value: 'charlie',
    label: 'Charlie Brown',
    initials: 'CB',
    email: 'charlie@example.com',
  },
  {
    value: 'diana',
    label: 'Diana Prince',
    initials: 'DP',
    email: 'diana@example.com',
  },
  {
    value: 'eve',
    label: 'Eve Wilson',
    initials: 'EW',
    email: 'eve@example.com',
  },
];

export function AvatarDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('alice');

  const selectedMember = teamMembers.find((member) => member.value === value);

  return (
    <div className="space-y-3">
      <div className="space-y-2 w-[380px]">
        <Label className="m-0 p-0">Team Member</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                {selectedMember && (
                  <>
                    <Avatar sizes="xsm" variant="fjord">
                      <AvatarFallback>{selectedMember.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-base tracking-tightest font-normal text-foreground">
                      {selectedMember.label}
                    </span>
                  </>
                )}
                {!selectedMember && (
                  <span className="text-sm text-muted-foreground">
                    Select team member...
                  </span>
                )}
              </div>
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[380px] p-0">
            <Command>
              <CommandInput placeholder="Search team members..." />
              <CommandList>
                <CommandEmpty>No team member found.</CommandEmpty>
                <CommandGroup className="px-1 py-0 mt-1">
                  {teamMembers.map((member) => (
                    <CommandItem
                      key={member.value}
                      value={member.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                      className="flex items-center gap-2 h-[36px] pr-0"
                    >
                      <Avatar sizes="xsm" variant="fjord">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-base tracking-tightest font-normal text-foreground">
                          {member.label}
                        </span>
                      </div>
                      <IconCheck
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          value === member.value ? 'opacity-100' : 'opacity-0'
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
}`,
  },
  focused: {
    title: 'Focused Combobox',
    description: 'A combobox in focused state with blue border',
    component: FocusedDemo,
    difficulty: 'beginner',
    code: `import { useState } from 'react';
import { IconCheck, IconGrid3x3, IconSelector } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Button } from '@/components/ui/aura/button';
import { HelperText } from '@/components/ui/aura/helper-text';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';

const options = [
  { value: 'option-1', label: 'Description' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

export function FocusedDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('option-1');

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="grid w-full max-w-sm items-center gap-1">
      <Label className="m-0 p-0">Label</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring"
            autoFocus
          >
            <div className="flex items-center gap-2">
              <IconGrid3x3 className="h-4 w-4" />
              <span className="text-base tracking-tightest font-normal text-foreground">
                {selectedOption?.label || 'Select option...'}
              </span>
            </div>
            <IconSelector className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup className="px-1 py-0 mt-1">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 h-[36px] pr-0"
                  >
                    <IconGrid3x3 className="h-4 w-4" />
                    <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                      {option.label}
                    </span>
                    <IconCheck
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <HelperText>Help text</HelperText>
    </div>
  );
}`,
  },
  validation: {
    title: 'Validation Combobox',
    description: 'A combobox with error state and validation message',
    component: ValidationDemo,
    difficulty: 'beginner',
    code: `import { useState } from 'react';
import { IconCheck, IconGrid3x3, IconSelector } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Button } from '@/components/ui/aura/button';
import { HelperText } from '@/components/ui/aura/helper-text';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';
import { cn } from '@/lib/utils';

const options = [
  { value: 'option-1', label: 'Description' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

export function ValidationDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const errorMessage = 'Help text';

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="grid w-full max-w-sm items-center gap-1">
      <Label className="m-0 p-0">Label</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={true}
            className="w-full justify-between aria-invalid:border-destructive-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
          >
            <div className="flex items-center gap-2">
              <IconGrid3x3 className="h-4 w-4" />
              <span className="text-base tracking-tightest font-normal text-foreground">
                {selectedOption?.label || 'Select option...'}
              </span>
            </div>
            <IconSelector className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup className="px-1 py-0 mt-1">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 h-[36px] pr-0"
                  >
                    <IconGrid3x3 className="h-4 w-4" />
                    <span className="flex-1 text-base tracking-tightest font-normal text-foreground">
                      {option.label}
                    </span>
                    <IconCheck
                      className={cn(
                        'mr-2 h-4 w-4 shrink-0',
                        value === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <HelperText isError>{errorMessage}</HelperText>
    </div>
  );
}`,
  },
  checkbox: {
    title: 'Checkbox Combobox',
    description: 'A multi-select combobox with visible checkboxes',
    component: CheckboxDemo,
    difficulty: 'intermediate',
    code: `import { useState } from 'react';
import { IconSelector } from '@tabler/icons-react';
import { Label } from '@/components/ui/aura/label';
import { Button } from '@/components/ui/aura/button';
import { Checkbox } from '@/components/ui/aura/checkbox';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/aura/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/aura/popover';

const options = [
  { value: 'notifications', label: 'Email notifications' },
  { value: 'marketing', label: 'Marketing emails' },
  { value: 'updates', label: 'Product updates' },
  { value: 'security', label: 'Security alerts' },
  { value: 'newsletter', label: 'Newsletter' },
];

export function CheckboxDemo() {
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between min-h-[36px] h-auto py-1 px-2"
            >
              <span className="text-sm text-muted-foreground">
                {selectedLabels.length > 0
                  ? \`\${selectedLabels.length} selected\`
                  : 'Select preferences...'}
              </span>
              <IconSelector className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[380px] p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Search preferences..."
                value={searchValue}
                onValueChange={setSearchValue}
                className="h-10"
              />
              <CommandList>
                <CommandGroup className="px-1 py-0 mt-1">
                  {filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleToggle(option.value)}
                        className="flex items-center gap-2 h-[36px]"
                      >
                        <Checkbox checked={isSelected} className="data-[state=checked]:!bg-foreground data-[state=checked]:!border-foreground data-[state=checked]:!text-background dark:data-[state=checked]:!bg-foreground" />
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
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const comboboxMeta = {
  name: 'Combobox',
  description:
    'Autocomplete input and command palette with a list of suggestions.',
  llmUsage:
    'When creating searchable select dropdowns, use `<Combobox>` which combines Popover and Command components.',
  importPath: '@/components/ui/aura/combobox',
};
