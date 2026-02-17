import type { ComponentProps, ReactNode } from "react";

import { IconMist } from "@tabler/icons-react";

import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ui/aura/inline-citation/inline-citation";
import { cn } from "../../../../lib/utils";

type SourcesProps = Omit<ComponentProps<"div">, "title"> & {
  title?: ReactNode | boolean;
};

const Sources = ({ className, title, children, ...props }: SourcesProps) => {
  const hideTitle = title === false || title === "false";
  const titleNode = title === undefined || title === true ? <SourcesTitle /> : title;

  return (
    <div data-slot="sources" className={cn("flex flex-col gap-2", className)} {...props}>
      {!hideTitle ? titleNode : null}
      <div data-slot="sources-items" className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
};

type SourcesTitleProps = ComponentProps<"div"> & {
  title?: string;
};

const SourcesTitle = ({ className, title = "Sources", children, ...props }: SourcesTitleProps) => (
  <div
    data-slot="sources-title"
    className={cn(
      "flex items-center gap-2 text-base leading-5 tracking-tighter text-muted-foreground",
      className
    )}
    {...props}
  >
    <IconMist className="size-4 shrink-0" />
    {children ?? <span>{title}</span>}
  </div>
);

type SourceProps = ComponentProps<typeof InlineCitationLink> & {
  title?: string;
  url?: string;
};

const Source = ({
  href,
  url,
  title,
  variant = "mountain",
  target = "_blank",
  icon,
  className,
  children,
  ...props
}: SourceProps) => {
  const sourceHref = href || url;

  if (!sourceHref) {
    return null;
  }

  return (
    <InlineCitation>
      <InlineCitationLink
        data-slot="source"
        href={sourceHref}
        target={target}
        variant={variant}
        icon={icon}
        className={className}
        {...props}
      >
        {children ?? title}
      </InlineCitationLink>
    </InlineCitation>
  );
};

export { Sources, SourcesTitle, Source };
