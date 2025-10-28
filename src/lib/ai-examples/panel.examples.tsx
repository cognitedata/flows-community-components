import { Panel } from "@/components/ai-elements/cognite/panel";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicPanelDemo() {
  return (
    <Panel>
      <div className="p-4">
        <h3 className="font-semibold mb-2">Panel Content</h3>
        <p className="text-sm text-muted-foreground">
          This is a panel component for displaying additional information.
        </p>
      </div>
    </Panel>
  );
}

function PanelWithCustomStylingDemo() {
  return (
    <Panel className="bg-muted/50">
      <div className="p-6">
        <h3 className="font-semibold mb-2">Custom Styled Panel</h3>
        <p className="text-sm">Content goes here</p>
      </div>
    </Panel>
  );
}

export const panelExamples: ComponentExamples = {
  basic: {
    title: "Basic Panel",
    description: "A floating panel for supplementary content",
    component: BasicPanelDemo,
    difficulty: "beginner",
    code: `import { Panel } from "@/components/ai-elements/cognite/panel"

export function BasicPanelDemo() {
  return (
    <Panel>
      <div className="p-4">
        <h3>Panel Title</h3>
        <p>Content goes here</p>
      </div>
    </Panel>
  )
}`,
  },

  customStyling: {
    title: "Custom Styled Panel",
    description: "Panel with custom styling",
    component: PanelWithCustomStylingDemo,
    difficulty: "beginner",
    code: `import { Panel } from "@/components/ai-elements/cognite/panel"

export function CustomPanelDemo() {
  return (
    <Panel className="bg-muted/50">
      <div className="p-6">Custom content</div>
    </Panel>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const panelMeta = {
  name: "Panel",
  description: "A resizable side panel layout for AI interfaces with collapsible sections.",
  importPath: "@/components/ai-elements/cognite/panel",
};
