import { Badge } from '@cognite/aura/components';
import {
  IconMinus,
  IconTrendingDown,
  IconTrendingUp,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import {
  type ReportCard,
  type ReportEval,
  type ReportItem,
  type ReportSection,
  type WhatsNewReportData,
  rowSizes,
} from '@/lib/whats-new-report';

const SPAN: Record<number, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  6: 'md:col-span-6',
};

const VISUAL_HEIGHT: Record<number, string> = {
  2: 'h-48',
  3: 'h-40',
  6: 'h-56',
};

const BADGE_VARIANT: Record<
  string,
  'success' | 'warning' | 'inProgress' | 'secondary'
> = {
  New: 'success',
  Update: 'inProgress',
  Fix: 'warning',
};

function MoreLink({ item }: { item: ReportItem }) {
  if (!item.url) return null;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="text-xs text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {item.label ?? 'Learn more'} →
    </a>
  );
}

function EvalCard({ data }: { data: ReportEval }) {
  const { trend } = data;
  const TrendIcon =
    trend.direction === 'up'
      ? IconTrendingUp
      : trend.direction === 'down'
        ? IconTrendingDown
        : IconMinus;
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-xl bg-card-background p-3">
      <div className="flex justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-xs text-muted-fg">{data.subtitle}</p>
        </div>
        <p className="text-right font-medium">
          {data.value}
          <span className="block text-xs font-normal text-muted-fg">
            {data.unit}
          </span>
        </p>
      </div>
      <p className="text-xs text-muted-fg">{data.description}</p>
      <p
        className={cn(
          'mt-auto flex items-center gap-1.5 border-t border-border pt-2 text-xs',
          trend.improved === true && 'text-success-foreground-strong',
          trend.improved === false && 'text-critical-foreground-strong',
          trend.improved === null && 'text-muted-fg'
        )}
      >
        <TrendIcon size={14} stroke={2} aria-hidden="true" />
        {trend.text}
      </p>
    </div>
  );
}

function Highlights({ data }: { data: WhatsNewReportData['highlights'] }) {
  return (
    <section className="mt-12">
      <h2 className="font-heading text-xl font-medium">Highlights</h2>
      <p className="mt-1 mb-4 text-sm text-muted-fg">{data.summary}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {data.items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-3 rounded-xl bg-card-background p-2 pb-4"
          >
            {item.image && (
              <img
                src={item.image.src}
                alt={item.image.alt}
                className="aspect-3/2 w-full rounded-lg object-cover object-left-top"
              />
            )}
            <div className="flex flex-1 flex-col gap-1.5 px-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="flex-1 text-xs text-muted-fg">{item.text}</p>
              <MoreLink item={item} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Card({ card, rowSize }: { card: ReportCard; rowSize: number }) {
  return (
    <article
      className={cn(
        'flex min-w-0 flex-col gap-3 rounded-xl bg-card-background p-3',
        SPAN[6 / rowSize]
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium">{card.title}</h3>
          {card.subtitle && (
            <p className="text-xs text-muted-fg">{card.subtitle}</p>
          )}
        </div>
        {card.badge && (
          <Badge variant={BADGE_VARIANT[card.badge] ?? 'secondary'}>
            {card.badge}
          </Badge>
        )}
      </div>
      {card.image &&
        (card.image.auto ? (
          <div
            className={cn(
              'flex items-center justify-center overflow-hidden rounded-lg bg-white',
              VISUAL_HEIGHT[rowSize]
            )}
          >
            <img
              src={card.image.src}
              alt={card.image.alt}
              className="max-h-full max-w-full"
            />
          </div>
        ) : (
          <img
            src={card.image.src}
            alt={card.image.alt}
            className={cn(
              'w-full rounded-lg object-cover object-left-top',
              VISUAL_HEIGHT[rowSize]
            )}
          />
        ))}
      <p className="flex-1 text-xs text-muted-fg">{card.text}</p>
      <MoreLink item={card} />
    </article>
  );
}

function Section({ title, data }: { title: string; data?: ReportSection }) {
  if (!data || data.cards.length === 0) return null;
  const sizes = rowSizes(data.cards.length);
  let index = 0;
  return (
    <section className="mt-12">
      <h2 className="font-heading text-xl font-medium">{title}</h2>
      <p className="mt-1 mb-4 text-sm text-muted-fg">{data.summary}</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
        {sizes.flatMap((size) => {
          const row = data.cards.slice(index, index + size);
          index += size;
          return row.map((card) => (
            <Card key={card.title} card={card} rowSize={size} />
          ));
        })}
      </div>
    </section>
  );
}

/** Native rendering of a What's new report from its JSON data (same content as the embedded HTML). */
export function WhatsNewReport({ data }: { data: WhatsNewReportData }) {
  return (
    <article>
      <header>
        <p className="text-xs font-medium tracking-wide text-muted-fg uppercase">
          {data.eyebrow}
        </p>
        <h1 className="mt-2 mb-3 font-heading text-3xl font-semibold tracking-tight">
          {data.title}
        </h1>
        <p className="max-w-[60ch]">{data.intro}</p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {data.evals.map((item) => (
            <EvalCard key={item.name} data={item} />
          ))}
        </div>
      </header>
      <hr className="mt-8 border-border" />
      <Highlights data={data.highlights} />
      <Section title="Components" data={data.components} />
      <Section title="Context & skills" data={data.context} />
      <Section title="Other news" data={data.other} />
      <section className="mt-12">
        <h2 className="font-heading text-xl font-medium">Thank you!</h2>
        <p className="mt-1 mb-4 text-sm text-muted-fg">{data.thanks.summary}</p>
        <p>
          {data.thanks.people.map((person, i) => (
            <span key={person}>
              {i > 0 && ', '}
              <a
                href={`https://github.com/${person}`}
                target="_blank"
                rel="noreferrer"
                className="text-link-fg hover:text-link-fg-hover"
              >
                @{person}
              </a>
            </span>
          ))}
        </p>
      </section>
    </article>
  );
}
