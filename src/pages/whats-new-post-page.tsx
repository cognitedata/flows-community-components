import { useEffect, useState } from 'react';
import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { WhatsNewReport } from '@/components/whats-new/whats-new-report';
import type { WhatsNewOutletContext } from '@/layouts/whats-new-layout';
import { type WhatsNewReportData, fetchReport } from '@/lib/whats-new-report';

/** Loads and renders one report from its JSON data. */
function NativeReport({ slug }: { slug: string }) {
  const [report, setReport] = useState<WhatsNewReportData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchReport(slug)
      .then((data) => {
        if (!cancelled) setReport(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

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
  const { entries } = useOutletContext<WhatsNewOutletContext>();
  // No slug means the /whats-new index, which shows the most recent report.
  const entry = slug ? entries.find((e) => e.slug === slug) : entries[0];

  if (!entry) {
    return slug ? (
      <Navigate to="/whats-new" replace />
    ) : (
      <p className="text-sm text-muted-fg">No reports yet.</p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <PageTitle title={`${entry.headline} — Aura`} />
      <p className="mb-6 rounded-lg bg-muted-bg px-4 py-3 text-sm text-muted-fg">
        This report highlights the most notable work from {entry.label}. For a
        full, itemized list of every change, see the{' '}
        <Link
          to="/aura/documentation/changelog"
          className="text-link-fg hover:text-link-fg-hover hover:underline"
        >
          changelog
        </Link>
        .
      </p>
      <NativeReport key={entry.slug} slug={entry.slug} />
    </div>
  );
}
