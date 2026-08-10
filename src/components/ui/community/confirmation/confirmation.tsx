import {
  Alert,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconChevronDown } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { getHelperTextToRender } from './confirmation.utils';

type ConfirmationState =
  | 'input-streaming'
  | 'input-available'
  | 'approval-requested'
  | 'approval-responded'
  | 'output-denied'
  | 'output-available';

type ConfirmationResponseState =
  'approval-responded' | 'output-denied' | 'output-available';

type ConfirmationContextValue = {
  approved?: boolean;
  state: ConfirmationState;
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

const isResponseState = (
  state: ConfirmationState
): state is ConfirmationResponseState =>
  state === 'approval-responded' ||
  state === 'output-denied' ||
  state === 'output-available';

type ConfirmationProps = ComponentProps<typeof Alert> & {
  approved?: boolean;
  state: ConfirmationState;
  helperText?: ReactNode;
};

const Confirmation = ({
  className,
  approved,
  state,
  helperText,
  children,
  ...props
}: ConfirmationProps): ReactNode => {
  const contextValue = useMemo(() => ({ approved, state }), [approved, state]);

  if (state === 'input-streaming' || state === 'input-available') {
    return null;
  }

  const helperTextToRender = getHelperTextToRender(state, helperText);

  return (
    <ConfirmationContext.Provider value={contextValue}>
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
}: ConfirmationContentTriggerProps): ReactNode => (
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
        <IconChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-open/collapsible-trigger:rotate-180" />
      </Button>
    }
  />
);

type ConfirmationContentProps = ComponentProps<typeof CollapsibleContent>;

const ConfirmationContent = ({
  className,
  ...props
}: ConfirmationContentProps): ReactNode => (
  <CollapsibleContent
    data-slot="confirmation-content"
    className={cn('px-3', className)}
    {...props}
  />
);

type ConfirmationRequestProps = {
  children?: ReactNode;
};

const ConfirmationRequest = ({
  children,
}: ConfirmationRequestProps): ReactNode => {
  const { state } = useConfirmation();

  if (state !== 'approval-requested') {
    return null;
  }

  return <div data-slot="confirmation-request">{children}</div>;
};

type ConfirmationAcceptedProps = {
  children?: ReactNode;
};

const ConfirmationAccepted = ({
  children,
}: ConfirmationAcceptedProps): ReactNode => {
  const { approved, state } = useConfirmation();

  if (!approved || !isResponseState(state)) {
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

const ConfirmationRejected = ({
  children,
}: ConfirmationRejectedProps): ReactNode => {
  const { approved, state } = useConfirmation();

  if (approved || !isResponseState(state)) {
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
}: ConfirmationActionsProps): ReactNode => {
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

const ConfirmationAction = (props: ConfirmationActionProps): ReactNode => (
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
  type ConfirmationState,
};
