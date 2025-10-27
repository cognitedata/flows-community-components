import { Alert, AlertDescription, AlertTitle } from "@/components/ui/cognite/alert";
import { Terminal, AlertCircle } from "lucide-react";
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
import { Terminal } from "lucide-react"

export function BasicDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}`,
  },
  variants: {
    title: "Alert Variants",
    description: "Different alert styles for various contexts",
    component: VariantsDemo,
    difficulty: "beginner",
    code: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/cognite/alert"
import { Terminal, AlertCircle } from "lucide-react"

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

