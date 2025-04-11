import {
  ButtonTable,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useNavigate, useSearchParams } from "react-router";
import { OrderTypes, useProyectosQuery } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { formatCurrency } from "../../lib/utils";
import { Eye, Search, Trash2 } from "lucide-react";
import { Pagination } from "../../components/ui/table/pagination";
import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import Input from "../../components/form/input/InputField";

export default function ProyectTable() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  const handleClearFilter = () => {
    searchParams.delete("status");
    setSearchParams(searchParams); // esto actualiza la URL
    refetch()
  };

  const { data, loading, refetch } = useProyectosQuery({
    variables: {
      where: {
        worker: {
          _eq: user?.id || ''
        },
        ...(status && {
          status: {
            _eq: status
          }
        }),
        ...(searchTerm && {
          _and: [
            {
              name: {
                _contains: searchTerm
              },
              _or: [{
                description: {
                  _contains: searchTerm
                }
              }]
            }
          ]
        })
      },
      orderBy: {
        createdAt: OrderTypes.Desc
      },
      pagination: {
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage
      }
    }
  });

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
      <div className="flex justify-between items-center p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            className="pl-10 w-full"
            onChange={handleSearchChange}
          />
        </div>
        <Trash2  onAbort={handleClearFilter} className="cursor-pointer"/>
        <ButtonTable onClick={() => navigate('/create-proyect')}>
          Crear proyecto
        </ButtonTable>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nombre
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Cliente final
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
                  Precio
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Acción
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.proyectos.map((proyect) => (
                <TableRow key={proyect.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {proyect.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {proyect.clientFinal.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {proyect.status}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {formatCurrency(proyect.value)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => navigate(`/view-proyect/${proyect.id}`)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            totalItems={data?.proyectosCount.totalItems || 0}
            itemsPerPage={data?.proyectosCount.itemsPerPage || 0}
            totalPages={Math.ceil((data?.proyectosCount.totalItems || 0) / (data?.proyectosCount?.itemsPerPage || 0))}
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