import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { SalesPerWorker } from "../../domain/graphql";
import { formatCurrency } from "../../lib/utils";

type Props = {
  data: SalesPerWorker[];
  loading: boolean;
};

export default function StatisticsChart({ data }: Props) {
  // Ordenamos los datos por numero_mes
  const sortedData = [...data].sort((a, b) => a.numero_mes - b.numero_mes);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      // @ts-ignore
      y: {
        formatter: (value: number, { seriesIndex, dataPointIndex }) => {
          const item = sortedData[dataPointIndex];

          if (!item) return value;

          if (seriesIndex === 0) return `Ventas: ${formatCurrency(value)}`;
          if (seriesIndex === 1) return `Costos: ${formatCurrency(value)}`;

          return "";
        },
      },
      custom: ({ dataPointIndex }) => {
        const item = sortedData[dataPointIndex];
        if (!item) return "";

        return `
          <div style="padding: 10px; background: #fff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0,0,0,0.1);">
            <strong>${item.nombre_mes}</strong><br/>
            Ventas: <strong>${formatCurrency(item.venta)}</strong><br/>
            Costos: <strong>${formatCurrency(item.costo)}</strong><br/>
            Utilidad Real: <strong>${formatCurrency(item.utilidad)}</strong><br/>
            Utilidad %: <strong>${item.utilidad_porcentaje.toFixed(2)}%</strong>
          </div>
        `;
      },
    },
    xaxis: {
      type: "category",
      categories: sortedData.map((item) => item.nombre_mes),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const series = [
    {
      name: "Ventas",
      data: sortedData.map((item) => item.venta),
    },
    {
      name: "Costos",
      data: sortedData.map((item) => item.costo),
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Comparativo costo - venta
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Comparativo costo - venta para este mes
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
