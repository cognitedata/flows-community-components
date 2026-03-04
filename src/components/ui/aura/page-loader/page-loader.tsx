import { forwardRef, type ComponentProps, type ComponentRef } from 'react';

import { cn } from '../../../../lib/utils';

type PageLoaderProps = ComponentProps<'div'> & {
  animationDuration?: number;
  disableFixedCenter?: boolean;
  info?: { title: string; content?: string };
};

const PageLoader = forwardRef<ComponentRef<'div'>, PageLoaderProps>(
  (
    {
      className,
      animationDuration = 2,
      disableFixedCenter = false,
      info,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="page-loader"
        role="status"
        aria-live="polite"
        className={cn(
          'w-75 flex items-center justify-center flex-col',
          disableFixedCenter
            ? 'relative'
            : 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading page...</span>
        <svg
          viewBox="0 0 167 216"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-1/2 max-w-24"
          aria-hidden="true"
        >
          <rect
            x="10"
            y="10"
            width="98"
            height="196"
            rx="49"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="97.95 152"
            strokeDashoffset="172"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="172;422;422"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              dur={`${animationDuration}s`}
              repeatCount="indefinite"
            />
          </rect>
          <rect
            x="59"
            y="10"
            width="98"
            height="196"
            rx="49"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray="97.95 152"
            strokeDashoffset="422"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="422;172;172"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              begin={`${animationDuration / 4.5}s`}
              dur={`${animationDuration}s`}
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        {info ? (
          <div className="mt-2.5 flex flex-col">
            <p className={cn('my-4 text-center text-base font-bold')}>
              {info.title}
            </p>
            <div className="relative bg-transparent text-center whitespace-pre-wrap shadow-none">
              <div className={cn('mx-auto text-sm font-normal')}>
                {info?.content}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
);

PageLoader.displayName = 'PageLoader';

export { PageLoader };
