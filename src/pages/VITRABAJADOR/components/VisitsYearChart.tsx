import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { VisitasPorVendedorQuery } from "../../../domain/graphql";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const VisitsYearChart: React.FC<{ data: VisitasPorVendedorQuery | undefined }> = ({ data }) => {

  const year = new Date().getFullYear();
  const visitas = data?.visitasPorVendedor || [];

  // Crear arreglo de 12 meses
  const months = new Array(12).fill(0);

  // Llenar meses con visitas
  visitas.forEach(v => {
    if (v.numero_mes >= 1 && v.numero_mes <= 12) {
      months[v.numero_mes - 1] = v.visitas;
    }
  });

  const total = months.reduce((s, v) => s + v, 0);

  const labels = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Visitas por mes",
        data: months,
        backgroundColor: "rgba(124, 58, 237, 0.6)",   // morado claro
        borderColor: "rgba(124, 58, 237, 1)",
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
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-sm font-medium text-gray-900">Visitas en {year}</h4>
          <div className="text-xs text-gray-500">
            Total visitas: <span className="font-semibold text-gray-800">{total}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">Últimos 12 meses</div>
      </div>

      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default VisitsYearChart;
