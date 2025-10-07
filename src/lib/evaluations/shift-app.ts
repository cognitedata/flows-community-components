export const shiftApp = `
  "use client";

  import { useState } from "react";
  import { Button } from "@/components/ui/cognite/button";
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/cognite/card";
  import { Input } from "@/components/ui/cognite/input";
  import { Textarea } from "@/components/ui/cognite/textarea";
  import { Checkbox } from "@/components/ui/cognite/checkbox";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/cognite/select";
  import { Badge } from "@/components/ui/cognite/badge";
  import { Separator } from "@/components/ui/cognite/separator";

  // Icons (using simple SVG icons for now)
  const BackArrow = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );

  const WaveformIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="4" width="3" height="16" rx="1.5" />
      <rect x="7" y="8" width="3" height="8" rx="1.5" />
      <rect x="12" y="2" width="3" height="20" rx="1.5" />
      <rect x="17" y="6" width="3" height="12" rx="1.5" />
    </svg>
  );

  const BarChartIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 3v18h18" />
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
    </svg>
  );

  const CompassIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );

  const GridIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  const BellIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );

  const SunIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );

  const UserIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );

  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  const MoreVerticalIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );

  const AlertTriangleIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );

  export default function ShiftHandoverPage() {
    const [shiftType, setShiftType] = useState("Night");
    const [checklistItems, setChecklistItems] = useState([
      { id: 1, text: "Site walk-through", checked: true },
      { id: 2, text: "Check equipment logs", checked: true },
      {
        id: 3,
        text: "Confirm all critical systems are operational",
        checked: false,
      },
    ]);

    const addChecklistItem = () => {
      const newItem = {
        id: checklistItems.length + 1,
        text: "New checklist item",
        checked: false,
      };
      setChecklistItems([...checklistItems, newItem]);
    };

    const toggleChecklistItem = (id: number) => {
      setChecklistItems(
        checklistItems.map((item) =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      );
    };

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <WaveformIcon />
                <BackArrow />
                <span className="text-sm text-gray-600">Back to apps</span>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Profiles</span>
                <span>Settings</span>
              </div>
            </div>

            {/* Center navigation */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <BarChartIcon />
                <span>Dashboard</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <CompassIcon />
                <span>Explore</span>
              </Button>
              <Button
                size="sm"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <GridIcon />
                <span>Apps</span>
              </Button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <BellIcon />
              </Button>
              <Button variant="ghost" size="sm">
                <SunIcon />
              </Button>
              <Button variant="ghost" size="sm">
                <UserIcon />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex h-[calc(100vh-73px)]">
          {/* Left Panel - New shift handover */}
          <div className="flex-1 p-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>New shift handover</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shift Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Shift date
                  </label>
                  <div className="relative">
                    <Input placeholder="MM/DD/YYYY" />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Shift Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Shift type
                  </label>
                  <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                    {["Morning", "Midday", "Night"].map((type) => (
                      <Button
                        key={type}
                        variant={shiftType === type ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setShiftType(type)}
                        className={\`flex-1 \${cn(
                          shiftType === type
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "text-gray-600 hover:text-gray-900"
                        }\`}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Handover from */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Handover from
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Jerry Seinfeld" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jerry">Jerry Seinfeld</SelectItem>
                      <SelectItem value="george">George Costanza</SelectItem>
                      <SelectItem value="elaine">Elaine Benes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Handover to */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Handover to
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="George Costanza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jerry">Jerry Seinfeld</SelectItem>
                      <SelectItem value="george">George Costanza</SelectItem>
                      <SelectItem value="elaine">Elaine Benes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary of work */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Summary of work
                  </label>
                  <Textarea
                    placeholder="Describe work that was carried out."
                    className="min-h-[100px] resize-y"
                  />
                </div>

                {/* Safety concerns */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Safety concerns
                  </label>
                  <Textarea
                    placeholder="Report any safety issues or near-misses."
                    className="min-h-[100px] resize-y"
                  />
                </div>

                {/* Handover checklist */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">
                    Handover checklist
                  </label>
                  <div className="space-y-3">
                    {checklistItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleChecklistItem(item.id)}
                        />
                        <div className="flex-1">
                          <span className="text-sm">{item.text}</span>
                          <div className="text-xs text-gray-500 mt-1">
                            Description
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addChecklistItem}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <PlusIcon />
                    <span className="ml-2">Add checklist item</span>
                  </Button>
                </div>

                {/* Submit button */}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckIcon />
                  <span className="ml-2">Submit handover</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Handover reports */}
          <div className="w-96 p-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Handover reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Report 1 */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="text-green-600" />
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          No issues
                        </Badge>
                        <span className="text-sm font-medium">Night shift</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      21/09/2025 04:55
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-3 min-h-[60px]">
                      {/* Report details placeholder */}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Report 2 */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangleIcon className="text-orange-600" />
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800"
                        >
                          1 warning
                        </Badge>
                        <span className="text-sm font-medium">Midday shift</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      20/09/2025 19:02
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-3 min-h-[60px]">
                      {/* Report details placeholder */}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Report 3 */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <GridIcon className="text-gray-600" />
                        <span className="text-sm font-medium">Morning shift</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      20/09/2025 05:52
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-3 min-h-[60px]">
                      {/* Report details placeholder */}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Report 4 */}
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="text-green-600" />
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          No issues
                        </Badge>
                        <span className="text-sm font-medium">Night shift</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVerticalIcon />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      20/09/2025 04:55
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded p-4 mb-3 min-h-[60px]">
                      {/* Report details placeholder */}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <GridIcon />
                        <span className="ml-2">Button</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
`;
