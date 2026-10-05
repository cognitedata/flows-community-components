import { PageTitle } from '@/components/page-title';
import { ScrollEqHero } from '@/components/scroll-eq-hero';

export function HomePage() {
  return (
    <>
      <PageTitle title="Aura" />
      <main className="bg-marketing-canvas font-system text-white">
        <ScrollEqHero />
      </main>
    </>
  );
}
