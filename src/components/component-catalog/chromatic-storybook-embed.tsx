import { Loader } from '@cognite/aura/components';
import * as React from 'react';

import {
  CHROMATIC_STORYBOOK_ORIGIN,
  chromaticStorybookEmbedUrl,
  isChromaticPreviewReadyMessage,
  syncChromaticIframeTheme,
} from '@/lib/chromatic-storybook';
import { useThemeOverrides } from '@/lib/theme-overrides-context';
import { cn } from '@/lib/utils';

/** Let Storybook unmount its preparing UI after it signals ready. */
const SETTLE_AFTER_READY_MS = 120;
/** If channel messages never arrive, don't spin forever. */
const FALLBACK_REVEAL_MS = 8000;

export function ChromaticStorybookEmbed({
  storyId,
  title = 'Component preview',
}: {
  storyId: string;
  title?: string;
}) {
  const { appearance, sharedTheme } = useThemeOverrides();
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const settleTimeoutRef = React.useRef<number | undefined>(undefined);
  const fallbackTimeoutRef = React.useRef<number | undefined>(undefined);
  const revealedRef = React.useRef(false);
  const [loaded, setLoaded] = React.useState(false);

  const initialSrc = React.useMemo(
    () => chromaticStorybookEmbedUrl(storyId, appearance, sharedTheme),
    // Mount-only: later appearance/token updates rewrite the iframe hash.

    [storyId]
  );

  const clearRevealTimers = React.useCallback(() => {
    if (settleTimeoutRef.current !== undefined) {
      window.clearTimeout(settleTimeoutRef.current);
      settleTimeoutRef.current = undefined;
    }
    if (fallbackTimeoutRef.current !== undefined) {
      window.clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = undefined;
    }
  }, []);

  const revealPreview = React.useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    clearRevealTimers();
    settleTimeoutRef.current = window.setTimeout(() => {
      setLoaded(true);
    }, SETTLE_AFTER_READY_MS);
  }, [clearRevealTimers]);

  React.useEffect(() => {
    revealedRef.current = false;
    setLoaded(false);
    clearRevealTimers();

    const iframe = iframeRef.current;
    if (!iframe) return;

    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return;
      if (event.origin !== CHROMATIC_STORYBOOK_ORIGIN) return;
      if (isChromaticPreviewReadyMessage(event.data, storyId)) {
        revealPreview();
      }
    };

    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
      clearRevealTimers();
    };
  }, [storyId, clearRevealTimers, revealPreview]);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    syncChromaticIframeTheme(iframe, appearance, sharedTheme);
  }, [appearance, sharedTheme]);

  return (
    <div
      className="relative isolate overflow-hidden rounded-2xl border border-border bg-background text-foreground"
      aria-busy={!loaded}
    >
      <iframe
        key={storyId}
        ref={iframeRef}
        src={initialSrc}
        title={title}
        className={cn(
          'h-[420px] w-full border-0 bg-background sm:h-[480px]',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        referrerPolicy="no-referrer-when-downgrade"
        allow="clipboard-write"
        onLoad={() => {
          if (revealedRef.current) return;
          fallbackTimeoutRef.current = window.setTimeout(() => {
            revealPreview();
          }, FALLBACK_REVEAL_MS);
        }}
      />
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'absolute inset-0 z-10 flex items-center justify-center bg-background text-foreground transition-opacity duration-300',
          loaded ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
      >
        <Loader variant="page" header="Loading preview" />
      </div>
    </div>
  );
}
