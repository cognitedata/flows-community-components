import { Badge } from "@/components/ui/aura/badge/badge";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/aura/carousel/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/aura/hover-card/hover-card";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  type ComponentProps,
  type ComponentRef,
  type ComponentType,
  createContext,
  forwardRef,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { cn, getHostname } from "../../../../lib/utils";

type InlineCitationProps = ComponentProps<"span">;

const InlineCitation = forwardRef<ComponentRef<"span">, InlineCitationProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="inline-citation"
      className={cn("group inline-flex items-center gap-1", className)}
      {...props}
    />
  )
);
InlineCitation.displayName = "InlineCitation";

type InlineCitationGroupProps = ComponentProps<"div">;

const InlineCitationGroup = forwardRef<ComponentRef<"div">, InlineCitationGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="inline-citation-group"
      className={cn("flex flex-wrap gap-2", className)}
      {...props}
    />
  )
);
InlineCitationGroup.displayName = "InlineCitationGroup";

type InlineCitationTextProps = ComponentProps<"span">;

const InlineCitationText = forwardRef<ComponentRef<"span">, InlineCitationTextProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="inline-citation-text"
      className={cn("transition-colors group-hover:bg-accent", className)}
      {...props}
    />
  )
);
InlineCitationText.displayName = "InlineCitationText";

type InlineCitationCardProps = ComponentProps<typeof HoverCard>;

const InlineCitationCard = (props: InlineCitationCardProps) => (
  <HoverCard data-slot="inline-citation-card" closeDelay={0} openDelay={0} {...props} />
);

type InlineCitationCardTriggerProps = ComponentProps<typeof Badge> & {
  sources: string[];
  icon?: ComponentType<{ className?: string }>;
};

const InlineCitationCardTrigger = ({
  sources,
  icon: Icon,
  className,
  ...props
}: InlineCitationCardTriggerProps) => {
  return (
    <HoverCardTrigger
      render={
        <Badge
          data-slot="inline-citation-card-trigger"
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
      }
    />
  );
};

type InlineCitationCardBodyProps = ComponentProps<"div">;

const InlineCitationCardBody = ({ className, ...props }: InlineCitationCardBodyProps) => (
  <HoverCardContent
    data-slot="inline-citation-card-body"
    className={cn("relative w-80 p-0", className)}
    {...props}
  />
);

const CarouselApiContext = createContext<CarouselApi | undefined>(undefined);

const useCarouselApi = () => {
  const context = useContext(CarouselApiContext);
  return context;
};

type InlineCitationCarouselProps = ComponentProps<typeof Carousel>;

const InlineCitationCarousel = ({ className, children, ...props }: InlineCitationCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <CarouselApiContext.Provider value={api}>
      <Carousel
        data-slot="inline-citation-carousel"
        className={cn("w-full", className)}
        setApi={setApi}
        {...props}
      >
        {children}
      </Carousel>
    </CarouselApiContext.Provider>
  );
};

type InlineCitationCarouselContentProps = ComponentProps<"div">;

const InlineCitationCarouselContent = (props: InlineCitationCarouselContentProps) => (
  <CarouselContent data-slot="inline-citation-carousel-content" {...props} />
);

type InlineCitationCarouselItemProps = ComponentProps<"div">;

const InlineCitationCarouselItem = forwardRef<ComponentRef<"div">, InlineCitationCarouselItemProps>(
  ({ className, ...props }, ref) => (
    <CarouselItem
      ref={ref}
      data-slot="inline-citation-carousel-item"
      className={cn("w-full space-y-2 p-4 pl-8", className)}
      {...props}
    />
  )
);
InlineCitationCarouselItem.displayName = "InlineCitationCarouselItem";

type InlineCitationCarouselHeaderProps = ComponentProps<"div">;

const InlineCitationCarouselHeader = forwardRef<
  ComponentRef<"div">,
  InlineCitationCarouselHeaderProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="inline-citation-carousel-header"
    className={cn(
      "flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2",
      className
    )}
    {...props}
  />
));
InlineCitationCarouselHeader.displayName = "InlineCitationCarouselHeader";

