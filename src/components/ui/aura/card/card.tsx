import { IconDotsVertical } from '@tabler/icons-react';
import {
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  forwardRef,
} from 'react';

import { cn } from '../../../../lib/utils';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../dropdown-menu';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const Card = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card"
        className={cn(
          'bg-card text-card-foreground flex flex-col rounded-lg hover:bg-accent',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardTitle = forwardRef<
  ComponentRef<'h3'>,
  ComponentProps<'h3'> & { as?: HeadingElement }
>(({ className, as: Tag = 'h3', ...props }, ref) => {
  return (
    <Tag
      ref={ref}
      data-slot="card-title"
      className={cn(
        'tracking-tightest text-foreground text-lg font-medium',
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<ComponentRef<'p'>, ComponentProps<'p'>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="card-description"
        className={cn('text-muted-foreground text-sm', className)}
        {...props}
      />
    );
  }
);
CardDescription.displayName = 'CardDescription';

const CardHeader = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header"
        className={cn('flex items-start gap-2 px-4 pt-4', className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

const CardHeaderLeft = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header-left"
        className={cn('self-start', className)}
        {...props}
      >
        <div className="flex items-start">{children}</div>
      </div>
    );
  }
);
CardHeaderLeft.displayName = 'CardHeaderLeft';

const CardHeaderContent = forwardRef<
  ComponentRef<'div'>,
  ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="card-header-content"
      className={cn(
        'grid min-w-0 flex-1 content-center self-stretch',
        className
      )}
      {...props}
    />
  );
});
CardHeaderContent.displayName = 'CardHeaderContent';

const CardHeaderRight = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-header-right"
        className={cn('ml-auto self-start flex items-start', className)}
        {...props}
      />
    );
  }
);
CardHeaderRight.displayName = 'CardHeaderRight';

const CardActions = forwardRef<
  ComponentRef<typeof Button>,
  Omit<ComponentProps<typeof DropdownMenu>, 'children'> & {
    children?: ReactNode;
    align?: 'start' | 'center' | 'end';
  }
>(({ children, align = 'end', ...props }, ref) => {
  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon-sm" ref={ref}>
            <IconDotsVertical />
          </Button>
        }
      />
      <DropdownMenuContent align={align}>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
});
CardActions.displayName = 'CardActions';

const CardContent = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-content"
        className={cn('p-4', className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer"
        className={cn('flex justify-between px-4 pb-4', className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

const CardFooterLeft = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer-left"
        className={cn('', className)}
        {...props}
      />
    );
  }
);
CardFooterLeft.displayName = 'CardFooterLeft';

const CardFooterCenter = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer-center"
        className={cn('text-center', className)}
        {...props}
      />
    );
  }
);
CardFooterCenter.displayName = 'CardFooterCenter';

const CardFooterRight = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="card-footer-right"
        className={cn('text-right', className)}
        {...props}
      />
    );
  }
);
CardFooterRight.displayName = 'CardFooterRight';

export {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardFooter,
  CardFooterCenter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardHeaderContent,
  CardHeaderLeft,
  CardHeaderRight,
  CardTitle,
};
