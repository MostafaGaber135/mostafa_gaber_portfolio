import type { ComponentProps, ComponentType, CSSProperties, ReactNode } from "react";
import { createContext, forwardRef, useContext, useId, useMemo } from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = Record<
  string,
  {
    label?: ReactNode;
    icon?: ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

const ChartContainer = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {
    config: ChartConfig;
    children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => "theme" in cfg || "color" in cfg);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => {
            const lines = colorConfig
              .map(([key, itemConfig]) => {
                const color =
                  "theme" in itemConfig ? itemConfig.theme[theme as keyof typeof THEMES] : itemConfig.color;
                return color ? `  --color-${key}: ${color};` : null;
              })
              .filter(Boolean)
              .join("\n");

            return `
${prefix} [data-chart=${id}] {
${lines}
}
`;
          })
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

type RechartsPayloadItem = {
  name?: unknown;
  dataKey?: unknown;
  value?: unknown;
  color?: unknown;
  payload?: unknown;
};

type TooltipPayload = RechartsPayloadItem[];

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof RechartsPrimitive.Tooltip> &
    ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const typedPayload = useMemo(() => (payload ?? []) as TooltipPayload, [payload]);

    const tooltipLabel = useMemo(() => {
      if (hideLabel || !typedPayload.length) return null;

      const item = typedPayload[0];
      const key = String(
        labelKey ||
          (typeof item.dataKey === "string" ? item.dataKey : undefined) ||
          (typeof item.name === "string" ? item.name : undefined) ||
          "value",
      );

      const itemConfig = getPayloadConfigFromPayload(config, item, key);

      const value =
        !labelKey && typeof label === "string" ? (config[label]?.label ?? label) : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, typedPayload as never)}</div>;
      }

      if (!value) return null;

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, typedPayload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !typedPayload.length) return null;

    const nestLabel = typedPayload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}

        <div className="grid gap-1.5">
          {typedPayload.map((item, index) => {
            const key = String(
              nameKey ||
                (typeof item.name === "string" ? item.name : undefined) ||
                (typeof item.dataKey === "string" ? item.dataKey : undefined) ||
                "value",
            );

            const itemConfig = getPayloadConfigFromPayload(config, item, key);

            const payloadObj = isRecord(item.payload) ? item.payload : undefined;
            const indicatorColor =
              (typeof color === "string" ? color : undefined) ||
              (typeof payloadObj?.fill === "string" ? (payloadObj.fill as string) : undefined) ||
              (typeof item.color === "string" ? item.color : undefined);

            const itemName = typeof item.name === "string" ? item.name : undefined;
            const itemValue = typeof item.value === "number" ? item.value : undefined;

            return (
              <div
                key={String(item.dataKey ?? index)}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && itemValue !== undefined && itemName ? (
                  formatter(itemValue as never, itemName as never, item as never, index, item.payload as never)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as CSSProperties
                          }
                        />
                      )
                    )}

                    <div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || itemName || key}</span>
                      </div>

                      {itemValue !== undefined && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {itemValue.toLocaleString()}
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
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

type LegendPayloadItem = { value?: unknown; dataKey?: unknown; color?: unknown };

const ChartLegendContent = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  const typedPayload = (payload ?? []) as LegendPayloadItem[];
  if (!typedPayload.length) return null;

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {typedPayload.map((item, idx) => {
        const key = String(
          nameKey || (typeof item.dataKey === "string" ? item.dataKey : undefined) || "value",
        );

        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const itemColor = typeof item.color === "string" ? item.color : undefined;

        return (
          <div
            key={String(item.value ?? idx)}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: itemColor }} />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (!isRecord(payload)) return undefined;

  const payloadPayload =
    "payload" in payload && isRecord(payload.payload) ? (payload.payload as Record<string, unknown>) : undefined;

  let configLabelKey = key;

  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key] as string;
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key] as string;
  }

  return config[configLabelKey] ?? config[key];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
