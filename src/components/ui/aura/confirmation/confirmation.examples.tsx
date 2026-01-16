'use client';

import { useState } from 'react';
import {
  Confirmation,
  ConfirmationContentTrigger,
  ConfirmationContent,
  ConfirmationActions,
  ConfirmationAction,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
} from '@/components/ui/aura/confirmation';
import { CodeBlock } from '@/components/ui/aura/code-block';
import { HelperText } from '@/components/ui/aura/helper-text';
import { IconCircleCheck, IconCheck, IconX } from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

function InteractiveDemo() {
  const [approval, setApproval] = useState<{
    approved?: boolean;
    always?: boolean;
  }>({});
  const [state, setState] = useState<string>('approval-requested');

  const handleAllowOnce = () => {
    console.log('Allowed once - permission granted for this action only');
    setApproval({ approved: true, always: false });
    setState('output-available');
  };

  const handleAlwaysAllow = () => {
    console.log('Always allow - permission saved for future actions');
    setApproval({ approved: true, always: true });
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
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
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
          {approval.always ? (
            <HelperText
              size="xs"
              icon={<IconCircleCheck />}
              isSuccess
              className="self-end"
            >
              Permission allowed always
            </HelperText>
          ) : (
            <HelperText
              size="xs"
              icon={<IconCheck />}
              isSuccess
              className="self-end"
            >
              Permission allowed once
            </HelperText>
          )}
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText size="xs" icon={<IconX />} isError className="self-end">
            Permission skipped
          </HelperText>
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
  const approval = { approved: true, always: false };
  const state = 'output-available';

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <p className="text-sm text-muted-foreground">
          This tool will analyze patterns in your time series data to identify
          trends, seasonality, and anomalies.
        </p>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText size="xs" icon={<IconX />} isError className="self-end">
          Permission skipped
        </HelperText>
      </ConfirmationRejected>
    </Confirmation>
  );
}

function ApprovalRejectedDemo() {
  const approval = { approved: false };
  const state = 'output-denied';

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <p className="text-sm text-muted-foreground">
          This tool will analyze patterns in your time series data to identify
          trends, seasonality, and anomalies.
        </p>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText size="xs" icon={<IconX />} isError className="self-end">
          Permission skipped
        </HelperText>
      </ConfirmationRejected>
    </Confirmation>
  );
}

function WithParagraphsDemo() {
  const approval = { approved: undefined };
  const state = 'approval-requested';

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies. It uses advanced statistical
            methods to detect patterns that might not be immediately visible.
          </p>
          <p>
            The analysis will process your historical data and generate insights
            about recurring patterns, seasonal variations, and potential
            outliers. This information can help you make more informed decisions
            based on your data trends.
          </p>
        </div>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText size="xs" icon={<IconX />} isError className="self-end">
          Permission skipped
        </HelperText>
      </ConfirmationRejected>
    </Confirmation>
  );
}

function WithCodeBlockDemo() {
  const approval = { approved: undefined };
  const state = 'approval-requested';

  const codeToExecute = `import { analyzeTimeSeries } from '@cognite/sdk';

const result = await analyzeTimeSeries({
  dataPoints: timeSeriesData,
  analysisType: 'seasonal-decomposition',
  options: {
    detectAnomalies: true,
    confidenceLevel: 0.95
  }
});

console.log(result.trends, result.seasonality);`;

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            The following code will be executed to analyze your time series
            data:
          </p>
          <CodeBlock language="typescript" code={codeToExecute} />
        </div>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText size="xs" icon={<IconX />} isError className="self-end">
          Permission skipped
        </HelperText>
      </ConfirmationRejected>
    </Confirmation>
  );
}

