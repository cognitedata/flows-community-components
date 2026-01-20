import { Badge } from "@/components/ui/aura/badge";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/aura/carousel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/aura/hover-card";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import type { ComponentType } from "react";
import {
  type ComponentProps,
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type InlineCitationProps = ComponentProps<"span">;

export const InlineCitation = ({ className, ...props }: InlineCitationProps) => (
  <span className={cn("group inline-flex items-center gap-1", className)} {...props} />
);

export type InlineCitationGroupProps = ComponentProps<"div">;

export const InlineCitationGroup = ({ className, ...props }: InlineCitationGroupProps) => (
  <div className={cn("flex flex-wrap gap-2", className)} {...props} />
);

export type InlineCitationTextProps = ComponentProps<"span">;

export const InlineCitationText = ({ className, ...props }: InlineCitationTextProps) => (
  <span className={cn("transition-colors group-hover:bg-accent", className)} {...props} />
);

export type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

export const InlineCitationCard = (props: InlineCitationCardProps) => (
  <HoverCard closeDelay={0} openDelay={0} {...props} />
);

export type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: string[];
  icon?: ComponentType<{ className?: string }>;
};

export const InlineCitationCardTrigger = ({
  sources,
  icon: Icon,
  className,
  ...props
}: InlineCitationCardTriggerProps) => {
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  return (
    <HoverCardTrigger asChild>
      <Badge
        className={cn(
          "ml-1 inline-flex items-center justify-center rounded-md border border-transparent bg-decorative-background-fjord px-1 text-sm leading-4.5 font-medium text-decorative-foreground-fjord whitespace-nowrap gap-1 transition-[color,box-shadow]",
          "[&>svg]:size-3 [&>svg]:pointer-events-none",
          className
        )}
        {...props}
      >
        {Icon && <Icon className="size-3" />}
        {sources[0] ? (
          <>
            {getHostname(sources[0])} {sources.length > 1 && `+${sources.length - 1}`}
          </>
        ) : (
          "unknown"
        )}
      </Badge>
    </HoverCardTrigger>
  );
};

export type InlineCitationCardBodyProps = ComponentProps<"div">;

export const InlineCitationCardBody = ({ className, ...props }: InlineCitationCardBodyProps) => (
  <HoverCardContent className={cn("relative w-80 p-0", className)} {...props} />
);

const CarouselApiContext = createContext<CarouselApi | undefined>(undefined);

const useCarouselApi = () => {
  const context = useContext(CarouselApiContext);
  return context;
};

export type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

export const InlineCitationCarousel = ({
  className,
  children,
  ...props
}: InlineCitationCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel className={cn("w-full", className)} setApi={setApi} {...props}>
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
};

export type InlineCitationCarouselContentProps = ComponentProps<"div">;

export const InlineCitationCarouselContent = (props: InlineCitationCarouselContentProps) => (
  <CarouselContent {...props} />
);

export type InlineCitationCarouselItemProps = ComponentProps<"div">;

export const InlineCitationCarouselItem = ({
  className,
  ...props
}: InlineCitationCarouselItemProps) => (
  <CarouselItem className={cn("w-full space-y-2 p-4 pl-8", className)} {...props} />
);

export type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

export const InlineCitationCarouselHeader = ({
  className,
  ...props
}: InlineCitationCarouselHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className
    )}
    {...props}
  />
);

export type InlineCitationCarouselIndexProps = ComponentProps<"div">;

export const InlineCitationCarouselIndex = ({
  children,
  className,
  ...props
}: InlineCitationCarouselIndexProps) => {
  const api = useCarouselApi();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Use startTransition to avoid synchronous setState in effect
    startTransition(() => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
};

export type InlineCitationCarouselPrevProps = ComponentProps<"button">;

export const InlineCitationCarouselPrev = ({
  className,
  ...props
}: InlineCitationCarouselPrevProps) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <button
      aria-label="Previous"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <IconArrowLeft className="size-4 text-muted-foreground" />
    </button>
  );
};

export type InlineCitationCarouselNextProps = ComponentProps<"button">;

export const InlineCitationCarouselNext = ({
  className,
  ...props
}: InlineCitationCarouselNextProps) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <button
      aria-label="Next"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <IconArrowRight className="size-4 text-muted-foreground" />
    </button>
  );
};

export type InlineCitationSourceProps = ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

export const InlineCitationSource = ({
  title,
  url,
  description,
  className,
  children,
  ...props
}: InlineCitationSourceProps) => (
  <div className={cn("space-y-1", className)} {...props}>
    {title && <h4 className="truncate font-medium text-sm leading-tight">{title}</h4>}
    {url && <p className="truncate break-all text-muted-foreground text-xs">{url}</p>}
    {description && (
      <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">{description}</p>
    )}
    {children}
  </div>
);

export type InlineCitationQuoteProps = ComponentProps<"blockquote">;

export const InlineCitationQuote = ({
  children,
  className,
  ...props
}: InlineCitationQuoteProps) => (
  <blockquote
    className={cn("border-muted border-l-2 pl-3 text-muted-foreground text-sm italic", className)}
    {...props}
  >
    {children}
  </blockquote>
);

export type InlineCitationLinkProps = Omit<ComponentProps<"a">, "target"> & {
  target?: "_blank" | "_self";
  icon?: ComponentType<{ className?: string }>;
  variant?: "mountain" | "nordic" | "fjord";
};

export const InlineCitationLink = ({
  href,
  target = "_self",
  icon: Icon,
  variant = "mountain",
  className,
  children,
  ...props
}: InlineCitationLinkProps) => {
  const getHostname = (url: string | undefined) => {
    if (!url) return "unknown";
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const hostname = getHostname(href);

  const variantStyles = {
    mountain:
      "bg-decorative-background-mountain hover:bg-decorative-background-hover-mountain text-decorative-foreground-mountain",
    nordic:
      "bg-decorative-background-nordic hover:bg-decorative-background-hover-nordic text-decorative-foreground-nordic",
    fjord:
      "bg-decorative-background-fjord hover:bg-decorative-background-hover-fjord text-decorative-foreground-fjord",
  };

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="inline-flex items-stretch"
      {...props}
    >
      <Badge
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-transparent px-1 text-sm leading-4.5 font-medium whitespace-nowrap gap-1 transition-colors",
          "[&>svg]:size-3 [&>svg]:pointer-events-none",
          variantStyles[variant],
          className
        )}
      >
        {Icon && <Icon className="size-3" />}
        {children ?? hostname}
      </Badge>
    </a>
  );
};
