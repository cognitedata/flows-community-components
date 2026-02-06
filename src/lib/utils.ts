import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import styleScope from "@/styleScope";

let portalContainer: HTMLElement | null = null;
let hasWarnedAboutCustomPortalContainerProps = false;

type PortalContainerOptions = {
  id?: string;
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Focus rings for non-form interactive elements (buttons, etc.).
 * These provide only the shadow-based focus ring without background/border changes.
 */
export const focusRing = "focus-visible:shadow-focus-ring outline-none" as const;
export const focusRingDestructive =
  "focus-visible:shadow-focus-ring-destructive outline-none" as const;

/**
 * Reusable form element state Tailwind classes.
 * Import these to maintain consistent styling across all form components.
 */
export const formElementBase =
  "rounded-md border border-border bg-background p-1.75 text-base leading-5 tracking-tightest text-muted-foreground" as const;
export const hoverState = "hover:bg-accent hover:text-accent-foreground" as const;
export const filledState =
  "filled:bg-background filled:border-border filled:text-foreground" as const;
export const focusState =
  "focus-visible:shadow-focus-ring focus-visible:bg-background focus-visible:border-transparent focus-visible:text-foreground outline-none" as const;
export const invalidState =
  "aria-invalid:border-destructive-foreground aria-invalid:focus-visible:shadow-focus-ring-destructive aria-invalid:focus-visible:border-transparent aria-invalid:focus-visible:text-foreground outline-none" as const;
export const disabledState =
  "disabled:bg-disabled disabled:border-transparent disabled:text-disabled-foreground disabled:pointer-events-none disabled:cursor-not-allowed" as const;

export function slugToPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Safely extracts hostname from a URL string.
 * Returns the hostname if valid, otherwise returns the original string or "unknown".
 *
 * @param url - URL string to extract hostname from (optional)
 * @returns The hostname, original string, or "unknown" if url is undefined
 */
export function getHostname(url: string | undefined): string {
  if (!url) return "unknown";
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

/**
 * Gets or creates the portal container for portalled UI components.
 * Container is created in document.body to avoid positioning issues
 * from the shell app's container query context.
 * The result is cached to avoid side effects on subsequent calls during React renders.
 */
export const getPortalContainer = (options?: PortalContainerOptions): HTMLElement | undefined => {
  const hasCustomOptions = Boolean(options && Object.keys(options).length > 0);

  if (hasCustomOptions && !hasWarnedAboutCustomPortalContainerProps) {
    console.warn(
      "Custom portal container props can lead to unintended behavior. Use with caution."
    );
    hasWarnedAboutCustomPortalContainerProps = true;
  }

  const containerId = options?.id ?? styleScope.portalContainer;
  const containerClassName = options?.className ?? styleScope.styleScope;

  if (portalContainer) {
    if (hasCustomOptions) {
      portalContainer.id = containerId;
      portalContainer.className = containerClassName;
      portalContainer.style.position = options?.style?.position ?? "fixed";
      portalContainer.style.zIndex = options?.style?.zIndex ?? "1000";
      Object.assign(portalContainer.style, options?.style);
    }
    return portalContainer;
  }

  if (typeof window === "undefined") {
    return undefined;
  }

  let container = document?.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    document.body.appendChild(container);
  }

  container.id = containerId;
  container.className = containerClassName;
  container.style.position = options?.style?.position ?? "fixed";
  container.style.zIndex = options?.style?.zIndex ?? "1000";
  Object.assign(container.style, options?.style);

  portalContainer = container;
  return container;
};
