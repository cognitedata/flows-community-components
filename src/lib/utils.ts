import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import styleScope from "@/styleScope";

let portalContainer: HTMLElement | null = null;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
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