export const confirmationExamples: ComponentExamples = {
  interactive: {
    title: 'Interactive Demo',
    description:
      'A working example with state management showing the full approval workflow.',
    component: InteractiveDemo,
    difficulty: 'intermediate',
    code: `"use client"

import { useState } from "react"
import {
  Confirmation,
  ConfirmationContentTrigger,
  ConfirmationContent,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"
import { HelperText } from "@/components/ui/aura/helper-text"
import { IconCircleCheck, IconCheck, IconX } from "@tabler/icons-react"

export function InteractiveDemo() {
  const [approval, setApproval] = useState<{
    approved?: boolean;
    always?: boolean;
  }>({})
  const [state, setState] = useState<string>("approval-requested")

  const handleAllowOnce = () => {
    console.log("Allowed once - permission granted for this action only")
    setApproval({ approved: true, always: false })
    setState("output-available")
  }

  const handleAlwaysAllow = () => {
    console.log("Always allow - permission saved for future actions")
    setApproval({ approved: true, always: true })
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
      <Confirmation approval={approval} state={state}>
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
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
          {approval.always ? (
            <HelperText
              size="xs"
              icon={<IconCircleCheck />}
              isSuccess
              className="self-end"
            >
              Permission allowed always
            </HelperText>
          ) : (
            <HelperText
              size="xs"
              icon={<IconCheck />}
              isSuccess
              className="self-end"
            >
              Permission allowed once
            </HelperText>
          )}
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText
            size="xs"
            icon={<IconX />}
            isError
            className="self-end"
          >
            Permission skipped
          </HelperText>
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
  ConfirmationContentTrigger,
  ConfirmationContent,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"
import { Button } from "@/components/ui/aura/button"
import { HelperText } from "@/components/ui/aura/helper-text"
import {
  IconSelector as ChevronsUpDown,
  IconCheck,
  IconX,
} from "@tabler/icons-react"

export function ApprovalAcceptedDemo() {
  const approval = { approved: true, always: false }
  const state = "output-available"

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <p className="text-sm text-muted-foreground">
          This tool will analyze patterns in your time series data to identify
          trends, seasonality, and anomalies.
        </p>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText
          size="xs"
          icon={<IconX />}
          isError
          className="self-end"
        >
          Permission skipped
        </HelperText>
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
  ConfirmationContentTrigger,
  ConfirmationContent,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"
import { HelperText } from "@/components/ui/aura/helper-text"
import { IconCheck, IconX } from "@tabler/icons-react"

export function ApprovalRejectedDemo() {
  const approval = { approved: false }
  const state = "output-denied"

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <p className="text-sm text-muted-foreground">
          This tool will analyze patterns in your time series data to identify
          trends, seasonality, and anomalies.
        </p>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText
          size="xs"
          icon={<IconX />}
          isError
          className="self-end"
        >
          Permission skipped
        </HelperText>
      </ConfirmationRejected>
    </Confirmation>
  )
}`,
  },

  withParagraphs: {
    title: 'With Multiple Paragraphs',
    description:
      'Showing collapsible content with multiple paragraphs of information to help users make informed decisions.',
    component: WithParagraphsDemo,
    difficulty: 'beginner',
    code: `import {
  Confirmation,
  ConfirmationContentTrigger,
  ConfirmationContent,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"
import { HelperText } from "@/components/ui/aura/helper-text"
import { IconCheck, IconX } from "@tabler/icons-react"

export function WithParagraphsDemo() {
  const approval = { approved: undefined }
  const state = "approval-requested"

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies. It uses advanced statistical
            methods to detect patterns that might not be immediately visible.
          </p>
          <p>
            The analysis will process your historical data and generate insights
            about recurring patterns, seasonal variations, and potential
            outliers. This information can help you make more informed decisions
            based on your data trends.
          </p>
        </div>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText
          size="xs"
          icon={<IconX />}
          isError
          className="self-end"
        >
          Permission skipped
        </HelperText>
      </ConfirmationRejected>
    </Confirmation>
  )
}`,
  },

  withCodeBlock: {
    title: 'With Code Block',
    description:
      'Showing collapsible content with a code block to display the exact code that will be executed.',
    component: WithCodeBlockDemo,
    difficulty: 'intermediate',
    code: `import {
  Confirmation,
  ConfirmationContentTrigger,
  ConfirmationContent,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@/components/ui/aura/confirmation"
import { CodeBlock } from "@/components/ui/aura/code-block"
import { HelperText } from "@/components/ui/aura/helper-text"
import { IconCheck, IconX } from "@tabler/icons-react"

export function WithCodeBlockDemo() {
  const approval = { approved: undefined }
  const state = "approval-requested"

  const codeToExecute = \`import { analyzeTimeSeries } from '@cognite/sdk';

const result = await analyzeTimeSeries({
  dataPoints: timeSeriesData,
  analysisType: 'seasonal-decomposition',
  options: {
    detectAnomalies: true,
    confidenceLevel: 0.95
  }
});

console.log(result.trends, result.seasonality);\`

  return (
    <Confirmation approval={approval} state={state}>
      <ConfirmationContentTrigger>
        Atlas needs your permission to run tool &quot;Analyze time series&quot;
      </ConfirmationContentTrigger>
      <ConfirmationContent>
        <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
            The following code will be executed to analyze your time series data:
          </p>
          <CodeBlock language="typescript" code={codeToExecute} />
        </div>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions className="w-full flex justify-between">
          <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
          <div className="flex gap-1">
            <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
            <ConfirmationAction variant="outline">
              Always allow
            </ConfirmationAction>
          </div>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <HelperText
          size="xs"
          icon={<IconCheck />}
          isSuccess
          className="self-end"
        >
          Permission allowed once
        </HelperText>
      </ConfirmationAccepted>
      <ConfirmationRejected>
        <HelperText
          size="xs"
          icon={<IconX />}
          isError
          className="self-end"
        >
          Permission skipped
        </HelperText>
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
