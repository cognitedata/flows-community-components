import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import styleScope from "@/styleScope";

let portalContainer: HTMLElement | null = null;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Reusable form element state class strings.
 * Import these to maintain consistent styling across all form components.
 */

/**
 * Focus ring styles using box-shadow only (no border changes) to prevent layout shift.
 * - Inner ring: 2px (darker color)
 * - Outer ring: 4px total (lighter color, 2px visible beyond inner)
 */
export const focusRing = "focus-visible:shadow-focus-ring outline-none" as const;
export const focusRingDestructive = "focus-visible:shadow-focus-ring-destructive outline-none" as const;

/**
 * Focus state visual styles (background, border, text).
 * Use alongside focusRing or focusRingDestructive.
 */
export const focusState = "focus-visible:bg-background focus-visible:border-transparent focus-visible:text-foreground" as const;

/**
 * Invalid state for unfocused elements (shows red border).
 */
export const invalidState = "aria-invalid:border-destructive-foreground" as const;

/**
 * Invalid focus state (border becomes transparent, text stays foreground).
 * Use alongside focusRingDestructive for the ring.
 */
export const invalidFocusState = "aria-invalid:focus-visible:border-transparent aria-invalid:focus-visible:text-foreground" as const;

/**
 * Disabled state styles for form elements.
 */
export const disabledState = "disabled:bg-disabled disabled:border-transparent disabled:text-disabled-foreground disabled:pointer-events-none disabled:cursor-not-allowed" as const;

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
 * Gets or creates the portal container for Radix UI components.
 * Container is created in document.body to avoid positioning issues
 * from the shell app's container query context.
 * The result is cached to avoid side effects on subsequent calls during React renders.
 */
export const getPortalContainer = (): HTMLElement | undefined => {
  if (portalContainer) {
    return portalContainer;
  }

  if (typeof window === "undefined") {
    return undefined;
  }

  let container = document?.getElementById(styleScope.portalContainer);

  if (!container) {
    container = document.createElement("div");
    container.id = styleScope.portalContainer;
    container.className = styleScope.styleScope;
    container.style.position = "fixed";
    container.style.zIndex = "1000";
    document.body.appendChild(container);
  }

  portalContainer = container;
  return container;
};
