import axios from "axios";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react";
import { formatCurrency } from "../../lib/utils";
interface Cotizacion {
  vendedor: string;
  nombre: string;
  mes: string;
  dias_con_cotizaciones: string;
  total_cotizaciones: string;
  promedio_diario: string;
  valor_total: string;
}
export const CotizacionStatisc = () => {
  const [cotizaciones, setCotizaciones] = useState<Cotizacion[]>([]);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const url = `${import.meta.env.VITE_APP_GRAPH}ventas/cotizaciones/72329722`;
        const { data } = await axios.get<Cotizacion[]>(url);
        setCotizaciones(data);
      } catch (error) {
        console.error("Error al obtener cotizaciones:", error);
      }
    };

    fetchCotizaciones();
  }, []);

    return (        
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Cotizaciones del mes
          </h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Dias cotizados
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Promedio diario
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total cotizaciones
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total Valor
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
          {cotizaciones.map((coti, index) => (
                <TableRow key={index}>
                    <TableCell 
                        className={`px-4 py-3 text-gray-500 dark:text-gray-400 text-start text-theme-sm `}>
                            {coti.dias_con_cotizaciones}
                    </TableCell>
                    <TableCell 
                        className={`px-4 py-3 text-gray-500 dark:text-gray-400 text-start text-theme-sm `}>
                            {coti.promedio_diario}
                    </TableCell>
                    <TableCell 
                        className={`px-4 py-3 text-gray-500 dark:text-gray-400 text-start text-theme-sm `}>
                            {coti.total_cotizaciones}
                    </TableCell>
                    <TableCell 
                        className={`px-4 py-3 text-gray-500 dark:text-gray-400 text-start text-theme-sm `}>
                            {formatCurrency(+coti.valor_total)}
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    )
}