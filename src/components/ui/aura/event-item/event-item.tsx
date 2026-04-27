import { cva } from 'class-variance-authority';
import {
  addDays,
  format as formatDate,
  formatDistanceStrict,
  isBefore,
  isSameDay,
  isValid,
} from 'date-fns';
import {
  type ComponentProps,
  createContext,
  forwardRef,
  type ReactNode,
  useContext,
  useRef,
} from 'react';

import { cn } from '../../../../lib/utils';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type EventItemVariant = 'upcoming' | 'now' | 'completed' | 'error';
type DateValue = Date | string | number;
type EventItemDateFormat =
  | 'absolute'
  | 'relative'
  | 'calendar'
  | string
  | ((date: Date, referenceDate: Date) => ReactNode);

type EventItemContextValue = {
  variant?: EventItemVariant;
  date?: DateValue;
  completed?: boolean;
  now: Date;
};

const EventItemContext = createContext<EventItemContextValue>({
  now: new Date(),
});

const eventItemIconVariants = cva('', {
  variants: {
    variant: {
      upcoming: 'text-muted-foreground',
      now: 'text-card-foreground',
      completed: 'text-muted-foreground',
      error: 'text-destructive-foreground',
    },
  },
});

const eventItemTitleVariants = cva('', {
  variants: {
    variant: {
      upcoming: 'text-muted-foreground',
      now: 'text-foreground',
      completed: 'text-muted-foreground',
      error: 'text-foreground',
    },
  },
});

const eventItemStatusVariants = cva('', {
  variants: {
    variant: {
      upcoming: 'text-muted-foreground',
      now: 'text-muted-foreground',
      completed: 'text-muted-foreground',
      error: 'text-destructive-foreground',
    },
  },
});

const toValidDate = (value?: DateValue): Date | undefined => {
  if (value === undefined) {
    return undefined;
  }

  const date = value instanceof Date ? value : new Date(value);
  return isValid(date) ? date : undefined;
};

const getComputedStatusLabel = (params: {
  date?: DateValue;
  completed?: boolean;
  now: Date;
}): string | undefined => {
  const { date, completed, now } = params;

  if (completed) {
    return 'Completed';
  }

  const targetDate = toValidDate(date);
  if (!targetDate) {
    return undefined;
  }

  if (isSameDay(targetDate, now)) {
    return 'Due today';
  }

  if (isBefore(targetDate, now)) {
    return 'Overdue';
  }

  return `Due ${formatDistanceStrict(targetDate, now, { addSuffix: true })}`;
};

const getComputedVariant = (params: {
  variant?: EventItemVariant;
  date?: DateValue;
  completed?: boolean;
  now: Date;
}): EventItemVariant | undefined => {
  const { variant, date, completed, now } = params;

  if (variant) {
    return variant;
  }

  if (completed) {
    return 'completed';
  }

  const targetDate = toValidDate(date);
  if (!targetDate) {
    return undefined;
  }

  if (isSameDay(targetDate, now)) {
    return 'now';
  }

  if (isBefore(targetDate, now)) {
    return 'error';
  }

  return 'upcoming';
};

const formatCalendarDate = (targetDate: Date, referenceDate: Date): string => {
  if (isSameDay(targetDate, referenceDate)) {
    return 'Today';
  }

  if (isSameDay(targetDate, addDays(referenceDate, 1))) {
    return 'Tomorrow';
  }

  if (isSameDay(targetDate, addDays(referenceDate, -1))) {
    return 'Yesterday';
  }

  return formatDate(targetDate, 'MMM d, yyyy h:mm a');
};

const getFormattedDate = (params: {
  date: Date;
  referenceDate: Date;
  format?: EventItemDateFormat;
}): ReactNode => {
  const { date, referenceDate, format } = params;

  if (typeof format === 'function') {
    return format(date, referenceDate);
  }

  if (format === 'relative') {
    return formatDistanceStrict(date, referenceDate, { addSuffix: true });
  }

  if (format === 'calendar') {
    return formatCalendarDate(date, referenceDate);
  }

  if (typeof format === 'string' && format !== 'absolute') {
    return formatDate(date, format);
  }

  return formatDate(date, 'MMM d, yyyy h:mm a');
};

