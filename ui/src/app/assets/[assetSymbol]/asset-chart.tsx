"use client";

import { AssetBox } from "@/app/components/asset-box";
import { Chart, ChartComponentRef } from "@/app/components/chart";
import { Asset } from "@/models";
import { useRef } from "react";

interface AssetChartProps {
  asset: Asset;
};

export function AssetChart({ asset }: AssetChartProps) {
  const chartRef = useRef<ChartComponentRef>(null);

  return <Chart ref={chartRef} header={<AssetBox asset={asset} />} />
}