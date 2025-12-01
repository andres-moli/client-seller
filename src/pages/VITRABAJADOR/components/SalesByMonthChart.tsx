import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { VentasPorVendedorQuery } from "../../../domain/graphql";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesByMonthChart: React.FC<{ data: VentasPorVendedorQuery | undefined }> = ({ data }) => {

  const ventas = data?.ventasPorVendedor || [];

  // Crear arreglo de 12 meses
  const monthly = new Array(12).fill(0);

  // Llenar meses con venta
  ventas.forEach(v => {
    if (v.numero_mes >= 1 && v.numero_mes <= 12) {
      monthly[v.numero_mes - 1] = v.venta;
    }
  });

  const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ventas por mes",
        data: monthly,
        backgroundColor: "rgba(37, 99, 235, 0.6)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="w-full h-64 p-4 bg-white rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-900 mb-2">Ventas por mes</h4>

      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesByMonthChart;
