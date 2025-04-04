import {
  ButtonTable,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useNavigate } from "react-router";
import { OrderTypes, useClientsQuery, useClientsUserQuery, useProyectosQuery } from "../../domain/graphql";
import { useUser } from "../../context/UserContext";
import { formatCurrency } from "../../lib/utils";
import { Eye, Search } from "lucide-react";
import { Pagination } from "../../components/ui/table/pagination";
import { useState, useEffect, useMemo } from "react";
import { useModal } from "../../hooks/useModal";
import { CreateClientModal } from "./createClient";
import { debounce } from "lodash";
import Input from "../../components/form/input/InputField";

export default function ClientTable() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isOpen, openModal, closeModal } = useModal();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const { data, loading, refetch } = useClientsUserQuery({
    variables: {
      where: {
        user: {
          _eq: user?.id || ''
        },
        ...(searchTerm && {
          _and: [
            { 
              name: 
              { _contains: searchTerm } ,
              _or: [{
                numberDocument: {
                  _contains: searchTerm
                }
              }]
            },
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
            placeholder="Buscar por nombre o documento..."
            className="pl-10 w-full"
            onChange={handleSearchChange}
          />
        </div>
        <ButtonTable onClick={() => openModal()}>
          Crear Cliente
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
                  Numero de documento
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Dirreción
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Departamento
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Municipio
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Telefono
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tipo
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
              {data?.clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.numberDocument}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.address}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.department?.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.city?.name}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.celular}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {client.type?.replace("_", " ")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => navigate(`/view-client/${client.id}`)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            totalItems={data?.clientsCount.totalItems || 0}
            itemsPerPage={data?.clientsCount.itemsPerPage || 0}
            totalPages={Math.ceil((data?.clientsCount.totalItems || 0) / (data?.clientsCount?.itemsPerPage || 0))}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            className="mt-6"
          />
          <CreateClientModal
            closeModal={closeModal}
            isOpen={isOpen}
            openModal={openModal}
          />
        </div>
      </div>
    </div>
  );
}