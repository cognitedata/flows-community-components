import { IconCheck, IconX } from '@tabler/icons-react';
import * as React from 'react';

import { SegmentedControl } from '@/components/ui/segmented-control';
import { cn, slugify } from '@/lib/utils';

export function ContentSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mb-12 sm:mb-14', className)}>
      <h2
        id={slugify(title)}
        className="font-heading text-xl font-semibold tracking-tight sm:text-2xl"
      >
        {title}
      </h2>
      <div className="mt-3 max-w-[70ch] space-y-4 text-sm leading-relaxed text-muted-fg">
        {children}
      </div>
    </section>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold text-foreground">{children}</h3>;
}

export function ContentList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function DoDontGrid({
  dos,
  donts,
}: {
  dos: React.ReactNode[];
  donts: React.ReactNode[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full overflow-hidden rounded-xl border border-success-foreground">
        <p className="flex items-center gap-1.5 bg-success-muted-background px-4 py-2 text-xs font-medium tracking-wide text-success-foreground uppercase">
          <IconCheck size={14} stroke={2} /> Do
        </p>
        <ul className="list-disc space-y-1.5 p-4 pl-8 text-sm leading-relaxed text-muted-fg">
          {dos.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="w-full overflow-hidden rounded-xl border border-destructive-foreground">
        <p className="flex items-center gap-1.5 bg-destructive-muted-background px-4 py-2 text-xs font-medium tracking-wide text-destructive-foreground uppercase">
          <IconX size={14} stroke={2} /> Don&apos;t
        </p>
        <ul className="list-disc space-y-1.5 p-4 pl-8 text-sm leading-relaxed text-muted-fg">
          {donts.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TokenTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted-bg">
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-2.5 text-xs font-medium tracking-wide text-medium-fg uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex !== rows.length - 1
                  ? 'border-b border-border'
                  : undefined
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2.5 align-top text-muted-fg"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CategoryHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 font-heading text-base font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  );
}

export function ColorSwatch({ color }: { color: string }) {
  return (
    <span
      className="inline-block h-4 w-4 shrink-0 rounded-full border border-border bg-(--swatch-color)"
      style={{ '--swatch-color': color } as React.CSSProperties}
    />
  );
}

export function Callout({
  variant = 'warning',
  children,
}: {
  variant?: 'warning' | 'info' | 'critical' | 'success';
  children: React.ReactNode;
}) {
  const styles = {
    warning: 'border-warning-foreground bg-warning-muted-background',
    info: 'border-info-foreground bg-info-muted-background',
    critical: 'border-destructive-foreground bg-destructive-muted-background',
    success: 'border-success-foreground bg-success-muted-background',
  } as const;

  return (
    <div className={cn('rounded-md border p-4 text-sm', styles[variant])}>
      {children}
    </div>
  );
}

export function ModeTokenTable({
  columns,
  modes,
}: {
  columns: string[];
  modes: { label: string; rows: React.ReactNode[][] }[];
}) {
  const [active, setActive] = React.useState(modes[0]?.label ?? '');
  const activeMode = modes.find((mode) => mode.label === active) ?? modes[0];

  return (
    <div>
      <SegmentedControl
        className="mt-6 mb-4 w-full"
        options={modes.map((mode) => ({
          value: mode.label,
          label: mode.label,
        }))}
        value={active}
        onChange={setActive}
      />
      {activeMode ? (
        <TokenTable columns={columns} rows={activeMode.rows} />
      ) : null}
    </div>
  );
}

export function SwatchGrid({
  swatches,
}: {
  swatches: { label: string; className: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {swatches.map((swatch) => (
        <div
          key={swatch.label}
          className="overflow-hidden rounded-xl border border-border"
        >
          <div className={cn('h-14', swatch.className)} />
          <p className="px-3 py-2 text-xs text-muted-fg">{swatch.label}</p>
        </div>
      ))}
    </div>
  );
}
