import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { WhatsNewReport } from '@/components/whats-new/whats-new-report';
import { WHATS_NEW_POSTS, getWhatsNewPostBySlug } from '@/lib/whats-new-data';
import { type WhatsNewReportData, fetchReport } from '@/lib/whats-new-report';

/** Renders a report natively from its JSON data. */
function NativeReport({ folder }: { folder: string }) {
  const [report, setReport] = useState<WhatsNewReportData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchReport(folder)
      .then((data) => {
        if (!cancelled) setReport(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [folder]);

  if (failed) {
    return <p className="text-sm text-muted-fg">Could not load this report.</p>;
  }
  if (!report) {
    return <p className="text-sm text-muted-fg">Loading report…</p>;
  }
  return <WhatsNewReport data={report} />;
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
      {post.report ? (
        <NativeReport folder={post.report} />
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
