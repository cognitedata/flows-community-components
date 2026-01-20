import { Card, CardContent } from "@/components/ui/aura/card";
import { Link } from "react-router-dom";

const foundations = [
  { name: "Colors", description: "Color palette and tokens", path: "/primitives/colors" },
  { name: "Effects", description: "Shadows and visual effects", path: "/primitives/effects" },
  { name: "Layouts", description: "Grid and container systems", path: "/primitives/layouts" },
  { name: "Typography", description: "Text styles and scales", path: "/primitives/typography" },
];

const components = [
  { name: "Accordion", description: "Collapsible content sections" },
  { name: "Alert", description: "Display important messages" },
  { name: "Alert dialog", description: "Modal confirmation dialogs" },
  { name: "Avatar", description: "User profile images" },
  { name: "Badge", description: "Small status indicators" },
  { name: "Banner", description: "Full-width notifications" },
  { name: "Breadcrumb", description: "Navigation hierarchy" },
  { name: "Button", description: "Clickable action elements" },
  { name: "Calendar", description: "Date selection interface" },
  { name: "Card", description: "Grouped content container" },
  { name: "Checkbox", description: "Multi-select input" },
  { name: "Collapsible", description: "Expandable content" },
  { name: "Combobox", description: "Searchable select input" },
  { name: "Command", description: "Command palette menu" },
  { name: "Context menu", description: "Right-click menu" },
  { name: "Date picker", description: "Calendar date selector" },
  { name: "Dialog", description: "Modal overlay windows" },
  { name: "Drawer", description: "Slide-in side panel" },
  { name: "Dropdown menu", description: "Action menu list" },
  { name: "Helper text", description: "Input guidance text" },
  { name: "Hover card", description: "Preview content on hover" },
  { name: "Input", description: "Text input field" },
  { name: "Kbd", description: "Keyboard shortcut display" },
  { name: "Label", description: "Form field labels" },
  { name: "Menubar", description: "Application menu bar" },
  { name: "Pagination", description: "Page navigation controls" },
  { name: "Popover", description: "Floating content panel" },
  { name: "Progress", description: "Progress indicator bar" },
  { name: "Radio group", description: "Single-select options" },
  { name: "Select", description: "Dropdown selection" },
  { name: "Separator", description: "Visual content divider" },
  { name: "Sidebar", description: "Navigation side panel" },
  { name: "Slider", description: "Range input control" },
  { name: "Sonner", description: "Toast notifications" },
  { name: "Swap slot", description: "Content transition" },
  { name: "Switch", description: "Toggle on/off control" },
  { name: "Table", description: "Structured data display" },
  { name: "Tabs", description: "Tabbed content panels" },
  { name: "Textarea", description: "Multi-line text input" },
  { name: "Time input", description: "Time selection field" },
  { name: "Toggle", description: "Binary state button" },
  { name: "Tooltip", description: "Contextual help text" },
  { name: "Topbar", description: "Application top bar" },
];

export default function PrimitivesPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-12">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Primitives</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Building blocks for creating consistent, accessible user interfaces
          </p>
        </div>

        {/* Foundations Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Foundations</h2>
            <p className="text-muted-foreground mt-1">Core design tokens and system fundamentals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {foundations.map((foundation) => (
              <Link key={foundation.name} to={foundation.path} className="block">
                <Card className="h-full transition-colors hover:border-primary">
                  <CardContent className="py-4">
                    <div className="space-y-1">
                      <div className="text-foreground font-medium">{foundation.name}</div>
                      <p className="text-sm text-muted-foreground">{foundation.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Primitives Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Primitives</h2>
            <p className="text-muted-foreground mt-1">
              Reusable UI components for building interfaces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {components.map((component) => (
              <Link
                key={component.name}
                to={`/primitives/components/${component.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block"
              >
                <Card className="h-full transition-colors hover:border-primary">
                  <CardContent className="py-4">
                    <div className="space-y-1">
                      <div className="text-foreground font-medium">{component.name}</div>
                      <p className="text-sm text-muted-foreground">{component.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