const DefaultEventItemIcon = ({ variant }: { variant: EventItemVariant }) => {
  if (variant === 'completed') {
    return (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1426 4.47851C11.4306 4.14359 11.9355 4.10563 12.2706 4.39355C12.6055 4.68154 12.6434 5.18645 12.3555 5.52148L7.19927 11.5215C7.04729 11.6982 6.82592 11.7998 6.59282 11.7998C6.35972 11.7998 6.13835 11.6982 5.98638 11.5215L3.64263 8.79394C3.35468 8.45887 3.39255 7.95399 3.72759 7.66601C4.06257 7.37814 4.5675 7.41619 4.85552 7.75097L6.59282 9.77246L11.1426 4.47851Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (variant === 'now') {
    return (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.15" cx="8" cy="8" r="7" fill="currentColor" />
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </svg>
  );
};

const EventItem = forwardRef<
  HTMLDivElement,
  ComponentProps<'div'> & {
    variant?: EventItemVariant;
    date?: DateValue;
    completed?: boolean;
    now?: DateValue;
  }
>(({ className, variant, date, completed, now, ...props }, ref) => {
  const defaultNowRef = useRef<Date>(new Date());
  const nowDate = toValidDate(now) ?? defaultNowRef.current;
  const resolvedVariant = getComputedVariant({
    variant,
    date,
    completed,
    now: nowDate,
  });

  return (
    <EventItemContext.Provider
      value={{
        variant: resolvedVariant,
        date,
        completed,
        now: nowDate,
      }}
    >
      <div
        ref={ref}
        data-slot="event-item"
        data-variant={resolvedVariant}
        className={cn(
          'grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-2 gap-y-1',
          className
        )}
        {...props}
      />
    </EventItemContext.Provider>
  );
});
EventItem.displayName = 'EventItem';

const EventItemIcon = forwardRef<
  HTMLSpanElement,
  ComponentProps<'span'> & { variant?: EventItemVariant }
>(({ className, children, variant, ...props }, ref) => {
  const { variant: contextVariant } = useContext(EventItemContext);
  const resolvedVariant = variant ?? contextVariant;
  const decorative = !props['aria-label'] && !props['aria-labelledby'];

  return (
    <span
      ref={ref}
      data-slot="event-item-icon"
      aria-hidden={decorative ? true : undefined}
      className={cn(
        'col-start-1 row-span-2 inline-flex h-4 w-4 mt-px items-center justify-center text-muted-foreground',
        eventItemIconVariants({ variant: resolvedVariant }),
        className
      )}
      {...props}
    >
      {children ??
        (resolvedVariant ? (
          <DefaultEventItemIcon variant={resolvedVariant} />
        ) : null)}
    </span>
  );
});
EventItemIcon.displayName = 'EventItemIcon';

const EventItemTitle = forwardRef<
  HTMLHeadingElement,
  ComponentProps<'h3'> & { as?: HeadingElement }
>(({ className, as: Tag = 'h3', ...props }, ref) => {
  const { variant } = useContext(EventItemContext);

  return (
    <Tag
      ref={ref}
      data-slot="event-item-title"
      className={cn(
        'col-start-2 row-start-1 text-sm font-medium leading-4.5',
        eventItemTitleVariants({ variant }),
        className
      )}
      {...props}
    />
  );
});
EventItemTitle.displayName = 'EventItemTitle';

const EventItemStatus = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  ({ className, children, ...props }, ref) => {
    const { variant, date, completed, now } = useContext(EventItemContext);
    const computedLabel = getComputedStatusLabel({ date, completed, now });
    const renderedLabel = children ?? computedLabel;

    if (!renderedLabel) {
      return null;
    }

    return (
      <span
        ref={ref}
        data-slot="event-item-status"
        aria-label={
          props['aria-label'] ??
          (typeof renderedLabel === 'string'
            ? `Status: ${renderedLabel}`
            : undefined)
        }
        className={cn(
          'col-start-3 row-start-1 justify-self-end whitespace-nowrap text-right text-sm font-medium leading-4.5',
          eventItemStatusVariants({ variant }),
          className
        )}
        {...props}
      >
        {renderedLabel}
      </span>
    );
  }
);
EventItemStatus.displayName = 'EventItemStatus';

const EventItemDescription = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="event-item-description"
        className={cn(
          'col-start-2 row-start-2 text-sm leading-4.5 text-muted-foreground',
          className
        )}
        {...props}
      />
    );
  }
);
EventItemDescription.displayName = 'EventItemDescription';

const EventItemDate = forwardRef<
  HTMLTimeElement,
  Omit<ComponentProps<'time'>, 'dateTime' | 'children'> & {
    date?: DateValue;
    referenceDate?: DateValue;
    format?: EventItemDateFormat;
    children?: ReactNode;
  }
>(({ className, date, referenceDate, format, children, ...props }, ref) => {
  const context = useContext(EventItemContext);
  const targetDate = toValidDate(date ?? context.date);
  const baseDate = toValidDate(referenceDate) ?? context.now;

  if (!targetDate) {
    return null;
  }

  const renderedLabel =
    children ??
    getFormattedDate({
      date: targetDate,
      referenceDate: baseDate,
      format,
    });

  return (
    <time
      ref={ref}
      data-slot="event-item-date"
      dateTime={targetDate.toISOString()}
      title={formatDate(targetDate, 'MMM d, yyyy h:mm a')}
      className={cn(
        'col-start-2 row-start-2 text-sm leading-4.5 text-muted-foreground',
        className
      )}
      {...props}
    >
      {renderedLabel}
    </time>
  );
});
EventItemDate.displayName = 'EventItemDate';

export {
  EventItem,
  EventItemDate,
  EventItemDescription,
  EventItemIcon,
  EventItemStatus,
  EventItemTitle,
};
