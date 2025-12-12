import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertActions,
  AlertButton,
} from '@/components/ui/aura/alert';
import {
  IconUser,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertHexagon,
} from '@tabler/icons-react';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <Alert
        onClose={() => {
          console.log('close');
        }}
      >
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Account verification required</AlertTitle>
        <AlertDescription>
          Please check your email and click the verification link to activate
          your account.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="-ml-2.25">Verify account</AlertButton>
        </AlertActions>
      </Alert>
      <Alert variant="secondary">
        <IconUser className="w-3.5 h-3.5 mt-0.5" />
        <AlertDescription>
          Changes will not be saved until you click &apos;Update&apos;.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="-ml-2.25">Update</AlertButton>
        </AlertActions>
      </Alert>
      <Alert
        variant="warning"
        onClose={() => {
          console.log('close');
        }}
      >
        <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          You&apos;re using 90% of your available storage. Consider upgrading
          your plan.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="-ml-2.25">Upgrade plan</AlertButton>
        </AlertActions>
      </Alert>
      <Alert variant="error">
        <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Unable to connect data</AlertTitle>
        <AlertDescription>
          Verify you have the correct ID and try again.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="text-card-foreground -ml-2.25">
            Try again
          </AlertButton>
        </AlertActions>
      </Alert>
    </div>
  );
}

export const alertExamples: ComponentExamples = {
  basic: {
    title: 'Basic Alert',
    description: 'Alerts with different variants and actions',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Alert,
  AlertDescription,
  AlertTitle,
  AlertActions,
  AlertButton,
} from '@/components/ui/aura/alert'
import {
  IconUser,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertHexagon,
} from '@tabler/icons-react'

export function BasicDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
      <Alert
        onClose={() => {
          console.log('close')
        }}
      >
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Account verification required</AlertTitle>
        <AlertDescription>
          Please check your email and click the verification link to activate
          your account.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="-ml-2.25">Verify account</AlertButton>
        </AlertActions>
      </Alert>
      <Alert variant="secondary">
        <IconUser className="w-3.5 h-3.5 mt-0.5" />
        <AlertDescription>
          Changes will not be saved until you click 'Update'.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="-ml-2.25">Update</AlertButton>
        </AlertActions>
      </Alert>
      <Alert
        variant="warning"
        onClose={() => {
          console.log('close')
        }}
      >
        <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          You're using 90% of your available storage. Consider upgrading
          your plan.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="-ml-2.25">Upgrade plan</AlertButton>
        </AlertActions>
      </Alert>
      <Alert variant="error">
        <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Unable to connect data</AlertTitle>
        <AlertDescription>
          Verify you have the correct ID and try again.
        </AlertDescription>
        <AlertActions>
          <AlertButton className="text-card-foreground -ml-2.25">
            Try again
          </AlertButton>
        </AlertActions>
      </Alert>
    </div>
  )
}`,
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
