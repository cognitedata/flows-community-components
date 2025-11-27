'use client';

import { useState } from 'react';
import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationActions,
  ConfirmationAction,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
} from '@/components/ui/aura/confirmation';
import type { ComponentExamples } from '@/lib/component-examples/types';

function InteractiveConfirmationDemo() {
  const [approval, setApproval] = useState<{ approved?: boolean }>({});
  const [state, setState] = useState<string>('approval-requested');

  const handleAllowOnce = () => {
    console.log('Allowed once - permission granted for this action only');
    setApproval({ approved: true });
    setState('output-available');
  };

  const handleAlwaysAllow = () => {
    console.log('Always allow - permission saved for future actions');
    setApproval({ approved: true });
    setState('output-available');
  };

  const handleDeny = () => {
    setApproval({ approved: false });
    setState('output-denied');
  };

  const handleReset = () => {
    setApproval({});
    setState('approval-requested');
  };

  return (
    <div className="w-full space-y-4">
      <Confirmation approval={approval} state={state}>
        <ConfirmationTitle>
          Agent wants to create a new file: config.json
        </ConfirmationTitle>
        <ConfirmationRequest>
          <p className="mb-3 text-sm text-muted-foreground">
            This will create a configuration file in your project root.
          </p>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost" onClick={handleDeny}>
              Skip
            </ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost" onClick={handleAllowOnce}>
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline" onClick={handleAlwaysAllow}>
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <p className="text-sm text-muted-foreground">
            ✓ File created successfully
          </p>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <p className="text-sm text-muted-foreground">
            ✗ File creation was cancelled
          </p>
        </ConfirmationRejected>
      </Confirmation>

      {state !== 'approval-requested' && (
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          Reset demo
        </button>
      )}
    </div>
  );
}

function ApprovalAcceptedDemo() {
  const approval = { approved: true };
  const state = 'output-available';

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationTitle>Execute shell command</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction variant="outline">Deny</ConfirmationAction>
          <ConfirmationAction>Approve</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">
          ✓ Action approved and executed successfully
        </p>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <p className="text-sm text-muted-foreground">✗ Action was rejected</p>
      </ConfirmationRejected>
    </Confirmation>
  );
}

function ApprovalRejectedDemo() {
  const approval = { approved: false };
  const state = 'output-denied';

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationTitle>Execute shell command</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction variant="outline">Deny</ConfirmationAction>
          <ConfirmationAction>Approve</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">✓ Action approved</p>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <p className="text-sm text-muted-foreground">
          ✗ Action rejected by user. The command was not executed.
        </p>
      </ConfirmationRejected>
    </Confirmation>
  );
}

export const confirmationExamples: ComponentExamples = {
  interactive: {
    title: 'Interactive Demo',
    description:
      'A working example with state management showing the full approval workflow.',
    component: InteractiveConfirmationDemo,
    difficulty: 'intermediate',
    code: `"use client"

import { useState } from "react"
import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"

export function InteractiveConfirmationDemo() {
  const [approval, setApproval] = useState<{ approved?: boolean }>({})
  const [state, setState] = useState<string>("approval-requested")

  const handleAllowOnce = () => {
    console.log("Allowed once - permission granted for this action only")
    setApproval({ approved: true })
    setState("output-available")
  }

  const handleAlwaysAllow = () => {
    console.log("Always allow - permission saved for future actions")
    setApproval({ approved: true })
    setState("output-available")
  }

  const handleDeny = () => {
    setApproval({ approved: false })
    setState("output-denied")
  }

  const handleReset = () => {
    setApproval({})
    setState("approval-requested")
  }

  return (
    <div className="w-full space-y-4">
      {/* helperText shows by default. Use helperText={false} to hide,
          or pass a custom ReactNode to override. */}
      <Confirmation approval={approval} state={state}>
        <ConfirmationTitle>
          Agent wants to create a new file: config.json
        </ConfirmationTitle>
        <ConfirmationRequest>
          <p className="mb-3 text-sm text-muted-foreground">
            This will create a configuration file in your project root.
          </p>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost" onClick={handleDeny}>
              Skip
            </ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost" onClick={handleAllowOnce}>
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline" onClick={handleAlwaysAllow}>
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <p className="text-sm text-muted-foreground">
            ✓ File created successfully
          </p>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <p className="text-sm text-muted-foreground">
            ✗ File creation was cancelled
          </p>
        </ConfirmationRejected>
      </Confirmation>

      {state !== "approval-requested" && (
        <button
          onClick={handleReset}
          className="text-sm text-muted-foreground underline hover:text-foreground"
        >
          Reset demo
        </button>
      )}
    </div>
  )
}`,
  },

  approvalAccepted: {
    title: 'Approval Accepted',
    description:
      'State after user approves an action. The ConfirmationAccepted content is displayed.',
    component: ApprovalAcceptedDemo,
    difficulty: 'beginner',
    code: `import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"

export function ApprovalAcceptedDemo() {
  const approval = { approved: true }
  const state = "output-available"

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationTitle>Execute shell command</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction variant="outline">Deny</ConfirmationAction>
          <ConfirmationAction>Approve</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">
          ✓ Action approved and executed successfully
        </p>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <p className="text-sm text-muted-foreground">✗ Action was rejected</p>
      </ConfirmationRejected>
    </Confirmation>
  )
}`,
  },

  approvalRejected: {
    title: 'Approval Rejected',
    description:
      'State after user denies an action. The ConfirmationRejected content is displayed.',
    component: ApprovalRejectedDemo,
    difficulty: 'beginner',
    code: `import {
  Confirmation,
  ConfirmationTitle,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"

export function ApprovalRejectedDemo() {
  const approval = { approved: false }
  const state = "output-denied"

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationTitle>Execute shell command</ConfirmationTitle>
      <ConfirmationRequest>
        <ConfirmationActions>
          <ConfirmationAction variant="outline">Deny</ConfirmationAction>
          <ConfirmationAction>Approve</ConfirmationAction>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <p className="text-sm text-muted-foreground">✓ Action approved</p>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <p className="text-sm text-muted-foreground">
          ✗ Action rejected by user. The command was not executed.
        </p>
      </ConfirmationRejected>
    </Confirmation>
  )
}`,
  },
};

export const confirmationMeta = {
  name: 'Confirmation',
  description:
    'An alert-based component for managing tool execution approval workflows with request, accept, and reject states.',
  importPath: '@/components/ui/aura/confirmation',
};
