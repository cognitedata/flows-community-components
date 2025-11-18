import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/cognite/alert";
import {
  IconAlertCircle as AlertCircle,
  IconTerminal2 as Terminal,
} from "@tabler/icons-react";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}

function VariantsDemo() {
  return (
    <div className="space-y-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with normal styling.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export const alertExamples: ComponentExamples = {
  basic: {
    title: "Basic Alert",
    description: "A simple alert with title and description",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/cognite/alert"
import { Terminal } from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <div className="space-y-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  )
}`,
  },
  variants: {
    title: "Alert Variants",
    description: "Different alert styles for various contexts",
    component: VariantsDemo,
    difficulty: "beginner",
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/cognite/alert"
import { Terminal, AlertCircle } from "@tabler/icons-react"

export function VariantsDemo() {
  return (
    <div className="space-y-4">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with normal styling.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const alertMeta = {
  name: "Alert",
  description: "Displays a callout for user attention with different severity levels.",
  llmUsage: "When showing alerts or notifications, use `<Alert>` with `<AlertTitle>` and `<AlertDescription>` components.",
  importPath: "@/components/ui/cognite/alert",
};
