import { Link } from "react-router-dom";
import { FoundationTopicCard } from "@/components/foundations/foundation-topic-card";
import { PageTitle } from "@/components/page-title";
import { WHATS_NEW_POSTS } from "@/lib/whats-new-data";

export function WhatsNewPage() {
  const [latest, ...previous] = WHATS_NEW_POSTS;
  const LatestIcon = latest.icon;

  return (
    <>
      <PageTitle title="What's new — Aura" />
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-[1200px] px-4 pt-24 pb-24 sm:pt-28">
          <header className="mb-10 sm:mb-12">
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              What&apos;s new
            </h1>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              Monthly updates on where Aura is headed — new components, patterns, and ideas.
              Looking for a detailed technical log of every release instead?{" "}
              <Link
                to="/documentation/changelog"
                className="text-link-fg hover:text-link-fg-hover hover:underline"
              >
                See the changelog
              </Link>
              .
            </p>
          </header>

          <Link
            to={`/whats-new/${latest.slug}`}
            className="group mb-16 flex h-64 flex-col items-center justify-center gap-3 rounded-2xl bg-muted-bg px-6 text-center transition-colors hover:bg-medium-bg sm:h-80 sm:mb-20"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-medium-bg text-muted-fg transition-colors group-hover:bg-fjord-100 group-hover:text-fjord-500">
              <LatestIcon size={24} stroke={1.5} />
            </div>
            <p className="text-xs font-medium tracking-wide text-muted-fg uppercase">
              {latest.month} · Latest update
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              {latest.title}
            </h2>
            <p className="max-w-[60ch] text-sm text-muted-fg">{latest.excerpt}</p>
          </Link>

          <h2 className="mb-6 font-heading text-sm font-medium tracking-wide text-muted-fg uppercase">
            Previous updates
          </h2>
          <div className="@container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {previous.map((post) => (
              <FoundationTopicCard
                key={post.slug}
                topic={{
                  name: post.title,
                  description: post.excerpt,
                  icon: post.icon,
                  href: `/whats-new/${post.slug}`,
                }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
