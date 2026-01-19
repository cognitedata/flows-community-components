import { Link } from "react-router-dom";

const components = [
  "Accordion",
  "Alert Dialog",
  "Alert",
  "Aspect Ratio",
  "Avatar",
  "Badge",
  "Banner",
  "Breadcrumb",
  "Button Group",
  "Button",
  "Calendar",
  "Card",
  "Carousel",
  "Chart",
  "Checkbox",
  "Collapsible",
  "Combobox",
  "Command",
  "Context Menu",
  "Data Table",
  "Date Picker",
  "Dialog",
  "Drawer",
  "Dropdown Menu",
  "Helper Text",
  "Hover Card",
  "Input Group",
  "Input",
  "Kbd",
  "Label",
  "Menubar",
  "Pagination",
  "Popover",
  "Progress",
  "Radio Group",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Slider",
  "Sonner Toast",
  "Swap Slot",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Time Input",
  "Toggle Group",
  "Toggle",
  "Tooltip",
  "Topbar",
];

export default function PrimitivesPage() {
  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Here you can find all the components available in the library. We are working on adding
            more components.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-8">
          {components.map((component) => (
            <Link
              key={component}
              to={`/primitives/components/${component.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-foreground hover:underline"
            >
              {component}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
