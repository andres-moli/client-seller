import {
  ButtonTable,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { OrderTypes, useCotizacionesQuery, useFindSeachCotizacionLazyQuery, useFindSeachCotizacionQuery } from "../../domain/graphql";
import { formatCurrency } from "../../lib/utils";
import SearchableSelect, { Option } from "../../components/form/selectSeach";
import { Pagination } from "../../components/ui/table/pagination";
import { toast } from "sonner";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { axiosRest } from "../../domain/api.config";
import { UsuarioFacturas } from "./interface";

const currentYear = new Date().getFullYear();
  
// Generar opciones de años (3 años atrás hasta 3 años adelante)
const yearOptions: Option[] = Array.from({ length: 7 }, (_, i) => {
  const year = currentYear - 3 + i;
  return {
    label: year.toString(),
    value: year.toString()
  };
});

// Opciones de meses (1-12 con nombres)
const monthOptions: Option[] = [
  { label: 'Enero', value: '1' },
  { label: 'Febrero', value: '2' },
  { label: 'Marzo', value: '3' },
  { label: 'Abril', value: '4' },
  { label: 'Mayo', value: '5' },
  { label: 'Junio', value: '6' },
  { label: 'Julio', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Septiembre', value: '9' },
  { label: 'Octubre', value: '10' },
  { label: 'Noviembre', value: '11' },
  { label: 'Diciembre', value: '12' }
];

export default function VentaTable() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [fechaInicio, setFechaInicio] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));
  const [commissionResults, setCommissionResults] = useState<UsuarioFacturas[]>([]);

  const fetchComisiones = async () => {
    const toastid = toast.loading('Cargando ventas...');
    try {
      const response = await axiosRest.get(`/fletes/totalizados/${fechaInicio}/${fechaFin}`);
      setCommissionResults(response.data);
    } catch (error) {
      toast.error('Uuups hubo un error');
      console.error("Error fetching comisiones:", error);
    } finally {
      toast.dismiss(toastid);
    }
  };

  // Actualizar fechas cuando cambia el año o mes seleccionado
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const year = parseInt(selectedYear);
      const month = parseInt(selectedMonth) - 1; // Los meses en dayjs van de 0 a 11
      
      const newFechaInicio = dayjs()
        .year(year)
        .month(month)
        .startOf('month')
        .format('YYYY-MM-DD');
      
      const newFechaFin = dayjs()
        .year(year)
        .month(month)
        .endOf('month')
        .format('YYYY-MM-DD');
      
      setFechaInicio(newFechaInicio);
      setFechaFin(newFechaFin);
    }
  }, [selectedYear, selectedMonth]);

  // Llamar al servicio cuando cambian las fechas
  useEffect(() => {
    if (fechaInicio && fechaFin) {
      fetchComisiones();
    }
  }, [fechaInicio, fechaFin]);
    //@ts-ignore
  const resultados = (commissionResults?.find(comi => comi.user?.id == user?.id )?.totalizado);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-6 px-6">
          <div className="text-left">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Año
            </label>
            <SearchableSelect
              onChange={(value) => setSelectedYear(value)}
              options={yearOptions}
              defaultValue={selectedYear}
            />
          </div>
          <div className="w-full">
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Mes
            </label>
            <SearchableSelect
              onChange={(value) => setSelectedMonth(value)}
              options={monthOptions}
              defaultValue={selectedMonth}
            />
          </div>
          <ButtonTable 
            onClick={fetchComisiones}
          >
            Buscar...
          </ButtonTable>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">  
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Venta Total
            </label>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(resultados?.totalVendido || 0)}
            </div>
          </div>
          {
            commissionResults?.find(comi => comi.user?.id == user?.id )?.externo
            && (
              <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Venta Grupo
              </label>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(commissionResults?.find(comi => comi.user?.id == user?.id )?.externo?.totalVentasGrupo || 0)}
              </div>
            </div>
            )
          }
                   {
            commissionResults?.find(comi => comi.user?.id == user?.id )?.externo
            && (
              <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Utilidad Grupo
              </label>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {(commissionResults?.find(comi => comi.user?.id == user?.id )?.externo?.utilidadRealPorcentaje || 0).toFixed(2)}
              </div>
            </div>
            )
          }
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Costo Total
            </label>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(resultados?.totalCosto || 0)}
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Utilidad
            </label>
            <div className={`text-lg font-semibold ${
              resultados?.utilidadPorcentaje || 0 >  0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {formatCurrency(resultados?.utilidad || 0)} ({resultados?.utilidadPorcentaje || 0}%)
            </div>
          </div>
  
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Comisión total
            </label>
            <div className={`text-lg font-semibold`}>
              {formatCurrency(resultados?.totalComision || 0 )}
            </div>
          </div>
        </div>
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Cliente
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Factura
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Fecha
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Valor costo
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Valor costo real
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Valor venta
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Utilidad Real
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Utilidad Real %
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Flete
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Oip
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Back Comisión
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Comisión
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {commissionResults?.find(comi => comi.user?.id == user?.id )?.facturasValide.map((fac) => (
                <TableRow key={fac.numeroFactura}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {fac.clienteNombre}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {fac.numeroFactura}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {dayjs(fac.fecha).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.valorCosto || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.valorCostoReal || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.valorVenta || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.utilidadReal || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {(fac?.utilidadRealPorcentaje)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.valorFlete || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.valorOip || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.valorBack || 0)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(fac?.comision || 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}