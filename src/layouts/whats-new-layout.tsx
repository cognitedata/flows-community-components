import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { WhatsNewSidebar } from '@/components/whats-new/whats-new-sidebar';
import { type ReportIndexEntry, fetchIndex } from '@/lib/whats-new-report';

export interface WhatsNewOutletContext {
  entries: ReportIndexEntry[];
}

export function WhatsNewLayout() {
  const [entries, setEntries] = useState<ReportIndexEntry[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchIndex()
      .then((data) => {
        if (!cancelled) setEntries(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm md:flex-row md:gap-16">
        <WhatsNewSidebar entries={entries ?? []} />
        <div className="min-w-0 flex-1">
          {failed ? (
            <p className="text-sm text-muted-fg">Could not load the reports.</p>
          ) : entries ? (
            <Outlet context={{ entries } satisfies WhatsNewOutletContext} />
          ) : (
            <p className="text-sm text-muted-fg">Loading reports…</p>
          )}
        </div>
      </div>
    </main>
  );
}
