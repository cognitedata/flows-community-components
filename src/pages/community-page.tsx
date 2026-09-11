import { PageTitle } from '@/components/page-title';

export function CommunityPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Overview — Community — Aura" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Overview
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Aura Community is a shared registry of components and app templates
          contributed alongside the core design system. Start with installation,
          then use contribution guidelines and agent skills as you explore the
          catalogs on the left.
        </p>
      </header>
    </div>
  );
}
