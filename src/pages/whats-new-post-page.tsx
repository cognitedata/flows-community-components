import { Link, Navigate, useParams } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { getWhatsNewPostBySlug } from '@/lib/whats-new-data';

export function WhatsNewPostPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const post = getWhatsNewPostBySlug(slug);

  if (!post) {
    return <Navigate to="/whats-new" replace />;
  }

  const Icon = post.icon;

  return (
    <>
      <PageTitle title={`${post.title} — Aura`} />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-[720px] px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
          <p className="mb-3 text-sm text-muted-fg">
            <Link
              to="/whats-new"
              className="hover:text-foreground hover:underline"
            >
              What&apos;s new
            </Link>
            <span className="mx-1.5 text-medium-fg">/</span>
            <span>{post.month}</span>
          </p>
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
            browse other months on the{' '}
            <Link
              to="/whats-new"
              className="text-link-fg hover:text-link-fg-hover hover:underline"
            >
              What&apos;s new
            </Link>{' '}
            page.
          </p>
        </div>
      </main>
    </>
  );
}
