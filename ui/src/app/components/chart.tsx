"use client";

import {
  AreaData,
  AreaSeries,
  IChartApi,
  ISeriesApi,
  Time,
  createChart,
} from "lightweight-charts";
import {
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

type ChartRef = {
  _api: IChartApi | null;
  api(): IChartApi;
  free(): void;
};

export type ChartComponentRef = {
  update: (data: { time: Time; value: number }) => void;
};

interface ChartProps {
  header: ReactNode;
  data?: AreaData<Time>[];
  ref: Ref<ChartComponentRef>;
}

export function Chart({ header, data, ref }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartRef>({
    _api: null,
    api() {
      if (!this._api) {
        this._api = createChart(chartContainerRef.current!, {
          width: 0,
          height: 0,
          timeScale: {
            timeVisible: true,
          },
        });
        this._api.timeScale().fitContent();
      }
      return this._api;
    },
    free() {
      if (this._api) {
        this._api.remove();
      }
    },
  });
  const seriesRef = useRef<ISeriesApi<"Area">>(null);

  useImperativeHandle(ref, () => ({
    update: (data: { time: Time; value: number }) => {
      seriesRef.current!.update(data);
    },
  }));

  useEffect(() => {
    seriesRef.current = chartRef.current.api().addSeries(AreaSeries);
    seriesRef.current.setData(data || [
      { time: "2025-05-01", value: 32.51 },
      { time: "2025-05-02", value: 31.11 },
      { time: "2025-05-03", value: 27.02 },
      { time: "2025-05-04", value: 27.32 },
      { time: "2025-05-05", value: 25.17 },
      { time: "2025-05-06", value: 28.89 },
      { time: "2025-05-07", value: 25.46 },
      { time: "2025-05-08", value: 23.92 },
      { time: "2025-05-09", value: 22.68 },
      { time: "2025-05-10", value: 22.67 },
      { time: "2025-05-11", value: 25.46 },
      { time: "2025-05-12", value: 23.92 },
      { time: "2025-05-13", value: 22.68 },
      { time: "2025-05-14", value: 31.67 },
    ]);
  }, [data]);

  useLayoutEffect(() => {
    const currentRef = chartRef.current;
    const chart = currentRef.api();

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current!.parentElement!.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={chartContainerRef} className="flex-grow relative">
      <div className="absolute top-0 left-0 z-50 bg-gray-100 rounded-md p-2 shadow-md">
        {header}
      </div>
    </div>
  );
}

Chart.displayName = "Chart";