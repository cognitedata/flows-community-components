import { Link } from "react-router-dom";

const components = [
  "Artifact",
  "Canvas",
  "Chain of Thought",
  "Code Block",
  "Confirmation",
  "Connection",
  "Context",
  "Controls",
  "Conversation",
  "Edge",
  "Image",
  "Inline Citation",
  "Loader",
  "Message",
  "Node",
  "Open in Chat",
  "Panel",
  "Plan",
  "Prompt Input",
  "Queue",
  "Reasoning",
  "Shimmer",
  "Sources",
  "Suggestion",
  "Task",
  "Tool",
  "Toolbar",
];

export default function AIPage() {
  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-lg text-muted-foreground mt-2">All available AI element components</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-8">
          {components.map((component) => (
            <Link
              key={component}
              to={`/ai/components/${component.toLowerCase().replace(/\s+/g, "-")}`}
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
