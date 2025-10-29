import React, { useId, useMemo, useContext, createContext } from "react";
import * as Recharts from "recharts";
import styled from "styled-components";

// Context
const ChartContext = createContext(null);
export function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

// Styled Components
const ChartWrapper = styled.div`
  display: flex;
  aspect-ratio: 16/9;
  justify-content: center;
  font-size: 0.75rem;
  position: relative;
  overflow: hidden;
`;

const TooltipBox = styled.div`
  background: ${({ theme }) => theme.bg || "white"};
  border: 1px solid ${({ theme }) => theme.border || "#ccc"};
  border-radius: 8px;
  padding: 6px 10px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.15);
  min-width: 8rem;
  display: grid;
  gap: 6px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: ${({ position }) => (position === "top" ? "0" : "12px")};
  padding-bottom: ${({ position }) => (position === "top" ? "12px" : "0")};
  align-items: center;
`;

const LegendDot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 2px;
  background-color: ${({ color }) => color || "#000"};
`;

export function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <ChartWrapper className={className} data-chart={chartId} {...props}>
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </ChartWrapper>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = Recharts.Tooltip;

export function ChartTooltipContent({
  active,
  payload,
  label,
  formatter,
  hideLabel = false,
  color,
}) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  return (
    <TooltipBox>
      {!hideLabel && label && <div style={{ fontWeight: 500 }}>{label}</div>}
      {payload.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <LegendDot color={color || item.color || "#000"} />
            <span>{config[item.name]?.label || item.name}</span>
          </div>
          <span style={{ fontFamily: "monospace", fontWeight: 500 }}>
            {formatter ? formatter(item.value) : item.value}
          </span>
        </div>
      ))}
    </TooltipBox>
  );
}

export const ChartLegend = Recharts.Legend;

export function ChartLegendContent({ payload, position = "bottom" }) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <LegendContainer position={position}>
      {payload.map((item) => (
        <div key={item.value} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <LegendDot color={item.color} />
          <span>{config[item.dataKey]?.label || item.value}</span>
        </div>
      ))}
    </LegendContainer>
  );
}
