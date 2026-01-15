'use client';

import { useState } from 'react';
import {
  IconCheck,
  IconPlus,
  IconSelector,
  IconUser,
  IconX,
} from '@tabler/icons-react';
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
    image: '/users/michael-jordan.png',
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
      <div className="space-y-2 w-[270px]">
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
          <PopoverContent className="w-[270px] p-0">
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

  const handleRemove = (value: string, e: React.MouseEvent) => {
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
                          handleRemove(type.value, e as any);
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

export const comboboxExamples: ComponentExamples = {
  basic: {
    title: 'Basic Combobox',
    description: 'A searchable select dropdown with autocomplete',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `import { useState } from 'react';
import { IconCheck, IconCaretUpDown } from '@tabler/icons-react';
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

export function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('michael-jordan');

  const selectedUser = users.find((user) => user.value === value);

  return (
    <div className="space-y-2">
      <Label>User</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              {selectedUser && (
                <>
                  <Avatar sizes="xsm" variant="fjord">
                    <AvatarFallback>{selectedUser.initials}</AvatarFallback>
                  </Avatar>
                  <span>{selectedUser.label}</span>
                </>
              )}
            </div>
            <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search users..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.value}
                    value={user.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <IconCheck
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === user.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <Avatar sizes="xsm" variant="fjord" className="mr-2">
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1">{user.label}</span>
                    <Badge variant="secondary" size="default">
                      {user.position}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
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
                  <div className="p-1 border-t">
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-[36px]"
                      onClick={handleAddUser}
                    >
                      <IconPlus className="h-4 w-4 mr-2" />
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

  const handleRemove = (value: string, e: React.MouseEvent) => {
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
                          handleRemove(type.value, e as any);
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
