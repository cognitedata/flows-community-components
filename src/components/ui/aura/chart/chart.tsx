import {
  type ComponentProps,
  type ComponentType,
  type ReactNode,
  createContext,
  useContext,
  useId,
  useMemo,
} from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '../../../../lib/utils';

const THEMES: Record<'light' | 'dark', string> = { light: '', dark: '.dark' };

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />');
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: ComponentProps<'div'> & {
  config: ChartConfig;
  children: ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >['children'];
}) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([themeName, prefix]) => {
            if (themeName !== 'light' && themeName !== 'dark') {
              return '';
            }
            const cssVariables = colorConfig
              .map(([key, itemConfig]) => {
                const color = itemConfig.theme?.[themeName] || itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
              })
              .filter((color): color is string => color !== null)
              .join('\n');
            return `
${prefix} [data-chart=${id}] {
${cssVariables}
}
`;
          })
          .join('\n'),
      }}
    />
  );
};

type ChartProps = ComponentProps<typeof ChartContainer>;

function Chart(props: ChartProps) {
  return <ChartContainer {...props} />;
}

const ChartTooltip = RechartsPrimitive.Tooltip;

type TooltipPayloadItem = {
  type?: string;
  name?: string | number;
  dataKey?: string | number;
  value?: string | number;
  color?: string;
  payload?: Record<string, unknown>;
  fill?: string;
  [key: string]: unknown;
};

type ChartTooltipContentProps = Omit<
  ComponentProps<typeof RechartsPrimitive.Tooltip>,
  'content' | 'formatter' | 'labelFormatter'
> &
  ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
    payload?: TooltipPayloadItem[];
    label?: string | number;
    formatter?: (
      value: string | number,
      name: string | number,
      item: TooltipPayloadItem,
      index: number,
      payload: Record<string, unknown> | undefined
    ) => ReactNode;
    labelFormatter?: (
      value: ReactNode,
      payload: TooltipPayloadItem[]
    ) => ReactNode;
  };

function ChartTooltipContent({
  active,
  payload = [],
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === 'string'
        ? config[label]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn('font-medium', labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <div
      className={cn(
        'border-border/50 bg-background grid min-w-32 items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload
          .filter((item: TooltipPayloadItem) => item.type !== 'none')
          .map((item: TooltipPayloadItem, index: number) => {
            const key = `${nameKey || item.name || item.dataKey || 'value'}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const payloadFill =
              isRecord(item.payload) && typeof item.payload.fill === 'string'
                ? item.payload.fill
                : undefined;
            const indicatorColor = color || payloadFill || item.color;

            return (
              <div
                key={item.dataKey ?? index}
                className={cn(
                  '[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5',
                  indicator === 'dot' && 'items-center'
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(
                    item.value,
                    item.name,
                    item,
                    index,
                    isRecord(item.payload) ? item.payload : undefined
                  )
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn('shrink-0 rounded-sm', {
                            'h-2.5 w-2.5': indicator === 'dot',
                            'w-1': indicator === 'line',
                            'w-0 border border-dashed bg-transparent':
                              indicator === 'dashed',
                            'my-0.5': nestLabel && indicator === 'dashed',
                          })}
                          style={{
                            backgroundColor: indicatorColor,
                            borderColor: indicatorColor,
                          }}
                        />
                      )
                    )}
                    <div
                      className={cn(
                        'flex flex-1 justify-between leading-none',
                        nestLabel ? 'items-end' : 'items-center'
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

type LegendPayloadItem = {
  type?: string;
  value?: string;
  dataKey?: string | number;
  color?: string;
  [key: string]: unknown;
};

type ChartLegendContentProps = ComponentProps<'div'> & {
  hideIcon?: boolean;
  nameKey?: string;
  payload?: LegendPayloadItem[];
  verticalAlign?: 'top' | 'bottom' | 'middle';
};

function ChartLegendContent({
  className,
  hideIcon = false,
  payload = [],
  verticalAlign = 'bottom',
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload
        .filter((item: LegendPayloadItem) => item.type !== 'none')
        .map((item: LegendPayloadItem, index) => {
          const key = `${nameKey || item.dataKey || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value ?? index}
              className={cn(
                '[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3'
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (!isRecord(payload)) {
    return undefined;
  }
  const payloadRecord = payload;

  const payloadPayload = isRecord(payloadRecord.payload)
    ? payloadRecord.payload
    : undefined;

  let configLabelKey: string = key;

  const directValue = getStringValue(payloadRecord, key);
  if (directValue) {
    configLabelKey = directValue;
  } else {
    const nestedValue = payloadPayload
      ? getStringValue(payloadPayload, key)
      : undefined;
    if (nestedValue) {
      configLabelKey = nestedValue;
    }
  }

  return config[configLabelKey] ?? config[key];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getStringValue(
  value: Record<string, unknown>,
  key: string
): string | undefined {
  const nestedValue = value[key];
  return typeof nestedValue === 'string' ? nestedValue : undefined;
}

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
