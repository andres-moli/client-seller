import { JSX } from "react";
import { useGetDataDashboardQuery } from "../../domain/graphql";
import {
  BoxIconLine,
  GroupIcon,
  DollarLineIcon
} from "../../icons";
import { useUser } from "../../context/UserContext";
import { formatCurrency } from "../../lib/utils";
import { File } from "lucide-react";
import { useNavigate } from "react-router";

const iconMap: Record<string, JSX.Element> = {
  "cliente": <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />,
  "tareas": <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
  "venta": <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />,
  "proyectos": <File className="text-gray-800 size-6 dark:text-white/90" />
};
const navigationTo: Record<string, string | null> = {
  "cliente":  'client',
  "tareas": 'task',
  "venta": null,
  "proyectos": 'proyect'
};
export default function EcommerceMetrics() {
  const { user } = useUser();
  const navigation = useNavigate()
  const { data, loading } = useGetDataDashboardQuery({
    variables: {
      getDataDashboardId: user?.id || ''
    }
  });

  if (loading) {
    return <div className="text-center text-gray-500">Cargando datos...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 md:gap-6">
      {data?.getDataDashboard?.map((metric, index) => {
        const navigateTo = navigationTo[metric.label]
        return (
          <div
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
        >
          <div onClick={() => navigateTo ? navigation(navigateTo) : undefined} className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800 cursor-pointer">
            {iconMap[metric.label] || <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />}
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metric.label}
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {metric.label == 'venta' ? formatCurrency(metric.total) :metric.total}
              </h4>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  );
}
