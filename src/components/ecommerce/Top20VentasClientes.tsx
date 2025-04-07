import { useState } from 'react';
import { useUser } from "../../context/UserContext";
import { useGetVentasTop20ClientesQuery } from "../../domain/graphql";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { formatCurrency } from "../../lib/utils";

export const Top20VentasClientes = () => { 
  const [showTable, setShowTable] = useState(false);
  const { user } = useUser();
  const { data, loading } = useGetVentasTop20ClientesQuery({
    variables: {
      vendedor: user?.identificationNumber || ''
    }
  });

  // Procesamos los datos para el gráfico
  const clientesData = data?.getVentasTop20Clientes || [];

  // Ordenamos por total (por si acaso no vienen ordenados del backend)
  const sortedData = [...clientesData].sort((a, b) => (b?.venta || 0) - (a?.venta || 0));

  // Preparamos los datos para el gráfico
  const chartData = {
    options: {
      chart: {
        id: "top-clientes-chart",
        toolbar: {
          show: true,
        },
        foreColor: '#64748B'
      },
      xaxis: {
        categories: Array.from({length: sortedData.length}, (_, i) => (i + 1).toString()),
        labels: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        title: {
          text: '',
        }
      },
      yaxis: {
        title: {
          text: 'Total de Ventas',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#64748B'
          }
        },
        labels: {
          formatter: function (value: number) {
            return formatCurrency(value);
          },
          style: {
            colors: '#64748B'
          }
        }
      },
      title: {
        // text: 'Top 20 Clientes con Más Ventas',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1E293B'
        }
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        }
      },
      colors: ['#3B82F6'],
      tooltip: {
        enabled: true,
        custom: function({ dataPointIndex }) {
          const cliente = sortedData[dataPointIndex];
          return `
            <div class="apexcharts-tooltip-custom bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-md rounded px-3 py-2">
              <div class="font-bold">${cliente.nombreCliente || `Cliente ${cliente.nit}`}</div>
              <div>${formatCurrency(cliente.venta || 0)}</div>
            </div>
          `;
        }
      },
      grid: {
        borderColor: '#E2E8F0'
      }
    } as ApexOptions,
    series: [{
      name: 'Total de Ventas',
      data: sortedData.map(cliente => cliente.venta || 0)
    }]
  };

  if (loading) {
    return <div className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Cargando datos...</div>;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-gray-300 center">Top 20 Clientes</h2>
        <button
          onClick={() => setShowTable(!showTable)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}
        </button>
      </div>

      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={500}
      />
      
      {/* Tabla de datos adicional con modo oscuro */}
      {showTable && (
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">NIT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Facturas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Ventas</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedData.map((cliente, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.nombreCliente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{cliente.nit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{cliente.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{formatCurrency(cliente.venta || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};