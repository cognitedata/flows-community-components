import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderEnd,
  CardHeaderStart,
  CardTitle,
  Count,
  CountUnit,
  CountValue,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconDotsVertical } from '@tabler/icons-react';
import { type ReactNode, useId } from 'react';

import {
  dashboardAssetCards,
  dashboardKpiCards,
  dashboardTrendCards,
  type DashboardTone,
} from './dashboard-layouts.data';

const sparklineTone: Record<DashboardTone, { stroke: string; color: string }> =
  {
    success: {
      stroke: 'stroke-success-foreground',
      color: 'var(--color-success-foreground)',
    },
    warning: {
      stroke: 'stroke-warning-foreground',
      color: 'var(--color-warning-foreground)',
    },
    critical: {
      stroke: 'stroke-critical-foreground',
      color: 'var(--color-critical-foreground)',
    },
    default: {
      stroke: 'stroke-neutral-foreground',
      color: 'var(--color-neutral-foreground)',
    },
  };

const toneDot: Record<DashboardTone, string> = {
  success: 'bg-success-foreground',
  warning: 'bg-warning-foreground',
  critical: 'bg-critical-foreground',
  default: 'bg-neutral-foreground',
};

function stepLine(points: readonly number[]): string {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  return points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 40 - ((value - min) / span) * 34;
      return index === 0 ? `M ${x} ${y}` : `H ${x} V ${y}`;
    })
    .join(' ');
}

function Sparkline({
  points,
  tone,
}: {
  points: readonly number[];
  tone: DashboardTone;
}): ReactNode {
  const line = stepLine(points);
  const colors = sparklineTone[tone];
  const gradientId = `sparkline-${useId().replace(/:/g, '')}`;
  return (
    <svg
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="h-11 w-full"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={colors.color} stopOpacity={0.45} />
          <stop offset="100%" stopColor={colors.color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${line} V 44 H 0 Z`} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className={colors.stroke}
      />
    </svg>
  );
}

function StatusLine({
  status,
  tone,
}: {
  status: string;
  tone: DashboardTone;
}): ReactNode {
  return (
    <p className="flex items-center gap-1.5 text-sm leading-4.5 text-muted-foreground">
      <span className={cn('size-2 shrink-0 rounded-full', toneDot[tone])} />
      {status}
    </p>
  );
}

function AssetCard({ name, kind }: { name: string; kind: string }): ReactNode {
  return (
    <Card>
      <CardHeader>
        <CardHeaderStart className="h-auto pt-0">
          <div className="min-w-0">
            <CardTitle className="text-base leading-5 tracking-tighter">
              {name}
            </CardTitle>
            <CardDescription>{kind}</CardDescription>
          </div>
        </CardHeaderStart>
        <CardHeaderEnd>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`More actions for ${name}`}
          >
            <IconDotsVertical size={16} stroke={1.5} />
          </Button>
        </CardHeaderEnd>
      </CardHeader>
    </Card>
  );
}

function TrendCard({
  title,
  status,
  tone,
  points,
  value,
  unit,
  className,
}: {
  title: string;
  status: string;
  tone: DashboardTone;
  points: readonly number[];
  value?: string;
  unit?: string;
  className?: string;
}): ReactNode {
  return (
    <Card className={cn('flex h-full flex-col', className)}>
      <CardHeader>
        <CardHeaderStart className="h-auto min-w-0 pt-0">
          <div className="min-w-0">
            <CardTitle className="text-base leading-5 tracking-tighter">
              {title}
            </CardTitle>
            <StatusLine status={status} tone={tone} />
          </div>
        </CardHeaderStart>
        {value && unit ? (
          <CardHeaderEnd>
            <Count variant={tone}>
              <CountValue>{value}</CountValue>
              <CountUnit>{unit}</CountUnit>
            </Count>
          </CardHeaderEnd>
        ) : null}
      </CardHeader>
      <CardContent className="mt-auto">
        <Sparkline points={points} tone={tone} />
      </CardContent>
    </Card>
  );
}

function DashboardOverviewCards(): ReactNode {
  const [firstTrend, secondTrend] = dashboardTrendCards;
  return (
    <div className="grid h-full min-w-0 grid-cols-1 gap-3 @3xl/main:grid-cols-2">
      <div className="flex min-h-0 min-w-0 flex-col gap-3">
        <AssetCard {...dashboardAssetCards[0]} />
        <AssetCard {...dashboardAssetCards[1]} />
        <TrendCard className="min-h-0 flex-1" {...firstTrend} />
      </div>
      <div className="flex min-h-0 min-w-0 flex-col gap-3">
        <AssetCard {...dashboardAssetCards[2]} />
        <AssetCard {...dashboardAssetCards[3]} />
        <TrendCard className="min-h-0 flex-1" {...secondTrend} />
      </div>
    </div>
  );
}

function DashboardKpiCards(): ReactNode {
  return (
    <section className="grid grid-cols-1 gap-3 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {dashboardKpiCards.map((card) => (
        <TrendCard key={`${card.title}-${card.status}`} {...card} />
      ))}
    </section>
  );
}

DashboardOverviewCards.displayName = 'DashboardOverviewCards';
DashboardKpiCards.displayName = 'DashboardKpiCards';

export { DashboardKpiCards, DashboardOverviewCards };
