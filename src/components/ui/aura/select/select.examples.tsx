import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/aura/select';
import { Label } from '@/components/ui/aura/label';
import {
  IconHome as Home,
  IconMail as Mail,
  IconSettings as Settings,
  IconUser as User,
} from '@tabler/icons-react';
import * as React from 'react';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicDemo() {
  const [selectedValue, setSelectedValue] = React.useState<string>('settings');

  // Map values to icons for SelectValue
  const iconMap: Record<string, React.ReactNode> = {
    user: <User className="size-4" />,
    mail: <Mail className="size-4" />,
    settings: <Settings className="size-4" />,
    home: <Home className="size-4" />,
  };
  return (
    <div className="space-y-4 max-w-sm flex flex-row gap-4">
      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="mt-1">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Asset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Asset</SelectItem>
            <SelectItem value="option2">Event</SelectItem>
            <SelectItem value="option3">Time series</SelectItem>
            <SelectItem value="option4">Work order</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
function StatesDemo() {
  const [selectedValue, setSelectedValue] = React.useState<string>('settings');

  // Map values to icons for SelectValue
  const iconMap: Record<string, React.ReactNode> = {
    user: <User className="size-4" />,
    mail: <Mail className="size-4" />,
    settings: <Settings className="size-4" />,
    home: <Home className="size-4" />,
  };
  return (
    <div className="space-y-4 max-w-sm flex flex-col gap-4">
      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="mt-1">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue} disabled>
          <SelectTrigger className="mt-1">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="py-0.5">Choose an option (Invalid)</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="mt-1" errorMessage="This field is required">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export const selectExamples: ComponentExamples = {
  basic: {
    title: 'Select Dropdown',
    description: 'A dropdown select component for choosing from options',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/aura/select';
import { Label } from '@/components/ui/aura/label';
import {
  IconHome as Home,
  IconMail as Mail,
  IconSettings as Settings,
  IconUser as User,
} from '@tabler/icons-react';
import * as React from 'react';

function BasicDemo() {
  const [selectedValue, setSelectedValue] =
    React.useState<string>('settings');

  const iconMap: Record<string, React.ReactNode> = {
    user: <User className="size-4" />,
    mail: <Mail className="size-4" />,
    settings: <Settings className="size-4" />,
    home: <Home className="size-4" />,
  };

  return (
    <div className="space-y-4 max-w-sm flex flex-row gap-4">
      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="mt-1">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Asset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Asset</SelectItem>
            <SelectItem value="option2">Event</SelectItem>
            <SelectItem value="option3">Time series</SelectItem>
            <SelectItem value="option4">Work order</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
`,
  },
  states: {
    title: 'Select Dropdown',
    description: 'States of the select dropdown',
    component: StatesDemo,
    difficulty: 'beginner',
    code: `
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/aura/select';
import { Label } from '@/components/ui/aura/label';
import {
  IconHome as Home,
  IconMail as Mail,
  IconSettings as Settings,
  IconUser as User,
} from '@tabler/icons-react';
import * as React from 'react';

function StatesDemo() {
  const [selectedValue, setSelectedValue] =
    React.useState<string>('settings');

  const iconMap: Record<string, React.ReactNode> = {
    user: <User className="size-4" />,
    mail: <Mail className="size-4" />,
    settings: <Settings className="size-4" />,
    home: <Home className="size-4" />,
  };

  return (
    <div className="space-y-4 max-w-sm flex flex-col gap-4">
      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="mt-1">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="py-0.5">Choose an option</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue} disabled>
          <SelectTrigger className="mt-1">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="py-0.5">Choose an option (Invalid)</Label>
        <Select value={selectedValue} onValueChange={setSelectedValue}>
          <SelectTrigger className="mt-1" errorMessage="This field is required">
            <SelectValue
              placeholder="Select an option"
              icon={selectedValue ? iconMap[selectedValue] : undefined}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" icon={<User className="size-4" />}>
              Asset
            </SelectItem>
            <SelectItem value="mail" icon={<Mail className="size-4" />}>
              Event
            </SelectItem>
            <SelectItem value="settings" icon={<Settings className="size-4" />}>
              Time series
            </SelectItem>
            <SelectItem value="home" icon={<Home className="size-4" />}>
              Work order
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
`,
  },
};

// Component metadata - single source of truth for API documentation
export const selectMeta = {
  name: 'Select',
  description:
    'Displays a list of options for the user to pick from—triggered by a button.',
  llmUsage:
    'When asked for a select dropdown, use `<Select>` for choosing from multiple options.',
  importPath: '@/components/ui/aura/select',
};
