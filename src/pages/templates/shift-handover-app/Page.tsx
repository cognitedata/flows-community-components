import {
  IconAppWindow as AppWindow,
  IconArrowLeft as ArrowLeft,
  IconChartBar as BarChart3,
  IconBell as Bell,
  IconCalendar as CalendarIcon,
  IconCheck as Check,
  IconAlertCircle as CircleAlert,
  IconCircleCheck as CircleCheck,
  IconMoon as Moon,
  IconAlertOctagon as OctagonAlert,
  IconPlus as Plus,
  IconRefresh as RefreshCw,
  IconCategory as Shapes,
  IconSun as Sun,
} from '@tabler/icons-react';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useTheme } from '@/components/theme-provider';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import { Calendar } from '@/components/ui/aura/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/aura/card';
import { Checkbox } from '@/components/ui/aura/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/aura/dialog';
import { Input } from '@/components/ui/aura/input';
import { Label } from '@/components/ui/aura/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/aura/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/aura/select';
import { Separator } from '@/components/ui/aura/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/aura/tabs';
import { Textarea } from '@/components/ui/aura/textarea';

type ChecklistItem = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
};

export default function ShiftHandoverAppPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [shiftDate, setShiftDate] = React.useState<Date | undefined>(new Date());
  const [shiftType, setShiftType] = React.useState<'morning' | 'day' | 'night'>('night');
  const [fromUser, setFromUser] = React.useState('Jerry Seinfeld');
  const [toUser, setToUser] = React.useState('George Costanza');
  const [summary, setSummary] = React.useState('');
  const [safety, setSafety] = React.useState('');
  const [checklistItems, setChecklistItems] = React.useState<ChecklistItem[]>([
    { id: 'walk', label: 'Site walk-through', description: '', checked: true },
    {
      id: 'logs',
      label: 'Check equipment logs',
      description: '',
      checked: true,
    },
    {
      id: 'systems',
      label: 'Confirm all critical systems are operational',
      description: '',
      checked: false,
    },
  ]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [newChecklistLabel, setNewChecklistLabel] = React.useState('');

  function toggleChecklistItem(id: string, checked: boolean) {
    setChecklistItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked } : item)));
  }

  function handleAddChecklistItem() {
    setIsAddDialogOpen(true);
  }

  function confirmAddChecklistItem() {
    const label = newChecklistLabel.trim();
    if (!label) return;
    const newId = `item-${Date.now()}`;
    setChecklistItems((prev) => [...prev, { id: newId, label, description: '', checked: false }]);
    setNewChecklistLabel('');
    setIsAddDialogOpen(false);
  }

  async function handleSubmit() {
    if (!shiftDate || !fromUser || !toUser) {
      toast.error('Please fill in the shift date and assignees');
      return;
    }
    try {
      setIsSubmitting(true);
      const completed = checklistItems.filter((i) => i.checked).length;
      const total = checklistItems.length;
      // Simulate submit
      await new Promise((r) => setTimeout(r, 400));
      toast.success('Handover submitted', {
        description: `${completed}/${total} checklist items completed`,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const reports = [
    {
      id: '2025-10-08-night',
      title: '8 October 2025',
      submitted: '16:59',
      body: 'All planned maintenance tasks were completed as scheduled. No abnormalities or delays reported during this shift. Equipment operating within normal parameters.',
      badges: [
        {
          text: 'No issues',
          cls: 'bg-emerald-950 text-emerald-300',
          icon: CircleCheck,
        },
        {
          text: '8/8 items completed',
          cls: 'bg-emerald-950 text-emerald-300',
          icon: CircleCheck,
        },
      ],
      headerIcon: <Sun className="h-4 w-4 text-indigo-300" />,
    },
    {
      id: '2025-10-08-morning',
      title: '8 October 2025',
      submitted: '06:53',
      body: 'Routine inspection of the hydraulic system was postponed due to limited access during ongoing operations. All other maintenance tasks were completed and verified.',
      badges: [
        {
          text: '1 issue',
          cls: 'bg-amber-950 text-amber-300',
          icon: CircleAlert,
        },
        {
          text: '7/8 items completed',
          cls: 'bg-amber-950 text-amber-300',
          icon: CircleCheck,
        },
      ],
      headerIcon: <Shapes className="h-4 w-4 text-indigo-300" />,
    },
    {
      id: '2025-10-07-night',
      title: '7 October 2025',
      submitted: '22:58',
      body: 'Three critical issues were identified and addressed: a pressure anomaly on Pump B, a faulty valve actuator in the separator line, and a control system alarm related to tank level sensors. Temporary fixes applied and follow-up maintenance scheduled for next shift.',
      badges: [
        {
          text: '2 critical issues',
          cls: 'bg-rose-950 text-rose-300',
          icon: OctagonAlert,
        },
        {
          text: '5/8 items completed',
          cls: 'bg-amber-950 text-amber-300',
          icon: CircleCheck,
        },
      ],
      headerIcon: <AppWindow className="h-4 w-4 text-indigo-300" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* App top bar */}
      <div className="w-full border-b border-border bg-background">
        <div className="h-12 px-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/cognite-logo.png" alt="Cognite" width={32} height={32} className="rounded" />
          </div>
          <div className="hidden md:flex">
            <Tabs defaultValue="apps">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="views" className="flex items-center gap-2">
                  <Shapes className="h-4 w-4" />
                  Views
                </TabsTrigger>
                <TabsTrigger value="apps" className="flex items-center gap-2">
                  <AppWindow className="h-4 w-4" />
                  App library
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <img src="/user-avatar.png" alt="User" width={28} height={28} className="rounded" />
          </div>
        </div>
      </div>

      {/* Secondary toolbar */}
      <div className="w-full border-b border-border">
        <div className="h-12 px-3 flex items-center gap-2">
          <Link to="/eos" className="flex items-center">
            <Button variant="ghost" size="sm" className="h-8 gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to apps
            </Button>
          </Link>
          <Separator orientation="vertical" className="mx-1 h-4" />
          <div className="flex items-center gap-1">
            {['File', 'Edit', 'View', 'Profiles', 'Settings'].map((label) => (
              <Button key={label} variant="ghost" size="sm" className="h-7 px-2">
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 pt-0 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-4 min-h-[calc(100vh-96px)]">
          {/* Left column: form */}
          <div>
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium">New shift handover</h2>
            </div>
            <div className="px-6 space-y-6">
              {/* Row 1: date + shift type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="handover-date" className="text-muted-foreground">
                    Shift date
                  </Label>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <div className="relative">
                          <Input
                            id="handover-date"
                            readOnly
                            value={shiftDate ? format(shiftDate, 'MM/dd/yyyy') : ''}
                            className="pr-8 bg-transparent"
                          />
                          <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      }
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={shiftDate}
                        onSelect={setShiftDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Shift type</Label>
                  <Tabs
                    value={shiftType}
                    onValueChange={(v) => setShiftType(v as typeof shiftType)}
                  >
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="morning">Morning</TabsTrigger>
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="night">Night</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {/* Row 2: from/to selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Handover from</Label>
                  <Select value={fromUser} onValueChange={setFromUser}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jerry Seinfeld">Jerry Seinfeld</SelectItem>
                      <SelectItem value="Elaine Benes">Elaine Benes</SelectItem>
                      <SelectItem value="Kramer">Kramer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Handover to</Label>
                  <Select value={toUser} onValueChange={setToUser}>
                    <SelectTrigger className="w-full bg-transparent">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="George Costanza">George Costanza</SelectItem>
                      <SelectItem value="Newman">Newman</SelectItem>
                      <SelectItem value="Frank Costanza">Frank Costanza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Summary of work */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Summary of work</Label>
                <Textarea
                  placeholder="Describe work that was carried out."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="min-h-[96px] resize-y"
                />
              </div>

              {/* Safety concerns */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Safety concerns</Label>
                <Textarea
                  placeholder="Report any safety issues or near-misses."
                  value={safety}
                  onChange={(e) => setSafety(e.target.value)}
                  className="min-h-[96px] resize-y"
                />
              </div>

              {/* Checklist */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Handover checklist</div>
                </div>
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <Checkbox
                        id={`check-${item.id}`}
                        checked={item.checked}
                        onCheckedChange={(c) => toggleChecklistItem(item.id, Boolean(c))}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <Label htmlFor={`check-${item.id}`} className="leading-none">
                          {item.label}
                        </Label>
                        {item.description ? (
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleAddChecklistItem}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" /> Add checklist item
                </Button>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add checklist item</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2 py-2">
                      <Label htmlFor="new-checklist-label">Label</Label>
                      <Input
                        id="new-checklist-label"
                        autoFocus
                        value={newChecklistLabel}
                        onChange={(e) => setNewChecklistLabel(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            confirmAddChecklistItem();
                          }
                        }}
                        placeholder="e.g. Verify isolation valves"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={confirmAddChecklistItem}
                        disabled={!newChecklistLabel.trim()}
                      >
                        Add
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Submit */}
              <div className="pt-6 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    setShiftDate(new Date());
                    setShiftType('night');
                    setFromUser('Jerry Seinfeld');
                    setToUser('George Costanza');
                    setSummary('');
                    setSafety('');
                    setChecklistItems([
                      {
                        id: 'walk',
                        label: 'Site walk-through',
                        description: '',
                        checked: true,
                      },
                      {
                        id: 'logs',
                        label: 'Check equipment logs',
                        description: '',
                        checked: true,
                      },
                      {
                        id: 'systems',
                        label: 'Confirm all critical systems are operational',
                        description: '',
                        checked: false,
                      },
                    ]);
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Clear form
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  variant="default"
                  size="lg"
                  className="flex-1"
                >
                  <Check className="mr-2 h-4 w-4" />{' '}
                  {isSubmitting ? 'Submitting...' : 'Submit handover'}
                </Button>
              </div>
            </div>
          </div>

          {/* Vertical separator */}
          <Separator orientation="vertical" className="hidden lg:block h-full" />

          {/* Right column: reports */}
          <div className="px-6">
            <div className="py-4">
              <h2 className="text-lg font-medium">Handover reports</h2>
            </div>
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="bg-background/60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-5 w-5 items-center justify-center rounded bg-[--ns-glacier-900]">
                          {report.headerIcon}
                        </div>
                        <CardTitle className="text-base">{report.title}</CardTitle>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        ⋮
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Submitted: {report.submitted}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm leading-6">{report.body}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {report.badges.map((b) => {
                        const Icon = b.icon as React.ElementType | undefined;
                        return (
                          <Badge key={b.text} className={b.cls}>
                            {Icon ? <Icon className="h-3 w-3" /> : null}
                            {b.text}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
