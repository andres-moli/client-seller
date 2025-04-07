import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { toast } from 'sonner';
import { axiosRest } from '../../domain/api.config';
import { useUser } from '../../context/UserContext';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import Select from '../form/Select';
import SearchableSelect, { Option } from '../form/selectSeach';
import { Loader } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
// Opciones de meses (1-12 con nombres)
const monthOptions: Option[] = [
  { label: 'Enero', value: '1' },
  { label: 'Febrero', value: '2' },
  { label: 'Marzo', value: '3' },
  { label: 'Abril', value: '4 '},
  { label: 'Mayo', value: '5' },
  { label: 'Junio', value: '6' },
  { label: 'Julio', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Septiembre', value: '9' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12 '}
];
interface VentaDiaria {
  vendedor: string;
  dia: number;
  nombreMes: string;
  numeroMes: number;
  anio: number;
  venta: number;
  costo: number;
  oip: number;
  flete: number;
  back: number;
  utilidad: number;
  utilidadPorcentaje: number;
}

const VentasDiariasChart = () => {
  const { user } = useUser()
  const [data, setData] = useState<VentaDiaria[]>([]);
  const [loading, setLoading] = useState(true);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosRest.get(`ventas/diarias/${user?.identificationNumber}/${mes}`);
      if (response.status > 400) throw new Error('Error al cargar datos');
      
      const result = await response.data
      setData(result);
    } catch (error) {
      toast.error('No se pudieron cargar los datos de ventas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Configuración del gráfico
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      foreColor: '#6b7280'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '55%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.map(item => `Día ${item.dia}`),
      title: {
        text: 'Días del Mes',
        style: {
          color: '#6b7280'
        }
      },
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Monto ($)',
        style: {
          color: '#6b7280'
        }
      },
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$" + val.toLocaleString();
        }
      }
    },
    colors: ['#3b82f6', '#10b981', '#6366f1'],
    grid: {
      borderColor: 'rgba(229, 231, 235, 0.3)'
    }
  };

  const series = [
    {
      name: 'Ventas',
      data: data.map(item => item.venta)
    },
    {
      name: 'Utilidad',
      data: data.map(item => item.utilidad)
    },
    {
      name: 'Costo',
      data: data.map(item => item.costo)
    }
  ];

  // Calcular totales
  const totales = data.reduce((acc, item) => ({
    venta: acc.venta += item.venta,
    costo: acc.costo += item.costo,
    oip: acc.oip += item.oip,
    flete: acc.flete += item.flete,
    back: acc.back += item.back,
    utilidad: acc.utilidad += item.utilidad,
  }), {
    venta: 0,
    costo: 0,
    oip: 0,
    flete: 0,
    back: 0,
    utilidad: 0,
  });

  const utilidadPromedio = data.length > 0 
    ? (totales.utilidad / data.length).toFixed(2)
    : 0;

  return (
    <div className="space-y-12">
      {/* Filtros */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Ventas diarias por vendedor</h3>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Select
              onChange={(e) => setMes(+e)}
              options={monthOptions}
              placeholder='Selecione un mes'
            />
            <Button 
              onClick={fetchData} 
              className="w-full sm:w-auto"
            >
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Gráfico y Detalles */}
      <div className="grid gap-12">
        {/* Gráfico */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Desempeño diario</h3>
          {loading ? (
            <Loader className="h-[350px] w-full" />
          ) : data.length > 0 ? (
            <Chart
              options={chartOptions}
              series={series}
              type="bar"
              height={350}
            />
          ) : (
            <div className="flex items-center justify-center h-[350px]">
              <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles</p>
            </div>
          )}
        </div>

        {/* Detalles */}
        {/* <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Resumen de ventas</h3>
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Loader key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Ventas</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {formatCurrency(totales?.venta || 0)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Utilidad</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {formatCurrency(totales?.utilidad || 0)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400">OIP</p>
                  <p className="text-lg text-gray-800 dark:text-white">
                    {formatCurrency(totales?.oip || 0)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Flete</p>
                  <p className="text-lg text-gray-800 dark:text-white">
                    {formatCurrency(totales?.flete || 0)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Back</p>
                  <p className="text-lg text-gray-800 dark:text-white">
                    {formatCurrency(totales?.back || 0)}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Utilidad Promedio</p>
                  <p className="text-lg text-gray-800 dark:text-white">
                    {formatCurrency(totales?.utilidad || 0)}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <p className="text-sm text-gray-500 dark:text-gray-400">Días con ventas</p>
                <p className="text-lg text-gray-800 dark:text-white">
                  {data.length} días
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[350px]">
              <p className="text-gray-500 dark:text-gray-400">No hay datos disponibles</p>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default VentasDiariasChart;