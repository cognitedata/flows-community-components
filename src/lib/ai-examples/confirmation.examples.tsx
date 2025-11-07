import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationActions,
  ConfirmationAction,
  ConfirmationRequest,
  ConfirmationAccepted,
} from "@/components/ui/cognite/confirmation";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicConfirmationDemo() {
  return (
    <Confirmation approval={{ approved: true }} state="output-available">
      <ConfirmationTitle>Execute this command?</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction>Approve</ConfirmationAction>
          <ConfirmationAction variant="destructive">Deny</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">Action approved</p>
      </ConfirmationAccepted>
    </Confirmation>
  );
}

function WithRequestStateDemo() {
  return (
    <Confirmation approval={{}} state="approval-requested">
      <ConfirmationTitle>This action requires approval</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction>Confirm</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
    </Confirmation>
  );
}

export const confirmationExamples: ComponentExamples = {
  basic: {
    title: "Basic Confirmation",
    description: "User approval workflow for AI actions",
    component: BasicConfirmationDemo,
    difficulty: "beginner",
    code: `import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ai-elements/cognite/confirmation"

export function BasicConfirmationDemo() {
  return (
    <Confirmation approval={{ approved: true }} state="output-available">
      <ConfirmationTitle>Execute this command?</ConfirmationTitle>
      <ConfirmationActions>
        <ConfirmationAction>Approve</ConfirmationAction>
        <ConfirmationAction variant="destructive">Deny</ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  )
}`,
  },

  requestState: {
    title: "Confirmation Request",
    description: "Confirmation in pending approval state",
    component: WithRequestStateDemo,
    difficulty: "intermediate",
    code: `import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ai-elements/cognite/confirmation"

export function ConfirmationRequestDemo() {
  return (
    <Confirmation approval={{}} state="approval-requested">
      <ConfirmationTitle>Requires approval</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction>Confirm</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
    </Confirmation>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const confirmationMeta = {
  name: "Confirmation",
  description:
    "An alert-based component for managing tool execution approval workflows with request, accept, and reject states.",
  importPath: "@/components/ai-elements/cognite/confirmation",
};
