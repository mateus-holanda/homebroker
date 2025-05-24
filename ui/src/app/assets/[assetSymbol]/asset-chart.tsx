"use client";

import { AssetContainer } from "@/app/components/asset-container";
import { Chart, ChartComponentRef } from "@/app/components/chart";
import { Asset } from "@/models";
import { socket } from "@/socket-io";
import { Time } from "lightweight-charts";
import { useEffect, useRef } from "react";

interface AssetChartProps {
  asset: Asset;
  data?: {
    time: Time;
    value: number;
  }[];
};

export function AssetChart({ asset, data }: AssetChartProps) {
  const chartRef = useRef<ChartComponentRef>(null);

  useEffect(() => {
    socket.connect();
    socket.emit('joinAsset', { symbol: asset.symbol });
    socket.on('assets/daily-create', (assetDaily) => {
      chartRef.current?.update({
        time: (Date.parse(assetDaily.date) / 1000) as Time,
        value: assetDaily.price,
      })
    });
  }, [asset.symbol])

  return (
    <Chart
      ref={chartRef}
      header={<AssetContainer asset={asset} />}
      data={data}
    />
  )
}