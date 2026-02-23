import { IconAlertTriangle, IconChevronDown } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
} from 'react';

import { cn } from '../../../../lib/utils';
import { Alert } from '../alert';
import { Button } from '../button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';
import { HelperText } from '../helper-text';

type Approval = {
  approved?: boolean;
  [key: string]: unknown;
};

type ConfirmationContextValue = {
  approval: Approval;
  state: string;
};

const ConfirmationContext = createContext<ConfirmationContextValue | null>(
  null
);

function useConfirmation() {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation');
  }

  return context;
}

type ConfirmationProps = ComponentProps<typeof Alert> & {
  approval?: Approval;
  state: string;
  helperText?: ReactNode | false;
};

const Confirmation = ({
  className,
  approval,
  state,
  helperText,
  children,
  ...props
}: ConfirmationProps) => {
  if (!approval || state === 'input-streaming' || state === 'input-available') {
    return null;
  }

  const defaultHelperText = (
    <HelperText size="xs" icon={<IconAlertTriangle />} className="self-end">
      Only allow tools that you trust
    </HelperText>
  );

  const helperTextToRender =
    state !== 'approval-requested' || helperText === false
      ? null
      : (helperText ?? defaultHelperText);

  return (
    <ConfirmationContext.Provider value={{ approval, state }}>
      <Alert
        data-slot="confirmation"
        className={cn(
          'flex flex-col gap-2 p-3 bg-background text-foreground border-none',
          className
        )}
        {...props}
      >
        <Collapsible
          data-slot="confirmation-collapsible"
          className="flex flex-col gap-2 overflow-hidden"
        >
          {children}
        </Collapsible>
        {helperTextToRender}
      </Alert>
    </ConfirmationContext.Provider>
  );
};

type ConfirmationContentTriggerProps = ComponentProps<typeof Button>;

const ConfirmationContentTrigger = ({
  className,
  children,
  ...props
}: ConfirmationContentTriggerProps) => (
  <CollapsibleTrigger
    render={
      <Button
        data-slot="confirmation-content-trigger"
        variant="ghost"
        className={cn(
          'group/collapsible-trigger w-full justify-between text-base leading-5 tracking-tighter',
          className
        )}
        {...props}
      >
        <span className="flex-1 min-w-0 text-left truncate">{children}</span>
        <IconChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[open]/collapsible-trigger:rotate-180" />
      </Button>
    }
  />
);

type ConfirmationContentProps = ComponentProps<typeof CollapsibleContent>;

const ConfirmationContent = ({
  className,
  ...props
}: ConfirmationContentProps) => (
  <CollapsibleContent
    data-slot="confirmation-content"
    className={cn('px-3', className)}
    {...props}
  />
);

type ConfirmationRequestProps = {
  children?: ReactNode;
};

const ConfirmationRequest = ({ children }: ConfirmationRequestProps) => {
  const { state } = useConfirmation();

  if (state !== 'approval-requested') {
    return null;
  }

  return <div data-slot="confirmation-request">{children}</div>;
};

type ConfirmationAcceptedProps = {
  children?: ReactNode;
};

const ConfirmationAccepted = ({ children }: ConfirmationAcceptedProps) => {
  const { approval, state } = useConfirmation();

  if (
    !approval?.approved ||
    (state !== 'approval-responded' &&
      state !== 'output-denied' &&
      state !== 'output-available')
  ) {
    return null;
  }

  return (
    <div data-slot="confirmation-accepted" className="flex justify-end">
      {children}
    </div>
  );
};

type ConfirmationRejectedProps = {
  children?: ReactNode;
};

const ConfirmationRejected = ({ children }: ConfirmationRejectedProps) => {
  const { approval, state } = useConfirmation();

  if (
    approval?.approved !== false ||
    (state !== 'approval-responded' &&
      state !== 'output-denied' &&
      state !== 'output-available')
  ) {
    return null;
  }

  return (
    <div data-slot="confirmation-rejected" className="flex justify-end">
      {children}
    </div>
  );
};

type ConfirmationActionsProps = ComponentProps<'div'>;

const ConfirmationActions = ({
  className,
  ...props
}: ConfirmationActionsProps) => {
  const { state } = useConfirmation();

  if (state !== 'approval-requested') {
    return null;
  }

  return (
    <div
      data-slot="confirmation-actions"
      className={cn('flex items-center justify-end gap-2 self-end', className)}
      {...props}
    />
  );
};

type ConfirmationActionProps = ComponentProps<typeof Button>;

const ConfirmationAction = (props: ConfirmationActionProps) => (
  <Button data-slot="confirmation-action" type="button" {...props} />
);

export {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationContent,
  ConfirmationContentTrigger,
  ConfirmationRejected,
  ConfirmationRequest,
};
