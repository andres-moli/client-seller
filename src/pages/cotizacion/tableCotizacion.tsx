import { toast } from "sonner";
import dayjs from "dayjs";
import { Eye, Search } from "lucide-react";
import { debounce } from "lodash";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { CotizacionStatusEnum, OrderTypes, useCotizacionesQuery } from "../../domain/graphql";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { formatCurrency } from "../../lib/utils";
import Badge from "../../components/ui/badge/Badge";
import { Pagination } from "../../components/ui/table/pagination";
import { useUser } from "../../context/UserContext";
import Input from "../../components/form/input/InputField";
import Button from "../../components/ui/button/Button";

export default function CotizacionTable() {
  const navigate  = useNavigate();
  const { user } = useUser();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------------- ORDENAMIENTO ----------------------
  const [sortConfig, setSortConfig] = useState({
    column: "fecha",
    direction: OrderTypes.Desc,
  });

  const toggleSort = (column: string) => {
    setSortConfig((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === OrderTypes.Asc
          ? OrderTypes.Desc
          : OrderTypes.Asc,
    }));
  };

  const renderSortIcon = (column: string) => {
    if (sortConfig.column !== column) return "↕️";
    return sortConfig.direction === OrderTypes.Asc ? "⬆️" : "⬇️";
  };
  // ---------------------------------------------------------

  const { data, loading, refetch } = useCotizacionesQuery({
    variables: {
      where: {
        status: {
          _in: [
            CotizacionStatusEnum.Enviada,
            CotizacionStatusEnum.Aceptada,
            CotizacionStatusEnum.Revisada
          ]
        },
        // vendedor: { _eq: user?.id || "" },
        fecha: {
          _between: [
            dayjs().startOf("year").toISOString(),
            dayjs().endOf("year").toISOString(),
          ]
        },
        ...(searchTerm && {
          _or: [
            { nitCliente: { _contains: searchTerm } },
            { nombreCliente: { _contains: searchTerm } },
            { numeroCotizacion: { _contains: searchTerm } }
          ]
        })
      },

      // ✔ Orden dinámico
      orderBy: {
        [sortConfig.column]: sortConfig.direction
      },

      pagination: {
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
      }
    }
  });

  useEffect(() => {
    refetch();
  }, [sortConfig, currentPage, itemsPerPage]);

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
      }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">

        <div className="px-4 py-2 border-b border-gray-100 dark:border-white/[0.05] text-lg font-medium text-gray-900 dark:text-white">
          Cotizaciones del cliente
        </div>
        <Button onClick={() => navigate("/create-cotizacion")} className="btn btn-primary btn-sm">
          Crear Cotización
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-6 px-6">
          <div className="text-left">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre o nit o numero de cotizacion..."
                className="pl-10 w-full"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>

                {/* ---------------- HEADER CON FILTROS ---------------- */}

                <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400"
                  onClick={() => toggleSort("numeroCotizacion")}>
                  Numero de cotizacion {renderSortIcon("numeroCotizacion")}
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400"
                  onClick={() => toggleSort("fecha")}>
                  Fecha {renderSortIcon("fecha")}
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400"
                  onClick={() => toggleSort("nombreCliente")}>
                  Cliente {renderSortIcon("nombreCliente")}
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400"
                  onClick={() => toggleSort("valor")}>
                  Valor {renderSortIcon("valor")}
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium cursor-pointer text-start text-gray-500 dark:text-gray-400"
                  onClick={() => toggleSort("status")}>
                  Estado {renderSortIcon("status")}
                </TableCell>

                <TableCell isHeader className="px-5 py-3 font-medium text-start text-gray-500 dark:text-gray-400">
                  Acciones
                </TableCell>

                {/* ---------------------------------------------------- */}

              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.cotizaciones.map((coti) => (
                <TableRow key={coti.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {coti.numeroCotizacion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {dayjs(coti.fecha).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {coti.nombreCliente}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatCurrency(coti.valor)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      color={
                        coti.status === CotizacionStatusEnum.Enviada
                          ? "warning"
                          : coti.status === CotizacionStatusEnum.Aceptada
                          ? "success"
                          : "primary"
                      }
                    >
                      {coti.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Eye
                      onClick={() => navigate(`/view-cotizacion/${coti.id}`)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            totalItems={data?.cotizacionesCount.totalItems || 0}
            itemsPerPage={itemsPerPage}
            totalPages={Math.ceil((data?.cotizacionesCount.totalItems || 0) / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
}
