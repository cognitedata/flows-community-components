import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { WHATS_NEW_POSTS, getWhatsNewPostBySlug } from '@/lib/whats-new-data';

/**
 * Shows a self-contained HTML post from `public/whats-new-posts/`. The frame
 * grows to the post's height so the page scrolls instead of the frame, and it
 * follows the site's light/dark theme (the files are same-origin, so the
 * frame's document can be read and updated).
 */
function EmbeddedPost({ file, title }: { file: string; title: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [height, setHeight] = useState(1600);

  const handleLoad = useCallback(() => {
    cleanupRef.current?.();
    const doc = frameRef.current?.contentDocument;
    if (!doc?.body) return;

    // Measure the body, not the root element: the root's scrollHeight is never
    // smaller than the iframe's own height, so the frame could only ever grow.
    const measure = () => setHeight(doc.body.scrollHeight);
    const syncTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      doc.documentElement.classList.toggle('dark', dark);
      doc.documentElement.classList.toggle('light', !dark);
    };

    measure();
    syncTheme();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(doc.body);
    const themeObserver = new MutationObserver(syncTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    cleanupRef.current = () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  useEffect(() => () => cleanupRef.current?.(), []);

  const base = import.meta.env.BASE_URL || '/';

  return (
    <iframe
      ref={frameRef}
      src={`${base}whats-new-posts/${file}`}
      title={title}
      onLoad={handleLoad}
      style={{ '--frame-height': `${height}px` } as CSSProperties}
      className="h-(--frame-height) w-full overflow-hidden border-0"
    />
  );
}

export function WhatsNewPostPage() {
  const { slug } = useParams<{ slug: string }>();
  // No slug means the /whats-new index, which shows the most recent report.
  const post = slug ? getWhatsNewPostBySlug(slug) : WHATS_NEW_POSTS[0];

  if (!post) {
    return <Navigate to="/whats-new" replace />;
  }

  const Icon = post.icon;

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <PageTitle title={`${post.title} — Aura`} />
      <p className="mb-6 rounded-lg bg-muted-bg px-4 py-3 text-sm text-muted-fg">
        This report highlights the most notable work from {post.month}. For a
        full, itemized list of every change, see the{' '}
        <Link
          to="/aura/documentation/changelog"
          className="text-link-fg hover:text-link-fg-hover hover:underline"
        >
          changelog
        </Link>
        .
      </p>
      {post.embed ? (
        <EmbeddedPost file={post.embed} title={post.title} />
      ) : (
        <>
          <header className="mb-10 sm:mb-12">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
              <Icon size={24} stroke={1.5} />
            </div>
            <p className="mb-2 text-xs font-medium tracking-wide text-muted-fg uppercase">
              {post.month}
            </p>
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-3 max-w-[60ch] text-muted-fg">{post.excerpt}</p>
          </header>
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
            The full write-up for this update is on the way. In the meantime,
            pick another report from the list.
          </p>
        </>
      )}
    </div>
  );
}
