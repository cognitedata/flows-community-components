import { Outlet } from 'react-router-dom';

import { WhatsNewSidebar } from '@/components/whats-new/whats-new-sidebar';

export function WhatsNewLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm md:flex-row md:gap-16">
        <WhatsNewSidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