type InlineCitationCarouselIndexProps = ComponentProps<"div">;

const InlineCitationCarouselIndex = forwardRef<
  ComponentRef<"div">,
  InlineCitationCarouselIndexProps
>(({ children, className, ...props }, ref) => {
  const api = useCarouselApi();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

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
      ref={ref}
      data-slot="inline-citation-carousel-index"
      className={cn(
        "flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs",
        className
      )}
      {...props}
    >
      {children ?? `${current}/${count}`}
    </div>
  );
});
InlineCitationCarouselIndex.displayName = "InlineCitationCarouselIndex";

type InlineCitationCarouselPrevProps = ComponentProps<"button">;

const InlineCitationCarouselPrev = forwardRef<
  ComponentRef<"button">,
  InlineCitationCarouselPrevProps
>(({ className, ...props }, ref) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <button
      ref={ref}
      data-slot="inline-citation-carousel-prev"
      aria-label="Previous"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <IconArrowLeft className="size-4 text-muted-foreground" />
    </button>
  );
});
InlineCitationCarouselPrev.displayName = "InlineCitationCarouselPrev";

type InlineCitationCarouselNextProps = ComponentProps<"button">;

const InlineCitationCarouselNext = forwardRef<
  ComponentRef<"button">,
  InlineCitationCarouselNextProps
>(({ className, ...props }, ref) => {
  const api = useCarouselApi();

  const handleClick = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <button
      ref={ref}
      data-slot="inline-citation-carousel-next"
      aria-label="Next"
      className={cn("shrink-0", className)}
      onClick={handleClick}
      type="button"
      {...props}
    >
      <IconArrowRight className="size-4 text-muted-foreground" />
    </button>
  );
});
InlineCitationCarouselNext.displayName = "InlineCitationCarouselNext";

type InlineCitationSourceProps = ComponentProps<"div"> & {
  title?: string;
  url?: string;
  description?: string;
};

const InlineCitationSource = forwardRef<ComponentRef<"div">, InlineCitationSourceProps>(
  ({ title, url, description, className, children, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="inline-citation-source"
      className={cn("space-y-1", className)}
      {...props}
    >
      {title && <h4 className="truncate font-medium text-sm leading-tight">{title}</h4>}
      {url && <p className="truncate break-all text-muted-foreground text-xs">{url}</p>}
      {description && (
        <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  )
);
InlineCitationSource.displayName = "InlineCitationSource";

type InlineCitationQuoteProps = ComponentProps<"blockquote">;

const InlineCitationQuote = forwardRef<ComponentRef<"blockquote">, InlineCitationQuoteProps>(
  ({ children, className, ...props }, ref) => (
    <blockquote
      ref={ref}
      data-slot="inline-citation-quote"
      className={cn("border-muted border-l-2 pl-3 text-muted-foreground text-sm italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  )
);
InlineCitationQuote.displayName = "InlineCitationQuote";

type InlineCitationLinkProps = Omit<ComponentProps<"a">, "target"> & {
  target?: "_blank" | "_self";
  icon?: ComponentType<{ className?: string }>;
  variant?: "mountain" | "nordic" | "fjord";
};

const InlineCitationLink = forwardRef<ComponentRef<"a">, InlineCitationLinkProps>(
  (
    { href, target = "_self", icon: Icon, variant = "mountain", className, children, ...props },
    ref
  ) => {
    let hostname = "unknown";
    if (href) {
      try {
        if (href.startsWith("http://") || href.startsWith("https://")) {
          hostname = new URL(href).hostname;
        } else {
          hostname = href;
        }
      } catch {
        hostname = href;
      }
    }

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
        ref={ref}
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className="inline-flex items-stretch"
        {...props}
      >
        <Badge
          data-slot="inline-citation-link"
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
  }
);
InlineCitationLink.displayName = "InlineCitationLink";

export {
  InlineCitation,
  InlineCitationGroup,
  InlineCitationText,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselPrev,
  InlineCitationCarouselNext,
  InlineCitationSource,
  InlineCitationQuote,
  InlineCitationLink,
};
