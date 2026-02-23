import { type ClassValue, clsx } from 'clsx';
import type { Element } from 'hast';
import { type BundledLanguage, type ShikiTransformer, codeToHtml } from 'shiki';
import { twMerge } from 'tailwind-merge';

import styleScope from '@/styleScope';

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

export const isStorybookTestEnv =
  typeof window !== 'undefined' &&
  (window as Window & { __STORYBOOK_TEST__?: boolean }).__STORYBOOK_TEST__ ===
    true;

const stripPreStylesTransformer: ShikiTransformer = {
  name: 'strip-pre-styles',
  pre(node: Element) {
    node.properties.style = undefined;
  },
};

const lineNumberTransformer: ShikiTransformer = {
  name: 'line-numbers',
  line(node: Element, line: number) {
    node.children.unshift({
      type: 'element',
      tagName: 'span',
      properties: {
        className: [
          'inline-block',
          'min-w-10',
          'mr-4',
          'text-right',
          'select-none',
          'text-muted-foreground',
        ],
      },
      children: [{ type: 'text', value: String(line) }],
    });
  },
};

export async function highlightCode(
  code: string,
  language: BundledLanguage,
  showLineNumbers = false
): Promise<[string, string]> {
  const transformers: ShikiTransformer[] = [
    stripPreStylesTransformer,
    ...(showLineNumbers ? [lineNumberTransformer] : []),
  ];

  return await Promise.all([
    codeToHtml(code, {
      lang: language,
      theme: 'one-light',
      transformers,
    }),
    codeToHtml(code, {
      lang: language,
      theme: 'one-dark-pro',
      transformers,
    }),
  ]);
}

/**
 * Focus rings for non-form interactive elements (buttons, etc.).
 * These provide only the shadow-based focus ring without background/border changes.
 */
export const focusRing =
  'focus-visible:shadow-focus-ring outline-none' as const;
export const focusRingDestructive =
  'focus-visible:shadow-focus-ring-destructive outline-none' as const;

/**
 * Reusable form element state Tailwind classes.
 * Import these to maintain consistent styling across all form components.
 */
export const formElementBase =
  'rounded-md border border-border bg-background p-1.75 text-base leading-5 tracking-tightest text-muted-foreground' as const;
export const hoverState =
  'hover:bg-accent hover:text-accent-foreground' as const;
export const filledState =
  'filled:bg-background filled:border-border filled:text-foreground' as const;
export const focusState =
  'focus-visible:shadow-focus-ring focus-visible:bg-background focus-visible:border-transparent focus-visible:text-foreground outline-none' as const;
export const invalidState =
  'aria-invalid:border-destructive-foreground aria-invalid:focus-visible:shadow-focus-ring-destructive aria-invalid:focus-visible:border-transparent aria-invalid:focus-visible:text-foreground outline-none' as const;
export const disabledState =
  'disabled:bg-disabled disabled:border-transparent disabled:text-disabled-foreground disabled:pointer-events-none disabled:cursor-not-allowed' as const;
export const readOnlyState =
  'read-only:border-transparent read-only:text-foreground read-only:cursor-default read-only:hover:border-transparent read-only:focus-visible:shadow-none read-only:focus-visible:border-transparent' as const;

export function slugToPascalCase(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Safely extracts hostname from a URL string.
 * Returns the hostname if valid, otherwise returns the original string or "unknown".
 *
 * @param url - URL string to extract hostname from (optional)
 * @returns The hostname, original string, or "unknown" if url is undefined
 */
export function getHostname(url: string | undefined): string {
  if (!url) return 'unknown';
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
export const getPortalContainer = (
  options?: PortalContainerOptions
): HTMLElement | undefined => {
  const hasCustomOptions = Boolean(options && Object.keys(options).length > 0);

  const containerId = options?.id ?? styleScope.portalContainer;
  const containerClassName = options?.className ?? styleScope.styleScope;
  const applyContainerProps = (element: HTMLElement) => {
    element.id = containerId;
    element.className = containerClassName;
    element.style.position = options?.style?.position ?? 'fixed';
    element.style.zIndex = options?.style?.zIndex ?? '1000';
    if (options?.style) {
      Object.assign(element.style, options.style);
    }
  };

  if (portalContainer) {
    if (hasCustomOptions) {
      console.warn(
        'getPortalContainer: Portal container already exists. Custom options will be ignored to prevent side effects.'
      );
    }
    return portalContainer;
  }

  if (typeof window === 'undefined') {
    return undefined;
  }

  if (hasCustomOptions && !hasWarnedAboutCustomPortalContainerProps) {
    console.warn(
      'Custom portal container props can lead to unintended behavior. Use with caution.'
    );
    hasWarnedAboutCustomPortalContainerProps = true;
  }

  let container = document?.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    document.body.appendChild(container);
  }

  applyContainerProps(container);

  portalContainer = container;
  return container;
};

export async function convertBlobUrlToDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0 || !parts[0]) {
    return '';
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  const firstInitial = parts[0].charAt(0).toUpperCase();
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}

/**
 * Gets the correct image path for Storybook.
 * Handles both local development and deployed Storybook with base paths.
 *
 * @param filename - The filename of the image
 * @returns The correct path to the image
 */
export function getStorybookImagePath(filename: string): string {
  if (typeof window === 'undefined') return `/${filename}`;

  try {
    const pathname = (window.parent?.location || window.location).pathname;
    const match = pathname.match(/^(\/aura\/branches\/[^/]+\/storybook)/);
    if (match) return `${match[1]}/${filename}`;
    return `/${filename}`;
  } catch (error) {
    console.warn('Failed to determine Storybook image path:', error);
    return `/${filename}`;
  }
}
