import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CotizacionStatusEnum, OrderTypes, useCotizacionesQuery } from "../../../domain/graphql";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { Eye, Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../../components/ui/table";
import { formatCurrency } from "../../../lib/utils";
import Badge from "../../../components/ui/badge/Badge";
import { Pagination } from "../../../components/ui/table/pagination";
import Input from "../../../components/form/input/InputField";


export default function CotizacionTable({nit}: {nit: string}) {
const navigate  = useNavigate()
const [itemsPerPage, setItemsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const [searchTerm, setSearchTerm] = useState("");
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

const handleItemsPerPageChange = (newItemsPerPage: number) => {
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(1); // Resetear a la primera página cuando cambia el tamaño
};
const {data, loading, refetch} = useCotizacionesQuery({
  variables: {
    where: {
      status: {
        _in: [CotizacionStatusEnum.Enviada, CotizacionStatusEnum.Aceptada, CotizacionStatusEnum.Revisada]
      },
      _and: [{
        nitCliente: {
          _eq: nit
        }
      }, {
        _and: [{
          fecha: {
            _between: [dayjs(new Date()).startOf('year').toISOString(), dayjs(new Date()).endOf('year').toISOString() ]
          }
        }]
      }],
      ...(searchTerm && {
        _and: [
          {
            nitCliente: {
              _contains: searchTerm
            },
            _or: [{
              nombreCliente: {
                _contains: searchTerm
              },
              _or: [
                {
                  numeroCotizacion: {
                    _contains: searchTerm
                  }
                }
              ]
            }]
          }
        ]
      })
    },
    orderBy: {
      fecha: OrderTypes.Desc
    },
    pagination: {
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage
    }
  }
})
  // Debounce search to avoid too many requests
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
      <div className="px-4 py-2 border-b border-gray-100 dark:border-white/[0.05] text-lg font-medium text-gray-900 dark:text-white">
        Cotizaciones del cliente
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-6 px-6">
            <div className="text-left">
              <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              {/* @ts-ignore */}
              <Input
                type="text"
                placeholder="Buscar por nombre o nit o numero de cotizacion..."
                className="pl-10 w-full"
                onChange={handleSearchChange}
              />
            </div>
            </div>
            <div className="w-full">
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
                  Numero de cotizacion
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
                  Cliente
                  </TableCell>
                  <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Valor
                  </TableCell>
                  <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Estado
                  </TableCell>
                  <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                  Acciones
                  </TableCell>
              </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.cotizaciones.map((coti) => (
                <TableRow key={coti.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {coti.numeroCotizacion}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {dayjs(coti.fecha).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {coti.nombreCliente}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {formatCurrency(coti.valor)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge color={coti.status === CotizacionStatusEnum.Enviada ? "warning" : coti.status === CotizacionStatusEnum.Aceptada ? "success" : "primary"}>
                          {coti.status}
                      </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Eye 
                      // onClick={() => navigate(`/view-cotizacion/${coti.id}`)}
                      className="cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
          </Table>
          <Pagination
            totalItems={data?.cotizacionesCount.totalItems || 0}
            itemsPerPage={data?.cotizacionesCount.itemsPerPage || 0}
            totalPages={Math.ceil((data?.cotizacionesCount.totalItems || 0) / (data?.cotizacionesCount?.itemsPerPage || 0))}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            className="mt-6"
          />
          </div>
      </div>
      </div>
  );
}
  