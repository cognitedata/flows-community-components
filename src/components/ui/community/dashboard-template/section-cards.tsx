import {
  Badge,
  Card,
  CardDescription,
  CardFooter,
  CardFooterStart,
  CardHeader,
  CardHeaderEnd,
  CardHeaderStart,
  CardTitle,
} from '@cognite/aura/components';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import type { ReactNode } from 'react';

function MetricCard({
  label,
  value,
  delta,
  trend,
  detail,
  hint,
}: {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  detail: string;
  hint: string;
}): ReactNode {
  const TrendIcon = trend === 'up' ? IconTrendingUp : IconTrendingDown;

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardHeaderStart className="min-w-0">
          <CardDescription>{label}</CardDescription>
          <CardTitle className="text-2xl tabular-nums tracking-tight">
            {value}
          </CardTitle>
        </CardHeaderStart>
        <CardHeaderEnd>
          <Badge variant={trend === 'up' ? 'success' : 'error'} outline>
            <TrendIcon size={14} stroke={1.5} />
            {delta}
          </Badge>
        </CardHeaderEnd>
      </CardHeader>
      <CardFooter>
        <CardFooterStart className="min-w-0">
          <p className="flex items-center gap-1 text-sm font-medium">
            {detail}
            <TrendIcon size={16} stroke={1.5} />
          </p>
          <CardDescription>{hint}</CardDescription>
        </CardFooterStart>
      </CardFooter>
    </Card>
  );
}

export function SectionCards(): ReactNode {
  return (
    <section
      data-slot="dashboard-section-cards"
      className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
    >
      <MetricCard
        label="Total Revenue"
        value="$1,250.00"
        delta="+12.5%"
        trend="up"
        detail="Trending up this month"
        hint="Visitors for the last 6 months"
      />
      <MetricCard
        label="New Customers"
        value="1,234"
        delta="-20%"
        trend="down"
        detail="Down 20% this period"
        hint="Acquisition needs attention"
      />
      <MetricCard
        label="Active Accounts"
        value="45,678"
        delta="+12.5%"
        trend="up"
        detail="Strong user retention"
        hint="Engagement exceed targets"
      />
      <MetricCard
        label="Growth Rate"
        value="4.5%"
        delta="+4.5%"
        trend="up"
        detail="Steady performance increase"
        hint="Meets growth projections"
      />
    </section>
  );
}
