import { cn } from "@/lib/utils";
import {
  InlineCitation,
  InlineCitationLink,
  type InlineCitationLinkProps,
} from "@cognite/aura-lab/inline-citation";
import { IconMist } from "@tabler/icons-react";
import type { ComponentProps, ReactNode } from "react";

export type SourcesProps = Omit<ComponentProps<"div">, "title"> & {
  /**
   * Title rendered above the sources list.
   * - Omit to render a default `<SourcesTitle />`
   * - Pass `false` or `"false"` to hide the title
   * - Pass any React node (e.g. `<SourcesTitle title="References" />`) to customise
   */
  title?: ReactNode | boolean;
};

export const Sources = ({ className, title, children, ...props }: SourcesProps) => {
  const hideTitle = title === false || title === "false";
  const titleNode = title === undefined || title === true ? <SourcesTitle /> : title;

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {!hideTitle ? titleNode : null}
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
};

export type SourcesTitleProps = ComponentProps<"div"> & {
  title?: string;
};

export const SourcesTitle = ({
  className,
  title = "Sources",
  children,
  ...props
}: SourcesTitleProps) => (
  <div
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

export type SourceProps = InlineCitationLinkProps & {
  title?: string;
  url?: string;
};

export const Source = ({
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
