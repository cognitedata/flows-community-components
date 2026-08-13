import type * as React from 'react';

/**
 * Caps long-form prose/detail content to a readable width and centers it within
 * whatever space is available (which shrinks when the "On this page" TOC is present),
 * so the left/right margins around the content stay visually balanced.
 */
export function CenteredContent({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-3xl">{children}</div>;
}
