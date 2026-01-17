
import { Alert } from '@/components/ui/aura/alert';
import { Button } from '@/components/ui/aura/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/aura/collapsible';
import { HelperText } from '@/components/ui/aura/helper-text';
import { cn } from '@/lib/utils';
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from 'react';
import { IconAlertTriangle, IconChevronDown } from '@tabler/icons-react';

type ApprovalType = {
  approved?: boolean;
  [key: string]: unknown;
};

type ConfirmationContextValue = {
  approval: ApprovalType;
  state: string;
};

const ConfirmationContext = createContext<ConfirmationContextValue | null>(
  null
);

const useConfirmation = () => {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation');
  }

  return context;
};

export type ConfirmationProps = ComponentProps<typeof Alert> & {
  approval?: ApprovalType;
  state: string;
  helperText?: ReactNode | false;
};

export const Confirmation = ({
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
        className={cn(
          'flex flex-col gap-2 p-3 bg-background text-foreground border-none',
          className
        )}
        {...props}
      >
        <Collapsible className="flex flex-col gap-2 overflow-hidden">{children}</Collapsible>
        {helperTextToRender}
      </Alert>
    </ConfirmationContext.Provider>
  );
};

export type ConfirmationContentTriggerProps = ComponentProps<typeof Button>;

export const ConfirmationContentTrigger = ({
  className,
  children,
  ...props
}: ConfirmationContentTriggerProps) => (
  <CollapsibleTrigger asChild>
    <Button
      variant="ghost"
      className={cn(
        'group/collapsible-trigger w-full justify-between text-base leading-5 tracking-tighter',
        className
      )}
      {...props}
    >
      <span className="flex-1 min-w-0 text-left truncate">{children}</span>
      <IconChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible-trigger:rotate-180" />
    </Button>
  </CollapsibleTrigger>
);

export type ConfirmationContentProps = ComponentProps<
  typeof CollapsibleContent
>;

export const ConfirmationContent = ({
  className,
  ...props
}: ConfirmationContentProps) => (
  <CollapsibleContent className={cn('px-3', className)} {...props} />
);

export type ConfirmationRequestProps = {
  children?: ReactNode;
};

export const ConfirmationRequest = ({ children }: ConfirmationRequestProps) => {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== 'approval-requested') {
    return null;
  }

  return children;
};

export type ConfirmationAcceptedProps = {
  children?: ReactNode;
};

export const ConfirmationAccepted = ({
  children,
}: ConfirmationAcceptedProps) => {
  const { approval, state } = useConfirmation();

  // Only show when approved and in response states
  if (
    !approval?.approved ||
    (state !== 'approval-responded' &&
      state !== 'output-denied' &&
      state !== 'output-available')
  ) {
    return null;
  }

  return <div className="flex justify-end">{children}</div>;
};

export type ConfirmationRejectedProps = {
  children?: ReactNode;
};

export const ConfirmationRejected = ({
  children,
}: ConfirmationRejectedProps) => {
  const { approval, state } = useConfirmation();

  // Only show when rejected and in response states
  if (
    approval?.approved !== false ||
    (state !== 'approval-responded' &&
      state !== 'output-denied' &&
      state !== 'output-available')
  ) {
    return null;
  }

  return <div className="flex justify-end">{children}</div>;
};

export type ConfirmationActionsProps = ComponentProps<'div'>;

export const ConfirmationActions = ({
  className,
  ...props
}: ConfirmationActionsProps) => {
  const { state } = useConfirmation();

  // Only show when approval is requested
  if (state !== 'approval-requested') {
    return null;
  }

  return (
    <div
      className={cn('flex items-center justify-end gap-2 self-end', className)}
      {...props}
    />
  );
};

export type ConfirmationActionProps = ComponentProps<typeof Button>;

export const ConfirmationAction = (props: ConfirmationActionProps) => (
  <Button type="button" {...props} />
);
