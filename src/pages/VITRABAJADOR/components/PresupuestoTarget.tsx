import { Activity, ArrowDown, ArrowUp, BarChart2, CircleDollarSign, Minus } from "lucide-react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { PresupuestoVentaPorUsuarioQuery, PresupuestoVsVenta } from "../../../domain/graphql";
import { formatCurrency } from "../../../lib/utils";

export default function MonthlyTarget({ data, loading }: { data: PresupuestoVentaPorUsuarioQuery | undefined, loading: boolean }) {

  const series = [data?.presupuestoVentaPorUsuario?.cumplimientoAcumuladoActual || 0];
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
      toolbar: { show: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: { background: "#E4E7EC", strokeWidth: "100%", margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: val => val + "%"
          }
        }
      }
    },
    fill: { type: "solid", colors: ["#465FFF"] },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  const [isOpen, setIsOpen] = useState(false);
  function toggleDropdown() { setIsOpen(!isOpen); }
  function closeDropdown() { setIsOpen(false); }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">

      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Progreso mensual
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Tu progreso mensual vas asi hasta ahora
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart options={options} series={series} type="radialBar" height={330} />
          </div>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[100%] text-center text-sm text-gray-500 sm:text-base">
          {loading ? <>Cargando...</> : 
          // @ts-ignore
          <TarjetaDesempeno data={data?.presupuestoVentaPorUsuario} />}
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">Presupuesto</p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {formatCurrency(data?.presupuestoVentaPorUsuario?.presupuestoActual || 0)}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">Presupuesto anterior</p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {formatCurrency(data?.presupuestoVentaPorUsuario?.presupuestoAnterior || 0)}
          </p>
        </div>
      </div>
    </div>
  );
}

function TarjetaDesempeno({ data }: { data: PresupuestoVsVenta | null | undefined }) {

  const colorStatus = {
    MEJOR: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    PEOR: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    IGUAL: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  };

  const iconStatus = {
    MEJOR: <ArrowUp className="h-4 w-4" />,
    PEOR: <ArrowDown className="h-4 w-4" />,
    IGUAL: <Minus className="h-4 w-4" />
  };

  if (!data) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-gray-800 dark:bg-white/[0.03]">

      {/* TODO EN LÍNEA HORIZONTAL REAL, SIN SCROLL */}
      <div className="flex flex-row items-center justify-between w-full gap-10">

        {/* Badges */}
        <div className="flex flex-row gap-3">
          {/* @ts-ignore */}
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${colorStatus[data.comparacionVentaHoy]}`}>
          {/* @ts-ignore */}            
            {iconStatus[data.comparacionVentaHoy]}
            {data.comparacionVentaHoy === 'MEJOR' ? 'Hoy mejor' :
             data.comparacionVentaHoy === 'PEOR' ? 'Hoy peor' : 'Hoy igual'}
          </div>
          {/* @ts-ignore */}
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${colorStatus[data.comparacionVentaAcumulada]}`}>
            <Activity className="h-4 w-4" />
            {data.comparacionVentaAcumulada === 'MEJOR' ? 'Acumulado mejor' :
             data.comparacionVentaAcumulada === 'PEOR' ? 'Acumulado peor' : 'Acumulado igual'}
          </div>
        </div>

        {/* Ventas hoy */}
        <div className="flex flex-col border border-gray-200 rounded-xl p-4 dark:border-gray-700 dark:bg-gray-800 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <CircleDollarSign className="h-4 w-4" />
            Ventas hoy
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white">
            {formatCurrency(data.ventaHoyActual)}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Mes anterior: {formatCurrency(data.ventaMismoDiaAnterior)}
          </p>
        </div>

        {/* Ventas acumuladas */}
        <div className="flex flex-col border border-gray-200 rounded-xl p-4 dark:border-gray-700 dark:bg-gray-800 flex-1">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            <BarChart2 className="h-4 w-4" />
            Ventas acumuladas
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white">
            {formatCurrency(data.ventaAcumuladaHastaHoy)}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Mes anterior: {formatCurrency(data.ventaAcumuladaHastaMismoDiaAnterior)}
          </p>
        </div>

        {/* Fecha */}
        <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Actualizado al día {data.diaActual}
        </div>

      </div>
    </div>
  );
}
