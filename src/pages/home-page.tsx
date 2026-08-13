import { ScrollEqHero } from "@/components/scroll-eq-hero";
import { PageTitle } from "@/components/page-title";

export function HomePage() {
  return (
    <>
      <PageTitle title="Scroll EQ hero prototype" />
      <main
        className="bg-[#050810] text-white"
        style={{ fontFamily: "-apple-system, Inter, 'Helvetica Neue', Arial, sans-serif" }}
      >
        <ScrollEqHero />
      </main>
    </>
  );
}
