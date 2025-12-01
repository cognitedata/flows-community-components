import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertButton,
} from '@/components/ui/aura/alert';
import {
  IconUserCircle,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertHexagon,
  IconRocket,
} from '@tabler/icons-react';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-4">
      <Alert
        className="w-[401px]"
        onClose={() => {
          console.log('close');
        }}
      >
        <IconInfoCircle className="h-3.5 w-3.5" />
        <AlertTitle>Account verification required</AlertTitle>
        <AlertDescription>
          Please check your email and click the verification link to activate
          your account.
        </AlertDescription>
      </Alert>
      <Alert variant="secondary" className="w-[401px]">
        <IconUserCircle className="h-3.5 w-3.5" />
        <AlertDescription>
          Changes will not be saved until you click ‘Update’.
        </AlertDescription>
      </Alert>
      <Alert
        variant="warning"
        className="w-[401px]"
        onClose={() => {
          console.log('close');
        }}
      >
        <IconAlertTriangle className="h-3.5 w-3.5" />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          You're using 90% of your available storage. Consider upgrading your
          plan.
        </AlertDescription>
        <AlertButton className="text-card-foreground">
          <IconRocket /> Upgrade plan
        </AlertButton>
      </Alert>
      <Alert variant="error" className="w-[401px]">
        <IconAlertHexagon className="h-3.5 w-3.5" />
        <AlertTitle>Unable to connect data</AlertTitle>
        <AlertDescription>
          Verify you have the correct ID and try again.
        </AlertDescription>
        <AlertButton className="text-card-foreground">
          <IconRocket /> Try again
        </AlertButton>
      </Alert>
    </div>
  );
}

function VariantsDemo() {
  return <div className="space-y-4"></div>;
}

export const alertExamples: ComponentExamples = {
  basic: {
    title: 'Basic Alert',
    description: 'A simple alert with title and description',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/aura/alert';
import { IconTerminal2 as Terminal } from '@tabler/icons-react';

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
  );
}
`,
  },
  variants: {
    title: 'Alert Variants',
    description: 'Different alert styles for various contexts',
    component: VariantsDemo,
    difficulty: 'beginner',
    code: `
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/aura/alert';
import {
  IconAlertCircle as AlertCircle,
  IconTerminal2 as Terminal,
} from '@tabler/icons-react';

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
  );
}
`,
  },
};

// Component metadata - single source of truth for API documentation
export const alertMeta = {
  name: 'Alert',
  description:
    'Displays a callout for user attention with different severity levels.',
  llmUsage:
    'When showing alerts or notifications, use `<Alert>` with `<AlertTitle>` and `<AlertDescription>` components.',
  importPath: '@/components/ui/aura/alert',
};
